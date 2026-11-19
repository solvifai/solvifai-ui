import { ArrowDownToLine, ArrowUpRight, Shapes } from "lucide-react";

import {
  CheckIcon,
  ChevronDownIcon,
  DocumentIcon,
  DownloadIcon,
  PlusIcon,
  SearchIcon,
  TrashIcon,
  UploadIcon,
} from "../ui/icons";

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

const productIcons = [
  { label: "追加", name: "PlusIcon", Icon: PlusIcon },
  { label: "検索", name: "SearchIcon", Icon: SearchIcon },
  { label: "資料", name: "DocumentIcon", Icon: DocumentIcon },
  { label: "選択済み", name: "CheckIcon", Icon: CheckIcon },
  { label: "展開", name: "ChevronDownIcon", Icon: ChevronDownIcon },
  { label: "アップロード", name: "UploadIcon", Icon: UploadIcon },
  { label: "ダウンロード", name: "DownloadIcon", Icon: DownloadIcon },
  { label: "削除", name: "TrashIcon", Icon: TrashIcon },
];

export function Icons({ sourceHref }: { sourceHref: string }) {
  return (
    <div className="document-page">
      <header className="document-heading">
        <span className="document-kicker">
          <Shapes size={18} aria-hidden="true" /> 基本要素
        </span>
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
      <section className="document-section">
        <h2>共通UIアイコン</h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {productIcons.map(({ label, name, Icon }) => (
            <div className="token" key={name}>
              <div className="flex h-16 items-center justify-center bg-product-bg text-catalog-ink">
                <Icon className="size-6" />
              </div>
              <div>
                <strong>{label}</strong>
                <code>{name}</code>
              </div>
            </div>
          ))}
        </div>
        <a className="source-link" href={sourceHref}>
          React実装をGitHubで見る
          <ArrowUpRight size={15} aria-hidden="true" />
        </a>
      </section>
    </div>
  );
}
