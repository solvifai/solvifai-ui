interface TextInputProps {
  id?: string;
  name?: string;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function TextInput({
  id,
  name,
  value = '',
  onChange,
  placeholder,
  disabled = false,
  className = '',
}: TextInputProps) {
  return (
    <input
      id={id}
      name={name}
      type='text'
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      className={`w-full rounded-lg border border-border-control px-4 py-3 text-base text-text-primary outline-none placeholder:text-text-secondary ${
        disabled
          ? 'cursor-not-allowed bg-product-bg'
          : value
            ? 'bg-background-white'
            : 'bg-product-bg focus:border-brand-primary focus:ring-1 focus:ring-brand-primary'
      } ${className}`}
    />
  );
}
