import { Cloud, ListChecks, RotateCw, Search } from "lucide-react";

import { AutosaveDemo } from "./AutosaveDemo";
import { FileList } from "./FileList";
import { LoadingRetryDemo } from "./LoadingRetryDemo";

export const patterns = [
  {
    href: "#file-list",
    label: "複数選択と一括削除",
    icon: ListChecks,
    description:
      "ファイルを複数選び、まとめて削除する前に対象を確認できます。選択は検索やページ送りをしても保持されます。",
    demo: <FileList />,
  },
  {
    href: "#pattern-search-empty",
    label: "検索結果が0件",
    icon: Search,
    description:
      "一致するファイルがないときに、結果が0件であることと次にできる操作を表示します。検索をクリアすると一覧に戻ります。",
    demo: <FileList initialQuery="見本にない名前" />,
  },
  {
    href: "#pattern-loading-retry",
    label: "読み込み失敗と再試行",
    icon: RotateCw,
    description: "最初の読み込みが失敗するデモです。「再試行」を押すとサンプルの一覧を表示します。",
    demo: <LoadingRetryDemo />,
  },
  {
    href: "#pattern-autosave",
    label: "自動保存",
    icon: Cloud,
    description: "メモを書くと、入力が止まってからこのブラウザに自動保存されます。保存失敗と再試行も試せます。",
    demo: <AutosaveDemo />,
  },
];

export function PatternPage({
  pattern: { label, icon: Icon, description, demo },
}: {
  pattern: (typeof patterns)[number];
}) {
  return (
    <div className="document-page">
      <header className="document-heading">
        <span className="document-kicker">
          <Icon size={18} aria-hidden="true" /> Patterns
        </span>
        <h1>{label}</h1>
        <p>{description}</p>
      </header>
      {demo}
    </div>
  );
}
