import { useId } from "react";

export function PinIcon({
  size = 20,
  className,
  off = false,
}: {
  size?: number;
  className?: string;
  off?: boolean;
}) {
  const maskId = useId();
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {off && (
        <defs>
          <mask id={maskId} x="0" y="0" width="24" height="24" maskUnits="userSpaceOnUse">
            <rect width="24" height="24" fill="white" stroke="none" />
            <path d="m3 3 18 18" stroke="black" strokeWidth="4" />
          </mask>
        </defs>
      )}
      <g mask={off ? `url(#${maskId})` : undefined}>
        <path d="m13 3 8 8-7 2-2 7-8-8 7-2Z" />
        <path d="m8 16-6 6" />
      </g>
      {off && <path d="m3 3 18 18" />}
    </svg>
  );
}
