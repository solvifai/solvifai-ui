import { useId, useState } from "react";

import { DateTimePicker } from "./DatePicker";

type Range = { startAt: string; endAt: string };

const tokyoFormatter = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Asia/Tokyo",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

function tokyoDateTime(date = new Date()) {
  const { year, month, day, hour, minute } = Object.fromEntries(
    tokyoFormatter.formatToParts(date).map(({ type, value }) => [type, value]),
  );
  return `${year}-${month}-${day}T${hour}:${minute}`;
}

function shiftMinute(value: string, minutes: number) {
  const seconds = value.length === 16 ? ":00" : "";
  const time = Date.parse(`${value}${seconds}+09:00`);
  return tokyoDateTime(new Date(time + minutes * 60_000));
}

export function DateTimeRange({ value, onChange }: {
  value: Range;
  onChange: (value: Range) => void;
}) {
  const [nowAt, setNowAt] = useState(tokyoDateTime);
  const zoneId = useId();

  function change(field: keyof Range, input: string) {
    const now = tokyoDateTime();
    const max = field === "startAt" ? shiftMinute(now, -1) : now;
    const next = input > max ? max : input;
    const range = { ...value, [field]: next };
    if (range.startAt && range.endAt && range.startAt >= range.endAt) {
      if (field === "startAt") range.endAt = shiftMinute(next, 1);
      else range.startAt = shiftMinute(next, -1);
    }
    setNowAt(now);
    onChange(range);
  }

  return (
    <div className="flex min-w-0 flex-wrap items-center gap-2 rounded-lg border border-border-primary bg-white px-3 py-2">
      <span id={zoneId} className="text-sm text-text-secondary">日時（日本時間）</span>
      <DateTimePicker
        aria-label="開始日時"
        aria-describedby={zoneId}
        value={value.startAt}
        max={shiftMinute(nowAt, -1)}
        onFocus={() => setNowAt(tokyoDateTime())}
        onChange={(event) => change("startAt", event.currentTarget.value)}
      />
      <span aria-hidden="true" className="text-text-secondary">〜</span>
      <DateTimePicker
        aria-label="終了日時"
        aria-describedby={zoneId}
        value={value.endAt}
        max={nowAt}
        onFocus={() => setNowAt(tokyoDateTime())}
        onChange={(event) => change("endAt", event.currentTarget.value)}
      />
    </div>
  );
}
