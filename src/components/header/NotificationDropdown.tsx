'use client';

import React, { useState } from 'react';
import { Dropdown } from '../ui/dropdown/Dropdown';
import { notifications as allNotifications } from '../../utils/data';

export default function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifying, setNotifying] = useState(true);
  const [activeTab, setActiveTab] = useState('all');

  const filteredNotifications = allNotifications.filter((n) =>
    activeTab === 'all' ? true : activeTab === 'read' ? n.read : !n.read
  );

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
        className="absolute mt-4 w-[380px] max-h-[396px] overflow-y-auto rounded-3xl border border-gray-200 bg-white p-4 shadow-lg
        sm:left-1/2 -translate-x-1/2
        lg:left-auto lg:right-0 lg:translate-x-0"
      >
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-md font-open-sans font-semibold text-black uppercase">
            Notifications
          </h2>
          <button className="flex items-center text-sm text-gray-500 hover:text-black">
            Refresh
          </button>
        </div>

        <div className="flex items-center gap-6 justify-between border-b border-gray-200 px-6 mt-4 mb-3 relative">
          {['all', 'read', 'unread'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative text-sm font-semibold capitalize font-open-sans pb-2 ${
                activeTab === tab
                  ? "text-black after:content-[''] after:absolute after:bottom-[-1px] after:left-0 after:h-[3px] after:w-full after:bg-black"
                  : 'text-gray-500 hover:text-black'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <ul className="flex flex-col gap-3">
          {filteredNotifications.length === 0 ? (
            <li className="text-center text-gray-500 text-sm">
              No notifications
            </li>
          ) : (
            filteredNotifications.map((item, idx) => {
              const isOld =
                item.time.includes('day') || item.time.includes('week');

              return (
                <li
                  key={idx}
                  className={`flex justify-between items-start p-3 rounded-xl transition ${
                    isOld
                      ? 'bg-gray-50 text-gray-400'
                      : 'bg-white text-gray-800'
                  }`}
                >
                  <div className={`p-2 rounded-full bg-gray-300`}>Noticon</div>

                  <div className="ml-3 flex-1">
                    <h3
                      className={`font-semibold text-[14px] font-open-sans ${
                        isOld ? 'text-gray-500' : 'text-gray-800'
                      }`}
                    >
                      {item.title}
                    </h3>
                    <p
                      className={`text-[12px] font-open-sans ${
                        isOld ? 'text-gray-400' : 'text-gray-600'
                      }`}
                    >
                      {item.description}
                    </p>
                  </div>

                  <span
                    className={`text-xs whitespace-nowrap ${isOld ? 'text-gray-400' : 'text-gray-700'}`}
                  >
                    {item.time}
                  </span>
                </li>
              );
            })
          )}
        </ul>
        <button className="mt-4 w-full text-center text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg py-2 hover:bg-gray-100">
          View All Notifications
        </button>
      </Dropdown>
    </div>
  );
}
