'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import useToastify from '@/hooks/useToastify';
import { ResetPasswordSchema } from '@/validation/schema';
import { useRouter } from 'next/navigation';
import { useResetPasswordMutation } from '@/store/auth/auth.api';
import PasswordInputForm from '../form/PasswordInputForm';
import Loader from '../ui/Loader';

interface ResetPasswordFormProps {
  token: string;
}
type FormInputs = {
  password: string;
  password_confirmation: string;
};

export default function ResetPassword({ token }: ResetPasswordFormProps) {
  const router = useRouter();

  const [resetUser, { isLoading }] = useResetPasswordMutation();

  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: yupResolver(ResetPasswordSchema),
  });

  const { showToast } = useToastify();

  const passwordValue = watch('password');
  const passwordConfirmationValue = watch('password_confirmation');
  const isFormValid = Boolean(passwordValue && passwordConfirmationValue);

  const onSubmit = async (formData: FormInputs) => {
    try {
      const apiData = {
        token: token,
        new_password: formData.password,
      };
      const response = await resetUser(apiData).unwrap();
      showToast(response.detail, 'success');
      router.push('/signin');
    } catch (error: any) {
      const message =
        error?.data?.error || error?.data?.message || error?.error || '';
      showToast(message || 'Network Error', 'error');

      // If backend returns field-level validation errors, map them onto react-hook-form.
      if (error?.data?.errors) {
        Object.entries(error.data.errors).forEach(([field, messages]) => {
          setError(field as 'password' | 'password_confirmation', {
            type: 'server',
            message: Array.isArray(messages) ? messages[0] : messages,
          });
        });
      }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-full  px-2 md:px-8  w-full overflow-y-auto no-scrollbar">
      <div className="flex flex-col md:max-w-[400px]  md:max-h-[90%] items-center  justify-center flex-1 w-full max-w-md mx-auto">
        <div className="w-full">
          <div className="gap-4 flex items-center justify-center flex-col">
            <h1 className="mb-2 font-general text-white-200 text-[22px] ">
              Reset Your Password{' '}
            </h1>
            <p className="text-lg text-white-100 ">Change password </p>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-2 w-full mx-auto mt-10"
          >
            <PasswordInputForm
              name="password"
              placeholder="New password"
              register={register}
              error={errors.password}
              // isTouched={passwordIsTouched}
            />
            <PasswordInputForm
              name="password_confirmation"
              placeholder="Confirm password"
              register={register}
              error={errors.password_confirmation}
              // isTouched={passwordIsTouched}
            />
            <div className="mt-5">
              <button
                type="submit"
                className={`flex font-general items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-full shadow-theme-xs  disabled:opacity-50 disabled:cursor-not-allowed ${
                  isFormValid ? 'bg-green-100 ' : 'bg-[#202124]'
                }`}
                disabled={isLoading || !isFormValid}
              >
                {isLoading ? <Loader /> : 'Reset Password'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
