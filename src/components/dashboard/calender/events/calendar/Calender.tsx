'use client';

import React from 'react';
import CalendarHeader from './CalendarHeader';
import MonthView from './MonthView';
import TimeGrid from './TimeGrid';
import { getDemoEvents } from './demoEvents';
import {
  addDays,
  addMonths,
  getMonthGrid,
  monthTitle,
  startOfDay,
  startOfWeekSunday,
  weekRangeTitle,
} from '@/utils/data';
import { CalendarViewMode } from '@/components/types';

export default function Calender() {
  const [view, setView] = React.useState<CalendarViewMode>('week');
  const [anchor, setAnchor] = React.useState(() => new Date(2025, 8, 14));
  const events = React.useMemo(() => getDemoEvents(), []);

  const goToday = () => setAnchor(new Date());

  const navigate = (dir: -1 | 1) => {
    if (view === 'day') setAnchor((d) => addDays(d, dir));
    else if (view === 'week') setAnchor((d) => addDays(d, dir * 7));
    else setAnchor((d) => addMonths(d, dir));
  };

  const weekStart = startOfWeekSunday(anchor);
  const monthGrid = React.useMemo(() => getMonthGrid(anchor), [anchor]);

  const headerTitle =
    view === 'week'
      ? weekRangeTitle(weekStart)
      : view === 'day'
        ? anchor.toLocaleString('en-US', { month: 'long', year: 'numeric' })
        : monthTitle(anchor);

  const dayColumnDates =
    view === 'day'
      ? [startOfDay(anchor)]
      : Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  return (
    <div className="w-full min-w-0 max-w-full space-y-4 text-white font-general overflow-x-auto">
      <CalendarHeader
        title={headerTitle}
        view={view}
        onViewChange={setView}
        onPrev={() => navigate(-1)}
        onNext={() => navigate(1)}
        onToday={goToday}
      />

      {view === 'month' && (
        <MonthView anchorMonth={anchor} monthGrid={monthGrid} events={events} />
      )}

      {(view === 'day' || view === 'week') && (
        <div className="space-y-3 min-w-0">
          <TimeGrid view={view} dayColumns={dayColumnDates} events={events} />
        </div>
      )}
    </div>
  );
}
