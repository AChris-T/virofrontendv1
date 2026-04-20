import { Arrow, ZoomIcon } from '@/assets/icons';
import NeonPillButton from '@/components/ui/button/NeonPillButton';
import React from 'react';

export default function AssignAgent() {
  const options = [
    { label: 'Co-Pilot', value: 'co-pilot' },
    { label: 'Join AI', value: 'join-ai' },
  ];

  return (
    <div>
      <div className='flex items-center gap-4'>
        <div className='flex items-center px-3 py-2.5 rounded-full bg-green-100 justify-center gap-1 '>
          <ZoomIcon/>
          <span className=" text-sm text-white">Join Meeting</span>
          <Arrow fill='#fff' width={10} height={10}/>

        </div>
        <NeonPillButton
          options={options}
          defaultSelectedValue="co-pilot"
          onSelectOption={(option) => {
            console.log('Selected option:', option.value);
          }}
        />
      </div>
    </div>
  );
}
