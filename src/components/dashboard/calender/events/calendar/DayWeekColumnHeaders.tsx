'use client';

import React from 'react';
import { WEEK_DAYS } from '@/utils/constant';
import { sameDay } from '@/utils/data';

type Props = {
  dates: Date[];
  singleColumn: boolean;
};

export default function DayWeekColumnHeaders({ dates, singleColumn }: Props) {
  return (
    <div
      className={`grid gap-2 ${singleColumn ? 'grid-cols-1' : 'grid-cols-7'}`}
    >
      {dates.map((d) => (
        <div
          key={d.toISOString()}
          className="flex flex-col justify-center w-[30px] items-center  px-[57px] pb-1"
        >
          <div className="text-sm text-white-100">{WEEK_DAYS[d.getDay()]}</div>
          <div
            className={`text-xl font-medium ${
              sameDay(d, new Date()) ? 'text-[#BEF264]' : 'text-white'
            }`}
          >
            {d.getDate()}
          </div>
        </div>
      ))}
    </div>
  );
}
