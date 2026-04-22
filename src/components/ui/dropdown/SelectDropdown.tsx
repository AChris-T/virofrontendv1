'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';

type SelectOption<T extends string> = {
  label: string;
  value: T;
};

type SelectDropdownProps<T extends string> = {
  name?: string;
  ariaLabel: string;
  value: T;
  options: SelectOption<T>[];
  onChange: (value: T) => void;
  className?: string;
  triggerClassName?: string;
  menuClassName?: string;
};

export default function SelectDropdown<T extends string>({
  name,
  ariaLabel,
  value,
  options,
  onChange,
  className,
  triggerClassName,
  menuClassName,
}: SelectDropdownProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const selected = useMemo(
    () => options.find((option) => option.value === value),
    [options, value]
  );

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  return (
    <div ref={wrapperRef} className={`relative ${className ?? ''}`}>
      <button
        type="button"
        name={name}
        aria-label={ariaLabel}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`inline-flex h-9 items-center gap-2 rounded-[6px] bg-[#262626] px-3 text-sm text-white/90 ${triggerClassName ?? ''}`}
      >
        <span>{selected?.label ?? ''}</span>
        <ChevronDown
          className={`h-4 w-4 text-white/50 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div
          role="listbox"
          className={`absolute -right-10  z-50 mt-3  min-w-[140px] overflow-hidden rounded-[6px]  bg-[#0F0F0F] shadow-xl ${menuClassName ?? ''}`}
        >
          {options.map((option) => {
            const isSelected = option.value === value;

            return (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`block w-full  px-3 font-general py-3 text-left text-sm leading-none rounded-[6px] last:border-b-0 hover:border-[#737373] hover:border ${
                  isSelected ? ' text-white' : 'text-white/90'
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
