'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSidebar } from '../../context/SidebarContext';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import Image from 'next/image';
import {
  AgentIcon,
  CalenderIcon,
  DailyBriefIcon,
  HomeIcon,
  InboxIcon,
  KIcon,
  MeetingIcon,
  PipelineIcon,
  SearchIcon,
  SearchShortCutIcon,
  SettingsIcon,
  SidebarIcon,
  WorkflowIcon,
} from '@/assets/icons';

type NavItem = {
  name: string;
  icon?: React.ReactNode;
  path: string;
};

const AppSidebar: React.FC = () => {
  const user = useSelector((state: RootState) => state.profile.user);
  console.log('User in AppSidebar:', user);
  const {
    isExpanded,
    isMobileOpen,
    toggleSidebar,
    toggleMobileSidebar,
    isHovered,
  } = useSidebar();
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  const navItems: NavItem[] = [
    {
      icon: <DailyBriefIcon />,
      name: 'Daily brief',
      path: '/dashboard/daily-brief',
    },
    {
      icon: <HomeIcon />,
      name: 'Home',
      path: '/dashboard',
    },
    {
      icon: <MeetingIcon />,
      name: 'Meetings',
      path: '/dashboard/meetings',
    },
    {
      icon: <CalenderIcon />,
      name: 'Calendar',
      path: '/dashboard/calendar',
    },
    {
      icon: <AgentIcon />,
      name: 'Agents',
      path: '/dashboard/agents',
    },
    {
      icon: <WorkflowIcon />,
      name: 'Workflow',
      path: '/dashboard/workflow',
    },
    {
      icon: <PipelineIcon />,
      name: 'Pipeline',
      path: '/dashboard/pipeline',
    },
    {
      icon: <InboxIcon />,
      name: 'Inbox',
      path: '/dashboard/inbox',
    },
  ];

  const renderMenuItems = (items: NavItem[]) => (
    <ul className="flex flex-col font-genaral">
      {items.map((item) => {
        const active = isActive(item.path);

        return (
          <li key={item.name}>
            <Link
              href={item.path}
              className={` group  font-general flex items-center gap-2 rounded-lg px-4 py-3 transition-colors ${
                active
                  ? 'font-medium text-sm bg-green-100 text-white'
                  : 'hover:bg-gray-25 text-white-100'
              }`}
            >
              <span>{item.icon}</span>
              {(isExpanded || isMobileOpen) && <span>{item.name}</span>}
            </Link>
          </li>
        );
      })}
    </ul>
  );

  return (
    <aside
      className={`fixed sidebardesign max-w-[1690px] mx-auto mt-16 flex flex-col justify-between lg:mt-0 top-0 left-0  dark:bg-gray-900 dark:border-[#202124] text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-[#202124] 
    ${isExpanded || isMobileOpen ? 'w-[290px]' : 'w-[90px]'}
    ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
    >
      <div>
        {' '}
        {/* Logo */}
        <div
          className={` px-4 flex border-b border-[#202124] ${
            !isExpanded && !isHovered
              ? 'lg:justify-center pt-[21px] pb-[16px]'
              : 'justify-start py-[30px]'
          }`}
        >
          <div className="w-full">
            {isExpanded || isMobileOpen ? (
              <div className="flex items-center justify-between w-full">
                <Link href="/">
                  <Image
                    src="/images/fulllogo.png"
                    alt="Logo"
                    width={100}
                    height={50}
                  />
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    if (isMobileOpen) toggleMobileSidebar();
                    else toggleSidebar();
                  }}
                  className="ml-2 text-white/60 hover:text-white/90 transition-colors"
                  aria-label="Collapse sidebar"
                >
                  <SidebarIcon />
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-4 items-center">
                <Image
                  src="/images/fulllogo.png"
                  alt="Logo"
                  width={60}
                  height={50}
                />
                <button
                  type="button"
                  onClick={() => {
                    if (isMobileOpen) toggleMobileSidebar();
                    else toggleSidebar();
                  }}
                  className=" text-white/60 hover:text-white/90 transition-colors"
                  aria-label="Collapse sidebar"
                >
                  <SidebarIcon />
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col mx-4 overflow-y-auto no-scrollbar">
          <div className="my-4 py-2 flex items-center border-[#232225] border rounded-lg px-2">
            <div>
              <SearchIcon />
            </div>
            <input
              type="text"
              placeholder="Search..."
              className="ml-2 w-full bg-transparent focus:outline-none font-general text-sm text-[#8C8C8C]"
            />
            <div
              className={` ${!isExpanded && !isHovered ? 'hidden' : 'justify-start'} flex items-center gap-1 ml-2`}
            >
              <button className="gradient flex justify-center items-center w-6 h-6">
                <SearchShortCutIcon />
              </button>
              <button className="gradient flex justify-center items-center w-6 h-6">
                <KIcon />
              </button>
            </div>
          </div>
          {/* Menu */}
          <nav className=" py-4">{renderMenuItems(navItems)}</nav>
        </div>
      </div>

      <div className="text-white flex items-center pb-3 justify-between mx-4">
        <div className={`flex gap-1 items-center `}>
          <span className="mr-3 flex justify-center items-center  overflow-hidden rounded-full h-11 w-11 dark:hover:bg-gray-800 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100">
            {user?.profile_picture ? (
              <Image
                src={user?.profile_picture}
                width={40}
                height={40}
                alt="User"
                className="w-full h-full object-cover overflow-hidden rounded-full"
              />
            ) : (
              <Image
                src={'/images/Avatar.png'}
                width={40}
                height={40}
                alt="User"
                className="w-full h-full object-cover overflow-hidden rounded-full"
              />
            )}
          </span>
          <div
            className={`flex flex-col ${!isExpanded && !isHovered ? 'hidden' : 'block'}`}
          >
            <h3 className="font-general font-medium text-white-200">
              {user?.first_name} {user?.last_name}
            </h3>
            <h3 className="font-general text-[10px] text-[#8C8C8C]">
              Free plan
            </h3>
          </div>
        </div>
        <div
          className={`mr-4 cursor-pointer flex ${!isExpanded && !isHovered ? 'hidden' : 'justify-start'}`}
        >
          <SettingsIcon />
        </div>
      </div>
    </aside>
  );
};

export default AppSidebar;
