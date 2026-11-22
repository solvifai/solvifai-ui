import type { ComponentPropsWithRef, ReactNode } from "react";

interface MenuItemLinkProps extends Omit<ComponentPropsWithRef<"button">, "prefix"> {
  active?: boolean;
  prefix: ReactNode;
}

export function MenuItemLink({ active = false, prefix, className = "", children, ...props }: MenuItemLinkProps) {
  const stateClasses = active
    ? "bg-sidebar-active text-brand-primary font-medium"
    : "text-text-primary hover:bg-sidebar-active";

  return (
    <button
      {...props}
      type="button"
      aria-current={active ? "page" : undefined}
      className={`flex w-full cursor-pointer items-center border-0 bg-transparent text-left no-underline transition-colors ${stateClasses} ${className}`}
    >
      {prefix}
      {children}
    </button>
  );
}
