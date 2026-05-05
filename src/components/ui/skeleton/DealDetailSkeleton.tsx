function FieldRow({
  labelWidth,
  valueWidth,
}: {
  labelWidth: string;
  valueWidth: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="h-3.5 w-3.5 rounded-[3px] bg-[#262626] animate-pulse" />
        <div
          className={`h-3 ${labelWidth} rounded bg-[#262626] animate-pulse`}
        />
      </div>
      <div
        className={`h-5 ${valueWidth} rounded-md bg-[#262626] animate-pulse`}
      />
    </div>
  );
}

export function DealDetailsSkeleton() {
  return (
    <div>
      <div className="w-full border rounded-lg border-[#333] p-2">
        {/* Deal name */}
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 rounded bg-[#262626] animate-pulse" />
          <div className="h-6 w-40 rounded-md bg-[#262626] animate-pulse" />
        </div>

        {/* Field rows */}
        <div className="mt-6 flex flex-col gap-2.5">
          <FieldRow labelWidth="w-16" valueWidth="w-24" />
          <FieldRow labelWidth="w-12" valueWidth="w-20" />
          <FieldRow labelWidth="w-24" valueWidth="w-20" />
          <FieldRow labelWidth="w-10" valueWidth="w-16" />
          <FieldRow labelWidth="w-16" valueWidth="w-14" />
          <FieldRow labelWidth="w-20" valueWidth="w-20" />
          <FieldRow labelWidth="w-18" valueWidth="w-24" />
          <FieldRow labelWidth="w-20" valueWidth="w-28" />
        </div>
      </div>

      <DealTabsSkeleton />
    </div>
  );
}
export function DealTabsSkeleton() {
  return (
    <div className="mt-6 flex flex-col min-h-[60vh]">
      <div className="flex-1">
        {/* Tab pills */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {['w-16', 'w-14', 'w-24', 'w-22', 'w-12'].map((w, i) => (
            <div
              key={i}
              className={`h-8 ${w} rounded-lg bg-[#262626] animate-pulse`}
              style={{ animationDelay: `${i * 40}ms` }}
            />
          ))}
        </div>

        {/* Tab content */}
        <div className="mt-4 flex flex-col gap-3">
          {[0, 80, 160].map((delay, i) => (
            <div
              key={i}
              className={`h-[72px] w-full rounded-xl bg-[#262626] animate-pulse ${i === 2 ? 'w-4/5' : ''}`}
              style={{ animationDelay: `${delay}ms` }}
            />
          ))}
        </div>
      </div>

      {/* Sticky footer */}
      <div className="sticky bottom-0 py-3 bg-[#171717] w-full">
        <div className="flex items-center gap-3">
          <div className="h-9 w-full rounded-lg bg-[#262626] animate-pulse" />
          <div className="h-9 w-full rounded-lg bg-[#1e2e10] animate-pulse" />
        </div>
      </div>
    </div>
  );
}
