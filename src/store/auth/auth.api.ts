import type {
  AuthResponse,
  SocialLoginPayload,
  LoginRequest,
  InviteResponse,
  InviteRequest,
  AcceptRequest,
  RegisterRequest,
  VerifyEmailResquest,
  FogetPasswordMutation,
  ResetPasswordMutation,
  ResendCodeMutation,
  RefreshAuthResponse,
  RefreshAuthRequest,
} from '@/components/types';
import { axiosBaseQuery } from '@/lib/baseApi';
import { createApi } from '@reduxjs/toolkit/query/react';

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
    InvitedUser: builder.query<InviteResponse, InviteRequest>({
      query: ({ id }) => ({
        url: `account/invitations/${id}`,
        method: 'GET',
      }),
    }),
    acceptInvite: builder.mutation<InviteResponse, AcceptRequest>({
      query: ({ id }) => ({
        url: `/account/invitations/${id}/accept`,
        method: 'POST',
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
  useAcceptInviteMutation,
  useRegisterMutation,
  useInvitedUserQuery,
  useVerifyEmailMutation,
  useForgetPasswordMutation,
  useResetPasswordMutation,
  useResendCodeMutation,
  useRefreshAuthMutation,
} = AuthApi;
