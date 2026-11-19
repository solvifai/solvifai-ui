import type { ReactNode } from "react";

import { cn } from "./cn";
import { SidebarIcon } from "./icons";

interface DrawerProps {
  id: string;
  title: string;
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}

export function Drawer({ id, title, open, onClose, children, className }: DrawerProps) {
  const titleId = id + "-title";

  return (
    <aside
      id={id}
      aria-labelledby={titleId}
      hidden={!open}
      className={cn(
        "w-[min(60%,17rem)] shrink-0 overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-sm",
        className,
      )}
      onKeyDown={(event) => {
        if (event.key === "Escape" && !event.defaultPrevented) {
          event.stopPropagation();
          onClose();
        }
      }}
    >
      <div className="flex items-center justify-between gap-1 border-b border-gray-200 pl-2.5">
        <span id={titleId} className="break-words text-xs font-medium text-blue-600">
          {title}
        </span>
        <button
          type="button"
          aria-label="サイドパネルを閉じる"
          onClick={onClose}
          className="grid size-9 shrink-0 place-items-center rounded text-gray-500 hover:bg-gray-100 hover:text-gray-700"
        >
          <SidebarIcon />
        </button>
      </div>
      {children}
    </aside>
  );
}
