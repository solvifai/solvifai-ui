import { cn } from "./cn";
import "./Skeleton.css";

interface SkeletonProps {
  label: string;
  className?: string;
}

export function Skeleton({ label, className }: SkeletonProps) {
  return (
    <div
      role="status"
      className={cn("grid min-h-32 content-center justify-items-center gap-2 px-3 py-4", className)}
    >
      <svg width="48" height="42" viewBox="0 0 48 42" fill="none" aria-hidden="true">
        <rect width="48" height="32" rx="10" className="fill-gray-300" />
        <path d="M6 32h10L6 42Z" className="fill-gray-300" />
        <circle cx="14" cy="16" r="3.5" className="fill-gray-400" />
        <circle cx="24" cy="16" r="3.5" className="fill-gray-400" />
        <circle cx="34" cy="16" r="3.5" className="fill-gray-400" />
      </svg>
      <span className="text-center text-sm font-medium text-[#1e3180]">{label}</span>
      <span
        aria-hidden="true"
        className="h-1.5 w-50 max-w-full overflow-hidden rounded-full bg-gray-200"
      >
        <span className="skeleton-track-fill block h-full w-2/5 rounded-full bg-[#1e3180]" />
      </span>
    </div>
  );
}
