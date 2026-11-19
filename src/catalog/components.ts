import {
  AlignLeft,
  AppWindow,
  Bell,
  CheckSquare,
  CloudUpload,
  CircleDot,
  ChevronRight,
  ChevronDown,
  ChevronsUpDown,
  EllipsisVertical,
  FileSearch,
  Info,
  Gauge,
  ListOrdered,
  ListChecks,
  LoaderCircle,
  MousePointer2,
  PanelTop,
  Paperclip,
  StepForward,
  Search,
  Tag,
  ToggleRight,
  Table2,
  Users,
  Upload,
  type LucideIcon,
} from "lucide-react";

export const categories = [
  "すべて",
  "操作",
  "入力",
  "状態表示",
  "データ表示",
  "ナビゲーション",
] as const;
export type Category = (typeof categories)[number];

type Entry = {
  id: string;
  name: string;
  label: string;
  category: Exclude<Category, "すべて">;
  icon: LucideIcon;
  description: string;
  guidance: string[];
  variants: string[];
  file: string;
  code: string;
};

export const components = [
  {
    id: "app-button",
    name: "AppButton",
    label: "ボタン",
    category: "操作",
    icon: MousePointer2,
    description: "保存やキャンセルなど、画面上の操作を実行します。",
    guidance: [
      "保存や作成など、操作のまとまりで最も優先するアクションに primary を使います。",
      "キャンセルや補助操作は secondary、前の画面に移動する操作は back を使います。",
      'フォーム送信には type="submit" を指定します。押せない場合は近くに理由を表示します。',
    ],
    variants: ["Primary", "Secondary", "Back", "Disabled"],
    file: "AppButton.tsx",
    code: `import { AppButton } from "./ui/AppButton";

<>
  <AppButton variant="primary" type="submit">保存する</AppButton>
  <AppButton variant="secondary" onClick={onCancel}>キャンセル</AppButton>
</>`,
  },
  {
    id: "text-input",
    name: "TextInput",
    label: "テキスト入力",
    category: "入力",
    icon: AlignLeft,
    description: "名前やタイトルなど、1行のテキストを入力します。",
    guidance: [
      "FormField の htmlFor と TextInput の id を揃え、入力項目のラベルを表示します。",
      "プレースホルダーには入力例を入れます。",
      "エラー時は invalid を指定し、describedBy で具体的なエラー文と関連付けます。",
    ],
    variants: ["Default", "Filled", "Invalid", "Disabled"],
    file: "TextInput.tsx",
    code: `import { FormField } from "./ui/FormField";
import { TextInput } from "./ui/TextInput";

<FormField label="プロジェクト名" htmlFor="project-name">
  <TextInput
    id="project-name"
    value={name}
    onChange={setName}
    placeholder="例：月次レポート"
  />
</FormField>`,
  },
  {
    id: "search-input",
    name: "SearchInput",
    label: "検索入力",
    category: "入力",
    icon: Search,
    description: "一覧から名前やキーワードで対象を探します。",
    guidance: [
      "一覧の上部など、絞り込み対象に近い場所に配置します。",
      "ariaLabel とプレースホルダーに検索対象を含めます。",
      "検索結果がない場合は、検索条件を変えられる案内を表示します。",
    ],
    variants: ["Empty", "Filtering", "No results"],
    file: "SearchInput.tsx",
    code: `import { SearchInput } from "./ui/SearchInput";

<SearchInput
  value={query}
  onChange={setQuery}
  ariaLabel="資料名で検索"
  placeholder="資料名で検索"
/>`,
  },
  {
    id: "select-box",
    name: "SelectBox",
    label: "セレクトボックス",
    category: "入力",
    icon: ChevronsUpDown,
    description: "決められた選択肢から1つを選びます。",
    guidance: [
      "FormField のラベルで選ぶ項目を示し、各選択肢に一意の value を指定します。",
      '未選択は value="" で表します。必須項目は required を指定し、送信時にフォーム側で値を検証します。',
      "エラー時は invalid を指定し、describedBy で修正方法を示す文に関連付けます。",
      "上下キーで選択肢を移動し、Enter で選択、Esc で閉じられます。",
    ],
    variants: ["未選択", "選択済み", "エラー", "無効"],
    file: "SelectBox.tsx",
    code: `import { FormField } from "./ui/FormField";
import { SelectBox } from "./ui/SelectBox";

<FormField label="並び順" htmlFor="sort">
  <SelectBox
    id="sort"
    name="sort"
    value={sort}
    onChange={setSort}
    options={[
      { value: "recent", label: "新しい順" },
      { value: "oldest", label: "古い順" },
      { value: "name", label: "名前順" },
    ]}
  />
</FormField>`,
  },
  {
    id: "checkbox",
    name: "Checkbox",
    label: "チェックボックス",
    category: "入力",
    icon: CheckSquare,
    description: "複数選択や、個別設定のオン・オフに使います。",
    guidance: [
      "選択対象がわかるラベルを隣に表示し、ariaLabel にも指定します。",
      "一覧の全選択では、一部だけが選択された状態に indeterminate を使います。",
      "1件だけ選ぶ場合はセレクトボックスを使えます。少数の選択肢を常に見せたい場合はラジオボタンを使います。",
    ],
    variants: ["Unchecked", "Checked", "Mixed", "Disabled"],
    file: "Checkbox.tsx",
    code: `import { Checkbox } from "./ui/Checkbox";

<Checkbox
  checked={selected}
  onChange={() => setSelected(!selected)}
  ariaLabel="月次レポートを選択"
/>`,
  },
  {
    id: "badge",
    name: "Badge",
    label: "バッジ",
    category: "状態表示",
    icon: Tag,
    description: "進捗や分類を、短いラベルで表示します。",
    guidance: [
      "完了・処理中・エラーなど、状態がすぐにわかるラベルを使います。",
      "同じ意味には同じ色を割り当てます。例として、完了は緑、処理中は青、エラーは赤です。",
      "色に加えてテキストでも状態を伝えます。",
    ],
    variants: ["Blue", "Green", "Red", "Orange", "Purple", "Gray"],
    file: "Badge.tsx",
    code: `import { Badge } from "./ui/Badge";

<>
  <Badge label="完了" color="green" />
  <Badge label="処理中" color="blue" />
  <Badge label="要確認" color="orange" />
</>`,
  },
  {
    id: "dialog",
    name: "Dialog",
    label: "ダイアログ",
    category: "操作",
    icon: PanelTop,
    description: "確認や短い入力が必要なときに表示します。",
    guidance: [
      "タイトルは「ファイル名を変更」のように、何をするかがわかる文言にします。",
      "確認が必要な場合は、説明文に操作の結果を書きます。",
      "開閉は DialogTrigger と DialogClose を使い、キーボードで閉じた後は起点にフォーカスを戻します。",
    ],
    variants: ["Default"],
    file: "Dialog.tsx",
    code: `import { AppButton } from "./ui/AppButton";
import {
  Dialog, DialogTrigger, DialogContent, DialogTitle,
  DialogDescription, DialogFooter, DialogClose,
} from "./ui/Dialog";

<Dialog>
  <DialogTrigger asChild><AppButton>公開を確認</AppButton></DialogTrigger>
  <DialogContent>
    <DialogTitle>資料を公開しますか？</DialogTitle>
    <DialogDescription>公開すると、チームのメンバーが閲覧できます。</DialogDescription>
    <DialogFooter>
      <DialogClose asChild><AppButton>キャンセル</AppButton></DialogClose>
      <DialogClose asChild>
        <AppButton variant="primary" onClick={publish}>公開する</AppButton>
      </DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>`,
  },
  {
    id: "loading-spinner",
    name: "LoadingSpinner",
    label: "読み込み",
    category: "状態表示",
    icon: LoaderCircle,
    description: "読み込みや処理の完了を待っていることを示します。",
    guidance: [
      "処理を待っている間、その処理の対象が見える場所に表示します。",
      "待ち時間が長い場合は「資料を読み込み中」のように、何を待っているかを明示します。",
    ],
    variants: ["Small", "Medium", "Large"],
    file: "LoadingSpinner.tsx",
    code: `import { LoadingSpinner } from "./ui/LoadingSpinner";

<LoadingSpinner size="md" message="資料を読み込み中" />`,
  },
  {
    id: "empty-state",
    name: "SimpleEmptyState",
    label: "空の状態",
    category: "状態表示",
    icon: FileSearch,
    description: "データが未作成、または検索結果が0件のときに表示します。",
    guidance: [
      "「資料がありません」「検索結果がありません」のように、現在の状態を具体的に示します。",
      "必要に応じて、資料の追加や検索条件の見直しなど、次の行動を案内します。",
    ],
    variants: ["No data", "No results"],
    file: "EmptyState.tsx",
    code: `import { SimpleEmptyState } from "./ui/EmptyState";

<SimpleEmptyState
  message="資料がありません"
  subMessage="最初の資料を追加すると、ここに表示されます。"
/>`,
  },
  {
    id: "row-action-menu",
    name: "RowActionMenu",
    label: "三点メニュー",
    category: "操作",
    icon: EllipsisVertical,
    description: "一覧の行に対する補助操作をまとめます。",
    guidance: [
      "title に対象の名前を渡し、どの行のメニューか分かるようにします。",
      "頻度の高い項目を上に置き、削除などの操作は色と文言で区別します。",
      "上下キーで項目を移動し、Enter で実行、Esc で閉じて起点に戻れます。",
    ],
    variants: ["通常", "削除", "無効"],
    file: "RowActionMenu.tsx",
    code: `import { RowActionMenu } from "./ui/RowActionMenu";
import { CopyIcon, TrashIcon } from "./ui/icons";

<RowActionMenu
  title={file.name}
  actions={[
    { label: "ファイル名をコピー", icon: <CopyIcon />, onSelect: copyName },
    {
      label: "削除",
      icon: <TrashIcon />,
      actionClassName: "text-rose-700 hover:bg-rose-50 focus-visible:ring-rose-600",
      onSelect: confirmRemoval,
    },
  ]}
/>`,
  },
  {
    id: "table-pagination",
    name: "TablePagination",
    label: "ページ送り",
    category: "ナビゲーション",
    icon: StepForward,
    description: "一覧の表示範囲と、前後のページへの移動を提供します。",
    guidance: [
      "page は1から数え、total には絞り込み後の件数を指定します。",
      "検索条件が変わったら最初のページに戻し、削除で最終ページがなくなった場合は手前のページを表示します。",
      "先頭・最終ページ、0件のときは、移動できない方向のボタンが無効になります。",
    ],
    variants: ["先頭ページ", "途中のページ", "最終ページ", "0件"],
    file: "TablePagination.tsx",
    code: `import { TablePagination } from "./ui/TablePagination";

<TablePagination
  page={page}
  perPage={5}
  total={filteredFiles.length}
  onPageChange={setPage}
/>`,
  },
  {
    id: "table",
    name: "Table",
    label: "テーブル",
    category: "データ表示",
    icon: Table2,
    description: "列見出しと行を揃えて、複数の項目を比較できる形で表示します。",
    guidance: [
      "列見出しには th と scope='col' を使い、行を識別するセルには scope='row' を使います。",
      "並び替えできる列は、見出しのボタンと aria-sort で現在の順序を伝えます。",
      "選択中の行に data-selected='true' を付けると背景が変わります。0件のときは一覧内に空の状態を表示します。",
    ],
    variants: ["基本", "並び替え", "行選択", "0件"],
    file: "Table.tsx",
    code: `import { Table } from "./ui/Table";

<Table aria-label="資料一覧">
  <thead>
    <tr><th scope="col">ファイル名</th><th scope="col">更新日</th></tr>
  </thead>
  <tbody>
    {files.map((file) => (
      <tr key={file.id} data-selected={selectedIds.has(file.id) || undefined}>
        <th scope="row">{file.name}</th>
        <td>{file.updatedAt}</td>
      </tr>
    ))}
  </tbody>
</Table>`,
  },
  {
    id: "file-chip-list",
    name: "FileChipList",
    label: "添付ファイルチップ",
    category: "入力",
    icon: Paperclip,
    description: "添付済みのファイル名と形式を表示し、個別に取り外せます。",
    guidance: [
      "複数ファイルの添付後に使います。ファイルごとに一意の id を指定します。",
      "ファイル名や拡張子からアイコンを表示します。議事録は source に minute を指定します。",
      "onRemove で親の添付ファイル一覧から指定された id を取り除きます。",
    ],
    variants: ["複数添付", "長い名前", "取り外し", "添付なし"],
    file: "FileChipList.tsx",
    code: `import { FileChipList } from "./ui/FileChipList";

<FileChipList
  files={files}
  onRemove={(id) => setFiles((previous) => previous.filter((file) => file.id !== id))}
/>`,
  },
  {
    id: "avatar-group",
    name: "AvatarGroup",
    label: "アバターグループ",
    category: "データ表示",
    icon: Users,
    description: "メンバーのアバターを重ね、表示枠に収まらない人数を +N で示します。",
    guidance: [
      "一覧では maxVisible で表示人数を揃えます。画像がない場合は共通のユーザーアイコンを表示します。",
      "自分も表示枠に入れたい場合は currentUserId を指定します。",
      "隠れたメンバー名は +N にカーソルを合わせると確認できます。",
    ],
    variants: ["画像あり", "画像なし", "人数超過"],
    file: "AvatarGroup.tsx",
    code: `import { AvatarGroup } from "./ui/AvatarGroup";

<AvatarGroup
  members={[{ id: 1, name: "田中 花子", icon_path: avatarUrl }, ...otherMembers]}
  maxVisible={3}
  currentUserId={1}
/>`,
  },
  {
    id: "save-status-indicator",
    name: "SaveStatusIndicator",
    label: "保存状態",
    category: "状態表示",
    icon: CloudUpload,
    description: "自動保存の待機・進行・成功・失敗を、編集画面内に表示します。",
    guidance: [
      "編集中も目に入る位置に置き、実際の保存処理に合わせて status を更新します。",
      "失敗時に再試行できる場合は、状態表示の近くに再試行ボタンを置きます。",
    ],
    variants: ["待機中", "保存中", "保存済み", "失敗"],
    file: "SaveStatusIndicator.tsx",
    code: `import { AppButton } from "./ui/AppButton";
import { SaveStatusIndicator } from "./ui/SaveStatusIndicator";

<>
  <SaveStatusIndicator status={saveStatus} />
  {saveStatus === "error" ? <AppButton onClick={retrySave}>再試行</AppButton> : null}
</>`,
  },
  {
    id: "option-group",
    name: "OptionGroup",
    label: "選択肢グループ",
    category: "入力",
    icon: ListChecks,
    description: "少数の選択肢を並べ、説明を読みながら1つ選べるようにします。",
    guidance: [
      "選択肢の違いを常に見せておきたい場合に使います。グループには ariaLabel を指定します。",
      "各選択肢は一意の value を持ちます。選択できない項目には disabled を指定します。",
      "説明や件数を添えて、選んだときに何が変わるかを伝えます。",
    ],
    variants: ["未選択", "選択済み", "説明付き", "無効"],
    file: "OptionGroup.tsx",
    code: `import { OptionGroup } from "./ui/OptionGroup";

<OptionGroup
  ariaLabel="共有範囲"
  value={visibility}
  onChange={setVisibility}
  options={[
    { value: "private", label: "個人のみ", description: "自分だけが閲覧できます" },
    { value: "team", label: "チーム", description: "メンバーが閲覧できます" },
  ]}
/>`,
  },
  {
    id: "tabs",
    name: "Tabs",
    label: "タブ",
    category: "ナビゲーション",
    icon: AppWindow,
    description: "同じ画面内で、関連する表示内容を切り替えます。",
    guidance: [
      "資料選択画面の「PJ個別データ」「全体共通データ」のように、表示対象の違いを短いラベルで示します。",
      "左右キー、Home、End で切り替えられます。利用できないタブには disabled を指定します。",
      "タブを切り替えても作業を続けられるよう、入力や選択の状態を必要に応じて保持します。",
    ],
    variants: ["選択中", "未選択", "無効", "キーボード操作"],
    file: "Tabs.tsx",
    code: `import { Tabs } from "./ui/Tabs";

<Tabs
  ariaLabel="資料の範囲"
  value={activeTab}
  onChange={setActiveTab}
  tabs={[
    { value: "individual", label: "PJ個別データ", panel: <ProjectFiles /> },
    { value: "shared", label: "全体共通データ", panel: <SharedFiles /> },
  ]}
/>`,
  },
  {
    id: "toast",
    name: "AppToaster",
    label: "トースト",
    category: "状態表示",
    icon: Bell,
    description: "操作の結果を、画面右上に短時間表示します。",
    guidance: [
      "アプリ全体に AppToaster を1つ配置し、処理結果に応じて toast.success、toast.warning、toast.error を使います。",
      "何が起きたかを短く書きます。例として、成功なら「フォルダを作成しました」、失敗なら「ファイルを移動できませんでした」です。",
      "入力の修正が必要な場合は、該当項目の近くにも修正方法を表示します。",
    ],
    variants: ["成功", "注意", "エラー"],
    file: "Toast.tsx",
    code: `import { AppToaster, toast } from "./ui/Toast";

// アプリのルートレイアウトに1回だけ配置
<AppToaster />

// 操作結果に合わせて呼び出す
toast.success("フォルダを作成しました");
toast.warning("PPTXファイルを選択してください");
toast.error("ファイルを移動できませんでした");`,
  },
  {
    id: "tooltip",
    name: "Tooltip",
    label: "ツールチップ",
    category: "状態表示",
    icon: Info,
    description: "アイコンや操作ボタンの意味を短く補足します。",
    guidance: [
      "成果物ヘッダーの「作成理由ハイライト」のように、操作の補足に使います。",
      "ホバーまたはキーボードでフォーカスすると表示され、Esc で閉じられます。",
      "アイコンボタンには aria-label を付けます。必須の説明は画面上にも表示します。",
    ],
    variants: ["ホバー", "フォーカス", "上・下に表示"],
    file: "Tooltip.tsx",
    code: `import { Tooltip } from "./ui/Tooltip";
import { EyeIcon } from "./ui/icons";

<Tooltip content="作成理由ハイライトを表示">
  <button type="button" aria-label="作成理由ハイライト" onClick={toggleHighlight}>
    <EyeIcon />
  </button>
</Tooltip>`,
  },
  {
    id: "radio",
    name: "Radio",
    label: "ラジオボタン",
    category: "入力",
    icon: CircleDot,
    description: "フォルダ分類など、並べた選択肢から1つを選びます。",
    guidance: [
      "同じ質問の選択肢には同じ name を付け、fieldset と legend でまとめます。",
      "行全体をクリックして選べます。キーボードでは矢印キーで同じグループの選択を切り替えます。",
      "利用できない選択肢には disabled を指定します。",
    ],
    variants: ["未選択", "選択済み", "無効"],
    file: "Radio.tsx",
    code: `import { Radio } from "./ui/Radio";

<fieldset>
  <legend>フォルダ分類</legend>
  <Radio name="folder-type" value="project" label="PJ個別データ" defaultChecked />
  <Radio name="folder-type" value="shared" label="全体共有データ" />
</fieldset>`,
  },
  {
    id: "toggle",
    name: "Toggle",
    label: "トグル",
    category: "入力",
    icon: ToggleRight,
    description: "手引きパネルの「高精度」のような設定をオン・オフに切り替えます。",
    guidance: [
      "切り替える機能名をラベルと ariaLabel に指定します。",
      "状態を切り替えてもラベルは同じにします。現在の状態はつまみの位置と aria-checked で示します。",
      "切り替えできない場合には disabled を指定します。",
    ],
    variants: ["オン", "オフ", "無効"],
    file: "Toggle.tsx",
    code: `import { Toggle } from "./ui/Toggle";

<Toggle ariaLabel="高精度" checked={highAccuracy} onChange={setHighAccuracy} />`,
  },
  {
    id: "accordion",
    name: "Accordion",
    label: "アコーディオン",
    category: "ナビゲーション",
    icon: ChevronDown,
    description: "編集ガイドのステップのように、見出しごとに内容を開閉します。",
    guidance: [
      "見出しだけで何が入っているか分かる文言を使い、詳しい説明や項目を中に置きます。",
      "クリックや Enter・Space で開閉します。初期表示から見せたい項目には open を指定します。",
      "項目を1つずつ開く場合は、同じグループの項目に共通の name を指定します。",
    ],
    variants: ["閉じる", "開く", "複数項目"],
    file: "Accordion.tsx",
    code: `import { Accordion } from "./ui/Accordion";

<Accordion heading="構成を確認する" open>
  目次の見出しと順序を確認します。
</Accordion>
<Accordion heading="表記を整える">
  固有名詞や表記の揺れを確認します。
</Accordion>`,
  },
  {
    id: "file-upload",
    name: "FileUpload",
    label: "ファイルアップロード",
    category: "入力",
    icon: Upload,
    description: "クリックやドラッグ＆ドロップでファイルを選びます。",
    guidance: [
      "フォーマット作成のPPTXアップロード欄と同様に、指定できる形式を選択前に示します。",
      "accept に対応する拡張子またはMIMEタイプを指定します。ドロップしたファイルにも同じ検証がかかります。",
      "送信処理は onFiles の呼び出し元で行います。処理中は isUploading を指定します。",
    ],
    variants: ["選択", "ドラッグ＆ドロップ", "形式エラー"],
    file: "FileUpload.tsx",
    code: `import { FileUpload } from "./ui/FileUpload";

<FileUpload
  accept=".pptx"
  hint="PPTXファイルのみ対応"
  isUploading={isUploading}
  onFiles={uploadFiles}
/>`,
  },
  {
    id: "progress-bar",
    name: "ProgressBar",
    label: "プログレスバー",
    category: "状態表示",
    icon: Gauge,
    description: "スライド生成のように、処理がどこまで進んだかを割合と長さで示します。",
    guidance: [
      "label で何の処理かを示し、progress には0から100までの値を渡します。",
      "処理結果を受け取ってから100%を表示し、ラベルも完了に切り替えます。",
      "進捗の割合が分からない場合は読み込み表示を使います。",
    ],
    variants: ["開始前", "処理中", "完了"],
    file: "ProgressBar.tsx",
    code: `import { ProgressBar } from "./ui/ProgressBar";

<ProgressBar
  label={progress === 100 ? "生成完了" : "スライド生成中"}
  progress={progress}
/>`,
  },
  {
    id: "stepped-form",
    name: "SteppedForm",
    label: "ステップ表示",
    category: "ナビゲーション",
    icon: ListOrdered,
    description: "成果物作成フォームのように、入力を順番に進められるようにします。",
    guidance: [
      "入力内容のまとまりごとに Step を置き、短い見出しを付けます。",
      "complete が true に変わると次の項目が開きます。完了の判定は画面側で入力内容に合わせます。",
      "各ステップは見出しから開閉できます。閉じても入力内容は保持されます。",
    ],
    variants: ["未着手", "入力中", "完了", "次の項目を自動展開"],
    file: "SteppedForm.tsx",
    code: `import { Step, SteppedForm } from "./ui/SteppedForm";

<SteppedForm>
  <Step title="基本情報" complete={hasTitle}>
    <TitleField />
  </Step>
  <Step title="フォーマット" complete={hasFormat}>
    <FormatSelect />
  </Step>
</SteppedForm>`,
  },
  {
    id: "breadcrumb",
    name: "SimpleBreadcrumb",
    label: "パンくず",
    category: "ナビゲーション",
    icon: ChevronRight,
    description: "画面の階層と、現在表示している場所を示します。",
    guidance: [
      "上位から現在のページに向かって、左から順番に並べます。",
      "上位階層には戻れるリンクを付け、現在のページ名には href を指定せず表示します。",
    ],
    variants: ["Default"],
    file: "SimpleBreadcrumb.tsx",
    code: `import { SimpleBreadcrumb } from "./ui/SimpleBreadcrumb";

<SimpleBreadcrumb items={[
  { label: "ワークスペース", href: "/workspace" },
  { label: "資料一覧", href: "/documents" },
  { label: "月次レポート" },
]} />`,
  },
] as const satisfies readonly Entry[];

export type ComponentEntry = (typeof components)[number];
