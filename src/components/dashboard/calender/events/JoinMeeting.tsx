'use client';
import {
  ArrowLeftIcon,
  DeepIcon,
  StarIcon,
  ViroIcon,
  ZoomIcon,
} from '@/assets/icons';
import { MeetingCard } from '@/components/ui/cards/MeetingCards';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';

export default function JoinMeeting() {
  const user = useSelector((state: RootState) => state.profile.user);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <div className="gradient-border flex items-center rounded-xl pr-4 h-[56px] ">
          <input
            type="text"
            placeholder="Enter meeting link or ID"
            className="w-full bg-transparent h-full focus:outline-none px-4 text-[#737373] placeholder:text-[#737373]"
          />
          <div className="gradient-border h-8 flex items-center px-2 gap-2 justify-center text-[10px] text-[#C7F239] w-[107px] rounded-full">
            <DeepIcon />
            <h3>Deep Think</h3>
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <button
            className={`flex font-general items-center cursor-pointer justify-center gap-2 w-[161px] px-4 py-3 text-sm font-medium text-white transition rounded-full shadow-theme-xs bg-green-100`}
          >
            Join Meeting
            <span className="mt-1">
              <ArrowLeftIcon />
            </span>
          </button>
          <div className="gradient-border flex gap-2 items-center justify-center cursor-pointer text-white font-medium text-sm px-4 py-2 rounded-full">
            <span className="mt-1">
              <ViroIcon />
            </span>
            Assign agent
          </div>
        </div>
      </div>
      <div className="text-white py-5">
        <h3>Your meeting(s) today, {user?.first_name}</h3>
        <div className="space-y-6 mt-4">
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
      </div>
    </div>
  );
}
