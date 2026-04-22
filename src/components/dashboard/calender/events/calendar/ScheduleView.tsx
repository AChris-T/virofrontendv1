'use client';

import React from 'react';
import type { CalendarEventItem } from '@/components/types';
import { formatEventTimeRange, sameDay, startOfDay } from '@/utils/data';

type Props = {
  days: Date[];
  events: CalendarEventItem[];
  onEventDetails?: (event: CalendarEventItem) => void;
};

export default function ScheduleView({ days, events, onEventDetails }: Props) {
  const today = startOfDay(new Date());

  const eventsForDay = (day: Date) =>
    events
      .filter((event) => sameDay(startOfDay(event.start), startOfDay(day)))
      .sort((a, b) => a.start.getTime() - b.start.getTime());

  const visibleDays = (() => {
    const futureDays = days.filter(
      (day) => startOfDay(day).getTime() >= today.getTime()
    );
    const hasToday = futureDays.some((day) => sameDay(startOfDay(day), today));

    const baseDays = hasToday ? futureDays : [today, ...futureDays];

    return baseDays.filter((day) => {
      const isToday = sameDay(startOfDay(day), today);
      if (isToday) return true;
      return eventsForDay(day).length > 0;
    });
  })();

  return (
    <div className="w-full overflow-hidden mb-10 rounded-xl border border-[#333] ">
      <div className="divide-y divide-[#333]">
        {visibleDays.map((day) => {
          const dayEvents = eventsForDay(day);
          const isToday = sameDay(startOfDay(day), today);
          const dayNumber = day.toLocaleDateString('en-US', { day: 'numeric' });
          const dayLabel = day.toLocaleDateString('en-US', {
            month: 'short',
            weekday: 'short',
          });

          return (
            <div
              key={day.toISOString()}
              className="grid font-general grid-cols-[108px_1fr] gap-4 px-4 py-3"
            >
              <div className="pt-1">
                <div className="flex items-start gap-2">
                  <span
                    className={`min-w-[38px] rounded  px-2 py-1 text-center text-2xl font-semibold leading-none ${
                      isToday ? 'bg-[#A9D80E] text-[#0B0D10]' : 'text-[#E8E8E8]'
                    }`}
                  >
                    {dayNumber}
                  </span>
                  <span className="pt-1 text-[12px]  font-semibold uppercase tracking-wide text-[#9EA4AE]">
                    {dayLabel.replace(' ', ', ')}
                  </span>
                </div>
              </div>

              <div className="space-y-2 py-1">
                {dayEvents.length === 0 ? (
                  isToday ? null : (
                    <div className="h-10 rounded-md border border-[#2A2F35] bg-[#111419]" />
                  )
                ) : (
                  dayEvents.map((event) => {
                    return (
                      <div
                        key={event.id}
                        onClick={() => onEventDetails?.(event)}
                        className="grid min-h-[38px] cursor-pointer grid-cols-[122px_1fr] items-center gap-3"
                      >
                        <p className="truncate text-[12px] font-medium text-[#9EA4AE]">
                          * {formatEventTimeRange(event.start, event.end)}
                        </p>
                        <div className="flex min-w-0 items-center rounded-[4px] bg-[#5FAAE6] px-3 py-[7px]">
                          <p className="truncate text-[13px] font-medium text-[#102133]">
                            {event.title}
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
