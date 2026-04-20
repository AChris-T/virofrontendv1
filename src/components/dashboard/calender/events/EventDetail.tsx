import { StarIcon, ZoomIcon } from '@/assets/icons';
import { MeetingCard } from '@/components/ui/cards/MeetingCards';
import { RootState } from '@/store';
import { getGreeting } from '@/utils/getGreeting';
import React from 'react';
import { useSelector } from 'react-redux';
import Calender from './Calender';

type EventDetailProps = {
  calendarEvents?: any;
  isLoadingEvents?: boolean;
  interval?: 'day' | 'week' | 'month' | 'schedule';
  onIntervalChange?: (interval: 'day' | 'week' | 'month' | 'schedule') => void;
  startDate?: Date;
  endDate?: Date;
  anchorDate?: Date;
  onAnchorDateChange?: (date: Date) => void;
};

export default function EventDetail({
  calendarEvents,
  isLoadingEvents,
  interval = 'day',
  onIntervalChange,
  //startDate,
  //endDate,
  anchorDate = new Date(),
  onAnchorDateChange,
}: EventDetailProps) {
  const user = useSelector((state: RootState) => state.profile.user);
  return (
    <div className="space-y-3">
      <h3 className="text-white-200 font-medium  font-general">
        {getGreeting()}, {user?.first_name}
      </h3>
      <div className="grid grid-cols-3 ">
        <MeetingCard
          title="Acme Sales Demo"
          description="Sales pitch meeting with Acme sales person"
          startTime="3:30 PM"
          endTime="4:30 PM"
          descriptionIcon={<StarIcon />}
          meetingIcon={<ZoomIcon />}
          showAssignToggle
          isAssigned={true}
          onToggleAssign={(val) => console.log('Assigned:', val)}
          onJoin={() => console.log('Joining meeting...')}
        />
      </div>
      <Calender
        events={calendarEvents}
        isLoading={isLoadingEvents}
        interval={interval}
        onIntervalChange={onIntervalChange}
        anchorDate={anchorDate}
        onAnchorDateChange={onAnchorDateChange}
      />
    </div>
  );
}
