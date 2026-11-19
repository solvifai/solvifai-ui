import type { ComponentPropsWithRef, ReactNode } from "react";

export interface AppButtonProps extends ComponentPropsWithRef<"button"> {
  variant?: "primary" | "secondary" | "back";
  label?: string;
  block?: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
}

const base =
  "inline-flex items-center justify-center h-10 whitespace-nowrap text-sm font-sans font-medium cursor-pointer transition-opacity enabled:hover:brightness-95";

const variants: Record<NonNullable<AppButtonProps["variant"]>, string> = {
  primary: "bg-brand-action-gradient text-white rounded border-0 px-10 gap-2",
  secondary: "bg-white text-brand-foreground border border-brand-primary rounded-sm px-10 gap-3.5",
  back: "bg-white text-text-primary border border-border-secondary rounded-lg px-3 gap-3.5",
};

export function AppButton({
  variant = "secondary",
  label = "",
  disabled = false,
  block = false,
  iconLeft,
  iconRight,
  children,
  className = "",
  type = "button",
  ...props
}: AppButtonProps) {
  return (
    <button
      {...props}
      type={type}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${disabled ? "cursor-not-allowed opacity-50" : ""} ${block ? "w-full" : ""} ${className}`}
    >
      {iconLeft}
      <span className="leading-none">{children ?? label}</span>
      {iconRight}
    </button>
  );
}
