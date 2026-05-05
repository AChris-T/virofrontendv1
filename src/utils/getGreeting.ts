type GreetingPeriod = 'morning' | 'afternoon' | 'evening';

interface GreetingOptions {
  date?: Date; // optional override (useful for testing)
  locale?: string; // future extensibility
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

export function formatTimeTo12Hr(isoString: string): string {
  const date = new Date(isoString);
  const now = new Date();

  const diffMs = now.getTime() - date.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSeconds < 60) return `${diffSeconds}secs ago`;
  if (diffMinutes < 60) return `${diffMinutes}mins ago`;
  if (diffHours < 24) return `${diffHours}hrs ago`;
  return `${diffDays} days ago`;
}
