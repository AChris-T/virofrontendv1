'use client';

import { Tabs } from '@/components/ui/tabs';
import { useSearchParams } from 'next/navigation';
import DealOverview from './DealOverview';
import ActivityDeal from './ActivityDeal';
import IrisCoaching from './IrisCoaching';
import DealStageHistory from './DealStageHistory';
import Notes from './Notes';
import CreateNote from './CreateNote';

export default function Dealtabs({
  NoteData,
  dealData,
  selectedDealId,
  pipelineId,
  workspaceId,
  teamspaceId,
}: any) {
  const currentSearchParams = useSearchParams();
  const activeTab = currentSearchParams.get('dealtab') ?? 'overview';
  return (
    <div className="mt-6 flex flex-col min-h-[60vh]">
      <div className="flex-1">
        <Tabs
          tabs={[
            {
              label: 'Overview',
              value: 'overview',
            },
            {
              label: 'Activity',
              value: 'activity',
            },
            {
              label: 'iris Coaching',
              value: 'iris-coaching',
            },
            {
              label: 'Stage history',
              value: 'stage-history',
            },
            {
              label: 'Notes',
              value: 'notes',
            },
          ]}
          defaultValue="overview"
          paramKey="dealtab"
        />{' '}
        {activeTab === 'overview' && <DealOverview />}
        {activeTab === 'activity' && <ActivityDeal dealData={dealData} />}
        {activeTab === 'iris-coaching' && <IrisCoaching />}
        {activeTab === 'stage-history' && <DealStageHistory />}
        {activeTab === 'notes' && <Notes NoteData={NoteData} />}
      </div>
      <div className="sticky bottom-0 py-3   bg-[#171717] w-full h-full ">
        {activeTab === 'notes' ? (
          <CreateNote
            dealData={dealData}
            dealId={selectedDealId}
            pipelineId={pipelineId}
            workspaceId={workspaceId}
            teamspaceId={teamspaceId}
          />
        ) : (
          <div className="flex items-center  justify-between gap-3">
            <div className="flex items-center w-full  gap-2">
              <button
                type="button"
                className="bg-transparent w-full border border-[#333333] text-[#A6A6A6] rounded-lg py-2 px-3 text-sm font-medium"
              >
                Mark as Lost
              </button>
              <button
                type="button"
                className="bg-[#A9D80E] w-full border border-[#5A6D1A] rounded-lg py-2 px-3 text-[#101010] text-sm font-medium"
              >
                Move to Contract
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
