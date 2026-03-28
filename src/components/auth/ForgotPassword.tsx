'use client';
import InputForm from '../form/InputForm';
import { useForgetPasswordMutation } from '@/store/auth/auth.api';
import { useForm } from 'react-hook-form';
import { ForgetPassordFormSchema } from '@/validation/schema';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import useToastify from '@/hooks/useToastify';
import Loader from '../ui/Loader';

type ForgotPasswordFormInputs = {
  email: string;
};

export default function ForgetPassword() {
  const [forgetUser, { isLoading }] = useForgetPasswordMutation();
  const { showToast } = useToastify();

  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors, touchedFields },
  } = useForm<ForgotPasswordFormInputs>({
    resolver: yupResolver(ForgetPassordFormSchema),
  });

  const emailValue = watch('email');
  const isEmailTouched = touchedFields.email;
  const isFormValid =
    typeof emailValue === 'string' && emailValue.trim().length > 0;

  const onSubmit = async (formData: ForgotPasswordFormInputs) => {
    try {
      const apiData = {
        email: formData.email,
      };

      const response = await forgetUser(apiData).unwrap();
      showToast(response.detail, 'success');
    } catch (error: any) {
      if (error?.data?.errors) {
        Object.entries(error.data.errors).forEach(([field, messages]) =>
          setError(field as 'email', {
            type: 'server',
            message: Array.isArray(messages) ? messages[0] : messages,
          })
        );
        const firstErrorMsg = Object.values(error.data.errors)[0];
        showToast(
          Array.isArray(firstErrorMsg) ? firstErrorMsg[0] : firstErrorMsg,
          'error'
        );
      } else {
        showToast('An unexpected error occurred.', 'error');
      }
    }
  };

  return (
    <div className="flex flex-col h-full  rounded-[20px] px-2  md:py-10 w-full overflow-y-hidden no-scrollbar">
      <div className="flex flex-col h-screen  justify-center items-center w-full max-w-md mx-auto">
        <div className="flex flex-col text-center gap-8 justify-center items-center">
          <div className="flex flex-col gap-4">
            <h1 className="text-white-200 text-[22px] font-general ">
              Forgotten Password ?
            </h1>
            <p className="text-lg text-white-100">
              No worries, we’ll send you reset instructions{' '}
            </p>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-md space-y-6"
          >
            <div className="grid grid-cols-1 gap-3">
              <div className="sm:col-span-1">
                <InputForm
                  name="email"
                  placeholder="Enter your email"
                  register={register}
                  error={errors.email}
                  type="email"
                  isTouched={!!isEmailTouched}
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className={`flex font-general items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-full shadow-theme-xs  disabled:opacity-50 disabled:cursor-not-allowed ${
                  isFormValid ? 'bg-green-100 ' : 'bg-[#202124]'
                }`}
                disabled={isLoading || !isFormValid}
              >
                {isLoading ? <Loader /> : 'Continue with email'}
              </button>
            </div>
            <div className="mt-4  flex gap-1 items-center justify-center">
              <h3 className="text-sm text-white-100 font-general text-center mt-2">
                Back to
                <Link href={'/signin'} className="underline">
                  {' '}
                  Sign in
                </Link>
              </h3>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
