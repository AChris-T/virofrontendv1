'use client';

import React from 'react';
import Toggle from '../Toggle/Toggle';
import type { MeetingCardProps } from '@/components/types';

export const MeetingCard: React.FC<MeetingCardProps> = ({
  title,
  description,
  time,
  meetingIcon,
  descriptionIcon,
  showAssignToggle = false,
  isAssigned = false,
  onToggleAssign,
  onJoin,
}) => {
  return (
    <div className="w-full bg-[#262626]  border border-[#333333] rounded-lg px-2.5 py-4 text-white">
      <div className="flex items-center justify-between text-xs text-[#BFBFBF] mb-3 ">
        <span>{time}</span>
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
      <div className="flex items-center justify-between  bg-[#2E2E2E] border-[#333333] border px-2  rounded  py-2 relative">
        <div className="flex items-center gap-2">
          <div className=" left-2.5 h-12 top-2.5 bottom-0 w-[3px]  bg-[#0262B1] rounded-sm" />
          <div className="">
            <h3 className=" font-medium text-white-200">{title}</h3>
            {description && (
              <p className="text-[10px] flex  gap-1 text-[#8C8C8C] mt-1">
                {descriptionIcon}
                {description}
              </p>
            )}
          </div>
        </div>
        <button
          onClick={onJoin}
          className="flex font-medium text-white-200 items-center gap-2  rounded-full px-4 py-2 text-sm  transition"
        >
          {meetingIcon}
        </button>
      </div>
    </div>
  );
};
