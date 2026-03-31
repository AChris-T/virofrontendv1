'use client';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import StepCard from './StepCard';
import { nextStep, setRole } from '@/store/onboarding/onboarding.slice';
import { ArrowLeftIcon, BagIcon } from '@/assets/icons';

export default function Step1Role() {
  const dispatch = useDispatch();
  const role = useSelector((s: any) => s.onboarding?.role ?? null);
  const [otherRole, setOtherRole] = useState('');
  const options = ['Sales Professional', 'Other'];

  useEffect(() => {
    if (role !== 'Other') setOtherRole('');
  }, [role]);

  const isOtherMode = role === 'Other';

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

      {!isOtherMode && (
        <div className="grid grid-cols-1 md:grid-cols-2 md:px-10 w-full gap-4 mt-12 bg-[#0E0E0E] p-5 rounded-[20px]">
          {options.map((opt) => (
            <StepCard
              key={opt}
              label={opt}
              selected={role === opt}
              onClick={() => {
                dispatch(setRole(opt));
              }}
            />
          ))}
        </div>
      )}

      {isOtherMode && (
        <div className="flex flex-col items-center gap-4">
          <div className="w-full max-w-[578px]">
            <div className="gradient-inputbox flex items-center gap-3 w-full px-4 py-3 rounded-md">
              <BagIcon />
              <input
                value={otherRole}
                onChange={(e) => setOtherRole(e.target.value)}
                placeholder="What best describes your role?"
                className="w-full font-general font-medium text-sm h-[20px] rounded-md bg-transparent text-white-200 placeholder:text-white/35 focus:outline-none"
              />
            </div>
            <h3 className="text-white-100 text-xs mt-[15px] font-inter">
              e.g HR Manager, Consultant, Founder
            </h3>
          </div>

          <div className="flex flex-col justify-center items-center mt-6 gap-3">
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
              Next
              <span className="mt-1">
                <ArrowLeftIcon />
              </span>
            </button>

            <button
              type="button"
              onClick={() => {
                setOtherRole('');
                dispatch(setRole(null));
              }}
              className="text-white/50 text-sm hover:text-white/80"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {!isOtherMode && (
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
