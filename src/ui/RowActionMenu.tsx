import { EllipsisVertical } from 'lucide-react';
import {
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from 'react';
import { createPortal } from 'react-dom';

type Action = {
  label: string;
  icon: ReactNode;
  onSelect: () => void;
  actionClassName?: string;
};

type Props = {
  title: string;
  disabled?: boolean;
  triggerRef?: RefObject<HTMLButtonElement | null>;
  actions: Action[];
};

export function RowActionMenu({
  title,
  disabled = false,
  triggerRef,
  actions,
}: Props) {
  const [position, setPosition] = useState<{
    top: number;
    right: number;
  } | null>(null);
  const fallbackTrigger = useRef<HTMLButtonElement>(null);
  const trigger = triggerRef ?? fallbackTrigger;
  const focusLast = useRef(false);
  const menu = useRef<HTMLDivElement>(null);
  const menuId = useId();
  useEffect(() => {
    if (!position) return;
    const buttons =
      menu.current?.querySelectorAll<HTMLButtonElement>('[role="menuitem"]');
    buttons?.[focusLast.current ? buttons.length - 1 : 0]?.focus({
      preventScroll: true,
    });
    const outside = (event: PointerEvent) => {
      if (
        !trigger.current?.contains(event.target as Node) &&
        !menu.current?.contains(event.target as Node)
      )
        setPosition(null);
    };
    const close = () => setPosition(null);
    const scroll = (event: Event) => {
      if (event.target instanceof Node && menu.current?.contains(event.target))
        return;
      close();
    };
    document.addEventListener('pointerdown', outside);
    window.addEventListener('scroll', scroll, true);
    window.addEventListener('resize', close);
    return () => {
      document.removeEventListener('pointerdown', outside);
      window.removeEventListener('scroll', scroll, true);
      window.removeEventListener('resize', close);
    };
  }, [position, trigger]);
  const open = (last = false) => {
    focusLast.current = last;
    const height = Math.min(actions.length * 46 + 16, window.innerHeight - 16);
    const rect = trigger.current?.getBoundingClientRect();
    if (rect)
      setPosition({
        top:
          rect.bottom + height + 4 > window.innerHeight
            ? Math.max(8, rect.top - height)
            : rect.bottom + 4,
        right: Math.max(8, window.innerWidth - rect.right),
      });
  };
  return (
    <>
      <button
        ref={trigger}
        type='button'
        aria-label={`${title}のメニュー`}
        aria-haspopup='menu'
        aria-expanded={position !== null}
        aria-controls={position ? menuId : undefined}
        disabled={disabled}
        className='flex size-8 cursor-pointer items-center justify-center rounded text-text-secondary focus-visible:outline-2 focus-visible:outline-brand-primary disabled:cursor-not-allowed disabled:opacity-50'
        onClick={() => (position ? setPosition(null) : open())}
        onKeyDown={(event) => {
          if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            event.preventDefault();
            open(event.key === 'ArrowUp');
          }
        }}
      >
        <EllipsisVertical size={20} />
      </button>
      {position &&
        createPortal(
          <div
            ref={menu}
            id={menuId}
            role='menu'
            aria-label={`${title}の操作`}
            style={position}
            className='fixed z-50 max-h-[calc(100dvh-16px)] w-[208px] overflow-y-auto rounded-2xl border border-[#dfe6ed] bg-white p-2 shadow-[0_12px_32px_rgba(30,65,90,0.16)]'
            onBlur={(event) => {
              if (
                event.relatedTarget !== trigger.current &&
                !event.currentTarget.contains(event.relatedTarget)
              )
                setPosition(null);
            }}
            onKeyDown={(event) => {
              if (event.key === 'Escape') {
                event.preventDefault();
                setPosition(null);
                trigger.current?.focus();
              } else if (
                ['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)
              ) {
                event.preventDefault();
                const buttons = Array.from(
                  event.currentTarget.querySelectorAll<HTMLButtonElement>(
                    '[role="menuitem"]',
                  ),
                );
                const index = buttons.indexOf(
                  document.activeElement as HTMLButtonElement,
                );
                const next =
                  event.key === 'Home'
                    ? 0
                    : event.key === 'End'
                      ? buttons.length - 1
                      : (index +
                          (event.key === 'ArrowDown' ? 1 : -1) +
                          buttons.length) %
                        buttons.length;
                buttons[next]?.focus();
              }
            }}
          >
            {actions.map((entry) => (
              <button
                key={entry.label}
                type='button'
                role='menuitem'
                className={`flex w-full cursor-pointer items-center gap-3 rounded-lg px-4 py-3 text-left text-sm focus:outline-none focus-visible:ring-2 ${entry.actionClassName ?? 'text-text-primary hover:bg-background-bg focus-visible:ring-brand-primary'}`}
                onClick={() => {
                  setPosition(null);
                  trigger.current?.focus();
                  entry.onSelect();
                }}
              >
                {entry.icon}
                {entry.label}
              </button>
            ))}
          </div>,
          document.body,
        )}
    </>
  );
}
