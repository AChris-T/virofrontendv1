'use client';
import Link from 'next/link';
import InputForm from '../form/InputForm';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RegisterFormSchema } from '@/validation/schema';
import { useRegisterMutation } from '@/store/auth/auth.api';
import useToastify from '@/hooks/useToastify';
import { useRouter } from 'next/navigation';
import Label from '../form/Label';
import PasswordInputForm from '../form/PasswordInputForm';
import Image from 'next/image';
import Loader from '../ui/Loader';
import { RegisterFormInputs } from '../types';

export default function SignUpForm() {
  const { showToast } = useToastify();
  const router = useRouter();
  const [registerUser, { isLoading }] = useRegisterMutation();
  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors, touchedFields },
  } = useForm<RegisterFormInputs>({
    resolver: yupResolver(RegisterFormSchema),
  });

  const firstNameValue = watch('first_name');
  const lastNameValue = watch('last_name');
  const emailValue = watch('email');
  const passwordValue = watch('password');
  const isFormValid = [
    firstNameValue,
    lastNameValue,
    emailValue,
    passwordValue,
  ].every((v) => typeof v === 'string' && v.trim().length > 0);

  const onSubmit = async (formData: RegisterFormInputs) => {
    try {
      const apiData = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        password: formData.password,
      };
      const response = await registerUser(apiData).unwrap();
      showToast(response.detail, 'success');
      const emailParam = encodeURIComponent(formData.email);
      const finalRedirectPath = `/email-verification?email=${emailParam}`;
      router.push(finalRedirectPath);
    } catch (error: any) {
      if (error?.data?.errors) {
        Object.entries(error.data.errors).forEach(([field, messages]) =>
          setError(field as 'first_name' | 'last_name' | 'email' | 'password', {
            type: 'server',
            message: Array.isArray(messages) ? messages[0] : messages,
          })
        );
      }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-full  px-2 md:px-8  w-full overflow-y-auto no-scrollbar">
      <div className="flex flex-col text-white  md:max-h-[90%] mt-20 pb-10 no-scrollbar overflow-y-auto  w-full md:max-w-[500px]">
        <div className="flex flex-col  items-center gap-8">
          <Image src={'/images/Logo.png'} alt="Viro" width={64} height={64} />
          <div className="flex flex-col gap-4">
            <h2 className="text-[32px] font-general font-normal text-center">
              Welcome to{' '}
              <span className="font-instrument-serif italic">Viro</span>
            </h2>
            <p className="text-lg font-general text-center text-white-100 ">
              Let us know more about you{' '}
            </p>
          </div>
          <hr className=" w-full border-black-200" />
          <form onSubmit={handleSubmit(onSubmit)} className="w-full  space-y-3">
            <Label className="font-general  text-white-100">
              Tell us your name{' '}
            </Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 space-y-3 ">
              {/* <!-- First Name --> */}
              <InputForm
                name="first_name"
                placeholder="First name"
                register={register}
                error={errors.first_name}
                type="text"
                isTouched={!!touchedFields.first_name}
              />
              <InputForm
                name="last_name"
                placeholder="Last name"
                register={register}
                error={errors.last_name}
                type="text"
                isTouched={!!touchedFields.last_name}
              />
            </div>

            {/* Email */}
            <Label className="font-general  text-white-100">
              What is your email?
            </Label>
            <InputForm
              name="email"
              placeholder="Enter your email"
              register={register}
              error={errors.email}
              type="text"
              isTouched={!!touchedFields.email}
            />
            {/* <!-- Password --> */}
            <Label className="font-general  text-white-100">
              Set your password{' '}
            </Label>
            <PasswordInputForm
              name="password"
              placeholder="Enter password"
              register={register}
              error={errors.password}
              isTouched={!!touchedFields.password}
            />

            {/* <!-- Button --> */}
            <div>
              <button
                type="submit"
                className={`flex mt-8 font-general items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-full shadow-theme-xs  disabled:opacity-50 disabled:cursor-not-allowed ${
                  isFormValid ? 'bg-green-100 ' : 'bg-[#202124]'
                }`}
                disabled={isLoading || !isFormValid}
              >
                {isLoading ? <Loader /> : 'Continue with email'}
              </button>
            </div>
          </form>

          <h3 className="text-[13px] font-general text-center mt-2">
            By continuing, you agree to our{' '}
            <span className="underline"> privacy policy</span>
          </h3>
          <h3 className="text-[13px] font-general text-center mt-2">
            No account yet?
            <Link href={'/signin'} className="underline">
              {' '}
              Sign In
            </Link>
          </h3>
        </div>
      </div>
    </div>
  );
}
