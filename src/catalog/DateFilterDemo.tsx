import { useState } from "react";

import { DateTimePicker } from "../ui/DatePicker";
import { SimpleEmptyState } from "../ui/EmptyState";

const entries = [
  { name: "秋の写真", at: "2026-11-02T09:00" },
  { name: "野鳥の記録", at: "2026-11-08T12:15" },
  { name: "図書館のメモ", at: "2026-11-12T09:20" },
  { name: "花の観察ノート", at: "2026-11-18T14:05" },
  { name: "散歩の地図", at: "2026-11-23T15:50" },
];

function shiftMinute(value: string, amount: number) {
  const millis = new Date(value + "Z").getTime() + amount * 60_000;
  return new Date(millis).toISOString().slice(0, 16);
}

export function DateFilterDemo() {
  const [{ startAt, endAt }, setRange] = useState({
    startAt: "2026-11-08T00:00", endAt: "2026-11-18T23:59",
  });
  const visible = entries.filter(({ at }) => (!startAt || at >= startAt) && (!endAt || at <= endAt));

  function change(field: "startAt" | "endAt", value: string) {
    setRange((current) => {
      const range = { ...current, [field]: value };
      if (range.startAt && range.endAt && range.startAt >= range.endAt) {
        if (field === "startAt") range.endAt = shiftMinute(value, 1);
        else range.startAt = shiftMinute(value, -1);
      }
      return range;
    });
  }

  return (
    <section aria-label="期間フィルターの例" className="grid gap-3 rounded-xl border border-catalog-line bg-white p-4">
      <div className="flex flex-wrap items-center gap-2 rounded-lg border border-border-primary bg-white px-3 py-2">
        <span id="filter-zone" className="text-sm text-text-secondary">日時（日本時間）</span>
        <DateTimePicker aria-label="開始日時" aria-describedby="filter-zone" value={startAt}
          onChange={(event) => change("startAt", event.currentTarget.value)} />
        <span aria-hidden="true" className="text-text-secondary">〜</span>
        <DateTimePicker aria-label="終了日時" aria-describedby="filter-zone" value={endAt}
          onChange={(event) => change("endAt", event.currentTarget.value)} />
      </div>
      <p role="status" className="text-sm text-catalog-muted">{visible.length}件を表示</p>
      {visible.length ? (
        <ul className="divide-y divide-catalog-line">
          {visible.map(({ name, at }) => (
            <li key={name} className="flex flex-wrap items-center justify-between gap-2 py-2 text-sm">
              <span>{name}</span>
              <time dateTime={at} className="text-text-secondary">{at.replace("T", " ")}</time>
            </li>
          ))}
        </ul>
      ) : <SimpleEmptyState message="この期間に記録はありません" />}
    </section>
  );
}
