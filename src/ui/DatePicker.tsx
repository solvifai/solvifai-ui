import type { ComponentPropsWithRef } from "react";

import { cn } from "./cn";

type PickerProps = Omit<ComponentPropsWithRef<"input">, "type">;

function PickerInput({ className, ...props }: PickerProps & { type: "date" | "datetime-local" }) {
  return (
    <input
      {...props}
      className={cn(
        "min-w-0 w-full rounded-lg border border-border-control bg-white px-3 py-2.5 text-sm text-text-primary focus:border-brand-primary aria-invalid:border-rose-500 aria-invalid:focus-visible:outline-rose-500 disabled:cursor-not-allowed disabled:bg-product-bg",
        className,
      )}
    />
  );
}

export function DatePicker(props: PickerProps) {
  return <PickerInput {...props} type="date" />;
}

export function DateTimePicker(props: PickerProps) {
  return <PickerInput {...props} type="datetime-local" />;
}
