export function ConnectCalendarSkeleton() {
  return (
    <div className="flex flex-col font-general gap-5 items-center  mx-auto py-10">
      {/* icon */}
      <div className="w-14 h-14 rounded-full bg-[#1a1a1a] animate-pulse" />

      {/* title + subtitle */}
      <div className="space-y-2 flex flex-col items-center">
        <div className="h-4 w-40 rounded bg-[#1a1a1a] animate-pulse" />
        <div className="h-3 w-56 rounded bg-[#1a1a1a] animate-pulse" />
      </div>

      {/* provider cards */}
      <div className="grid grid-cols-1 max-w-[300px] mx-auto w-full gap-4">
        {Array.from({ length: 2 }).map((_, i) => (
          <div
            key={i}
            className="w-full px-4 py-4 rounded-lg border border-[#1f1f1f] flex items-center gap-3"
          >
            <div className="w-6 h-6 rounded-full bg-[#1a1a1a] animate-pulse shrink-0" />
            <div className="h-3.5 w-32 rounded bg-[#1a1a1a] animate-pulse" />
          </div>
        ))}
      </div>

      {/* button */}
      <div className="w-[170px] h-[38px] rounded-full bg-[#1a1a1a] animate-pulse" />
    </div>
  );
}