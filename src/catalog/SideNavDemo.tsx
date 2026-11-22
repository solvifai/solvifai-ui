import { Binoculars, Compass, House, X } from "lucide-react";
import { useRef, useState } from "react";

import { MenuItemLink } from "../ui/MenuItemLink";
import { IconChevronLeft } from "../ui/sidebar-icons";

const sections = [
  { label: "概要", icon: House },
  { label: "観察記録", icon: Binoculars },
  { label: "散歩先", icon: Compass },
];
const observationItems = ["野鳥", "草花"];

export function SideNavDemo() {
  const [expanded, setExpanded] = useState(false);
  const [active, setActive] = useState("概要");
  const [subOpen, setSubOpen] = useState(false);
  const groupButton = useRef<HTMLButtonElement>(null);

  return (
    <section aria-label="観察ノート"
      className="flex min-h-56 rounded-xl border border-catalog-line bg-white">
      <nav aria-label="観察ノートのメニュー"
        className={`shrink-0 border-r border-border-primary motion-safe:transition-[width] ${expanded ? "w-[min(40vw,200px)]" : "w-12"}`}>
        <div className="flex justify-end px-3 pt-5 pb-1">
          <button type="button" aria-expanded={expanded} aria-controls="side-nav-demo-items"
            aria-label={expanded ? "サイドバーを閉じる" : "サイドバーを開く"}
            className="grid size-6 place-items-center text-text-secondary"
            onClick={() => setExpanded(!expanded)}>
            <IconChevronLeft className={expanded ? undefined : "rotate-180"} />
          </button>
        </div>
        <ul id="side-nav-demo-items" className="grid gap-2 pt-4">
          {sections.map(({ label, icon: Icon }) => (
            <li key={label}>
              <MenuItemLink
                active={active === label || (label === "観察記録" && (subOpen || observationItems.includes(active)))}
                aria-current={active === label ? "page" : false}
                aria-label={label}
                ref={label === "観察記録" ? groupButton : undefined}
                aria-expanded={label === "観察記録" ? subOpen : undefined}
                aria-controls={label === "観察記録" && subOpen ? "side-nav-demo-group" : undefined}
                title={expanded ? undefined : label}
                prefix={<Icon size={20} className="shrink-0" aria-hidden="true" />}
                className={expanded ? "gap-2 px-3 py-3" : "justify-center py-3"}
                onClick={() => {
                  if (label === "観察記録") {
                    setSubOpen((open) => !open);
                  } else {
                    setActive(label);
                    setSubOpen(false);
                  }
                }}>
                {expanded && <span className="truncate text-sm">{label}</span>}
              </MenuItemLink>
            </li>
          ))}
        </ul>
      </nav>
      {subOpen && (
        <nav id="side-nav-demo-group" aria-label="観察記録の項目"
          className="w-[min(29vw,209px)] shrink-0 border-r border-border-primary">
          <div className="flex justify-end p-3">
            <button type="button" aria-label="サブメニューを閉じる" className="size-6 text-text-secondary"
              onClick={() => {
                setSubOpen(false);
                groupButton.current?.focus();
              }}><X size={14} className="mx-auto" aria-hidden="true" /></button>
          </div>
          {observationItems.map((label) => (
            <MenuItemLink key={label} active={active === label}
              prefix={<span aria-hidden="true" className="size-2.5 shrink-0 rounded-full bg-brand-gradient opacity-70" />}
              className="gap-2 px-2 py-3 text-sm sm:px-5" onClick={() => setActive(label)}>
              {label}
            </MenuItemLink>
          ))}
        </nav>
      )}
      <div className="min-w-0 flex-1 p-3 sm:p-4">
        <h2 className="wrap-anywhere text-base font-bold">{active}</h2>
      </div>
    </section>
  );
}
