'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import InputForm from '@/components/form/InputForm';
import useToastify from '@/hooks/useToastify';
import Loader from '@/components/ui/Loader';
import { useWorkSpaceSetUpMutation } from '@/store/profile/profile.api';
import type { WorkSpaceSetUpRequestPayload } from '@/store/profile/profile.api';

type WorkspaceFormInputs = WorkSpaceSetUpRequestPayload;

const TEAM_SPACE_OPTIONS = [
  'Sales',
  'Recruitment',
  'Customer Support',
  'Project Management',
] as const;

function CheckMark() {
  return (
    <svg width="12" height="9" viewBox="0 0 12 9" fill="none">
      <path
        d="M10.5 1.5L4.75 7.25L1.5 4"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TeamSpaceCard({
  label,
  selected,
  onToggle,
}: {
  label: string;
  selected: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`cursor-pointer w-full px-4 py-4 rounded-lg border transition-all flex items-center gap-3 text-left
        ${
          selected
            ? 'inputgradients border-none focus:outline-none'
            : 'border-[#5E5D5D1F] hover:border-white/20 bg-transparent'
        }
      `}
    >
      <span
        className={`w-5 h-5 rounded-sm border flex items-center justify-center shrink-0
          ${selected ? 'customizebutton border-[#F8F8F8]' : 'border-white/20 bg-transparent'}
        `}
      >
        {selected ? <CheckMark /> : null}
      </span>

      <span className="text-white-200 text-start font-medium font-general">
        {label}
      </span>
    </button>
  );
}

export default function Workspace() {
  const router = useRouter();
  const { showToast } = useToastify();
  const [submitWorkspace, { isLoading }] = useWorkSpaceSetUpMutation();

  const [step, setStep] = React.useState<1 | 2>(1);

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    setValue,
    trigger,
    watch,
    formState: { errors, touchedFields },
  } = useForm<WorkspaceFormInputs>({
    defaultValues: {
      workspace_name: '',
      teamspace_name: '',
    },
    mode: 'onSubmit',
  });

  const workspaceNameValue = watch('workspace_name');
  const teamspaceNameValue = watch('teamspace_name');

  const canGoNext =
    typeof workspaceNameValue === 'string' &&
    workspaceNameValue.trim().length > 0;

  const toggleTeamSpace = (value: string) => {
    const current =
      typeof teamspaceNameValue === 'string' ? teamspaceNameValue : '';
    const next = current === value ? '' : value;

    setValue('teamspace_name', next, { shouldDirty: true, shouldTouch: true });
    if (next) clearErrors('teamspace_name');
  };

  const onNext = async () => {
    const ok = await trigger('workspace_name');
    if (!ok) return;
    setStep(2);
  };

  const onSubmit = async (formData: WorkspaceFormInputs) => {
    try {
      const teamspaceName =
        typeof formData.teamspace_name === 'string'
          ? formData.teamspace_name.trim()
          : '';
      if (!teamspaceName) {
        setError('teamspace_name', {
          type: 'manual',
          message: 'Select a team space',
        });
        return;
      }

      const payload: WorkspaceFormInputs = {
        workspace_name: (formData.workspace_name ?? '').trim(),
        teamspace_name: teamspaceName,
      };

      const res = await submitWorkspace(payload).unwrap();
      showToast(res?.message || 'Workspace setup completed', 'success');
      router.push('/onboarding/workspace/inviteusers');
    } catch (error: any) {
      const message =
        error?.data?.message ||
        error?.data?.detail ||
        error?.data?.error ||
        'Workspace setup failed';
      showToast(message, 'error');

      if (error?.data?.errors) {
        Object.entries(error.data.errors).forEach(([field, messages]) =>
          setError(field as keyof WorkspaceFormInputs, {
            type: 'server',
            message: Array.isArray(messages)
              ? (messages as any)[0]
              : (messages as any),
          })
        );
      }
    }
  };

  return (
    <div className="space-y-6 max-w-[650px] mx-auto text-center">
      {step === 1 && (
        <div className="space-y-6">
          <h2 className="text-[28px] text-center text-white font-general">
            Let&apos;s get you your workspace!
          </h2>

          <div className="bg-[#0E0E0E] p-5 rounded-[20px] text-left">
            <p className="text-white font-general text-lg mb-4">
              Name your Workspace
            </p>
            <InputForm
              name="workspace_name"
              placeholder="John's Workspace"
              register={register}
              error={errors.workspace_name as any}
              type="text"
              isTouched={!!touchedFields.workspace_name}
              registerOptions={{
                required: 'Workspace name is required',
                validate: (v: any) =>
                  typeof v === 'string' && v.trim().length > 0
                    ? true
                    : 'Workspace name is required',
              }}
            />
          </div>

          <div className="flex flex-col items-center gap-3">
            <button
              type="button"
              disabled={!canGoNext || isLoading}
              onClick={onNext}
              className="flex font-general items-center cursor-pointer justify-center gap-2 w-[280px] px-4 py-3 text-sm font-medium text-white transition rounded-full shadow-theme-xs bg-green-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <h2 className="text-[28px] text-center text-white font-general">
            Set up your team space
          </h2>

          <div className="bg-[#0E0E0E] p-5 rounded-[20px] text-left">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {TEAM_SPACE_OPTIONS.map((opt) => (
                <TeamSpaceCard
                  key={opt}
                  label={opt}
                  selected={
                    typeof teamspaceNameValue === 'string' &&
                    teamspaceNameValue === opt
                  }
                  onToggle={() => toggleTeamSpace(opt)}
                />
              ))}
            </div>

            {/* Hidden field to keep RHF aware of teamspace_name */}
            <input type="hidden" {...register('teamspace_name')} />

            {typeof (errors as any)?.teamspace_name?.message === 'string' && (
              <p className="text-red-500 text-xs mt-3">
                {(errors as any).teamspace_name.message}
              </p>
            )}
          </div>

          <div className="flex flex-col items-center gap-3">
            <button
              type="submit"
              disabled={isLoading}
              className="flex font-general items-center cursor-pointer justify-center gap-2 w-[280px] px-4 py-3 text-sm font-medium text-white transition rounded-full shadow-theme-xs bg-green-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? <Loader /> : 'Submit'}
            </button>

            <button
              type="button"
              disabled={isLoading}
              onClick={() => setStep(1)}
              className="text-white/50 text-sm hover:text-white/80 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Back
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
