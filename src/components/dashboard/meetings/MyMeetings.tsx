import { ViroIcon, ZoomIcon } from '@/assets/icons';
import AvatarGroup from '@/components/ui/avatar/AvatarGroup';
import Image from 'next/image';
import React from 'react';

export default function MyMeetings() {
  return (
    <div>
      <h3 className="uppercase text-[#797B72] font-semibold mb-4 text-xs">
        MON, APR 18
      </h3>
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-[#0F0F0F] border-t-2 border-[#A9D80E]  p-2 rounded-lg flex flex-col gap-2">
          <Image
            src="/images/livemeetings.png"
            alt="past meetings"
            width={400}
            height={192}
          />
          <h3 className="font-medium text-white-200">Acme Sales Demo</h3>
          <h3 className="font-medium text-[#797B72] text-xs flex items-center gap-2">
            <ViroIcon fill="#C7F239" />
            Sales pitch meeting with Acme sales personnel
          </h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-[#BFBFBF] text-xs font-medium">
              <ZoomIcon />
              <div className="w-1 h-1 rounded-full bg-[#BFBFBF]" />
              <h3 className="uppercase font-semibold text-[#FF5E5D]">Live</h3>
            </div>
            <div>
              <AvatarGroup
                avatars={[
                  { initials: 'AK' },
                  { initials: 'JR' },
                  { initials: 'BD' },
                  { initials: 'MO' },
                  { initials: 'TS' },
                ]}
                max={3}
                size={9}
              />
            </div>
          </div>
          <button className="bg-[#A9D80E] border-[#5A6D1A] border-2 rounded-lg py-1 font-medium text-xs text-[#101010]">
            Join Meeting
          </button>
        </div>
        <div className="bg-[#262626] p-2 rounded-lg flex flex-col gap-2">
          <Image
            src="/images/pastmeetings.png"
            alt="past meetings"
            width={400}
            height={192}
          />
          <h3 className="font-medium text-white-200">Acme Sales Demo</h3>
          <h3 className="font-medium text-[#797B72] text-xs flex items-center gap-2">
            <ViroIcon fill="#C7F239" />
            Sales pitch meeting with Acme sales personnel
          </h3>
          <div className="flex items-center gap-2 text-[#BFBFBF] text-xs font-medium">
            <ZoomIcon />
            <h3>3:30 PM </h3>
            <div className="w-1 h-1 rounded-full bg-[#BFBFBF]" />
            <h3>45 min</h3>
          </div>
          <div>
            <AvatarGroup
              avatars={[
                { initials: 'AK' },
                { initials: 'JR' },
                { initials: 'BD' },
                { initials: 'MO' },
                { initials: 'TS' },
              ]}
              max={3}
              size={9}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
