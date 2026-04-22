'use client';
import {
  ConnectCalendarIcon,
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
//import { HeaderSlot } from '@/layout/dashboard/Header';
import { SidePanel } from '@/components/ui/modal/SidePanel';
//import JoinMeeting from './events/JoinMeeting';
import CreateMeeting from './events/CreateMeeting';
import { useGetIntegrationsQuery } from '@/store/dashboard/dashboard.api';
import { useWorkspace } from '@/context/WorkspaceContext';
import { RootState } from '@/store';
import { getGreeting } from '@/utils/getGreeting';
import { useSelector } from 'react-redux';

export default function CalenderHeader() {
  const currentSearchParams = useSearchParams();
  const activeTab = currentSearchParams.get('tab') ?? 'events';
  const user = useSelector((state: RootState) => state.profile.user);
  const [isIntegrationsOpen, setIsIntegrationsOpen] = useState(false);
  //const [open, setOpen] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [interval, setInterval] = useState<
    'day' | 'week' | 'month' | 'schedule'
  >('day');
  const openIntegrations = useCallback(() => setIsIntegrationsOpen(true), []);
  const closeIntegrations = useCallback(() => setIsIntegrationsOpen(false), []);
  const { workspaceId: WorkspaceId, teamspaceId: TeamspaceId } = useWorkspace();
  const { data, isLoading, isError } = useGetIntegrationsQuery(
    { workspaceid: WorkspaceId ?? '', teamspaceid: TeamspaceId ?? '' },
    { skip: !WorkspaceId || !TeamspaceId }
  );
  const isGoogleCalendarConnected =
    data?.integrations?.some(
      (integration) =>
        integration.slug === 'google_calendar' && integration.connected
    ) ?? false;
  return (
    <div>
      {/*   <HeaderSlot>
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
      </HeaderSlot> */}
      {/*Join Meeting Modal */}
      {/*   <SidePanel
        isOpen={open}
        onClose={() => setOpen(false)}
        headings="Event Details"
        title="Join A Meeting with Viro"
        subtitle="Select meeting platform and provide meeting details"
        width="w-[540px]"
      >
        <JoinMeeting />
      </SidePanel> */}
      <SidePanel
        isOpen={openCreate}
        onClose={() => setOpenCreate(false)}
        headings="Event Detail"
        width="w-[540px]"
        className="p-0"
      >
        <CreateMeeting onSuccess={() => setOpenCreate(false)} />
      </SidePanel>
      {isGoogleCalendarConnected && (
        <h3 className="text-[24px]  text-white-200 px-6 py-4 font-instrument-serif">
          {getGreeting()}, {user?.first_name} {user?.last_name}
        </h3>
      )}
      <Suspense>
        {isGoogleCalendarConnected && (
          <div className="flex w-full justify-between text-white  px-6 p-2 mx-auto ">
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
            <div className="flex items-center gap-2 ">
              <button
                type="button"
                onClick={openIntegrations}
                className="flex items-center gap-2 bg-[#262626] rounded-lg text-sm px-4 py-2 text-white-100"
              >
                {' '}
                <IntegrationIcon /> Integrations
              </button>
              <button
                onClick={() => setOpenCreate(true)}
                className="bg-[#A9D80E] rounded-lg gap-2 font-medium  text-[#101010] text-sm px-4 py-2 flex items-center"
              >
                <JoinMeetingIcon />
                Create meeting
              </button>
            </div>
          </div>
        )}

        <Modal
          isOpen={isIntegrationsOpen}
          onClose={closeIntegrations}
          iconTitle={<ConnectCalendarIcon width="18" height="18" />}
          className="max-w-[650px]"
          Title="Integrations"
        >
          <IntegratePlatforms
            data={data}
            isLoading={isLoading}
            isError={isError}
          />
        </Modal>

        {activeTab === 'events' && (
          <EventDetails
            data={data}
            isLoading={isLoading}
            workspaceId={WorkspaceId}
            teamspaceId={TeamspaceId}
            interval={interval}
            onIntervalChange={setInterval}
          />
        )}
        {activeTab === 'activity' && 'Yes'}
      </Suspense>
    </div>
  );
}
