import type { ComponentPropsWithRef } from "react";

import { cn } from "./cn";

export function TextArea({ className, rows = 3, ...props }: ComponentPropsWithRef<"textarea">) {
  return (
    <textarea
      {...props}
      rows={rows}
      className={cn(
        "min-w-0 w-full resize-y rounded-lg border border-border-control bg-white px-3 py-2.5 text-sm text-text-primary outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary aria-invalid:border-rose-500",
        className,
      )}
    />
  );
}
