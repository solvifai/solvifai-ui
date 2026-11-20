import { useEffect, useRef, useState } from "react";

import { Drawer } from "../ui/Drawer";
import { SimpleEmptyState } from "../ui/EmptyState";
import { SearchInput } from "../ui/SearchInput";
import { Table } from "../ui/Table";

const entries = [
  { name: "池のカルガモ", place: "公園", note: "池の岸で2羽が休んでいました。" },
  { name: "川沿いのカワセミ", place: "遊歩道", note: "低い枝から水面に飛び込みました。" },
  { name: "広場のハクセキレイ", place: "公園", note: "広場を尾を振りながら歩いていました。" },
];

export function ListDetailDemo() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<(typeof entries)[number] | null>(null);
  const searchInput = useRef<HTMLInputElement>(null);
  const detailHeading = useRef<HTMLHeadingElement>(null);
  const opener = useRef<HTMLButtonElement>(null);
  const term = query.trim().toLowerCase();
  const visible = entries.filter(({ name, place }) => `${name} ${place}`.toLowerCase().includes(term));

  useEffect(() => {
    if (selected) detailHeading.current?.focus();
  }, [selected]);

  return (
    <>
      <section aria-labelledby="observation-list-title" className="rounded-xl border border-catalog-line bg-white p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 id="observation-list-title" className="text-base font-bold">観察一覧</h2>
          <SearchInput
            className="w-full sm:w-60"
            ref={searchInput}
            value={query}
            onChange={setQuery}
            ariaLabel="観察記録を検索"
            placeholder="名前・場所で検索"
          />
        </div>
        <p className="mt-2 text-sm text-catalog-muted" role="status">{visible.length}件を表示</p>
        <div className="mt-2 grid gap-3 sm:flex sm:items-start">
          <Table className="min-w-0 flex-1 table-fixed" aria-label="観察記録">
            <thead>
              <tr><th scope="col">名前</th><th scope="col" className="w-20">場所</th></tr>
            </thead>
            <tbody>
              {visible.map((entry) => (
                <tr key={entry.name} data-selected={entry === selected || undefined}>
                  <th scope="row">
                    <button
                      type="button"
                      aria-label={`${entry.name}の詳細を開く`}
                      aria-expanded={entry === selected}
                      aria-controls="list-detail-demo-panel"
                      className="min-h-8 text-left font-semibold text-brand-foreground hover:underline"
                      onClick={(event) => {
                        opener.current = event.currentTarget;
                        setSelected(entry);
                        if (entry === selected) detailHeading.current?.focus();
                      }}
                    >
                      {entry.name}
                    </button>
                  </th>
                  <td>{entry.place}</td>
                </tr>
              ))}
              {visible.length === 0 && (
                <tr><td colSpan={2}><SimpleEmptyState message="一致する観察記録がありません" /></td></tr>
              )}
            </tbody>
          </Table>
          <Drawer
            id="list-detail-demo-panel"
            title="観察の詳細"
            open={selected !== null}
            className="w-full sm:w-[min(42%,18rem)]"
            onClose={() => {
              setSelected(null);
              const trigger = opener.current;
              (trigger?.isConnected ? trigger : searchInput.current)?.focus();
            }}
          >
            {selected && (
              <div className="grid gap-2 p-3">
                <h3 ref={detailHeading} tabIndex={-1} className="text-sm font-bold">{selected.name}</h3>
                <p className="text-xs text-catalog-muted">観察場所　{selected.place}</p>
                <p className="text-sm">{selected.note}</p>
              </div>
            )}
          </Drawer>
        </div>
      </section>
      <a className="source-link mt-4" href="#drawer">サイドパネルの使い方</a>
    </>
  );
}
