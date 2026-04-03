// components/ui/Select.tsx
'use client';
import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { FieldError } from 'react-hook-form';

export type SelectOption = {
  label: string;
  value: string;
  icon?: React.ReactNode;
};

type SelectProps = {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  label?: string;
  error?: FieldError;
  className?: string;
  name?: string;
};

export function Select({
  options,
  value,
  onChange,
  onBlur,
  placeholder = 'Select an option',
  label,
  error,
  className = '',
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selected = options.find((o) => o.value === value);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setFocused(false);
        onBlur?.();
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [onBlur]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        setFocused(false);
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  const handleSelect = (option: SelectOption) => {
    onChange?.(option.value);
    setOpen(false);
    setFocused(false);
  };

  return (
    <div ref={ref} className="relative w-full flex flex-col gap-1.5">
      {label && (
        <label className="text-sm text-white/60 font-medium">{label}</label>
      )}

      {/* Trigger */}
      <div
        className={` ${focused ? 'gradient-border  ' : 'gradient-border '} h-full  relative rounded-lg p-[1px] transition-all duration-200 cursor-pointer"`}
        onClick={() => {
          setOpen((prev) => !prev);
          setFocused(true);
        }}
      >
        <div
          className={`flex items-center justify-between gap-2 rounded-xl px-4 ${className}`}
        >
          <div className="flex items-center gap-2 flex-1 min-w-0 py-3">
            {selected?.icon && (
              <span className="w-4 h-4 flex-shrink-0 text-white/50">
                {selected.icon}
              </span>
            )}
            <span
              className={` truncate font-general ${
                selected ? 'text-[#D9D9D9]' : 'text-[#595959]'
              }`}
            >
              {selected ? selected.label : placeholder}
            </span>
          </div>
          <ChevronDown
            size={16}
            className={`flex-shrink-0 text-white/30 transition-transform duration-200 ${
              open ? 'rotate-180' : ''
            }`}
          />
        </div>
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute top-full left-0 right-0 z-50 mt-2 rounded-xl border border-[#202124] bg-[#0f0f10] overflow-hidden shadow-xl">
          <ul className="py-1 max-h-[220px] overflow-y-auto no-scrollbar">
            {options.map((option) => {
              const isSelected = option.value === value;
              return (
                <li
                  key={option.value}
                  onClick={() => handleSelect(option)}
                  className="select-option group relative flex items-center justify-between gap-2 px-4 py-2.5 cursor-pointer transition-all duration-150"
                >
                  {/* Hover gradient bg */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-150 select-option-bg" />

                  <div className="relative flex items-center gap-2 z-10">
                    {option.icon && (
                      <span className="w-4 h-4 flex-shrink-0 text-white/40 group-hover:text-white/70 transition-colors">
                        {option.icon}
                      </span>
                    )}
                    <span
                      className={`text-sm font-general transition-colors ${
                        isSelected
                          ? 'text-[#3CF239]'
                          : 'text-white/60 group-hover:text-white'
                      }`}
                    >
                      {option.label}
                    </span>
                  </div>

                  {isSelected && (
                    <Check
                      size={14}
                      className="relative z-10 text-[#3CF239] flex-shrink-0"
                    />
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {error && <p className="text-red-400 text-xs mt-0.5">{error.message}</p>}
    </div>
  );
}
