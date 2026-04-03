'use client';
import Link from 'next/link';
import InputForm from '../form/InputForm';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { SignInFormSchema } from '@/validation/schema';
import { useLoginMutation } from '@/store/auth/auth.api';
import useToastify from '@/hooks/useToastify';
import { useRouter } from 'next/navigation';
import GoogleAuth from '../auth/socialauth/GoogleAuth';
import MicrosoftAuth from '../auth/socialauth/MicrosoftAuth';
import PasswordInputForm from '../form/PasswordInputForm';
import { Suspense } from 'react';
import Loading from '../common/Loading';
import Image from 'next/image';
import Loader from '../ui/Loader';
import { SigninFormInputs } from '../types';

export default function SignInForm() {
  const { showToast } = useToastify();
  const router = useRouter();
  const [UserSignIn, { isLoading }] = useLoginMutation();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, touchedFields },
  } = useForm<SigninFormInputs>({
    resolver: yupResolver(SignInFormSchema),
  });
  const isEmailTouched = touchedFields.email;
  const passwordIsTouched = touchedFields.password;
  const emailValue = watch('email');
  const passwordValue = watch('password');
  const isFormValid = emailValue && passwordValue;

  const onSubmit = async (formData: SigninFormInputs) => {
    try {
      const apiData = {
        email: formData.email,
        password: formData.password,
      };
      const response = await UserSignIn(apiData).unwrap();
      showToast(response.detail, 'success');
      const emailParam = encodeURIComponent(formData.email);
      const finalRedirectPath = `/email-verification?email=${emailParam}`;
      router.push(finalRedirectPath);
    } catch (error: any) {
      const message = error?.data?.detail || error?.detail || '';
      showToast(message || 'Network Error', 'error');
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-full  px-2 md:px-8  w-full overflow-y-auto no-scrollbar">
      <div className="flex flex-col text-white  md:max-h-[90%] max-h-full mt-20 pb-10 no-scrollbar overflow-y-auto  w-full md:max-w-2xs">
        <div className="flex flex-col  items-center gap-8">
          <Image src={'/images/Logo.png'} alt="Viro" width={64} height={64} />
          <div className="flex flex-col gap-4">
            <h2 className="text-[32px] font-general font-normal text-center">
              Welcome to{' '}
              <span className="font-instrument-serif italic">Viro</span>
            </h2>
            <p className="text-lg font-general text-center text-white-100 ">
              Please sign in to your account
            </p>
          </div>
          <div className="w-full flex flex-col gap-[10px] max-w-[400px]">
            <Suspense fallback={<Loading />}>
              <GoogleAuth authType="signin" />
            </Suspense>
            <Suspense fallback={<Loading />}>
              <MicrosoftAuth authType="signin" />
            </Suspense>
          </div>
          <hr className=" w-full border-black-200" />
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-md space-y-6"
          >
            <div className="grid grid-cols-1 gap-3 ">
              <div className="sm:col-span-1">
                <InputForm
                  name="email"
                  placeholder="Enter your email "
                  register={register}
                  error={errors.email}
                  type="text"
                  isTouched={isEmailTouched}
                  onKeyDown={undefined}
                />
              </div>
              <div>
                <PasswordInputForm
                  name="password"
                  placeholder="Enter password"
                  register={register}
                  error={errors.password}
                  isTouched={passwordIsTouched}
                />
              </div>
              <div className="flex items-center mt-2 justify-end">
                {/* 
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={() => setRemember(!remember)}
                    className="hidden peer"
                  />

                  <div
                    className="w-5 h-5 rounded border border-[#333333] bg-[#202124]
                  peer-checked:bg-white flex items-center justify-center"
                  >
                    {remember && (
                      <svg className="w-5 h-5 text-black" viewBox="0 0 24 24">
                        <path
                          d="M5 13l4 4L19 7"
                          stroke="currentColor"
                          strokeWidth="3"
                          fill="none"
                        />
                      </svg>
                    )}
                  </div>

                  <span className="text-white-200 font-general text-sm">
                    Remember me
                  </span>
                </label>{' '} */}
                <Link
                  href={'/forget-password'}
                  className="text-[#D0F457] text-sm underline"
                >
                  Forget Password?
                </Link>
              </div>
              <div className="mt-5">
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
            </div>
          </form>
          <h3 className="text-[13px] font-general text-center mt-2">
            By continuing, you agree to our{' '}
            <span className="underline"> privacy policy</span>
          </h3>
          <h3 className="text-[13px] font-general text-center mt-2">
            No account yet?
            <Link href={'/signup'} className="underline">
              {' '}
              Sign Up
            </Link>
          </h3>
        </div>
      </div>
    </div>
  );
}
