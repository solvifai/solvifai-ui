import { ArrowDownToLine, ArrowUpRight } from "lucide-react";

import { useState } from "react";

import { SearchInput } from "../ui/SearchInput";
import { SimpleEmptyState } from "../ui/EmptyState";
import { iconGroups, icons } from "./iconGroups";

export const brandSymbolUrl = import.meta.env.BASE_URL + "solvifai-symbol.svg";

const brandAssets = [
  { label: "シンボル", url: brandSymbolUrl, filename: "solvifai-symbol.svg", format: "SVG" },
  {
    label: "ロゴ",
    url: import.meta.env.BASE_URL + "solvifai-logo.svg",
    filename: "solvifai-logo.svg",
    format: "SVG",
  },
  {
    label: "ファビコン",
    url: import.meta.env.BASE_URL + "favicon.png",
    filename: "solvifai-favicon.png",
    format: "PNG",
  },
];

const filters = ["すべて", ...iconGroups.map(({ label }) => label)] as const;

export function Icons({ sourceBase }: { sourceBase: string }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<(typeof filters)[number]>("すべて");
  const search = query.trim().toLowerCase();
  const groups = iconGroups
    .filter(({ label }) => filter === "すべて" || label === filter)
    .map(({ label, entries }) => ({
      label,
      entries: entries.filter(([name, component, extensions]) =>
        `${name} ${component} ${label} ${extensions?.map((ext) => `.${ext}`).join(" ") ?? ""}`
          .toLowerCase()
          .includes(search),
      ),
    }))
    .filter(({ entries }) => entries.length > 0);
  const count = groups.reduce((total, { entries }) => total + entries.length, 0);

  return (
    <div className="document-page">
      <header className="document-heading">
        <h1>SolvifAIアイコン</h1>
        <p>SolvifAIのブランド素材と、製品画面で使っている共通アイコンです。</p>
      </header>
      <section className="document-section">
        <h2>ブランド素材</h2>
        <div className="token-grid">
          {brandAssets.map(({ label, url, filename, format }) => (
            <div className="token" key={filename}>
              <div className="flex h-28 items-center justify-center bg-product-bg px-3">
                <img
                  src={url}
                  alt={`SolvifAIの${label}`}
                  className="h-14 w-36 max-w-full object-contain"
                />
              </div>
              <div>
                <strong>{label}</strong>
                <a
                  className="flex items-center gap-2 text-xs font-semibold text-catalog-blue hover:underline"
                  href={url}
                  download={filename}
                  aria-label={`${label}を${format}で保存`}
                >
                  <ArrowDownToLine size={14} aria-hidden="true" />
                  {format}を保存
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="document-section" aria-labelledby="icon-list-title">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 id="icon-list-title" className="!mb-0">
            共通UIアイコン
          </h2>
          <SearchInput
            className="catalog-search"
            value={query}
            onChange={setQuery}
            ariaLabel="アイコンを検索"
            placeholder="名前・用途で検索"
          />
        </div>
        <div className="filters" role="group" aria-label="アイコンの分類">
          {filters.map((label) => (
            <button
              key={label}
              type="button"
              aria-pressed={filter === label}
              onClick={() => setFilter(label)}
            >
              {label}
            </button>
          ))}
          <span className="result-count" role="status">
            {count}件
          </span>
        </div>
        {count === 0 ? (
          <SimpleEmptyState
            message="一致するアイコンがありません"
            subMessage="別の名前や用途で検索してください。"
          />
        ) : (
          groups.map(({ label, entries }) => (
            <section className="mt-6" key={label}>
              <h3 className="mb-3 text-sm font-semibold">{label}</h3>
              <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                {entries.map(([name, component, extensions]) => {
                  const Icon = icons[component];
                  return (
                    <article className="token" key={name + component}>
                      <div
                        className="flex h-16 items-center justify-center bg-product-bg text-catalog-ink"
                        aria-hidden="true"
                      >
                        <Icon
                          className="size-6"
                          active
                          extension={extensions?.[0]}
                          nativeTooltip={false}
                        />
                      </div>
                      <div>
                        <strong>{name}</strong>
                        <code>
                          {extensions
                            ? extensions
                                .slice(0, 3)
                                .map((ext) => `.${ext}`)
                                .join(" / ") || "形式不明・その他"
                            : component}
                        </code>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          ))
        )}
        <div className="flex flex-wrap gap-x-5">
          <a className="source-link" href={sourceBase + "/icons.tsx"}>
            共通アイコンのReact実装
            <ArrowUpRight size={15} aria-hidden="true" />
          </a>
          <a className="source-link" href={sourceBase + "/FileTypeIcon.tsx"}>
            ファイル形式アイコンのReact実装
            <ArrowUpRight size={15} aria-hidden="true" />
          </a>
          <a className="source-link" href={sourceBase + "/sidebar-icons.tsx"}>
            サイドバーアイコンのReact実装
            <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </div>
      </section>
    </div>
  );
}
