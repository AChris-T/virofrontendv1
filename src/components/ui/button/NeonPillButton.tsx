import React, { ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';

export interface NeonPillOption {
  label: string;
  value: string;
  disabled?: boolean;
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

const DefaultLeadingIcon = () => {
  return (
    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-[#3A3F47] bg-[#161A20]">
      <svg
        width="10"
        height="10"
        viewBox="0 0 10 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="5" cy="5" r="4.25" stroke="#707884" strokeWidth="1.5" />
        <path
          d="M7.45 2.55L2.55 7.45"
          stroke="#9CA3AF"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
};

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
  label = 'Co-Pilot',
  leadingIcon,
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
          'inline-flex rounded-full gradient-border  p-[1px] transition-transform duration-200 hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60',
          className
        )}
        onClick={handleMainClick}
        aria-expanded={isDropdown ? isOpen : undefined}
        aria-haspopup={isDropdown ? 'menu' : undefined}
        {...props}
      >
        <span
          className={twMerge(
            'inline-flex items-center gap-2 rounded-full  px-3.5 py-2 text-sm font-medium font-general text-[#E6E9EE]',
            innerClassName
          )}
        >
          {leadingIcon ?? <DefaultLeadingIcon />}
          <span>{activeLabel}</span>
          {trailingIcon ?? <DefaultTrailingIcon />}
        </span>
      </button>

      {isDropdown && isOpen && (
        <div
          role="menu"
          className={twMerge(
            'absolute left-0 z-40 mt-2 min-w-full rounded-xl border border-[#2A2F37] bg-[#0E1218] p-1 ',
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
                  'flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm font-general transition-colors',
                  isActive
                    ? 'bg-[#1B212A] text-[#E6E9EE]'
                    : 'text-[#B5BDC8] hover:bg-[#161B23] hover:text-[#E6E9EE]',
                  option.disabled ? 'cursor-not-allowed opacity-50' : ''
                )}
              >
                <span>{option.label}</span>
                {isActive && (
                  <span className="h-1.5 w-1.5 rounded-full bg-[#9CDD1A]" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
