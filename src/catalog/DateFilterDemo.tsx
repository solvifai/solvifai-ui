import { useRef, useState } from "react";

import { AppButton } from "../ui/AppButton";
import { DatePicker } from "../ui/DatePicker";
import { SimpleEmptyState } from "../ui/EmptyState";
import { FormField } from "../ui/FormField";
import { Table } from "../ui/Table";

const firstDate = "2026-11-01";
const lastDate = "2026-11-30";
const entries = [
  { name: "秋の写真", date: "2026-11-02" },
  { name: "野鳥の記録", date: "2026-11-08" },
  { name: "図書館のメモ", date: "2026-11-12" },
  { name: "花の観察ノート", date: "2026-11-18" },
  { name: "散歩の地図", date: "2026-11-23" },
  { name: "星空のスケッチ", date: "2026-11-29" },
];

export function DateFilterDemo() {
  const [start, setStart] = useState("2026-11-08");
  const [end, setEnd] = useState("2026-11-18");
  const startPicker = useRef<HTMLButtonElement>(null);
  const invalid = Boolean(start && end && start > end);
  const visible = entries.filter(({ date }) => (!start || date >= start) && (!end || date <= end));

  return (
    <>
      <section
        aria-labelledby="date-filter-heading"
        className="mt-2 grid gap-4 rounded-xl border border-catalog-line bg-white p-4 sm:p-5"
      >
        <div>
          <h2 id="date-filter-heading" className="text-base font-bold">記録一覧</h2>
          <p className="mt-1 text-sm text-catalog-muted">2026年11月のサンプル</p>
        </div>
        <div className="grid items-end gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto]">
          <FormField label="開始日" htmlFor="demo-date-start">
            <DatePicker
              id="demo-date-start"
              ref={startPicker}
              value={start}
              min={firstDate}
              max={lastDate}
              onChange={setStart}
            />
          </FormField>
          <FormField label="終了日" htmlFor="demo-date-end">
            <DatePicker
              id="demo-date-end"
              value={end}
              min={start || firstDate}
              max={lastDate}
              onChange={setEnd}
              aria-invalid={invalid || undefined}
              aria-describedby={invalid ? "demo-date-error" : undefined}
            />
          </FormField>
          <AppButton
            variant="back"
            className="justify-self-start"
            disabled={!start && !end}
            onClick={() => {
              setStart("");
              setEnd("");
              startPicker.current?.focus();
            }}
          >
            期間を解除
          </AppButton>
        </div>
        {invalid && (
          <p id="demo-date-error" role="alert" className="text-sm text-rose-700">
            終了日は開始日以降を選んでください。
          </p>
        )}
        <p role="status" className={invalid ? "sr-only" : "text-sm text-catalog-muted"}>
          {invalid ? "" : `${entries.length}件中 ${visible.length}件を表示`}
        </p>
        {!invalid && (
          <Table aria-label="サンプルの記録" className="table-fixed">
            <thead>
              <tr>
                <th scope="col">名前</th>
                <th scope="col" className="w-29 sm:w-36">記録日</th>
              </tr>
            </thead>
            <tbody>
              {visible.map(({ name, date }) => (
                <tr key={name}>
                  <th scope="row">{name}</th>
                  <td><time dateTime={date}>{date.replaceAll("-", "/")}</time></td>
                </tr>
              ))}
              {visible.length === 0 && (
                <tr>
                  <td colSpan={2}><SimpleEmptyState message="この期間に記録はありません" /></td>
                </tr>
              )}
            </tbody>
          </Table>
        )}
      </section>
      <div className="mt-4 flex flex-wrap gap-x-5">
        <a className="source-link" href="#date-picker">日付入力の使い方</a>
        <a className="source-link" href="#table">テーブルの使い方</a>
      </div>
    </>
  );
}
