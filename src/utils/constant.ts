import { CalendarEventAccent } from '@/components/dashboard/calender/events/calendar';

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Courses', href: '/dashboard/explore-courses' },
  { label: 'About', href: '/about' },
  {
    label: 'Resources',
    children: [
      { label: 'Watch Live', href: '#' },
      { label: 'Listen Live', href: '#' },
    ],
  },
];
export const loadingIndicatorProperties = {
  color: '#FE6D00',
  height: 3.5,
  showSpinner: true,
  zIndex: 999999999,
};
export const cookieConfig = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  maxAge: 60 * 60 * 24 * 7,
};
export const googleUserInfoUrl =
  'https://www.googleapis.com/oauth2/v3/userinfo';

export const SLOT_HEIGHT_PX = 52;
export const GRID_START_HOUR = 13;
export const GRID_END_HOUR = 23;
export const HOURS_IN_GRID = GRID_END_HOUR - GRID_START_HOUR + 1;
export const TIMEZONE_LABEL = 'GMT+01';

export const WEEK_DAYS = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
] as const;

export const WEEK_DAYS_SHORT = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
] as const;

export const ACCENT_BAR: Record<CalendarEventAccent, string> = {
  green: 'bg-[#BEF264]',
  blue: 'bg-sky-400',
  yellow: 'bg-amber-300',
};
