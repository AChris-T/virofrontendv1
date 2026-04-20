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