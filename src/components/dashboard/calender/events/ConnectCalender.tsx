import {
  ConnectCalendarIcon,
  GoogleCalenderIcon,
  MicroSoftCalenderIcon,
} from '@/assets/icons';
import { useWorkspace } from '@/context/WorkspaceContext';
import { useConnectGoogleCalenderMutation } from '@/store/dashboard/dashboard.api';
import React, { useMemo, useState } from 'react';

export default function ConnectCalender() {
  const [calendarProvider, setCalendarProvider] = useState<string | null>(null);
  const contextWorkspace = useWorkspace();
  const workspaceId = contextWorkspace.workspaceId;
  const teamspaceId = contextWorkspace.teamspaceId;
  const [connectGoogleCalendar, { isLoading }] =
    useConnectGoogleCalenderMutation();

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

  const handleSubmit = async () => {
    if (calendarProvider !== 'Google Calendar') {
      return;
    }

    if (!workspaceId || !teamspaceId) {
      return;
    }

    try {
      const response = await connectGoogleCalendar({
        frontend_redirect_url: 'http://localhost:3000/dashboard/calendar',
        workspaceid: workspaceId,
        teamspaceid: teamspaceId,
      }).unwrap();

      if (response?.auth_url) {
        window.location.assign(response.auth_url);
      }
    } catch (error) {
      console.error('Failed to connect Google Calendar', error);
    }
  };

  return (
    <div className="flex flex-col font-general gap-5 items-center">
      <ConnectCalendarIcon />
      <div className="space-y-2 flex flex-col items-center text-center">
        <h3 className="text-white-200 font-instrument-serif text-[32px] font-medium">
          Connect your Calendar
        </h3>
        <h2 className="text-[#8C8C8C] text-sm max-w-[273px]">
          Connect your calendar to sync your events and never miss a meeting or
          task again.{' '}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-4 ">
        {providers.map(({ label, Icon }) => {
          const isSelected = calendarProvider === label;
          return (
            <button
              key={label}
              type="button"
              onClick={() => handleSelectProvider(label)}
              className={`w-full px-16 py-6 rounded-lg border transition-all flex flex-col items-center gap-3 
               ${
                 isSelected
                   ? 'bg-[#262626] border-[#333333]'
                   : 'border-[#333333] hover:border-[#333333]'
               }
             `}
            >
              <div className="flex items-center justify-center">
                <Icon width="48" height="46" />
              </div>
              <span className="text-white-200 text-start font-medium font-general">
                {label}
              </span>
            </button>
          );
        })}
      </div>
      <div className="flex w-full flex-col gap-[14px] justify-center items-center">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!calendarProvider || isLoading}
          className={`flex font-general shadow-[0px_-1px_8px_0px_#0000001A_inset] w-full items-center rounded-lg justify-center gap-2  px-4 py-2.5 text-sm font-medium  transition  ${!calendarProvider || isLoading ? 'bg-[#2F3030] text-white cursor-not-allowed' : 'bg-[#A9D80E] text-[#101010]'}`}
        >
          Connect Calendar
          <span className="mt-1"></span>
        </button>
      </div>
    </div>
  );
}
