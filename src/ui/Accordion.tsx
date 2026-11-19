import type { ComponentPropsWithRef, ReactNode } from "react";

import { cn } from "./cn";
import { ChevronDownIcon } from "./icons";

export interface AccordionProps extends ComponentPropsWithRef<"details"> {
  heading: ReactNode;
}

export function Accordion({ heading, children, className, ...props }: AccordionProps) {
  return (
    <details
      {...props}
      className={cn("group rounded-lg border border-border-control bg-white", className)}
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-text-primary hover:bg-product-bg [&::-webkit-details-marker]:hidden">
        <span>{heading}</span>
        <ChevronDownIcon className="size-4 shrink-0 text-brand-foreground motion-safe:transition-transform group-open:rotate-180" />
      </summary>
      <div className="px-3 pt-1 pb-3 text-sm text-text-muted">{children}</div>
    </details>
  );
}
