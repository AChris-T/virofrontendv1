import React from 'react';

type CalendarEventsSkeletonProps = {
  view: 'day' | 'week' | 'month';
};

export default function CalendarEventsSkeleton({
  view,
}: CalendarEventsSkeletonProps) {
  if (view === 'month') {
    return (
      <div className="border border-[#262626] rounded-xl overflow-hidden animate-pulse">
        <div className="grid grid-cols-7 border-b border-[#262626]">
          {Array.from({ length: 7 }).map((_, idx) => (
            <div key={idx} className="h-10 border-r border-[#262626] last:border-r-0 bg-[#141414]" />
          ))}
        </div>
        <div className="grid grid-cols-7">
          {Array.from({ length: 35 }).map((_, idx) => (
            <div
              key={idx}
              className="min-h-[120px] border-b border-r border-[#202124] last:border-r-0 bg-[#121212]"
            >
              <div className="mx-2 mt-2 h-4 w-6 rounded bg-[#1f1f1f]" />
              <div className="mx-2 mt-3 space-y-2">
                <div className="h-5 w-full rounded bg-[#1b1b1b]" />
                <div className="h-5 w-4/5 rounded bg-[#1b1b1b]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const columns = view === 'day' ? 1 : 7;

  return (
    <div className="flex">
      <div className="flex flex-col shrink-0 w-16 pr-3 pt-0">
        <div className="h-10 mt-2 mb-4 rounded bg-[#141414] animate-pulse" />
        {Array.from({ length: 16 }).map((_, idx) => (
          <div key={idx} className="h-16 mb-[1px] rounded bg-[#141414] animate-pulse" />
        ))}
      </div>

      <div className="flex-1 border pt-4 border-[#262626] rounded-xl min-w-0 overflow-hidden">
        <div className="grid" style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
          {Array.from({ length: columns }).map((_, idx) => (
            <div key={idx} className="h-12 border-b border-r border-[#262626] bg-[#141414] animate-pulse" />
          ))}
        </div>

        <div className="grid" style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
          {Array.from({ length: columns }).map((_, colIdx) => (
            <div key={colIdx} className="relative border-r border-[#262626] min-h-[1024px] bg-[#121212]">
              {Array.from({ length: 16 }).map((_, rowIdx) => (
                <div key={rowIdx} className="h-16 border-b border-[#262626]/80" />
              ))}
              <div className="absolute left-1 right-1 top-24 h-14 rounded bg-[#1b1b1b] animate-pulse" />
              <div className="absolute left-1 right-1 top-64 h-12 rounded bg-[#1b1b1b] animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
