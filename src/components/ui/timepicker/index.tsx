'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { format } from 'date-fns';
import type { FieldError } from 'react-hook-form';

type TimePickerProps = {
  value?: string; // "HH:mm"
  onChange?: (value: string) => void;
  onBlur?: () => void;
  error?: FieldError;
  placeholder?: string;
  className?: string;
  name?: string;
  stepMinutes?: 5 | 10 | 15 | 30 | 60;
};

function parseTimeToDate(value: string | undefined) {
  if (!value) return undefined;
  const match = /^([01]\d|2[0-3]):([0-5]\d)$/.exec(value);
  if (!match) return undefined;
  const hours = Number(match[1]);
  const minutes = Number(match[2]);
  const d = new Date();
  d.setHours(hours, minutes, 0, 0);
  return d;
}

function buildTimeOptions(stepMinutes: number) {
  const out: string[] = [];
  for (let h = 0; h < 24; h += 1) {
    for (let m = 0; m < 60; m += stepMinutes) {
      out.push(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`);
    }
  }
  return out;
}

export function TimePicker({
  value,
  onChange,
  onBlur,
  error,
  placeholder = '09:30 AM',
  className = '',
  stepMinutes = 15,
}: TimePickerProps) {
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const options = useMemo(() => buildTimeOptions(stepMinutes), [stepMinutes]);
  const selectedDate = useMemo(() => parseTimeToDate(value), [value]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        onBlur?.();
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [onBlur]);

  return (
    <div ref={ref} className="relative w-full">
      <div
        className={` ${focused ? 'gradient-border  ' : 'gradient-border '} h-full  relative rounded-lg p-[1px] px-4 transition-all duration-200`}
        onClick={() => {
          setOpen((prev) => !prev);
          setFocused(true);
        }}
      >
        <input
          readOnly
          value={selectedDate ? format(selectedDate, 'hh:mm a') : ''}
          placeholder={placeholder}
          className={`w-full bg-transparent no-scrollbar   text-[#F8F8F8] placeholder:text-[#595959] outline-none cursor-pointer font-general ${className}`}
        />
      </div>

      {open && (
        <div className="absolute z-50 mt-2 w-full max-w-[120px] rounded-xl border border-[#202124] bg-[#0f0f10] p-2 shadow-xl">
          <div className="max-h-64 overflow-auto no-scrollbar ">
            {options.map((t) => {
              const isSelected = t === value;
              const d = parseTimeToDate(t);
              const label = d ? format(d, 'hh:mm a') : t;
              return (
                <button
                  key={t}
                  type="button"
                  className={[
                    'w-full rounded-lg px-3 py-2 no-scrollbar text-left font-general text-sm transition-colors',
                    isSelected
                      ? 'bg-[#202124] text-white'
                      : 'text-[#cfcfcf] hover:bg-[#161617] hover:text-white',
                  ].join(' ')}
                  onClick={() => {
                    onChange?.(t);
                    setOpen(false);
                  }}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {error && <p className="text-red-400 text-xs mt-1">{error.message}</p>}
    </div>
  );
}
