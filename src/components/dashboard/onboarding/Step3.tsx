'use client';

import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nextStep, setCalendarProvider } from '@/store/onboarding/onboarding.slice';
import {
  ArrowLeftIcon,
  GoogleCalenderIcon,
  MicroSoftCalenderIcon,
} from '@/assets/icons';

export default function Step3() {
  const dispatch = useDispatch();
  const calendarProvider = useSelector(
    (s: any) => s.onboarding?.calendarProvider ?? null
  );

  const providers = useMemo(
    () => [
      {
        label: 'Google Calendar',
        Icon: GoogleCalenderIcon,
      },
      {
        label: 'Microsoft Outlook',
        Icon: MicroSoftCalenderIcon,
      },
    ],
    []
  );

  return (
    <div className="space-y-6  max-w-[340px] mx-auto text-center ">
      <h2 className="text-2xl text-white">Let’s connect your calendar </h2>

      <div className="grid grid-cols-1  md:px-10 w-full gap-4 mt-12 bg-[#0E0E0E] p-5 rounded-[20px]">
        {providers.map(({ label, Icon }) => {
          const isSelected = calendarProvider === label;
          return (
            <button
              key={label}
              type="button"
              onClick={() =>
                dispatch(
                  setCalendarProvider(
                    calendarProvider === label ? null : label
                  )
                )
              }
              className={`w-full px-4 py-4 rounded-lg border transition-all flex items-center gap-3 bg-transparent
                ${
                  isSelected
                    ? 'inputgradients border-none'
                    : 'border-[#5E5D5D1F] hover:border-white/20'
                }
              `}
            >
              <div className="w-6 h-6 flex items-center justify-center">
                <Icon />
              </div>

              <span className="text-white-200 text-start font-medium font-general">
                {label}
              </span>
            </button>
          );
        })}
      </div>
      <div className="flex flex-col gap-[14px] justify-center items-center">
        <button
          disabled={!calendarProvider}
          onClick={() => dispatch(nextStep())}
          className={`flex font-general items-center cursor-pointer justify-center gap-2 w-[280px] px-4 py-3 text-sm font-medium text-white transition rounded-full shadow-theme-xs bg-green-100`}
        >
          Connect Calendar
          <span className="mt-1">
            <ArrowLeftIcon />
          </span>
        </button>
        <button
          className="text-[#8C8C8C] text-sm hover:underline"
          onClick={() => {
            dispatch(setCalendarProvider(null));
            dispatch(nextStep());
          }}
          type="button"
        >
          I’ll do this later
        </button>
      </div>
    </div>
  );
}
