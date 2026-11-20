import { Menu } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Accordion } from "../ui/Accordion";
import { AppButton } from "../ui/AppButton";
import { cn } from "../ui/cn";

const sections = [
  { label: "概要", text: "近所で見つけた生き物を記録するノートです。" },
  { label: "野鳥", text: "池のそばでカルガモを見かけました。" },
  { label: "草花", text: "遊歩道のわきに白い花が咲いていました。" },
  { label: "行きたい場所", text: "次の観察先は川沿いの遊歩道です。" },
];

export function SideNavDemo() {
  const [active, setActive] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const moved = useRef(false);

  useEffect(() => {
    if (!moved.current) return;
    moved.current = false;
    heading.current?.focus();
  }, [active]);

  function navItem(index: number) {
    return (
      <button
        type="button"
        aria-current={index === active ? "page" : undefined}
        className={cn(
          "min-h-10 w-full rounded-md px-3 py-2 text-left text-sm hover:bg-blue-50",
          index === active ? "bg-blue-50 font-semibold text-brand-foreground" : "text-text-primary",
        )}
        onClick={() => {
          setMenuOpen(false);
          if (index === active) {
            heading.current?.focus();
            return;
          }
          moved.current = true;
          setActive(index);
        }}
      >
        {sections[index].label}
      </button>
    );
  }

  return (
    <>
      <section aria-label="観察ノート" className="rounded-xl border border-catalog-line bg-white">
        <div className="flex items-center justify-between gap-2 border-b border-catalog-line p-4 sm:hidden">
          <span className="text-sm font-bold">観察ノート</span>
          <AppButton
            ref={menuButton}
            variant="back"
            aria-controls="side-nav-demo-menu"
            aria-expanded={menuOpen}
            iconLeft={<Menu size={16} aria-hidden="true" />}
            onClick={() => setMenuOpen((open) => !open)}
          >
            メニュー
          </AppButton>
        </div>
        <div className="sm:grid sm:grid-cols-[11rem_minmax(0,1fr)]">
          <nav
            id="side-nav-demo-menu"
            aria-label="観察ノートのナビゲーション"
            className={cn(
              "border-b border-catalog-line p-3 sm:border-r sm:border-b-0",
              menuOpen ? "block" : "hidden sm:block",
            )}
            onKeyDown={(event) => {
              if (event.key === "Escape" && menuOpen) {
                setMenuOpen(false);
                menuButton.current?.focus();
              }
            }}
          >
            <p className="hidden px-3 py-2 text-sm font-bold sm:block">観察ノート</p>
            {navItem(0)}
            <Accordion className="my-1" heading="観察記録">
              {navItem(1)}
              {navItem(2)}
            </Accordion>
            {navItem(3)}
          </nav>
          <div className="min-h-35 p-4 sm:p-5">
            <h2 ref={heading} tabIndex={-1} className="text-lg font-bold">{sections[active].label}</h2>
            <p className="mt-2 text-sm text-catalog-muted">{sections[active].text}</p>
          </div>
        </div>
      </section>
      <a className="source-link mt-4" href="#accordion">グループ開閉の使い方</a>
    </>
  );
}
