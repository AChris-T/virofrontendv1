'use client';

import React, { useState } from 'react';
import {
  BagDealIcon,
  CalenderBankIcon,
  CostIcon,
  CreatingEventIcon,
  FlagIcon,
  LeadTitleIcon,
  MenuMoreIcon,
  PlusPipeLineIcon,
} from '@/assets/icons';
import { Modal } from '@/components/ui/modal';
import type {
  PipelineBoardColumnApi,
  PipelineBoardDealApi,
  PipelineEntity,
} from '@/components/types';
import CreateDeals from './CreateDeals';

export interface Deal {
  id: string;
  name: string;
  company: string;
  amount: number;
  priority: 'High' | 'Medium' | 'Low';
  dueDate?: string;
  winProbability: number;
  assignee: string;
  avatar?: string;
  closedDate?: string;
}

export interface BoardColumnView {
  id: string;
  title: string;
  color: string;
  icon?: React.ReactNode;
  dealCount: number;
  deals: Deal[];
}

const STAGE_COLORS: Record<string, string> = {
  prospecting: 'bg-slate-500',
  lead: 'bg-blue-500',
  meeting_scheduled: 'bg-cyan-500',
  qualified: 'bg-indigo-500',
  demo: 'bg-amber-500',
  pilot: 'bg-orange-500',
  closed_won: 'bg-green-500',
  lost: 'bg-red-500',
  disqualified: 'bg-gray-600',
  long_term: 'bg-violet-500',
};

function stageColor(stage: string): string {
  return STAGE_COLORS[stage] ?? 'bg-slate-600';
}

function normalizePriority(p?: string | null): 'High' | 'Medium' | 'Low' {
  const v = (p ?? '').toLowerCase();
  if (v === 'high') return 'High';
  if (v === 'low') return 'Low';
  return 'Medium';
}

function formatAssignee(
  a: PipelineBoardDealApi['assignee'] | PipelineBoardDealApi['owner']
): string {
  if (a == null) return 'Unassigned';
  if (typeof a === 'string') return a || 'Unassigned';
  const name = `${a.first_name ?? ''} ${a.last_name ?? ''}`.trim();
  return name || 'Unassigned';
}

function apiDealToViewDeal(d: PipelineBoardDealApi): Deal {
  const amount = Number(d.amount ?? d.value ?? 0);
  const win = Number(d.win_probability ?? 0);
  return {
    id: String(d.id),
    name: d.name ?? d.title ?? 'Untitled deal',
    company: d.company ?? d.company_name ?? '—',
    amount: Number.isFinite(amount) ? amount : 0,
    priority: normalizePriority(d.priority),
    dueDate: d.close_date ?? undefined,
    winProbability: Math.min(100, Math.max(0, Number.isFinite(win) ? win : 0)),
    assignee: formatAssignee(d.assignee ?? d.owner),
  };
}

export function boardColumnToView(
  col: PipelineBoardColumnApi
): BoardColumnView {
  return {
    id: col.stage,
    title: col.label,
    color: stageColor(col.stage),
    icon: <LeadTitleIcon />,
    dealCount: col.deal_count,
    deals: (col.deals ?? []).map(apiDealToViewDeal),
  };
}

const PriorityBadge = ({ priority }: { priority: string }) => {
  const colors = {
    High: 'text-[#F34141] bg-[#372323]',
    Medium: 'text-[#F79009] bg-[#433523]',
    Low: 'text-[#38D47D] bg-[#162D1E]',
  };
  return (
    <span
      className={`text-sm font-medium px-2 py-1 rounded ${colors[priority as keyof typeof colors]}`}
    >
      {priority}
    </span>
  );
};

export const DealCard = ({
  deal,
  onClick,
}: {
  deal: Deal;
  onClick?: () => void;
}) => {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onClick?.();
      }}
      className=" rounded-lg p-4 mb-3 border border-[#333333] bg-[#2E2E2E] hover:border-slate-600 transition-colors cursor-pointer"
    >
      <div className="flex justify-between items-center mb-3">
        <div className="space-y-1">
          <h4 className="text-sm font-medium text-white">{deal.name}</h4>
          <p className="text-xs font-medium text-[#797B72] flex items-center gap-2.5">
            <BagDealIcon />
            {deal.company}
          </p>
        </div>
        <button
          type="button"
          onClick={(e) => e.stopPropagation()}
          className="px-2 cursor-grab bg-[#444444] py-4 rounded-lg"
        >
          <MenuMoreIcon />
        </button>
      </div>

      <div className="space-y-2 py-2">
        <div className=" flex gap-2 items-center ">
          <CostIcon />
          <h3 className="bg-[#23412E] rounded text-xs text-[#6ECF6F] font-medium py-1 px-2">
            {' '}
            ${deal.amount.toLocaleString()}
          </h3>
        </div>
        <div className=" flex gap-2 items-center ">
          <FlagIcon />
          <PriorityBadge priority={deal.priority} />
        </div>
        <div className=" flex gap-2 items-center ">
          <CalenderBankIcon />
          <h3 className="bg-[#262626] border border-[#333] p-1 text-xs rounded font-medium">
            {' '}
            {deal.dueDate}
          </h3>
        </div>
        <div className="mb-2 flex items-center justify-between">
          <div className="flex justify-between w-full items-center mb-1">
            <span className="text-xs text-[#797B72] font-medium">
              Win probability
            </span>
          </div>
          <div className="w-[100px] flex items-center  bg-[#2A2A2A] rounded-full h-2">
            <div
              className="bg-[#A9D80E] h-2 rounded-full"
              style={{ width: `${deal.winProbability}%` }}
            />
          </div>
          <span className="text-xs ml-2  font-semibold text-slate-200">
            {deal.winProbability}%
          </span>
        </div>
      </div>

      <div className="border-t border-[#333333] pt-3">
        <div className="flex items-center space-x-2 ">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center">
            <span className="text-xs text-white">BA</span>
          </div>
          <span className="text-xs text-[#E9E9E9] font-medium">
            {deal.assignee}
          </span>
        </div>
      </div>
    </div>
  );
};

export function KanbanColumn({
  column,
  pipeline,
  workspaceId,
  teamspaceId,
  refetchBoard,
  onDealClick,
}: {
  column: BoardColumnView;
  pipeline?: PipelineEntity | null;
  workspaceId?: string | null;
  teamspaceId?: string | null;
  refetchBoard?: () => void;
  onDealClick: (dealId: string) => void;
}) {
  const [createDeal, setCreateDeal] = useState(false);

  return (
    <div className="flex-shrink-0 bg-[#262626] w-[245px] p-2 rounded-lg h-full flex flex-col">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span
            className={`h-2 w-2 rounded-full shrink-0 ${column.color}`}
            aria-hidden
          />
          <div>{column.icon}</div>
          <h3 className="text-sm font-medium text-white">{column.title}</h3>
          <span className="bg-[#1A2028] text-slate-300 text-sm font-semibold px-2 py-[2px] rounded">
            {column.dealCount}
          </span>
        </div>
        <PlusPipeLineIcon />
      </div>
      <div className="space-y-3 overflow-y-auto flex-1">
        {column.deals.map((deal) => (
          <DealCard
            key={deal.id}
            deal={deal}
            onClick={() => onDealClick(deal.id)}
          />
        ))}
        <button
          onClick={() => setCreateDeal(true)}
          className="w-full font-medium flex gap-2 items-center justify-center py-3 border border-[#333333] rounded-lg text-[#797B72]   transition-colors text-sm"
        >
          <PlusPipeLineIcon /> Add new deal
        </button>
      </div>
      <Modal
        isOpen={createDeal}
        onClose={() => setCreateDeal(false)}
        Title="Add New Deal"
        iconTitle={<CreatingEventIcon />}
        className="max-w-[650px]"
      >
        {createDeal ? (
          <CreateDeals
            pipeline={pipeline}
            initialStageKey={column.id}
            workspaceId={workspaceId}
            teamspaceId={teamspaceId}
            onCreated={() => {
              refetchBoard?.();
              setCreateDeal(false);
            }}
          />
        ) : null}
      </Modal>
    </div>
  );
}

export function BoardLoadingSkeleton() {
  return (
    <div className="flex gap-2 overflow-x-auto pb-4 flex-1">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="flex-shrink-0 bg-[#262626] w-[245px] p-2 rounded-lg h-[min(65vh,520px)] animate-pulse"
        >
          <div className="h-4 w-28 bg-[#333] rounded mb-4" />
          <div className="space-y-2">
            <div className="h-24 bg-[#2E2E2E] rounded border border-[#333]" />
            <div className="h-24 bg-[#2E2E2E] rounded border border-[#333]" />
          </div>
        </div>
      ))}
    </div>
  );
}
