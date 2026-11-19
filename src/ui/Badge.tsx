type BadgeColor = "blue" | "green" | "red" | "orange" | "purple" | "gray";

const colorStyles: Record<BadgeColor, string> = {
  blue: "bg-function-lowblue text-function-blue",
  green: "bg-function-low-green text-emerald-800",
  red: "bg-rose-50 text-rose-700",
  orange: "bg-amber-50 text-amber-800",
  purple: "bg-violet-50 text-violet-600",
  gray: "bg-gray-100 text-gray-600",
};

interface BadgeProps {
  label: string;
  color?: BadgeColor;
}

export function Badge({ label, color = "blue" }: BadgeProps) {
  return (
    <span
      className={`inline-flex h-7 shrink-0 items-center rounded-sm px-3 text-xs font-medium whitespace-nowrap ${colorStyles[color]}`}
    >
      {label}
    </span>
  );
}
