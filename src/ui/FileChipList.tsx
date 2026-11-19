import { XIcon } from "lucide-react";

import { FileTypeIcon } from "./FileTypeIcon";
import { DocumentGradientIcon } from "./icons";

export interface SelectedFile {
  id: string;
  file?: File;
  name: string;
  ext?: string;
  source: "local" | "document" | "minute";
  sourceId?: number;
}

export interface FileChipListProps {
  files: readonly SelectedFile[];
  onRemove: (id: string) => void;
}

export function FileChipList({ files, onRemove }: FileChipListProps) {
  if (files.length === 0) return null;
  return (
    <ul aria-label="添付ファイル" className="flex flex-wrap gap-2">
      {files.map((f) => (
        <li
          key={f.id}
          className="inline-flex min-h-[41px] min-w-0 max-w-full items-center gap-2 rounded-lg bg-product-bg border border-border-control px-3 py-2 text-sm text-text-primary"
        >
          {f.source === "minute" ? (
            <DocumentGradientIcon
              className="size-4 shrink-0 text-text-secondary"
              color="currentColor"
            />
          ) : (
            <FileTypeIcon
              extension={f.ext}
              fileName={f.file?.name ?? f.name}
              className="size-5"
              nativeTooltip={false}
            />
          )}
          <span className="truncate" title={f.name}>
            {f.name}
          </span>
          <button
            type="button"
            aria-label={`${f.name}を取り外す`}
            onClick={() => onRemove(f.id)}
            className="grid size-7 shrink-0 place-items-center rounded text-text-muted hover:bg-gray-200 hover:text-text-primary"
          >
            <XIcon className="size-3.5" aria-hidden="true" />
          </button>
        </li>
      ))}
    </ul>
  );
}
