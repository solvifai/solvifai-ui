interface TablePaginationProps {
  page: number;
  perPage: number;
  total: number;
  onPageChange: (page: number) => void;
}

export function TablePagination({
  page,
  perPage,
  total,
  onPageChange,
}: TablePaginationProps) {
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  return (
    <div className='flex flex-wrap items-center justify-between gap-2 px-5 py-4 text-sm text-text-secondary'>
      <span>
        全 <b className='text-text-primary'>{total}</b> 件中{' '}
        <b className='text-text-primary'>
          {total ? (page - 1) * perPage + 1 : 0}-
          {Math.min(page * perPage, total)}
        </b>{' '}
        件を表示
      </span>
      <div className='flex items-center gap-3'>
        <button
          type='button'
          aria-label='前のページ'
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          className='h-9 w-9 rounded-lg border border-border-primary bg-white disabled:opacity-40'
        >
          ‹
        </button>
        <span className='flex h-9 min-w-9 items-center justify-center rounded-lg bg-brand-primary px-2 font-bold text-white'>
          {page} / {totalPages}
        </span>
        <button
          type='button'
          aria-label='次のページ'
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          className='h-9 w-9 rounded-lg border border-border-primary bg-white disabled:opacity-40'
        >
          ›
        </button>
      </div>
    </div>
  );
}
