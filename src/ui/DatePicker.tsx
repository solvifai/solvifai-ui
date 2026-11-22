import type { ComponentPropsWithRef } from "react";

type DateInputProps = Omit<ComponentPropsWithRef<"input">, "type">;

export function DatePicker({ className = "", ...props }: DateInputProps) {
  return (
    <input
      {...props}
      type="date"
      className={`min-w-0 w-full rounded-lg border border-border-control bg-white px-3 py-2.5 text-sm text-text-primary outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary ${className}`}
    />
  );
}

export function DateTimePicker({ className = "", ...props }: DateInputProps) {
  return (
    <input
      {...props}
      type="datetime-local"
      className={`min-w-0 border-0 bg-transparent text-sm font-semibold outline-none ${className}`}
    />
  );
}
