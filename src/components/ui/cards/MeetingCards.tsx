'use client';

import React from 'react';
import Toggle from '../Toggle/Toggle';

type MeetingCardProps = {
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  isToday?: boolean;
  descriptionIcon?: string | React.ReactNode;
  meetingIcon?: string | React.ReactNode;
  showAssignToggle?: boolean;
  isAssigned?: boolean;
  onToggleAssign?: (value: boolean) => void;

  onJoin?: () => void;
};

export const MeetingCard: React.FC<MeetingCardProps> = ({
  title,
  description,
  startTime,
  meetingIcon,
  descriptionIcon,
  endTime,
  isToday = true,
  showAssignToggle = false,
  isAssigned = false,
  onToggleAssign,
  onJoin,
}) => {
  return (
    <div className="w-full  border border-[#202124] rounded-xl py-4 text-white">
      {/* Top Row */}
      <div className="flex items-center justify-between text-sm text-gray-400 mb-3 px-2.5">
        <span>
          {isToday ? 'Today' : 'Scheduled'} • {startTime} - {endTime}
        </span>

        {showAssignToggle && (
          <div className="flex items-center gap-2">
            <span className="text-xs">Assign Agent</span>

            <Toggle
              checked={isAssigned}
              onChange={(val) => onToggleAssign?.(val)}
            />
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex items-center justify-between border-t px-2 border-[#202124] rounded-lg  py-2 relative">
        {/* Left accent bar */}
        <div className="flex items-center gap-2">
          <div className=" left-2.5 h-12 top-2.5 bottom-0 w-[3px]  bg-[#0262B1] rounded-sm" />

          <div className="">
            <h3 className=" font-medium text-white-200">{title}</h3>
            {description && (
              <p className="text-[10px] flex items-center gap-1 text-[#8C8C8C] mt-1">
                {descriptionIcon}
                {description}
              </p>
            )}
          </div>
        </div>

        {/* Join Button */}
        <button
          onClick={onJoin}
          className="flex font-medium text-white-200 items-center gap-2 border border-gray-500 rounded-full px-4 py-2 text-sm  transition"
        >
          {meetingIcon}Join
        </button>
      </div>
    </div>
  );
};
