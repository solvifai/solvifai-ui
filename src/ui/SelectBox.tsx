import { type KeyboardEvent, useEffect, useId, useRef, useState } from "react";

import { cn } from "./cn";
import { CheckIcon, ChevronDownIcon } from "./icons";

export interface SelectBoxOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectBoxProps {
  options: readonly SelectBoxOption[];
  value: string;
  onChange: (value: string) => void;
  id?: string;
  name?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  invalid?: boolean;
  describedBy?: string;
  className?: string;
}

export function SelectBox({
  options,
  value,
  onChange,
  id,
  name,
  placeholder = "選択してください",
  disabled = false,
  required = false,
  invalid = false,
  describedBy,
  className,
}: SelectBoxProps) {
  const [open, setOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const container = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const listboxId = useId();
  const selectedIndex = options.findIndex((option) => option.value === value);
  const enabledIndices = options.flatMap((option, index) => (option.disabled ? [] : [index]));
  const isDisabled = disabled || enabledIndices.length === 0;
  const expanded = open && !isDisabled;
  const initialIndex = enabledIndices.includes(selectedIndex) ? selectedIndex : enabledIndices[0];
  const activeIndex = enabledIndices.includes(highlightedIndex) ? highlightedIndex : initialIndex;
  const activePosition = enabledIndices.indexOf(activeIndex);

  useEffect(() => {
    if (isDisabled) {
      setOpen(false);
      return;
    }
    if (!expanded) return;
    const closeOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !container.current?.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("pointerdown", closeOutside);
    return () => document.removeEventListener("pointerdown", closeOutside);
  }, [expanded, isDisabled]);

  useEffect(() => {
    if (expanded) {
      document.getElementById(`${listboxId}-${activeIndex}`)?.scrollIntoView({ block: "nearest" });
    }
  }, [expanded, listboxId, activeIndex]);

  function choose(index: number) {
    const option = options[index];
    if (isDisabled || !option || option.disabled) return;
    if (option.value !== value) onChange(option.value);
    setOpen(false);
    trigger.current?.focus();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    switch (event.key) {
      case "Tab":
        setOpen(false);
        return;
      case "Escape":
        if (expanded) {
          event.preventDefault();
          event.stopPropagation();
          setOpen(false);
        }
        return;
      case "Enter":
      case " ":
        if (!expanded) return;
        event.preventDefault();
        event.stopPropagation();
        choose(activeIndex);
        return;
      case "Home":
      case "End":
      case "ArrowDown":
      case "ArrowUp": {
        event.preventDefault();
        event.stopPropagation();
        const last = enabledIndices.length - 1;
        if (event.key === "Home") {
          setHighlightedIndex(enabledIndices[0]);
        } else if (event.key === "End") {
          setHighlightedIndex(enabledIndices[last]);
        } else if (expanded) {
          const step = event.key === "ArrowDown" ? 1 : -1;
          setHighlightedIndex(
            enabledIndices[(activePosition + step + enabledIndices.length) % enabledIndices.length],
          );
        } else {
          setHighlightedIndex(
            selectedIndex === -1 && event.key === "ArrowUp" ? enabledIndices[last] : initialIndex,
          );
        }
        setOpen(true);
      }
    }
  }

  return (
    <div
      ref={container}
      className="relative"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
    >
      {name ? <input type="hidden" name={name} value={value} disabled={isDisabled} /> : null}
      <button
        ref={trigger}
        id={id}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={expanded}
        aria-controls={expanded ? listboxId : undefined}
        aria-activedescendant={expanded ? `${listboxId}-${activeIndex}` : undefined}
        aria-required={required || undefined}
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy}
        disabled={isDisabled}
        onClick={() => {
          setHighlightedIndex(initialIndex);
          setOpen(!expanded);
        }}
        onKeyDown={handleKeyDown}
        className={cn(
          "flex min-h-10 w-full items-center justify-between gap-2 rounded-lg border border-border-control bg-white px-3 py-2 text-left text-sm text-text-primary transition-colors enabled:hover:border-brand-primary aria-expanded:border-brand-primary aria-invalid:border-rose-500 aria-invalid:focus-visible:outline-rose-500 disabled:cursor-not-allowed disabled:bg-product-bg disabled:text-text-muted",
          className,
        )}
      >
        <span className={selectedIndex === -1 ? "text-text-muted" : undefined}>
          {options[selectedIndex]?.label ?? placeholder}
        </span>
        <ChevronDownIcon
          className={cn(
            "size-4 shrink-0 text-text-muted motion-safe:transition-transform",
            expanded && "rotate-180",
          )}
        />
      </button>
      {expanded ? (
        <div
          id={listboxId}
          role="listbox"
          aria-label="選択肢"
          className="absolute top-full left-0 z-50 mt-1 max-h-60 w-full overflow-y-auto rounded-xl border border-border-control bg-white p-1 shadow-lg"
        >
          {options.map((option, index) => (
            <button
              key={option.value}
              id={`${listboxId}-${index}`}
              type="button"
              role="option"
              aria-selected={index === selectedIndex}
              disabled={option.disabled}
              tabIndex={-1}
              onMouseDown={(event) => event.preventDefault()}
              onMouseEnter={() => {
                if (!option.disabled) setHighlightedIndex(index);
              }}
              onClick={() => choose(index)}
              className={cn(
                "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-text-primary disabled:cursor-not-allowed disabled:text-text-muted",
                activeIndex === index && "bg-brand-primary/10",
                index === selectedIndex && "font-medium text-brand-foreground",
              )}
            >
              <span className="flex size-4 shrink-0 items-center justify-center">
                {index === selectedIndex ? <CheckIcon /> : null}
              </span>
              <span>{option.label}</span>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
