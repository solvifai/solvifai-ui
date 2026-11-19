import { useId, type KeyboardEvent, type ReactNode } from "react";

import { cn } from "./cn";

export interface TabItem<Value extends string = string> {
  value: Value;
  label: string;
  panel: ReactNode;
  disabled?: boolean;
}

interface TabsProps<Value extends string> {
  tabs: readonly TabItem<Value>[];
  value: Value;
  onChange: (value: Value) => void;
  ariaLabel: string;
  className?: string;
}

export function Tabs<Value extends string>({
  tabs,
  value,
  onChange,
  ariaLabel,
  className,
}: TabsProps<Value>) {
  const id = useId();
  const enabled = tabs.filter((tab) => !tab.disabled);
  const active = enabled.find((tab) => tab.value === value) ?? enabled[0];
  const tabId = (tab: TabItem<Value>) => `${id}-tab-${tab.value}`;
  const panelId = (tab: TabItem<Value>) => `${id}-panel-${tab.value}`;

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, tab: TabItem<Value>) {
    const index = enabled.indexOf(tab);
    let next: TabItem<Value> | undefined;
    switch (event.key) {
      case "ArrowLeft":
        next = enabled[(index - 1 + enabled.length) % enabled.length];
        break;
      case "ArrowRight":
        next = enabled[(index + 1) % enabled.length];
        break;
      case "Home":
        next = enabled[0];
        break;
      case "End":
        next = enabled.at(-1);
        break;
      default:
        return;
    }
    if (!next) return;
    event.preventDefault();
    document.getElementById(tabId(next))?.focus();
    onChange(next.value);
  }

  return (
    <div className={cn("grid min-w-0 gap-3", className)}>
      <div
        role="tablist"
        aria-label={ariaLabel}
        className="flex w-fit max-w-full flex-wrap rounded-xl bg-gray-100 p-1"
      >
        {tabs.map((tab) => {
          const selected = tab === active;
          return (
            <button
              key={tab.value}
              id={tabId(tab)}
              type="button"
              role="tab"
              aria-controls={panelId(tab)}
              aria-selected={selected}
              tabIndex={selected ? 0 : -1}
              disabled={tab.disabled}
              onClick={() => onChange(tab.value)}
              onKeyDown={(event) => handleKeyDown(event, tab)}
              className={cn(
                "rounded-lg px-3 py-1.5 text-sm transition-colors sm:px-5",
                selected
                  ? "bg-white font-medium text-brand-foreground shadow-sm"
                  : "text-text-muted enabled:hover:text-text-primary",
                "disabled:cursor-not-allowed disabled:opacity-50",
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      {tabs.map((tab) => (
        <div
          key={tab.value}
          id={panelId(tab)}
          role="tabpanel"
          aria-labelledby={tabId(tab)}
          tabIndex={0}
          hidden={tab !== active}
        >
          {tab.panel}
        </div>
      ))}
    </div>
  );
}
