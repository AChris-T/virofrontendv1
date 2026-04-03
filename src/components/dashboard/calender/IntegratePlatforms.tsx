import {
  CheckedIcon,
  GoogleMeetIcon,
  TeamsMeetingIcon,
  ZoomIcon,
} from '@/assets/icons';
import Toggle from '@/components/ui/Toggle/Toggle';
import { useState } from 'react';

export default function IntegratePlatforms() {
  const [connectedPlatforms, setConnectedPlatforms] = useState(true);
  return (
    <div className="py-[6px] px-[17px] text-white">
      <h3 className="text-sm font-medium font-general text-[#737373]">
        Connect Only
      </h3>
      <div className="space-y-2 my-2">
        <div className="border flex justify-between rounded-lg p-4 border-[#0F0F0F]">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <GoogleMeetIcon />
              <h3 className="font-medium text-white-200">Google Meet</h3>
            </div>
            {connectedPlatforms && (
              <h3 className="text-[#87B003] text-[10px] flex items-center gap-2 font-medium">
                <CheckedIcon />
                Connected
              </h3>
            )}
          </div>
          <div>
            <Toggle
              onChange={() => setConnectedPlatforms(!connectedPlatforms)}
              checked={connectedPlatforms}
            />
          </div>
        </div>
        <div className="border flex justify-between rounded-lg p-4 border-[#0F0F0F]">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <TeamsMeetingIcon />
              <h3 className="font-medium text-white-200">Microsoft Teams</h3>
            </div>
            {connectedPlatforms && (
              <h3 className="text-[#87B003] text-[10px] flex items-center gap-2 font-medium">
                <CheckedIcon />
                Connected
              </h3>
            )}
          </div>
          <div>
            <Toggle
              onChange={() => setConnectedPlatforms(!connectedPlatforms)}
              checked={connectedPlatforms}
            />
          </div>
        </div>
        <div className="border flex justify-between rounded-lg p-4 border-[#0F0F0F]">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <ZoomIcon />
              <h3 className="font-medium text-white-200">Zoom</h3>
            </div>
            <h3 className="text-[10px] text-[#8C8C8C]">
              Easily schedule and join meetings seamlessly from your
              workspace{' '}
            </h3>
            {connectedPlatforms && (
              <h3 className="text-[#87B003] text-[10px] flex items-center gap-2 font-medium">
                <CheckedIcon />
                Connected
              </h3>
            )}
          </div>
          <div>
            <Toggle
              onChange={() => setConnectedPlatforms(!connectedPlatforms)}
              checked={connectedPlatforms}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
