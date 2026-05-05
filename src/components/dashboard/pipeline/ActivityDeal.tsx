import { PlusIcon, SquareDocIcon } from '@/assets/icons';
import type { ActivityItem } from '@/components/types';
import { formatTimeTo12Hr } from '@/utils/getGreeting';

export default function ActivityDeal({ dealData }: any) {
  return (
    <div className="w-full py-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-[#E9E9E9]">Activity</h3>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-lg border border-[#333333] bg-[#262626] px-3 py-2 text-xs font-medium text-[#E9E9E9] hover:bg-[#2E2E2E] transition-colors"
        >
          <PlusIcon className="text-[#E9E9E9]" />
          Log activity
        </button>
      </div>

      <div className="mt-3 rounded-lg border border-[#333333] bg-[#262626] p-2">
        <div className="rounded-lg border border-[#333333] bg-[#2E2E2E] p-3">
          <div className="max-h-[520px] overflow-y-auto pr-2 custom-scrollbar">
            <div className="space-y-6">
              {dealData?.activities.map((item: ActivityItem, idx: number) => {
                const isLast = idx === dealData?.activities.length - 1;
                return (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-lg border border-[#404040] bg-[#262626] text-[#A6A6A6]">
                        <SquareDocIcon className="text-[#A6A6A6]" />
                      </div>
                      {!isLast ? (
                        <span className="mt-1 h-full min-h-10 w-px bg-[#404040]" />
                      ) : null}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-3">
                        <p className="min-w-0 truncate text-sm font-medium text-[#E9E9E9]">
                          {item.title}
                        </p>
                        <span className="shrink-0 text-xs text-[#A6A6A6] flex items-center gap-2">
                          <span className="h-1 w-1 rounded-full bg-[#404040]" />
                          {formatTimeTo12Hr(item.date_updated)}
                        </span>
                      </div>
                      <p className="mt-2 text-xs leading-relaxed text-[#A6A6A6]">
                        {item.description || 'No Desciption Available'}
                      </p>

                      {item.comment ? (
                        <div>
                          <div className="inline-flex rounded-md bg-[#2F2609] px-2 py-1 text-[10px] font-semibold tracking-wide text-[#F79009]">
                            {item.badge}
                          </div>
                          <p className="mt-3 text-xs leading-relaxed text-[#A6A6A6]">
                            {item.content}
                          </p>
                        </div>
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
