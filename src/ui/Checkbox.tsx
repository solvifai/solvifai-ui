interface CheckboxProps {
  checked: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  onChange: () => void;
  className?: string;
  ariaLabel?: string;
}

export function Checkbox({
  checked,
  indeterminate,
  disabled,
  onChange,
  className = '',
  ariaLabel,
}: CheckboxProps) {
  const active = checked || indeterminate;

  return (
    <button
      type='button'
      role='checkbox'
      aria-checked={indeterminate ? 'mixed' : checked}
      aria-disabled={disabled}
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={disabled ? undefined : onChange}
      className={`flex size-5 shrink-0 items-center justify-center rounded transition-colors ${
        disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
      } ${
        active
          ? 'bg-brand-gradient'
          : 'bg-white outline outline-2 -outline-offset-2 outline-border-secondary'
      } ${className}`}
    >
      {indeterminate && !checked ? (
        <svg width='10' height='2' viewBox='0 0 10 2' fill='none'>
          <path
            d='M1 1H9'
            stroke='white'
            strokeWidth='2'
            strokeLinecap='round'
          />
        </svg>
      ) : (
        <svg
          width='10'
          height='8'
          viewBox='0 0 10 8'
          fill='none'
          className={`transition-opacity ${checked ? 'opacity-100' : 'opacity-0'}`}
        >
          <path
            d='M1 4L3.5 6.5L9 1'
            stroke='white'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      )}
    </button>
  );
}
