'use client';
import {
  CreatingEventIcon,
  DatabaseIcon,
  JoinMeetingIcon,
  PipelineIcon,
  PlaySvgIcon,
} from '@/assets/icons';
import { Modal } from '@/components/ui/modal';
import React, { useState } from 'react';
import CreatePipe from './CreatePipe';
import { useGetAllStagesQuery } from '@/store/dashboard/dashboard.api';

export default function CreatePipeline({
  workspaceId,
  teamspaceId,
}: {
  workspaceId?: string | null;
  teamspaceId?: string | null;
}) {
  const [createPipeline, setCreatingPipeline] = useState(false);
  const { data, isLoading } = useGetAllStagesQuery();
  console.log(data, isLoading);

  return (
    <div className="flex justify-center pb-30 pt-72 overflow-y-scroll h-full items-center flex-col  gap-6 w-full">
      <div className="flex flex-col items-center justify-center gap-6">
        <PipelineIcon className="text-[#A9D80E]" />
        <div className="w-full flex-col flex items-center">
          <h3 className="text-[32px]  text-white-200 font-instrument-serif">
            Your Pipeline lives here{' '}
          </h3>{' '}
          <p className="text-[#797B72] text-center font-medium text-sm max-w-[424px] ">
            Pipelines track a record from first contact to closed. Start from a
            template tuned for your workflow, or build one from scratch.
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setCreatingPipeline(true)}
            className="bg-[#A9D80E] rounded-lg flex gap-2 py-2 px-3 text-[#101010] text-sm font-medium items-center"
          >
            <JoinMeetingIcon />
            Create pipeline
          </button>
          <button className="bg-transparent border border-[#797B72] text-[#797B72] rounded-lg flex gap-2 py-2 px-3  text-sm font-medium items-center">
            <PlaySvgIcon />
            Watch a 90-second walkthrough
          </button>
        </div>
      </div>
      <div className="bg-[#0F0F0F]  w-full max-w-[927px] rounded-2xl p-2 flex flex-col gap-3">
        <h3 className="font-medium text-white">Start from a template</h3>
        <div className="grid grid-cols-4 gap-3">
          <div className="bg-[#262626] border rounded-lg border-[#333333] pt-4">
            <div className="px-4 pb-4">
              <div className="mt-4 space-y-4">
                <h3 className="text-white font-medium"> Simple Sales </h3>
                <h3 className="text-[#797B72] text-sm font-medium">
                  A lightweight pipeline for small teams or straightforward
                  sales cycles....
                </h3>
                <h3 className="flex items-center gap-2">
                  <DatabaseIcon />6 stages
                </h3>
              </div>
            </div>
            <div className="backgroundCust h-20 mt-16 opacity-30" />
          </div>
          <div className="bg-[#262626] border rounded-lg  border-[#333333] pt-4">
            <div className="px-4 pb-4">
              <div className="mt-4 space-y-4">
                <h3 className="text-white font-medium">B2B SaaS</h3>
                <h3 className="text-[#797B72] text-sm font-medium">
                  A balanced pipeline for SaaS and mid-market sales teams
                  running demo-driven sales cycles....
                </h3>
                <h3 className="flex items-center gap-2">
                  <DatabaseIcon />6 stages
                </h3>
              </div>
            </div>
            <div className="backgroundCust h-20 mt-16 opacity-30"></div>
          </div>
          <div className="bg-[#262626] border rounded-lg  border-[#333333] pt-4">
            <div className="px-4 pb-4">
              <div className="mt-4 space-y-4">
                <h3 className="text-white font-medium">Outbound Enterprise</h3>
                <h3 className="text-[#797B72] text-sm font-medium">
                  Built for outbound-led sales teams targeting enterprise
                  accounts...
                </h3>
                <h3 className="flex items-center mt-8.5 gap-2">
                  <DatabaseIcon />6 stages
                </h3>
              </div>
            </div>
            <div className="backgroundCust h-20 mt-16 opacity-30"></div>
          </div>
          <div className="bg-[#262626] border rounded-lg border-[#333333] pt-4">
            <div className="px-4 pb-4">
              <div className="mt-4 space-y-4">
                <h3 className="text-white font-medium">Full Enterprise</h3>
                <h3 className="text-[#797B72] text-sm font-medium">
                  A comprehensive pipeline covering every stage of a complex
                  enterprise sales cycle...
                </h3>
                <h3 className="flex items-center gap-2 mb-16">
                  <DatabaseIcon />6 stages
                </h3>
              </div>
            </div>
            <div className="backgroundCust h-20 opacity-30" />
          </div>
        </div>
      </div>
      <Modal
        isOpen={createPipeline}
        onClose={() => setCreatingPipeline(false)}
        Title="Event Detail"
        iconTitle={<CreatingEventIcon />}
        //width="w-[540px]"
        className="max-w-[650px]"
      >
        <CreatePipe
          data={data}
          workspaceId={workspaceId}
          teamspaceId={teamspaceId}
        />
      </Modal>
    </div>
  );
}
