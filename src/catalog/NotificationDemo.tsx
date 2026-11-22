import { Bell } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const notifications = [
  { id: 1, title: "週末の観察会", message: "午前9時に公園の入口へ集合します。" },
  { id: 2, title: "散歩の持ち物", message: "帽子と飲み物をお持ちください。" },
];

export function NotificationDemo() {
  const [open, setOpen] = useState(false);
  const [read, setRead] = useState<number[]>([]);
  const area = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const unread = notifications.length - read.length;

  useEffect(() => {
    if (!open) return;
    const close = (event: PointerEvent) => {
      if (event.target instanceof Node && !area.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, [open]);

  return (
    <section aria-label="通知メニューの例" className="flex min-h-66 justify-end rounded-xl border border-catalog-line bg-white p-4">
      <div ref={area} className="relative" onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          setOpen(false);
          button.current?.focus();
        }
      }}>
        <button ref={button} type="button" aria-label="通知" aria-expanded={open}
          aria-controls={open ? "demo-notifications" : undefined}
          className="relative cursor-pointer p-2 text-text-secondary hover:text-text-primary"
          onClick={() => setOpen(!open)}>
          <Bell size={24} aria-hidden="true" />
          {unread > 0 && (
            <span className="absolute -top-0.5 -right-0.5 grid h-4.5 min-w-4.5 place-items-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
              {unread}
            </span>
          )}
        </button>
        {open && (
          <div id="demo-notifications" className="absolute top-10 right-0 z-10 mt-2 w-[min(calc(100vw-4rem),380px)] rounded-lg border border-border-secondary bg-white">
            {unread > 0 && (
              <div className="border-b border-border-secondary px-4 py-2 text-right">
                <button type="button" className="text-xs text-function-blue hover:underline" onClick={() => {
                  if (window.confirm("すべての通知を既読にしますか？")) {
                    setRead(notifications.map(({ id }) => id));
                    button.current?.focus();
                  }
                }}>すべて既読にする</button>
              </div>
            )}
            <ul className="max-h-100 overflow-y-auto">
              {notifications.map(({ id, title, message }) => (
                <li key={id} className={`border-b border-border-secondary last:border-b-0 hover:bg-product-bg ${read.includes(id) ? "" : "border-l-2 border-l-brand-primary"}`}>
                  <button type="button" className="block w-full px-4 py-3 text-left" onClick={() => {
                    setRead((current) => current.includes(id) ? current : [...current, id]);
                  }}>
                    <strong className="block text-sm text-text-primary">{title}</strong>
                    <span className="mt-1 block text-xs text-text-secondary">{message}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
