import type { ComponentPropsWithRef } from "react";

import { cn } from "./cn";

export interface RadioProps extends Omit<ComponentPropsWithRef<"input">, "type" | "children"> {
  label: string;
}

export function Radio({ label, className, ...props }: RadioProps) {
  return (
    <label
      className={cn(
        "flex cursor-pointer items-center gap-2.5 rounded-md bg-gray-100 px-3 py-2.5 text-sm text-text-primary has-disabled:cursor-not-allowed has-disabled:opacity-50",
        className,
      )}
    >
      <input
        {...props}
        type="radio"
        className="relative grid size-4 shrink-0 appearance-none place-items-center rounded-full border border-[#1e3180] bg-white checked:before:size-2 checked:before:rounded-full checked:before:bg-[#1e3180] checked:before:content-[''] forced-colors:appearance-auto forced-colors:before:hidden"
      />
      {label}
    </label>
  );
}
