'use client';

import React from 'react';
import {
  ACCENT_BAR,
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
};

export default function TimeGrid({
  dayColumns,
  view,
  events,
  showChrome = true,
}: Props) {
  const gridHeight = HOURS_IN_GRID * SLOT_HEIGHT_PX;

  const eventsForDay = (day: Date) =>
    events.filter((e) => sameDay(startOfDay(e.start), startOfDay(day)));

  const layoutEvent = (e: CalendarEventItem) => {
    const startMin = minutesSinceGridStart(e.start);
    const endMin = minutesSinceGridStart(e.end);
    const durMin = Math.max(endMin - startMin, 15);
    const top = clamp((startMin / 60) * SLOT_HEIGHT_PX, 0, gridHeight);
    const height = clamp((durMin / 60) * SLOT_HEIGHT_PX, 28, gridHeight - top);
    return { top, height };
  };

  return (
    <div
      className={
        showChrome
          ? 'flex flex-col w-full min-w-0  overflow-hidden '
          : 'flex w-full min-w-0 b'
      }
    >
      <div className="flex">
        <div className="flex flex-col shrink-0 w-16  text-xs text-right pr-3 pt-0 text-[11px] text-[#fff] select-none">
          <div className="h-10 flex  font-medium  items-end justify-end mt-2 mb-4">
            {TIMEZONE_LABEL}
          </div>
          {Array.from(
            { length: HOURS_IN_GRID },
            (_, i) => GRID_START_HOUR + i
          ).map((h) => (
            <div
              key={h}
              style={{ height: SLOT_HEIGHT_PX }}
              className="pr-1 text-xs flex items-start justify-end pt-0"
            >
              {formatHourLabel(h)}
            </div>
          ))}
        </div>
        <div className="flex-1 border pt-4 border-[#262626] rounded-xl  flex-col  min-w-0 flex overflow-hidden">
          <DayWeekColumnHeaders
            dates={dayColumns}
            singleColumn={view === 'day'}
          />
          <div className="flex">
            {dayColumns.map((day) => (
              <div
                key={day.toISOString()}
                className="flex-1 min-w-0 border border-[#262626] first:border-l-0 relative"
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
                    const accent = e.accent ?? 'green';
                    return (
                      <div
                        key={e.id}
                        className="absolute left-1 right-1 rounded-md overflow-hidden bg-[#1A1A1A] border border-[#2A2A2A] z-10"
                        style={{ top, height }}
                      >
                        <div className="flex h-full">
                          <div
                            className={`w-[3px] shrink-0 ${ACCENT_BAR[accent]}`}
                          />
                          <div className="px-2 py-1 min-w-0 flex flex-col justify-center">
                            <p className="text-white text-[11px] font-medium truncate">
                              {e.title}
                            </p>
                            <p className="text-[9px] text-white/45 truncate">
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
