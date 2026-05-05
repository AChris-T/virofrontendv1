import { GoogleMeetIcon, ViroIcon, ZoomIcon } from '@/assets/icons';
import { MeetingCard } from '@/components/ui/cards/MeetingCards';
import React from 'react';
import Calender from './Calender';
import { useUpcomingMeetingEventsQuery } from '@/store/dashboard/dashboard.api';
import { timeRange } from '@/utils/timeRange';
import { MeetingCardSkeleton } from '@/components/ui/skeleton/MeetingSkeleton';

type EventDetailProps = {
  calendarEvents?: any;
  isLoadingEvents?: boolean;
  interval?: 'day' | 'week' | 'month' | 'schedule';
  onIntervalChange?: (interval: 'day' | 'week' | 'month' | 'schedule') => void;
  startDate?: Date;
  endDate?: Date;
  anchorDate?: Date;
  workspaceId?: string;
  teamspaceId?: string;
  onAnchorDateChange?: (date: Date) => void;
};

export default function EventDetail({
  workspaceId,
  teamspaceId,
  calendarEvents,
  isLoadingEvents,
  interval = 'day',
  onIntervalChange,
  anchorDate = new Date(),
  onAnchorDateChange,
}: EventDetailProps) {
  const { data, isLoading } = useUpcomingMeetingEventsQuery(
    {
      workspaceid: workspaceId ?? '',
      teamspaceid: teamspaceId ?? '',
    },
    { skip: !workspaceId || !teamspaceId }
  );
  console.log('Upcoming Events Data:', data);
  if (isLoading)
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <MeetingCardSkeleton key={i} />
        ))}
      </div>
    );
  return (
    <div className="space-y-3">
      <div className="space-y-4 ">
        <h3 className="text-[#797B72] text-xs font-semibold">
          UPCOMING EVENTS
        </h3>
        <div className="grid lg:grid-cols-3 gap-3 md:grid-cols-2 ">
          {data?.events?.map((event: any) => (
            <MeetingCard
              key={event.id}
              title={event.title}
              descriptionIcon={<ViroIcon fill="#C7F239" />}
              description={event.description || 'No description available'}
              startTime={event.startTime}
              time={
                event.start_time && event.end_time
                  ? timeRange(event.start_time, event.end_time)
                  : ''
              }
              meetingIcon={
                event?.platform === 'zoom' ? (
                  <ZoomIcon width="28" height="28" />
                ) : (
                  <GoogleMeetIcon />
                )
              }
              endTime={event.endTime}
            />
          ))}
        </div>
      </div>
      <Calender
        events={calendarEvents}
        isLoading={isLoadingEvents}
        workspaceId={workspaceId}
        teamspaceId={teamspaceId}
        interval={interval}
        onIntervalChange={onIntervalChange}
        anchorDate={anchorDate}
        onAnchorDateChange={onAnchorDateChange}
      />
    </div>
  );
}
