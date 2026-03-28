'use client';

import { useDispatch, useSelector } from 'react-redux';
import { toggleUseCase, nextStep } from '@/store/onboarding/onboarding.slice';
import StepCard from './StepCard';
import { ArrowLeftIcon } from '@/assets/icons';

export default function Step2UseCase() {
  const dispatch = useDispatch();
  const selected = useSelector((s: any) => s.onboarding?.useCases ?? []);

  const options = [
    'Attends meetings when I can’t',
    'Takes notes and summarize meetings',
    'Schedule and manage my calendar',
    'Follow up with leads/candidates',
    'Research prospects before calls',
    'Manage my email inbox',
  ];

  return (
    <div className="space-y-6  max-w-[800px] mx-auto text-center ">
      <h2 className="text-2xl text-white">
        Select how you want <span className="italic">Viro</span> to help you
      </h2>

      <p className="text-white/50">(Select up to 3)</p>

      <div className="grid grid-cols-1 md:grid-cols-2 md:px-10 w-full gap-4 mt-12 bg-[#0E0E0E] p-5 rounded-[20px]">
        {options.map((opt) => (
          <StepCard
            key={opt}
            label={opt}
            selected={selected.includes(opt)}
            onClick={() => dispatch(toggleUseCase(opt))}
          />
        ))}
      </div>
      <div className="flex justify-center items-center">
        <button
          disabled={selected.length === 0}
          onClick={() => dispatch(nextStep())}
          className={`flex font-general items-center cursor-pointer justify-center gap-2 w-[280px] px-4 py-3 text-sm font-medium text-white transition rounded-full shadow-theme-xs   bg-green-100 }`}
        >
          Next{' '}
          <span className="mt-1">
            <ArrowLeftIcon />
          </span>
        </button>
      </div>
    </div>
  );
}
