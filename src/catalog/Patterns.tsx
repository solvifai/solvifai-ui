import { Bell, CalendarRange, Cloud, ListChecks, PanelLeft, RotateCw, Search, Upload } from "lucide-react";

import { AutosaveDemo } from "./AutosaveDemo";
import { DateFilterDemo } from "./DateFilterDemo";
import { FileList } from "./FileList";
import { LoadingRetryDemo } from "./LoadingRetryDemo";
import { NotificationDemo } from "./NotificationDemo";
import { SideNavDemo } from "./SideNavDemo";
import { UploadDemo } from "./UploadDemo";
import { sourceUrl } from "./sources";

const dataManagement = "features/data-utilization/DataManagementPage.tsx";

export const patterns = [
  {
    href: "#file-list", label: "複数選択と一括削除", icon: ListChecks,
    description: "行を選ぶと、一括操作のメニューから削除を確認できます。",
    source: dataManagement, demo: <FileList />,
  },
  {
    href: "#pattern-search-empty", label: "検索結果が0件", icon: Search,
    description: "検索条件に一致する項目がない場合の表示です。検索欄を空にすると全件に戻ります。",
    source: dataManagement, demo: <FileList initialQuery="見本にない名前" />,
  },
  {
    href: "#pattern-loading-retry", label: "読み込み失敗と再読み込み", icon: RotateCw,
    description: "最初の読み込みが失敗するデモです。再読み込みでサンプル一覧を表示します。",
    source: dataManagement, demo: <LoadingRetryDemo />,
  },
  {
    href: "#pattern-autosave", label: "自動保存", icon: Cloud,
    description: "最後の編集から5秒後にこのブラウザへ保存します。失敗しても入力は残り、編集を再開すると保存を試みます。",
    source: "routes/sheet/$id/-features/-hooks/useSheetAutoSave.ts", demo: <AutosaveDemo />,
  },
  {
    href: "#pattern-file-upload", label: "複数ファイル追加", icon: Upload,
    description: "ファイルを複数選び、一括追加します。デモではファイル名だけを表示します。",
    source: dataManagement, demo: <UploadDemo />,
  },
  {
    href: "#pattern-date-filter", label: "日時フィルター", icon: CalendarRange,
    description: "ブラウザ標準の日時入力で絞り込みます。開始と終了が逆転すると、もう一方を1分ずらして調整します。",
    source: "routes/settings/log-info.tsx", demo: <DateFilterDemo />,
  },
  {
    href: "#pattern-app-header", label: "通知ドロップダウン", icon: Bell,
    description: "通知ボタンで未読件数を確認し、一覧を開いて既読にできます。",
    source: "components/layout/NotificationDropdown.tsx", demo: <NotificationDemo />,
  },
  {
    href: "#pattern-side-nav", label: "折りたためるサイドナビ", icon: PanelLeft,
    description: "サイドナビをアイコンだけの幅に切り替えられます。現在地の強調とサブメニューも確認できます。",
    source: "components/layout/Sidebar.tsx", demo: <SideNavDemo />,
  },
];

export function PatternPage({
  pattern: { label, icon: Icon, description, demo, source },
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
      <a className="source-link mt-5" href={sourceUrl(source)}>SolvifAI本体の実装元（権限が必要）</a>
    </div>
  );
}
