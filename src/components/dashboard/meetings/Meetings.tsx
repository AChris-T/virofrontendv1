'use client';
import { Tabs } from '@/components/ui/tabs';
import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import SelectDropdown from '@/components/ui/dropdown/SelectDropdown';
import { GridIcon, ListIcons } from '@/assets/icons';
import MyMeetings from './MyMeetings';

export default function Meetings() {
  const currentSearchParams = useSearchParams();
  const activeTab = currentSearchParams.get('tab') ?? 'my-meetings';
  const [selectedDay, setSelectedDay] = useState<string>('day');
  const [viewType, setViewType] = useState<'grid' | 'list'>('grid');

  const dayOptions = [
    { label: 'Day', value: 'day' },
    { label: 'Week', value: 'week' },
    { label: 'Month', value: 'month' },
  ];

  return (
    <div className="px-6">
      <div className="flex justify-between items-center">
        <div className="max-w-[263px]">
          <Tabs
            tabs={[
              {
                label: 'My Meetings',
                value: 'my-meetings',
              },
              {
                label: 'Attended by Viro',
                value: 'activity',
              },
            ]}
            defaultValue="my-meetings"
          />
        </div>
        <div className="flex items-center gap-3 mt-4">
          <SelectDropdown<string>
            ariaLabel="Select time period"
            value={selectedDay}
            options={dayOptions}
            onChange={setSelectedDay}
            triggerClassName="bg-[#1a1a1a] border border-[#404040]"
          />
          <button
            onClick={() => setViewType('grid')}
            aria-label="Grid view"
            className={`h-9 w-9 flex items-center justify-center rounded-[6px] transition-colors ${
              viewType === 'grid'
                ? 'bg-[#262626] text-white'
                : 'bg-[#1a1a1a] text-white/50 border border-[#404040] hover:text-white'
            }`}
          >
            <GridIcon />
          </button>
          <button
            onClick={() => setViewType('list')}
            aria-label="List view"
            className={`h-9 w-9 flex items-center justify-center rounded-[6px] transition-colors ${
              viewType === 'list'
                ? 'bg-[#262626] text-white'
                : 'bg-[#1a1a1a] text-white/50 border border-[#404040] hover:text-white'
            }`}
          >
            <ListIcons />
          </button>
        </div>
      </div>
      <div className="mt-6">
        {activeTab === 'my-meetings' && <MyMeetings />}
        {activeTab === 'activity' && 'hello'}
      </div>
    </div>
  );
}
