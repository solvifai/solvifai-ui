import { FileTypeIcon, fileTypes } from "../ui/FileTypeIcon";
import { FolderIcon } from "../ui/FolderIcon";
import { PinIcon } from "../ui/PinIcon";
import * as commonIcons from "../ui/icons";
import * as sidebarIcons from "../ui/sidebar-icons";

export const icons = { ...commonIcons, ...sidebarIcons, FileTypeIcon, FolderIcon, PinIcon };

type IconGroup = {
  label: string;
  entries: readonly (readonly [
    label: string,
    name: keyof typeof icons,
    extensions?: readonly string[],
  ])[];
};

export const iconGroups: readonly IconGroup[] = [
  {
    label: "操作",
    entries: [
      ["追加", "PlusIcon"],
      ["追加（丸枠）", "PlusCircleIcon"],
      ["検索", "SearchIcon"],
      ["選択済み", "CheckIcon"],
      ["閉じる", "CloseIcon"],
      ["更新", "RefreshIcon"],
      ["削除", "TrashIcon"],
      ["コピー", "CopyIcon"],
      ["並び替え", "ArrowDownUpIcon"],
      ["右矢印", "ArrowRightIcon"],
      ["戻る", "BackIcon"],
      ["前へ", "ChevronLeftIcon"],
      ["次へ", "ChevronRightIcon"],
      ["展開", "ChevronDownIcon"],
      ["上下の選択肢", "ChevronsUpDownIcon"],
      ["別画面で開く", "OpenIcon"],
      ["ピン留め", "PinIcon"],
    ],
  },
  {
    label: "表示・状態",
    entries: [
      ["読み込み", "SpinnerIcon"],
      ["時刻", "ClockIcon"],
      ["表示", "EyeIcon"],
      ["非表示", "EyeOffIcon"],
      ["全画面", "FullscreenIcon"],
      ["エラー", "ErrorCircleIcon"],
      ["グリッド", "GridIcon"],
      ["グリッド表示", "GridViewIcon"],
      ["サイドバー表示", "SidebarIcon"],
      ["レイアウト", "LayoutIcon"],
      ["均等に分割", "SplitEqualIcon"],
      ["片側を強調", "SplitFocusIcon"],
    ],
  },
  {
    label: "資料・データ",
    entries: [
      ["資料", "DocumentIcon"],
      ["ファイル", "FileIcon"],
      ["フォルダ", "FolderIcon"],
      ["ダウンロード", "DownloadIcon"],
      ["アップロード", "UploadIcon"],
      ["添付", "PaperclipIcon"],
      ["資料（グラデーション）", "DocumentGradientIcon"],
      ["アップロード（グラデーション）", "UploadGradientIcon"],
      ["データベース", "DatabaseGradientIcon"],
      ["議事録", "MinuteGradientIcon"],
      ["情報マークをエクスポート", "InfomarkExportIcon"],
    ],
  },
  {
    label: "会話・AI",
    entries: [
      ["チャット", "ChatIcon"],
      ["音声入力", "MicrophoneIcon"],
      ["送信", "SendIcon"],
      ["ヒント", "LightbulbIcon"],
    ],
  },
  {
    label: "ファイル形式",
    entries: fileTypes.map(({ label, extensions }) => [label, "FileTypeIcon", extensions]),
  },
  {
    label: "サイドバー",
    entries: [
      ["成果物", "IconDeliverableV2"],
      ["成果物（単体）", "IconDeliverable"],
      ["チャット", "IconChat"],
      ["資料", "IconDocument"],
      ["ダッシュボード", "IconDashboard"],
      ["設定", "IconGear"],
      ["タスク", "IconTask"],
      ["フォルダ", "IconFolder"],
      ["上下を切り替え", "IconChevronUpDown"],
      ["サイドバーを閉じる", "IconChevronLeft"],
      ["ユーザー", "IconUserDefault"],
      ["フォルダ（線）", "IconFolderOutline"],
      ["フォルダを開く", "IconFolderOpen"],
      ["版履歴", "IconVersionHistory"],
      ["追加", "IconPlusSidebar"],
    ],
  },
];
