export interface ToggleProps {
  checked: boolean;
  onChange: (value: boolean) => void;
  disabled?: boolean;
  color?: string;
  bot?: string;
}
export type VerificationFormInputs = {
  d1: string;
  d2: string;
  d3: string;
  d4: string;
  d5: string;
  d6: string;
};

export type RegisterFormInputs = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};

export type SigninFormInputs = {
  email: string;
  password: string;
};

export type CalendarViewMode = 'day' | 'week' | 'month' | 'schedule';

export type CalendarEventAccent = 'green' | 'blue' | 'yellow';

export type CalendarEventItem = {
  id: string;
  title: string;
  start: Date;
  end: Date;
  accent?: CalendarEventAccent;
};

export interface AuthResponse {
  success: boolean;
  detail: string;
}
interface Workspace {
  id: string;
  name: string;
}
interface Inviter {
  id: string;
  first_name: string;
}

export interface InviteResponse {
  success: boolean;
  detail: string;
  workspace: Workspace;
  inviter: Inviter;
}

export interface InviteRequest {
  id: string;
}
export interface SocialLoginPayload {
  id_token: string;
  provider: 'google';
}
export interface LoginRequest {
  email: string;
  password: string;
}
export interface AcceptRequest {
  success: boolean;
  detail: string;
  id: string;
}
export interface VerifyEmailResquest {
  email: string;
  code: string;
}
export interface RegisterRequest {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}
export interface FogetPasswordMutation {
  email: string;
}
export interface ResetPasswordMutation {
  token: string;
  new_password: string;
}
export interface ResendCodeMutation {
  email: string;
}

export interface RefreshAuthRequest {
  refresh_token?: string | null;
}

export interface RefreshAuthResponse {
  access_token?: string;
  refresh_token?: string;
  onboarded?: boolean;
  isOnboarded?: boolean;
  user?: {
    onboarded?: boolean;
    isOnboarded?: boolean;
  };
  token?: {
    access_token?: string;
    refresh_token?: string;
  };
}
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

export interface InviteWorkspaceUsersResponse {
  message?: string;
  success?: boolean;
}

export type Platform = 'google' | 'teams' | 'zoom';

export interface IntegrationItem {
  id: string;
  name: string;
  slug: string;
  teamspace_id: string | null;
  is_active: boolean;
  connected: boolean;
}

export interface IntergrationResponse {
  message?: string;
  success?: string;
  auth_url?: string;
  integrations?: IntegrationItem[];
}

export interface IntegrationsRequest {
  workspaceid?: string;
  teamspaceid?: string;
  frontend_redirect_url?: string;
}

export interface Participant {
  id: string;
  display_name: string | null;
  email: string;
  display_picture: string | null;
  is_host: boolean;
}

interface MeetingDetail {
  id?: string;
  organiser_email?: string;
  title?: string;
  description?: string | null;
  meeting_url?: string;
  platform?: string;
  bot_mode?: string;
  status?: string;
  start_time?: string;
  end_time?: string;
  transcript_url?: string | null;
  audio_recording_url?: string | null;
  video_recording_url?: string | null;
  notes?: string | null;
  date_created?: string;
  date_updated?: string;
  participants?: Participant[];
  pre_meeting_analysis?: string | null;
  post_meeting_analysis?: string | null;
  data?: Record<string, unknown>;
  event?: Record<string, unknown>;
}

export interface MeetingDetailsDisplayProps {
  details?: MeetingDetail | null;
  isLoading?: boolean;
  isError?: boolean;
}

export type TabType = 'overview' | 'preparation' | 'participants';

export type MeetingCardProps = {
  title: string;
  description?: string;
  time: string;
  startTime: string;
  endTime: string;
  isToday?: boolean;
  descriptionIcon?: string | React.ReactNode;
  meetingIcon?: string | React.ReactNode;
  showAssignToggle?: boolean;
  isAssigned?: boolean;
  onToggleAssign?: (value: boolean) => void;

  onJoin?: () => void;
};

export interface CalendarEventsRequest {
  workspaceid: string;
  teamspaceid: string;
  platform: string;
  interval: string;
  start_datetime: string;
  end_datetime: string;
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
  data: {
    title?: string;
    description?: string;
    bot_mode?: string;
  };
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
export interface UpcomingMeetingResponse {
  success: boolean;
  message: string;
  events: {
    id: string;
    title: string;
    description: string;
    time: string;
    platform: string;
    start_time: string;
    end_time: string;
  }[];
}

export interface PipelineDataResponse {
  success: boolean;
  message: string;
}
export interface PipelineRequest {
  workspaceid: string;
  teamspaceid: string;
}

/** GET /pipelines/:id/board */
export interface PipelineBoardDealApi {
  id: string;
  name?: string;
  title?: string;
  company?: string;
  company_name?: string;
  amount?: number;
  value?: number;
  priority?: string | null;
  close_date?: string | null;
  due_date?: string | null;
  expected_close_date?: string | null;
  win_probability?: number;
  assignee?:
    | string
    | {
        first_name?: string | null;
        last_name?: string | null;
        email?: string | null;
      }
    | null;
  owner?:
    | string
    | { first_name?: string | null; last_name?: string | null }
    | null;
}

export interface PipelineBoardColumnApi {
  has_more: boolean;
  next_cursor: string | null;
  stage: string;
  label: string;
  description: string;
  deal_count: number;
  total_value: number;
  deals: PipelineBoardDealApi[];
}

export interface PipelineBoardResponse {
  total_deals: number;
  total_pipeline_value: number;
  columns: PipelineBoardColumnApi[];
}

export interface PipelineBoardRequest {
  pipeline_id: string;
  workspaceid: string;
  teamspaceid: string;
}

/** Pipeline resource from API (list/detail), used when creating deals */
export interface PipelineEntity {
  id: string;
  name: string;
  stages: string[];
  stages_labels: Record<string, string>;
  stages_descriptions: Record<string, string>;
  workspace_id?: string;
  teamspace_id?: string;
  date_created?: string;
  date_updated?: string;
}

export interface PipelineStageDefinition {
  key: string;
  label: string;
  description: string;
}

export type PipelineStagesResponse = Record<string, PipelineStageDefinition[]>;

export interface CreatePipelinePayload {
  name: string;
  stages: string[];
  stages_labels: Record<string, string>;
  stages_descriptions: Record<string, string>;
}

export interface CreatePipelineRequest {
  workspaceid: string;
  teamspaceid: string;
  payload: CreatePipelinePayload;
}

export interface CreatePipelineResponse {
  success: boolean;
  message: string;
}

/** API accepts ISO date `YYYY-MM-DD` or datetime string */
export type CreateDealPriorityApi = 'low' | 'medium' | 'high' | 'urgent';

/** Body for POST `/pipelines/:pipeline_id/deals` */
export interface CreateDealPayload {
  name: string;
  company_name: string;
  contact: { name: string; email: string };
  currency: string;
  value: number;
  close_date: string;
  source: string;
  stage: string;
  priority: CreateDealPriorityApi;
  description: string;
  assigned_to: string[];
}

export interface CreateDealRequest {
  workspaceid: string;
  teamspaceid: string;
  pipeline_id: string;
  payload: CreateDealPayload;
}

export interface CreateDealNotePayload {
  type: string;
  note: string;
  visibility: 'team' | 'private';
  is_pinned: boolean;
  related_activity_id: string | null;
}

export interface CreateDealNoteRequest {
  workspaceid: string;
  teamspaceid: string;
  pipeline_id: string;
  deal_id: string;
  payload: CreateDealNotePayload;
}

type Comment = {
  badge?: string;
  content?: string;
};

export type ActivityItem = {
  kind: 'summary';
  title: string;
  date_updated: string;
  description: string;
  timeAgo: string;
  comment?: Comment[];
  badge?: string;
  content?: string;
};
