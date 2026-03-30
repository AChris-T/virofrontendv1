'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import Loader from '@/components/ui/Loader';
import { getSessionCookie, setSessionCookie } from '@/lib/session';
import { useRefreshAuthMutation } from '@/store/auth/auth.api';

export default function Inviteusers() {
  const router = useRouter();
  const [isChecking, setIsChecking] = React.useState(true);
  const hasRunRef = React.useRef(false);
  const [refreshAuth /* { isLoading: isRefreshing } */] =
    useRefreshAuthMutation();

  React.useEffect(() => {
    // Avoid duplicate refresh calls in React strict/dev re-mounts.
    if (hasRunRef.current) return;
    hasRunRef.current = true;

    const run = async () => {
      try {
        const session = await getSessionCookie();
        if (!session || typeof session === 'string') {
          router.replace('/signin');
          return;
        }

        const refreshToken = session?.refresh_token ?? null;
        const role = session?.role ?? 'user';

        const data = await refreshAuth({
          refresh_token: refreshToken,
        }).unwrap();

        const newAccessToken =
          data?.access_token ?? data?.token?.access_token ?? data?.token;
        const newRefreshToken =
          data?.refresh_token ?? data?.token?.refresh_token;

        const onboarded = !!(
          data?.user?.onboarded ??
          data?.user?.isOnboarded ??
          data?.onboarded ??
          true
        );

        if (newAccessToken) {
          await setSessionCookie({
            token: newAccessToken,
            refresh_token: newRefreshToken ?? refreshToken,
            role,
            onboarded,
          });
        }

        // Single redirect decision to avoid flicker/loops.
        router.replace(onboarded ? '/dashboard' : '/onboarding');
      } catch {
        // If refresh fails, rely on existing cookie onboarding state.
        try {
          const session = await getSessionCookie();
          const onboardedFallback =
            session && typeof session !== 'string'
              ? !!session?.onboarded
              : false;
          router.replace(onboardedFallback ? '/dashboard' : '/onboarding');
        } catch {
          router.replace('/signin');
        }
      } finally {
        setIsChecking(false);
      }
    };

    run();
  }, [refreshAuth, router]);

  if (!isChecking) return null;
  return (
    <div className="flex items-center justify-center h-full w-full">
      <Loader />
    </div>
  );
}
