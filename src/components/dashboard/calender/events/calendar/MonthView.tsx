'use client';

import React from 'react';
import MonthCell from './MonthCell';
import { WEEK_DAYS_SHORT } from '@/utils/constant';
import { CalendarEventItem } from '../Calender';

type Props = {
  anchorMonth: Date;
  monthGrid: Date[][];
  events: CalendarEventItem[];
};

export default function MonthView({ anchorMonth, monthGrid, events }: Props) {
  return (
    <div className="border border-[#262626] rounded-xl overflow-hidden">
      <div className="grid grid-cols-7 border-b border-[#262626]">
        {WEEK_DAYS_SHORT.map((d) => (
          <div key={d} className="py-2 text-center text-[12px] text-white-100 ">
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {monthGrid.flat().map((cellDate, idx) => (
          <MonthCell
            key={`${cellDate.toISOString()}-${idx}`}
            cellDate={cellDate}
            anchorMonth={anchorMonth}
            events={events}
          />
        ))}
      </div>
    </div>
  );
}
