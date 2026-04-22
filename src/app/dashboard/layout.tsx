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
    ? 'ml-2'
    : isExpanded || isHovered
      ? 'lg:ml-[300px]'
      : 'lg:ml-[100px]';

  return (
    <div className="min-h-screen max-h-[100vh] overflow-y-hidden p-2 bg-[#171717] xl:flex">
      <HeaderProvider>
        <AppSidebar />
        <Backdrop />
        <div
          className={`flex-1 overflow-y-hidden  transition-all bg-[#171717] border border-[#333333] m-2 rounded-lg  duration-300 ease-in-out ${mainContentMargin}`}
        >
          <AppHeader />
          <div className="max-h-[95vh] overscroll-y-scroll backgroundde ">
            {children}
          </div>
        </div>
      </HeaderProvider>
    </div>
  );
}
