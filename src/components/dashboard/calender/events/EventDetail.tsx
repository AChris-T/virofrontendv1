import { StarIcon, ZoomIcon } from '@/assets/icons';
import { MeetingCard } from '@/components/ui/cards/MeetingCards';
import { RootState } from '@/store';
import { getGreeting } from '@/utils/getGreeting';
import React from 'react';
import { useSelector } from 'react-redux';
import Calender from './Calender';

export default function EventDetail() {
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
      <Calender/>
    </div>
  );
}
