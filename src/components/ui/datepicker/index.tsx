// components/ui/DatePicker.tsx
'use client';
import { useEffect, useRef, useState, type ButtonHTMLAttributes } from 'react';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import { FieldError } from 'react-hook-form';
import 'react-day-picker/dist/style.css';
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
} from 'lucide-react';

function CustomChevron({
  orientation,
  className,
  size = 16,
  disabled,
}: {
  orientation?: 'up' | 'down' | 'left' | 'right';
  className?: string;
  size?: number;
  disabled?: boolean;
}) {
  const iconClassName =
    `${className ?? ''} ${disabled ? 'opacity-50' : ''}`.trim();

  if (orientation === 'left')
    return (
      <ChevronLeft size={size} className={iconClassName} aria-hidden="true" />
    );
  if (orientation === 'right')
    return (
      <ChevronRight size={size} className={iconClassName} aria-hidden="true" />
    );
  if (orientation === 'up')
    return (
      <ChevronUp size={size} className={iconClassName} aria-hidden="true" />
    );
  return (
    <ChevronDown size={size} className={iconClassName} aria-hidden="true" />
  );
}

function PreviousMonthButton({
  className,
  disabled,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      type={props.type ?? 'button'}
      disabled={disabled}
      className={[
        'flex items-center justify-center rounded-md p-1 transition-colors',
        'bg-[#202124] hover:bg-[#2a2b2d]',
        disabled ? 'opacity-50 cursor-not-allowed' : 'text-white',
        className ?? '',
      ].join(' ')}
    >
      <ChevronLeft size={16} className="text-white" aria-hidden="true" />
    </button>
  );
}

function NextMonthButton({
  className,
  disabled,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      type={props.type ?? 'button'}
      disabled={disabled}
      className={[
        'flex items-center justify-center rounded-md p-1 transition-colors',
        'bg-[#202124] hover:bg-[#2a2b2d]',
        disabled ? 'opacity-50 cursor-not-allowed' : 'text-white',
        className ?? '',
      ].join(' ')}
    >
      <ChevronRight size={16} className="text-white" aria-hidden="true" />
    </button>
  );
}

type DatePickerProps = {
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  error?: FieldError;
  placeholder?: string;
  className?: string;
  name?: string;
};

export function DatePicker({
  value,
  onChange,
  onBlur,
  error,
  placeholder = 'Thursday, September 18, 2025',
  className = '',
}: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Date | undefined>(
    value ? new Date(value) : undefined
  );
  const ref = useRef<HTMLDivElement>(null);
  const [focused, setFocused] = useState(false);

  // Close on outside click
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

  const handleSelect = (date: Date | undefined) => {
    setSelected(date);
    if (date) {
      onChange?.(date.toISOString());
      setOpen(false);
    }
  };

  return (
    <div ref={ref} className="relative w-full">
      {/* Border wrapper */}
      <div
        className={` ${focused ? 'gradient-border  ' : 'gradient-border '} h-full  relative rounded-lg p-[1px] px-4 transition-all duration-200`}
        onClick={() => {
          setOpen((prev) => !prev);
          setFocused(true);
        }}
      >
        <input
          readOnly
          value={selected ? format(selected, 'EEEE, MMMM d, yyyy') : ''}
          placeholder={placeholder}
          className={`w-full bg-transparent  text-[#F8F8F8] placeholder:text-[#595959] outline-none cursor-pointer font-general ${className}`}
        />
      </div>

      {/* Calendar dropdown */}
      {open && (
        <div className="absolute z-50 mt-2 rounded-xl border border-[#202124] bg-[#0f0f10] p-3 shadow-xl">
          <DayPicker
            mode="single"
            selected={selected}
            onSelect={handleSelect}
            showOutsideDays
            className="text-white font-general"
            classNames={{
              day_button: 'h-9 w-9 rounded-md  transition-colors',
            }}
            modifiersClassNames={{
              today: 'text-green-400',
              selected: 'border-green-400 text-white',
            }}
            components={{
              Chevron: CustomChevron,
              PreviousMonthButton,
              NextMonthButton,
            }}
          />
        </div>
      )}

      {error && <p className="text-red-400 text-xs mt-1">{error.message}</p>}
    </div>
  );
}
