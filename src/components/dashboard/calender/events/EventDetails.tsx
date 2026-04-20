import React, { useMemo } from 'react';
import ConnectCalender from './ConnectCalender';
import EventDetail from './EventDetail';
import { ConnectCalendarSkeleton } from '@/components/ui/skeleton/ConnectCalenderSkeleton';
import { CalendarEventItem, IntergrationResponse } from '@/components/types';
import { useGetCalendarEventsQuery } from '@/store/dashboard/dashboard.api';
import {
  addDays,
  startOfDay,
  startOfWeekSunday,
} from '@/utils/data';

type EventDetailsProps = {
  data?: IntergrationResponse;
  isLoading: boolean;
  workspaceId?: string | null;
  teamspaceId?: string | null;
  interval?: 'day' | 'week' | 'month' | 'schedule';
  onIntervalChange?: (interval: 'day' | 'week' | 'month' | 'schedule') => void;
};

type ApiCalendarEvent = {
  id?: string;
  title?: string | null;
  description?: string | null;
  start_time?: string;
  end_time?: string;
  platform?: string;
};

type ApiCalendarResponse = {
  events?: ApiCalendarEvent[];
  groups?: Array<{
    date?: string;
    events?: ApiCalendarEvent[];
    days?: Array<{
      date?: string;
      events?: ApiCalendarEvent[];
    }>;
  }>;
};

export default function EventDetails({
  data,
  isLoading,
  workspaceId,
  teamspaceId,
  interval = 'day',
  onIntervalChange,
}: EventDetailsProps) {
  // Use a reference/anchor date for navigation
  const [anchorDate, setAnchorDate] = React.useState(() => new Date());

  // Calculate start and end dates based on interval and anchor date
  const { calculatedStartDate, calculatedEndDate } = useMemo(() => {
    const start = startOfDay(anchorDate);
    
    if (interval === 'week' || interval === 'schedule') {
      const weekStart = startOfWeekSunday(anchorDate);
      const weekEnd = new Date(addDays(weekStart, 6));
      weekEnd.setHours(23, 59, 59, 999);
      return { calculatedStartDate: weekStart, calculatedEndDate: weekEnd };
    } else if (interval === 'month') {
      // Get the last day of the month
      const monthEnd = new Date(anchorDate.getFullYear(), anchorDate.getMonth() + 1, 0);
      monthEnd.setHours(23, 59, 59, 999);
      return { calculatedStartDate: start, calculatedEndDate: monthEnd };
    }

    // Default: day
    const dayEnd = new Date(start);
    dayEnd.setHours(23, 59, 59, 999);
    return { calculatedStartDate: start, calculatedEndDate: dayEnd };
  }, [interval, anchorDate]);
  const isGoogleCalendarConnected =
    data?.integrations?.some(
      (integration) => integration.slug === 'google_calendar' && integration.connected
    ) ?? false;

  const { data: calendarEventsData, isLoading: isCalendarEventsLoading } = useGetCalendarEventsQuery(
    {
      workspaceid: workspaceId ?? '',
      teamspaceid: teamspaceId ?? '',
      platform: 'google_calendar',
      interval,
      start_datetime: calculatedStartDate.toISOString(),
      end_datetime: calculatedEndDate.toISOString(),
    },
    { skip: !isGoogleCalendarConnected }
  );

  // Extract events array from API response (safely handle different response formats)
  const calendarEvents = React.useMemo(() => {
    const mapEvent = (event: ApiCalendarEvent): CalendarEventItem | null => {
      const start = event.start_time ? new Date(event.start_time) : null;
      const end = event.end_time ? new Date(event.end_time) : null;

      if (!start || !end || Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
        return null;
      }

      const readablePlatform =
        event.platform?.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase()) ?? 'Meeting';

      return {
        id: event.id ?? `${start.toISOString()}-${end.toISOString()}`,
        title: event.title?.trim() || event.description?.trim() || readablePlatform,
        start,
        end,
        accent: 'green' as const,
      };
    };

    const filterValidEvents = (events: Array<CalendarEventItem | null>) =>
      events.filter(Boolean) as CalendarEventItem[];

    if (Array.isArray(calendarEventsData)) {
      return filterValidEvents(calendarEventsData.map((event) => mapEvent(event as ApiCalendarEvent)));
    }

    if (calendarEventsData && typeof calendarEventsData === 'object') {
      const data = calendarEventsData as ApiCalendarResponse;

      if (Array.isArray(data.events)) {
        return filterValidEvents(data.events.map(mapEvent));
      }

      if (Array.isArray(data.groups)) {
        return filterValidEvents(
          data.groups
            .flatMap((group) => group.events ?? [])
            .concat(data.groups.flatMap((group) => group.days ?? []).flatMap((day) => day.events ?? []))
            .map(mapEvent)
        );
      }
    }

    return [];
  }, [calendarEventsData]);

  if (isLoading) {
    return <ConnectCalendarSkeleton />;
  }
  return (
    <div className="font-general  mx-6 pb-20 text-white">
      {isGoogleCalendarConnected ? (
        <div>
          <EventDetail
            calendarEvents={calendarEvents}
            isLoadingEvents={isCalendarEventsLoading}
            interval={interval}
            onIntervalChange={onIntervalChange}
            startDate={calculatedStartDate}
            endDate={calculatedEndDate}
            anchorDate={anchorDate}
            onAnchorDateChange={setAnchorDate}
          />
        </div>
      ) : (
        <div className="font-general text-white  h-full pt-[72px] justify-center items-center flex flex-col gap-6">
          <ConnectCalender />
        </div>
      )}
    </div>
  );
}
