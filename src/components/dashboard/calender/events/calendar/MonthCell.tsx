'use client';
import type { CalendarEventItem } from '@/components/types';
import { ACCENT_BAR } from '@/utils/constant';
import { formatEventTimeRange, sameDay, startOfDay } from '@/utils/data';

type Props = {
  cellDate: Date;
  anchorMonth: Date;
  events: CalendarEventItem[];
};

export default function MonthCell({ cellDate, anchorMonth, events }: Props) {
  const inMonth = cellDate.getMonth() === anchorMonth.getMonth();
  const dayEvents = events
    .filter((e) => sameDay(startOfDay(e.start), startOfDay(cellDate)))
    .sort((a, b) => a.start.getTime() - b.start.getTime());

  const maxShow = 3;
  const visible = dayEvents.slice(0, maxShow);
  const more = dayEvents.length - visible.length;

  return (
    <div
      className={`min-h-[120px] font-general border-b border-r  border-[#202124] px-2  flex flex-col ${
        inMonth ? 'bg-transparent' : 'bg-transparent '
      }`}
    >
      <div
        className={`text-right text-lg  mb-1 ${inMonth ? 'text-[#fff] font-medium' : 'text-white/35'}`}
      >
        {cellDate.getDate()}
      </div>
      <div className="flex flex-col gap-1  w-full min-h-0 overflow-hidden">
        {visible.map((e) => {
          const accent = e.accent ?? 'green';
          return (
            <div
              key={e.id}
              className="rounded-md border-[#F8F8F833] border items-center justify-start px-2 bg-[#F8F8F81A] flex min-w-0"
            >
              <div
                className={`w-0.5 h-4 shrink-0 rounded ${ACCENT_BAR[accent]}`}
              />
              <div className="px-1.5 py-1 min-w-0">
                <p className="text-[10px] text-white truncate leading-tight">
                  {e.title}
                </p>
                <p className="text-[9px] text-white/45 truncate">
                  {formatEventTimeRange(e.start, e.end)}
                </p>
              </div>
            </div>
          );
        })}
        {more > 0 && (
          <span className="text-[10px] text-white/50 pl-1">+{more} more</span>
        )}
      </div>
    </div>
  );
}
