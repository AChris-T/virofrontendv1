'use client';
import { useEffect, useRef, useState } from 'react';
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
  const googleInitializedRef = useRef(false);
  const containerRef = useRef(null);

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
      // Check if Google SDK is already loaded
      if (window.google && googleInitializedRef.current) {
        return;
      }

      // Check if script is already in the document
      if (
        document.querySelector(
          'script[src="https://accounts.google.com/gsi/client"]'
        )
      ) {
        const checkGoogle = setInterval(() => {
          if (window.google) {
            clearInterval(checkGoogle);
            initializeGoogleSignIn();
          }
        }, 100);
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = initializeGoogleSignIn;
      script.onerror = () => {
        showToast('Failed to load Google Sign-In', 'error');
      };
      document.head.appendChild(script);
    };

    const initializeGoogleSignIn = () => {
      if (googleInitializedRef.current || !window.google) return;

      googleInitializedRef.current = true;

      try {
        window.google.accounts.id.initialize({
          client_id: config.googleClientId,
          callback: handleCredentialResponse,
          use_fedcm_for_prompt: true,
        });

        // Render button to hidden container
        if (
          containerRef.current &&
          containerRef.current.children.length === 0
        ) {
          window.google.accounts.id.renderButton(containerRef.current, {
            theme: 'outline',
            size: 'large',
            width: '100%',
          });
        }

        // Give the button time to fully render
        setTimeout(() => {
          setIsGoogleReady(true);
        }, 500);
      } catch (error) {
        console.error('Error initializing Google Sign-In:', error);
        showToast('Failed to initialize Google Sign-In', 'error');
      }
    };

    loadGoogleScript();

    return () => {
      // Cleanup is handled by Google SDK
    };
  }, [config.googleClientId, showToast]);

  const handleGoogleSignIn = () => {
    if (!isGoogleReady || !window.google) {
      showToast('Google sign-in is not ready yet', 'error');
      return;
    }

    try {
      // Try to find and click the hidden button
      const googleBtn =
        containerRef.current?.querySelector('div[role="button"]');

      if (googleBtn) {
        googleBtn.click();
      } else {
        // Fallback: trigger the One Tap UI
        window.google.accounts.id.prompt((notification) => {
          if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
            // If One Tap didn't show, try clicking the button again
            setTimeout(() => {
              const btn =
                containerRef.current?.querySelector('div[role="button"]');
              if (btn) {
                btn.click();
              } else {
                showToast('Google sign-in is not ready yet', 'error');
              }
            }, 300);
          }
        });
      }
    } catch (error) {
      console.error('Error triggering Google Sign-In:', error);
      showToast('Failed to trigger Google sign-in', 'error');
    }
  };

  return (
    <div className="relative w-full">
      {/* Hidden Google button — handles the actual auth */}
      <div
        ref={containerRef}
        id="google-btn-container"
        className="absolute opacity-0 pointer-events-none h-0 w-0"
      />

      {/* Custom styled button */}
      <button
        type="button"
        onClick={handleGoogleSignIn}
        disabled={isLoading || !isGoogleReady}
        className="flex w-full gradient-inputbox text-white-200 text-sm leading-5 items-center justify-center gap-2 rounded-lg py-3 px-[18px] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <h3 className="flex items-center gap-3 ml-4">
          {isLoading ? <Loader /> : <GoogleIcon />}
          Continue with Google
        </h3>
      </button>
    </div>
  );
}
