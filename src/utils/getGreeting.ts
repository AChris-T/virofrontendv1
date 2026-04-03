type GreetingPeriod = 'morning' | 'afternoon' | 'evening';

interface GreetingOptions {
  date?: Date;          // optional override (useful for testing)
  locale?: string;      // future extensibility
}

export function getGreeting(options: GreetingOptions = {}): string {
  const { date = new Date() } = options;

  const hour = date.getHours();

  let period: GreetingPeriod;

  if (hour >= 5 && hour < 12) {
    period = 'morning';
  } else if (hour >= 12 && hour < 17) {
    period = 'afternoon';
  } else {
    period = 'evening';
  }

  return `Good ${period}`;
}