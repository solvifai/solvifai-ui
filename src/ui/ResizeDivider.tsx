import { useRef, useState, type KeyboardEvent, type PointerEvent } from "react";

import { cn } from "./cn";

interface ResizeDividerProps {
  position: "left" | "right";
  ariaLabel: string;
  controls?: string;
  value: number;
  min: number;
  max: number;
  onResize: (delta: number) => void;
  onResizeStart?: () => void;
  onResizeEnd?: () => void;
}

export function ResizeDivider({
  position,
  ariaLabel,
  controls,
  value,
  min,
  max,
  onResize,
  onResizeStart,
  onResizeEnd,
}: ResizeDividerProps) {
  const drag = useRef<{ pointer: number; x: number } | null>(null);
  const [dragging, setDragging] = useState(false);
  const direction = position === "left" ? 1 : -1;

  function start(event: PointerEvent<HTMLDivElement>) {
    if (event.button !== 0 || drag.current) return;
    event.preventDefault();
    event.currentTarget.focus({ preventScroll: true });
    event.currentTarget.setPointerCapture(event.pointerId);
    drag.current = { pointer: event.pointerId, x: event.clientX };
    setDragging(true);
    onResizeStart?.();
  }

  function move(event: PointerEvent<HTMLDivElement>) {
    if (drag.current?.pointer !== event.pointerId) return;
    const delta = event.clientX - drag.current.x;
    drag.current.x = event.clientX;
    if (delta !== 0) onResize(delta * direction);
  }

  function end(event: PointerEvent<HTMLDivElement>) {
    if (drag.current?.pointer !== event.pointerId) return;
    drag.current = null;
    setDragging(false);
    onResizeEnd?.();
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const step = event.shiftKey ? 32 : 8;
    let next: number;
    switch (event.key) {
      case "ArrowLeft":
        next = value - step * direction;
        break;
      case "ArrowRight":
        next = value + step * direction;
        break;
      case "Home":
        next = min;
        break;
      case "End":
        next = max;
        break;
      default:
        return;
    }
    event.preventDefault();
    const clamped = Math.max(min, Math.min(max, next));
    if (clamped !== value) onResize(clamped - value);
  }

  return (
    <div
      role="separator"
      aria-orientation="vertical"
      aria-label={ariaLabel}
      aria-controls={controls}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={value}
      aria-valuetext={`${value}ピクセル`}
      tabIndex={0}
      className={cn(
        "group z-10 flex w-3 shrink-0 touch-none cursor-col-resize items-stretch justify-center transition-colors hover:bg-blue-50 focus-visible:outline-offset-0",
        dragging && "bg-blue-50",
      )}
      onPointerDown={start}
      onPointerMove={move}
      onPointerUp={end}
      onPointerCancel={end}
      onLostPointerCapture={end}
      onKeyDown={onKeyDown}
    >
      <span
        aria-hidden="true"
        className={cn(
          "w-0.5 rounded-full bg-gray-300 transition-colors group-hover:bg-blue-500 group-focus-visible:bg-blue-500",
          dragging && "bg-blue-500",
        )}
      />
    </div>
  );
}
