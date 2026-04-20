export function timeRange(startISO: string, endISO: string): string {
  const start = new Date(startISO);
  const end = new Date(endISO);

  const formatTime = (date: Date) =>
    date.toLocaleTimeString(undefined, {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });

  const getDayLabel = (date: Date) => {
    const today = new Date();
    const input = new Date(date);

    today.setHours(0, 0, 0, 0);
    input.setHours(0, 0, 0, 0);

    const diff = (input.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);

    if (diff === 0) return 'Today';
    if (diff === 1) return 'Tomorrow';
    if (diff === -1) return 'Yesterday';

    return input.toLocaleDateString(undefined, {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  return `${getDayLabel(start)} • ${formatTime(start)} - ${formatTime(end)}`;
}
