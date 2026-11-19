export interface TextInputProps {
  id?: string;
  name?: string;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  invalid?: boolean;
  describedBy?: string;
  className?: string;
}

export function TextInput({
  id,
  name,
  value = "",
  onChange,
  placeholder,
  disabled = false,
  invalid = false,
  describedBy,
  className = "",
}: TextInputProps) {
  return (
    <input
      id={id}
      name={name}
      type="text"
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      aria-invalid={invalid || undefined}
      aria-describedby={describedBy}
      className={`w-full rounded-lg border px-4 py-3 text-base text-text-primary outline-none placeholder:text-text-muted focus:ring-1 ${
        invalid
          ? "border-rose-500 focus:ring-rose-500"
          : "border-border-control focus:border-brand-primary focus:ring-brand-primary"
      } ${
        disabled
          ? "cursor-not-allowed bg-product-bg"
          : value
            ? "bg-background-white"
            : "bg-product-bg"
      } ${className}`}
    />
  );
}
