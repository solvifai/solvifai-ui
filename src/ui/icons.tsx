import { useId } from "react";

interface IconProps {
  className?: string;
  size?: number;
  color?: string;
}

export function PlusIcon({ className = "w-4 h-4", size }: IconProps) {
  const sizeProps = size ? { width: size, height: size } : {};
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...sizeProps}
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

export function SpinnerIcon({ className = "w-4 h-4 animate-spin" }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 24 24">
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
        fill="none"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

export function ChevronLeftIcon({ className = "w-4 h-4", size }: IconProps) {
  const sizeProps = size ? { width: size, height: size } : {};
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      {...sizeProps}
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
  );
}

export function ChevronRightIcon({ className = "w-4 h-4", size }: IconProps) {
  const sizeProps = size ? { width: size, height: size } : {};
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      {...sizeProps}
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );
}

export function CheckIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} fill="currentColor" viewBox="0 0 20 20">
      <path
        fillRule="evenodd"
        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function DocumentIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    </svg>
  );
}

export function ClockIcon({ className = "w-4 h-4", size }: IconProps) {
  const sizeProps = size ? { width: size, height: size } : {};
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...sizeProps}
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

export function ChatIcon({ className = "w-4 h-4", size }: IconProps) {
  const sizeProps = size ? { width: size, height: size } : {};
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...sizeProps}
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

export function DownloadIcon({ className = "w-4 h-4", size }: IconProps) {
  const sizeProps = size ? { width: size, height: size } : {};
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...sizeProps}
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

export function UploadIcon({ className = "w-4 h-4", size }: IconProps) {
  const sizeProps = size ? { width: size, height: size } : {};
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...sizeProps}
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  );
}

export function MicrophoneIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
      />
    </svg>
  );
}

export function SendIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"
      />
    </svg>
  );
}

export function LightbulbIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
      />
    </svg>
  );
}

export function EyeIcon({ className = "w-4 h-4", size }: IconProps) {
  const sizeProps = size ? { width: size, height: size } : {};
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...sizeProps}
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export function FullscreenIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
      />
    </svg>
  );
}

export function RefreshIcon({ className = "w-4 h-4", size }: IconProps) {
  const sizeProps = size ? { width: size, height: size } : {};
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...sizeProps}
    >
      <path d="M21 2v6h-6" />
      <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
      <path d="M3 22v-6h6" />
      <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
    </svg>
  );
}

export function ErrorCircleIcon({ className = "w-4 h-4", size }: IconProps) {
  const sizeProps = size ? { width: size, height: size } : {};
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...sizeProps}
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}

export function GridIcon({ className = "w-4 h-4", size }: IconProps) {
  const sizeProps = size ? { width: size, height: size } : {};
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...sizeProps}
    >
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </svg>
  );
}

export function SidebarIcon({ className = "w-4 h-4", size }: IconProps) {
  const sizeProps = size ? { width: size, height: size } : {};
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...sizeProps}
    >
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <line x1="9" y1="3" x2="9" y2="21" />
    </svg>
  );
}

export function PlusCircleIcon({ className = "w-4 h-4", size }: IconProps) {
  const sizeProps = size ? { width: size, height: size } : {};
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...sizeProps}
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="16" />
      <line x1="8" y1="12" x2="16" y2="12" />
    </svg>
  );
}

export function CopyIcon({ className = "w-4 h-4", size }: IconProps) {
  const sizeProps = size ? { width: size, height: size } : {};
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...sizeProps}
    >
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

export function LayoutIcon({ className = "w-4 h-4", size }: IconProps) {
  const sizeProps = size ? { width: size, height: size } : {};
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...sizeProps}
    >
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <line x1="9" y1="21" x2="9" y2="9" />
    </svg>
  );
}

export function TrashIcon({ className = "w-4 h-4", size }: IconProps) {
  const sizeProps = size ? { width: size, height: size } : {};
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...sizeProps}
    >
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  );
}

export function FileIcon({ className = "w-3 h-3" }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} fill="currentColor" viewBox="0 0 20 20">
      <path
        fillRule="evenodd"
        d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function GridViewIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
      />
    </svg>
  );
}

export function EyeOffIcon({ className = "w-4 h-4", size }: IconProps) {
  const sizeProps = size ? { width: size, height: size } : {};
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...sizeProps}
    >
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

export function SplitEqualIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth={2} />
      <line x1="12" y1="3" x2="12" y2="21" strokeWidth={2} />
    </svg>
  );
}

export function SplitFocusIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth={2} />
      <line x1="9" y1="3" x2="9" y2="21" strokeWidth={2} />
    </svg>
  );
}

export function PaperclipIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
      />
    </svg>
  );
}

export function DocumentGradientIcon({ className = "w-4 h-4", size, color }: IconProps) {
  const uid = useId();
  const sizeProps = size ? { width: size, height: size } : {};
  const g0 = `docgrad0${uid}`;
  const g1 = `docgrad1${uid}`;
  const g2 = `docgrad2${uid}`;
  const g3 = `docgrad3${uid}`;
  const g4 = `docgrad4${uid}`;
  const stroke0 = color ? color : `url(#${g0})`;
  const stroke1 = color ? color : `url(#${g1})`;
  const stroke2 = color ? color : `url(#${g2})`;
  const stroke3 = color ? color : `url(#${g3})`;
  const stroke4 = color ? color : `url(#${g4})`;
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 15 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...sizeProps}
    >
      <path
        d="M9.47327 0.789062H2.36801C1.94925 0.789063 1.54764 0.955415 1.25153 1.25153C0.955415 1.54764 0.789063 1.94925 0.789062 2.36801V14.9996C0.789063 15.4184 0.955415 15.82 1.25153 16.1161C1.54764 16.4122 1.94925 16.5785 2.36801 16.5785H11.8417C12.2605 16.5785 12.6621 16.4122 12.9582 16.1161C13.2543 15.82 13.4206 15.4184 13.4206 14.9996V4.73643L9.47327 0.789062Z"
        stroke={stroke0}
        strokeWidth="1.57895"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.68359 0.789062V3.94696C8.68359 4.36572 8.84995 4.76733 9.14606 5.06344C9.44217 5.35955 9.84378 5.5259 10.2625 5.5259H13.4204"
        stroke={stroke1}
        strokeWidth="1.57895"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.52621 6.31641H3.94727"
        stroke={stroke2}
        strokeWidth="1.57895"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.2621 9.47266H3.94629"
        stroke={stroke3}
        strokeWidth="1.57895"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.2621 12.6309H3.94629"
        stroke={stroke4}
        strokeWidth="1.57895"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {!color && (
        <defs>
          <linearGradient
            id={g0}
            x1="7.10485"
            y1="0.789062"
            x2="7.10485"
            y2="16.5785"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="var(--icon-gradient-start)" />
            <stop offset="1" stopColor="var(--icon-gradient-end)" />
          </linearGradient>
          <linearGradient
            id={g1}
            x1="11.052"
            y1="0.789062"
            x2="11.052"
            y2="5.5259"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="var(--icon-gradient-start)" />
            <stop offset="1" stopColor="var(--icon-gradient-end)" />
          </linearGradient>
          <linearGradient
            id={g2}
            x1="4.73674"
            y1="6.31641"
            x2="4.73674"
            y2="7.31641"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="var(--icon-gradient-start)" />
            <stop offset="1" stopColor="var(--icon-gradient-end)" />
          </linearGradient>
          <linearGradient
            id={g3}
            x1="7.10418"
            y1="9.47266"
            x2="7.10418"
            y2="10.4727"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="var(--icon-gradient-start)" />
            <stop offset="1" stopColor="var(--icon-gradient-end)" />
          </linearGradient>
          <linearGradient
            id={g4}
            x1="7.10418"
            y1="12.6309"
            x2="7.10418"
            y2="13.6309"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="var(--icon-gradient-start)" />
            <stop offset="1" stopColor="var(--icon-gradient-end)" />
          </linearGradient>
        </defs>
      )}
    </svg>
  );
}

export function ArrowDownUpIcon({ className = "w-4 h-4", size }: IconProps) {
  const sizeProps = size ? { width: size, height: size } : {};
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...sizeProps}
    >
      <path
        d="M2 10.666L4.66667 13.3327L7.33333 10.666"
        stroke="currentColor"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.66602 13.3327V2.66602"
        stroke="currentColor"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.9993 5.33268L11.3327 2.66602L8.66602 5.33268"
        stroke="currentColor"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.334 2.66602V13.3327"
        stroke="currentColor"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArrowRightIcon({ className = "w-4 h-4", size }: IconProps) {
  const sizeProps = size ? { width: size, height: size } : {};
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 9 10"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...sizeProps}
    >
      <path d="M8.66923 5.35798C8.74852 5.31257 8.81334 5.2518 8.85813 5.18091C8.90291 5.11003 8.92631 5.03114 8.92631 4.95106C8.92631 4.87098 8.90291 4.7921 8.85813 4.72121C8.81334 4.65032 8.74852 4.58955 8.66923 4.54414L0.933629 0.0887909C0.844405 0.03722 0.7399 0.00697803 0.631467 0.0013504C0.523034 -0.00427818 0.414821 0.0149231 0.318584 0.0568676C0.222348 0.0988131 0.141769 0.161897 0.0856024 0.239265C0.0294358 0.316634 -0.000170388 0.405329 7.37652e-07 0.495713L7.37652e-07 9.40641C0.000448456 9.49658 0.0304354 9.58495 0.0867365 9.66201C0.143038 9.73907 0.223523 9.8019 0.319537 9.84374C0.41555 9.88559 0.52346 9.90487 0.631661 9.89951C0.739862 9.89416 0.84426 9.86436 0.933629 9.81333L8.66923 5.35798Z" />
    </svg>
  );
}

export function BackIcon({
  className = "w-[13px] h-[10px] text-text-secondary shrink-0",
  size,
}: IconProps) {
  const sizeProps = size ? { width: size, height: size } : {};
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 13 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...sizeProps}
    >
      <path
        d="M0.942667 3.80467L0.471333 4.276L0 3.80467L0.471333 3.33333L0.942667 3.80467ZM12.276 9.138C12.276 9.31481 12.2058 9.48438 12.0807 9.60941C11.9557 9.73443 11.7861 9.80467 11.6093 9.80467C11.4325 9.80467 11.263 9.73443 11.1379 9.60941C11.0129 9.48438 10.9427 9.31481 10.9427 9.138H12.276ZM3.80467 7.60933L0.471333 4.276L1.414 3.33333L4.74733 6.66667L3.80467 7.60933ZM0.471333 3.33333L3.80467 0L4.74733 0.942666L1.414 4.276L0.471333 3.33333ZM0.942667 3.138H7.60933V4.47133H0.942667V3.138ZM12.276 7.80467V9.138H10.9427V7.80467H12.276ZM7.60933 3.138C8.84701 3.138 10.034 3.62967 10.9092 4.50484C11.7843 5.38 12.276 6.56699 12.276 7.80467H10.9427C10.9427 6.92061 10.5915 6.07277 9.96636 5.44764C9.34123 4.82252 8.49339 4.47133 7.60933 4.47133V3.138Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function ChevronsUpDownIcon({ className = "w-4 h-4", size }: IconProps) {
  const sizeProps = size ? { width: size, height: size } : {};
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...sizeProps}
    >
      <path
        d="M4.6665 5.99935L7.99984 2.66602L11.3332 5.99935"
        stroke="currentColor"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.6665 10L7.99984 13.3333L11.3332 10"
        stroke="currentColor"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function UploadGradientIcon({ className = "w-4 h-4", size }: IconProps) {
  const id = useId();
  const sizeProps = size ? { width: size, height: size } : {};
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...sizeProps}
    >
      <path
        d="M7.04199 0.666016V9.16602"
        stroke={`url(#${id}-a)`}
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.5833 4.20768L7.04167 0.666016L3.5 4.20768"
        stroke={`url(#${id}-b)`}
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.417 9.16602V11.9993C13.417 12.3751 13.2677 12.7354 13.0021 13.0011C12.7364 13.2668 12.376 13.416 12.0003 13.416H2.08366C1.70794 13.416 1.3476 13.2668 1.08192 13.0011C0.816248 12.7354 0.666992 12.3751 0.666992 11.9993V9.16602"
        stroke={`url(#${id}-c)`}
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient
          id={`${id}-a`}
          x1="7.54199"
          y1="0.666016"
          x2="7.54199"
          y2="9.16602"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="var(--icon-gradient-start)" />
          <stop offset="1" stopColor="var(--icon-gradient-end)" />
        </linearGradient>
        <linearGradient
          id={`${id}-b`}
          x1="7.04167"
          y1="0.666016"
          x2="7.04167"
          y2="4.20768"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="var(--icon-gradient-start)" />
          <stop offset="1" stopColor="var(--icon-gradient-end)" />
        </linearGradient>
        <linearGradient
          id={`${id}-c`}
          x1="7.04199"
          y1="9.16602"
          x2="7.04199"
          y2="13.416"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="var(--icon-gradient-start)" />
          <stop offset="1" stopColor="var(--icon-gradient-end)" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function DatabaseGradientIcon({ className = "w-4 h-4", size }: IconProps) {
  const id = useId();
  const sizeProps = size ? { width: size, height: size } : {};
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 15 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...sizeProps}
    >
      <path
        d="M7.04199 4.91602C10.5628 4.91602 13.417 3.96462 13.417 2.79102C13.417 1.61741 10.5628 0.666016 7.04199 0.666016C3.52118 0.666016 0.666992 1.61741 0.666992 2.79102C0.666992 3.96462 3.52118 4.91602 7.04199 4.91602Z"
        stroke={`url(#${id}-a)`}
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M0.666992 2.79102V12.7077C0.666992 13.2713 1.33864 13.8118 2.53419 14.2103C3.72973 14.6088 5.35124 14.8327 7.04199 14.8327C8.73275 14.8327 10.3543 14.6088 11.5498 14.2103C12.7453 13.8118 13.417 13.2713 13.417 12.7077V2.79102"
        stroke={`url(#${id}-b)`}
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M0.666992 7.75C0.666992 8.31359 1.33864 8.85409 2.53419 9.2526C3.72973 9.65112 5.35124 9.875 7.04199 9.875C8.73275 9.875 10.3543 9.65112 11.5498 9.2526C12.7453 8.85409 13.417 8.31359 13.417 7.75"
        stroke={`url(#${id}-c)`}
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient
          id={`${id}-a`}
          x1="7.04199"
          y1="0.666016"
          x2="7.04199"
          y2="4.91602"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="var(--icon-gradient-start)" />
          <stop offset="1" stopColor="var(--icon-gradient-end)" />
        </linearGradient>
        <linearGradient
          id={`${id}-b`}
          x1="7.04199"
          y1="2.79102"
          x2="7.04199"
          y2="14.8327"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="var(--icon-gradient-start)" />
          <stop offset="1" stopColor="var(--icon-gradient-end)" />
        </linearGradient>
        <linearGradient
          id={`${id}-c`}
          x1="7.04199"
          y1="7.75"
          x2="7.04199"
          y2="9.875"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="var(--icon-gradient-start)" />
          <stop offset="1" stopColor="var(--icon-gradient-end)" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function MinuteGradientIcon({ className = "w-4 h-4", size }: IconProps) {
  const id = useId();
  const sizeProps = size ? { width: size, height: size } : {};
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 15 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...sizeProps}
    >
      <path
        d="M9.51562 0.75H2.34375C1.92106 0.75 1.51568 0.917912 1.2168 1.2168C0.917912 1.51568 0.75 1.92106 0.75 2.34375V15.0938C0.75 15.5164 0.917912 15.9218 1.2168 16.2207C1.51568 16.5196 1.92106 16.6875 2.34375 16.6875H11.9062C12.3289 16.6875 12.7343 16.5196 13.0332 16.2207C13.3321 15.9218 13.5 15.5164 13.5 15.0938V4.73438L9.51562 0.75Z"
        stroke={`url(#${id}-a)`}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.71875 0.75V3.9375C8.71875 4.36019 8.88666 4.76557 9.18555 5.06445C9.48443 5.36334 9.88981 5.53125 10.3125 5.53125H13.5"
        stroke={`url(#${id}-b)`}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient
          id={`${id}-a`}
          x1="7.125"
          y1="0.75"
          x2="7.125"
          y2="16.6875"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="var(--icon-gradient-start)" />
          <stop offset="1" stopColor="var(--icon-gradient-end)" />
        </linearGradient>
        <linearGradient
          id={`${id}-b`}
          x1="11.1094"
          y1="0.75"
          x2="11.1094"
          y2="5.53125"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="var(--icon-gradient-start)" />
          <stop offset="1" stopColor="var(--icon-gradient-end)" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function InfomarkExportIcon({ className = "w-4 h-4", size }: IconProps) {
  const sizeProps = size ? { width: size, height: size } : {};
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...sizeProps}
    >
      <path
        d="M5.6875 0.8125H2.4375C2.00652 0.8125 1.5932 0.983705 1.28845 1.28845C0.983705 1.5932 0.8125 2.00652 0.8125 2.4375V12.1875C0.8125 12.6185 0.983705 13.0318 1.28845 13.3365C1.5932 13.6413 2.00652 13.8125 2.4375 13.8125H12.1875C12.6185 13.8125 13.0318 13.6413 13.3365 13.3365C13.6413 13.0318 13.8125 12.6185 13.8125 12.1875V8.9375M7.3125 7.3125L13.8125 0.8125M9.75 0.8125H13.8125V4.875"
        stroke="#7C7C7C"
        strokeWidth="1.625"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.333 12.667A5.333 5.333 0 1 0 7.333 2a5.333 5.333 0 0 0 0 10.667ZM14 14l-2.9-2.9"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CloseIcon({
  className,
  size,
  width,
  height,
}: {
  className?: string;
  size?: number;
  width?: number;
  height?: number;
}) {
  const w = size ?? width ?? 22;
  const h = size ?? height ?? 22;
  return (
    <svg
      aria-hidden="true"
      className={className}
      width={w}
      height={h}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M1 1L21 21M21 1L1 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function OpenIcon({ className = "w-4 h-4", size }: IconProps) {
  const sizeProps = size ? { width: size, height: size } : {};
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...sizeProps}
    >
      <path
        d="M5.6875 0.8125H2.4375C2.00652 0.8125 1.5932 0.983705 1.28845 1.28845C0.983705 1.5932 0.8125 2.00652 0.8125 2.4375V12.1875C0.8125 12.6185 0.983705 13.0318 1.28845 13.3365C1.5932 13.6413 2.00652 13.8125 2.4375 13.8125H12.1875C12.6185 13.8125 13.0318 13.6413 13.3365 13.3365C13.6413 13.0318 13.8125 12.6185 13.8125 12.1875V8.9375M7.3125 7.3125L13.8125 0.8125M13.8125 0.8125V4.875M13.8125 0.8125H9.75"
        stroke="currentColor"
        strokeWidth="1.625"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ChevronDownIcon({ className = "w-4 h-4", size }: IconProps) {
  const sizeProps = size ? { width: size, height: size } : {};
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      {...sizeProps}
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}
