import {
  CalenderBankIcon,
  ClockwiseIcon,
  CostIcon,
  DealNameIcon,
  DealsNameIcon,
  LeadTitleIcon,
  NextIcon,
  PrimaryContactIcon,
  StagesIcon,
  UserCircleIcon,
} from '@/assets/icons';
import {
  useGetDealActivityQuery,
  useGetDealDetailsQuery,
  useGetDealNotesQuery,
} from '@/store/dashboard/dashboard.api';
import Dealtabs from './Dealtabs';
import { DealDetailsSkeleton } from '@/components/ui/skeleton/DealDetailSkeleton';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function DealDetails({
  selectedDealId,
  workspaceId,
  teamspaceId,
  pipelineId,
}: any) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!selectedDealId) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set('dealtab', 'overview');
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [selectedDealId]);

  const { data, currentData, isLoading, isFetching } = useGetDealDetailsQuery(
    {
      workspaceid: workspaceId!,
      teamspaceid: teamspaceId!,
      pipeline_id: pipelineId!,
      deal_id: selectedDealId,
    },
    {
      skip: !selectedDealId || !workspaceId || !teamspaceId || !pipelineId,
      refetchOnMountOrArgChange: true,
    }
  );
  const { data: dealData } = useGetDealActivityQuery(
    {
      pipeline_id: pipelineId!,
      workspaceid: workspaceId!,
      teamspaceid: teamspaceId!,
      deal_id: selectedDealId,
    },
    {
      skip: !pipelineId || !workspaceId || !teamspaceId || !selectedDealId,
    }
  );
  const { data: NoteData } = useGetDealNotesQuery(
    {
      pipeline_id: pipelineId!,
      workspaceid: workspaceId!,
      teamspaceid: teamspaceId!,
      deal_id: selectedDealId,
    },
    {
      skip: !pipelineId || !workspaceId || !teamspaceId || !selectedDealId,
    }
  );
  console.log('user', NoteData);

  const deal = currentData ?? data;

  if (!selectedDealId || isLoading || isFetching || !deal) {
    return <DealDetailsSkeleton />;
  }
  return (
    <div>
      <div className="w-full border rounded-lg border-[#333] p-2">
        <div className="flex items-center gap-2">
          <DealsNameIcon />
          <h3 className="font-medium text-2xl">{deal?.name}</h3>
        </div>
        <div className="mt-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-20">
              <div className="flex items-center gap-2">
                <DealNameIcon />
                <h3 className="text-[#797B72] font-medium text-xs">Company</h3>
              </div>
              <div className="p-1">
                <h3 className="bg-[#262626] text-xs text-white p-1 rounded border border-[#333333]">
                  {deal?.company_name}
                </h3>
              </div>
            </div>
            <div className="flex items-center gap-24">
              <div className="flex items-center gap-2">
                <UserCircleIcon />
                <h3 className="text-[#797B72] font-medium text-xs">Owner</h3>
              </div>
              <div className="p-1">
                <h3 className=" text-xs text-white p-1">
                  {deal?.company_owner || '-'}
                </h3>
              </div>
            </div>
            <div className="flex items-center gap-10">
              <div className="flex items-center gap-2">
                <PrimaryContactIcon />
                <h3 className="text-[#797B72] font-medium text-xs">
                  Primary Contact
                </h3>
              </div>
              <div className="p-1">
                <h3 className=" text-xs text-white p-1">
                  {deal?.company_owner || '-'}
                </h3>
              </div>
            </div>
            <div className="flex items-center gap-24.5">
              <div className="flex items-center gap-2">
                <LeadTitleIcon />
                <h3 className="text-[#797B72] font-medium text-xs">Stage</h3>
              </div>
              <div className="p-1">
                <h3 className=" text-xs flex items-center gap-2 uppercase text-white p-1">
                  <StagesIcon />
                  {deal?.stage || '-'}
                </h3>
              </div>
            </div>
            <div className="flex items-center gap-20">
              <div className="flex items-center gap-2">
                <CostIcon />
                <h3 className="text-[#797B72] font-medium text-xs">
                  Deal value
                </h3>
              </div>
              <h3 className=" text-xs bg-[#23412E] rounded text-[#6ECF6F] flex items-center gap-2 uppercase font-medium p-1">
                ${deal?.value || '-'}
              </h3>
            </div>
            <div className="flex items-center gap-20">
              <div className="flex items-center gap-2">
                <ClockwiseIcon />
                <h3 className="text-[#797B72] font-medium text-xs">
                  Last activity
                </h3>
              </div>
              <h3 className=" text-xs  flex items-center gap-2 uppercase font-medium p-1">
                {deal?.last_activity || '-'}
              </h3>
            </div>
            <div className="flex items-center gap-18">
              <div className="flex items-center gap-2">
                <CalenderBankIcon />
                <h3 className="text-[#797B72] font-medium text-xs">
                  Close date
                </h3>
              </div>
              <h3 className=" text-xs bg-[#262626] rounded border border-[#333333] text-[#E9E9E9] flex items-center gap-2 uppercase font-medium p-1">
                {deal?.close_date || '-'}
              </h3>
            </div>
            <div className="flex items-center gap-18">
              <div className="flex items-center gap-2">
                <NextIcon />
                <h3 className="text-[#797B72] font-medium text-xs">
                  Next Steps
                </h3>
              </div>
              <h3 className=" text-xs bg-[#262626] rounded border border-[#333333] text-[#E9E9E9] flex items-center gap-2 uppercase font-medium p-1">
                Set next steps{' '}
              </h3>
            </div>
          </div>
        </div>
      </div>
      <Dealtabs
        dealData={dealData}
        NoteData={NoteData}
        selectedDealId={selectedDealId}
        pipelineId={pipelineId}
        workspaceId={workspaceId}
        teamspaceId={teamspaceId}
      />
    </div>
  );
}
