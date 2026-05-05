import React from 'react';

interface ActivityItem {
  id: number;
  text: string;
  date: string;
}

const activityData: ActivityItem[] = [
  {
    id: 1,
    date: 'Mon, Apr 16',
    text: 'Your created Acme Demo Call for 2 pm today',
  },
  {
    id: 2,
    date: 'Mon, Apr 16',
    text: 'You rescheduled the follow-up meeting with client Acme Corp to 4 pm.',
  },
  {
    id: 3,
    date: 'Mon, Apr 16',
    text: 'Assigned Iris AI agent to the team brainstorming session for the new product launch at 11 am.',
  },
  {
    id: 4,
    date: 'Mon, Apr 16',
    text: 'You updated the presentation preparation for the GreenTech Initiative at 1 pm.',
  },
  {
    id: 5,
    date: 'Mon, Apr 16',
    text: 'Assigned a task to review the user feedback from the recent product launch and prepare a presentation for the next team meeting.',
  },
  {
    id: 6,
    date: 'Fri, Apr 14',
    text: 'You assigned task to Iris to review the campaign visuals and provide feedback by end of day.',
  },
];
const groupActivitiesByDate = (activities: ActivityItem[]) => {
  const grouped: { [key: string]: ActivityItem[] } = {};

  activities.forEach((activity) => {
    if (!grouped[activity.date]) {
      grouped[activity.date] = [];
    }
    grouped[activity.date].push(activity);
  });

  return Object.entries(grouped).map(([date, items]) => ({ date, items }));
};

export default function Activity() {
  const groupedActivities = groupActivitiesByDate(activityData);

  return (
    <div className="font-general h-full  border border-[#333333] mb-40 p-3 bg-[#262626] rounded-lg mx-6 mt-6  text-white">
      <div className="space-y-6">
        {groupedActivities.map((group) => (
          <div key={group.date}>
            <h3 className="text-xs font-medium text-white-100 mb-2">
              {group.date}
            </h3>
            <div className="space-y-3 ">
              {group.items.map((activity) => (
                <div
                  key={activity.id}
                  className="flex bg-[#2E2E2E] border border-[#333333] rounded p-4 items-center justify-between gap-3"
                >
                  <div className="flex items-start gap-2">
                    <div className="flex-shrink-0 w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
                    <p className="text-sm text-white-200 leading-relaxed">
                      {activity.text}
                    </p>
                  </div>
                  <p className="font-medium text-xs text-[#797B72]">9:30am</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
