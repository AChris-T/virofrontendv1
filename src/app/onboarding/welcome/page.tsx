'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeftIcon, MovieIcon } from '@/assets/icons';
import { RootState } from '@/store';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import Loader from '@/components/ui/Loader';
import { getSessionCookie, setSessionCookie } from '@/lib/session';
import { useRefreshAuthMutation } from '@/store/auth/auth.api';

export default function Page() {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.profile.user);
  const [refreshAuth] = useRefreshAuthMutation();
  const [isRouting, setIsRouting] = React.useState(false);

  const goToDashboard = async () => {
    if (isRouting) return;
    setIsRouting(true);

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
      const newRefreshToken = data?.refresh_token ?? data?.token?.refresh_token;

      if (newAccessToken) {
        await setSessionCookie({
          token: newAccessToken,
          refresh_token: newRefreshToken ?? refreshToken,
          role,
          onboarded: true,
        });
      }

      router.replace('/dashboard');
    } catch {
      try {
        const session = await getSessionCookie();
        if (!session || typeof session === 'string') {
          router.replace('/signin');
          return;
        }
        router.replace('/dashboard');
      } catch {
        router.replace('/signin');
      }
    } finally {
      setIsRouting(false);
    }
  };
  return (
    <div className="flex h-full  w-full justify-center ">
      <div className="flex absolute w-full justify-center welcomebg items-center h-full"></div>
      <div className="flex flex-col z-99999 space-y-16  w-full justify-center  items-center h-full  ">
        <Image
          src="/images/Logo.png"
          alt="Viro"
          width={50}
          height={50}
          className="relative z-10"
        />
        <div className="space-y-12 flex-col justify-center items-center flex">
          <h3 className="font-general text-[28px] text-center">
            Congratulations {user?.first_name || 'there'}, You’re all set! 🎉
          </h3>
          <div className="space-y-3.5">
            <button
              type="button"
              onClick={goToDashboard}
              disabled={isRouting}
              className="flex font-general cursor-pointer items-center justify-center gap-2 w-[280px] px-4 py-3 text-sm font-medium text-white transition rounded-full shadow-theme-xs bg-green-100 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isRouting ? (
                <Loader />
              ) : (
                <>
                  Go to Dashboard
                  <span className="mt-1">
                    <ArrowLeftIcon />
                  </span>
                </>
              )}
            </button>
            <button
              type="button"
              className="flex font-general items-center cursor-pointer justify-center gap-2 w-[280px] px-4 py-3 text-sm font-medium text-white transition rounded-full shadow-theme-xs border-green-100 border"
            >
              Watch 2-min Tutorial
              <span className="mt-1">
                <MovieIcon />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
