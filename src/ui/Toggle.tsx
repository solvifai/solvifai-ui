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
        "relative mx-2 h-4 w-7 shrink-0 rounded-full motion-safe:transition-colors disabled:cursor-not-allowed disabled:opacity-50",
        checked ? "bg-blue-600" : "bg-gray-300",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "absolute top-0.5 left-0.5 size-3 rounded-full bg-white shadow-sm motion-safe:transition-transform forced-colors:bg-[ButtonText]",
          checked && "translate-x-3",
        )}
      />
    </button>
  );
}
