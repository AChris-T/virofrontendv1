import React, { ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';

export interface NeonPillOption {
  label: string;
  value: string;
  disabled?: boolean;
  icon?: ReactNode;
}

interface NeonPillButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  innerClassName?: string;
  options?: NeonPillOption[];
  defaultSelectedValue?: string;
  selectedValue?: string;
  onSelectOption?: (option: NeonPillOption) => void;
  dropdownClassName?: string;
}

const DefaultTrailingIcon = () => {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M3 4.5L6 7.5L9 4.5"
        stroke="#B5BDC8"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default function NeonPillButton({
  label = 'bot_mode',
  trailingIcon,
  className,
  innerClassName,
  options = [],
  defaultSelectedValue,
  selectedValue,
  onSelectOption,
  dropdownClassName,
  onClick,
  type = 'button',
  ...props
}: NeonPillButtonProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const isDropdown = options.length > 0;
  const [isOpen, setIsOpen] = useState(false);
  const [internalSelectedValue, setInternalSelectedValue] = useState(
    defaultSelectedValue ?? options[0]?.value
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const activeValue = selectedValue ?? internalSelectedValue;

  const activeLabel = useMemo(() => {
    if (!isDropdown) {
      return label;
    }

    const activeOption = options.find((option) => option.value === activeValue);
    return activeOption?.label ?? options[0]?.label ?? label;
  }, [activeValue, isDropdown, label, options]);

  const handleMainClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (isDropdown) {
      setIsOpen((prev) => !prev);
      return;
    }

    onClick?.(event);
  };

  const handleSelect = (option: NeonPillOption) => {
    if (option.disabled) {
      return;
    }

    if (selectedValue === undefined) {
      setInternalSelectedValue(option.value);
    }

    onSelectOption?.(option);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block" ref={wrapperRef}>
      <button
        type={type}
        className={twMerge(
          'inline-flex rounded-lg border-[#333] border bg-[#262626]  p-[1px] transition-transform duration-200 hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60',
          className
        )}
        onClick={handleMainClick}
        aria-expanded={isDropdown ? isOpen : undefined}
        aria-haspopup={isDropdown ? 'menu' : undefined}
        {...props}
      >
        <span
          className={twMerge(
            'inline-flex items-center gap-2 rounded-full  px-3.5 py-2 text-sm font-medium font-general text-[#FDFDFD]',
            innerClassName
          )}
        >
          <span>{activeLabel}</span>
          {trailingIcon ?? <DefaultTrailingIcon />}
        </span>
      </button>

      {isDropdown && isOpen && (
        <div
          role="menu"
          className={twMerge(
            'absolute left-0 z-40 mt-2 min-w-[180px] overflow-hidden rounded-[18px] border border-[#2A2F37] bg-[#111111] p-1 shadow-[0_16px_40px_rgba(0,0,0,0.45)]',
            dropdownClassName
          )}
        >
          {options.map((option) => {
            const isActive = option.value === activeValue;

            return (
              <button
                key={option.value}
                type="button"
                role="menuitem"
                disabled={option.disabled}
                onClick={() => handleSelect(option)}
                className={twMerge(
                  'flex w-full items-center justify-between rounded-full px-3 py-2.5 text-left font-general transition-colors',
                  isActive
                    ? 'bg-[#1A1A1A] text-[#F1F5F9]'
                    : 'text-[#D0D5DD] hover:bg-[#171717] hover:text-[#F1F5F9]',
                  option.disabled ? 'cursor-not-allowed opacity-50' : ''
                )}
              >
                <span className="flex min-w-0 items-center gap-2.5">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full border border-[#343434] bg-[#1D1D1D] text-[#AEB4BF]">
                    {option.icon ?? (
                      <span className="h-2 w-2 rounded-full bg-[#7E8794]" />
                    )}
                  </span>
                  <span className="truncate text-sm">{option.label}</span>
                </span>

                <span
                  className={twMerge(
                    'ml-3 flex h-4 w-4 items-center justify-center rounded-full border transition-colors',
                    isActive
                      ? 'border-[#9CDD1A] bg-[#1C2413]'
                      : 'border-[#303030]'
                  )}
                  aria-hidden="true"
                >
                  <span
                    className={twMerge(
                      'h-2.5 w-2.5 rounded-full transition-colors',
                      isActive ? 'bg-[#9CDD1A]' : 'bg-[#3A3A3A]'
                    )}
                  />
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
