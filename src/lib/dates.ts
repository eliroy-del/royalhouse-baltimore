/** Date helpers. All formatting is done in a fixed timezone so server and
 *  client renders always agree (no hydration mismatches). */

const TIME_ZONE = "America/New_York";

function parse(iso: string): Date {
  // Treat bare YYYY-MM-DD as noon UTC to avoid timezone rollover.
  return new Date(/^\d{4}-\d{2}-\d{2}$/.test(iso) ? `${iso}T12:00:00Z` : iso);
}

export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: TIME_ZONE,
  }).format(parse(iso));
}

export function formatShortDate(iso: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    timeZone: TIME_ZONE,
  }).format(parse(iso));
}

/** "June 2026" — used where the exact day adds nothing, e.g. testimonies. */
export function formatMonthYear(iso: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
    timeZone: TIME_ZONE,
  }).format(parse(iso));
}

export function formatDayOfWeek(iso: string): string {
  return new Intl.DateTimeFormat("en-US", { weekday: "long", timeZone: TIME_ZONE }).format(
    parse(iso),
  );
}

/** Split date parts for the calendar-chip used on event cards. */
export function dateParts(iso: string): { month: string; day: string; weekday: string } {
  const date = parse(iso);
  const fmt = (options: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat("en-US", { ...options, timeZone: TIME_ZONE }).format(date);
  return {
    month: fmt({ month: "short" }).toUpperCase(),
    day: fmt({ day: "numeric" }),
    weekday: fmt({ weekday: "short" }).toUpperCase(),
  };
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return rest === 0 ? `${hours} hr` : `${hours} hr ${rest} min`;
}

export function isUpcoming(iso: string, now: Date = new Date()): boolean {
  return parse(iso).getTime() >= now.getTime() - 12 * 60 * 60 * 1000;
}

/** Sortable timestamp, used instead of `new Date()` comparisons in render paths. */
export function timestamp(iso: string): number {
  return parse(iso).getTime();
}

/** Google Calendar "add to calendar" link. */
export function googleCalendarUrl(input: {
  title: string;
  details: string;
  location: string;
  date: string;
  endDate?: string;
}): string {
  const start = parse(input.date);
  const end = input.endDate ? parse(input.endDate) : start;
  const stamp = (d: Date) => d.toISOString().slice(0, 10).replace(/-/g, "");
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: input.title,
    details: input.details,
    location: input.location,
    dates: `${stamp(start)}/${stamp(new Date(end.getTime() + 86_400_000))}`,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
