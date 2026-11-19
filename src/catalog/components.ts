import {
  AlignLeft,
  CheckSquare,
  ChevronRight,
  ChevronsUpDown,
  FileSearch,
  LoaderCircle,
  MousePointer2,
  PanelTop,
  Search,
  Tag,
  type LucideIcon,
} from "lucide-react";

export const categories = ["すべて", "操作", "入力", "状態表示", "ナビゲーション"] as const;
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
