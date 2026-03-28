'use client';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import StepCard from './StepCard';
import { nextStep, setRole } from '@/store/onboarding/onboarding.slice';
import { ArrowLeftIcon } from '@/assets/icons';

export default function Step1Role() {
  const dispatch = useDispatch();
  const role = useSelector((s: any) => s.onboarding?.role ?? null);
  const [otherRole, setOtherRole] = useState('');
  const options = ['Sales Professional', 'Other'];

  useEffect(() => {
    // Reset typed value whenever they switch away from "Other".
    if (role !== 'Other') setOtherRole('');
  }, [role]);

  const isOtherCardSelected = role !== null && role !== 'Sales Professional';

  const canContinue =
    role === null
      ? false
      : role === 'Other'
        ? otherRole.trim().length > 0
        : true;

  return (
    <div className="space-y-6  max-w-[650px] mx-auto">
      <h2 className="text-[28px] text-center text-white ">
        To personalize{' '}
        <span className="font-instrument-serif italic">Viro</span> for you, what
        best describes you?
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 md:px-10 w-full gap-4 mt-12 bg-[#0E0E0E] p-5 rounded-[20px]">
        {options.map((opt) => (
          <StepCard
            key={opt}
            label={opt}
            selected={opt === 'Other' ? isOtherCardSelected : role === opt}
            onClick={() => dispatch(setRole(opt))}
          />
        ))}
      </div>

      {role === 'Other' && (
        <div className="flex flex-col items-center gap-4">
          <div className="w-full max-w-[420px]">
            <input
              value={otherRole}
              onChange={(e) => setOtherRole(e.target.value)}
              placeholder="Type your role"
              className="w-full gradient-inputbox rounded-lg px-4 py-3 text-white placeholder:text-white/40 outline-none"
            />
          </div>

          <div className="flex justify-center items-center">
            <button
              disabled={!canContinue}
              onClick={() => {
                const typed = otherRole.trim();
                if (!typed) return;
                dispatch(setRole(typed));
                dispatch(nextStep());
              }}
              className="flex font-general items-center cursor-pointer justify-center gap-2 w-[280px] px-4 py-3 text-sm font-medium text-white transition rounded-full shadow-theme-xs bg-green-100 disabled:opacity-50 disabled:cursor-not-allowed"
              type="button"
            >
              Submit{' '}
              <span className="mt-1">
                <ArrowLeftIcon />
              </span>
            </button>
          </div>
        </div>
      )}

      {role !== 'Other' && (
        <div className="flex justify-center items-center">
          <button
            disabled={!canContinue}
            onClick={() => dispatch(nextStep())}
            className="flex font-general items-center cursor-pointer justify-center gap-2 w-[280px] px-4 py-3 text-sm font-medium text-white transition rounded-full shadow-theme-xs bg-green-100 disabled:opacity-50 disabled:cursor-not-allowed"
            type="button"
          >
            Next{' '}
            <span className="mt-1">
              <ArrowLeftIcon />
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
