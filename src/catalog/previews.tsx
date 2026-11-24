import { ArrowLeft, FileText } from "lucide-react";
import { useId, useLayoutEffect, useRef, useState } from "react";

import { AppButton } from "../ui/AppButton";
import { AvatarGroup, type AvatarGroupMember } from "../ui/AvatarGroup";
import { Badge } from "../ui/Badge";
import { Checkbox } from "../ui/Checkbox";
import { DatePicker, DateTimePicker } from "../ui/DatePicker";
import { DateTimeRange } from "../ui/DateTimeRange";
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
import { FileDropzone } from "../ui/FileDropzone";
import { QueryError } from "../ui/QueryError";
import { SlideGenerationProgress } from "../ui/SlideGenerationProgress";
import { FormField } from "../ui/FormField";
import { CheckIcon, CopyIcon, TrashIcon } from "../ui/icons";
import { LoadingSpinner } from "../ui/LoadingSpinner";
import { OptionGroup, type OptionGroupOption } from "../ui/OptionGroup";
import { Radio } from "../ui/Radio";
import { ResizeDivider } from "../ui/ResizeDivider";
import { RowActionMenu } from "../ui/RowActionMenu";
import { SaveStatusIndicator, type SaveStatus } from "../ui/SaveStatusIndicator";
import { SearchInput } from "../ui/SearchInput";
import { SelectBox, type SelectBoxOption } from "../ui/SelectBox";
import { Step, SteppedForm } from "../ui/SteppedForm";
import { Tabs, type TabItem } from "../ui/Tabs";
import { TablePagination } from "../ui/TablePagination";
import { SimpleBreadcrumb } from "../ui/SimpleBreadcrumb";
import { TextArea } from "../ui/TextArea";
import { TextInput } from "../ui/TextInput";
import { AppToaster, toast } from "../ui/Toast";
import { Toggle } from "../ui/Toggle";

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
  const id = useId();
  return (
    <div className="demo-form">
      <FormField label="プロジェクト名" htmlFor={id + "-name"}>
        <TextInput id={id + "-name"} value={value} onChange={setValue} placeholder="例：商品企画" />
      </FormField>
      <FormField label="資料名" htmlFor={id + "-title"}>
        <TextInput id={id + "-title"} value={title} onChange={setTitle} />
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
function SelectBoxPreview() {
  const [sort, setSort] = useState("recent");
  const id = useId();

  return (
    <div className="demo-form">
      <FormField label="並び順" htmlFor={id}>
        <SelectBox id={id} options={sortOptions} value={sort} onChange={setSort} />
      </FormField>
      <FormField label="変更できない例" htmlFor={id + "-disabled"}>
        <SelectBox id={id + "-disabled"} options={sortOptions} value="name" onChange={() => {}} disabled />
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
  { id: 2, name: "田中 花子", icon_path: "/img/icon/user.svg" },
  { id: 3, name: "佐藤 直樹", icon_path: "/img/icon/user.svg" },
  { id: 4, name: "伊藤 彩", icon_path: "/img/icon/user.svg" },
  { id: 5, name: "鈴木 亮", icon_path: "/img/icon/user.svg" },
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
  { value: "unsaved", label: "未保存" },
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
    label: "グループ内",
    panel: <TabFiles files={["月次レポート.xlsx", "プロジェクト計画書.docx"]} />,
  },
  {
    value: "shared",
    label: "全体",
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

function RadioPreview() {
  const name = useId();
  const [category, setCategory] = useState("project");

  return (
    <fieldset className="grid w-full max-w-sm gap-2 rounded-lg border border-catalog-line bg-white p-3">
      <legend className="px-1 text-sm font-semibold">フォルダ分類</legend>
      <Radio
        name={name}
        value="project"
        label="グループ内"
        checked={category === "project"}
        onChange={(event) => setCategory(event.currentTarget.value)}
      />
      <Radio
        name={name}
        value="shared"
        label="全体"
        checked={category === "shared"}
        onChange={(event) => setCategory(event.currentTarget.value)}
      />
      <Radio name={name} value="restricted" label="権限のない分類" disabled />
    </fieldset>
  );
}

function TogglePreview() {
  const [highAccuracy, setHighAccuracy] = useState(true);

  return (
    <div className="w-full max-w-sm divide-y divide-catalog-line rounded-lg border border-catalog-line bg-white px-3">
      <div className="flex min-h-12 items-center justify-between gap-2 text-sm">
        <span className="font-medium">表の生成</span>
        <div className="flex items-center gap-2">
          <span className="text-xs text-catalog-muted">高精度</span>
          <Toggle ariaLabel="表の生成の高精度" checked={highAccuracy} onChange={setHighAccuracy} />
        </div>
      </div>
      <div className="flex min-h-12 items-center justify-between gap-2 text-sm">
        <span className="font-medium">グラフの生成</span>
        <div className="flex items-center gap-2">
          <span className="text-xs text-catalog-muted">高精度</span>
          <Toggle ariaLabel="グラフの生成の高精度" checked={false} onChange={() => {}} disabled />
        </div>
      </div>
    </div>
  );
}

function FileUploadPreview() {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  return (
    <div className="w-full max-w-md">
      <FileDropzone file={file} error={error} accept=".pptx"
        hint="PPTXファイルを選択してください"
        onSelect={(selected) => {
          if (!selected.name.toLowerCase().endsWith(".pptx")) {
            setError("PPTX形式のファイルを選択してください。");
            return;
          }
          setError(null);
          setFile(selected);
        }}
        onClear={() => { setFile(null); setError(null); }} />
    </div>
  );
}

function ProgressBarPreview() {
  const [progress, setProgress] = useState(35);
  const id = useId();

  return (
    <div className="grid w-full max-w-md gap-3">
      <SlideGenerationProgress label={progress === 100 ? "生成完了" : "スライド生成中"} progress={progress} />
      <label htmlFor={id} className="text-xs font-medium text-text-muted">
        サンプルの進捗を変更
      </label>
      <input
        id={id}
        type="range"
        min={0}
        max={100}
        value={progress}
        onChange={(event) => setProgress(event.currentTarget.valueAsNumber)}
        className="w-full accent-blue-600"
      />
    </div>
  );
}

const stepFormats = [
  { value: "report", label: "月次レポート" },
  { value: "proposal", label: "提案書" },
];

function SteppedFormPreview() {
  const [name, setName] = useState("");
  const [format, setFormat] = useState("");
  const [outline, setOutline] = useState(false);
  const id = useId();

  return (
    <SteppedForm className="w-full max-w-md">
      <Step title="基本情報" complete={name.trim().length > 0}>
        <FormField label="タイトル" htmlFor={id + "-name"}>
          <TextInput
            id={id + "-name"}
            value={name}
            onChange={setName}
            placeholder="例：顧客向け提案資料"
          />
        </FormField>
      </Step>
      <Step title="用紙" complete={format !== ""}>
        <FormField label="用紙を選ぶ" htmlFor={id + "-format"}>
          <SelectBox
            id={id + "-format"}
            value={format}
            options={stepFormats}
            onChange={setFormat}
          />
        </FormField>
      </Step>
      <Step title="入力内容の確認" complete={outline}>
        <div className="flex items-center gap-2 text-sm">
          <Checkbox
            checked={outline}
            onChange={() => setOutline(!outline)}
            ariaLabel="入力内容を確認しました"
          />
          <span>入力内容を確認しました</span>
        </div>
      </Step>
    </SteppedForm>
  );
}

function TextAreaPreview() {
  const [description, setDescription] = useState("");
  const [note, setNote] = useState("");
  const id = useId();
  const invalid = note.trim() === "";

  return (
    <div className="grid w-full max-w-xl gap-4 sm:grid-cols-2">
      <FormField label="概要" htmlFor={id + "-description"}>
        <TextArea
          id={id + "-description"}
          value={description}
          onChange={(event) => setDescription(event.currentTarget.value)}
          placeholder="プロジェクトの目的や概要を入力してください"
          maxLength={140}
        />
        <p className="text-right text-xs text-text-muted">{description.length} / 140文字</p>
      </FormField>
      <FormField label="共有時の注意（必須）" htmlFor={id + "-note"}>
        <TextArea
          id={id + "-note"}
          required
          value={note}
          onChange={(event) => setNote(event.currentTarget.value)}
          aria-invalid={invalid || undefined}
          aria-describedby={invalid ? id + "-error" : undefined}
        />
        {invalid ? (
          <p id={id + "-error"} className="demo-error">
            共有時の注意を入力してください。
          </p>
        ) : null}
      </FormField>
      <FormField
        className="sm:col-span-2"
        label="登録済みの手引き（読み取り専用）"
        htmlFor={id + "-readonly"}
      >
        <TextArea
          id={id + "-readonly"}
          rows={2}
          value={"先月との変化を短く説明します。\n数値の出典を併記します。"}
          readOnly
        />
      </FormField>
    </div>
  );
}

function DatePickerPreview() {
  const [start, setStart] = useState("2026-11-01");
  const [end, setEnd] = useState("");
  const id = useId();
  const errorId = id + "-error";
  const invalid = Boolean(start && end && end < start);

  return (
    <div className="grid w-full max-w-lg gap-3 sm:grid-cols-2">
      <FormField label="開始日" htmlFor={id + "-start"}>
        <DatePicker id={id + "-start"} value={start}
          onChange={(event) => setStart(event.currentTarget.value)} />
      </FormField>
      <FormField label="終了日" htmlFor={id + "-end"}>
        <DatePicker id={id + "-end"} min={start || undefined} value={end}
          aria-invalid={invalid || undefined} aria-describedby={invalid ? errorId : undefined}
          onChange={(event) => setEnd(event.currentTarget.value)} />
        {invalid && <p id={errorId} className="demo-error">終了日は開始日以降を選んでください。</p>}
      </FormField>
    </div>
  );
}

function DateTimePickerPreview() {
  const [range, setRange] = useState({
    startAt: "2026-11-19T09:00",
    endAt: "2026-11-19T18:00",
  });
  return <DateTimeRange value={range} onChange={setRange} />;
}

function ResizePanelPreview() {
  const container = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(520);
  const [requestedWidth, setRequestedWidth] = useState<number | null>(null);

  useLayoutEffect(() => {
    const element = container.current;
    if (!element) return;
    setContainerWidth(element.clientWidth);
    const resize = new ResizeObserver(([entry]) => {
      setContainerWidth(Math.floor(entry.contentRect.width));
    });
    resize.observe(element);
    return () => resize.disconnect();
  }, []);

  const available = Math.max(0, containerWidth - 12);
  const min = Math.min(120, Math.floor(available * 0.4));
  const max = Math.max(min, available - min);
  const initial = Math.round(available * 0.36);
  const clampWidth = (width: number) => Math.max(min, Math.min(max, width));
  const width = clampWidth(requestedWidth ?? initial);

  return (
    <div className="grid w-full max-w-xl gap-2">
      <div
        ref={container}
        className="flex h-52 overflow-hidden rounded-lg border border-catalog-line bg-white"
      >
        <aside
          style={{ width }}
          className="shrink-0 overflow-y-auto bg-product-bg p-2"
        >
          <p className="mb-2 text-xs font-semibold">スライド一覧</p>
          {["概要", "結果"].map((title) => (
            <div
              key={title}
              className="mb-2 rounded border border-catalog-line bg-white p-2 text-xs"
            >
              <div className="mb-1 h-2 w-2/3 rounded bg-blue-100" />
              {title}
            </div>
          ))}
        </aside>
        <ResizeDivider
          position="left"
          onResize={(delta) =>
            setRequestedWidth((previous) => clampWidth(clampWidth(previous ?? initial) + delta))
          }
        />
        <section className="min-w-0 flex-1 overflow-auto p-3">
          <p className="mb-4 text-xs font-semibold">編集エリア</p>
          <div className="grid gap-2 rounded-lg border border-catalog-line p-3">
            <span className="text-sm font-medium">月次レポート</span>
            <div className="h-2 w-4/5 rounded bg-blue-100" />
            <div className="h-2 w-2/3 rounded bg-gray-100" />
          </div>
        </section>
      </div>
      <div className="flex items-center justify-between gap-2 text-xs text-text-muted">
        <span>スライド一覧の幅 {width}px</span>
        <button
          type="button"
          className="rounded px-2 py-1 text-catalog-blue hover:bg-blue-50 disabled:opacity-50"
          onClick={() => setRequestedWidth(null)}
          disabled={requestedWidth === null}
        >
          幅を元に戻す
        </button>
      </div>
    </div>
  );
}

function QueryErrorPreview() {
  const [failed, setFailed] = useState(true);
  return failed
    ? <QueryError error={new Error("サンプルを読み込めませんでした。")} retry={() => setFailed(false)} />
    : <div className="grid gap-2">
        <p role="status">再読み込みしました。</p>
        <AppButton variant="back" onClick={() => setFailed(true)}>最初から試す</AppButton>
      </div>;
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
  "file-chip-list": FileChipListPreview,
  "avatar-group": AvatarGroupPreview,
  "save-status-indicator": SaveStatusPreview,
  "option-group": OptionGroupPreview,
  tabs: TabsPreview,
  toast: ToastPreview,
  radio: RadioPreview,
  toggle: TogglePreview,
  "file-upload": FileUploadPreview,
  "progress-bar": ProgressBarPreview,
  "stepped-form": SteppedFormPreview,
  "text-area": TextAreaPreview,
  "date-picker": DatePickerPreview,
  "date-time-picker": DateTimePickerPreview,
  "resizable-panel": ResizePanelPreview,
  "alert-banner": QueryErrorPreview,
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
    case "radio":
      return (
        <div className="grid w-fit max-w-full gap-1.5">
          <Radio label="グループ内" defaultChecked className="bg-white py-2" />
          <Radio label="全体" className="bg-white py-2" />
        </div>
      );
    case "toggle":
      return (
        <div className="flex items-center gap-2 rounded-lg border border-catalog-line bg-white px-3 py-1">
          <span className="text-xs text-catalog-muted">高精度</span>
          <Toggle ariaLabel="高精度" checked onChange={() => {}} />
        </div>
      );
    case "file-upload":
      return <AppButton variant="back">ファイルを選択</AppButton>;
    case "progress-bar":
      return <SlideGenerationProgress label="処理中" progress={45} />;
    case "stepped-form":
      return (
        <SteppedForm className="w-full max-w-60 gap-1 [&_button]:h-8">
          <Step title="基本情報" complete>{null}</Step>
          <Step title="用紙" complete={false}>{null}</Step>
        </SteppedForm>
      );
    case "text-area":
      return (
        <TextArea
          aria-label="概要"
          rows={2}
          value={"資料の概要を入力できます。\n複数行の入力に対応します。"}
          readOnly
          className="w-full max-w-64 !bg-white !text-xs"
        />
      );
    case "date-picker":
      return <DatePicker aria-label="開始日" defaultValue="2026-11-01" className="max-w-48" />;
    case "date-time-picker":
      return (
        <DateTimePicker
          aria-label="開始日時"
          defaultValue="2026-11-19T09:00"
          className="max-w-60"
        />
      );
    case "resizable-panel":
      return (
        <div className="flex h-16 w-full max-w-60 overflow-hidden rounded-lg border border-catalog-line bg-white text-xs">
          <span className="grid flex-1 place-items-center bg-product-bg">一覧</span>
          <ResizeDivider
            position="left"
            onResize={() => {}}
          />
          <span className="grid flex-2 place-items-center">編集</span>
        </div>
      );
    case "breadcrumb":
      return (
        <SimpleBreadcrumb
          items={[{ label: "ワークスペース", href: "#components" }, { label: "資料一覧" }]}
        />
      );
    case "alert-banner":
      return (
        <QueryError error={new Error("サンプルを取得できませんでした。")} retry={() => {}} />
      );
  }
}
