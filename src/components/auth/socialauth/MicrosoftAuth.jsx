'use client';

import { useGoogleLogin } from '@react-oauth/google';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSocialLoginMutation } from '@/store/auth/auth.api';
import useToastify from '@/hooks/useToastify';
import { fetchGoogleUserInfo } from '@/utils/helper';
import { GoogleIcon, LoadingIcon, MicroSoftIcon } from '@/assets/icons';
import { setSessionCookie } from '@/lib/session';

export default function MicrosoftAuth({ authType = 'signin' }) {
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get('redirect') || '/dashboard';
  const [socialLogin, { isLoading }] = useSocialLoginMutation();
  const { showToast } = useToastify();
  const router = useRouter();

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const {
          name: full_name,
          email,
          picture: avatar,
        } = await fetchGoogleUserInfo(tokenResponse.access_token);
        const payload = {
          provider: 'google',
          full_name,
          email,
          avatar,
        };
        const res = await socialLogin(payload).unwrap();
        // Backend response shape may vary; normalize to the same cookie schema
        // used across the app (token/refresh_token/role/onboarded).
        const access_token =
          res?.access_token ??
          res?.data?.access_token ??
          res?.data?.token?.access_token ??
          res?.token?.access_token ??
          res?.data?.token;
        const refresh_token =
          res?.refresh_token ??
          res?.data?.refresh_token ??
          res?.token?.refresh_token ??
          null;
        const onboarded = !!(
          res?.user?.onboarded ??
          res?.user?.isOnboarded ??
          res?.data?.user?.onboarded ??
          res?.data?.user?.isOnboarded
        );

        if (access_token) {
          await setSessionCookie({
            token: access_token,
            refresh_token,
            role: 'user',
            onboarded,
          });
        } else {
          // Fallback to old behavior if only a token is returned.
          await setSessionCookie(res?.data?.token ?? res?.token ?? res);
        }
        const action = authType === 'signin' ? 'Login' : 'Signup';
        showToast(`${action} successful`, 'success');
        router.replace(redirectPath);
      } catch (error) {
        const message =
          error?.response?.data?.message ||
          error?.message ||
          'Social login failed';
        showToast(message, 'error');
      }
    },
    onError: () => {
      showToast('Google login failed', 'error');
    },
  });

  return (
    <button
      type="button"
      onClick={() => login()}
      disabled={isLoading}
      className="flex w-full gradient-inputbox text-white-200 text-sm leading-5 items-center justify-center gap-2 rounded-lg py-3 px-[18px] transition-colors "
    >
      <h3 className="flex items-center gap-3 ml-4">
        {isLoading ? (
          <LoadingIcon className="w-5 h-5 text-gray-700" />
        ) : (
          <MicroSoftIcon />
        )}
        Continue with Microsoft
      </h3>
    </button>
  );
}
