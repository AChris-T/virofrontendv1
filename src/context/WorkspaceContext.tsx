'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useWorkspaceQuery } from '@/store/dashboard/dashboard.api';

type WorkspaceContextType = {
  workspaceId: string | null;
  teamspaceId: string | null;
  setWorkspaceId: (id: string | null) => void;
  setTeamspaceId: (id: string | null) => void;
};

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(
  undefined
); 

export const useWorkspace = () => {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error('useWorkspace must be used within a WorkspaceProvider');
  }
  return context;
};

export const WorkspaceProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [workspaceId, setWorkspaceId] = useState<string | null>(null);
  const [teamspaceId, setTeamspaceId] = useState<string | null>(null);
  const { data: workspacesData } = useWorkspaceQuery();

   useEffect(() => {
    const savedWorkspaceId = localStorage.getItem('workspaceId');
    const savedTeamspaceId = localStorage.getItem('teamspaceId');
    if (savedWorkspaceId) setWorkspaceId(savedWorkspaceId);
    if (savedTeamspaceId) setTeamspaceId(savedTeamspaceId);
  }, []);
  useEffect(() => {
    if (
      !workspaceId &&
      workspacesData?.workspaces &&
      workspacesData.workspaces.length > 0
    ) {
      const currentWorkspace = workspacesData.workspaces[0];
      setWorkspaceId(currentWorkspace.id);
      if (
        currentWorkspace.teamspaces &&
        currentWorkspace.teamspaces.length > 0
      ) {
        setTeamspaceId(currentWorkspace.teamspaces[0].id);
      }
    }
  }, [workspacesData, workspaceId]);

  useEffect(() => {
    if (workspaceId) {
      localStorage.setItem('workspaceId', workspaceId);
    } else {
      localStorage.removeItem('workspaceId');
    }
  }, [workspaceId]);

  useEffect(() => {
    if (teamspaceId) {
      localStorage.setItem('teamspaceId', teamspaceId);
    } else {
      localStorage.removeItem('teamspaceId');
    }
  }, [teamspaceId]);

  return (
    <WorkspaceContext.Provider
      value={{
        workspaceId,
        teamspaceId,
        setWorkspaceId,
        setTeamspaceId,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
};
