import {
  cloneElement,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type ReactElement,
} from "react";

import { cn } from "./cn";

interface TooltipProps {
  content: string;
  children: ReactElement<{ "aria-describedby"?: string }>;
  side?: "top" | "bottom";
}

export function Tooltip({ content, children, side = "bottom" }: TooltipProps) {
  const id = useId();
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const tooltip = useRef<HTMLSpanElement>(null);
  const open = Boolean(content) && (hovered || focused) && !dismissed;

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setDismissed(true);
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  useLayoutEffect(() => {
    const bubble = tooltip.current;
    if (!open || !bubble) return;
    const keepInsideViewport = () => {
      bubble.style.marginLeft = "";
      const { left, right } = bubble.getBoundingClientRect();
      const offset = Math.max(0, 8 - left) - Math.max(0, right - window.innerWidth + 8);
      if (offset) bubble.style.marginLeft = `${offset}px`;
    };
    keepInsideViewport();
    window.addEventListener("resize", keepInsideViewport);
    return () => window.removeEventListener("resize", keepInsideViewport);
  }, [open, content, side]);

  const describedBy = [children.props["aria-describedby"], content ? id : undefined]
    .filter(Boolean)
    .join(" ");

  return (
    <span
      className="relative inline-flex max-w-full"
      onPointerEnter={(event) => {
        if (event.pointerType === "touch") return;
        setHovered(true);
        setDismissed(false);
      }}
      onPointerLeave={() => setHovered(false)}
      onFocus={() => {
        setFocused(true);
        setDismissed(false);
      }}
      onBlur={() => setFocused(false)}
    >
      {cloneElement(children, { "aria-describedby": describedBy || undefined })}
      <span
        ref={tooltip}
        id={id}
        role="tooltip"
        hidden={!open}
        className={cn(
          "absolute left-1/2 z-30 w-max max-w-[min(16rem,calc(100vw_-_16px))] -translate-x-1/2",
          side === "bottom" ? "top-full pt-1.5" : "bottom-full pb-1.5",
        )}
      >
        <span className="block rounded bg-gray-900 px-2 py-1 text-xs leading-normal wrap-break-word text-white">
          {content}
        </span>
      </span>
    </span>
  );
}
