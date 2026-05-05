import { NewStarIcon } from '@/assets/icons';
import React from 'react';

export default function MeetingHeadings() {
  return (
    <div className=" px-6 py-4">
      <div className="space-y-2.5 flex items-center justify-between">
        <div>
          <h3 className="text-[24px]  text-white-200 font-instrument-serif">
            Welcome to Meetings
          </h3>
          <p className="text-[#797B72] font-medium text-sm max-w-[277px] ">
            Get the best out of your meetings with Viro’s AI capabilities and
            assistance.
          </p>
        </div>
        <button className="bg-[#A9D80E] text-sm text-[#101010] flex gap-1 font-medium px-2 py-1 rounded-md">
          <NewStarIcon />
          Join with viro
        </button>
      </div>
    </div>
  );
}
