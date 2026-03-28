type Props = {
  step: number;
  total?: number;
};

export default function Stepper({ step, total = 5 }: Props) {
  return (
    <div className="w-full space-y-3 mb-6 md:px-10  max-w-[650px] mx-auto">
      <p className="text-lg text-[#fff] font-general font-light">
        Step {step}/{total}
      </p>

      <div className="flex gap-2">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className={`h-2 flex-1 rounded-full transition-all duration-300
              ${i < step ? 'bg-[#A9D80E]' : 'bg-[#202020]'}
            `}
          />
        ))}
      </div>
    </div>
  );
}
