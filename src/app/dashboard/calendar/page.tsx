import CalenderHeader from '@/components/dashboard/calender/CalenderHeader';
import { generateMetadata } from '@/utils/metadata';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = generateMetadata({
  title: 'Viro | Calendar - Calendar',
  description: 'See your Meetings Schedules - Viro',
  url: '/dashboard/calendar',
});

export default function page() {
  return (
    <div className=''>
      <CalenderHeader />
    </div>
  );
}
