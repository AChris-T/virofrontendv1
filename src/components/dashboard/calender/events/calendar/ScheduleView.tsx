'use client';

import React from 'react';
import type { CalendarEventItem } from '@/components/types';
import { ACCENT_BAR } from '@/utils/constant';
import { formatEventTimeRange, sameDay, startOfDay } from '@/utils/data';

type Props = {
  days: Date[];
  events: CalendarEventItem[];
  onEventDetails?: (event: CalendarEventItem) => void;
};

export default function ScheduleView({ days, events, onEventDetails }: Props) {
  const eventsForDay = (day: Date) =>
    events
      .filter((event) => sameDay(startOfDay(event.start), startOfDay(day)))
      .sort((a, b) => a.start.getTime() - b.start.getTime());

  return (
    <div className="w-full overflow-hidden ">
      <div className="divide-y divide-[#202124]">
        {days.map((day) => {
          const dayEvents = eventsForDay(day);

          return (
            <div key={day.toISOString()} className="grid font-general grid-cols-[92px_1fr] gap-3 px-4 py-3">
              <div className="pt-2 text-[11px] text-white font-medium">
                {day.toLocaleDateString('en-US', {
                  weekday: 'short',
                  day: 'numeric',
                  month: 'short',
                })}
              </div>

              <div className="space-y-2">
                {dayEvents.length === 0 ? (
                  <div className="h-12 rounded-md border border-[#333333] " />
                ) : (
                  dayEvents.map((event) => {
                    const accent = event.accent ?? 'green';

                    return (
                      <div
                        key={event.id}
                                                    onClick={() => onEventDetails?.(event)}

                        className="flex cursor-pointer min-h-[52px] items-center rounded-md border border-[#222] bg-[#0E0E0E] px-3"
                      >
                        <div className={`h-7 w-[2px] shrink-0 rounded ${ACCENT_BAR[accent]}`} />
                        <div className="min-w-0 px-2">
                          <p className="truncate text-sm text-white">{event.title}</p>
                          <p className="truncate text-[10px] text-white/45">
                            {formatEventTimeRange(event.start, event.end)}
                          </p>
                     
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
