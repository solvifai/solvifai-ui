export interface OptionGroupOption {
  value: string;
  label: string;
  description?: string;
  count?: number;
  disabled?: boolean;
}

export interface OptionGroupProps {
  options: readonly OptionGroupOption[];
  value?: string;
  onChange?: (value: string) => void;
  columns?: number;
  disabled?: boolean;
  ariaLabel?: string;
  className?: string;
}

export function OptionGroup({
  options,
  value,
  onChange,
  columns = 2,
  disabled = false,
  ariaLabel,
  className = "",
}: OptionGroupProps) {
  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className={`grid gap-3 ${className}`}
      style={{ gridTemplateColumns: `repeat(${Math.max(1, columns)}, minmax(0, 1fr))` }}
    >
      {options.map((option) => {
        const selected = option.value === value;
        const isDisabled = disabled || !!option.disabled;
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={selected}
            disabled={isDisabled}
            onClick={() => onChange?.(option.value)}
            className={`rounded-lg border px-4 py-3 text-left text-base transition-colors ${
              isDisabled
                ? "cursor-not-allowed border-transparent bg-product-bg text-text-muted"
                : selected
                  ? "cursor-pointer border-brand-primary bg-function-lowblue"
                  : "cursor-pointer border-border-control bg-background-white text-text-primary hover:bg-function-lowblue"
            }`}
            style={selected ? { borderWidth: "0.5px" } : undefined}
          >
            {option.description ? (
              <span className="grid gap-0.5">
                <span
                  className={`font-medium ${selected && !isDisabled ? "text-brand-foreground" : ""}`}
                >
                  {option.label}
                </span>
                <span className="text-xs font-normal text-text-muted">{option.description}</span>
              </span>
            ) : (
              <span
                className={`flex items-center justify-between ${selected && !isDisabled ? "text-brand-foreground" : ""}`}
              >
                {option.label}
                {option.count != null && <span className="text-xs">{option.count}</span>}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
