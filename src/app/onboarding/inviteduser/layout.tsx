'use client';
import React from 'react';

export default function InvitedUserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative   z-1 dark:bg-gray-900 md:p-0">
      <div className="w-full h-[100vh]  backgounddesign text-white">
        <div className=" h-full overflow-y-hidden   ">{children}</div>
      </div>
    </div>
  );
}
