'use client';
import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import useToastify from '@/hooks/useToastify';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '@/store/profile/profile.slice';
import { clearSessionCookie } from '@/lib/session';
import { RootState } from '@/store';
import { useGetMeQuery } from '@/store/profile/profile.api';

export default function GlobalAuthHandler() {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const { showToast } = useToastify();
  const user = useSelector((state: RootState) => state.profile.user);
  const isDashboardRoute =
    pathname.startsWith('/dashboard') || pathname.startsWith('/onboarding');
  const isWelcomePage = pathname.includes('/onboarding/welcome');
  const { data, isFetching } = useGetMeQuery(undefined, {
    skip: !isDashboardRoute || isWelcomePage,
  });

  useEffect(() => {
    if (data?.user?.id) {
      dispatch(setUser(data.user));
    }
  }, [data, dispatch]);

  useEffect(() => {
    if (!isDashboardRoute) return;
    if (isFetching) return;
    if (user?.id || data?.user?.id) return;

    if (pathname !== '/signin') {
      router.push(`/signin?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [
    pathname,
    user?.id,
    data?.user?.id,
    isDashboardRoute,
    isFetching,
    router,
  ]);

  useEffect(() => {
    if (!isDashboardRoute) return;

    const handleUnauthorized = async () => {
      await clearSessionCookie();
      dispatch(
        setUser({
          id: '',
          first_name: '',
          full_name: '',
          last_name: '',
          email: '',
          profile_picture: '',
          provider: '',
          role: '',
          deleted_at: null,
          created_at: '',
          updated_at: '',
        })
      );
      showToast('Session expired. Please log in again.', 'error');
      router.push('/signin');
    };

    window.addEventListener('unauthorized', handleUnauthorized);
    return () => window.removeEventListener('unauthorized', handleUnauthorized);
  }, [isDashboardRoute, dispatch, router, showToast]);

  return null;
}
