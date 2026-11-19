import {
  Children,
  isValidElement,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactElement,
  type ReactNode,
} from "react";

import { cn } from "./cn";
import { CheckIcon, ChevronDownIcon } from "./icons";

interface StepProps {
  title: string;
  complete: boolean;
  children?: ReactNode;
}

export function Step(_props: StepProps) {
  return null;
}

export function SteppedForm({ children, className }: { children: ReactNode; className?: string }) {
  const id = useId();
  const steps = Children.toArray(children).filter(
    (child): child is ReactElement<StepProps> => isValidElement(child) && child.type === Step,
  );
  const completeSnapshot = steps.map(({ props }) => (props.complete ? "1" : "0")).join("");
  const currentIndex = completeSnapshot.indexOf("0");
  const previous = useRef("");
  const [openIndices, setOpenIndices] = useState<Set<number>>(() => new Set([0]));

  useEffect(() => {
    const toOpen = Array.from(completeSnapshot).flatMap((complete, index) =>
      complete === "1" && previous.current[index] !== "1" && index + 1 < completeSnapshot.length
        ? [index + 1]
        : [],
    );
    previous.current = completeSnapshot;
    if (toOpen.length > 0) setOpenIndices((open) => new Set([...open, ...toOpen]));
  }, [completeSnapshot]);

  function toggle(index: number) {
    setOpenIndices((open) => {
      const next = new Set(open);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  }

  return (
    <ol className={cn("grid gap-2", className)}>
      {steps.map(({ key, props }, index) => {
        const expanded = openIndices.has(index);
        const buttonId = `${id}-step-${index}`;
        const panelId = `${buttonId}-content`;
        return (
          <li key={key} className="rounded-lg border border-border-control bg-white">
            <button
              id={buttonId}
              type="button"
              aria-expanded={expanded}
              aria-controls={panelId}
              aria-current={index === currentIndex ? "step" : undefined}
              onClick={() => toggle(index)}
              className="flex min-h-12 w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium hover:bg-product-bg"
            >
              <span
                aria-hidden="true"
                className="grid size-5 shrink-0 place-items-center rounded-full bg-brand-gradient text-xs text-white"
              >
                {props.complete ? <CheckIcon className="size-3.5" /> : index + 1}
              </span>
              <span className="min-w-0 flex-1">{props.title}</span>
              {props.complete ? <span className="text-xs text-emerald-700">完了</span> : null}
              <ChevronDownIcon
                className={cn(
                  "size-4 shrink-0 text-text-muted motion-safe:transition-transform",
                  expanded && "rotate-180",
                )}
              />
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!expanded}
              className="px-3 pt-1 pb-3"
            >
              {props.children}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
