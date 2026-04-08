import React from 'react';

export default function AcceptSkeletonInvite() {
  return (
    <div className="flex items-center justify-center flex-col gap-16 animate-pulse">
      <div className="w-[50px] h-[50px] bg-white/10 rounded-full" />
      <div className="flex items-center flex-col gap-3">
        <div className="h-[28px] w-[380px] bg-white/10 rounded-md" />
        <div className="flex items-center gap-3">
          <div className="h-[20px] w-[80px] bg-white/10 rounded-md" />
          <div className="w-[5px] h-[5px] bg-white/10 rounded-full" />
          <div className="h-[20px] w-[120px] bg-white/10 rounded-md" />
        </div>
      </div>
    </div>
  );
}
