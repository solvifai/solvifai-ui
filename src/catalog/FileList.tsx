import { FolderOpen, X } from "lucide-react";
import { useRef, useState } from "react";

import { AppButton } from "../ui/AppButton";
import { Checkbox } from "../ui/Checkbox";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle } from "../ui/Dialog";
import { SimpleEmptyState } from "../ui/EmptyState";
import { FileTypeIcon } from "../ui/FileTypeIcon";
import { CopyIcon, TrashIcon } from "../ui/icons";
import { RowActionMenu } from "../ui/RowActionMenu";
import { SearchInput } from "../ui/SearchInput";
import { TablePagination } from "../ui/TablePagination";

const sampleFiles = [
  { id: 1, name: "月次レポート.xlsx", date: "2026-11-18", size: "324 KB" },
  { id: 2, name: "顧客向け提案書.pptx", date: "2026-11-17", size: "2.4 MB" },
  { id: 3, name: "プロジェクト計画書.docx", date: "2026-11-17", size: "186 KB" },
  { id: 4, name: "定例会の議事録.pdf", date: "2026-11-16", size: "512 KB" },
  { id: 5, name: "売上集計.csv", date: "2026-11-15", size: "48 KB" },
  { id: 6, name: "予算レポート.xlsx", date: "2026-11-14", size: "246 KB" },
  { id: 7, name: "新機能の説明資料.pptx", date: "2026-11-13", size: "1.8 MB" },
  { id: 8, name: "運用チェックリスト.docx", date: "2026-11-13", size: "129 KB" },
  { id: 9, name: "インタビュー議事録.pdf", date: "2026-11-12", size: "995 KB" },
  { id: 10, name: "画面キャプチャ.png", date: "2026-11-11", size: "160 KB" },
  { id: 11, name: "進捗レポート.xlsx", date: "2026-11-10", size: "208 KB" },
  { id: 12, name: "作業メモ.txt", date: "2026-11-09", size: "8 KB" },
  { id: 13, name: "リリース手順.pdf", date: "2026-11-08", size: "377 KB" },
];

const pageSize = 5;
const deleteActionStyle = "text-rose-700 hover:bg-rose-50 focus-visible:ring-rose-600";

export function FileList() {
  const [files, setFiles] = useState(sampleFiles);
  const [query, setQuery] = useState("");
  const [requestedPage, setPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState(() => new Set<number>());
  const [status, setStatus] = useState("");
  const [pendingRemoval, setPendingRemoval] = useState<(typeof sampleFiles)[number] | null>(null);
  const listHeading = useRef<HTMLHeadingElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

  const search = query.trim().toLowerCase();
  const matching = files.filter((file) => file.name.toLowerCase().includes(search));
  const page = Math.min(requestedPage, Math.max(1, Math.ceil(matching.length / pageSize)));
  const visible = matching.slice((page - 1) * pageSize, page * pageSize);
  const selectedOnPage = visible.filter((file) => selectedIds.has(file.id)).length;
  const allOnPage = visible.length > 0 && selectedOnPage === visible.length;

  function togglePage() {
    setSelectedIds((previous) => {
      const next = new Set(previous);
      for (const file of visible) {
        if (allOnPage) next.delete(file.id);
        else next.add(file.id);
      }
      return next;
    });
  }

  function toggleRow(id: number) {
    setSelectedIds((previous) => {
      const next = new Set(previous);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  async function copyFileName(name: string) {
    try {
      await navigator.clipboard.writeText(name);
      setStatus(`${name} をコピーしました。`);
    } catch {
      setStatus("ファイル名をコピーできませんでした。");
    }
  }

  function removeFile() {
    if (!pendingRemoval) return;
    setFiles((previous) => previous.filter(({ id }) => id !== pendingRemoval.id));
    setSelectedIds((previous) => {
      const next = new Set(previous);
      next.delete(pendingRemoval.id);
      return next;
    });
    setStatus(`${pendingRemoval.name} を削除しました。`);
    setPendingRemoval(null);
  }

  return (
    <div className="document-page">
      <header className="document-heading">
        <span className="document-kicker">
          <FolderOpen size={18} aria-hidden="true" /> サンプル
        </span>
        <h1>ファイル一覧</h1>
        <p>
          ファイル名や拡張子で検索し、行を選択できます。右端の三点メニューからファイル名のコピーや削除を試せます。
        </p>
      </header>
      <section
        className="mt-2 rounded-xl border border-catalog-line bg-white"
        aria-labelledby="file-list-heading"
      >
        <div className="flex flex-wrap items-end justify-between gap-4 px-4 pt-4 pb-3 sm:px-5">
          <div>
            <h2
              id="file-list-heading"
              ref={listHeading}
              tabIndex={-1}
              className="text-base font-bold"
            >
              資料
            </h2>
            <p className="mt-1 text-xs text-catalog-muted">サンプルデータ</p>
          </div>
          <SearchInput
            className="w-full sm:w-64"
            value={query}
            onChange={(value) => {
              setQuery(value);
              setPage(1);
              setStatus("");
            }}
            ariaLabel="ファイルを検索"
            placeholder="ファイル名・拡張子で検索"
          />
        </div>
        <div className="flex min-h-10 flex-wrap items-center gap-x-3 gap-y-1 px-4 pb-2 text-xs text-catalog-muted sm:px-5">
          <span role="status">{selectedIds.size}件選択</span>
          {selectedIds.size > 0 ? (
            <button
              type="button"
              className="inline-flex items-center gap-1 rounded px-2 py-1 font-semibold text-catalog-blue hover:bg-blue-50"
              onClick={() => setSelectedIds(new Set<number>())}
            >
              <X size={14} aria-hidden="true" /> 選択を解除
            </button>
          ) : null}
        </div>
        <div className="border-y border-catalog-line">
          <table className="w-full table-fixed text-left text-sm" aria-label="サンプルファイル">
            <thead className="bg-product-bg text-xs font-semibold text-catalog-muted">
              <tr>
                <th scope="col" className="w-12 py-2.5 pl-4 sm:w-14 sm:pl-5">
                  <Checkbox
                    checked={allOnPage}
                    indeterminate={selectedOnPage > 0 && !allOnPage}
                    disabled={visible.length === 0}
                    ariaLabel="このページのファイルをすべて選択"
                    onChange={togglePage}
                  />
                </th>
                <th scope="col" className="py-2.5">
                  ファイル名
                </th>
                <th scope="col" className="hidden w-30 py-2.5 sm:table-cell">
                  更新日
                </th>
                <th scope="col" className="hidden w-22 py-2.5 sm:table-cell">
                  容量
                </th>
                <th scope="col" className="w-13 py-2.5 sm:w-16">
                  <span className="sr-only">操作</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {visible.map((file) => {
                const selected = selectedIds.has(file.id);
                return (
                  <tr
                    key={file.id}
                    className={`border-t border-catalog-line ${selected ? "bg-blue-50" : "hover:bg-slate-50/70"}`}
                  >
                    <td className="py-3 pl-4 sm:pl-5">
                      <Checkbox
                        checked={selected}
                        ariaLabel={`${file.name}を選択`}
                        onChange={() => toggleRow(file.id)}
                      />
                    </td>
                    <th scope="row" className="py-3 pr-2.5">
                      <div className="flex min-w-0 items-center gap-2.5">
                        <span aria-hidden="true" className="shrink-0">
                          <FileTypeIcon fileName={file.name} nativeTooltip={false} />
                        </span>
                        <div className="min-w-0">
                          <span className="block truncate font-semibold" title={file.name}>
                            {file.name}
                          </span>
                          <time
                            className="mt-0.5 block text-xs font-normal text-catalog-muted sm:hidden"
                            dateTime={file.date}
                          >
                            {file.date.replaceAll("-", "/")}
                          </time>
                        </div>
                      </div>
                    </th>
                    <td className="hidden py-3 text-catalog-muted sm:table-cell">
                      <time dateTime={file.date}>{file.date.replaceAll("-", "/")}</time>
                    </td>
                    <td className="hidden py-3 text-catalog-muted sm:table-cell">{file.size}</td>
                    <td className="py-3">
                      <RowActionMenu
                        title={file.name}
                        actions={[
                          {
                            label: "ファイル名をコピー",
                            icon: <CopyIcon />,
                            onSelect: () => void copyFileName(file.name),
                          },
                          {
                            label: "削除",
                            icon: <TrashIcon />,
                            actionClassName: deleteActionStyle,
                            onSelect: () => {
                              returnFocus.current =
                                document.activeElement instanceof HTMLElement
                                  ? document.activeElement
                                  : null;
                              setPendingRemoval(file);
                            },
                          },
                        ]}
                      />
                    </td>
                  </tr>
                );
              })}
              {visible.length === 0 ? (
                <tr>
                  <td colSpan={5}>
                    <SimpleEmptyState
                      message={search ? "一致するファイルがありません" : "ファイルがありません"}
                      subMessage={search ? "別のファイル名や拡張子で検索してください。" : undefined}
                    />
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
        <TablePagination
          page={page}
          perPage={pageSize}
          total={matching.length}
          onPageChange={setPage}
        />
      </section>
      <p className="mt-3 min-h-5 text-sm text-catalog-blue" role="status">
        {status}
      </p>
      <div className="flex flex-wrap gap-x-5">
        <a className="source-link" href="#row-action-menu">
          三点メニューの使い方
        </a>
        <a className="source-link" href="#table-pagination">
          ページ送りの使い方
        </a>
      </div>
      <Dialog
        open={pendingRemoval !== null}
        onOpenChange={(open) => {
          if (!open) setPendingRemoval(null);
        }}
      >
        <DialogContent
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            const trigger = returnFocus.current;
            (trigger?.isConnected ? trigger : listHeading.current)?.focus();
            returnFocus.current = null;
          }}
        >
          <DialogTitle className="pr-8">ファイルを削除しますか？</DialogTitle>
          <DialogDescription>
            {pendingRemoval?.name} をこのサンプルの一覧から削除します。
          </DialogDescription>
          <DialogFooter>
            <AppButton onClick={() => setPendingRemoval(null)}>キャンセル</AppButton>
            <AppButton variant="primary" className="!bg-rose-700 !bg-none" onClick={removeFile}>
              削除する
            </AppButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
