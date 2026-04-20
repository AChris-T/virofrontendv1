import {
  IntegrationsRequest,
  IntergrationResponse,
  InviteWorkspaceUsersPayload,
  InviteWorkspaceUsersResponse,
  TeamSpacesResponse,
  WorkspacesMeResponse,
} from '@/components/types';
import { axiosBaseQuery } from '@/lib/baseApi';
import { createApi } from '@reduxjs/toolkit/query/react';

export interface CalendarEventsRequest {
  workspaceid: string;
  teamspaceid: string;
  platform: string; // e.g. 'google_calendar'
  interval: string; // e.g. 'day'
  start_datetime: string; // ISO 8601 e.g. '2026-04-10T20:29:20.866Z'
  end_datetime: string; // ISO 8601 e.g. '2026-04-10T20:29:20.866Z'
}

export interface CreateMeetingRequest {
  workspaceid: string;
  teamspaceid: string;
  payload: {
    meeting_platform: string;
    title: string;
    description: string;
    start_time: string;
    end_time: string;
    recurrence?: {
      frequency: string;
      interval: number;
      count: number;
      until: string;
      by_day: string[];
    };
    attendees: string[];
  };
}
export interface CreateMeetingResponse {
  success: boolean;
  message: string;
}

export interface MeetingDetailRequest {
  workspaceid: string;
  teamspaceid: string;
  eventId: string;
}

export interface MeetingDetailResponse {
  success?: boolean;
  message?: string;
  title?: string;
  start_time?: string | undefined;
  end_time?: string | undefined;
  data?: Record<string, unknown>;
  event?: Record<string, unknown>;
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
  useGetMeetingEventDetailsQuery,
} = DashboardApi;
