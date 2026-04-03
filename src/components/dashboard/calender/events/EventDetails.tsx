import React, { useState } from 'react';
import ConnectCalender from './ConnectCalender';
import EventDetail from './EventDetail';

export default function EventDetails() {
  const [setEventDetails, setEventDetailState] = useState(false);
  return (
    <div className="font-general my-2 mx-6 text-white">
      {setEventDetails ? (
        <div>
          <EventDetail />
        </div>
      ) : (
        <div className="font-general text-white  h-full pt-[72px] justify-center items-center flex flex-col gap-6">
          <ConnectCalender setEventDetailState={setEventDetailState} />
        </div>
      )}
    </div>
  );
}
