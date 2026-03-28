import React from 'react';
import {
  FieldError,
  UseFormRegister,
  FieldErrorsImpl,
  Merge,
  RegisterOptions,
} from 'react-hook-form';

interface InputFormProps {
  label?: string;
  name: string;
  type?: string;
  placeholder?: string;
  register: UseFormRegister<any>;
  registerOptions?: RegisterOptions;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
  disabled?: boolean;
  isTouched?: boolean;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  onPaste?: React.ClipboardEventHandler<HTMLInputElement>;
  wrapperClassName?: string;
  inputClassName?: string;
  maxLength?: number;
}

const InputForm: React.FC<InputFormProps> = ({
  label,
  name,
  type,
  register,
  registerOptions,
  error,
  placeholder,
  isTouched,
  wrapperClassName,
  inputClassName,
  maxLength,
  onKeyDown,
  onPaste,
}) => {
  const showInitialRedBackground = !isTouched && !error;
  return (
    <div className={`flex flex-col gap-1 ${wrapperClassName ?? ''}`}>
      {label && <label className="text-xs font-medium">{label}</label>}

      <div
        className={`relative p-3 rounded-lg ${
          error
            ? 'border border-red-500'
            : showInitialRedBackground
              ? 'inputgradient'
              : 'gradient-inputbox'
        }`}
      >
        <input
          type={type}
          {...register(name, registerOptions)}
          placeholder={placeholder}
          maxLength={maxLength}
          onKeyDown={onKeyDown}
          onPaste={onPaste}
          className={`w-full font-inter text-sm h-[20px]  rounded-md bg-transparent ${
            isTouched
              ? 'text-white-100 focus:outline-none'
              : 'text-white-200 focus:outline-none '
          } focus:outline-none ${inputClassName ?? ''}`}
        />
      </div>

      {typeof error?.message === 'string' && (
        <p className="text-red-500 text-xs mt-1">{error.message}</p>
      )}
    </div>
  );
};

export default InputForm;
