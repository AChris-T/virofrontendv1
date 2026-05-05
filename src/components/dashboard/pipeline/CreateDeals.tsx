'use client';

import React, { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import type {
  CreateDealPayload,
  CreateDealPriorityApi,
  PipelineEntity,
} from '@/components/types';
import { Input } from '@/components/form/Input';
import Loader from '@/components/ui/Loader';
import useToastify from '@/hooks/useToastify';
import { useCreateDealMutation } from '@/store/dashboard/dashboard.api';
import {
  CompanyNameIcon,
  DealCalender,
  DealNameIcon,
  EmailContactIcon,
  InboundIcon,
  MarkedIcon,
  OutBoundIcon,
  UserContactIcon,
  WarningIcon,
} from '@/assets/icons';
import SelectDropdown from '@/components/ui/dropdown/SelectDropdown';

type DealOrigination = 'inbound' | 'outbound' | 'referral' | 'other';

type DealPriority = 'low' | 'safe' | 'medium' | 'urgent' | 'high' | 'at_risk';

/** Maps UI priorities to API enum (`safe` → low, `at_risk` → urgent). */
function priorityToApi(priority: DealPriority): CreateDealPriorityApi {
  switch (priority) {
    case 'medium':
      return 'medium';
    case 'high':
      return 'high';
    case 'urgent':
      return 'urgent';
    case 'low':
    case 'safe':
      return 'low';
    case 'at_risk':
      return 'urgent';
    default:
      return 'medium';
  }
}

/** Accepts `YYYY-MM-DD` or `DD/MM/YYYY` (also `DD-MM-YYYY`). Returns ISO date or null. */
function closeDateToIso(raw: string): string | null {
  const s = raw.trim();
  if (!s) return null;
  if (/^\d{4}-\d{2}-\d{2}$/.test(s)) {
    const [y, m, d] = s.split('-').map(Number);
    const dt = new Date(y, m - 1, d);
    if (
      dt.getFullYear() === y &&
      dt.getMonth() === m - 1 &&
      dt.getDate() === d
    ) {
      return s;
    }
    return null;
  }
  const m = s.match(/^(\d{1,2})[/\-](\d{1,2})[/\-](\d{4})$/);
  if (m) {
    const dd = Number(m[1]);
    const mm = Number(m[2]);
    const yyyy = Number(m[3]);
    const dt = new Date(yyyy, mm - 1, dd);
    if (
      dt.getFullYear() === yyyy &&
      dt.getMonth() === mm - 1 &&
      dt.getDate() === dd
    ) {
      return `${yyyy}-${String(mm).padStart(2, '0')}-${String(dd).padStart(2, '0')}`;
    }
  }
  return null;
}

type FormData = {
  dealName: string;
  company: string;
  primaryContactName: string;
  primaryContactEmail: string;
  currency: string;
  dealValue: string;
  closeDate: string;
  origination: DealOrigination;
  /** Pipeline stage key — must exist in `pipeline.stages` when pipeline is set */
  stage: string;
  priority: DealPriority;
  description: string;
};

const steps = [
  { label: 'Basics', caption: 'Deal name, company, contact' },
  { label: 'Deal Stage', caption: 'Stage, priority, description' },
  { label: 'Assign Team Members', caption: 'Add collaborators' },
  { label: 'Review', caption: 'Confirm and create deal' },
];

function resolveInitialStage(
  pipeline: PipelineEntity | null | undefined,
  initialStageKey: string | null | undefined
): string {
  const stages = pipeline?.stages ?? [];
  if (initialStageKey && stages.includes(initialStageKey))
    return initialStageKey;
  return stages[0] ?? '';
}

function stageLabelFor(
  pipeline: PipelineEntity | null | undefined,
  stageKey: string
): string {
  return pipeline?.stages_labels?.[stageKey] ?? stageKey;
}

const STAGE_TO_SECTION: Record<string, 0 | 1 | 2 | 3> = {
  prospecting: 0,
  lead: 0,
  meeting_scheduled: 1,
  qualified: 1,
  discovery: 1,
  demo: 2,
  pilot: 2,
  negotiation: 3,
  closed_won: 3,
  lost: 3,
  disqualified: 3,
  long_term: 3,
};

function stageSectionIndex(
  stageKey: string,
  orderedStages: string[]
): 0 | 1 | 2 | 3 {
  if (STAGE_TO_SECTION[stageKey] !== undefined) {
    return STAGE_TO_SECTION[stageKey];
  }
  const i = orderedStages.indexOf(stageKey);
  if (i < 0) return 0;
  const n = orderedStages.length;
  if (n <= 1) return 0;
  const t = i / (n - 1);
  if (t < 0.28) return 0;
  if (t < 0.55) return 1;
  if (t < 0.82) return 2;
  return 3;
}

const STAGE_GROUP_LABELS = [
  'Top of Pipeline',
  'Qualification',
  'Engagement',
  'Late stage',
] as const;

function groupStagesIntoSections(orderedStages: string[]): string[][] {
  const buckets: string[][] = [[], [], [], []];
  for (const key of orderedStages) {
    buckets[stageSectionIndex(key, orderedStages)].push(key);
  }
  return buckets;
}

/** Bordered stage chip: inactive = subtle border; selected = lime text + lime-tinted border */
function stageChipClass(active: boolean): string {
  const base =
    'rounded-lg border px-3 py-1.5 text-xs font-medium transition-all';
  if (active) {
    return `${base} bg-[#262626] border-[#333333] text-[#A9D80E]`;
  }
  return `${base} bg-[#262626] border-[#333333] text-[#797B72] hover:border-[#595959]`;
}

function priorityPillClass(id: DealPriority, active: boolean): string {
  const base = 'rounded px-3 py-1.5 text-xs font-medium transition-all';
  if (!active) {
    const inactive: Record<DealPriority, string> = {
      low: `${base} bg-[#1F3A22]  text-[#A5D6A7]`,
      safe: `${base} bg-[#23472A]  text-[#81C784]`,
      medium: `${base} bg-[#4A2A0B]  text-[#FFD54F]`,
      urgent: `${base} bg-[#4A2A0B]  text-[#FFB74D]`,
      high: `${base} bg-[#4A1414]  text-[#EF9A9A]`,
      at_risk: `${base} bg-[#93000A]  text-[#FFB4AB]`,
    };
    return inactive[id];
  }
  const activeStyles: Record<DealPriority, string> = {
    low: `${base} bg-[#162D1E] border-[#38D47D66] text-[#38D47D]`,
    safe: `${base} bg-[#A9D80E] border-[#A9D80E] text-[#101010]`,
    medium: `${base} bg-[#C7A900] border-[#C7A900] text-[#101010]`,
    urgent: `${base} bg-[#FF7A0014] border-[#FF7A0066] text-[#FF7A00]`,
    high: `${base} bg-[#FF3B3014] border-[#FF3B3066] text-[#FF3B30]`,
    at_risk: `${base} bg-[#FF3B30] border-[#FF3B30] text-white`,
  };
  return activeStyles[id];
}

export type TeamMember = {
  id: string;
  name: string;
  email: string;
  initials: string;
};

export type DealSubmitPayload = CreateDealPayload;

export type CreateDealsProps = {
  pipeline?: PipelineEntity | null;
  initialStageKey?: string | null;
  teamMembers?: TeamMember[];
  workspaceId?: string | null;
  teamspaceId?: string | null;
  /** Called after a successful create (e.g. close modal and refetch board) */
  onCreated?: () => void;
};

export default function CreateDeals({
  pipeline = null,
  initialStageKey = null,
  teamMembers = [],
  workspaceId,
  teamspaceId,
  onCreated,
}: CreateDealsProps = {}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [assignedIds, setAssignedIds] = useState<string[]>([]);
  const { showToast } = useToastify();
  const [createDealMutation, { isLoading: isCreatingDeal }] =
    useCreateDealMutation();

  const initialStage = useMemo(
    () => resolveInitialStage(pipeline, initialStageKey),
    [pipeline, initialStageKey]
  );

  const orderedStages = useMemo(
    () => pipeline?.stages ?? [],
    [pipeline?.stages]
  );

  const stagesBySection = useMemo(
    () => groupStagesIntoSections(orderedStages),
    [orderedStages]
  );

  const firstSectionWithStages = useMemo(() => {
    for (let i = 0; i < stagesBySection.length; i++) {
      if (stagesBySection[i]?.length) return i;
    }
    return 0;
  }, [stagesBySection]);

  const {
    register,
    watch,
    setValue,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      dealName: '',
      company: '',
      primaryContactName: '',
      primaryContactEmail: '',
      currency: 'USD',
      dealValue: '',
      closeDate: '',
      origination: 'inbound',
      stage: initialStage,
      priority: 'medium',
      description: '',
    },
    mode: 'onTouched',
    shouldUnregister: false,
  });

  const values = watch();

  const progress = useMemo(() => {
    if (steps.length <= 1) return 100;
    return Math.round(((currentStep + 1) / steps.length) * 100);
  }, [currentStep]);

  const assignedMembers = useMemo(() => {
    const map = new Map(teamMembers.map((m) => [m.id, m]));
    return assignedIds.map((id) => map.get(id)).filter(Boolean) as TeamMember[];
  }, [assignedIds, teamMembers]);

  const toggleAssigned = (id: string) => {
    setAssignedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const jumpTo = (idx: number) =>
    setCurrentStep(Math.max(0, Math.min(idx, steps.length - 1)));

  const goNext = async () => {
    if (currentStep === 0) {
      const ok = await trigger([
        'dealName',
        'company',
        'primaryContactName',
        'primaryContactEmail',
        'dealValue',
        'closeDate',
      ]);
      if (!ok) return;
    }
    if (currentStep === 1) {
      const ok = await trigger(['stage', 'description']);
      if (!ok) return;
    }
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const goBack = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  const createDeal = async () => {
    const pipelineId = pipeline?.id;
    if (!workspaceId || !teamspaceId || !pipelineId) {
      showToast(
        'Workspace, teamspace, or pipeline is missing. Cannot create deal.',
        'error'
      );
      return;
    }

    const v = getValues();
    const closeIso = closeDateToIso(v.closeDate);
    if (!closeIso) {
      showToast(
        'Close date must be valid. Use DD/MM/YYYY or YYYY-MM-DD.',
        'error'
      );
      return;
    }

    const payload: CreateDealPayload = {
      name: v.dealName,
      company_name: v.company,
      contact: {
        name: v.primaryContactName,
        email: v.primaryContactEmail,
      },
      currency: v.currency,
      value: Number(String(v.dealValue).replace(/,/g, '')) || 0,
      close_date: closeIso,
      source: v.origination,
      stage: v.stage,
      priority: priorityToApi(v.priority),
      description: v.description,
      assigned_to: [...assignedIds],
    };

    try {
      await createDealMutation({
        workspaceid: workspaceId,
        teamspaceid: teamspaceId,
        pipeline_id: pipelineId,
        payload,
      }).unwrap();
      showToast('Deal created successfully.', 'success');
      onCreated?.();
    } catch (error: unknown) {
      const err = error as { data?: { detail?: string; message?: string; error?: string } | string };
      const data = err?.data;
      const msg =
        typeof data === 'string'
          ? data
          : data?.detail ?? data?.message ?? data?.error ?? 'Failed to create deal.';
      showToast(String(msg), 'error');
    }
  };

  return (
    <div className="w-full ">
      <div className="px-4 pt-4 pb-3 ">
        <div className="flex items-center justify-between gap-3">
          <div className="text-xs bg-[#262626] rounded-full px-2 py-1 text-white font-medium">
            Step {currentStep + 1}{' '}
            <span className="text-[#A6A6A6]">of {steps.length} </span>
            <span className="text-[#A6A6A6]">•</span>{' '}
            <span className="text-[#A6A6A6]">{steps[currentStep]?.label}</span>
          </div>
          <div className="h-2 w-32 bg-[#262626] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#A9D80E]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <form
        onSubmit={(e) => e.preventDefault()}
        onKeyDown={(e) => {
          if (e.key === 'Enter') e.preventDefault();
        }}
        className="px-5 py-4"
      >
        {currentStep === 0 && (
          <div className="space-y-4">
            <Input
              label="Deal name"
              leftIcon={<DealNameIcon />}
              placeholder="e.g Acme Corp Enterprise"
              error={errors.dealName}
              {...register('dealName', { required: 'Deal name is required' })}
              className="h-[48px] py-3 font-general font-medium text-sm text-[#737373]"
            />

            <Input
              label="Company"
              leftIcon={<CompanyNameIcon />}
              placeholder="Figma Enterprise"
              error={errors.company}
              {...register('company', { required: 'Company is required' })}
              className="h-[48px] py-3 font-general font-medium text-sm text-[#D9D9D9]"
            />

            <div className="space-y-1 flex flex-col">
              <label className="text-sm text-white/60 font-medium">
                Primary Contact
              </label>
              <div className="grid grid-cols-2 gap-3">
                <Input
                  placeholder="Full name"
                  leftIcon={<UserContactIcon />}
                  error={errors.primaryContactName}
                  {...register('primaryContactName', {
                    required: 'Contact name is required',
                  })}
                  className="h-[48px] py-3 font-general font-medium text-sm text-[#D9D9D9]"
                />
                <Input
                  placeholder="Email address"
                  leftIcon={<EmailContactIcon />}
                  error={errors.primaryContactEmail}
                  {...register('primaryContactEmail', {
                    required: 'Contact email is required',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Enter a valid email',
                    },
                  })}
                  className="h-[48px] py-3 font-general font-medium text-sm text-[#D9D9D9]"
                />
              </div>
            </div>

            <div className="space-y-2 flex flex-col">
              <label className="text-sm text-white/60 font-medium">
                Deal Value
              </label>
              <div className="flex h-[48px]  gap-3">
                <SelectDropdown
                  ariaLabel="Currency"
                  options={[
                    { label: 'USD', value: 'USD' },
                    { label: 'EUR', value: 'EUR' },
                    { label: 'GBP', value: 'GBP' },
                    { label: 'NGN', value: 'NGN' },
                  ]}
                  value={values.currency}
                  onChange={(v) => setValue('currency', v)}
                  triggerClassName="h-[48px] "
                />
                <Input
                  placeholder="0"
                  inputMode="numeric"
                  error={errors.dealValue}
                  {...register('dealValue', {
                    required: 'Deal value is required',
                    validate: (v) => {
                      const num = Number(String(v).replace(/,/g, ''));
                      if (Number.isNaN(num)) return 'Enter a valid number';
                      if (num < 0) return 'Value cannot be negative';
                      return true;
                    },
                  })}
                  className="h-[48px] py-3 font-general font-medium text-sm text-[#D9D9D9]"
                />
              </div>
            </div>

            <Input
              label="Close Date"
              placeholder="dd/mm/yyyy"
              rightIcon={<DealCalender />}
              error={errors.closeDate}
              {...register('closeDate', {
                required: 'Close date is required',
                validate: (value) =>
                  closeDateToIso(value) !== null ||
                  'Use a valid date (DD/MM/YYYY or YYYY-MM-DD)',
              })}
              className="h-[48px] py-3 font-general font-medium text-sm text-[#D9D9D9]"
            />

            <div className="space-y-1 flex flex-col border-b border-[#333333] pb-6">
              <label className="text-sm text-white/60 font-medium">
                How did this deal originate?
              </label>
              <div className="flex flex-wrap gap-2">
                <button className="px-4 py-2 flex items-center gap-2 rounded-lg text-[#797B72] text-sm font-medium  bg-[#262626] border border-[#333333]">
                  <InboundIcon />
                  Inbound
                </button>
                <button className="px-4 py-2 flex items-center gap-2 rounded-lg text-[#797B72] text-sm font-medium  bg-[#262626] border border-[#333333]">
                  <OutBoundIcon />
                  Outbound
                </button>
                <button className="px-4 py-2 flex text-[#797B72] rounded-lg text-sm font-medium items-center gap-2 bg-[#262626] border border-[#333333]">
                  <OutBoundIcon />
                  Referral
                </button>
                <button className="px-4 py-2 flex text-[#797B72] rounded-lg text-sm font-medium items-center gap-2 bg-[#262626] border border-[#333333]">
                  Other
                </button>
              </div>
            </div>
          </div>
        )}

        {currentStep === 1 && (
          <div className="">
            <input
              type="hidden"
              {...register('stage', {
                validate: (v) => {
                  if (!orderedStages.length) return true;
                  if (!v || !orderedStages.includes(v))
                    return 'Select a pipeline stage';
                  return true;
                },
              })}
            />

            {orderedStages.length > 0 ? (
              <>
                {STAGE_GROUP_LABELS.map((label, si) => {
                  const keys = stagesBySection[si];
                  if (!keys.length) return null;
                  const sectionHasSelected = keys.includes(values.stage);
                  return (
                    <div key={label} className="w-full">
                      <div className="flex w-full gap-2 items-stretch">
                        <div className="flex-1 min-w-0 space-y-2">
                          <div
                            className={`text-center   ${si === firstSectionWithStages ? '-mt-1' : ''}`}
                          >
                            <div className="flex items-center">
                              <div className="bg-[#333333] w-full h-[1px]" />
                              <span className="text-[#A6A6A6] text-sm font-medium w-[260px]">
                                {label}
                              </span>
                              <div className="bg-[#333333] w-full h-[1px]" />
                            </div>
                          </div>
                          <div className="flex my-5">
                            <div
                              className="w-6 shrink-0 flex items-center justify-start "
                              aria-hidden
                            >
                              {sectionHasSelected ? (
                                <span className="text-[#A9D80E] text-[10px] leading-none select-none">
                                  ▶
                                </span>
                              ) : null}
                            </div>
                            <div className="flex w-full justify-center gap-2 flex-wrap items-center">
                              {keys.map((stageKey) => {
                                const active = values.stage === stageKey;
                                return (
                                  <button
                                    key={stageKey}
                                    type="button"
                                    onClick={() => {
                                      setValue('stage', stageKey, {
                                        shouldValidate: true,
                                        shouldDirty: true,
                                      });
                                    }}
                                    className={stageChipClass(active)}
                                  >
                                    {stageLabelFor(pipeline, stageKey)}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </>
            ) : (
              <p className="text-xs text-[#797B72] text-center py-2 rounded-lg border border-[#333333] bg-[#1f1f1f] px-3">
                No stages on this pipeline. Add stages to the pipeline first,
                then create a deal.
              </p>
            )}
            {errors.stage ? (
              <p className="text-xs text-[#F34141] text-center">
                {errors.stage.message}
              </p>
            ) : null}

            <div className="flex items-center border-t py-6 border-[#333333]  gap-2 text-[11px] text-[#797B72] text-center px-1">
              <WarningIcon />{' '}
              <span>
                The Arrow{' '}
                <span className="text-[#A9D80E] font-semibold">▶</span> shows
                the stage where the deal is positioned in the pipeline.
              </span>
            </div>

            <div className=" border-t  py-4 border-[#333333] ">
              <label className="text-sm text-[#A6A6A6]  font-medium">
                Priority
              </label>
              <div className="flex flex-wrap mt-1  gap-2">
                {(
                  [
                    ['low', 'Low'],
                    ['safe', 'Safe'],
                    ['medium', 'Medium'],
                    ['urgent', 'Urgent'],
                    ['high', 'High'],
                    ['at_risk', 'At Risk'],
                  ] as const
                ).map(([id, label]) => {
                  const selected = values.priority === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setValue('priority', id)}
                      className={`inline-flex items-center justify-center ${priorityPillClass(
                        id as DealPriority,
                        selected
                      )}`}
                    >
                      {selected ? (
                        <>
                          <span className="mr-1 inline" aria-hidden>
                            ✓
                          </span>
                          {label}
                        </>
                      ) : (
                        label
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-[#A6A6A6] font-medium">
                Description{' '}
                <span className="text-[#A6A6A6] text-sm">(Optional)</span>
              </label>
              <textarea
                {...register('description')}
                placeholder="Add context about this deal"
                className="w-full min-h-[56px] mt-1 bg-[#262626] border border-[#333333] rounded-lg px-4 py-3 text-sm text-white/80 placeholder:text-[#737373] focus:outline-none focus:border-[#797B72] transition-colors"
              />
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-3 flex flex-col h-full">
            <div className=" flex flex-col p-3  gap-3 border border-[#333333] rounded-lg bg-[#2E2E2E] pr-1">
              {teamMembers.length === 0 ? (
                <p className="text-xs text-[#797B72] text-center py-6 px-2">
                  No teammates to assign yet.
                </p>
              ) : (
                teamMembers.map((m) => {
                  const checked = assignedIds.includes(m.id);
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => toggleAssigned(m.id)}
                      className={`w-full flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 transition-all ${
                        checked
                          ? 'bg-[#383838] border  border-[#333333]'
                          : 'bg-transparent hover:border-[#333333]'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-9 h-9 rounded-full bg-[#2E2E2E] border border-[#333333] flex items-center justify-center text-xs font-semibold text-white shrink-0">
                          {m.initials}
                        </div>
                        <div className="text-left min-w-0">
                          <div className="text-sm text-white-100 font-medium truncate">
                            {m.name}
                          </div>
                          <div className="text-xs text-[#737373] font-medium truncate">
                            {m.email}
                          </div>
                        </div>
                      </div>
                      <div
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                          checked
                            ? 'bg-[#A9D80E] border-[#35410B]'
                            : 'bg-transparent border-[#333]'
                        }`}
                      >
                        {checked ? (
                          <span className="">
                            <MarkedIcon />
                          </span>
                        ) : null}
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-4">
            <div className="rounded-xl bg-[#2E2E2E] border border-[#333333] p-4">
              <div className="flex items-center border-b border-[#333] pb-2 justify-between">
                <h3 className="text-sm text-white font-medium">Deal Basic</h3>
                <button
                  type="button"
                  onClick={() => jumpTo(0)}
                  className="text-xs text-[#A6A6A6] bg-[#262626] border border-[#333333] rounded px-2 py-1 hover:border-[#797B72]"
                >
                  Edit
                </button>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-3 text-xs">
                <div>
                  <div className="text-[#797B72] font-medium text-sm">Name</div>
                  <div className="text-[#E9E9E9] text-sm font-medium mt-0.5">
                    {values.dealName || '-'}
                  </div>
                </div>
                <div>
                  <div className="text-[#797B72] font-medium text-sm">
                    Company
                  </div>
                  <div className="text-[#E9E9E9] text-sm font-medium mt-0.5">
                    {values.company || '-'}
                  </div>
                </div>
                <div>
                  <div className="text-[#797B72]  font-medium text-sm">
                    Value
                  </div>
                  <div className="text-[#E9E9E9] text-sm font-medium mt-0.5">
                    {values.dealValue
                      ? `${values.currency} ${values.dealValue}`
                      : '-'}
                  </div>
                </div>
                <div>
                  <div className="text-[#797B72]  font-medium text-sm">
                    Close Date
                  </div>
                  <div className="text-[#E9E9E9] text-sm font-medium mt-0.5">
                    {values.closeDate || '-'}
                  </div>
                </div>
                <div className="col-span-2">
                  <div className="text-[#797B72]  font-medium text-sm">
                    Origination
                  </div>
                  <div className="text-[#E9E9E9] text-sm font-medium mt-0.5 capitalize">
                    {values.origination}
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-[#2E2E2E] border border-[#333333] p-4">
              <div className="flex items-center border-b border-[#333] pb-2 justify-between">
                <h3 className="text-sm text-white font-medium">Details</h3>
                <button
                  type="button"
                  onClick={() => jumpTo(1)}
                  className="text-xs text-[#A6A6A6] bg-[#262626] border border-[#333333] rounded px-2 py-1 hover:border-[#797B72]"
                >
                  Edit
                </button>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-3 text-xs">
                <div>
                  <div className="text-[#797B72] font-medium text-sm">
                    Starting Date
                  </div>
                  <div className="text-[#E9E9E9] text-sm font-medium mt-0.5">
                    {stageLabelFor(pipeline, values.stage) || '—'}
                  </div>
                </div>
                <div>
                  <div className="text-[#797B72] font-medium text-sm">
                    Priority
                  </div>
                  <div className="text-[#E9E9E9] text-sm font-medium mt-0.5">
                    {values.priority.replace('_', ' ')}
                  </div>
                </div>
                <div className="col-span-2">
                  <div className="text-[#797B72] font-medium text-sm">
                    Deal Stage
                  </div>
                  <div className="text-[#E9E9E9] text-sm font-medium mt-0.5">
                    {values.stage}
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-[#2E2E2E] border border-[#333333] p-4">
              <div className="flex items-center border-b border-[#333] pb-2 justify-between">
                <h3 className="text-sm text-white font-medium">Assignments</h3>
                <button
                  type="button"
                  onClick={() => jumpTo(2)}
                  className="text-xs text-[#A6A6A6] bg-[#262626] border border-[#333333] rounded px-2 py-1 hover:border-[#797B72]"
                >
                  Edit
                </button>
              </div>

              <div className="mt-3 text-xs">
                <div className="text-[#797B72] font-medium text-sm">
                  Assigned to
                </div>
                <div className="text-[#E9E9E9] text-sm font-medium mt-0.5">
                  {assignedMembers.length
                    ? assignedMembers.map((m) => m.name).join(', ')
                    : '-'}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-5 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={goBack}
            disabled={currentStep === 0}
            className="bg-transparent border border-[#595959] text-[#BFBFBF] rounded-lg py-2.5 px-4 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          {currentStep < steps.length - 1 ? (
            <button
              type="button"
              onClick={goNext}
              className="bg-[#A9D80E] border border-[#5A6D1A] rounded-lg py-2.5 px-4 text-[#101010] text-base font-medium w-full"
            >
              Continue
            </button>
          ) : (
            <button
              type="button"
              onClick={() => void createDeal()}
              disabled={isCreatingDeal}
              className="bg-[#A9D80E] border border-[#5A6D1A] rounded-lg py-2.5 px-4 text-[#101010] text-base font-medium w-full disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2 min-h-[44px]"
            >
              {isCreatingDeal ? <Loader /> : 'Create deal'}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
