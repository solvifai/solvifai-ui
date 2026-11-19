import { useId, useRef, useState, type DragEvent } from "react";

import { cn } from "./cn";
import { SpinnerIcon, UploadIcon } from "./icons";

interface FileUploadProps {
  onFiles: (files: File[]) => void;
  accept?: string;
  hint?: string;
  multiple?: boolean;
  disabled?: boolean;
  isUploading?: boolean;
  className?: string;
}

function matchesAccept(file: File, accept: string) {
  const rules = accept
    .toLowerCase()
    .split(",")
    .map((rule) => rule.trim())
    .filter(Boolean);
  const name = file.name.toLowerCase();
  const type = file.type.toLowerCase();
  return (
    rules.length === 0 ||
    rules.some((rule) => {
      if (rule.startsWith(".")) return name.endsWith(rule);
      if (rule.endsWith("/*")) return type.startsWith(rule.slice(0, -1));
      return type === rule;
    })
  );
}

export function FileUpload({
  onFiles,
  accept = "",
  hint,
  multiple = false,
  disabled = false,
  isUploading = false,
  className,
}: FileUploadProps) {
  const input = useRef<HTMLInputElement>(null);
  const dragDepth = useRef(0);
  const id = useId();
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState("");
  const unavailable = disabled || isUploading;

  function selectFiles(files: File[]) {
    if (unavailable || files.length === 0) return;
    if (!multiple && files.length > 1) {
      setError("ファイルは1件ずつ選択してください。");
      return;
    }
    if (files.some((file) => !matchesAccept(file, accept))) {
      setError("対応していない形式のファイルが含まれています。");
      return;
    }
    setError("");
    onFiles(files);
  }

  function handleDragEnter(event: DragEvent<HTMLDivElement>) {
    if (!event.dataTransfer.types.includes("Files")) return;
    event.preventDefault();
    if (!unavailable) {
      dragDepth.current += 1;
      setDragging(true);
    }
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    if (!event.dataTransfer.types.includes("Files")) return;
    event.preventDefault();
    dragDepth.current = 0;
    setDragging(false);
    selectFiles(Array.from(event.dataTransfer.files));
  }

  const describedBy = [hint ? `${id}-hint` : "", error ? `${id}-error` : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={cn("grid gap-2", className)}>
      <div
        onDragEnter={handleDragEnter}
        onDragOver={(event) => {
          if (!event.dataTransfer.types.includes("Files")) return;
          event.preventDefault();
          event.dataTransfer.dropEffect = unavailable ? "none" : "copy";
        }}
        onDragLeave={() => {
          dragDepth.current = Math.max(0, dragDepth.current - 1);
          if (dragDepth.current === 0) setDragging(false);
        }}
        onDrop={handleDrop}
      >
        <input
          ref={input}
          type="file"
          hidden
          accept={accept}
          multiple={multiple}
          disabled={unavailable}
          onChange={(event) => {
            selectFiles(Array.from(event.currentTarget.files ?? []));
            event.currentTarget.value = "";
          }}
        />
        <button
          type="button"
          aria-label="ファイルを選択"
          aria-describedby={describedBy || undefined}
          aria-busy={isUploading || undefined}
          disabled={unavailable}
          className={cn(
            "grid min-h-32 w-full justify-items-center gap-2 rounded-lg border-2 border-dashed px-4 py-6 text-center text-sm font-medium text-text-primary transition-colors",
            dragging && !unavailable
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300 bg-white enabled:hover:border-blue-400 enabled:hover:bg-gray-50",
            "disabled:cursor-not-allowed disabled:opacity-50",
          )}
          onClick={() => input.current?.click()}
        >
          {isUploading ? (
            <SpinnerIcon className="size-7 text-blue-600 motion-safe:animate-spin" />
          ) : (
            <UploadIcon className="size-7 text-blue-600" />
          )}
          <span>
            {isUploading
              ? "アップロード中…"
              : dragging
                ? "ここにドロップ"
                : "クリックまたはドラッグ＆ドロップでアップロード"}
          </span>
          {hint ? (
            <span id={`${id}-hint`} className="text-xs font-normal text-text-muted">
              {hint}
            </span>
          ) : null}
        </button>
      </div>
      {error ? (
        <p id={`${id}-error`} role="alert" className="text-xs text-rose-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}
