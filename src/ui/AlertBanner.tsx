import type { ReactNode } from "react";

import { cn } from "./cn";

interface AlertBannerProps {
  children: ReactNode;
  tone?: "error" | "warning";
  action?: ReactNode;
  className?: string;
}

const toneClasses = {
  error: "border-red-200 bg-red-50 text-red-700",
  warning: "border-amber-200 bg-amber-50 text-amber-800",
};

export function AlertBanner({ children, tone = "error", action, className }: AlertBannerProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-between gap-3 rounded-lg border p-4 text-sm",
        toneClasses[tone],
        className,
      )}
    >
      <div role={tone === "error" ? "alert" : "status"} className="min-w-0">
        {children}
      </div>
      {action}
    </div>
  );
}
