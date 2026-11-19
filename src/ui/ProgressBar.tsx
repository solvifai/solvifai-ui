import { cn } from "./cn";

interface ProgressBarProps {
  progress: number;
  label: string;
  className?: string;
}

export function ProgressBar({ progress, label, className }: ProgressBarProps) {
  const value = Number.isFinite(progress) ? Math.max(0, Math.min(100, Math.round(progress))) : 0;

  return (
    <div
      className={cn(
        "grid gap-2 rounded-lg border border-blue-200 bg-blue-50 px-3 py-2.5",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-2 text-xs font-medium text-blue-900">
        <span>{label}</span>
        <span aria-hidden="true" className="tabular-nums text-blue-800">
          {value}%
        </span>
      </div>
      <div
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={value}
        className="h-1.5 overflow-hidden rounded-full bg-blue-200"
      >
        <div
          className="h-full rounded-full bg-blue-600 motion-safe:transition-[width] motion-safe:duration-300"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}
