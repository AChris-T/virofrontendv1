type Props = {
  label: string;
  selected: boolean;
  onClick: () => void;
};

export default function StepCard({ label, selected, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer w-full px-4 py-6 rounded-lg border transition-all
        ${selected ? 'inputgradients border-none p-0 focus:outline-none' : 'border-[#5E5D5D1F] hover:border-white/20'}
      `}
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-5 h-5 border-1 rounded-full flex items-center justify-center
            ${selected ? 'bg-[#0E9461] ' : 'border-[#333333] bg-[#202124]'}
          `}
        >
          {selected && <div className="w-2 h-2 bg-[#F8F8F8] rounded-sm" />}
        </div>

        <span className="text-white-200 text-start font-medium font-general">
          {label}
        </span>
      </div>
    </div>
  );
}
