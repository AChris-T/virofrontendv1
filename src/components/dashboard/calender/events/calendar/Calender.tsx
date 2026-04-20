'use client';
import React, { useEffect } from 'react';
import CalendarHeader from './CalendarHeader';
import MonthView from './MonthView';
import ScheduleView from './ScheduleView';
import TimeGrid from './TimeGrid';
import CalendarEventsSkeleton from '@/components/ui/skeleton/CalendarEventsSkeleton';
import { SidePanel } from '@/components/ui/modal/SidePanel';
import {
  addDays,
  addMonths,
  getMonthGrid,
  monthTitle,
  startOfDay,
  startOfWeekSunday,
  weekRangeTitle,
} from '@/utils/data';
import { CalendarEventItem, CalendarViewMode } from '@/components/types';
import { useGetMeetingEventDetailsQuery } from '@/store/dashboard/dashboard.api';
import { useWorkspace } from '@/context/WorkspaceContext';
import { timeRange } from '@/utils/timeRange';
import AssignAgent from './AssignAgent';
import MeetingDetailsDisplay from './MeetingDetailsDisplay';

type CalenderProps = {
  events?: any;
  isLoading?: boolean;
  interval?: 'day' | 'week' | 'month' | 'schedule';
  onIntervalChange?: (interval: 'day' | 'week' | 'month' | 'schedule') => void;
  anchorDate?: Date;
  onAnchorDateChange?: (date: Date) => void;
};

export default function Calender({
  events: externalEvents,
  isLoading,
  interval,
  onIntervalChange,
  anchorDate = new Date(),
  onAnchorDateChange,
}: CalenderProps) {
  const contextWorkspace = useWorkspace();
  const workspaceId = contextWorkspace.workspaceId;
  const teamspaceId = contextWorkspace.teamspaceId;
  const [view, setView] = React.useState<CalendarViewMode>(
    interval ? (interval as CalendarViewMode) : 'week'
  );
  const [selectedInviteId, setSelectedInviteId] = React.useState<string | null>(
    null
  );
  const anchor = anchorDate;
  const handleAnchorChange = (newAnchor: Date) => {
    onAnchorDateChange?.(newAnchor);
  };
  const events = React.useMemo(() => {
    if (Array.isArray(externalEvents)) {
      return externalEvents;
    }
    return [];
  }, [externalEvents]);

  useEffect(() => {
    if (interval) {
      setView(interval as CalendarViewMode);
    }
  }, [interval]);
  const handleViewChange = (newView: CalendarViewMode) => {
    setView(newView);
    onIntervalChange?.(newView);
  };

  const goToday = () => handleAnchorChange(new Date());

  const navigate = (dir: -1 | 1) => {
    if (view === 'day') handleAnchorChange(addDays(anchor, dir));
    else if (view === 'week' || view === 'schedule')
      handleAnchorChange(addDays(anchor, dir * 7));
    else handleAnchorChange(addMonths(anchor, dir));
  };

  const weekStart = startOfWeekSunday(anchor);
  const monthGrid = React.useMemo(() => getMonthGrid(anchor), [anchor]);

  const headerTitle =
    view === 'schedule'
      ? anchor.toLocaleString('en-US', { day: 'numeric', month: 'long' })
      : view === 'week'
        ? weekRangeTitle(weekStart)
        : view === 'day'
          ? anchor.toLocaleString('en-US', { month: 'long', year: 'numeric' })
          : monthTitle(anchor);

  const dayColumnDates =
    view === 'day'
      ? [startOfDay(anchor)]
      : Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const handleOpenEventDetails = (event: CalendarEventItem) => {
    const eventWithInvite = event as CalendarEventItem & {
      invite_id?: string;
      inviteId?: string;
    };
    const inviteId =
      eventWithInvite.invite_id ?? eventWithInvite.inviteId ?? event.id;
    setSelectedInviteId(inviteId || null);
  };
  const {
    data: meetingDetails,
    isLoading: isMeetingDetailsLoading,
    isError: isMeetingDetailsError,
  } = useGetMeetingEventDetailsQuery(
    {
      workspaceid: workspaceId ?? '',
      teamspaceid: teamspaceId ?? '',
      eventId: selectedInviteId ?? '',
    },
    {
      skip: !workspaceId || !teamspaceId || !selectedInviteId,
    }
  );
  return (
    <>
      <div className="w-full min-w-0 max-w-full space-y-4 text-white font-general overflow-x-auto">
        <CalendarHeader
          title={headerTitle}
          view={view}
          onViewChange={handleViewChange}
          onPrev={() => navigate(-1)}
          onNext={() => navigate(1)}
          onToday={goToday}
        />

        {isLoading && (
          <CalendarEventsSkeleton view={view === 'schedule' ? 'week' : view} />
        )}

        {view === 'schedule' && !isLoading && (
          <ScheduleView
            days={dayColumnDates}
            events={events}
            onEventDetails={handleOpenEventDetails}
          />
        )}

        {view === 'month' && !isLoading && (
          <MonthView
            anchorMonth={anchor}
            monthGrid={monthGrid}
            events={events}
            onEventDetails={handleOpenEventDetails}
          />
        )}

        {(view === 'day' || view === 'week') && !isLoading && (
          <div className="space-y-3 min-w-0">
            <TimeGrid
              view={view}
              dayColumns={dayColumnDates}
              events={events}
              onEventDetails={handleOpenEventDetails}
            />
          </div>
        )}
      </div>

      <SidePanel
        isOpen={Boolean(selectedInviteId)}
        onClose={() => setSelectedInviteId(null)}
        headings="Meeting  details"
        title={meetingDetails?.title}
        width="w-[500px]"
        subtitle={
          meetingDetails?.start_time && meetingDetails?.end_time
            ? timeRange(meetingDetails.start_time, meetingDetails.end_time)
            : ''
        }
      >
        <div className="space-y-4">
          <AssignAgent />
          <MeetingDetailsDisplay
            details={meetingDetails}
            isLoading={isMeetingDetailsLoading}
            isError={isMeetingDetailsError}
          />
        </div>
      </SidePanel>
    </>
  );
}
