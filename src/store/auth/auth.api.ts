import { axiosBaseQuery } from '@/lib/baseApi';
import { createApi } from '@reduxjs/toolkit/query/react';

interface AuthResponse {
  success: boolean;
  detail: string;
}
interface SocialLoginPayload {
  id_token: string;
  provider: 'google';
}
interface LoginRequest {
  email: string;
  password: string;
}
interface VerifyEmailResquest {
  email: string;
  code: string;
}
interface RegisterRequest {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}
interface FogetPasswordMutation {
  email: string;
}
interface ResetPasswordMutation {
  token: string;
  new_password: string;
}
interface ResendCodeMutation {
  email: string;
}

interface RefreshAuthRequest {
  refresh_token?: string | null;
}

interface RefreshAuthResponse {
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

export const AuthApi = createApi({
  reducerPath: 'authApi',
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    socialLogin: builder.mutation<AuthResponse, SocialLoginPayload>({
      query: ({ provider, ...body }) => ({
        url: `/account/google-signin`,
        method: 'POST',
        data: {
          provider,
          ...body,
        },
      }),
    }),
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (data) => ({
        url: '/account/signin',
        method: 'POST',
        data,
      }),
    }),
    register: builder.mutation<AuthResponse, RegisterRequest>({
      query: (data) => ({
        url: '/account/signup',
        method: 'POST',
        data,
      }),
    }),
    verifyEmail: builder.mutation<AuthResponse, VerifyEmailResquest>({
      query: (data) => ({
        url: '/account/verify-email',
        method: 'POST',
        data,
      }),
    }),
    forgetPassword: builder.mutation<AuthResponse, FogetPasswordMutation>({
      query: (data) => ({
        url: '/account/forgot-password',
        method: 'POST',
        data,
      }),
    }),
    resetPassword: builder.mutation<AuthResponse, ResetPasswordMutation>({
      query: (data) => ({
        url: '/account/reset-password',
        method: 'POST',
        data,
      }),
    }),
    resendCode: builder.mutation<AuthResponse, ResendCodeMutation>({
      query: (data) => ({
        url: '/account/resend-verification-code',
        method: 'POST',
        data,
      }),
    }),
    refreshAuth: builder.mutation<RefreshAuthResponse, RefreshAuthRequest>({
      query: (data) => ({
        url: '/account/refresh-token',
        method: 'POST',
        data,
      }),
    }),
  }),
});

export const {
  useSocialLoginMutation,
  useLoginMutation,
  useRegisterMutation,
  useVerifyEmailMutation,
  useForgetPasswordMutation,
  useResetPasswordMutation,
  useResendCodeMutation,
  useRefreshAuthMutation,
} = AuthApi;
