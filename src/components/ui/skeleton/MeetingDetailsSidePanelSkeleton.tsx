import React from 'react';
import Skeleton from './Skeleton';

export default function MeetingDetailsSidePanelSkeleton() {
  return (
    <div className="space-y-4 ">
      <div className="rounded-lg border border-[#333] bg-[#000] p-4">
        <div className="flex items-center gap-2">
          <Skeleton
            width="w-1"
            height="h-[30px]"
            rounded="rounded-full"
            className="bg-[#121212]"
          />
          <Skeleton width="w-2/3" height="h-8" className="bg-[#121212]" />
        </div>

        <div className="mt-4 space-y-6">
          <Skeleton
            width="w-[230px]"
            height="h-7"
            rounded="rounded-full"
            className="bg-[#121212]"
          />
          <div className="flex items-center gap-2">
            <Skeleton
              width="w-4"
              height="h-4"
              rounded="rounded-full"
              className="bg-[#121212]"
            />
            <Skeleton width="w-full" height="h-4" className="bg-[#121212]" />
          </div>
          <div className="flex items-center gap-4">
            <Skeleton
              width="w-6"
              height="h-6"
              rounded="rounded-full"
              className="bg-[#121212]"
            />
            <Skeleton
              width="w-28"
              height="h-9"
              rounded="rounded-[7px]"
              className="bg-[#121212]"
            />
            <Skeleton
              width="w-36"
              height="h-9"
              rounded="rounded-full"
              className="bg-[#121212]"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-6">
          <Skeleton width="w-20" height="h-6" className="bg-[#121212]" />
          <Skeleton width="w-24" height="h-6" className="bg-[#121212]" />
          <Skeleton width="w-24" height="h-6" className="bg-[#121212]" />
        </div>

        <div>
          <Skeleton width="w-32" height="h-5" className="mb-3 bg-[#121212]" />
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg border border-[#262626] bg-[#121212] p-4">
              <div className="mb-3 flex items-center gap-2">
                <Skeleton
                  width="w-4"
                  height="h-4"
                  rounded="rounded-full"
                  className="bg-[#121212]"
                />
                <Skeleton width="w-20" height="h-4" className="bg-[#121212]" />
              </div>
              <Skeleton width="w-full" height="h-4" className="bg-[#121212]" />
              <Skeleton
                width="w-5/6"
                height="h-4"
                className="mt-2 bg-[#121212]"
              />
            </div>
            <div className="rounded-lg border border-[#262626] bg-[#121212] p-4">
              <div className="mb-3 flex items-center gap-2">
                <Skeleton
                  width="w-4"
                  height="h-4"
                  rounded="rounded-full"
                  className="bg-[#121212]"
                />
                <Skeleton width="w-24" height="h-4" className="bg-[#121212]" />
              </div>
              <Skeleton width="w-4/5" height="h-4" className="bg-[#121212]" />
            </div>
          </div>
        </div>

        <div>
          <Skeleton width="w-28" height="h-5" className="mb-3 bg-[#121212]" />
          <div className="rounded-lg border border-[#262626] bg-[#121212] p-6">
            <Skeleton width="w-full" height="h-4" className="bg-[#121212]" />
            <Skeleton
              width="w-2/3"
              height="h-4"
              className="mt-2 bg-[#121212]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
