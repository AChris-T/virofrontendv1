'use client';

import React from 'react';
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { CalendarViewMode } from '@/components/types';

type Props = {
  title: string;
  view: CalendarViewMode;
  onViewChange: (view: CalendarViewMode) => void;
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
};

export default function CalendarHeader({
  title,
  view,
  onViewChange,
  onPrev,
  onNext,
  onToday,
}: Props) {
  return (
    <div className="flex font-general flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="  text-white-200 font-medium tracking-tight">{title}</h2>
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={onPrev}
          className="h-9 w-9 inline-flex items-center justify-center  text-white/80 hover:bg-white/5"
          aria-label="Previous"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={onNext}
          className="h-9 w-9 inline-flex items-center justify-center   text-white/80 hover:bg-white/5"
          aria-label="Next"
        >
          <ChevronRight className="h-4 w-4" />
        </button>

        <div className="relative">
          <select
            name="view"
            aria-label="Calendar view"
            value={view}
            onChange={(e) => onViewChange(e.target.value as CalendarViewMode)}
            className="appearance-none h-9 pl-3 pr-8 rounded-lg focus:outline-none bg-[#141414] text-sm text-white/90 cursor-pointer"
          >
            <option value="day">Day</option>
            <option value="week">Week</option>
            <option value="month">Month</option>
          </select>
          <ChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50" />
        </div>

        <button
          type="button"
          onClick={onToday}
          className="h-9 px-4 rounded-lg bg-[#0F0F0F] text-sm text-white/90 hover:bg-white/5"
        >
          Today
        </button>
      </div>
    </div>
  );
}
