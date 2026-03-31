'use client';
import Stepper from '@/components/dashboard/onboarding/Stepper';
import Image from 'next/image';
import React from 'react';

export default function WorkSpaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative  overflow-y-scroll max-h-[100%] no-scrollbar  z-1 dark:bg-gray-900 md:p-0">
      <div className="w-full h-full my-20 gap-[24px]  flex flex-col justify-center items-center  text-white">
        <Image
          src="/images/Logo.png"
          alt="Viro"
          width={50}
          height={50}
          className="relative z-10"
        />
        <div className="w-full space-y-3  md:px-10  max-w-[650px] mx-auto">
          <Stepper total={5} step={5} />
        </div>
        <div className="w-full mx-auto max-w-[572px]">{children}</div>
      </div>
    </div>
  );
}
