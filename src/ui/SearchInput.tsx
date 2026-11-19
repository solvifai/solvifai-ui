import { SearchIcon } from "./icons";

export interface SearchInputProps {
  value: string;
  ariaLabel?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function SearchInput({
  value,
  ariaLabel = "検索",
  onChange,
  placeholder = "検索",
  className = "",
}: SearchInputProps) {
  return (
    <div className={`relative ${className}`}>
      <SearchIcon className="absolute top-1/2 left-3.5 -translate-y-1/2 text-text-muted" />
      <input
        type="search"
        aria-label={ariaLabel}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-9 w-full rounded-lg border border-border-control bg-white pr-3.5 pl-10 text-xs text-text-primary transition-colors outline-none placeholder:text-text-primary focus:border-brand-primary focus:ring-1 focus:ring-brand-primary"
      />
    </div>
  );
}
