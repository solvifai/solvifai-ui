import { useEffect, useRef, useState } from "react";

import { AppButton } from "../ui/AppButton";
import { Badge } from "../ui/Badge";
import { FileUpload } from "../ui/FileUpload";
import { ProgressBar } from "../ui/ProgressBar";

type UploadItem = {
  id: number;
  name: string;
  progress: number;
  status: "uploading" | "completed" | "failed";
  failOnce: boolean;
};

const sampleNames = ["散歩メモ.txt", "観察記録.csv", "公園の地図.pdf"];

export function UploadDemo() {
  const [items, setItems] = useState<UploadItem[]>([]);
  const nextId = useRef(0);
  const uploading = items.some(({ status }) => status === "uploading");
  const completed = items.filter(({ status }) => status === "completed").length;
  const failed = items.filter(({ status }) => status === "failed").length;

  useEffect(() => {
    if (!uploading) return;
    const timer = window.setInterval(() => {
      setItems((current) =>
        current.map((item) => {
          if (item.status !== "uploading") return item;
          const progress = Math.min(item.progress + 15 + (item.id % 3) * 5, 100);
          if (progress < 100) return { ...item, progress };
          return { ...item, progress, status: item.failOnce ? "failed" : "completed" };
        }),
      );
    }, 220);
    return () => window.clearInterval(timer);
  }, [uploading]);

  function addFiles(names: string[]) {
    const next = names.map<UploadItem>((name, index) => ({
      id: nextId.current++,
      name,
      progress: 0,
      status: "uploading",
      failOnce: index === 1,
    }));
    setItems((current) => [...current, ...next]);
  }

  function retry(id: number) {
    setItems((current) =>
      current.map((item) =>
        item.id === id && item.status === "failed"
          ? { ...item, progress: 0, status: "uploading", failOnce: false }
          : item,
      ),
    );
  }

  return (
    <>
      <section
        aria-labelledby="upload-demo-heading"
        className="mt-2 grid gap-4 rounded-xl border border-catalog-line bg-white p-4 sm:p-5"
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 id="upload-demo-heading" className="text-base font-bold">ファイルを追加</h2>
          <AppButton variant="back" disabled={uploading} onClick={() => addFiles(sampleNames)}>
            サンプル3件で試す
          </AppButton>
        </div>
        <FileUpload
          multiple
          isUploading={uploading}
          onFiles={(files) => addFiles(files.map(({ name }) => name))}
          hint="複数選択すると、2件目は初回だけ失敗します。"
        />
        <p role="status" className={items.length ? "text-sm text-catalog-muted" : "sr-only"}>
          {items.length > 0 ? `${items.length}件中 ${completed}件完了、${failed}件失敗` : ""}
        </p>
        {items.length > 0 && (
          <ul aria-label="ファイルごとの結果" className="grid gap-2">
            {items.map((item) => (
              <li key={item.id} tabIndex={-1} className="grid min-w-0 gap-2 rounded-lg border border-catalog-line p-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="min-w-0 break-all text-sm font-semibold">{item.name}</span>
                  {item.status === "completed" && <Badge label="完了" color="green" />}
                  {item.status === "failed" && <Badge label="失敗" color="red" />}
                </div>
                {item.status === "uploading" && <ProgressBar progress={item.progress} label="アップロード中" />}
                {item.status === "failed" && (
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-sm text-catalog-muted">通信エラー（デモ）</p>
                    <AppButton
                      variant="back"
                      aria-label={`${item.name}を再試行`}
                      onClick={(event) => {
                        retry(item.id);
                        event.currentTarget.closest("li")?.focus();
                      }}
                    >
                      再試行
                    </AppButton>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
      <div className="mt-4 flex flex-wrap gap-x-5">
        <a className="source-link" href="#file-upload">アップロード欄の使い方</a>
        <a className="source-link" href="#progress-bar">進捗表示の使い方</a>
      </div>
    </>
  );
}
