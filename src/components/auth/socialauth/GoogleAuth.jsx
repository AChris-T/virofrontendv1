'use client';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSocialLoginMutation } from '@/store/auth/auth.api';
import useToastify from '@/hooks/useToastify';
import { setSessionCookie } from '@/lib/session';
import config from '@/config';
import { GoogleIcon } from '@/assets/icons';
import Loader from '@/components/ui/Loader';

export default function GoogleAuth({ authType = 'signin' }) {
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get('redirect') || '/dashboard';
  const [socialLogin, { isLoading }] = useSocialLoginMutation();
  const { showToast } = useToastify();
  const router = useRouter();
  const [isGoogleReady, setIsGoogleReady] = useState(false);

  const handleCredentialResponse = async (response) => {
    try {
      if (!response?.credential) {
        throw new Error('No credential received from Google');
      }

      const payload = {
        provider: 'google',
        id_token: response.credential,
      };

      const res = await socialLogin(payload).unwrap();
      await setSessionCookie({
        token: res.access_token,
        refresh_token: res.refresh_token,
        role: 'user',
        onboarded: res.user.onboarded,
      });
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
  };

  useEffect(() => {
    const loadGoogleScript = () => {
      if (window.google) {
        initializeGoogleSignIn();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = initializeGoogleSignIn;
      document.head.appendChild(script);
    };

    const initializeGoogleSignIn = () => {
      if (!window.google) return;

      window.google.accounts.id.initialize({
        client_id: config.googleClientId,
        callback: handleCredentialResponse,
        use_fedcm_for_prompt: true,
      });

      window.google.accounts.id.renderButton(
        document.getElementById('google-btn-container'),
        { theme: 'outline', size: 'large', width: '100%' }
      );

      setIsGoogleReady(true);
    };

    loadGoogleScript();

    return () => {
      if (window.google) {
        window.google.accounts.id.cancel();
      }
    };
  }, [config.googleClientId]);

  const handleGoogleSignIn = () => {
    const googleBtn = document
      .getElementById('google-btn-container')
      ?.querySelector('div[role=button]');

    if (!googleBtn) {
      showToast('Google sign-in is not ready yet', 'error');
      return;
    }

    googleBtn.click();
  };

  return (
    <div className="relative w-full">
      {/* Hidden Google button — handles the actual auth */}
      <div
        id="google-btn-container"
        className="absolute opacity-0 pointer-events-none"
      />

      {/* Custom styled button */}
      <button
        type="button"
        onClick={handleGoogleSignIn}
        disabled={isLoading || !isGoogleReady}
        className="flex w-full gradient-inputbox text-white-200 text-sm leading-5 items-center justify-center gap-2 rounded-lg py-3 px-[18px] transition-colors"
      >
        <h3 className="flex items-center gap-3 ml-4">
          {isLoading ? <Loader /> : <GoogleIcon />}
          Continue with Google
        </h3>
      </button>
    </div>
  );
}
