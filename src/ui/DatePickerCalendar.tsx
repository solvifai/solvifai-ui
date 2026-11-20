import { type KeyboardEvent, type RefObject, useId, useLayoutEffect, useRef } from "react";

import {
  calendarDate,
  clampCalendarDate,
  daysInCalendarMonth,
  shiftCalendarDays,
  shiftCalendarMonth,
} from "./calendarDates";
import { cn } from "./cn";
import { ChevronLeftIcon, ChevronRightIcon } from "./icons";

const weekdays = ["日", "月", "火", "水", "木", "金", "土"];
const weekdayNames = weekdays.map((day) => day + "曜日");
const monthLabel = new Intl.DateTimeFormat("ja-JP", {
  timeZone: "UTC",
  year: "numeric",
  month: "long",
});
const dayLabel = new Intl.DateTimeFormat("ja-JP", { timeZone: "UTC", dateStyle: "full" });
const navButton =
  "grid size-9 place-items-center rounded-md border border-border-control text-text-muted aria-disabled:opacity-40 [&:not([aria-disabled=true]):hover]:border-brand-primary [&:not([aria-disabled=true]):hover]:text-brand-foreground";

interface DatePickerCalendarProps {
  active: string;
  selected: string;
  today: string;
  min: string;
  max: string;
  activeButton: RefObject<HTMLButtonElement | null>;
  onNavigate: (value: string) => void;
  onSelect: (value: string) => void;
}

export function DatePickerCalendar({
  active,
  selected,
  today,
  min,
  max,
  activeButton,
  onNavigate,
  onSelect,
}: DatePickerCalendarProps) {
  const focusAfterNavigation = useRef(false);
  const headingId = useId();
  const month = active.slice(0, 7);
  const firstDay = month + "-01";
  const firstColumn = calendarDate(firstDay).getUTCDay();
  const lastDay = daysInCalendarMonth(firstDay);
  const weeks = Math.ceil((firstColumn + lastDay) / 7);
  const previousAvailable = month > min.slice(0, 7) && min <= max;
  const nextAvailable = month < max.slice(0, 7) && min <= max;

  useLayoutEffect(() => {
    if (!focusAfterNavigation.current) return;
    focusAfterNavigation.current = false;
    activeButton.current?.focus();
  }, [active, activeButton]);

  function moveTo(day: string, focus: boolean) {
    if (min > max) return;
    const next = clampCalendarDate(day, min, max);
    if (next === active) return;
    focusAfterNavigation.current = focus;
    onNavigate(next);
  }

  function onDayKeyDown(event: KeyboardEvent<HTMLButtonElement>, day: string) {
    let next: string;
    switch (event.key) {
      case "ArrowLeft":
        next = shiftCalendarDays(day, -1);
        break;
      case "ArrowRight":
        next = shiftCalendarDays(day, 1);
        break;
      case "ArrowUp":
        next = shiftCalendarDays(day, -7);
        break;
      case "ArrowDown":
        next = shiftCalendarDays(day, 7);
        break;
      case "Home":
        next = shiftCalendarDays(day, -calendarDate(day).getUTCDay());
        break;
      case "End":
        next = shiftCalendarDays(day, 6 - calendarDate(day).getUTCDay());
        break;
      case "PageUp":
        next = shiftCalendarMonth(day, event.shiftKey ? -12 : -1);
        break;
      case "PageDown":
        next = shiftCalendarMonth(day, event.shiftKey ? 12 : 1);
        break;
      default:
        return;
    }
    event.preventDefault();
    moveTo(next, true);
  }

  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-2">
        <button
          type="button"
          aria-label="前の月"
          aria-disabled={!previousAvailable}
          className={navButton}
          onClick={() => previousAvailable && moveTo(shiftCalendarMonth(active, -1), false)}
        >
          <ChevronLeftIcon />
        </button>
        <p id={headingId} aria-live="polite" className="text-sm font-semibold tabular-nums">
          {monthLabel.format(calendarDate(firstDay))}
        </p>
        <button
          type="button"
          aria-label="次の月"
          aria-disabled={!nextAvailable}
          className={navButton}
          onClick={() => nextAvailable && moveTo(shiftCalendarMonth(active, 1), false)}
        >
          <ChevronRightIcon />
        </button>
      </div>
      <div role="grid" aria-labelledby={headingId}>
        <div
          role="row"
          className="grid grid-cols-7 text-center text-xs font-medium text-text-muted"
        >
          {weekdays.map((day, index) => (
            <span key={day} role="columnheader" aria-label={weekdayNames[index]} className="py-2">
              {day}
            </span>
          ))}
        </div>
        {Array.from({ length: weeks }, (_, week) => (
          <div key={week} role="row" className="grid grid-cols-7">
            {weekdays.map((column, index) => {
              const day = week * 7 + index - firstColumn + 1;
              if (day < 1 || day > lastDay) {
                return (
                  <span
                    key={column}
                    role="gridcell"
                    className="aspect-square w-full max-w-10 justify-self-center"
                  />
                );
              }
              const value = month + "-" + String(day).padStart(2, "0");
              const isSelected = value === selected;
              const unavailable = value < min || value > max;
              return (
                <div
                  key={column}
                  role="gridcell"
                  aria-selected={isSelected}
                  className="grid place-items-center"
                >
                  <button
                    ref={value === active ? activeButton : undefined}
                    type="button"
                    tabIndex={value === active ? 0 : -1}
                    aria-label={dayLabel.format(calendarDate(value))}
                    aria-current={value === today ? "date" : undefined}
                    aria-disabled={unavailable}
                    className={cn(
                      "grid aspect-square w-full max-w-10 place-items-center rounded-lg text-sm tabular-nums aria-disabled:text-gray-400",
                      !unavailable && "hover:bg-brand-primary/10 hover:text-brand-foreground",
                      value === today &&
                        !isSelected &&
                        "font-semibold ring-1 ring-inset ring-brand-primary/60",
                      isSelected &&
                        !unavailable &&
                        "bg-brand-foreground font-semibold text-white hover:bg-brand-foreground hover:text-white",
                    )}
                    onKeyDown={(event) => onDayKeyDown(event, value)}
                    onClick={() => {
                      if (unavailable) return;
                      onNavigate(value);
                      onSelect(value);
                    }}
                  >
                    {day}
                  </button>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
