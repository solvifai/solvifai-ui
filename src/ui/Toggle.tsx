import { cn } from "./cn";

export interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  ariaLabel: string;
  disabled?: boolean;
  className?: string;
}

export function Toggle({ checked, onChange, ariaLabel, disabled, className }: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={cn(
        "inline-grid h-8 w-9 shrink-0 place-items-center rounded-full disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "relative h-4 w-7 rounded-full border border-transparent motion-safe:transition-colors forced-colors:border-[ButtonText]",
          checked ? "bg-blue-600" : "bg-gray-300",
        )}
      >
        <span
          className={cn(
            "absolute top-px left-px size-3 rounded-full bg-white shadow-sm motion-safe:transition-transform forced-colors:bg-[ButtonText]",
            checked && "translate-x-3",
          )}
        />
      </span>
    </button>
  );
}
