import { CalendarClock, CalendarDays } from "lucide-react";
import { type ComponentPropsWithRef, useEffect, useId, useRef, useState } from "react";

import { AppButton } from "./AppButton";
import {
  calendarDate,
  clampCalendarDate,
  firstCalendarDate,
  lastCalendarDate,
  todayCalendarDate,
} from "./calendarDates";
import { cn } from "./cn";
import { DatePickerCalendar } from "./DatePickerCalendar";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./Dialog";

type PickerProps = Pick<
  ComponentPropsWithRef<"button">,
  | "id"
  | "className"
  | "disabled"
  | "form"
  | "name"
  | "ref"
  | "aria-label"
  | "aria-labelledby"
  | "aria-describedby"
  | "aria-invalid"
> & {
  value?: string;
  defaultValue?: string;
  min?: string;
  max?: string;
  readOnly?: boolean;
  timeZone?: string;
  onChange?: (value: string) => void;
};

type PickerKind = "date" | "datetime";

function datePart(value?: string) {
  const day = value?.slice(0, 10) ?? "";
  if (!/^\d{4}-\d{2}-\d{2}$/.test(day) || day < firstCalendarDate || day > lastCalendarDate)
    return "";
  const date = calendarDate(day);
  return Number.isFinite(date.getTime()) && date.toISOString().startsWith(day) ? day : "";
}

function displayValue(value: string) {
  return value.replaceAll("-", "/").replace("T", " ");
}

function timePart(value: string, limit: number) {
  return value && Number(value) < limit ? value.padStart(2, "0") : "";
}

const timeInputStyle =
  "h-10 w-15 rounded-lg border border-border-control bg-white text-center text-sm tabular-nums text-text-primary aria-invalid:border-rose-500";

function PickerPanel({
  kind,
  value,
  min,
  max,
  timeZone,
  onCommit,
}: {
  kind: PickerKind;
  value: string;
  min?: string;
  max?: string;
  timeZone?: string;
  onCommit: (value: string) => void;
}) {
  const timeId = useId();
  const activeButton = useRef<HTMLButtonElement>(null);
  const withTime = kind === "datetime";
  const [today] = useState(() => todayCalendarDate(timeZone));
  const minDay = datePart(min) || firstCalendarDate;
  const maxDay = datePart(max) || lastCalendarDate;
  const selectedDay = datePart(value);
  const initialDay = clampCalendarDate(selectedDay || today, minDay, maxDay);
  const initialTime =
    value.slice(11, 16) || (initialDay === minDay && min?.slice(11, 16)) || "00:00";
  const [active, setActive] = useState(initialDay);
  const [day, setDay] = useState(initialDay);
  const [hour, setHour] = useState(initialTime.slice(0, 2));
  const [minute, setMinute] = useState(initialTime.slice(3, 5));
  const hourValue = timePart(hour, 24);
  const minuteValue = timePart(minute, 60);
  const timestamp = day + "T" + hourValue + ":" + minuteValue;
  const timeError =
    !hourValue || !minuteValue
      ? "時は0〜23、分は0〜59で指定してください。"
      : min && timestamp < min
        ? `${displayValue(min)} 以降を指定してください。`
        : max && timestamp > max
          ? `${displayValue(max)} 以前を指定してください。`
          : "";

  function chooseDate(next: string) {
    if (withTime) setDay(next);
    else onCommit(next);
  }

  return (
    <DialogContent
      className="w-[calc(100%_-_1rem)] max-w-[23rem] gap-3 rounded-xl p-4 sm:p-5"
      overlayClassName="bg-slate-950/30"
      aria-describedby={undefined}
      onOpenAutoFocus={(event) => {
        if (!activeButton.current) return;
        event.preventDefault();
        activeButton.current.focus();
      }}
    >
      <DialogTitle className="min-h-8 pr-9 pt-2 text-base">
        {withTime ? "日時を選択" : "日付を選択"}
      </DialogTitle>
      <DatePickerCalendar
        active={active}
        selected={withTime ? day : selectedDay}
        today={today}
        min={minDay}
        max={maxDay}
        activeButton={activeButton}
        onNavigate={setActive}
        onSelect={chooseDate}
      />
      {withTime ? (
        <fieldset
          className="m-0 grid min-w-0 gap-2 border-0 border-t border-border-control px-0 pt-2"
          aria-describedby={timeError ? timeId : undefined}
        >
          <legend className="pr-2 text-xs font-semibold text-text-muted">時刻</legend>
          <div className="flex items-center gap-2">
            <input
              aria-label="時（0から23）"
              aria-invalid={Boolean(!hourValue || timeError) || undefined}
              inputMode="numeric"
              maxLength={2}
              className={timeInputStyle}
              value={hour}
              onChange={(event) => setHour(event.currentTarget.value.replace(/[^0-9]/g, ""))}
              onBlur={() => hourValue && setHour(hourValue)}
            />
            <span aria-hidden="true" className="text-text-muted">
              :
            </span>
            <input
              aria-label="分（0から59）"
              aria-invalid={Boolean(!minuteValue || timeError) || undefined}
              inputMode="numeric"
              maxLength={2}
              className={timeInputStyle}
              value={minute}
              onChange={(event) => setMinute(event.currentTarget.value.replace(/[^0-9]/g, ""))}
              onBlur={() => minuteValue && setMinute(minuteValue)}
            />
          </div>
          {timeError ? (
            <p id={timeId} role="status" className="text-xs text-rose-700">
              {timeError}
            </p>
          ) : null}
        </fieldset>
      ) : null}
      <div className="flex flex-wrap items-center gap-2 border-t border-border-control pt-3">
        <AppButton
          variant="back"
          className="h-9 px-3"
          disabled={today < minDay || today > maxDay}
          onClick={() => {
            chooseDate(today);
            if (withTime) setActive(today);
          }}
        >
          今日
        </AppButton>
        <AppButton
          variant="back"
          className="h-9 px-3"
          disabled={!value}
          onClick={() => onCommit("")}
        >
          クリア
        </AppButton>
        {withTime ? (
          <AppButton
            variant="primary"
            className="ml-auto h-9 px-4"
            disabled={Boolean(timeError) || day < minDay || day > maxDay}
            onClick={() => onCommit(timestamp)}
          >
            適用
          </AppButton>
        ) : null}
      </div>
    </DialogContent>
  );
}

function Picker({
  kind,
  value,
  defaultValue = "",
  onChange,
  min,
  max,
  timeZone,
  name,
  form,
  className,
  disabled,
  readOnly,
  "aria-describedby": describedBy,
  ...triggerProps
}: PickerProps & { kind: PickerKind }) {
  const [open, setOpen] = useState(false);
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const selectedValue = value ?? uncontrolledValue;
  const valueId = useId();
  const expanded = open && !disabled && !readOnly;
  const Icon = kind === "date" ? CalendarDays : CalendarClock;
  const placeholder = kind === "date" ? "日付を選択" : "日時を選択";
  const invalid = Boolean(
    selectedValue && ((min && selectedValue < min) || (max && selectedValue > max)),
  );

  useEffect(() => {
    if (disabled || readOnly) setOpen(false);
  }, [disabled, readOnly]);

  function commit(next: string) {
    if (next !== selectedValue) {
      if (value === undefined) setUncontrolledValue(next);
      onChange?.(next);
    }
    setOpen(false);
  }

  return (
    <Dialog open={expanded} onOpenChange={(next) => setOpen(next && !disabled && !readOnly)}>
      {name ? (
        <input type="hidden" name={name} form={form} value={selectedValue} disabled={disabled} />
      ) : null}
      <DialogTrigger asChild>
        <button
          {...triggerProps}
          type="button"
          disabled={disabled}
          aria-disabled={readOnly || undefined}
          aria-describedby={describedBy ? valueId + " " + describedBy : valueId}
          aria-invalid={triggerProps["aria-invalid"] ?? (invalid || undefined)}
          className={cn(
            "flex min-h-10 min-w-0 w-full items-center justify-between gap-2 rounded-lg border border-border-control bg-white px-3 py-2 text-left text-sm tabular-nums text-text-primary enabled:hover:border-brand-primary aria-expanded:border-brand-primary aria-invalid:border-rose-500 disabled:cursor-not-allowed disabled:bg-product-bg disabled:text-text-muted",
            className,
          )}
        >
          <span id={valueId} className={selectedValue ? undefined : "text-text-muted"}>
            {selectedValue ? displayValue(selectedValue) : placeholder}
          </span>
          <Icon size={16} aria-hidden="true" className="shrink-0 text-text-muted" />
        </button>
      </DialogTrigger>
      {expanded ? (
        <PickerPanel
          kind={kind}
          value={selectedValue}
          min={min}
          max={max}
          timeZone={timeZone}
          onCommit={commit}
        />
      ) : null}
    </Dialog>
  );
}

export function DatePicker(props: PickerProps) {
  return <Picker {...props} kind="date" />;
}

export function DateTimePicker(props: PickerProps) {
  return <Picker {...props} kind="datetime" />;
}
