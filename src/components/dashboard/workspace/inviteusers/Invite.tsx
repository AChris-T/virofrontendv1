'use client';

import React from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  useGetTeamSpacesQuery,
  useInviteWorkspaceUsersMutation,
} from '@/store/dashboard/dashboard.api';
import useToastify from '@/hooks/useToastify';
import Loader from '@/components/ui/Loader';
import { ArrowDownIcon, ArrowRight, CirclePlusIcon } from '@/assets/icons';

type InviteRow = {
  email: string;
  teamspace: string;
};

type InviteFormValues = {
  users: InviteRow[];
};

export default function Invite() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { showToast } = useToastify();
  const [inviteUsers, { isLoading: isInviting }] =
    useInviteWorkspaceUsersMutation();
  const { data: teamspacesData } = useGetTeamSpacesQuery();

  const workspaceId = searchParams.get('workspace_id') ?? '';
  const teamspaceList = teamspacesData?.teamspaces ?? [];
  const defaultTeamspaceId = teamspaceList[0]?.id ?? '';

  const { register, control, handleSubmit, setValue, getValues } =
    useForm<InviteFormValues>({
      defaultValues: {
        users: [{ email: '', teamspace: defaultTeamspaceId }],
      },
    });

  const { fields, append } = useFieldArray({
    control,
    name: 'users',
  });

  const teamspaceSeededRef = React.useRef(false);

  React.useEffect(() => {
    teamspaceSeededRef.current = false;
  }, [workspaceId]);

  React.useEffect(() => {
    if (!defaultTeamspaceId || teamspaceSeededRef.current) return;
    teamspaceSeededRef.current = true;
    const rows = getValues('users');
    rows.forEach((_, i) => {
      const current = getValues(`users.${i}.teamspace`);
      if (!current) {
        setValue(`users.${i}.teamspace`, defaultTeamspaceId, {
          shouldDirty: false,
        });
      }
    });
  }, [defaultTeamspaceId, getValues, setValue]);

  const onSubmit = async (formData: InviteFormValues) => {
    if (!workspaceId) {
      showToast('Workspace not found. Try again later.', 'error');
      return;
    }

    if (teamspaceList.length === 0) {
      showToast('No teamspaces available for this workspace.', 'error');
      return;
    }

    const filled = formData.users
      .map((u) => ({
        email: (u.email ?? '').trim(),
        teamspace: (u.teamspace ?? '').trim(),
      }))
      .filter((u) => u.email.length > 0);

    if (filled.length === 0) {
      showToast('Add at least one email address.', 'error');
      return;
    }

    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const invalid = filled.find((u) => !emailRe.test(u.email));
    if (invalid) {
      showToast('Please enter a valid email for every row.', 'error');
      return;
    }

    const missingTeamspace = filled.find((u) => !u.teamspace);
    if (missingTeamspace) {
      showToast('Select a teamspace for each invite.', 'error');
      return;
    }

    const payload = {
      workspace_id: workspaceId,
      users: filled.map((u) => ({
        email: u.email,
        teamspaces: [u.teamspace],
      })),
    };

    try {
      const res = await inviteUsers(payload).unwrap();
      showToast(res?.message || 'Invitations sent successfully', 'success');
      router.push('/onboarding/inviteduser');
    } catch (error: unknown) {
      const err = error as {
        data?: { message?: string; detail?: string; error?: string };
      };
      const message = err?.data?.detail || 'Failed to send invitations';
      showToast(message, 'error');
    }
  };

  const onSkip = () => {
    router.push('/onboarding/welcome');
  };

  const addRow = () => {
    append({
      email: '',
      teamspace: defaultTeamspaceId || teamspaceList[0]?.id || '',
    });
  };

  if (!workspaceId) {
    return (
      <div className="max-w-[650px] mx-auto text-center text-white/70 font-general text-sm px-4">
        Invalid workspace. Please try again.
      </div>
    );
  }

  if (!teamspaceList || teamspaceList.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[200px] w-full">
        <Loader />
      </div>
    );
  }

  return (
    <div className="w-full  space-y-6 ">
      <h2 className="text-[28px] text-center text-white font-general">
        Who’s here with you?
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" p-5 sm:p-6 rounded-[20px] text-left space-y-5"
      >
        <p className="text-white/70 font-general text-sm">
          Enter Email Address
        </p>

        <div className="space-y-3">
          {fields.map((field, index) => (
            <div key={field.id} className="flex flex-row gap-3 ">
              <div className="relative w-full  max-w-[400px] gradient-inputbox">
                <input
                  type="email"
                  autoComplete="email"
                  placeholder="joeburg@pico.co"
                  className="relative z-[2] w-full font-inter text-sm h-[20px] rounded-md bg-transparent text-white-100 placeholder:text-white/35 focus:outline-none"
                  {...register(`users.${index}.email`)}
                />
              </div>

              <div className="relative w-[120px] shrink-0 border border-[#5E5D5D4D] rounded-lg justify-center items-center flex px-2">
                <select
                  className="relative z-[2] w-full appearance-none font-inter text-sm h-[20px] min-h-[44px] sm:min-h-0 py-3 sm:py-0 rounded-md bg-transparent text-white-100 focus:outline-none cursor-pointer pr-8"
                  disabled={teamspaceList.length === 0}
                  {...register(`users.${index}.teamspace`)}
                >
                  {teamspaceList.length === 0 ? (
                    <option value="">No teamspaces</option>
                  ) : (
                    teamspaceList.map((ts) => (
                      <option
                        key={ts.id}
                        value={ts.id}
                        className="bg-[#0E0E0E] text-white"
                      >
                        {ts.name}
                      </option>
                    ))
                  )}
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 z-[2] -translate-y-1/2 text-white/50 text-xs">
                  <ArrowDownIcon />
                </span>
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={addRow}
          className="flex items-center gap-2 text-white/70 hover:text-white text-sm font-general transition-colors"
        >
          <CirclePlusIcon />
          Add another member
        </button>

        <div className="flex flex-col items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={isInviting || teamspaceList.length === 0}
            className="flex font-general items-center justify-center gap-2 w-full max-w-[320px] px-4 py-3 text-sm font-medium text-white transition rounded-full shadow-theme-xs bg-green-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isInviting ? (
              <Loader />
            ) : (
              <>
                Invite Your Team
                <ArrowRight />
              </>
            )}
          </button>

          <button
            type="button"
            disabled={isInviting}
            onClick={onSkip}
            className="text-white/50 text-sm font-general hover:text-white/80 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Skip for now
          </button>
        </div>
      </form>
    </div>
  );
}
