export const MeetingCardSkeleton: React.FC = () => {
  return (
    <div className="w-full bg-[#262626] border border-[#333333] rounded-lg px-2.5 py-4">
      {/* Top row — time + assign toggle */}
      <div className="flex items-center justify-between mb-3">
        <div className="h-2.5 w-16 rounded bg-[#333] animate-pulse" />

        <div className="flex items-center gap-2">
          <div className="h-2.5 w-20 rounded bg-[#333] animate-pulse" />
          {/* Toggle pill */}
          <div className="h-[18px] w-9 rounded-full bg-[#333] animate-pulse" />
        </div>
      </div>

      {/* Inner card */}
      <div className="flex items-center justify-between bg-[#2E2E2E] border border-[#333333] px-2 rounded py-2">
        <div className="flex items-center gap-2">
          {/* Blue accent bar */}
          <div className="h-12 w-[3px] rounded-sm bg-[#333] animate-pulse" />

          <div className="space-y-2">
            {/* Title */}
            <div className="h-3 w-36 rounded bg-[#333] animate-pulse" />
            {/* Description */}
            <div className="h-2.5 w-24 rounded bg-[#333] animate-pulse" />
          </div>
        </div>

        {/* Join button icon */}
        <div className="h-9 w-9 rounded-full bg-[#333] animate-pulse" />
      </div>
    </div>
  );
};
