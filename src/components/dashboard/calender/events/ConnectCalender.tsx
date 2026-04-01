import {
  ArrowLeftIcon,
  ConnectCalendarIcon,
  GoogleCalenderIcon,
  MicroSoftCalenderIcon,
} from '@/assets/icons';
import React, { useMemo, useState } from 'react';

export default function ConnectCalender({
  setEventDetailState,
}: {
  setEventDetailState: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [calendarProvider, setCalendarProvider] = useState<string | null>(null);

  const providers = useMemo(
    () => [
      {
        label: 'Google Calendar',
        Icon: GoogleCalenderIcon,
      },
      {
        label: 'Microsoft Outlook',
        Icon: MicroSoftCalenderIcon,
      },
    ],
    []
  );

  const handleSelectProvider = (label: string) => {
    setCalendarProvider(label);
  };

  const handleSubmit = () => {
    console.log('Selected Calendar Provider:', calendarProvider);
    setEventDetailState(true);
    // Add your form submission logic here
  };

  return (
    <div className="flex flex-col font-general gap-5 items-center">
      <ConnectCalendarIcon />
      <div className="space-y-2 flex flex-col items-center text-center">
        <h3 className="text-white-200 text-[22px] font-medium">
          Connect Calendar
        </h3>
        <h2 className="text-[#8C8C8C] text-sm">
          Connect your calendar to sync your meetings
        </h2>
      </div>

      <div className="grid grid-cols-1 w-full gap-4 ">
        {providers.map(({ label, Icon }) => {
          const isSelected = calendarProvider === label;
          return (
            <button
              key={label}
              type="button"
              onClick={() => handleSelectProvider(label)}
              className={`w-full px-4 py-4 rounded-lg border transition-all flex items-center gap-3 bg-transparent
               ${
                 isSelected
                   ? 'inputgradients border-none'
                   : 'border-[#333333] hover:border-[#333333]'
               }
             `}
            >
              <div className="w-6 h-6 flex items-center justify-center">
                <Icon />
              </div>
              <span className="text-white-200 text-start font-medium font-general">
                {label}
              </span>
            </button>
          );
        })}
      </div>
      <div className="flex flex-col gap-[14px] justify-center items-center">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!calendarProvider}
          className={`flex font-general items-center  justify-center gap-2 w-[170px] px-4 py-2.5 text-sm font-medium text-white transition rounded-full shadow-theme-xs ${!calendarProvider ? 'bg-gray-600 cursor-not-allowed' : 'bg-green-100'}`}
        >
          Connect Calendar
          <span className="mt-1">
            <ArrowLeftIcon />
          </span>
        </button>
      </div>
    </div>
  );
}
