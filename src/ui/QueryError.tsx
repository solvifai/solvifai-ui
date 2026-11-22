export function QueryError({ error, retry }: { error: Error; retry: () => void }) {
  return (
    <div role="alert" className="my-4 rounded border border-red-200 bg-red-50 p-4 text-sm text-red-700">
      {error.message}
      <button type="button" className="ml-3 underline" onClick={retry}>
        再読み込み
      </button>
    </div>
  );
}
