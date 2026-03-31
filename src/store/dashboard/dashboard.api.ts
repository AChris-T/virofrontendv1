import { axiosBaseQuery } from '@/lib/baseApi';
import { createApi } from '@reduxjs/toolkit/query/react';

export interface WorkspaceTeamspace {
  id: string;
  name: string;
  slug: string;
  is_active: boolean;
}

export interface WorkspaceItem {
  id: string;
  name: string;
  owner_id: string;
  teamspaces: WorkspaceTeamspace[];
}

export interface WorkspacesMeResponse {
  workspaces: WorkspaceItem[];
}

export interface TeamSpacesResponse {
  teamspaces: WorkspaceTeamspace[];
}

export interface InviteWorkspaceUsersPayload {
  workspace_id: string;
  users: {
    email: string;
    teamspaces: string[];
  }[];
}

interface InviteWorkspaceUsersResponse {
  message?: string;
  success?: boolean;
}

export const DashboardApi = createApi({
  reducerPath: 'dashboardApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Course', 'AllCourses'],
  endpoints: (builder) => ({
    workspace: builder.query<WorkspacesMeResponse, void>({
      query: () => ({
        url: '/account/workspaces/me',
        method: 'GET',
      }),
    }),
    inviteWorkspaceUsers: builder.mutation<
      InviteWorkspaceUsersResponse,
      InviteWorkspaceUsersPayload
    >({
      query: (data) => ({
        url: '/account/invitations',
        method: 'POST',
        data,
      }),
    }),
    getTeamSpaces: builder.query<TeamSpacesResponse, void>({
      query: () => ({
        url: '/account/teamspace',
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useWorkspaceQuery,
  useInviteWorkspaceUsersMutation,
  useGetTeamSpacesQuery,
} = DashboardApi;
