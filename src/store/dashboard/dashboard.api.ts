import { axiosBaseQuery } from '@/lib/baseApi';
import { createApi } from '@reduxjs/toolkit/query/react';

interface WorkSpaceResponse {
  message: string;
 success: string;
}

export const DashboardApi = createApi({
  reducerPath: 'dashboardApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Course', 'AllCourses'],
  endpoints: (builder) => ({
    workspace: builder.query<WorkSpaceResponse, void>({
      query: () => ({
        url: '/account/workspaces/me',
        method: 'GET',
      }),
    }),
  }),
});

export const { useWorkspaceQuery } = DashboardApi;
