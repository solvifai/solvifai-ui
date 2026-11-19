import { ChevronDown } from "lucide-react";
import type { ComponentPropsWithRef } from "react";

import { cn } from "./cn";

export type SelectBoxProps = Omit<ComponentPropsWithRef<"select">, "multiple" | "size">;

export function SelectBox({ className, ...props }: SelectBoxProps) {
  return (
    <div className="relative">
      <select
        {...props}
        className={cn(
          "h-[50px] w-full appearance-none rounded-lg border border-border-control bg-white pr-10 pl-4 text-base text-text-primary focus:border-brand-primary aria-invalid:border-rose-500 aria-invalid:focus-visible:outline-rose-500 disabled:cursor-not-allowed disabled:bg-product-bg disabled:text-text-muted forced-colors:appearance-auto",
          className,
        )}
      />
      <ChevronDown
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-text-muted forced-colors:hidden"
      />
    </div>
  );
}
