import React from 'react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative p-6 gap-28 cormorant-garamond bg-white z-1 dark:bg-gray-900 sm:p-0">
      <div className="relative flex lg:flex-row-reverse w-full h-screen justify-center flex-col sm:p-0">
        {children}
      </div>
    </div>
  );
}
