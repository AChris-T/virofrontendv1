'use client';
import React, { useMemo, useRef, useState } from 'react';
import { SidePanel } from '@/components/ui/modal/SidePanel';
import type { PipelineBoardResponse, PipelineEntity } from '@/components/types';
import {
  BoardLoadingSkeleton,
  KanbanColumn,
  boardColumnToView,
} from './AllDeals.parts';
import DealDetails from './DealDetails';

type AllDealsProps = {
  board?: PipelineBoardResponse | null;
  data?: PipelineEntity | null;
  isLoading?: boolean;
  workspaceId?: string | null;
  teamspaceId?: string | null;
  refetchBoard?: () => void;
};

export default function AllDeals({
  board,
  data,
  isLoading,
  workspaceId,
  teamspaceId,
  refetchBoard,
}: AllDealsProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [selectedDealId, setSelectedDealId] = useState<string | null>(null);
  const [isDealPanelOpen, setIsDealPanelOpen] = useState(false);
  const pipelineId = data?.id;

  const columns = useMemo(() => {
    if (!board?.columns?.length) return [];
    return board.columns.map(boardColumnToView);
  }, [board]);

  if (isLoading) {
    return (
      <div className="w-full h-full max-h-[65vh] rounded-lg flex flex-col">
        <BoardLoadingSkeleton />
      </div>
    );
  }

  return (
    <div className="w-full h-full   max-h-[55vh] rounded-lg flex flex-col">
      <div
        ref={scrollContainerRef}
        className="flex gap-2 overflow-x-auto overflow-y-auto pb-4 scroll-smooth flex-1 max-h-full"
        style={{ scrollBehavior: 'smooth' }}
      >
        {columns.map((column) => (
          <KanbanColumn
            key={column.id}
            column={column}
            pipeline={data ?? null}
            workspaceId={workspaceId}
            teamspaceId={teamspaceId}
            refetchBoard={refetchBoard}
            onDealClick={(dealId) => {
              setSelectedDealId(dealId);
              setIsDealPanelOpen(true);
            }}
          />
        ))}
      </div>

      <SidePanel
        isOpen={isDealPanelOpen}
        onClose={() => setIsDealPanelOpen(false)}
        headings="Negotiation"
        width="max-w-[550px]"
        linkHref={`/dashboard/pipeline/${pipelineId}`}
      >
        <DealDetails
          selectedDealId={selectedDealId}
          workspaceId={workspaceId}
          teamspaceId={teamspaceId}
          pipelineId={pipelineId}
        />
      </SidePanel>
    </div>
  );
}
