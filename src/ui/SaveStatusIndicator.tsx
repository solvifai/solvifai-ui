import { AlertCircle, Check, Cloud, Loader2 } from "lucide-react";

import { cn } from "./cn";

export type SaveStatus = "idle" | "saving" | "saved" | "error";

export interface SaveStatusIndicatorProps {
  status: SaveStatus;
  className?: string;
}

function SyncedCloudIcon() {
  return (
    <span className="relative inline-flex shrink-0" aria-hidden="true">
      <Cloud className="size-4" />
      <span className="absolute -right-0.5 -bottom-0.5 grid size-2.5 place-items-center rounded-full bg-white">
        <Check className="size-2" strokeWidth={3} />
      </span>
    </span>
  );
}

const indicators = {
  idle: {
    icon: <Cloud size={16} aria-hidden="true" />,
    color: "text-text-muted",
    label: "保存待機中",
  },
  saving: {
    icon: <Loader2 size={14} className="motion-safe:animate-spin" aria-hidden="true" />,
    color: "text-text-muted",
    label: "保存中…",
  },
  saved: {
    icon: <SyncedCloudIcon />,
    color: "text-emerald-700",
    label: "保存済み",
  },
  error: {
    icon: <AlertCircle size={14} aria-hidden="true" />,
    color: "text-rose-700",
    label: "保存に失敗しました",
  },
} satisfies Record<SaveStatus, { icon: React.ReactNode; color: string; label: string }>;

export function SaveStatusIndicator({ status, className }: SaveStatusIndicatorProps) {
  const { icon, color, label } = indicators[status];

  return (
    <span
      role="status"
      className={cn("inline-flex items-center gap-1.5 text-xs", color, className)}
    >
      {icon}
      {label}
    </span>
  );
}
