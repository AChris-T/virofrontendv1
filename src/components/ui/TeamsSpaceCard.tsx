import { CheckMark } from '@/assets/icons';

export function TeamSpaceCard({
  label,
  selected,
  onToggle,
}: {
  label: string;
  selected: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`cursor-pointer w-full px-4 py-4 rounded-lg border transition-all flex items-center gap-3 text-left
        ${
          selected
            ? 'inputgradients border-none focus:outline-none'
            : 'border-[#5E5D5D1F] hover:border-white/20 bg-transparent'
        }
      `}
    >
      <span
        className={`w-5 h-5 rounded-sm border flex items-center justify-center shrink-0
          ${selected ? 'customizebutton border-[#F8F8F8]' : 'border-white/20 bg-transparent'}
        `}
      >
        {selected ? <CheckMark /> : null}
      </span>

      <span className="text-white-200 text-start font-medium font-general">
        {label}
      </span>
    </button>
  );
}
