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
  ArrowDownIcon,
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
  badge?: string;
};

type NavSection = {
  title: string;
  items: NavItem[];
};

const AppSidebar: React.FC = () => {
  const user = useSelector((state: RootState) => state.profile.user);
  const {
    isExpanded,
    isMobileOpen,
    toggleSidebar,
    toggleMobileSidebar,
    isHovered,
  } = useSidebar();
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  const navSections: NavSection[] = [
    {
      title: 'Main',
      items: [
        {
          icon: <DailyBriefIcon className="text-current" />,
          name: 'Daily Brief',
          path: '/dashboard/daily-brief',
        },
        {
          icon: <HomeIcon className="text-current" />,
          name: 'Home',
          path: '/dashboard',
        },
        {
          icon: <CalenderIcon className="text-current" />,
          name: 'Calendar',
          path: '/dashboard/calendar',
        },
        {
          icon: <MeetingIcon className="text-current" />,
          name: 'Meetings',
          path: '/dashboard/meetings',
        },
      ],
    },
    {
      title: 'Automations',
      items: [
        {
          icon: <AgentIcon className="text-current" />,
          name: 'Agents',
          path: '/dashboard/agents',
        },
        {
          icon: <WorkflowIcon className="text-current" />,
          name: 'Workflows',
          path: '/dashboard/workflow',
        },
        {
          icon: <PipelineIcon className="text-current" />,
          name: 'Pipeline',
          path: '/dashboard/pipeline',
        },
      ],
    },
    {
      title: 'Personal',
      items: [
        {
          icon: <InboxIcon className="text-current" />,
          name: 'Inbox',
          path: '/dashboard/inbox',
          badge: '1',
        },
        {
          icon: <SettingsIcon />,
          name: 'Settings',
          path: '/dashboard/profile',
        },
      ],
    },
  ];

  const renderMenuItems = (items: NavItem[]) => (
    <ul className="flex flex-col gap-1 font-general">
      {items.map((item) => {
        const active = isActive(item.path);

        return (
          <li key={item.name}>
            <Link
              href={item.path}
              className={`group relative flex items-center gap-3 rounded px-3 py-2.5 text-sm transition-all ${
                active
                  ? 'border-l-1 border-[#A9D80E] bg-[linear-gradient(90deg,rgba(60,242,57,0.06)_-6.39%,rgba(221,242,57,0.03)_50%)] text-[#B7F11A]'
                  : 'text-[#8C8C8C]  hover:text-[#D9D9D9]'
              }`}
            >
              <span className="shrink-0">{item.icon}</span>
              {(isExpanded || isMobileOpen) && (
                <>
                  <span className="truncate">{item.name}</span>
                  {item.badge && (
                    <span className="ml-auto inline-flex h-5 min-w-[20px] items-center justify-center rounded-md bg-[#0E2138] px-1.5 text-[11px] font-medium text-[#60A5FA]">
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </Link>
          </li>
        );
      })}
    </ul>
  );

  return (
    <aside
      className={`fixed top-4 m-2 left-0 z-50 flex h-[95vh] flex-col justify-between rounded-lg border border-[#333333] bg-[#131313] text-gray-900 transition-all duration-300 ease-in-out lg:mt-0 dark:border-[#202124] dark:bg-gray-900
    ${isExpanded || isMobileOpen ? 'w-[290px] ' : 'w-[90px] '}
    ${isMobileOpen ? 'translate-x-0 bg-[#0F0F0FE0] z-99' : '-translate-x-full   hidden lg:flex'} lg:translate-x-0`}
    >
      <div className="flex min-h-0 flex-1 flex-col">
        <div
          className={`flex h-[64px] border-b border-[#202124] px-4 ${
            !isExpanded && !isHovered
              ? 'lg:justify-center items-center '
              : 'justify-start py-6'
          }`}
        >
          <div className="w-full">
            {isExpanded || isMobileOpen ? (
              <div className="flex items-center justify-between w-full">
                <Link href="/">
                  <Image
                    src="/images/fulllogo.png"
                    alt="Logo"
                    width={92}
                    height={32}
                  />
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    if (isMobileOpen) toggleMobileSidebar();
                    else toggleSidebar();
                  }}
                  className="ml-2 rounded-md p-1 text-white/60 transition-colors hover:bg-[#1D1D1D] hover:text-white/90"
                  aria-label="Collapse sidebar"
                >
                  <SidebarIcon />
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-4 items-center">
                {/* <Image
                  src="/images/fulllogo.png"
                  alt="Logo"
                  width={60}
                  height={50}
                /> */}
                <button
                  type="button"
                  onClick={() => {
                    if (isMobileOpen) toggleMobileSidebar();
                    else toggleSidebar();
                  }}
                  className="rounded-md p-1 text-white/60 transition-colors hover:bg-[#1D1D1D] hover:text-white/90"
                  aria-label="Collapse sidebar"
                >
                  <SidebarIcon />
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="mx-2 flex min-h-0 flex-1 flex-col overflow-y-auto px-2 no-scrollbar">
          <div className="my-3 flex items-center rounded-lg border border-[#333333] bg-transparent px-2.5 py-2">
            <div className="shrink-0">
              <SearchIcon />
            </div>
            <input
              type="text"
              placeholder="Search"
              className="ml-2 w-full bg-transparent font-general text-sm text-[#8C8C8C] placeholder:text-[#6E6E6E] focus:outline-none"
            />
            <div
              className={`${!isExpanded && !isHovered ? 'hidden' : 'flex'} ml-2 items-center gap-1`}
            >
              <button className="flex h-6 w-6 items-center justify-center rounded border border-[#333333] ">
                <SearchShortCutIcon />
              </button>
              <button className="flex h-6 w-6 items-center justify-center rounded border border-[#333333] ">
                <KIcon />
              </button>
            </div>
          </div>

          <nav
            className={`${isExpanded || isMobileOpen ? '' : 'flex flex-col justify-center items-center'} pb-4  w-full `}
          >
            {navSections.map((section) => (
              <div
                key={section.title}
                className="mb-4 border-b border-[#1E1E1E] pb-4 last:border-b-0 last:pb-0"
              >
                {(isExpanded || isMobileOpen) && (
                  <p className="px-2 pb-2 text-[11px] font-semibold uppercase tracking-wide text-[#5E5E5E]">
                    {section.title}
                  </p>
                )}
                {renderMenuItems(section.items)}
              </div>
            ))}
          </nav>

          {(isExpanded || isMobileOpen) && (
            <div className="mt-auto rounded-xl border backgrounddes border-[#2A2A2A]  p-3">
              <p className="text-sm font-medium text-[#F3F3F3]">Starter Plan</p>
              <p className="mt-1 text-xs text-[#8C8C8C]">
                Upgrade for more AI efficiencies
              </p>
              <button className="mt-3 h-9 w-full rounded-lg bg-[#A9D80E] text-sm font-medium text-[#101010] transition-colors hover:bg-[#B9EB12]">
                Upgrade Plan
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="mx-4 mb-3 mt-3 border-t border-[#232323] pt-3 text-white">
        <div className="flex items-center justify-between">
          <div className="flex justify-center w-full items-center gap-2 min-w-0">
            <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full">
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
            {(isExpanded || isMobileOpen) && (
              <div className="min-w-0">
                <h3 className="truncate font-general text-sm font-medium text-[#F5F5F5]">
                  {user?.first_name || 'User'} {user?.last_name || ''}
                </h3>
                <h3 className="truncate font-general text-[11px] text-[#7A7A7A]">
                  {user?.email || 'heyjohnwick@work.mail'}
                </h3>
              </div>
            )}
          </div>
          {(isExpanded || isMobileOpen) && (
            <button className="rounded-md p-1 text-[#8C8C8C] hover:bg-[#1D1D1D]">
              <ArrowDownIcon />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};

export default AppSidebar;
