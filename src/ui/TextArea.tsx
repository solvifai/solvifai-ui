import type { ComponentPropsWithRef } from "react";

import { cn } from "./cn";

export function TextArea({ className, rows = 3, ...props }: ComponentPropsWithRef<"textarea">) {
  return (
    <textarea
      {...props}
      rows={rows}
      className={cn(
        "min-w-0 w-full resize-y rounded-lg border border-border-control bg-white px-3 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:border-brand-primary read-only:bg-product-bg aria-invalid:border-rose-500 aria-invalid:focus-visible:outline-rose-500 disabled:cursor-not-allowed disabled:bg-product-bg",
        className,
      )}
    />
  );
}
