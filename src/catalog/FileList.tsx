import { ListChecks, Search, X } from "lucide-react";
import { useRef, useState } from "react";

import { AppButton } from "../ui/AppButton";
import { Checkbox } from "../ui/Checkbox";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle } from "../ui/Dialog";
import { SimpleEmptyState } from "../ui/EmptyState";
import { FileTypeIcon } from "../ui/FileTypeIcon";
import { CopyIcon, TrashIcon } from "../ui/icons";
import { RowActionMenu } from "../ui/RowActionMenu";
import { SearchInput } from "../ui/SearchInput";
import { Table } from "../ui/Table";
import { TablePagination } from "../ui/TablePagination";

const sampleFiles = [
  { id: 1, name: "持ち物リスト.xlsx", date: "2026-11-18", size: "324 KB" },
  { id: 2, name: "星座の紹介.pptx", date: "2026-11-17", size: "2.4 MB" },
  { id: 3, name: "読書ノート.docx", date: "2026-11-17", size: "186 KB" },
  { id: 4, name: "散歩マップ.pdf", date: "2026-11-16", size: "512 KB" },
  { id: 5, name: "気温の記録.csv", date: "2026-11-15", size: "48 KB" },
  { id: 6, name: "買い物リスト.xlsx", date: "2026-11-14", size: "246 KB" },
  { id: 7, name: "写真アルバム.pptx", date: "2026-11-13", size: "1.8 MB" },
  { id: 8, name: "旅の日記.docx", date: "2026-11-13", size: "129 KB" },
  { id: 9, name: "お菓子のレシピ.pdf", date: "2026-11-12", size: "995 KB" },
  { id: 10, name: "夕焼け.png", date: "2026-11-11", size: "160 KB" },
  { id: 11, name: "植物の観察記録.xlsx", date: "2026-11-10", size: "208 KB" },
  { id: 12, name: "観察メモ.txt", date: "2026-11-09", size: "8 KB" },
  { id: 13, name: "工作の手順.pdf", date: "2026-11-08", size: "377 KB" },
];

export const fileListPatterns = [
  {
    href: "#file-list",
    label: "複数選択と一括削除",
    icon: ListChecks,
    description:
      "ファイルを複数選び、まとめて削除する前に対象を確認できます。選択は検索やページ送りをしても保持されます。",
    initialQuery: "",
  },
  {
    href: "#pattern-search-empty",
    label: "検索結果が0件",
    icon: Search,
    description:
      "一致するファイルがないときに、結果が0件であることと次にできる操作を表示します。検索をクリアすると一覧に戻ります。",
    initialQuery: "見本にない名前",
  },
];

const pageSize = 5;
const deleteActionStyle = "text-rose-700 hover:bg-rose-50 focus-visible:ring-rose-600";

export function FileList({
  pattern: { label, icon: Icon, description, initialQuery },
}: {
  pattern: (typeof fileListPatterns)[number];
}) {
  const [files, setFiles] = useState(sampleFiles);
  const [query, setQuery] = useState(initialQuery);
  const [requestedPage, setPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState(() => new Set<number>());
  const [status, setStatus] = useState("");
  const [pendingRemoval, setPendingRemoval] = useState<typeof sampleFiles | null>(null);
  const searchInput = useRef<HTMLInputElement>(null);
  const listHeading = useRef<HTMLHeadingElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

  const search = query.trim().toLowerCase();
  const matching = files.filter((file) => file.name.toLowerCase().includes(search));
  const noMatches = search.length > 0 && files.length > 0 && matching.length === 0;
  const page = Math.min(requestedPage, Math.max(1, Math.ceil(matching.length / pageSize)));
  const visible = matching.slice((page - 1) * pageSize, page * pageSize);
  const selectedOnPage = visible.filter((file) => selectedIds.has(file.id)).length;
  const allOnPage = visible.length > 0 && selectedOnPage === visible.length;

  function changeQuery(value: string) {
    setQuery(value);
    setPage(1);
    setStatus("");
  }

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

  function removeFiles() {
    if (!pendingRemoval) return;
    const removedIds = new Set(pendingRemoval.map(({ id }) => id));
    setFiles((previous) => previous.filter(({ id }) => !removedIds.has(id)));
    setSelectedIds((previous) => new Set([...previous].filter((id) => !removedIds.has(id))));
    setStatus(
      pendingRemoval.length === 1
        ? `${pendingRemoval[0].name} を削除しました。`
        : `${pendingRemoval.length}件のファイルを削除しました。`,
    );
    setPendingRemoval(null);
  }

  return (
    <div className="document-page">
      <header className="document-heading">
        <span className="document-kicker">
          <Icon size={18} aria-hidden="true" /> Patterns
        </span>
        <h1>{label}</h1>
        <p>{description}</p>
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
              ファイル一覧
            </h2>
            <p className="mt-1 text-xs text-catalog-muted">サンプルデータ</p>
          </div>
          <SearchInput
            ref={searchInput}
            className="w-full sm:w-64"
            value={query}
            onChange={changeQuery}
            ariaLabel="ファイルを検索"
            placeholder="ファイル名・拡張子で検索"
          />
        </div>
        <div className="flex min-h-10 flex-wrap items-center gap-x-3 gap-y-1 px-4 pb-2 text-xs text-catalog-muted sm:px-5">
          <span role="status">{selectedIds.size}件選択</span>
          {selectedIds.size > 0 ? (
            <>
              <AppButton
                variant="back"
                className="!h-8 !text-rose-700"
                onClick={(event) => {
                  returnFocus.current = event.currentTarget;
                  setPendingRemoval(files.filter(({ id }) => selectedIds.has(id)));
                }}
              >
                選択したファイルを削除
              </AppButton>
              <button
                type="button"
                className="inline-flex items-center gap-1 rounded px-2 py-1 font-semibold text-catalog-blue hover:bg-blue-50"
                onClick={() => setSelectedIds(new Set<number>())}
              >
                <X size={14} aria-hidden="true" /> 選択を解除
              </button>
            </>
          ) : null}
          <span className="ml-auto">
            {search && files.length > 0 ? `検索結果 ${matching.length}件` : ""}
          </span>
        </div>
        <div className="border-y border-catalog-line">
          <Table
            className="table-fixed [--table-cell-padding-inline:0px]"
            aria-label="サンプルファイル"
          >
            <thead>
              <tr>
                <th scope="col" className="w-12 pl-4 sm:w-14 sm:pl-5">
                  <Checkbox
                    checked={allOnPage}
                    indeterminate={selectedOnPage > 0 && !allOnPage}
                    disabled={visible.length === 0}
                    ariaLabel="このページのファイルをすべて選択"
                    onChange={togglePage}
                  />
                </th>
                <th scope="col">ファイル名</th>
                <th scope="col" className="hidden w-30 sm:table-cell">
                  更新日
                </th>
                <th scope="col" className="hidden w-22 sm:table-cell">
                  容量
                </th>
                <th scope="col" className="w-13 sm:w-16">
                  <span className="sr-only">操作</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {visible.map((file) => {
                const selected = selectedIds.has(file.id);
                return (
                  <tr key={file.id} data-selected={selected || undefined}>
                    <td className="pl-4 sm:pl-5">
                      <Checkbox
                        checked={selected}
                        ariaLabel={`${file.name}を選択`}
                        onChange={() => toggleRow(file.id)}
                      />
                    </td>
                    <th scope="row" className="pr-2.5">
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
                    <td className="hidden text-catalog-muted sm:table-cell">
                      <time dateTime={file.date}>{file.date.replaceAll("-", "/")}</time>
                    </td>
                    <td className="hidden text-catalog-muted sm:table-cell">{file.size}</td>
                    <td>
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
                              setPendingRemoval([file]);
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
                      message={noMatches ? "一致するファイルがありません" : "ファイルがありません"}
                      subMessage={noMatches ? "別のファイル名や拡張子で検索してください。" : undefined}
                      className={noMatches ? "!pb-3" : undefined}
                    />
                    {noMatches ? (
                      <div className="pb-8 text-center">
                        <AppButton
                          onClick={() => {
                            changeQuery("");
                            searchInput.current?.focus();
                          }}
                        >
                          検索をクリア
                        </AppButton>
                      </div>
                    ) : null}
                  </td>
                </tr>
              ) : null}
            </tbody>
          </Table>
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
        <a className="source-link" href="#table">
          テーブルの使い方
        </a>
        <a className="source-link" href="#row-action-menu">
          三点メニューの使い方
        </a>
        <a className="source-link" href="#table-pagination">
          ページ送りの使い方
        </a>
        <a className="source-link" href="#search-input">
          検索欄の使い方
        </a>
        <a className="source-link" href="#empty-state">
          空の状態の使い方
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
          <DialogTitle className="pr-8">
            {pendingRemoval?.length === 1
              ? "ファイルを削除しますか？"
              : `${pendingRemoval?.length}件のファイルを削除しますか？`}
          </DialogTitle>
          <DialogDescription>
            以下のファイルをデモの一覧から削除します。
          </DialogDescription>
          <ul className="max-h-36 list-disc overflow-y-auto pl-5 text-sm text-text-primary">
            {pendingRemoval?.map((file) => <li key={file.id}>{file.name}</li>)}
          </ul>
          <DialogFooter>
            <AppButton onClick={() => setPendingRemoval(null)}>キャンセル</AppButton>
            <AppButton variant="primary" className="!bg-rose-700 !bg-none" onClick={removeFiles}>
              削除する
            </AppButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
