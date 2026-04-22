'use client';

import React from 'react';
import { WEEK_DAYS, WEEK_DAYS_LONG } from '@/utils/constant';
import { sameDay } from '@/utils/data';

type Props = {
  dates: Date[];
  singleColumn: boolean;
};

export default function DayWeekColumnHeaders({ dates, singleColumn }: Props) {
  return (
    <div
      className={`grid gap-2 ${singleColumn ? 'grid-cols-1  h-full' : 'grid-cols-7'}`}
    >
      {dates.map((d) => (
        <div
          key={d.toISOString()}
          className={`flex ${singleColumn ? 'flex-row gap-2' : 'flex-col'} justify-center  items-center  px-[57px] pb-1`}
        >
          <div className="text-xs uppercase  font-semibold text-white-100">
            {singleColumn ? WEEK_DAYS_LONG[d.getDay()] : WEEK_DAYS[d.getDay()]}
          </div>
          <div
            className={`${singleColumn ? 'text-base' : 'text-xl'} font-medium ${
              sameDay(d, new Date()) ? 'text-[#BEF264]' : 'text-white-100'
            }`}
          >
            {d.getDate()}
          </div>
        </div>
      ))}
    </div>
  );
}
