'use client';
import { ToggleProps } from '@/components/types';

const Toggle: React.FC<ToggleProps> = ({
  checked,
  onChange,
  disabled,
  color = '#D9D9D966',
  bot = '#FFFFFF',
}) => {
  return (
    <button
      type="button"
      onClick={() => !disabled && onChange(!checked)}
      className={`
        relative inline-flex h-4 w-7 items-center rounded-full transition-colors duration-300
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      `}
      style={
        {
          background: checked
            ? 'linear-gradient(90deg,#0E9461 0%,#055A52 100%)'
            : color,
        } as React.CSSProperties
      }
    >
      <span
        className={`
          inline-block h-3 w-3 transform rounded-full transition-transform duration-300
          ${checked ? 'translate-x-3.5' : 'translate-x-[3px]'}
        `}
        style={
          {
            backgroundColor: checked ? 'white' : bot,
          } as React.CSSProperties
        }
      />
    </button>
  );
};

export default Toggle;
