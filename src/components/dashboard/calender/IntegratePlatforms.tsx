import {
  GoogleCalenderIcon,
  GoogleMeetIcon,
  TeamsMeetingIcon,
  ZoomIcon,
} from '@/assets/icons';
import type { ReactNode } from 'react';
import { IntegratePlatformsSkeleton } from '@/components/ui/skeleton/IntegrationSkeleton';

type IntegrationItem = {
  id: string;
  name: string;
  slug: string;
  connected: boolean;
};

const CALENDAR_SLUGS = ['google_calendar', 'microsoft_outlook'];
const MEETING_SLUGS = ['google_meet', 'zoom', 'microsoft_teams'];

const PLATFORM_ICON_MAP: Record<string, ReactNode> = {
  google_calendar: <GoogleCalenderIcon width="42" height="42" />,
  google_meet: <GoogleMeetIcon />,
  zoom: <ZoomIcon width="24" height="24" />,
  microsoft_teams: <TeamsMeetingIcon />,
};

const outlookLogo = (
  <div className="grid h-[42px] w-[42px] grid-cols-2 gap-[3px] rounded-md p-[7px]">
    <span className="rounded-[1px] bg-[#F25022]" />
    <span className="rounded-[1px] bg-[#7FBA00]" />
    <span className="rounded-[1px] bg-[#00A4EF]" />
    <span className="rounded-[1px] bg-[#FFB900]" />
  </div>
);

export default function IntegratePlatforms({
  data,
  isLoading,
  isError,
}: {
  data: { integrations?: IntegrationItem[] } | undefined;
  isLoading: boolean;
  isError: boolean;
}) {
  if (isLoading)
    return (
      <div className="">
        <IntegratePlatformsSkeleton />
      </div>
    );
  if (isError)
    return (
      <div className="text-white py-10 text-center flex justify-center items-center">
        Failed to load integrations.
      </div>
    );

  const integrations = data?.integrations ?? [];
  const calendarPlatforms = integrations.filter((item) =>
    CALENDAR_SLUGS.includes(item.slug)
  );
  const meetingPlatforms = integrations.filter((item) =>
    MEETING_SLUGS.includes(item.slug)
  );

  return (
    <div className="px-[6px] py-[6px] text-white">
      <h3 className="font-general text-sm font-medium text-[#AEAEAE]">
        Calendar Platforms
      </h3>

      <div className="mt-3 grid grid-cols-2 gap-4">
        {calendarPlatforms.map((item) => (
          <div
            key={item.id}
            className={`relative flex flex-col items-center justify-center rounded-lg border px-5 py-6 ${
              item.connected
                ? 'border-[#333333] bg-[#383838]'
                : 'border-[#333333] '
            }`}
          >
            {item.connected && (
              <span className="absolute right-4 top-4 rounded-full bg-[#A9D80E0D] px-3 py-1 text-[12px] font-medium text-[#A9D80E]">
                Connected
              </span>
            )}
            <div className="mb-2">
              {item.slug === 'microsoft_outlook'
                ? outlookLogo
                : (PLATFORM_ICON_MAP[item.slug] ?? null)}
            </div>
            <p
              className={`text-center  font-medium leading-tight ${
                item.connected ? 'text-[#FDFDFD]' : 'text-[#797B72]'
              }`}
            >
              {item.name}
            </p>
          </div>
        ))}
      </div>

      <h3 className="mt-7 text-sm font-general font-medium text-[#AEAEAE]">
        Meeting Platforms
      </h3>
      <div className="mt-3 space-y-3">
        {meetingPlatforms.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between rounded-lg border border-[#333333]  px-5 py-4"
          >
            <div className="min-w-0">
              <div className="flex items-center gap-3">
                <div className="">{PLATFORM_ICON_MAP[item.slug] ?? null}</div>
                <h4 className="truncate  font-medium text-[#D9D9D9]">
                  {item.name}
                </h4>
              </div>
              <p className="mt-2 text-sm  text-[#8C8C8C]">
                Easily schedule and join meetings seamlessly from your workspace
              </p>
            </div>

            <button
              type="button"
              className={`text-sm rounded-[7px] px-4 py-2  font-medium ${
                item.connected
                  ? 'bg-[#A9D80E] text-[#0F1306]'
                  : 'bg-[#262626] text-[#F1F1F1]'
              }`}
            >
              {item.connected ? 'Connected' : 'Connect'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
