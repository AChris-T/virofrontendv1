export const IntegratePlatformsSkeleton=()=> {
  return (
    <div className="py-[6px] px-[17px]">
      {/* section label */}
      <div className="h-3 w-18 rounded bg-[#1a1a1a] animate-pulse mb-3" />

      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="border border-[#0F0F0F] rounded-lg p-4 flex justify-between items-start"
          >
            {/* left col */}
            <div className="flex flex-col gap-2 flex-1">
              {/* icon + name */}
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#1a1a1a] animate-pulse shrink-0" />
                <div className="h-3.5 w-28 rounded bg-[#1a1a1a] animate-pulse" />
              </div>
              {/* description lines */}
              <div className="h-2.5 w-[90%] rounded bg-[#1a1a1a] animate-pulse" />
              <div className="h-2.5 w-[60%] rounded bg-[#1a1a1a] animate-pulse" />
            </div>

            {/* toggle */}
            <div className="w-9 h-5 rounded-full bg-[#1a1a1a] animate-pulse mt-0.5 shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
}