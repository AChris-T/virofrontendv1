'use client';

import React, { useState } from 'react';
import { Dropdown } from '../ui/dropdown/Dropdown';
import { MarkedNotificationIcon } from '@/assets/icons';

export default function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifying, setNotifying] = useState(true);

  const handleClick = () => {
    setIsOpen(!isOpen);
    setNotifying(false);
  };

  return (
    <div className="relative">
      <button
        className="relative dropdown-toggle flex items-center justify-center text-gray-500 transition-colors "
        onClick={handleClick}
      >
        <span
          className={`absolute right-0 top-0.5 z-10 h-2 w-2 rounded-full bg-[linear-gradient(90deg,#3CF239_0%,#DDF239_100%)] ${
            !notifying ? 'hidden' : 'flex'
          }`}
        >
          <span className="absolute inline-flex w-full h-full bg-[linear-gradient(90deg,#3CF239_0%,#DDF239_100%)] rounded-full opacity-75 animate-ping"></span>
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M9 21H15"
            stroke="#D9D9D9"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M5.24939 9.75C5.24939 7.95979 5.96055 6.2429 7.22642 4.97703C8.49229 3.71116 10.2092 3 11.9994 3C13.7896 3 15.5065 3.71116 16.7724 4.97703C18.0382 6.2429 18.7494 7.95979 18.7494 9.75C18.7494 13.1081 19.5275 15.8063 20.1463 16.875C20.212 16.9888 20.2466 17.1179 20.2468 17.2493C20.2469 17.3808 20.2124 17.5099 20.1469 17.6239C20.0814 17.7378 19.9871 17.8325 19.8735 17.8985C19.7598 17.9645 19.6308 17.9995 19.4994 18H4.49939C4.36813 17.9992 4.23936 17.964 4.12598 17.8978C4.01259 17.8317 3.91855 17.7369 3.85326 17.6231C3.78797 17.5092 3.75371 17.3801 3.75391 17.2489C3.75411 17.1176 3.78876 16.9887 3.85439 16.875C4.47221 15.8063 5.24939 13.1072 5.24939 9.75Z"
            stroke="#D9D9D9"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <Dropdown
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        className="absolute mt-4 w-[580px] max-h-[396px] overflow-y-auto no-scrollbar  border border-gray-200 bg-[#232225]  shadow-lg"
      >
        <div className=" border-[#404040] border-b flex items-center justify-between p-4">
          <h2 className="text-lg font-general font-medium text-[#fff] ">
            Notifications
          </h2>
          <button className="flex items-center gap-2 font-general text-[15px] text-[#8C8C8C] ">
            <MarkedNotificationIcon />
            Mark as read
          </button>
        </div>

        <div className="flex items-center text-white gap-6 p-4 justify-between bg-[#202124]  relative">
          No Notification yet
        </div>
      </Dropdown>
    </div>
  );
}
