'use client';

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CalendarViewMode } from '@/components/types';
import SelectDropdown from '@/components/ui/dropdown/SelectDropdown';

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
  const scheduleOptions: Array<{ label: string; value: CalendarViewMode }> = [
    { label: 'Day', value: 'day' },
    { label: 'Week', value: 'week' },
    { label: 'Month', value: 'month' },
    { label: 'Schedule', value: 'schedule' },
  ];

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

        <SelectDropdown
          name="schedule"
          ariaLabel="Schedule view"
          value={view}
          options={scheduleOptions}
          onChange={onViewChange}
          triggerClassName="cursor-pointer"
          menuClassName="max-w-[100px] text-sm"
        />

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
