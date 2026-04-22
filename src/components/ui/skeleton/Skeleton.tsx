'use client';

import { HTMLAttributes } from 'react';

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  width?: string;
  height?: string;
  rounded?: string;
}

export default function Skeleton({
  width = 'w-full',
  height = 'h-4',
  rounded = 'rounded-md',
  className = '',
  ...rest
}: SkeletonProps) {
  return (
    <div
      className={`bg-[#121212] animate-pulse ${width} ${height} ${rounded} ${className}`}
      {...rest}
    />
  );
}
