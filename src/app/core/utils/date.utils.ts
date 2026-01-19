/**
 * Formats a deadline date into a human-readable string.
 * - Today → "Today"
 * - Tomorrow → "Tomorrow"
 * - Within 7 days → "This Monday", "This Friday", etc.
 * - Other dates → "Jan 25", "Feb 3", etc.
 */
export function formatDeadline(deadline: Date | string | undefined | null): string {
  if (!deadline) return '';

  const date = typeof deadline === 'string' ? new Date(deadline) : deadline;
  const now = new Date();

  // Check if today
  if (date.toDateString() === now.toDateString()) {
    return 'Today';
  }

  // Check if tomorrow
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  if (date.toDateString() === tomorrow.toDateString()) {
    return 'Tomorrow';
  }

  // Check if within the next 7 days
  const diffDays = Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays > 0 && diffDays <= 7) {
    const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
    return `This ${dayName}`;
  }

  // Default: show month and day
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}
