import { ArrowDown, ArrowLeft, ArrowUp, FileText, Plus } from "lucide-react";
import { useId, useState } from "react";

import { AppButton } from "../ui/AppButton";
import { AvatarGroup, type AvatarGroupMember } from "../ui/AvatarGroup";
import { Badge } from "../ui/Badge";
import { Checkbox } from "../ui/Checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "../ui/Dialog";
import { SimpleEmptyState } from "../ui/EmptyState";
import { FileChipList, type SelectedFile } from "../ui/FileChipList";
import { FileTypeIcon } from "../ui/FileTypeIcon";
import { FormField } from "../ui/FormField";
import { CheckIcon, CopyIcon, EyeIcon, EyeOffIcon, TrashIcon } from "../ui/icons";
import { LoadingSpinner } from "../ui/LoadingSpinner";
import { OptionGroup, type OptionGroupOption } from "../ui/OptionGroup";
import { RowActionMenu } from "../ui/RowActionMenu";
import { SaveStatusIndicator, type SaveStatus } from "../ui/SaveStatusIndicator";
import { SearchInput } from "../ui/SearchInput";
import { SelectBox, type SelectBoxOption } from "../ui/SelectBox";
import { Table } from "../ui/Table";
import { Tabs, type TabItem } from "../ui/Tabs";
import { TablePagination } from "../ui/TablePagination";
import { SimpleBreadcrumb } from "../ui/SimpleBreadcrumb";
import { TextInput } from "../ui/TextInput";
import { AppToaster, toast } from "../ui/Toast";
import { Tooltip } from "../ui/Tooltip";

function ButtonPreview() {
  const [status, setStatus] = useState("");
  return (
    <div className="demo-stack">
      <div className="demo-row">
        <AppButton variant="primary" onClick={() => setStatus("保存しました")}>
          保存する
        </AppButton>
        <AppButton onClick={() => setStatus("キャンセルしました")}>キャンセル</AppButton>
        <AppButton
          variant="back"
          iconLeft={<ArrowLeft size={15} />}
          onClick={() => setStatus("戻る操作を選びました")}
        >
          戻る
        </AppButton>
        <AppButton variant="primary" disabled>
          保存する
        </AppButton>
      </div>
      <p className="demo-output" role="status">
        {status}
      </p>
    </div>
  );
}

function TextPreview() {
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("月次レポート");
  const [email, setEmail] = useState("sample");
  const id = useId();
  const invalid = !email.includes("@");
  return (
    <div className="demo-form">
      <FormField label="プロジェクト名" htmlFor={id + "-name"}>
        <TextInput id={id + "-name"} value={value} onChange={setValue} placeholder="例：商品企画" />
      </FormField>
      <FormField label="資料名" htmlFor={id + "-title"}>
        <TextInput id={id + "-title"} value={title} onChange={setTitle} />
      </FormField>
      <FormField label="メールアドレス" htmlFor={id + "-email"}>
        <TextInput
          id={id + "-email"}
          value={email}
          onChange={setEmail}
          invalid={invalid}
          describedBy={invalid ? id + "-error" : undefined}
        />
        {invalid ? (
          <p id={id + "-error"} className="demo-error">
            メールアドレスに @ を含めてください。
          </p>
        ) : null}
      </FormField>
      <FormField label="作成者" htmlFor={id + "-owner"}>
        <TextInput id={id + "-owner"} value="山田 花子" disabled />
      </FormField>
    </div>
  );
}

const sampleDocuments = ["月次レポート", "プロジェクト計画書", "議事録"];

function SearchPreview() {
  const [query, setQuery] = useState("");
  const visible = sampleDocuments.filter((title) => title.includes(query.trim()));
  return (
    <div className="demo-search">
      <SearchInput
        value={query}
        onChange={setQuery}
        ariaLabel="資料名で検索"
        placeholder="資料名で検索"
      />
      {visible.length ? (
        <ul className="demo-list">
          {visible.map((title) => (
            <li key={title}>
              <FileText size={16} aria-hidden="true" />
              {title}
            </li>
          ))}
        </ul>
      ) : (
        <SimpleEmptyState
          message="検索結果がありません"
          subMessage="別のキーワードで検索してください。"
        />
      )}
    </div>
  );
}

const sortOptions = [
  { value: "recent", label: "新しい順" },
  { value: "oldest", label: "古い順" },
  { value: "name", label: "名前順" },
] satisfies SelectBoxOption[];
const viewOptions = [
  { value: "list", label: "一覧" },
  { value: "grid", label: "グリッド" },
] satisfies SelectBoxOption[];
const categoryOptions = [
  { value: "report", label: "レポート" },
  { value: "minutes", label: "議事録" },
] satisfies SelectBoxOption[];
const permissionOptions = [{ value: "read", label: "閲覧のみ" }] satisfies SelectBoxOption[];

function SelectBoxPreview() {
  const [sort, setSort] = useState("");
  const [view, setView] = useState("list");
  const [category, setCategory] = useState("");
  const id = useId();
  const invalid = category === "";

  return (
    <div className="demo-form">
      <FormField label="並び順" htmlFor={id + "-sort"}>
        <SelectBox id={id + "-sort"} options={sortOptions} value={sort} onChange={setSort} />
      </FormField>
      <FormField label="表示形式" htmlFor={id + "-view"}>
        <SelectBox id={id + "-view"} options={viewOptions} value={view} onChange={setView} />
      </FormField>
      <FormField label="カテゴリ（必須）" htmlFor={id + "-category"}>
        <SelectBox
          id={id + "-category"}
          options={categoryOptions}
          value={category}
          onChange={setCategory}
          invalid={invalid}
          describedBy={invalid ? id + "-error" : undefined}
          required
        />
        {invalid ? (
          <p id={id + "-error"} className="demo-error">
            カテゴリを選択してください。
          </p>
        ) : null}
      </FormField>
      <FormField label="アクセス権限" htmlFor={id + "-permission"}>
        <SelectBox
          id={id + "-permission"}
          options={permissionOptions}
          value="read"
          onChange={() => {}}
          disabled
        />
      </FormField>
    </div>
  );
}

function CheckboxPreview() {
  const [selected, setSelected] = useState([true, false]);
  const allChecked = selected.every(Boolean);
  const someChecked = selected.some(Boolean);
  return (
    <div className="demo-checklist">
      <div>
        <Checkbox
          checked={allChecked}
          indeterminate={someChecked && !allChecked}
          onChange={() => setSelected([!allChecked, !allChecked])}
          ariaLabel="すべて選択"
        />
        <span>すべて選択</span>
      </div>
      {sampleDocuments.slice(0, 2).map((name, index) => (
        <div key={name}>
          <Checkbox
            checked={selected[index]}
            onChange={() =>
              setSelected((values) =>
                values.map((checked, item) => (item === index ? !checked : checked)),
              )
            }
            ariaLabel={name}
          />
          <span>{name}</span>
        </div>
      ))}
      <div>
        <Checkbox checked={false} disabled onChange={() => {}} ariaLabel="閲覧専用の資料" />
        <span>閲覧専用の資料</span>
      </div>
    </div>
  );
}

function BadgePreview() {
  return (
    <div className="demo-row">
      <Badge label="処理中" color="blue" />
      <Badge label="完了" color="green" />
      <Badge label="エラー" color="red" />
      <Badge label="要確認" color="orange" />
      <Badge label="テンプレート" color="purple" />
      <Badge label="下書き" color="gray" />
    </div>
  );
}

function DialogPreview() {
  const [status, setStatus] = useState("");
  return (
    <div className="demo-stack">
      <Dialog>
        <DialogTrigger asChild>
          <AppButton variant="primary">公開を確認</AppButton>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle className="pr-8">資料を公開しますか？</DialogTitle>
          <DialogDescription>公開すると、チームのメンバーが閲覧できます。</DialogDescription>
          <DialogFooter>
            <DialogClose asChild>
              <AppButton>キャンセル</AppButton>
            </DialogClose>
            <DialogClose asChild>
              <AppButton variant="primary" onClick={() => setStatus("公開しました")}>
                公開する
              </AppButton>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <p className="demo-output" role="status">
        {status}
      </p>
    </div>
  );
}

function SpinnerPreview() {
  return (
    <div className="demo-row demo-spinners">
      <div>
        <LoadingSpinner size="sm" />
        <small>Small</small>
      </div>
      <div>
        <LoadingSpinner size="md" />
        <small>Medium</small>
      </div>
      <div>
        <LoadingSpinner size="lg" />
        <small>Large</small>
      </div>
    </div>
  );
}

function EmptyPreview() {
  return (
    <SimpleEmptyState
      message="資料がありません"
      subMessage="最初の資料を追加すると、ここに表示されます。"
    />
  );
}

function BreadcrumbPreview() {
  return (
    <SimpleBreadcrumb
      items={[
        { label: "カタログ", href: "#components" },
        { label: "ナビゲーション", href: "#category-navigation" },
        { label: "パンくず" },
      ]}
    />
  );
}

function RowActionMenuPreview() {
  const [feedback, setFeedback] = useState("");
  return (
    <div className="w-full max-w-sm">
      <div className="divide-y divide-catalog-line rounded-lg border border-catalog-line bg-white px-3">
        <div className="flex min-h-12 items-center gap-2.5">
          <FileTypeIcon extension="xlsx" nativeTooltip={false} />
          <span className="min-w-0 flex-1 truncate text-sm">月次レポート.xlsx</span>
          <RowActionMenu
            title="月次レポート.xlsx"
            actions={[
              {
                label: "ファイル名をコピー",
                icon: <CopyIcon />,
                onSelect: () => setFeedback("ファイル名をコピーする操作を選びました。"),
              },
              {
                label: "削除",
                icon: <TrashIcon />,
                actionClassName: "text-rose-700 hover:bg-rose-50 focus-visible:ring-rose-600",
                onSelect: () => setFeedback("削除する操作を選びました。"),
              },
            ]}
          />
        </div>
        <div className="flex min-h-12 items-center gap-2.5">
          <FileTypeIcon extension="pdf" nativeTooltip={false} />
          <span className="min-w-0 flex-1 truncate text-sm text-text-muted">閲覧専用.pdf</span>
          <RowActionMenu title="閲覧専用.pdf" actions={[]} disabled />
        </div>
      </div>
      <p className="demo-output mt-3" role="status">
        {feedback}
      </p>
    </div>
  );
}

function PaginationPreview() {
  const [page, setPage] = useState(1);
  return (
    <div className="grid w-full max-w-lg gap-3">
      <div className="rounded-lg border border-catalog-line bg-white">
        <TablePagination page={page} perPage={5} total={13} onPageChange={setPage} />
      </div>
      <div className="rounded-lg border border-catalog-line bg-white">
        <TablePagination page={1} perPage={5} total={0} onPageChange={() => {}} />
      </div>
    </div>
  );
}

const previewRows = [
  { id: 1, name: "月次レポート", updated: "11/18", status: "完了" },
  { id: 2, name: "提案書", updated: "11/15", status: "確認中" },
  { id: 3, name: "定例会の議事録", updated: "11/12", status: "完了" },
];

function TablePreview() {
  const [order, setOrder] = useState<"ascending" | "descending">("descending");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [empty, setEmpty] = useState(false);
  const rows = order === "descending" ? previewRows : [...previewRows].reverse();
  const SortIcon = order === "descending" ? ArrowDown : ArrowUp;

  return (
    <div className="grid w-full max-w-lg gap-3">
      <div className="overflow-x-auto rounded-lg border border-catalog-line bg-white">
        <Table aria-label="資料一覧の例">
          <thead>
            <tr>
              <th scope="col" className="w-9">
                <span className="sr-only">行選択</span>
              </th>
              <th scope="col">資料名</th>
              <th scope="col" aria-sort={order}>
                <button
                  type="button"
                  className="inline-flex items-center gap-1 rounded"
                  onClick={() => setOrder(order === "descending" ? "ascending" : "descending")}
                >
                  更新日
                  <SortIcon size={13} aria-hidden="true" />
                </button>
              </th>
              <th scope="col">状態</th>
            </tr>
          </thead>
          <tbody>
            {empty ? (
              <tr>
                <td colSpan={4}>
                  <SimpleEmptyState message="資料がありません" />
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row.id} data-selected={selectedId === row.id || undefined}>
                  <td>
                    <Checkbox
                      checked={selectedId === row.id}
                      onChange={() => setSelectedId(selectedId === row.id ? null : row.id)}
                      ariaLabel={`${row.name}を選択`}
                    />
                  </td>
                  <th scope="row" className="font-medium">
                    {row.name}
                  </th>
                  <td>{row.updated}</td>
                  <td>
                    <Badge label={row.status} color={row.status === "完了" ? "green" : "blue"} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>
      <div>
        <AppButton variant="back" onClick={() => setEmpty(!empty)}>
          {empty ? "サンプル行を表示" : "0件を表示"}
        </AppButton>
      </div>
    </div>
  );
}

const attachmentFiles: readonly SelectedFile[] = [
  { id: "a", name: "月次レポート.xlsx", source: "local" },
  { id: "b", name: "共有用_下期事業計画と各チームの重要アクション一覧.docx", source: "document" },
  { id: "c", name: "定例会の議事録", source: "minute" },
];

function FileChipListPreview() {
  const [files, setFiles] = useState(attachmentFiles);

  return (
    <div className="grid w-full max-w-lg gap-3">
      {files.length > 0 ? (
        <FileChipList
          files={files}
          onRemove={(id) => setFiles((previous) => previous.filter((file) => file.id !== id))}
        />
      ) : (
        <SimpleEmptyState message="添付ファイルがありません" />
      )}
      <div>
        <AppButton
          variant="back"
          disabled={files.length === attachmentFiles.length}
          onClick={() => setFiles(attachmentFiles)}
        >
          添付を元に戻す
        </AppButton>
      </div>
    </div>
  );
}

const demoMembers: readonly AvatarGroupMember[] = [
  { id: 1, name: "SolvifAI サポート", icon_path: import.meta.env.BASE_URL + "favicon.png" },
  { id: 2, name: "田中 花子" },
  { id: 3, name: "佐藤 直樹" },
  { id: 4, name: "伊藤 彩" },
  { id: 5, name: "鈴木 亮" },
];

function AvatarGroupPreview() {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      <div className="grid min-w-32 gap-2 rounded-lg border border-catalog-line bg-white p-3 text-xs">
        <span>画像あり・画像なし</span>
        <AvatarGroup members={demoMembers.slice(0, 2)} />
      </div>
      <div className="grid min-w-32 gap-2 rounded-lg border border-catalog-line bg-white p-3 text-xs">
        <span>3人に制限</span>
        <AvatarGroup members={demoMembers} maxVisible={3} />
      </div>
      <div className="grid min-w-32 gap-2 rounded-lg border border-catalog-line bg-white p-3 text-xs">
        <span>自分を含めて表示</span>
        <AvatarGroup members={demoMembers} maxVisible={3} currentUserId={5} />
      </div>
    </div>
  );
}

const saveStates: readonly { value: SaveStatus; label: string }[] = [
  { value: "idle", label: "待機中" },
  { value: "saving", label: "保存中" },
  { value: "saved", label: "保存済み" },
  { value: "error", label: "失敗" },
];

function SaveStatusPreview() {
  const [status, setStatus] = useState<SaveStatus>("saved");
  return (
    <div className="grid w-full max-w-sm gap-3">
      <div className="flex min-h-14 flex-wrap items-center justify-between gap-2 rounded-lg border border-catalog-line bg-white px-3 py-2">
        <SaveStatusIndicator status={status} />
        {status === "error" ? (
          <AppButton variant="back" className="h-8" onClick={() => setStatus("saved")}>
            再試行
          </AppButton>
        ) : null}
      </div>
      <div role="group" aria-label="保存状態を切り替える" className="flex flex-wrap gap-2">
        {saveStates.map(({ value, label }) => (
          <button
            type="button"
            key={value}
            aria-pressed={status === value}
            className="rounded-md border border-catalog-line bg-white px-2.5 py-1.5 text-xs hover:border-brand-primary aria-pressed:border-brand-primary aria-pressed:text-brand-foreground"
            onClick={() => setStatus(value)}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

const demoOptions: readonly OptionGroupOption[] = [
  { value: "private", label: "個人のみ", description: "自分だけが閲覧できます" },
  { value: "team", label: "チーム", description: "メンバーが閲覧できます" },
  { value: "all", label: "全体公開", disabled: true },
  { value: "limited", label: "一部のメンバー", count: 3 },
];

function OptionGroupPreview() {
  const [value, setValue] = useState("");
  return (
    <div className="w-full max-w-md">
      <p className="mb-2 text-sm font-medium text-text-muted">共有範囲</p>
      <OptionGroup options={demoOptions} value={value} onChange={setValue} ariaLabel="共有範囲" />
    </div>
  );
}

type DocumentTab = "individual" | "shared" | "archive";

function TabFiles({ files }: { files: readonly string[] }) {
  return (
    <ul className="divide-y divide-catalog-line rounded-lg border border-catalog-line bg-white">
      {files.map((name) => (
        <li key={name} className="flex items-center gap-2 px-3 py-2 text-sm">
          <FileTypeIcon fileName={name} className="size-5" nativeTooltip={false} />
          <span className="min-w-0 truncate">{name}</span>
        </li>
      ))}
    </ul>
  );
}

const documentTabs: readonly TabItem<DocumentTab>[] = [
  {
    value: "individual",
    label: "PJ個別データ",
    panel: <TabFiles files={["月次レポート.xlsx", "プロジェクト計画書.docx"]} />,
  },
  {
    value: "shared",
    label: "全体共通データ",
    panel: <TabFiles files={["社内ガイドライン.pdf", "提案書テンプレート.pptx"]} />,
  },
  {
    value: "archive",
    label: "アーカイブ",
    panel: null,
    disabled: true,
  },
];

function TabsPreview() {
  const [tab, setTab] = useState<DocumentTab>("individual");

  return (
    <Tabs
      className="w-full max-w-lg"
      tabs={documentTabs}
      value={tab}
      onChange={setTab}
      ariaLabel="資料の範囲"
    />
  );
}

const previewToastId = "catalog-toast";

function ToastPreview() {
  return (
    <div className="demo-row">
      <AppButton
        variant="back"
        onClick={() => toast.success("フォルダを作成しました", { id: previewToastId })}
      >
        成功の通知
      </AppButton>
      <AppButton
        variant="back"
        onClick={() => toast.warning("PPTXファイルを選択してください", { id: previewToastId })}
      >
        注意の通知
      </AppButton>
      <AppButton
        variant="back"
        onClick={() => toast.error("ファイルを移動できませんでした", { id: previewToastId })}
      >
        エラーの通知
      </AppButton>
      <AppToaster />
    </div>
  );
}

function TooltipPreview() {
  const [highlighted, setHighlighted] = useState(false);
  const buttonClass =
    "inline-flex size-10 items-center justify-center rounded-lg border border-catalog-line bg-white hover:bg-slate-50 aria-pressed:text-brand-foreground";

  return (
    <div className="grid justify-items-center gap-3">
      <div className="demo-row">
        <Tooltip content={highlighted ? "作成理由ハイライトを非表示" : "作成理由ハイライトを表示"}>
          <button
            type="button"
            aria-label="作成理由ハイライト"
            aria-pressed={highlighted}
            className={buttonClass}
            onClick={() => setHighlighted(!highlighted)}
          >
            {highlighted ? <EyeIcon /> : <EyeOffIcon />}
          </button>
        </Tooltip>
        <Tooltip content="設定中の共有範囲を確認できます" side="top">
          <button type="button" className={buttonClass} aria-label="共有範囲の補足">
            <span aria-hidden="true" className="font-bold text-catalog-muted">
              ?
            </span>
          </button>
        </Tooltip>
      </div>
      <p className="text-center text-xs text-catalog-muted">
        ホバーまたはフォーカスで説明を表示できます。
      </p>
    </div>
  );
}

export const previews = {
  "app-button": ButtonPreview,
  "text-input": TextPreview,
  "search-input": SearchPreview,
  "select-box": SelectBoxPreview,
  checkbox: CheckboxPreview,
  badge: BadgePreview,
  dialog: DialogPreview,
  "loading-spinner": SpinnerPreview,
  "empty-state": EmptyPreview,
  "row-action-menu": RowActionMenuPreview,
  "table-pagination": PaginationPreview,
  table: TablePreview,
  "file-chip-list": FileChipListPreview,
  "avatar-group": AvatarGroupPreview,
  "save-status-indicator": SaveStatusPreview,
  "option-group": OptionGroupPreview,
  tabs: TabsPreview,
  toast: ToastPreview,
  tooltip: TooltipPreview,
  breadcrumb: BreadcrumbPreview,
};

export function CardPreview({ id }: { id: keyof typeof previews }) {
  switch (id) {
    case "app-button":
      return (
        <>
          <AppButton variant="primary" className="!px-5">
            保存する
          </AppButton>
          <AppButton className="!px-4">キャンセル</AppButton>
        </>
      );
    case "text-input":
      return (
        <div className="mini-form">
          <FormField label="プロジェクト名">
            <TextInput placeholder="例：月次レポート" className="!py-2 !text-sm" />
          </FormField>
        </div>
      );
    case "search-input":
      return (
        <div className="mini-form">
          <SearchInput value="" onChange={() => {}} placeholder="資料名で検索" />
        </div>
      );
    case "select-box":
      return (
        <div className="mini-form">
          <FormField label="並び順">
            <SelectBox
              className="min-h-9"
              options={sortOptions}
              value="recent"
              onChange={() => {}}
            />
          </FormField>
        </div>
      );
    case "checkbox":
      return (
        <div className="mini-checks">
          <span>
            <Checkbox checked onChange={() => {}} />
            月次レポート
          </span>
          <span>
            <Checkbox checked={false} onChange={() => {}} />
            プロジェクト計画書
          </span>
        </div>
      );
    case "badge":
      return (
        <>
          <Badge label="完了" color="green" />
          <Badge label="処理中" color="blue" />
          <Badge label="下書き" color="gray" />
        </>
      );
    case "dialog":
      return (
        <div className="mini-dialog">
          <strong>変更を保存しますか？</strong>
          <AppButton variant="primary" className="!h-6 !px-3 !text-[10px]">
            保存する
          </AppButton>
        </div>
      );
    case "loading-spinner":
      return <LoadingSpinner size="md" />;
    case "empty-state":
      return <SimpleEmptyState message="資料がありません" className="!py-0" />;
    case "row-action-menu":
      return (
        <div className="flex max-w-full items-center gap-2 rounded-lg border border-catalog-line bg-white px-2 text-xs">
          <FileTypeIcon extension="xlsx" nativeTooltip={false} className="size-5" />
          <span className="truncate">月次レポート.xlsx</span>
          <RowActionMenu
            title="月次レポート.xlsx"
            actions={[{ label: "コピー", icon: <CopyIcon />, onSelect: () => {} }]}
          />
        </div>
      );
    case "table-pagination":
      return (
        <div className="w-full rounded-lg border border-catalog-line bg-white">
          <TablePagination page={1} perPage={5} total={13} onPageChange={() => {}} />
        </div>
      );
    case "table":
      return (
        <div className="w-full overflow-hidden rounded-lg border border-catalog-line bg-white">
          <Table className="text-xs" aria-label="テーブルの例">
            <thead>
              <tr>
                <th scope="col">資料名</th>
                <th scope="col">更新日</th>
              </tr>
            </thead>
            <tbody>
              <tr data-selected="true">
                <th scope="row" className="font-medium">
                  月次レポート
                </th>
                <td>11/18</td>
              </tr>
            </tbody>
          </Table>
        </div>
      );
    case "file-chip-list":
      return <FileChipList files={attachmentFiles.slice(0, 1)} onRemove={() => {}} />;
    case "avatar-group":
      return <AvatarGroup members={demoMembers} maxVisible={3} />;
    case "save-status-indicator":
      return (
        <SaveStatusIndicator
          status="saved"
          className="rounded-lg border border-catalog-line bg-white px-3 py-2"
        />
      );
    case "option-group":
      return (
        <OptionGroup
          options={demoOptions.slice(0, 2)}
          value="team"
          ariaLabel="共有範囲"
          className="gap-1.5"
        />
      );
    case "tabs":
      return (
        <Tabs
          tabs={documentTabs.slice(0, 2).map((tab) => ({ ...tab, panel: null }))}
          value="individual"
          onChange={() => {}}
          ariaLabel="資料の範囲"
        />
      );
    case "toast":
      return (
        <div className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-xs text-green-800 shadow-sm">
          <CheckIcon />
          フォルダを作成しました
        </div>
      );
    case "tooltip":
      return (
        <div className="grid justify-items-center gap-1.5">
          <span className="grid size-8 place-items-center rounded-md border border-catalog-line bg-white">
            <EyeIcon />
          </span>
          <span className="rounded bg-gray-900 px-2 py-1 text-xs text-white">
            作成理由ハイライトを表示
          </span>
        </div>
      );
    case "breadcrumb":
      return (
        <SimpleBreadcrumb
          items={[{ label: "ワークスペース", href: "#components" }, { label: "資料一覧" }]}
        />
      );
  }
}

export function HeroPreview() {
  return (
    <div className="hero-illustration" aria-hidden="true" inert>
      <div className="hero-sheet">
        <div className="hero-sheet-title">
          <FileText size={19} />
          <strong>資料一覧</strong>
        </div>
        <SearchInput value="" onChange={() => {}} placeholder="資料名で検索" />
        <div className="hero-sheet-row">
          <Checkbox checked onChange={() => {}} />
          <span>月次レポート</span>
          <Badge label="完了" color="green" />
        </div>
        <div className="hero-sheet-row">
          <Checkbox checked={false} onChange={() => {}} />
          <span>プロジェクト計画書</span>
          <Badge label="下書き" color="gray" />
        </div>
      </div>
      <div className="hero-sheet-action">
        <AppButton variant="primary" iconLeft={<Plus size={16} />} className="!px-5">
          資料を追加
        </AppButton>
      </div>
    </div>
  );
}
