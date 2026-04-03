'use client';
import {
  IntegrationIcon,
  JoinMeetingIcon,
  MeetingEventIcon,
  MeetingProfile,
} from '@/assets/icons';
import { Modal } from '@/components/ui/modal';
import { Tabs } from '@/components/ui/tabs';
import { Suspense, useCallback, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import EventDetails from './events/EventDetails';
import IntegratePlatforms from './IntegratePlatforms';
import { HeaderSlot } from '@/layout/dashboard/Header';
import { SidePanel } from '@/components/ui/modal/SidePanel';
import JoinMeeting from './events/JoinMeeting';
import CreateMeeting from './events/CreateMeeting';

export default function CalenderHeader() {
  const currentSearchParams = useSearchParams();
  const activeTab = currentSearchParams.get('tab') ?? 'events';
  const [isIntegrationsOpen, setIsIntegrationsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const openIntegrations = useCallback(() => setIsIntegrationsOpen(true), []);
  const closeIntegrations = useCallback(() => setIsIntegrationsOpen(false), []);

  return (
    <div>
      <HeaderSlot>
        <div className="flex items-center gap-3">
          <div
            onClick={() => setOpen(true)}
            className="gradient-border cursor-pointer text-white font-medium text-sm px-4 py-2 rounded-full"
          >
            Join Meeting
          </div>
          <button
            onClick={() => setOpenCreate(true)}
            className="bg-green-100 rounded-full gap-2 font-medium  text-white text-sm px-4 py-2 flex items-center"
          >
            <JoinMeetingIcon />
            Create meeting
          </button>
        </div>
      </HeaderSlot>
      {/*Join Meeting Modal */}
      <SidePanel
        isOpen={open}
        onClose={() => setOpen(false)}
        headings="Join A Meeting"
        title="Join A Meeting with Viro"
        subtitle="Select meeting platform and provide meeting details"
        width="w-[540px]"
      >
        <JoinMeeting />
      </SidePanel>
      {/*Create Meeting Modal */}
      <SidePanel
        isOpen={openCreate}
        onClose={() => setOpenCreate(false)}
        headings="Create A Meeting"
        width="w-[540px]"
        className="p-0"
      >
        <CreateMeeting />
      </SidePanel>
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
            <button
              type="button"
              onClick={openIntegrations}
              className="flex items-center gap-2 bg-[#0F0F0F] rounded-lg text-sm p-3 text-white-100"
            >
              {' '}
              <IntegrationIcon /> Integrations
            </button>
          </div>
        </div>

        <Modal
          isOpen={isIntegrationsOpen}
          onClose={closeIntegrations}
          className="max-w-[500px]"
          Title="Integrate Platforms"
        >
          <IntegratePlatforms />
        </Modal>

        {activeTab === 'events' && <EventDetails />}
        {activeTab === 'activity' && 'Yes'}
      </Suspense>
    </div>
  );
}
