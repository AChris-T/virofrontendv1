'use client';
import React from 'react';

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative  z-1 dark:bg-gray-900 md:p-0">
      <div className="relative flex lg:flex-row-reverse w-full h-full justify-center flex-col sm:p-0">
        <div className="w-full h-full  backgounddesign text-white">
          <div className="px-10 md:px-0 h-full">{children}</div>
        </div>
      </div>
    </div>
  );
}
