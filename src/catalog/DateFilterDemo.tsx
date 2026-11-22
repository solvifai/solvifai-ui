import { useState } from "react";

import { DateTimeRange } from "../ui/DateTimeRange";
import { SimpleEmptyState } from "../ui/EmptyState";

const entries = [
  { name: "秋の写真", at: "2026-11-02T09:00" },
  { name: "野鳥の記録", at: "2026-11-08T12:15" },
  { name: "図書館のメモ", at: "2026-11-12T09:20" },
  { name: "花の観察ノート", at: "2026-11-18T14:05" },
  { name: "散歩の地図", at: "2026-11-21T15:50" },
];

export function DateFilterDemo() {
  const [range, setRange] = useState({
    startAt: "2026-11-08T00:00", endAt: "2026-11-18T23:59",
  });
  const { startAt, endAt } = range;
  const visible = entries.filter(({ at }) => (!startAt || at >= startAt) && (!endAt || at <= endAt));

  return (
    <section aria-label="期間フィルターの例" className="grid gap-3 rounded-xl border border-catalog-line bg-white p-4">
      <DateTimeRange value={range} onChange={setRange} />
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
