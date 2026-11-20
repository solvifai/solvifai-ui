import { Plus } from "lucide-react";
import { useState } from "react";

import { AppButton } from "../ui/AppButton";
import { Badge } from "../ui/Badge";
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
import { SearchInput } from "../ui/SearchInput";
import { SelectBox } from "../ui/SelectBox";
import { SimpleBreadcrumb } from "../ui/SimpleBreadcrumb";
import { Table } from "../ui/Table";
import { TextInput } from "../ui/TextInput";

const sampleBooks = [
  { id: 1, title: "窓辺の小さな庭", read: false },
  { id: 2, title: "川辺を歩く", read: true },
  { id: 3, title: "夜空の観察帳", read: false },
  { id: 4, title: "週末のパン作り", read: true },
];

const statuses = [
  { value: "all", label: "すべて" },
  { value: "unread", label: "未読" },
  { value: "read", label: "読了" },
];

export function PageHeaderDemo() {
  const [books, setBooks] = useState(sampleBooks);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [feedback, setFeedback] = useState("");

  const search = query.trim().toLocaleLowerCase("ja");
  const visible = books.filter(
    (book) =>
      (status === "all" || book.read === (status === "read")) &&
      book.title.toLocaleLowerCase("ja").includes(search),
  );

  return (
    <>
      <section aria-labelledby="page-header-demo-title" className="rounded-xl border border-catalog-line bg-white">
        <header className="grid gap-3 border-b border-catalog-line px-4 py-4 sm:px-5">
          <SimpleBreadcrumb items={[{ label: "図書ノート" }, { label: "読書リスト" }]} />
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 id="page-header-demo-title" className="text-xl font-bold">読書リスト</h2>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <AppButton
                  variant="primary"
                  className="px-4"
                  iconLeft={<Plus size={16} aria-hidden="true" />}
                  onClick={() => setTitle("")}
                >
                  本を追加
                </AppButton>
              </DialogTrigger>
              <DialogContent>
                <DialogTitle className="pr-8">本を追加</DialogTitle>
                <DialogDescription>新しい本は「未読」で一覧に加わります。</DialogDescription>
                <form
                  className="grid gap-4"
                  onSubmit={(event) => {
                    event.preventDefault();
                    const nextTitle = title.trim();
                    if (!nextTitle) return;
                    setBooks((current) => [{ id: current.length + 1, title: nextTitle, read: false }, ...current]);
                    setFeedback(`「${nextTitle}」を追加しました。`);
                    setOpen(false);
                  }}
                >
                  <FormField label="本の名前" htmlFor="page-header-book-title">
                    <TextInput id="page-header-book-title" value={title} onChange={setTitle} />
                  </FormField>
                  <DialogFooter>
                    <DialogClose asChild>
                      <AppButton variant="back">キャンセル</AppButton>
                    </DialogClose>
                    <AppButton type="submit" variant="primary" disabled={!title.trim()}>追加する</AppButton>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </header>
        <div className="grid items-end gap-3 border-b border-catalog-line p-4 sm:grid-cols-[minmax(0,1fr)_10rem] sm:px-5">
          <SearchInput value={query} onChange={setQuery} ariaLabel="本を検索" placeholder="本の名前で検索" />
          <FormField label="読書状況" htmlFor="page-header-reading-status">
            <SelectBox id="page-header-reading-status" value={status} options={statuses} onChange={setStatus} />
          </FormField>
        </div>
        <div className="px-4 pt-3 sm:px-5">
          <p role="status" className="text-sm text-catalog-muted">{books.length}件中 {visible.length}件を表示</p>
          <p role="status" className={feedback ? "mt-1 break-all text-sm text-emerald-800" : "sr-only"}>{feedback}</p>
        </div>
        <Table aria-label="読書リスト" className="mt-2 table-fixed">
          <thead>
            <tr>
              <th scope="col">本の名前</th>
              <th scope="col" className="w-24 sm:w-32">読書状況</th>
            </tr>
          </thead>
          <tbody>
            {visible.map((book) => (
              <tr key={book.id}>
                <th scope="row" className="wrap-anywhere">{book.title}</th>
                <td><Badge label={book.read ? "読了" : "未読"} color={book.read ? "green" : "gray"} /></td>
              </tr>
            ))}
            {visible.length === 0 && (
              <tr>
                <td colSpan={2}><SimpleEmptyState message="条件に合う本がありません" /></td>
              </tr>
            )}
          </tbody>
        </Table>
      </section>
      <div className="mt-4 flex flex-wrap gap-x-5">
        <a className="source-link" href="#breadcrumb">パンくずの使い方</a>
        <a className="source-link" href="#search-input">検索欄の使い方</a>
        <a className="source-link" href="#select-box">セレクトボックスの使い方</a>
      </div>
    </>
  );
}
