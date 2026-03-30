'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import useToastify from '@/hooks/useToastify';
import {
  useResendCodeMutation,
  useVerifyEmailMutation,
} from '@/store/auth/auth.api';
import Image from 'next/image';
import { maskEmail } from '@/utils/helper';
import { useForm } from 'react-hook-form';
import InputForm from '../form/InputForm';
import Loader from '../ui/Loader';
import { VerificationFormInputs } from '../types';
import { setSessionCookie } from '@/lib/session';

export default function VerificationEmail({ email }: any) {
  const router = useRouter();
  const { showToast } = useToastify();
  const [verifyEmail, { isLoading }] = useVerifyEmailMutation();
  const [resendCode, { isLoading: isResending }] = useResendCodeMutation();
  const ignoreNextChangeRef = React.useRef(false);
  const RESEND_COOLDOWN_SECONDS = 60;
  const [resendCooldown, setResendCooldown] = React.useState(0);
  const {
    register,
    handleSubmit,
    watch,
    setFocus,
    setValue,
    formState: { errors, touchedFields },
  } = useForm<VerificationFormInputs>({
    defaultValues: {
      d1: '',
      d2: '',
      d3: '',
      d4: '',
      d5: '',
      d6: '',
    },
  });

  const values = watch();
  const digits = [
    values.d1 || '',
    values.d2 || '',
    values.d3 || '',
    values.d4 || '',
    values.d5 || '',
    values.d6 || '',
  ];
  const isFormValid = digits.every((d) => d && d.length === 1);
  const handleDigitChange = (index: number, value: string) => {
    const lastChar = value.slice(-1);
    const fieldName = `d${index + 1}` as keyof VerificationFormInputs;
    if (lastChar === '') {
      setValue(fieldName, '', { shouldDirty: true, shouldTouch: true });
      return;
    }
    if (!/^[A-Za-z0-9_-]$/.test(lastChar)) return;
    setValue(fieldName, lastChar, { shouldDirty: true, shouldTouch: true });
    if (index < 5) {
      const nextFieldName = `d${index + 2}` as keyof VerificationFormInputs;
      setFocus(nextFieldName);
    }
  };

  const handlePaste = (
    index: number,
    e: React.ClipboardEvent<HTMLInputElement>
  ) => {
    ignoreNextChangeRef.current = true;
    e.preventDefault();

    const clipboardText = e.clipboardData?.getData('text') ?? '';
    const fullCodeMatch = clipboardText.match(
      /(?:^|[^A-Za-z0-9_-])([A-Za-z0-9_-]{6})(?:[^A-Za-z0-9_-]|$)/
    );

    const extractedCode = fullCodeMatch?.[1] ?? null;
    if (!extractedCode) {
      const allowedChars = clipboardText.replace(/[^A-Za-z0-9_-]/g, '');
      if (!allowedChars) {
        for (let j = 0; j < 6; j++) {
          const fieldName = `d${j + 1}` as keyof VerificationFormInputs;
          setValue(fieldName, '', { shouldDirty: true, shouldTouch: true });
        }
        const currentFieldName =
          `d${index + 1}` as keyof VerificationFormInputs;
        setFocus(currentFieldName);
        ignoreNextChangeRef.current = false;
        return;
      }

      const toApplyChars = allowedChars.slice(0, 6);
      const startAt = allowedChars.length >= 6 ? 0 : index;
      const effectiveChars = toApplyChars.slice(0, 6 - startAt);

      effectiveChars.split('').forEach((ch, i) => {
        const fieldName = `d${startAt + i + 1}` as keyof VerificationFormInputs;
        setValue(fieldName, ch, { shouldDirty: true, shouldTouch: true });
      });

      if (allowedChars.length < 6) {
        for (let j = startAt + effectiveChars.length; j < 6; j++) {
          const fieldName = `d${j + 1}` as keyof VerificationFormInputs;
          setValue(fieldName, '', { shouldDirty: true, shouldTouch: true });
        }
      }

      const lastIndex = startAt + effectiveChars.length - 1;
      const nextIndex = Math.min(lastIndex + 1, 5);
      const nextFieldName = `d${nextIndex + 1}` as keyof VerificationFormInputs;
      setFocus(nextFieldName);

      window.setTimeout(() => {
        ignoreNextChangeRef.current = false;
      }, 50);
      return;
    }
    const startAt = 0;
    extractedCode.split('').forEach((ch, i) => {
      const fieldName = `d${startAt + i + 1}` as keyof VerificationFormInputs;
      setValue(fieldName, ch, { shouldDirty: true, shouldTouch: true });
    });
    setFocus('d6' as keyof VerificationFormInputs);
    window.setTimeout(() => {
      ignoreNextChangeRef.current = false;
    }, 50);
  };
  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      const prevFieldName = `d${index}` as keyof VerificationFormInputs;
      setFocus(prevFieldName);
    }
  };
  const onSubmit = async (formData: VerificationFormInputs) => {
    const codeString = `${formData.d1}${formData.d2}${formData.d3}${formData.d4}${formData.d5}${formData.d6}`;
    try {
      const response: any = await verifyEmail({
        email,
        code: codeString,
      }).unwrap();

      const onboarded = !!(
        response?.user?.onboarded ?? response?.user?.isOnboarded
      );

      if (response?.access_token) {
        await setSessionCookie({
          token: response.access_token,
          refresh_token: response.refresh_token,
          role: 'user',
          onboarded,
        });
      }
      showToast(response.detail || 'Email verified successfully!', 'success');
      router.replace(onboarded ? '/dashboard' : '/onboarding');
    } catch (error: any) {
      const message = error?.data?.error || 'Verification failed';
      showToast(message, 'error');
    }
  };

  React.useEffect(() => {
    if (resendCooldown <= 0) return;

    const intervalId = window.setInterval(() => {
      setResendCooldown((prev) => Math.max(prev - 1, 0));
    }, 1000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [resendCooldown]);

  const handleResendCode = async () => {
    if (isResending || resendCooldown > 0) return;

    try {
      const response: any = await resendCode({ email }).unwrap();
      showToast(
        response?.detail || 'Verification code resent successfully!',
        'success'
      );
      setResendCooldown(RESEND_COOLDOWN_SECONDS);
    } catch (error: any) {
      const message = error?.data?.error || 'Failed to resend code';
      showToast(message, 'error');
    }
  };

  return (
    <div className="flex text-white h-full flex-col justify-center items-center md:max-w-[580px] mx-auto px-2 md:px-8 w-full overflow-y-auto no-scrollbar">
      <div className="flex flex-col justify-center items-center gap-8 w-full">
        <Image src={'/images/Logo.png'} alt="Viro" width={64} height={64} />
        <div className="flex flex-col text-center items-center justify-center gap-4">
          <h3 className="text-[32px] font-general text-white-200">
            Enter Verification Code
          </h3>
          <p className="font-general text-lg">
            Please provide the 6-digit code sent to the email address{' '}
            {maskEmail(email)}
          </p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-md space-y-8"
        >
          <div className="flex justify-center gap-3 md:gap-4">
            {['d1', 'd2', 'd3', 'd4', 'd5', 'd6'].map((name, index) => {
              const fieldName = name as keyof VerificationFormInputs;
              const isTouched = touchedFields[fieldName];

              return (
                <InputForm
                  key={name}
                  name={name}
                  type="text"
                  register={register}
                  registerOptions={{
                    onChange: (e) => {
                      if (ignoreNextChangeRef.current) return;
                      handleDigitChange(index, e.target.value);
                    },
                  }}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={(e) => handlePaste(index, e)}
                  maxLength={1}
                  placeholder="-"
                  error={errors[fieldName]}
                  isTouched={!!isTouched}
                  wrapperClassName="w-12 h-12 md:w-14 md:h-14"
                  inputClassName="text-center text-sm font-inter"
                />
              );
            })}
          </div>
          <button
            type="submit"
            className={`flex font-general items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-full shadow-theme-xs  disabled:opacity-50 disabled:cursor-not-allowed ${
              isFormValid ? 'bg-green-100 ' : 'bg-[#202124]'
            }`}
            disabled={isLoading || !isFormValid}
          >
            {isLoading ? <Loader /> : 'Verify email'}
          </button>
          <h3 className="text-center font-medium text-inter">
            Didn’t receive code?{' '}
            <button
              type="button"
              className="text-[#D0F457] text-sm underline disabled:cursor-not-allowed disabled:opacity-60"
              onClick={handleResendCode}
              disabled={isResending || resendCooldown > 0}
            >
              {resendCooldown > 0
                ? `Resend in ${resendCooldown}s`
                : isResending
                  ? 'Resending...'
                  : 'Resend Code'}
            </button>
          </h3>
        </form>
      </div>
    </div>
  );
}
