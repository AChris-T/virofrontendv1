'use client';
import {
  IntegrationIcon,
  MeetingEventIcon,
  MeetingProfile,
} from '@/assets/icons';
import { Tabs } from '@/components/ui/tabs';
import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import EventDetails from './events/EventDetails';

export default function CalenderHeader() {
  const currentSearchParams = useSearchParams();
  const activeTab = currentSearchParams.get('tab') ?? 'events';

  return (
    <div>
      <Suspense>
        <div className="flex w-full justify-between text-white border-b border-[#0F0F0F] px-6 p-2 mx-auto ">
          <Tabs
            tabs={[
              {
                label: 'Events',
                value: 'events',
                icon: (isActive) => (
                  <MeetingEventIcon
                    color={isActive ? '#3CF239' : '#A6A6A6'}
                    stopColor={isActive ? '#DDF239' : '#A6A6A6'}
                  />
                ),
              },
              {
                label: 'Your Activity',
                value: 'activity',
                icon: (isActive) => (
                  <MeetingProfile
                    color={isActive ? '#3CF239' : '#A6A6A6'}
                    stopColor={isActive ? '#DDF239' : '#A6A6A6'}
                  />
                ),
              },
            ]}
            defaultValue="events"
          />
          <div>
            <button className="flex items-center gap-2 bg-[#0F0F0F] rounded-lg text-sm p-3 text-white-100">
              {' '}
              <IntegrationIcon /> Integrations
            </button>
          </div>
        </div>

        {activeTab === 'events' && <EventDetails />}
        {activeTab === 'activity' && 'Yes'}
      </Suspense>
    </div>
  );
}
