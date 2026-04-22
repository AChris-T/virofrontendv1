'use client';

import { ThemeToggleButton } from '@/components/common/ThemeToggleButton';
import NotificationDropdown from '@/components/header/NotificationDropdown';
import Profile from '@/components/user-profile/profile';
import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';
import { SidebarIcon } from '@/assets/icons';
import PageTitle from '@/components/ui/PageTitle';
import { useHeader } from './Header';
import { useSidebar } from '@/context/SidebarContext';

const AppHeader: React.FC = () => {
  const [isApplicationMenuOpen] = useState(false);
  const { headerContent } = useHeader();
  const { toggleMobileSidebar } = useSidebar();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <header className="sticky top-0 h-[64px] font-general flex w-full  border-[#202124] z-50  border-b">
      <div className="flex flex-col items-center justify-between grow lg:flex-row lg:px-6">
        <div className="flex items-center  w-full gap-2 px-3 py-4    dark:border-gray-800 sm:gap-4 lg:justify-normal  lg:px-0 lg:py-4">
          <button
            type="button"
            onClick={toggleMobileSidebar}
            className="lg:hidden flex rounded-md p-1 text-white/60 transition-colors hover:bg-[#1D1D1D] hover:text-white/90"
            aria-label="Toggle sidebar"
          >
            <SidebarIcon />
          </button>
          <Link href="/" className="text-white">
            <PageTitle />
          </Link>
          {/*  <button
            onClick={toggleApplicationMenu}
            className="flex items-center justify-center w-10 h-10 text-gray-700 rounded-lg z-10 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 lg:hidden"
          >
            <SidebarIcon />
          </button> */}
        </div>
        <div
          className={`${isApplicationMenuOpen ? 'flex' : 'hidden'}
    items-center justify-between w-full gap-4 px-5 py-4 
    lg:flex shadow-theme-md lg:justify-end lg:px-0 lg:shadow-none
     `}
        >
          <div className="flex items-center gap-2 2xsm:gap-3">
            <ThemeToggleButton />
            <NotificationDropdown />
            <div className="flex items-center gap-3">{headerContent}</div>
          </div>
          {/* <!-- User Area --> 
          <UserDropdown />
          */}
        </div>
      </div>
      <Profile />
    </header>
  );
};

export default AppHeader;
