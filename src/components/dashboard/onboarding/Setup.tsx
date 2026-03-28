'use client';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useOnboardingMutation } from '@/store/profile/profile.api';
import Stepper from './Stepper';
import Step1Role from './Step1';
import Step2UseCase from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Step5 from './Step5';

export default function Setup() {
  const step = useSelector((s: any) => s.onboarding?.step ?? 1);
  const role = useSelector((s: any) => s.onboarding?.role ?? null) as
    | string
    | null;
  const useCases = useSelector((s: any) => s.onboarding?.useCases ?? []) as
    | string[]
    | undefined;
  const calendarProvider = useSelector(
    (s: any) => s.onboarding?.calendarProvider ?? null
  ) as string | null;
  const connectedPlatforms = useSelector(
    (s: any) => s.onboarding?.connectedPlatforms ?? []
  ) as string[];

  const emailNotification = useSelector(
    (s: any) => s.onboarding?.emailNotification ?? null
  ) as string | null;
  const dailyBriefing = useSelector(
    (s: any) => s.onboarding?.dailyBriefing ?? null
  ) as string | null;

  const router = useRouter();
  const [submitOnboarding, { isLoading }] = useOnboardingMutation();

  const handleSubmit = async () => {
    const helpOptions = Array.from(
      new Set([
        ...(useCases ?? []),
        ...(calendarProvider ? [calendarProvider] : []),
        ...(connectedPlatforms ?? []),
      ])
    ).filter(Boolean);

    const payload = {
      personalized: role ?? '',
      help_options: helpOptions,
      notification_preferences: {
        additionalProp1: emailNotification,
        additionalProp2: dailyBriefing,
      },
    };

    try {
      await submitOnboarding(payload).unwrap();
      router.push('/onboarding/workspace');
    } catch (err) {
      console.error('Onboarding submission failed', err);
    }
  };

  return (
    <div>
      <Stepper step={step} />
      {step === 1 && <Step1Role />}
      {step === 2 && <Step2UseCase />}
      {step === 3 && <Step3 />}
      {step === 4 && <Step4 />}
      {step === 5 && (
        <Step5
          onSubmit={handleSubmit}
          onSkip={handleSubmit}
          isSubmitting={isLoading}
        />
      )}
    </div>
  );
}
