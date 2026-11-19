import { useState } from "react";

import { cn } from "./cn";
import { FileIcon } from "./icons";

const fluentAssets = "https://res.cdn.office.net/files/fabric-cdn-prod_20260623.001/assets/";

const genericFileSrc = fluentAssets + "item-types/48/genericfile.png";

interface FileType {
  label: string;
  extensions: string[];
  src: string;
}

export const fileTypes: readonly FileType[] = [
  {
    label: "Word",
    extensions: ["docx", "doc", "docm"],
    src: fluentAssets + "brand-icons/product/png/word_48x1.png",
  },
  {
    label: "Excel",
    extensions: ["xlsx", "xls", "xlsm", "xlsb"],
    src: fluentAssets + "brand-icons/product/png/excel_48x1.png",
  },
  {
    label: "PowerPoint",
    extensions: ["pptx", "ppt", "pptm"],
    src: fluentAssets + "brand-icons/product/png/powerpoint_48x1.png",
  },
  {
    label: "PDF",
    extensions: ["pdf"],
    src: "https://drive-thirdparty.googleusercontent.com/64/type/application/pdf",
  },
  { label: "CSV", extensions: ["csv"], src: fluentAssets + "item-types/48/csv.png" },
  { label: "テキスト", extensions: ["txt"], src: fluentAssets + "item-types/48/txt.png" },
  {
    label: "画像",
    extensions: ["png", "jpg", "jpeg", "gif", "webp", "bmp", "tif", "tiff", "heic"],
    src: fluentAssets + "item-types/48/photo.png",
  },
  {
    label: "音声",
    extensions: ["mp3", "wav", "m4a", "opus", "ogg", "flac", "wma", "aac", "amr", "spx"],
    src: fluentAssets + "item-types/48/audio.png",
  },
  {
    label: "動画",
    extensions: ["mp4", "webm", "mov", "avi", "wmv"],
    src: fluentAssets + "item-types/48/video.png",
  },
  {
    label: "その他のファイル",
    extensions: [],
    src: genericFileSrc,
  },
];

const fileTypeByExtension = new Map(
  fileTypes.flatMap((type) => type.extensions.map((extension) => [extension, type] as const)),
);

interface FileTypeIconProps {
  extension?: string | null;
  fileName?: string;
  className?: string;
  nativeTooltip?: boolean;
}

/** Mirrors the file-format mapping used in the SolvifAI file list. */
export function FileTypeIcon({
  extension,
  fileName,
  className,
  nativeTooltip = true,
}: FileTypeIconProps) {
  const [failedSrc, setFailedSrc] = useState<string>();
  const ext = (
    extension?.trim().replace(/^\./, "") ||
    (fileName?.includes(".") ? fileName.split(".").pop() : "") ||
    ""
  ).toLowerCase();
  const fileType = fileTypeByExtension.get(ext);
  const label = ext ? `${fileType?.label ?? "ファイル"} (.${ext})` : "ファイル";
  const src = fileType?.src ?? genericFileSrc;
  const title = nativeTooltip ? label : undefined;
  const classes = cn("size-6 shrink-0 object-contain", className);

  if (failedSrc === src) {
    return (
      <span role="img" aria-label={label} title={title} className={classes}>
        <FileIcon className="size-full" />
      </span>
    );
  }

  return (
    <img
      src={src}
      alt={label}
      title={title}
      width={24}
      height={24}
      className={classes}
      draggable={false}
      referrerPolicy="no-referrer"
      onError={() => setFailedSrc(src)}
    />
  );
}
