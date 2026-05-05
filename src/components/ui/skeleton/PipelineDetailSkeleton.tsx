export default function PipelineDetailsSkeleton() {
  return (
    <div className="space-y-6 h-full">
      {/* Greeting */}
      <div className="h-7 w-64 rounded-md bg-[#262626] animate-pulse" />

      {/* Header row */}
      <div className="flex items-center justify-between">
        <div className="h-7 w-56 rounded-md bg-[#262626] animate-pulse" />
        <div className="flex items-center gap-2">
          <div className="h-9 w-24 rounded-lg bg-[#262626] animate-pulse" />
          <div className="h-9 w-22 rounded-lg bg-[#262626] animate-pulse" />
          <div className="h-9 w-36 rounded-lg bg-[#262626] animate-pulse" />
        </div>
      </div>

      {/* Tabs + view toggle row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {['w-12', 'w-20', 'w-16', 'w-16'].map((w, i) => (
            <div
              key={i}
              className={`h-8 ${w} rounded-lg bg-[#262626] animate-pulse`}
            />
          ))}
        </div>
        <div className="flex items-center gap-2">
          <div className="h-9 w-24 rounded-lg bg-[#262626] animate-pulse" />
          <div className="h-9 w-16 rounded-lg bg-[#262626] animate-pulse" />
        </div>
      </div>

      {/* Kanban board columns */}
      <div className="flex gap-4 overflow-x-auto pb-4">
        {[3, 2, 4, 1].map((cardCount, colIdx) => (
          <div key={colIdx} className="flex flex-col gap-3 min-w-[220px]">
            {/* Column header */}
            <div className="h-5 w-32 rounded-md bg-[#262626] animate-pulse" />
            {/* Cards */}
            {Array.from({ length: cardCount }).map((_, i) => (
              <div
                key={i}
                className="h-24 rounded-xl bg-[#262626] animate-pulse"
                style={{ animationDelay: `${(colIdx * cardCount + i) * 60}ms` }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
