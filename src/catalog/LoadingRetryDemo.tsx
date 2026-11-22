import { useEffect, useRef, useState } from "react";

import { QueryError } from "../ui/QueryError";
import { AppButton } from "../ui/AppButton";
import { LoadingSpinner } from "../ui/LoadingSpinner";
import { FileList } from "./FileList";

type LoadState = "loading" | "failed" | "retrying" | "ready";

export function LoadingRetryDemo() {
  const [state, setState] = useState<LoadState>("loading");
  const heading = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (state !== "loading" && state !== "retrying") return;
    const timer = window.setTimeout(() => setState(state === "loading" ? "failed" : "ready"), 900);
    return () => window.clearTimeout(timer);
  }, [state]);

  return (
    <>
      <section
        aria-labelledby="loading-demo-heading"
        className="mt-2 grid gap-4 rounded-xl border border-catalog-line bg-white p-4 sm:p-5"
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 id="loading-demo-heading" ref={heading} tabIndex={-1} className="text-base font-bold">
            一覧の読み込み
          </h2>
          {state === "ready" && (
            <AppButton
              variant="back"
              onClick={() => {
                setState("loading");
                heading.current?.focus();
              }}
            >
              最初から試す
            </AppButton>
          )}
        </div>
        {(state === "loading" || state === "retrying") && (
          <LoadingSpinner className="py-12" message={state === "retrying" ? "再読み込み中…" : "読み込み中…"} />
        )}
        {state === "failed" && (
          <QueryError error={new Error("サンプル一覧を取得できませんでした。")} retry={() => {
            setState("retrying");
            heading.current?.focus();
          }} />
        )}
        <p role="status" className={state === "ready" ? "text-sm text-catalog-muted" : "sr-only"}>
          {state === "ready" ? "一覧を読み込みました。" : ""}
        </p>
      </section>
      {state === "ready" && <FileList />}
      <div className="mt-4 flex flex-wrap gap-x-5">
        <a className="source-link" href="#loading-spinner">読み込み表示の使い方</a>
        <a className="source-link" href="#alert-banner">エラー表示の使い方</a>
      </div>
    </>
  );
}
