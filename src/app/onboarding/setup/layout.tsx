'use client';
import Image from 'next/image';
import React from 'react';

export default function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative overflow-y-scroll max-h-[100%] no-scrollbar  z-1  md:p-0">
      <div className="w-full  pt-40 pb-10 gap-[64px]  flex flex-col justify-center items-center  text-white">
        <Image
          src="/images/Logo.png"
          alt="Viro"
          width={50}
          height={50}
          className="relative z-10"
        />
        <div className=" md:px-0 w-full">{children}</div>
      </div>
    </div>
  );
}
