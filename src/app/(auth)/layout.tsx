'use client';
import { ArrowRightIcon, CloseIcon } from '@/assets/icons';
import Slide from '@/components/auth/AuthSlider/Slide';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isSignIn = pathname === '/signin';
  return (
    <div className="relative  z-1dark:bg-gray-900 md:p-0">
      <div className="relative flex lg:flex-row-reverse w-full h-screen overflow-y-hidden justify-center flex-col sm:p-0">
        <div className="w-full h-full  backgounddesign">
          <div>
            {!isSignIn && (
              <Link
                href={'/signin'}
                className="text-white border bg-[#202124] border-[#202124] w-8 h-8 rounded-full flex justify-center items-center p-1 absolute top-4 lg:ml-10 ml-3"
              >
                <ArrowRightIcon className="cursor-pointer" />
              </Link>
            )}
            <Link
              href={'/'}
              className="text-white border bg-[#0F0F0F80] border-[#202124] w-8 h-8 rounded-full flex justify-center items-center p-1 absolute top-4 right-4 "
            >
              <CloseIcon className="cursor-pointer" fill={'#737373'} />
            </Link>
          </div>
          <div className="px-10 md:px-0 h-full">{children}</div>
        </div>
        <div className="w-full h-full relative hidden lg:block">
          <Slide />
        </div>
      </div>
    </div>
  );
}
