export const firstCalendarDate = "0001-01-01";
export const lastCalendarDate = "9999-12-31";

export function calendarDate(value: string) {
  return new Date(value + "T00:00:00Z");
}

export function calendarKey(date: Date) {
  if (date.getUTCFullYear() < 1) return firstCalendarDate;
  if (date.getUTCFullYear() > 9999) return lastCalendarDate;
  return date.toISOString().slice(0, 10);
}

export function shiftCalendarDays(value: string, days: number) {
  const date = calendarDate(value);
  date.setUTCDate(date.getUTCDate() + days);
  return calendarKey(date);
}

export function daysInCalendarMonth(firstDay: string) {
  const date = calendarDate(firstDay);
  date.setUTCMonth(date.getUTCMonth() + 1, 0);
  return date.getUTCDate();
}

export function shiftCalendarMonth(value: string, months: number) {
  const date = calendarDate(value);
  const day = date.getUTCDate();
  date.setUTCMonth(date.getUTCMonth() + months, 1);
  if (date.getUTCFullYear() < 1) return firstCalendarDate;
  if (date.getUTCFullYear() > 9999) return lastCalendarDate;
  const firstDay = calendarKey(date);
  date.setUTCDate(Math.min(day, daysInCalendarMonth(firstDay)));
  return calendarKey(date);
}

export function clampCalendarDate(value: string, min: string, max: string) {
  return value < min ? min : value > max ? max : value;
}

export function todayCalendarDate(timeZone?: string) {
  const parts = new Intl.DateTimeFormat("ja-JP", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts();
  const part = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((item) => item.type === type)?.value;
  return `${part("year")}-${part("month")}-${part("day")}`;
}
