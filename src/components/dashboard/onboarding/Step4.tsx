'use client';

import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  nextStep,
  toggleConnectedPlatform,
} from '@/store/onboarding/onboarding.slice';
import {
  ArrowLeftIcon,
  GoogleMeetIcon,
  TeamsMeetingIcon,
  ZoomIcon,
} from '@/assets/icons';

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

export default function Step4() {
  const dispatch = useDispatch();
  const connectedPlatforms = useSelector(
    (s: any) => s.onboarding?.connectedPlatforms ?? []
  ) as string[];

  const platforms = useMemo(
    () =>
      [
        {
          label: 'Google Meet',
          Icon: GoogleMeetIcon,
        },
        { label: 'Zoom', Icon: ZoomIcon },
        {
          label: 'Microsoft Teams',
          Icon: TeamsMeetingIcon,
        },
      ],
    []
  );

  return (
    <div className="space-y-6 max-w-[520px] mx-auto text-center">
      <h2 className="text-2xl text-white">
        Which meeting platform do you use?{' '}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 w-full gap-4 bg-[#0E0E0E] p-5 rounded-[20px]">
        {platforms.map(({ label, Icon }) => {
          const isSelected = connectedPlatforms.includes(label);
          return (
            <button
              key={label}
              type="button"
              onClick={() => dispatch(toggleConnectedPlatform(label))}
              className={`cursor-pointer w-full px-4 py-4 rounded-lg border transition-all flex items-center gap-3 text-left
                ${
                  isSelected
                    ? 'inputgradients border-none focus:outline-none'
                    : 'border-[#5E5D5D1F] hover:border-white/20 '
                }
              `}
            >
              <span
                className={`w-5 h-5 rounded-sm border flex items-center justify-center shrink-0
                  ${isSelected ? 'customizebutton border-[#F8F8F8]' : 'border-white/20 bg-transparent'}
                `}
              >
                {isSelected ? <CheckMark /> : null}
              </span>

              <span className="w-6 h-6 flex items-center justify-center shrink-0">
                <Icon />
              </span>

              <span className="text-white-200 text-start font-medium font-general">
                {label}
              </span>
            </button>
          );
        })}
      </div>

      <div className="flex flex-col items-center gap-3">
        <button
          type="button"
          disabled={connectedPlatforms.length === 0}
          onClick={() => dispatch(nextStep())}
          className={`flex font-general items-center cursor-pointer justify-center gap-2 w-[320px] px-4 py-3 text-sm font-medium text-white transition rounded-full shadow-theme-xs bg-green-100`}
        >
          Connect selected Platforms
          <span className="mt-1">
            <ArrowLeftIcon />
          </span>
        </button>

        <button
          type="button"
          onClick={() => dispatch(nextStep())}
          className="text-white/50 text-sm hover:text-white/80"
        >
          Skip for now
        </button>
      </div>
    </div>
  );
}
