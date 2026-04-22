import {
  CopilotIcon,
  GhostAIIcon,
  GoogleMeetIcon,
  ProxyIcon,
  ViroIcon,
  ZoomIcon,
} from '@/assets/icons';
import NeonPillButton from '@/components/ui/button/NeonPillButton';
import Loader from '@/components/ui/Loader';
import { useUpdateMeetingEventMutation } from '@/store/dashboard/dashboard.api';
import React, { useEffect, useState } from 'react';

export default function AssignAgent({
  title,
  workspaceId,
  teamspaceId,
  subtitle,
  details,
}: {
  title?: string;
  subtitle?: string;
  workspaceId?: string;
  teamspaceId?: string;
  details?: any;
}) {
  const [selectedBot, setSelectedBot] = useState(
    details?.bot_mode || 'unassigned'
  );
  const [updateMeetingEvent, { isLoading: isUpdatingBotMode }] =
    useUpdateMeetingEventMutation();

  useEffect(() => {
    setSelectedBot(details?.bot_mode || 'unassigned');
  }, [details?.bot_mode, details?.id]);

  const handleJoinMeeting = async () => {
    if (!workspaceId || !teamspaceId || !details?.id) return;

    await updateMeetingEvent({
      workspaceid: workspaceId,
      teamspaceid: teamspaceId,
      eventId: details.id,
      data: {
        bot_mode: selectedBot,
      },
    });
  };

  const options = [
    {
      label: 'Copilot',
      value: 'copilot',
      icon: (
        <span>
          <CopilotIcon />
        </span>
      ),
    },
    {
      label: 'Ghost',
      value: 'ghost',
      icon: (
        <span>
          <GhostAIIcon />
        </span>
      ),
    },
    {
      label: 'Proxy',
      value: 'proxy',
      icon: (
        <span>
          <ProxyIcon />{' '}
        </span>
      ),
    },
    {
      label: 'Unassigned',
      value: 'unassigned',
      icon: (
        <span className="h-2.5 w-2.5 rounded-full border border-[#AEB4BF]" />
      ),
    },
  ];

  return (
    <div className="border border-[#333333] p-4 rounded-lg">
      <div>
        <div className="flex items-center gap-2">
          <div className="w-1 rounded-full h-[30px] bg-[#0262B1]" />
          <h3 className="text-white text-3xl font-medium ">{title}</h3>
        </div>
        <div className="mt-4 space-y-6">
          <p className="text-[#BFBFBF] text-center font-medium text-sm  bg-[#262626] rounded-full px-2 max-w-[230px]">
            {subtitle}
          </p>
          <p className="flex items-center gap-2 ">
            <ViroIcon fill="#C7F239" />
            <span className="text-[#797B72] text-xs font-medium">
              {details?.description ||
                'No description available for this meeting.'}
            </span>
          </p>
          <div className="flex items-center gap-4">
            {details?.platform === 'Zoom' ? <ZoomIcon /> : <GoogleMeetIcon />}
            <button
              className="flex text-sm items-center text-[#101010] font-medium px-3 py-2 rounded-[7px] bg-[#A9D80E] justify-center gap-1 disabled:opacity-70"
              onClick={handleJoinMeeting}
              disabled={isUpdatingBotMode}
            >
              {isUpdatingBotMode ? <Loader /> : 'Join Meeting'}
            </button>
            <NeonPillButton
              options={options}
              selectedValue={selectedBot}
              onSelectOption={(option) => {
                setSelectedBot(option.value);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
