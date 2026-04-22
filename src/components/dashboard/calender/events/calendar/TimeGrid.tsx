'use client';

import React from 'react';
import {
  GRID_START_HOUR,
  HOURS_IN_GRID,
  SLOT_HEIGHT_PX,
  TIMEZONE_LABEL,
} from '@/utils/constant';
import type { CalendarEventItem } from '@/components/types';
import {
  clamp,
  formatEventTimeRange,
  formatHourLabel,
  minutesSinceGridStart,
  sameDay,
  startOfDay,
} from '@/utils/data';
import DayWeekColumnHeaders from './DayWeekColumnHeaders';

type Props = {
  dayColumns: Date[];
  events: CalendarEventItem[];
  showChrome?: boolean;
  view: 'day' | 'week';
  onEventDetails?: (event: CalendarEventItem) => void;
};

export default function TimeGrid({
  dayColumns,
  view,
  events,
  showChrome = true,
  onEventDetails,
}: Props) {
  const gridHeight = HOURS_IN_GRID * SLOT_HEIGHT_PX;

  const eventsForDay = (day: Date) =>
    events.filter((e) => sameDay(startOfDay(e.start), startOfDay(day)));

  const layoutEvent = (e: CalendarEventItem) => {
    const startMin = minutesSinceGridStart(e.start);
    const endMin = minutesSinceGridStart(e.end);
    const durMin = Math.max(endMin - startMin, 15);
    const top = clamp((startMin / 60) * SLOT_HEIGHT_PX, 0, gridHeight);
    const height = clamp((durMin / 60) * SLOT_HEIGHT_PX, 38, gridHeight - top);
    return { top, height };
  };

  return (
    <div
      className={
        showChrome
          ? 'flex rounded-lg border mb-10 py-3 pb-4 border-[#333333] flex-col w-full min-w-0  overflow-hidden '
          : 'flex rounded-lg w-full min-w-0 border border-[#333333] flex-col overflow-hidden'
      }
    >
      <div className="flex">
        <div className="flex flex-col shrink-0 w-16  text-xs text-right pr-3 pt-0 text-[12px] text-[#AEAEAE] select-none">
          <div className="h-10 flex  font-medium  items-center justify-center w-full  ">
            {TIMEZONE_LABEL}
          </div>
          {Array.from(
            { length: HOURS_IN_GRID },
            (_, i) => GRID_START_HOUR + i
          ).map((h) => (
            <div
              key={h}
              style={{ height: SLOT_HEIGHT_PX }}
              className="pr-1 text-xs flex items-start  justify-end pt-0 "
            >
              {formatHourLabel(h)}
            </div>
          ))}
        </div>
        <div className="flex-1    flex-col  min-w-0 flex overflow-hidden">
          <DayWeekColumnHeaders
            dates={dayColumns}
            singleColumn={view === 'day'}
          />
          <div className="flex">
            {dayColumns.map((day) => (
              <div
                key={day.toISOString()}
                className="flex-1 min-w-0 border border-[#333333] first:border-r-0 relative"
              >
                <div className="relative" style={{ height: gridHeight }}>
                  {Array.from({ length: HOURS_IN_GRID }).map((_, i) => (
                    <div
                      key={i}
                      style={{ height: SLOT_HEIGHT_PX }}
                      className="border-b border-[#262626]/80"
                    />
                  ))}

                  {eventsForDay(day).map((e) => {
                    const { top, height } = layoutEvent(e);
                    return (
                      <div
                        key={e.id}
                        onClick={() => onEventDetails?.(e)}
                        className="absolute cursor-pointer left-0  right-0 rounded overflow-hidden bg-[#5392C5]  z-10"
                        style={{ top, height }}
                      >
                        <div className="flex h-full">
                          <div className="px-2 py-1 min-w-0 flex flex-col justify-center">
                            <p className="text-[#171717] text-[11px] font-medium truncate">
                              {e.title}
                            </p>
                            <p className="text-[10px] text-[#171717] truncate">
                              {formatEventTimeRange(e.start, e.end)}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
