import {
  CreatePipelineRequest,
  CreatePipelineResponse,
  IntegrationsRequest,
  IntergrationResponse,
  InviteWorkspaceUsersPayload,
  InviteWorkspaceUsersResponse,
  PipelineStagesResponse,
  TeamSpacesResponse,
  WorkspacesMeResponse,
  type CalendarEventsRequest,
  type CreateMeetingRequest,
  type CreateMeetingResponse,
  type CreateDealNoteRequest,
  type MeetingDetailRequest,
  type MeetingDetailResponse,
  type PipelineBoardRequest,
  type CreateDealRequest,
  type PipelineBoardResponse,
  type PipelineDataResponse,
  type PipelineRequest,
  type UpcomingMeetingResponse,
} from '@/components/types';
import { axiosBaseQuery } from '@/lib/baseApi';
import { createApi } from '@reduxjs/toolkit/query/react';

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
    getIntegrations: builder.query<IntergrationResponse, IntegrationsRequest>({
      query: (params) => ({
        url: `/integration?workspace_id=${params.workspaceid}&teamspace_id=${params.teamspaceid}`,
        method: 'GET',
      }),
    }),
    connectGoogleCalender: builder.mutation<
      IntergrationResponse,
      IntegrationsRequest
    >({
      query: (params) => ({
        url: `/integration/google/calendar/connect?frontend_redirect_url=${params.frontend_redirect_url}&workspace_id=${params.workspaceid}&teamspace_id=${params.teamspaceid}`,
        method: 'GET',
      }),
    }),
    getCalendarEvents: builder.query<
      IntergrationResponse,
      CalendarEventsRequest
    >({
      query: (params) => ({
        url: `/integration/workspace_teamspace/calendar/events`,
        method: 'GET',
        params: {
          workspace_id: params.workspaceid,
          teamspace_id: params.teamspaceid,
          platform: params.platform,
          interval: params.interval,
          start_datetime: params.start_datetime,
          end_datetime: params.end_datetime,
        },
      }),
    }),
    createMeetingEvent: builder.mutation<
      CreateMeetingResponse,
      CreateMeetingRequest
    >({
      query: (data) => ({
        url: '/integration/workspace_teamspace/calendar/events',
        method: 'POST',
        params: {
          workspace_id: data.workspaceid,
          teamspace_id: data.teamspaceid,
        },
        data: data.payload,
      }),
    }),
    upcomingMeetingEvents: builder.query<
      UpcomingMeetingResponse,
      IntegrationsRequest
    >({
      query: (params) => ({
        url: `/integration/workspace_teamspace/calendar/events/upcoming`,
        method: 'GET',
        params: {
          workspace_id: params.workspaceid,
          teamspace_id: params.teamspaceid,
        },
      }),
    }),
    getMeetingEventDetails: builder.query<
      MeetingDetailResponse,
      MeetingDetailRequest
    >({
      query: ({ workspaceid, teamspaceid, eventId }) => ({
        url: `/integration/workspace_teamspace/calendar/events/${eventId}`,
        method: 'GET',
        params: {
          workspace_id: workspaceid,
          teamspace_id: teamspaceid,
        },
      }),
    }),
    updateMeetingEvent: builder.mutation<
      MeetingDetailResponse,
      MeetingDetailRequest
    >({
      query: ({ workspaceid, teamspaceid, eventId, data }) => ({
        url: `/integration/workspace_teamspace/calendar/events/${eventId}`,
        method: 'PATCH',
        params: {
          workspace_id: workspaceid,
          teamspace_id: teamspaceid,
        },
        data,
      }),
    }),
    createPipeline: builder.mutation<
      CreatePipelineResponse,
      CreatePipelineRequest
    >({
      query: (data) => ({
        url: '/pipelines',
        method: 'POST',
        params: {
          workspace_id: data.workspaceid,
          teamspace_id: data.teamspaceid,
        },
        data: data.payload,
      }),
    }),
    createDeal: builder.mutation<unknown, CreateDealRequest>({
      query: (data) => ({
        url: `/pipelines/${data.pipeline_id}/deals`,
        method: 'POST',
        params: {
          workspace_id: data.workspaceid,
          teamspace_id: data.teamspaceid,
        },
        data: data.payload,
      }),
    }),
    createDealNote: builder.mutation<unknown, CreateDealNoteRequest>({
      query: (data) => ({
        url: `/pipelines/${data.pipeline_id}/deals/${data.deal_id}/note`,
        method: 'POST',
        params: {
          workspace_id: data.workspaceid,
          teamspace_id: data.teamspaceid,
        },
        data: data.payload,
      }),
    }),
    getPipelineData: builder.query<PipelineDataResponse, PipelineRequest>({
      query: (params) => ({
        url: '/pipelines/workspace_teamspace',
        method: 'GET',
        params: {
          workspace_id: params.workspaceid,
          teamspace_id: params.teamspaceid,
        },
      }),
    }),
    getPipelineBoard: builder.query<
      PipelineBoardResponse,
      PipelineBoardRequest
    >({
      query: (params) => ({
        url: `/pipelines/${params.pipeline_id}/board`,
        method: 'GET',
        params: {
          workspace_id: params.workspaceid,
          teamspace_id: params.teamspaceid,
        },
      }),
    }),
    getDealDetails: builder.query<any, any>({
      query: (params) => ({
        url: `/pipelines/${params.pipeline_id}/deals/${params.deal_id}`,
        method: 'GET',
        params: {
          workspace_id: params.workspaceid,
          teamspace_id: params.teamspaceid,
        },
      }),
    }),
    getDealActivity: builder.query<any, any>({
      query: (params) => ({
        url: `/pipelines/${params.pipeline_id}/deals/${params.deal_id}/activities`,
        method: 'GET',
        params: {
          workspace_id: params.workspaceid,
          teamspace_id: params.teamspaceid,
        },
      }),
    }),
    getDealNotes: builder.query<any, any>({
      query: (params) => ({
        url: `/pipelines/${params.pipeline_id}/deals/${params.deal_id}/notes`,
        method: 'GET',
        params: {
          workspace_id: params.workspaceid,
          teamspace_id: params.teamspaceid,
        },
      }),
    }),
    getAllStages: builder.query<PipelineStagesResponse, void>({
      query: () => ({
        url: '/pipelines/stages',
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useWorkspaceQuery,
  useInviteWorkspaceUsersMutation,
  useGetTeamSpacesQuery,
  useGetIntegrationsQuery,
  useConnectGoogleCalenderMutation,
  useGetCalendarEventsQuery,
  useCreateMeetingEventMutation,
  useUpcomingMeetingEventsQuery,
  useUpdateMeetingEventMutation,
  useGetMeetingEventDetailsQuery,
  useGetPipelineDataQuery,
  useGetAllStagesQuery,
  useGetDealActivityQuery,
  useGetPipelineBoardQuery,
  useCreatePipelineMutation,
  useCreateDealMutation,
  useCreateDealNoteMutation,
  useGetDealNotesQuery,
  useGetDealDetailsQuery,
} = DashboardApi;
