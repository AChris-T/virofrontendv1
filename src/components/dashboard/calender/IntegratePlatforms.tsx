import {
  CheckedIcon,
  GoogleMeetIcon,
  ZoomIcon,
  TeamsMeetingIcon,
} from '@/assets/icons';
import Toggle from '@/components/ui/Toggle/Toggle';
import type { ReactNode } from 'react';
import { IntegratePlatformsSkeleton } from '@/components/ui/skeleton/IntegrationSkeleton';

const ICON_MAP: Record<string, ReactNode> = {
  google_calendar: <GoogleMeetIcon />,
  microsoft_outlook: <GoogleMeetIcon />,
  google_meet: <GoogleMeetIcon />,
  zoom: <ZoomIcon />,
  microsoft_teams: <TeamsMeetingIcon />,
};

export default function IntegratePlatforms({ data, isLoading, isError }: { data: any; isLoading: boolean; isError: boolean }) {
 
  if (isLoading) return <div className=""><IntegratePlatformsSkeleton /></div>;
  if (isError)   return <div className="text-white py-10 text-center flex justify-center items-center">Failed to load integrations.</div>;

  return (
    <div className="py-[6px] px-[17px] text-white">
      <h3 className="text-sm font-medium font-general text-[#737373]">Connect Only</h3>
      <div className="space-y-2 my-2">
        {data?.integrations?.map((item:any) => (
          <div
            key={item.id}
            className="border flex justify-between rounded-lg p-4 border-[#0F0F0F]"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                {ICON_MAP[item.slug] ?? null}
                <h3 className="font-medium text-white-200">{item.name}</h3>
              </div>
              <p className="text-[10px] text-[#8C8C8C]">
                Easily schedule and join meetings seamlessly from your workspace
              </p>
              {item.connected && (
                <p className="text-[#87B003] text-[10px] flex items-center gap-2 font-medium">
                  <CheckedIcon />
                  Connected
                </p>
              )}
            </div>
            <Toggle checked={item.connected} onChange={() => {}} />
          </div>
        ))}
      </div>
    </div>
  );
}