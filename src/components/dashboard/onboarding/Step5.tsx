'use client';
import { useDispatch, useSelector } from 'react-redux';
import StepCard from './StepCard';
import {
  setDailyBriefing,
  setEmailNotification,
} from '@/store/onboarding/onboarding.slice';
import { ArrowLeftIcon } from '@/assets/icons';

type Props = {
  onSubmit: () => Promise<void> | void;
  onSkip: () => Promise<void> | void;
  isSubmitting?: boolean;
};

export default function Step5({
  onSubmit,
  onSkip,
  isSubmitting = false,
}: Props) {
  const dispatch = useDispatch();

  const emailNotification = useSelector(
    (s: any) => s.onboarding?.emailNotification ?? null
  );
  const dailyBriefing = useSelector(
    (s: any) => s.onboarding?.dailyBriefing ?? null
  );

  const emailOptions = [
    'All updates',
    'Daily digest',
    'Important only (Recommended)',
  ];

  const briefingOptions = [
    'Morning brief (8:00 AM)',
    'End-of-day summary (6:00 PM)',
  ];

  const canContinue = Boolean(emailNotification && dailyBriefing);

  return (
    <div className="space-y-6 max-w-[650px] mx-auto text-center">
      <h2 className="text-[28px] text-center text-white font-general">
        One Last Thing, How do I reach you?
      </h2>

      <div className="grid grid-cols-1  gap-4">
        <div className="bg-[#0E0E0E] p-5 rounded-[20px] text-left">
          <p className="text-white font-general text-lg mb-4">
            Email notifications
          </p>
          <div className="space-y-3 grid grid-cols-1 md:grid-cols-2 gap-3">
            {emailOptions.map((opt) => (
              <StepCard
                key={opt}
                label={opt}
                selected={emailNotification === opt}
                onClick={() => dispatch(setEmailNotification(opt))}
              />
            ))}
          </div>
        </div>

        <div className="bg-[#0E0E0E] p-5 rounded-[20px] text-left">
          <p className="text-white font-general text-lg mb-4">
            Daily briefings
          </p>
          <div className=" grid grid-cols-1 md:grid-cols-2 gap-3">
            {briefingOptions.map((opt) => (
              <StepCard
                key={opt}
                label={opt}
                selected={dailyBriefing === opt}
                onClick={() => dispatch(setDailyBriefing(opt))}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-3">
        <button
          type="button"
          disabled={!canContinue || isSubmitting}
          onClick={onSubmit}
          className={`flex font-general items-center cursor-pointer justify-center gap-2 w-[280px] px-4 py-3 text-sm font-medium text-white transition rounded-full shadow-theme-xs bg-green-100`}
        >
          Continue{' '}
          <span className="mt-1">
            <ArrowLeftIcon />
          </span>
        </button>

        <button
          type="button"
          disabled={isSubmitting}
          onClick={onSkip}
          className="text-white/50 text-sm hover:text-white/80 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Skip for now
        </button>
      </div>
    </div>
  );
}
