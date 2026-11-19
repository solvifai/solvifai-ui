import { cn } from "./cn";

/** Original folder artwork, from the SolvifAI file list. */
export function FolderIcon({ className }: { className?: string }) {
  return (
    <img
      src={import.meta.env.BASE_URL + "folder.svg"}
      alt="フォルダ"
      width={28}
      height={28}
      className={cn("size-7 shrink-0 object-contain", className)}
      draggable={false}
    />
  );
}
