import { GRID_START_HOUR } from './constant';

export function formatHourLabel(h: number): string {
  if (h === 0) return '12 AM';
  if (h < 12) return `${h} AM`;
  if (h === 12) return '12 PM';
  return `${h - 12} PM`;
}

export function sameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function startOfDay(d: Date) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

/** Week starts Sunday */
export function startOfWeekSunday(d: Date) {
  const x = startOfDay(d);
  const day = x.getDay();
  x.setDate(x.getDate() - day);
  return x;
}

export function addDays(d: Date, n: number) {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
}

export function addMonths(d: Date, n: number) {
  const x = new Date(d);
  x.setMonth(x.getMonth() + n);
  return x;
}

export function monthTitle(d: Date) {
  return d.toLocaleString('en-US', { month: 'long', year: 'numeric' });
}

export function weekRangeTitle(weekStart: Date) {
  const weekEnd = addDays(weekStart, 6);
  const opts: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
  const a = weekStart.toLocaleString('en-US', opts);
  const b = weekEnd.toLocaleString('en-US', { ...opts, year: 'numeric' });
  return `${a} – ${b}`;
}

export function getMonthGrid(anchorMonth: Date): Date[][] {
  const y = anchorMonth.getFullYear();
  const m = anchorMonth.getMonth();
  const first = new Date(y, m, 1);
  const gridStart = new Date(first);
  gridStart.setDate(first.getDate() - first.getDay());

  const weeks: Date[][] = [];
  const cur = new Date(gridStart);
  for (let w = 0; w < 6; w++) {
    const row: Date[] = [];
    for (let d = 0; d < 7; d++) {
      row.push(new Date(cur));
      cur.setDate(cur.getDate() + 1);
    }
    weeks.push(row);
  }
  return weeks;
}

export function minutesSinceGridStart(d: Date) {
  const start = new Date(d);
  const h = start.getHours();
  const min = start.getMinutes();
  const gridStartMin = GRID_START_HOUR * 60;
  const t = h * 60 + min;
  return t - gridStartMin;
}

export function clamp(n: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, n));
}

export function formatEventTimeRange(start: Date, end: Date) {
  const f = (d: Date) =>
    d
      .toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
      .replace(/\s/g, '')
      .toLowerCase();
  return `${f(start)}-${f(end)}`;
}
export const duration = [
  { label: 'Repeat', value: 'repeat' },
  { label: 'Does not repeat', value: 'dont-repeat' },
];
export const options = [
  // Americas
  {
    label: '(GMT-10:00) Hawaii Time',
    value: 'Pacific/Honolulu',
    region: 'Americas',
  },
  {
    label: '(GMT-09:00) Alaska Time',
    value: 'America/Anchorage',
    region: 'Americas',
  },
  {
    label: '(GMT-08:00) Pacific Time',
    value: 'America/Los_Angeles',
    region: 'Americas',
  },
  {
    label: '(GMT-07:00) Mountain Time',
    value: 'America/Denver',
    region: 'Americas',
  },
  {
    label: '(GMT-07:00) Mountain Time - Arizona',
    value: 'America/Phoenix',
    region: 'Americas',
  },
  {
    label: '(GMT-06:00) Central Time',
    value: 'America/Chicago',
    region: 'Americas',
  },
  {
    label: '(GMT-05:00) Eastern Time',
    value: 'America/New_York',
    region: 'Americas',
  },
  {
    label: '(GMT-04:00) Atlantic Time - Halifax',
    value: 'America/Halifax',
    region: 'Americas',
  },
  {
    label: '(GMT-03:00) Brasilia Time',
    value: 'America/Sao_Paulo',
    region: 'Americas',
  },
  {
    label: '(GMT-03:00) Argentina Time',
    value: 'America/Argentina/Buenos_Aires',
    region: 'Americas',
  },

  // Europe & Africa
  {
    label: '(GMT+00:00) London',
    value: 'Europe/London',
    region: 'Europe & Africa',
  },
  {
    label: '(GMT+00:00) Reykjavik',
    value: 'Atlantic/Reykjavik',
    region: 'Europe & Africa',
  },
  {
    label: '(GMT+01:00) Lagos',
    value: 'Africa/Lagos',
    region: 'Europe & Africa',
  },
  {
    label: '(GMT+01:00) Paris',
    value: 'Europe/Paris',
    region: 'Europe & Africa',
  },
  {
    label: '(GMT+01:00) Berlin',
    value: 'Europe/Berlin',
    region: 'Europe & Africa',
  },
  {
    label: '(GMT+02:00) Cairo',
    value: 'Africa/Cairo',
    region: 'Europe & Africa',
  },
  {
    label: '(GMT+02:00) Johannesburg',
    value: 'Africa/Johannesburg',
    region: 'Europe & Africa',
  },
  {
    label: '(GMT+02:00) Helsinki',
    value: 'Europe/Helsinki',
    region: 'Europe & Africa',
  },
  {
    label: '(GMT+03:00) Moscow',
    value: 'Europe/Moscow',
    region: 'Europe & Africa',
  },
  {
    label: '(GMT+03:00) Nairobi',
    value: 'Africa/Nairobi',
    region: 'Europe & Africa',
  },

  // Middle East
  { label: '(GMT+03:00) Riyadh', value: 'Asia/Riyadh', region: 'Middle East' },
  {
    label: '(GMT+03:00) Baghdad',
    value: 'Asia/Baghdad',
    region: 'Middle East',
  },
  { label: '(GMT+03:30) Tehran', value: 'Asia/Tehran', region: 'Middle East' },
  { label: '(GMT+04:00) Dubai', value: 'Asia/Dubai', region: 'Middle East' },
  { label: '(GMT+04:30) Kabul', value: 'Asia/Kabul', region: 'Middle East' },

  // Asia & Pacific
  {
    label: '(GMT+05:00) Karachi',
    value: 'Asia/Karachi',
    region: 'Asia & Pacific',
  },
  {
    label: '(GMT+05:30) India Standard Time',
    value: 'Asia/Kolkata',
    region: 'Asia & Pacific',
  },
  { label: '(GMT+06:00) Dhaka', value: 'Asia/Dhaka', region: 'Asia & Pacific' },
  {
    label: '(GMT+07:00) Bangkok',
    value: 'Asia/Bangkok',
    region: 'Asia & Pacific',
  },
  {
    label: '(GMT+07:00) Jakarta',
    value: 'Asia/Jakarta',
    region: 'Asia & Pacific',
  },
  {
    label: '(GMT+08:00) Singapore',
    value: 'Asia/Singapore',
    region: 'Asia & Pacific',
  },
  {
    label: '(GMT+08:00) Hong Kong',
    value: 'Asia/Hong_Kong',
    region: 'Asia & Pacific',
  },
  {
    label: '(GMT+08:00) Beijing',
    value: 'Asia/Shanghai',
    region: 'Asia & Pacific',
  },
  {
    label: '(GMT+08:00) Perth',
    value: 'Australia/Perth',
    region: 'Asia & Pacific',
  },
  { label: '(GMT+09:00) Tokyo', value: 'Asia/Tokyo', region: 'Asia & Pacific' },
  { label: '(GMT+09:00) Seoul', value: 'Asia/Seoul', region: 'Asia & Pacific' },
  {
    label: '(GMT+09:30) Adelaide',
    value: 'Australia/Adelaide',
    region: 'Asia & Pacific',
  },
  {
    label: '(GMT+10:00) Sydney',
    value: 'Australia/Sydney',
    region: 'Asia & Pacific',
  },
  {
    label: '(GMT+12:00) Auckland',
    value: 'Pacific/Auckland',
    region: 'Asia & Pacific',
  },
];
///to be deleted
export const switchConfigs = {
  account: [
    {
      key: 'personal',
      label: 'Personal Information',
      description: 'Edit your personal information.',
    },
  ],
  notification: [
    {
      key: 'push',
      label: 'Push Notifications',
      description: 'Control alerts for new activities and updates.',
    },
    {
      key: 'lesson',
      label: 'Lesson Notifications',
      description: 'Receive notifications about your lesson progress.',
    },
    {
      key: 'live',
      label: 'Live & Special Events',
      description:
        'Get notified about special events, fasts, or prayer meetings.',
    },
    {
      key: 'general',
      label: 'General Notifications',
      description: 'Manage announcements and feedback requests.',
    },
  ],
  security: [
    {
      key: 'password',
      label: 'Password Settings',
      description: 'Change to a new password.',
    },
    {
      key: 'delete',
      label: 'Delete Account',
      description: 'Request permanent deletion of my account',
    },
  ],
};


