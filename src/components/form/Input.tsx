// components/ui/Input.tsx
'use client';
import { forwardRef, useState } from 'react';
import { FieldError } from 'react-hook-form';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: FieldError;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      rightIcon,
      leftIcon,
      className = '',
      onFocus,
      onBlur,
      ...props
    },
    ref
  ) => {
    const [focused, setFocused] = useState(false);

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label className="text-sm text-white/60 font-medium">{label}</label>
        )}
        <div
          className={` ${focused ? 'bg-[#262626]  ' : 'bg-[#262626]'} h-full flex items-center   relative rounded-lg p-[1px] transition-all duration-200`}
        >
          {leftIcon && <span className="text-white/30 ml-4">{leftIcon}</span>}
          <input
            ref={ref}
            onFocus={(e) => {
              setFocused(true);
              onFocus?.(e);
            }}
            onBlur={(e) => {
              setFocused(false);
              onBlur?.(e);
            }}
            className={`${className} w-full  bg-transparent h-full focus:outline-none px-4 text-white-100 placeholder:text-[#737373]`}
            {...props}
          />
          {rightIcon && <span className="mr-4">{rightIcon}</span>}
        </div>

        {error && (
          <p className="text-red-400 text-xs mt-0.5">{error.message}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
