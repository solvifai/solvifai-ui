import type { ComponentPropsWithRef } from "react";

import { cn } from "./cn";

export interface RadioProps extends Omit<ComponentPropsWithRef<"input">, "type" | "children"> {
  label: string;
}

export function Radio({ label, className, ...props }: RadioProps) {
  return (
    <label
      className={cn(
        "flex items-center gap-2 text-sm has-disabled:opacity-50",
        className,
      )}
    >
      <input
        {...props}
        type="radio"
        className="accent-brand-primary"
      />
      {label}
    </label>
  );
}
