import { CalendarEventItem } from '@/components/types';

/** Demo events — September 2025 (matches reference layouts) */
export function getDemoEvents(): CalendarEventItem[] {
  const y = 2025;
  const m = 8; // September (0-indexed)
  return [
    {
      id: '1',
      title: 'Lunch meeting with Tobi',
      start: new Date(y, m, 1, 14, 0),
      end: new Date(y, m, 14, 15, 0),
      accent: 'green',
    },
    {
      id: '2',
      title: 'Brief discussion',
      start: new Date(y, m, 14, 20, 0),
      end: new Date(y, m, 14, 21, 0),
      accent: 'green',
    },
    {
      id: '3',
      title: 'Founders Meeting',
      start: new Date(y, m, 16, 16, 0),
      end: new Date(y, m, 16, 18, 0),
      accent: 'green',
    },
    {
      id: '4',
      title: 'Product Team meeting',
      start: new Date(y, m, 18, 18, 30),
      end: new Date(y, m, 18, 19, 30),
      accent: 'blue',
    },
    {
      id: '5',
      title: 'Product Team meeting',
      start: new Date(y, m, 19, 14, 0),
      end: new Date(y, m, 19, 15, 0),
      accent: 'green',
    },
    {
      id: '6',
      title: 'Meeting with Iris',
      start: new Date(y, m, 19, 15, 0),
      end: new Date(y, m, 19, 15, 30),
      accent: 'yellow',
    },
    {
      id: '7',
      title: 'Meeting with Acme',
      start: new Date(y, m, 22, 11, 0),
      end: new Date(y, m, 22, 12, 30),
      accent: 'green',
    },
    {
      id: '8',
      title: 'Viro Engineering Meeting',
      start: new Date(y, m, 25, 10, 0),
      end: new Date(y, m, 25, 11, 0),
      accent: 'blue',
    },
    {
      id: '9',
      title: 'Design sync',
      start: new Date(y, m, 25, 14, 0),
      end: new Date(y, m, 25, 15, 0),
      accent: 'yellow',
    },
    {
      id: '10',
      title: 'Standup',
      start: new Date(y, m, 25, 9, 0),
      end: new Date(y, m, 25, 9, 30),
      accent: 'green',
    },
    {
      id: '11',
      title: 'Client review',
      start: new Date(y, m, 25, 16, 0),
      end: new Date(y, m, 25, 17, 30),
      accent: 'blue',
    },
  ];
}
