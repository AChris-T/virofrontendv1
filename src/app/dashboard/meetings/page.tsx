import { generateMetadata } from '@/utils/metadata';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = generateMetadata({
  title: 'Viro | Meetings - Meetings',
  description: 'Join Meetings - Viro',
  url: '/dashboard/meetings',
});
export default function page() {
  return <div className="text-white">page</div>;
}
