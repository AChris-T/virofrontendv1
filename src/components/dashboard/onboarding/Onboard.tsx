'use client';
import { ViroIcon } from '@/assets/ViroIcon';
import { RootState } from '@/store';
import Image from 'next/image';
import Link from 'next/link';
import { useSelector } from 'react-redux';

export default function Onboard() {
  const user = useSelector((state: RootState) => state.profile.user);
  console.log(user);

  return (
    <div className="relative mt-[100px] mb-20 justify-center  items-center gap-8 flex flex-col w-full h-full">
      <Image
        src="/images/Logo.png"
        alt="Viro"
        width={50}
        height={50}
        className="relative z-10"
      />
      <h3 className="font-general text-[32px] text-center">
        Hi {user?.first_name || 'there'}, Welcome to{' '}
        <span className="font-instrument-serif italic">Viro</span>
      </h3>
      <div className="flex justify-center items-center mt-20">
        <ViroIcon />
      </div>
      <Link
        href="/onboarding/setup"
        className={`flex w-[280px] font-general items-center justify-center mt-14 px-4 py-3 text-sm font-medium text-white transition rounded-full shadow-theme-xs  disabled:opacity-50 disabled:cursor-not-allowed bg-green-100
                    `}
      >
        Get Started
      </Link>
    </div>
  );
}
