'use client';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import {
  DownloadCvsIcon,
  FilterIcon,
  JoinMeetingIcon,
  KambanIcon,
  MenuListIcon,
} from '@/assets/icons';
import { Tabs } from '@/components/ui/tabs';
import { useSearchParams } from 'next/navigation';
import AllDeals from './AllDeals';
import { useGetPipelineBoardQuery } from '@/store/dashboard/dashboard.api';

export default function PipelineDetails({
  data,
  workspaceId,
  teamspaceId,
}: any) {
  const currentSearchParams = useSearchParams();
  const activeTab = currentSearchParams.get('tab') ?? 'all';
  const user = useSelector((state: RootState) => state.profile.user);
  const pipelineid = data?.id;
  const { data: board, isLoading, refetch: refetchBoard } =
    useGetPipelineBoardQuery(
      {
        pipeline_id: pipelineid!,
        workspaceid: workspaceId!,
        teamspaceid: teamspaceId!,
      },
      {
        skip: !pipelineid || !workspaceId || !teamspaceId,
      }
    );
  return (
    <div className="space-y-6 h-full ">
      <h3 className="text-[24px]  text-white-200 font-instrument-serif">
        Good afternoon, {user?.first_name || 'User'} {user?.last_name || ''}
      </h3>
      <div className="flex items-center justify-between">
        <h3 className="text-[24px]  text-white-200 font-instrument-serif">
          {data?.name} WorkSpace
        </h3>
        <div className="flex items-center gap-2">
          <button className="bg-[#262626] border-[#333333] rounded-lg flex gap-2 py-2 px-3 text-[#797B72] text-sm font-medium items-center">
            <FilterIcon />
            Filters{' '}
          </button>
          <button className="bg-[#262626] border-[#333333] rounded-lg flex gap-2 py-2 px-3 text-[#797B72] text-sm font-medium items-center">
            <DownloadCvsIcon />
            Import{' '}
          </button>
          <button className="bg-[#A9D80E] rounded-lg flex gap-2 py-2 px-3 text-[#101010] text-sm font-medium items-center">
            <JoinMeetingIcon />
            Create pipeline
          </button>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="max-w-[315px]">
          <Tabs
            tabs={[
              {
                label: 'All',
                value: 'all',
              },
              {
                label: 'My Deals',
                value: 'my-deals',
              },
              {
                label: 'Stalled',
                value: 'stalled',
              },
              {
                label: 'At Risk',
                value: 'at-risk',
              },
            ]}
            defaultValue="all"
          />{' '}
        </div>
        <div className="flex gap-2 items-center">
          <button className="flex gap-1 bg-[#262626] border-[#333333] rounded-lg py-2 px-3 text-white text-sm font-medium items-center">
            <KambanIcon />
            Kanban
          </button>
          <button className="flex gap-1 bg-[#262626] border-[#333333] rounded-lg py-2 px-3 text-[#797B72] text-sm font-medium items-center">
            <MenuListIcon />
            List
          </button>
        </div>
      </div>
      <div className="mt-6 ">
        {activeTab === 'all' && (
          <AllDeals
            board={board}
            workspaceId={workspaceId}
            teamspaceId={teamspaceId}
            data={data}
            isLoading={isLoading}
            refetchBoard={refetchBoard}
          />
        )}
        {activeTab === 'activity' && 'hello'}
      </div>
    </div>
  );
}
