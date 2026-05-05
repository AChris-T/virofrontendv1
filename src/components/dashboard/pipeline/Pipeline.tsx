'use client';
import React from 'react';
import CreatePipeline from './CreatePipeline';
import PipelineDetails from './PipelineDetails';
import { useWorkspace } from '@/context/WorkspaceContext';
import { useGetPipelineDataQuery } from '@/store/dashboard/dashboard.api';
import PipelineDetailsSkeleton from '@/components/ui/skeleton/PipelineDetailSkeleton';

export default function Pipeline() {
  const { workspaceId, teamspaceId } = useWorkspace();
  const { data, isLoading } = useGetPipelineDataQuery({
    workspaceid: workspaceId!,
    teamspaceid: teamspaceId!,
  });
  console.log(workspaceId, teamspaceId, data);
  if (isLoading) {
    return (
      <div className="p-4">
        <PipelineDetailsSkeleton />;
      </div>
    );
  }
  return (
    <div className="h-[100vh] p-4">
      {data && Object.keys(data).length > 0 ? (
        <PipelineDetails
          data={data}
          workspaceId={workspaceId}
          teamspaceId={teamspaceId}
        />
      ) : (
        <CreatePipeline workspaceId={workspaceId} teamspaceId={teamspaceId} />
      )}
    </div>
  );
}
