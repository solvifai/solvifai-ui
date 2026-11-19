import { ArrowLeft, FileText, Plus } from "lucide-react";
import { useId, useState } from "react";

import { AppButton } from "../ui/AppButton";
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
import { FormField } from "../ui/FormField";
import { LoadingSpinner } from "../ui/LoadingSpinner";
import { SearchInput } from "../ui/SearchInput";
import { SelectBox } from "../ui/SelectBox";
import { SimpleBreadcrumb } from "../ui/SimpleBreadcrumb";
import { TextInput } from "../ui/TextInput";

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

function SelectBoxPreview() {
  const [category, setCategory] = useState("");
  const id = useId();
  const invalid = category === "";

  return (
    <div className="demo-form">
      <FormField label="並び順" htmlFor={id + "-sort"}>
        <SelectBox id={id + "-sort"} defaultValue="">
          <option value="" disabled>
            選択してください
          </option>
          <option value="recent">新しい順</option>
          <option value="oldest">古い順</option>
          <option value="name">名前順</option>
        </SelectBox>
      </FormField>
      <FormField label="表示形式" htmlFor={id + "-view"}>
        <SelectBox id={id + "-view"} defaultValue="list">
          <option value="list">一覧</option>
          <option value="grid">グリッド</option>
        </SelectBox>
      </FormField>
      <FormField label="カテゴリ（必須）" htmlFor={id + "-category"}>
        <SelectBox
          id={id + "-category"}
          aria-invalid={invalid || undefined}
          aria-describedby={invalid ? id + "-error" : undefined}
          required
          value={category}
          onChange={(event) => setCategory(event.currentTarget.value)}
        >
          <option value="" disabled>
            選択してください
          </option>
          <option value="report">レポート</option>
          <option value="minutes">議事録</option>
        </SelectBox>
        {invalid ? (
          <p id={id + "-error"} className="demo-error">
            カテゴリを選択してください。
          </p>
        ) : null}
      </FormField>
      <FormField label="アクセス権限" htmlFor={id + "-permission"}>
        <SelectBox id={id + "-permission"} defaultValue="read" disabled>
          <option value="read">閲覧のみ</option>
        </SelectBox>
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
            <SelectBox className="h-9 text-sm" defaultValue="recent">
              <option value="recent">新しい順</option>
              <option value="oldest">古い順</option>
            </SelectBox>
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
