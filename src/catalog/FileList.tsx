import { Trash2, X } from "lucide-react";
import { useRef, useState } from "react";

import { AppButton } from "../ui/AppButton";
import { Checkbox } from "../ui/Checkbox";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle } from "../ui/Dialog";
import { SimpleEmptyState } from "../ui/EmptyState";
import { FileTypeIcon } from "../ui/FileTypeIcon";
import { RowActionMenu } from "../ui/RowActionMenu";
import { SearchInput } from "../ui/SearchInput";

const sampleFiles = [
  { id: 1, name: "散歩マップ.pdf" },
  { id: 2, name: "観察メモ.txt" },
  { id: 3, name: "写真アルバム.pptx" },
  { id: 4, name: "持ち物リスト.xlsx" },
];

export function FileList({ initialQuery = "" }: { initialQuery?: string }) {
  const [files, setFiles] = useState(sampleFiles);
  const [search, setSearch] = useState(initialQuery);
  const [selected, setSelected] = useState<number[]>([]);
  const [removalIds, setRemovalIds] = useState<number[] | null>(null);
  const [feedback, setFeedback] = useState("");
  const trigger = useRef<HTMLElement | null>(null);
  const input = useRef<HTMLInputElement>(null);
  const term = search.trim().toLowerCase();
  const visible = files.filter(({ name }) => name.toLowerCase().includes(term));
  const visibleIds = visible.map(({ id }) => id);
  const allSelected = visibleIds.length > 0 && visibleIds.every((id) => selected.includes(id));

  const deleteActions = (ids: number[]) => [{
    label: "削除",
    icon: <Trash2 size={16} aria-hidden="true" />,
    actionClassName: "text-red-600 hover:bg-red-50 focus-visible:ring-red-200",
    onSelect: () => {
      trigger.current = document.activeElement as HTMLElement | null;
      setRemovalIds(ids);
    },
  }];

  return (
    <section aria-label="サンプルファイル" className="rounded-xl border border-catalog-line bg-background-bg p-4 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <SearchInput ref={input} value={search} onChange={setSearch} ariaLabel="ファイルを検索"
          placeholder="ファイル名で検索" className="max-w-60 min-w-0 flex-[1_1_12rem]" />
        {selected.length > 0 && (
          <div role="group" aria-label="選択したファイルの一括操作"
            className="flex h-9 shrink-0 items-center gap-1 rounded-xl border border-[#cce9ff] bg-[#eff8ff] px-2 text-xs font-medium text-[#176b9a] sm:gap-3 sm:px-4 sm:text-sm">
            <span className="whitespace-nowrap">{selected.length}件選択</span>
            <RowActionMenu title="選択した項目" actions={deleteActions(selected)} />
            <button type="button" aria-label="選択を解除"
              className="flex size-8 items-center justify-center rounded text-text-secondary hover:bg-white"
              onClick={() => { setSelected([]); input.current?.focus(); }}>
              <X size={16} aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
      <table aria-label="ファイル一覧" className="mt-2 w-full table-fixed border-separate border-spacing-y-2 text-sm">
        <thead><tr>
          <th scope="col" className="w-10">
            <Checkbox checked={allSelected}
              indeterminate={!allSelected && visibleIds.some((id) => selected.includes(id))}
              disabled={!visibleIds.length} ariaLabel="表示中のファイルをすべて選択"
              onChange={() => setSelected(allSelected ? [] : visibleIds)} />
          </th>
          <th scope="col" className="text-left font-medium">ファイル名</th>
          <th scope="col" className="w-10"><span className="sr-only">操作</span></th>
        </tr></thead>
        <tbody>
          {visible.map((file) => (
            <tr key={file.id} className={selected.includes(file.id) ? "bg-blue-50" : "bg-white"}>
              <td className="rounded-l-lg py-2 pl-2">
                <Checkbox checked={selected.includes(file.id)} ariaLabel={file.name + "を選択"}
                  onChange={() => setSelected((current) => current.includes(file.id)
                    ? current.filter((id) => id !== file.id) : [...current, file.id])} />
              </td>
              <th scope="row" className="py-2 text-left font-medium">
                <span className="flex items-center gap-2">
                  <span aria-hidden="true"><FileTypeIcon fileName={file.name} nativeTooltip={false} /></span>
                  <span className="min-w-0 truncate" title={file.name}>{file.name}</span>
                </span>
              </th>
              <td className="rounded-r-lg"><RowActionMenu title={file.name} actions={deleteActions([file.id])} /></td>
            </tr>
          ))}
        </tbody>
      </table>
      {!visible.length && <SimpleEmptyState message={term ? "検索条件に一致するファイルはありません" : "ファイルはありません"} />}
      <p role="status" className="text-sm text-catalog-muted">{feedback}</p>
      <Dialog open={removalIds !== null} onOpenChange={(open) => { if (!open) setRemovalIds(null); }}>
        <DialogContent onCloseAutoFocus={(event) => {
          event.preventDefault();
          (trigger.current?.isConnected ? trigger.current : input.current)?.focus();
          trigger.current = null;
        }}>
          <DialogTitle>選択したファイルを削除</DialogTitle>
          <DialogDescription>選択した{removalIds?.length}件を削除します。</DialogDescription>
          <DialogFooter>
            <AppButton variant="back" onClick={() => setRemovalIds(null)}>キャンセル</AppButton>
            <AppButton variant="primary" className="!bg-red-600 !bg-none" onClick={() => {
              if (!removalIds) return;
              setFiles((current) => current.filter(({ id }) => !removalIds.includes(id)));
              setSelected((current) => current.filter((id) => !removalIds.includes(id)));
              setFeedback(`${removalIds.length}件を削除しました。`);
              setRemovalIds(null);
            }}>削除する</AppButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
}
