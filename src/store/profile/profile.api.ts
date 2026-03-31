import { axiosBaseQuery } from '@/lib/baseApi';
import { createApi } from '@reduxjs/toolkit/query/react';
import { User } from './profile.slice';

interface MeResponse {
  success: boolean;
  message?: string;
  user: User | null;
  timestamp?: string;
}
interface OnboardingResponse {
  success: boolean;
  message: string;
}
interface WorkSpaceSetUpResponse {
  success: boolean;
  message: string;
  workspace_id: string;
}

export interface WorkSpaceSetUpRequestPayload {
  workspace_name: string;
  teamspace_name: string;
}

export interface OnboardingRequestPayload {
  personalized: string;
  help_options: string[];
  notification_preferences: {
    additionalProp1: unknown;
    additionalProp2: unknown;
  };
}

export const ProfileApi = createApi({
  reducerPath: 'profileApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['profile'],
  endpoints: (builder) => ({
    getMe: builder.query<MeResponse, void>({
      query: () => ({
        url: '/account/me',
        method: 'GET',
      }),
      providesTags: ['profile'],
      transformResponse: (response: any): MeResponse => {
        const apiData = response?.data ?? response ?? null;
        if (apiData?.id) {
          const firstName = apiData.first_name ?? '';
          const lastName = apiData.last_name ?? '';
          const fullName = `${firstName} ${lastName}`.trim();
          const [derivedFirstName = '', ...restNames] = fullName
            ? fullName.split(' ')
            : [''];
          const derivedLastName = restNames.join(' ').trim();

          const normalizedUser: User = {
            id: apiData.id ?? '',
            last_name: apiData.last_name ?? derivedLastName,
            full_name: apiData.full_name ?? apiData.fullName ?? fullName,
            email: apiData.email ?? '',
            first_name: apiData.first_name ?? derivedFirstName,
            role: apiData.role ?? '',
            provider: apiData.provider ?? apiData.login_method ?? '',
            profile_picture: apiData.profile_picture ?? null,
            onboarded: apiData.onboarded ?? apiData.isOnboarded ?? false,
            deleted_at: apiData.deleted_at ?? null,
            created_at: apiData.date_created,
            updated_at: apiData.date_updated ?? '',
          };

          return {
            success: true,
            message: response?.message || '',
            user: normalizedUser,
            timestamp: response?.timestamp,
          };
        }
        return {
          success: false,
          message: response?.message || '',
          user: null,
          timestamp: response?.timestamp,
        };
      },
    }),
    Onboarding: builder.mutation<OnboardingResponse, OnboardingRequestPayload>({
      query: (data) => ({
        url: '/account/onboarding',
        method: 'PATCH',
        data,
      }),
    }),
    WorkSpaceSetUp: builder.mutation<
      WorkSpaceSetUpResponse,
      WorkSpaceSetUpRequestPayload
    >({
      query: (data) => ({
        url: '/account/onboarding/complete',
        method: 'POST',
        data,
      }),
    }),
  }),
});

export const {
  useGetMeQuery,
  useOnboardingMutation,
  useWorkSpaceSetUpMutation,
} = ProfileApi;
