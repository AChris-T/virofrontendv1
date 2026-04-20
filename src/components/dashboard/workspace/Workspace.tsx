'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import InputForm from '@/components/form/InputForm';
import useToastify from '@/hooks/useToastify';
import Loader from '@/components/ui/Loader';
import { useWorkSpaceSetUpMutation } from '@/store/profile/profile.api';
import type { WorkSpaceSetUpRequestPayload } from '@/store/profile/profile.api';
import { useGetTeamSpacesQuery } from '@/store/dashboard/dashboard.api';
import type { WorkspaceTeamspace } from '@/store/dashboard/dashboard.api';
import { TeamSpaceCard } from '@/components/ui/TeamsSpaceCard';
import { useWorkspace } from '@/context/WorkspaceContext';

type WorkspaceFormInputs = WorkSpaceSetUpRequestPayload;

export default function Workspace() {
  const router = useRouter();
  const { showToast } = useToastify();
  const [submitWorkspace, { isLoading }] = useWorkSpaceSetUpMutation();
  const { data: teamspaces } = useGetTeamSpacesQuery();
  const { setWorkspaceId, setTeamspaceId } = useWorkspace();
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

      // Set global workspace and teamspace IDs
      setWorkspaceId(res?.workspace_id);
      const selectedTeamspace = teamspaces?.teamspaces?.find(
        (ts: WorkspaceTeamspace) => ts.name === teamspaceName
      );
      if (selectedTeamspace) {
        setTeamspaceId(selectedTeamspace.id);
      }

      router.push(
        `/onboarding/workspace/inviteusers?workspace_id=${res?.workspace_id}`
      );
    } catch (error: any) {
      const message = error?.data?.detail || 'Workspace setup failed';
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
    <div className="space-y-6 max-w-[650px] overflow-y-scroll no-scrollbar mx-auto text-center">
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
              {teamspaces?.teamspaces?.map((teamspace: WorkspaceTeamspace) => (
                <TeamSpaceCard
                  key={teamspace.id}
                  label={teamspace.name}
                  selected={
                    typeof teamspaceNameValue === 'string' &&
                    teamspaceNameValue === teamspace.name
                  }
                  onToggle={() => toggleTeamSpace(teamspace.name)}
                />
              ))}
            </div>
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
