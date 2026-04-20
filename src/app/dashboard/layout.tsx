'use client';

import { useSidebar } from '@/context/SidebarContext';
import AppHeader from '@/layout/dashboard/AppHeader';
import AppSidebar from '@/layout/dashboard/AppSidebar';
import Backdrop from '@/layout/dashboard/Backdrop';
import { HeaderProvider } from '@/layout/dashboard/Header';
import React from 'react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();

  const mainContentMargin = isMobileOpen
    ? 'ml-0'
    : isExpanded || isHovered
      ? 'lg:ml-[290px]'
      : 'lg:ml-[90px]';

  return (
    <div className="min-h-screen bg-[#060606] xl:flex">
      <HeaderProvider>
        <AppSidebar />
        <Backdrop />
        <div
          className={`flex-1 transition-all  duration-300 ease-in-out ${mainContentMargin}`}
        >
          <AppHeader />
          <div className=" ">{children}</div>
        </div>
      </HeaderProvider>
    </div>
  );
}
