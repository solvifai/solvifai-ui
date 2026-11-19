import { ChevronLeftIcon, ChevronRightIcon } from "./icons";

export interface TablePaginationProps {
  page: number;
  perPage: number;
  total: number;
  onPageChange: (page: number) => void;
}

export function TablePagination({ page, perPage, total, onPageChange }: TablePaginationProps) {
  const pageSize = Math.max(1, perPage);
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const first = total > 0 ? (currentPage - 1) * pageSize + 1 : 0;
  const last = Math.min(currentPage * pageSize, total);
  return (
    <nav
      aria-label="ページ送り"
      className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 text-sm text-text-muted sm:px-5"
    >
      <span aria-live="polite">
        全 <b className="text-text-primary">{total}</b> 件中{" "}
        <b className="text-text-primary">
          {first}–{last}
        </b>{" "}
        件を表示
      </span>
      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label="前のページ"
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="h-9 w-9 rounded-lg border border-border-control bg-white text-text-primary enabled:hover:bg-gray-100 disabled:opacity-40"
        >
          <ChevronLeftIcon className="mx-auto size-4" />
        </button>
        <span className="flex h-9 min-w-9 items-center justify-center rounded-lg bg-brand-foreground px-2 font-bold text-white">
          {currentPage} / {totalPages}
        </span>
        <button
          type="button"
          aria-label="次のページ"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="h-9 w-9 rounded-lg border border-border-control bg-white text-text-primary enabled:hover:bg-gray-100 disabled:opacity-40"
        >
          <ChevronRightIcon className="mx-auto size-4" />
        </button>
      </div>
    </nav>
  );
}
