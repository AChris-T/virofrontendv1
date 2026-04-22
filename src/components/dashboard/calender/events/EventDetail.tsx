import { ViroIcon, ZoomIcon } from '@/assets/icons';
import { MeetingCard } from '@/components/ui/cards/MeetingCards';
import React from 'react';
import Calender from './Calender';

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
  //startDate,
  //endDate,
  anchorDate = new Date(),
  onAnchorDateChange,
}: EventDetailProps) {
  return (
    <div className="space-y-3">
      <div className="space-y-4 ">
        <h3 className="text-[#797B72] text-xs font-semibold">
          UPCOMING EVENTS
        </h3>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 ">
          <MeetingCard
            title="Acme Sales Demo"
            description="Sales pitch meeting with Acme sales person"
            startTime="3:30 PM"
            endTime="4:30 PM"
            descriptionIcon={<ViroIcon fill="#C7F239" />}
            meetingIcon={<ZoomIcon width="28" height="28" />}
            showAssignToggle
            isAssigned={true}
            onToggleAssign={(val) => console.log('Assigned:', val)}
            onJoin={() => console.log('Joining meeting...')}
          />
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
