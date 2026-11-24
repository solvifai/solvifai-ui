import { useLayoutEffect, useRef, useState, type RefObject } from "react";

import { AppButton } from "./AppButton";
import { Dialog, DialogClose, DialogDescription, DialogFloatingContent, DialogOverlay, DialogPortal, DialogTitle } from "./Dialog";
import { CloseIcon, SearchIcon } from "./icons";
import { IconFolder, IconPlusSidebar } from "./sidebar-icons";

interface ProjectSelectorModalProps {
  anchorRef: RefObject<HTMLButtonElement | null>;
  projects: readonly { id: number; name: string }[];
  currentProjectId: number;
  onSelect: (id: number) => void;
  onCreate: () => void;
  onClose: () => void;
}

export function ProjectSelectorModal({
  anchorRef, projects, currentProjectId, onSelect, onCreate, onClose,
}: ProjectSelectorModalProps) {
  const [query, setQuery] = useState("");
  const searchInput = useRef<HTMLInputElement>(null);
  const [position, setPosition] = useState({ left: 16, top: 80, width: 480 });
  const visible = projects.filter((project) => project.name.toLowerCase().includes(query.toLowerCase()));

  useLayoutEffect(() => {
    // The product selector is 13px below the header and aligned with its
    // project button. In the catalog the header sits inside the preview.
    function place() {
      const anchor = anchorRef.current;
      if (!anchor) return;
      const bounds = anchor.getBoundingClientRect();
      const headerBottom = anchor.closest("header")?.getBoundingClientRect().bottom ?? bounds.bottom;
      const width = Math.min(480, window.innerWidth - 32);
      setPosition({
        width,
        left: Math.max(16, Math.min(bounds.left, window.innerWidth - width - 16)),
        top: Math.max(16, Math.min(headerBottom + 13, window.innerHeight - 276)),
      });
    }
    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [anchorRef]);

  return (
    <Dialog open onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogPortal><DialogOverlay className="bg-transparent" onClick={onClose} /></DialogPortal>
      <DialogFloatingContent
        className="flex flex-col rounded-2xl border-0 bg-white shadow-[0_8px_40px_rgba(0,0,0,0.12)]"
        style={{ ...position, maxHeight: `calc(100dvh - ${position.top + 16}px)` }}
        onOpenAutoFocus={(event) => {
          event.preventDefault();
          searchInput.current?.focus({ preventScroll: true });
        }}
        onCloseAutoFocus={(event) => event.preventDefault()}
        onPointerDownOutside={(event) => event.preventDefault()}
      >
        <div className="flex shrink-0 items-center justify-between px-6 pt-5 pb-4">
          <DialogTitle className="m-0 text-base leading-[1.3] font-normal tracking-normal text-text-primary">
            プロジェクトを選択
          </DialogTitle>
          <DialogClose asChild>
            <button type="button" aria-label="閉じる"
              className="-mr-1 flex size-8 items-center justify-center rounded-full text-text-primary hover:bg-product-bg">
              <CloseIcon width={22} height={22} />
            </button>
          </DialogClose>
        </div>
        <DialogDescription className="sr-only">表示するプロジェクトを選びます。</DialogDescription>
        <div className="shrink-0 px-6 pb-3">
          <div className="relative">
            <SearchIcon className="pointer-events-none absolute top-[11px] left-3.5 text-product-subtext" />
            <input ref={searchInput} aria-label="プロジェクトを検索"
              type="text" value={query} onChange={(event) => setQuery(event.currentTarget.value)}
              placeholder="プロジェクトを検索..."
              className="h-10 w-full rounded-lg border border-product-line bg-product-bg pr-3.5 pl-10 text-base text-text-primary placeholder:text-product-subtext focus-visible:outline-none" />
          </div>
        </div>
        <div className="flex min-h-0 flex-1 flex-col gap-2.5 overflow-y-auto px-4 pb-2">
          {visible.map((project) => (
            <button key={project.id} type="button"
              aria-current={project.id === currentProjectId ? "true" : undefined}
              className={`flex h-14 shrink-0 cursor-pointer items-center rounded-lg px-4 text-left transition-all ${project.id === currentProjectId ? "bg-item-active" : "hover:bg-item-active"}`}
              onClick={() => onSelect(project.id)}>
              <IconFolder width={20} height={20} className="mr-3 shrink-0" active={project.id === currentProjectId} />
              <span className="truncate text-base text-text-primary">{project.name}</span>
            </button>
          ))}
          {visible.length === 0 && (
            <p role="status" className="py-7 text-center text-base text-text-secondary">一致するプロジェクトがありません</p>
          )}
        </div>
        <div className="flex shrink-0 justify-center px-4 pt-1.5 pb-6">
          <AppButton variant="secondary" block className="max-sm:px-2" iconLeft={<IconPlusSidebar />} onClick={onCreate}>
            新規プロジェクトを作成
          </AppButton>
        </div>
      </DialogFloatingContent>
    </Dialog>
  );
}
