import { useId } from "react";

interface SidebarIconProps {
  className?: string;
  width?: number | string;
  height?: number | string;
  active?: boolean;
}

export function IconDeliverableV2({
  className,
  width = 21,
  height = 21,
  active = false,
}: SidebarIconProps) {
  const gradientId = useId();
  return (
    <svg
      aria-hidden="true"
      className={className}
      width={width}
      height={height}
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.83431 13.647C7.74617 13.2972 7.56808 12.9779 7.31858 12.7224C7.06908 12.467 6.75729 12.2846 6.41563 12.1944L0.358841 10.5952C0.255507 10.5651 0.164559 10.5014 0.0997988 10.4137C0.0350385 10.3259 0 10.2189 0 10.1089C0 9.99896 0.0350385 9.89198 0.0997988 9.80423C0.164559 9.71648 0.255507 9.65275 0.358841 9.62272L6.41563 8.02251C6.75716 7.93235 7.06888 7.75016 7.31837 7.49488C7.56786 7.2396 7.74601 6.92055 7.83431 6.5709L9.39614 0.369219C9.42517 0.262995 9.48734 0.169412 9.57317 0.102748C9.659 0.0360846 9.76377 0 9.8715 0C9.97923 0 10.084 0.0360846 10.1698 0.102748C10.2557 0.169412 10.3178 0.262995 10.3469 0.369219L11.9077 6.5709C11.9958 6.92074 12.1739 7.24 12.4234 7.49546C12.6729 7.75093 12.9847 7.93328 13.3264 8.02352L19.3832 9.62171C19.4873 9.65112 19.5792 9.71472 19.6446 9.80273C19.7101 9.89075 19.7455 9.99832 19.7455 10.1089C19.7455 10.2196 19.7101 10.3271 19.6446 10.4152C19.5792 10.5032 19.4873 10.5668 19.3832 10.5962L13.3264 12.1944C12.9847 12.2846 12.6729 12.467 12.4234 12.7224C12.1739 12.9779 11.9958 13.2972 11.9077 13.647L10.3459 19.8487C10.3168 19.9549 10.2547 20.0485 10.1688 20.1151C10.083 20.1818 9.97824 20.2179 9.87051 20.2179C9.76278 20.2179 9.65801 20.1818 9.57219 20.1151C9.48636 20.0485 9.42418 19.9549 9.39515 19.8487L7.83431 13.647Z"
        fill={`url(#${gradientId}-sparkles-grad0)`}
        fillOpacity={active ? 1 : 0.6}
      />
      <path
        d="M16.9953 4.07661C16.9718 3.98332 16.9244 3.89819 16.8578 3.83006C16.7913 3.76194 16.7081 3.71332 16.617 3.68925L15.0019 3.26281C14.9744 3.2548 14.9501 3.23781 14.9329 3.21441C14.9156 3.19101 14.9062 3.16248 14.9062 3.13315C14.9062 3.10382 14.9156 3.07529 14.9329 3.0519C14.9501 3.0285 14.9744 3.0115 15.0019 3.00349L16.617 2.57678C16.7081 2.55274 16.7912 2.50416 16.8578 2.43608C16.9243 2.36801 16.9718 2.28293 16.9953 2.1897L17.4118 0.535956C17.4196 0.50763 17.4361 0.482676 17.459 0.464899C17.4819 0.447122 17.5099 0.4375 17.5386 0.4375C17.5673 0.4375 17.5952 0.447122 17.6181 0.464899C17.641 0.482676 17.6576 0.50763 17.6653 0.535956L18.0816 2.1897C18.1051 2.28298 18.1525 2.36812 18.2191 2.43624C18.2856 2.50436 18.3688 2.55299 18.4599 2.57705L20.075 3.00322C20.1027 3.01107 20.1272 3.02803 20.1447 3.0515C20.1621 3.07497 20.1716 3.10365 20.1716 3.13315C20.1716 3.16265 20.1621 3.19134 20.1447 3.21481C20.1272 3.23828 20.1027 3.25524 20.075 3.26308L18.4599 3.68925C18.3688 3.71332 18.2856 3.76194 18.2191 3.83006C18.1525 3.89819 18.1051 3.98332 18.0816 4.07661L17.6651 5.73035C17.6573 5.75867 17.6408 5.78363 17.6179 5.80141C17.595 5.81918 17.567 5.8288 17.5383 5.8288C17.5096 5.8288 17.4817 5.81918 17.4588 5.80141C17.4359 5.78363 17.4193 5.75867 17.4116 5.73035L16.9953 4.07661Z"
        fill={`url(#${gradientId}-sparkles-grad1)`}
        fillOpacity={active ? 1 : 0.6}
      />
      <path
        d="M2.08909 19.1391C2.06559 19.0458 2.0181 18.9607 1.95157 18.8926C1.88504 18.8244 1.8019 18.7758 1.71079 18.7518L0.0956885 18.3253C0.0681333 18.3173 0.0438813 18.3003 0.0266123 18.2769C0.00934335 18.2535 0 18.225 0 18.1957C0 18.1663 0.00934335 18.1378 0.0266123 18.1144C0.0438813 18.091 0.0681333 18.074 0.0956885 18.066L1.71079 17.6393C1.80186 17.6152 1.88499 17.5667 1.95151 17.4986C2.01804 17.4305 2.06555 17.3454 2.08909 17.2522L2.50557 15.5985C2.51331 15.5701 2.52989 15.5452 2.55278 15.5274C2.57567 15.5096 2.6036 15.5 2.63233 15.5C2.66106 15.5 2.689 15.5096 2.71188 15.5274C2.73477 15.5452 2.75135 15.5701 2.75909 15.5985L3.1753 17.2522C3.19881 17.3455 3.2463 17.4306 3.31283 17.4987C3.37936 17.5669 3.4625 17.6155 3.55361 17.6396L5.16871 18.0657C5.19648 18.0736 5.22098 18.0905 5.23843 18.114C5.25589 18.1375 5.26534 18.1662 5.26534 18.1957C5.26534 18.2252 5.25589 18.2538 5.23843 18.2773C5.22098 18.3008 5.19648 18.3177 5.16871 18.3256L3.55361 18.7518C3.4625 18.7758 3.37936 18.8244 3.31283 18.8926C3.2463 18.9607 3.19881 19.0458 3.1753 19.1391L2.75883 20.7928C2.75109 20.8212 2.73451 20.8461 2.71162 20.8639C2.68873 20.8817 2.66079 20.8913 2.63207 20.8913C2.60334 20.8913 2.5754 20.8817 2.55252 20.8639C2.52963 20.8461 2.51305 20.8212 2.50531 20.7928L2.08909 19.1391Z"
        fill={`url(#${gradientId}-sparkles-grad2)`}
        fillOpacity={active ? 1 : 0.6}
      />
      <defs>
        <linearGradient
          id={`${gradientId}-sparkles-grad0`}
          x1="9.87277"
          y1="0"
          x2="9.87277"
          y2="20.2179"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="var(--icon-gradient-start)" />
          <stop offset="1" stopColor="var(--icon-gradient-end)" />
        </linearGradient>
        <linearGradient
          id={`${gradientId}-sparkles-grad1`}
          x1="17.5389"
          y1="0.4375"
          x2="17.5389"
          y2="5.8288"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="var(--icon-gradient-start)" />
          <stop offset="1" stopColor="var(--icon-gradient-end)" />
        </linearGradient>
        <linearGradient
          id={`${gradientId}-sparkles-grad2`}
          x1="2.63267"
          y1="15.5"
          x2="2.63267"
          y2="20.8913"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="var(--icon-gradient-start)" />
          <stop offset="1" stopColor="var(--icon-gradient-end)" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export const IconSparkles = IconDeliverableV2;

export function IconDeliverable({
  className,
  width = 20,
  height = 21,
  active = false,
}: SidebarIconProps) {
  const gradientId = useId();
  return (
    <svg
      aria-hidden="true"
      width={width}
      height={height}
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M7.83431 13.647C7.74617 13.2972 7.56808 12.9779 7.31858 12.7224C7.06908 12.467 6.75729 12.2846 6.41563 12.1944L0.358841 10.5952C0.255507 10.5651 0.164559 10.5014 0.0997988 10.4137C0.0350385 10.3259 0 10.2189 0 10.1089C0 9.99896 0.0350385 9.89198 0.0997988 9.80423C0.164559 9.71648 0.255507 9.65275 0.358841 9.62272L6.41563 8.02251C6.75716 7.93235 7.06888 7.75016 7.31837 7.49488C7.56786 7.2396 7.74601 6.92055 7.83431 6.5709L9.39614 0.369219C9.42517 0.262995 9.48734 0.169412 9.57317 0.102748C9.659 0.0360846 9.76377 0 9.8715 0C9.97923 0 10.084 0.0360846 10.1698 0.102748C10.2557 0.169412 10.3178 0.262995 10.3469 0.369219L11.9077 6.5709C11.9958 6.92074 12.1739 7.24 12.4234 7.49546C12.6729 7.75093 12.9847 7.93328 13.3264 8.02352L19.3832 9.62171C19.4873 9.65112 19.5792 9.71472 19.6446 9.80273C19.7101 9.89075 19.7455 9.99832 19.7455 10.1089C19.7455 10.2196 19.7101 10.3271 19.6446 10.4152C19.5792 10.5032 19.4873 10.5668 19.3832 10.5962L13.3264 12.1944C12.9847 12.2846 12.6729 12.467 12.4234 12.7224C12.1739 12.9779 11.9958 13.2972 11.9077 13.647L10.3459 19.8487C10.3168 19.9549 10.2547 20.0485 10.1688 20.1151C10.083 20.1818 9.97824 20.2179 9.87051 20.2179C9.76278 20.2179 9.65801 20.1818 9.57219 20.1151C9.48636 20.0485 9.42418 19.9549 9.39515 19.8487L7.83431 13.647Z"
        fill={`url(#${gradientId}-deliverable-grad)`}
        fillOpacity={active ? 1 : 0.6}
      />
      <defs>
        <linearGradient
          id={`${gradientId}-deliverable-grad`}
          x1="9.87277"
          y1="0"
          x2="9.87277"
          y2="20.2179"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="var(--icon-gradient-start)" />
          <stop offset="1" stopColor="var(--icon-gradient-end)" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function IconChat({ className, width = 17, height = 15, active = false }: SidebarIconProps) {
  const gradientId = useId();
  return (
    <svg
      aria-hidden="true"
      className={className}
      width={width}
      height={height}
      viewBox="0 0 17 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.325 0C12.9037 0 16.65 2.98035 16.65 6.66C16.65 10.3396 12.9037 13.32 8.325 13.32C7.2927 13.32 6.30202 13.1701 5.38627 12.9037C2.95537 14.985 0 14.985 0 14.985C1.93972 13.0453 2.24775 11.7382 2.28937 11.2387C0.874125 10.0483 0 8.43322 0 6.66C0 2.98035 3.74625 0 8.325 0Z"
        fill={`url(#${gradientId}-chat-grad)`}
        fillOpacity={active ? 1 : 0.6}
      />
      <defs>
        <linearGradient
          id={`${gradientId}-chat-grad`}
          x1="8.325"
          y1="0"
          x2="8.325"
          y2="14.985"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="var(--icon-gradient-start)" />
          <stop offset="1" stopColor="var(--icon-gradient-end)" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function IconDocument({
  className,
  width = 12,
  height = 15,
  active = false,
}: SidebarIconProps) {
  const gradientId = useId();
  return (
    <svg
      aria-hidden="true"
      className={className}
      width={width}
      height={height}
      viewBox="0 0 12 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.25 0H1.5C1.10218 0 0.720644 0.158035 0.43934 0.43934C0.158035 0.720644 0 1.10218 0 1.5V13.5C0 13.8978 0.158035 14.2794 0.43934 14.5607C0.720644 14.842 1.10218 15 1.5 15H10.5C10.8978 15 11.2794 14.842 11.5607 14.5607C11.842 14.2794 12 13.8978 12 13.5V3.75L8.25 0Z"
        fill={`url(#${gradientId}-doc-grad)`}
        fillOpacity={active ? 1 : 0.6}
      />
      <defs>
        <linearGradient
          id={`${gradientId}-doc-grad`}
          x1="6"
          y1="0"
          x2="6"
          y2="15"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="var(--icon-gradient-start)" />
          <stop offset="1" stopColor="var(--icon-gradient-end)" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function IconDashboard({
  className,
  width = 14,
  height = 14,
  active = false,
}: SidebarIconProps) {
  const gradientId = useId();
  return (
    <svg
      aria-hidden="true"
      className={className}
      width={width}
      height={height}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.5 0H0.75C0.335786 0 0 0.335786 0 0.75V6C0 6.41421 0.335786 6.75 0.75 6.75H4.5C4.91421 6.75 5.25 6.41421 5.25 6V0.75C5.25 0.335786 4.91421 0 4.5 0Z"
        fill={`url(#${gradientId}-dash-grad0)`}
        fillOpacity={active ? 1 : 0.6}
      />
      <path
        d="M12.75 0H9C8.58579 0 8.25 0.335786 8.25 0.75V3C8.25 3.41421 8.58579 3.75 9 3.75H12.75C13.1642 3.75 13.5 3.41421 13.5 3V0.75C13.5 0.335786 13.1642 0 12.75 0Z"
        fill={`url(#${gradientId}-dash-grad1)`}
        fillOpacity={active ? 1 : 0.6}
      />
      <path
        d="M12.75 6.75H9C8.58579 6.75 8.25 7.08579 8.25 7.5V12.75C8.25 13.1642 8.58579 13.5 9 13.5H12.75C13.1642 13.5 13.5 13.1642 13.5 12.75V7.5C13.5 7.08579 13.1642 6.75 12.75 6.75Z"
        fill={`url(#${gradientId}-dash-grad2)`}
        fillOpacity={active ? 1 : 0.6}
      />
      <path
        d="M4.5 9.75H0.75C0.335786 9.75 0 10.0858 0 10.5V12.75C0 13.1642 0.335786 13.5 0.75 13.5H4.5C4.91421 13.5 5.25 13.1642 5.25 12.75V10.5C5.25 10.0858 4.91421 9.75 4.5 9.75Z"
        fill={`url(#${gradientId}-dash-grad3)`}
        fillOpacity={active ? 1 : 0.6}
      />
      <defs>
        <linearGradient
          id={`${gradientId}-dash-grad0`}
          x1="2.625"
          y1="0"
          x2="2.625"
          y2="6.75"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="var(--icon-gradient-start)" />
          <stop offset="1" stopColor="var(--icon-gradient-end)" />
        </linearGradient>
        <linearGradient
          id={`${gradientId}-dash-grad1`}
          x1="10.875"
          y1="0"
          x2="10.875"
          y2="3.75"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="var(--icon-gradient-start)" />
          <stop offset="1" stopColor="var(--icon-gradient-end)" />
        </linearGradient>
        <linearGradient
          id={`${gradientId}-dash-grad2`}
          x1="10.875"
          y1="6.75"
          x2="10.875"
          y2="13.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="var(--icon-gradient-start)" />
          <stop offset="1" stopColor="var(--icon-gradient-end)" />
        </linearGradient>
        <linearGradient
          id={`${gradientId}-dash-grad3`}
          x1="2.625"
          y1="9.75"
          x2="2.625"
          y2="13.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="var(--icon-gradient-start)" />
          <stop offset="1" stopColor="var(--icon-gradient-end)" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function IconGear({ className, width = 14, height = 15, active = false }: SidebarIconProps) {
  const gradientId = useId();
  return (
    <svg
      aria-hidden="true"
      className={className}
      width={width}
      height={height}
      viewBox="0 0 14 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.92818 0H6.59818C6.20036 0 5.81883 0.158035 5.53752 0.43934C5.25622 0.720644 5.09818 1.10218 5.09818 1.5V1.635C5.09791 1.89804 5.02848 2.15639 4.89684 2.38413C4.7652 2.61186 4.57599 2.80098 4.34818 2.9325L4.02568 3.12C3.79766 3.25165 3.53899 3.32096 3.27568 3.32096C3.01238 3.32096 2.75371 3.25165 2.52568 3.12L2.41318 3.06C2.06898 2.86145 1.66006 2.80758 1.27619 2.91023C0.89231 3.01288 0.564849 3.26365 0.365685 3.6075L0.200685 3.8925C0.00213213 4.2367 -0.0517322 4.64562 0.050916 5.0295C0.153564 5.41337 0.404337 5.74084 0.748185 5.94L0.860685 6.015C1.08739 6.14588 1.2759 6.33382 1.40747 6.56012C1.53905 6.78643 1.6091 7.04323 1.61068 7.305V7.6875C1.61173 7.95182 1.54292 8.21171 1.41122 8.44088C1.27951 8.67005 1.08959 8.86034 0.860685 8.9925L0.748185 9.06C0.404337 9.25916 0.153564 9.58663 0.050916 9.9705C-0.0517322 10.3544 0.00213213 10.7633 0.200685 11.1075L0.365685 11.3925C0.564849 11.7363 0.89231 11.9871 1.27619 12.0898C1.66006 12.1924 2.06898 12.1386 2.41318 11.94L2.52568 11.88C2.75371 11.7483 3.01238 11.679 3.27568 11.679C3.53899 11.679 3.79766 11.7483 4.02568 11.88L4.34818 12.0675C4.57599 12.199 4.7652 12.3881 4.89684 12.6159C5.02848 12.8436 5.09791 13.102 5.09818 13.365V13.5C5.09818 13.8978 5.25622 14.2794 5.53752 14.5607C5.81883 14.842 6.20036 15 6.59818 15H6.92818C7.32601 15 7.70754 14.842 7.98884 14.5607C8.27015 14.2794 8.42818 13.8978 8.42818 13.5V13.365C8.42845 13.102 8.49789 12.8436 8.62953 12.6159C8.76117 12.3881 8.95038 12.199 9.17818 12.0675L9.50068 11.88C9.72871 11.7483 9.98738 11.679 10.2507 11.679C10.514 11.679 10.7727 11.7483 11.0007 11.88L11.1132 11.94C11.4574 12.1386 11.8663 12.1924 12.2502 12.0898C12.6341 11.9871 12.9615 11.7363 13.1607 11.3925L13.3257 11.1C13.5242 10.7558 13.5781 10.3469 13.4755 9.963C13.3728 9.57912 13.122 9.25166 12.7782 9.0525L12.6657 8.9925C12.4368 8.86034 12.2469 8.67005 12.1152 8.44088C11.9834 8.21171 11.9146 7.95182 11.9157 7.6875V7.3125C11.9146 7.04818 11.9834 6.78829 12.1152 6.55912C12.2469 6.32995 12.4368 6.13966 12.6657 6.0075L12.7782 5.94C13.122 5.74084 13.3728 5.41337 13.4755 5.0295C13.5781 4.64562 13.5242 4.2367 13.3257 3.8925L13.1607 3.6075C12.9615 3.26365 12.6341 3.01288 12.2502 2.91023C11.8663 2.80758 11.4574 2.86145 11.1132 3.06L11.0007 3.12C10.7727 3.25165 10.514 3.32096 10.2507 3.32096C9.98738 3.32096 9.72871 3.25165 9.50068 3.12L9.17818 2.9325C8.95038 2.80098 8.76117 2.61186 8.62953 2.38413C8.49789 2.15639 8.42845 1.89804 8.42818 1.635V1.5C8.42818 1.10218 8.27015 0.720644 7.98884 0.43934C7.70754 0.158035 7.32601 0 6.92818 0Z"
        fill={`url(#${gradientId}-gear-grad)`}
        fillOpacity={active ? 1 : 0.6}
      />
      <path
        d="M6.76562 9.75C8.00827 9.75 9.01562 8.74264 9.01562 7.5C9.01562 6.25736 8.00827 5.25 6.76562 5.25C5.52298 5.25 4.51562 6.25736 4.51562 7.5C4.51562 8.74264 5.52298 9.75 6.76562 9.75Z"
        fill="white"
      />
      <defs>
        <linearGradient
          id={`${gradientId}-gear-grad`}
          x1="6.76318"
          y1="0"
          x2="6.76318"
          y2="15"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="var(--icon-gradient-start)" />
          <stop offset="1" stopColor="var(--icon-gradient-end)" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function IconTask({ className, width = 14, height = 14, active = false }: SidebarIconProps) {
  const gradientId = useId();
  return (
    <svg
      aria-hidden="true"
      className={className}
      width={width}
      height={height}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="1"
        y="0"
        width="2.5"
        height="14"
        rx="1.25"
        fill={`url(#${gradientId}-task-grad)`}
        fillOpacity={active ? 1 : 0.6}
      />
      <rect
        x="5.75"
        y="0"
        width="2.5"
        height="14"
        rx="1.25"
        fill={`url(#${gradientId}-task-grad)`}
        fillOpacity={active ? 1 : 0.6}
      />
      <rect
        x="10.5"
        y="0"
        width="2.5"
        height="14"
        rx="1.25"
        fill={`url(#${gradientId}-task-grad)`}
        fillOpacity={active ? 1 : 0.6}
      />
      <defs>
        <linearGradient
          id={`${gradientId}-task-grad`}
          x1="7"
          y1="0"
          x2="7"
          y2="14"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="var(--icon-gradient-start)" />
          <stop offset="1" stopColor="var(--icon-gradient-end)" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function IconFolder({
  className,
  width = 18,
  height = 18,
  active = false,
}: SidebarIconProps) {
  const gradientId = useId();
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M10 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"
        fill={`url(#${gradientId}-folder-grad)`}
        fillOpacity={active ? 1 : 0.6}
      />
      <defs>
        <linearGradient
          id={`${gradientId}-folder-grad`}
          x1="2"
          y1="4"
          x2="22"
          y2="20"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="var(--icon-gradient-start)" />
          <stop offset="1" stopColor="var(--icon-gradient-end)" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function IconChevronUpDown({
  className,
  width = 14,
  height = 14,
}: Omit<SidebarIconProps, "active">) {
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 15l5 5 5-5" />
      <path d="M7 9l5-5 5 5" />
    </svg>
  );
}

export function IconChevronLeft({
  className,
  width = 10,
  height = 16,
  style,
}: Omit<SidebarIconProps, "active"> & { style?: React.CSSProperties }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      width={width}
      height={height}
      viewBox="0 0 10 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.87859 14.293C9.26911 13.9025 9.26911 13.2694 8.87859 12.8788L3.58569 7.58594L8.87859 2.29304C9.26911 1.90252 9.26911 1.26935 8.87859 0.878831L8.2928 0.293044C7.90228 -0.0974808 7.26911 -0.0974798 6.87859 0.293044L0.292799 6.87883C-0.0977249 7.26936 -0.097724 7.90252 0.2928 8.29304L6.87859 14.8788C7.26911 15.2694 7.90228 15.2694 8.2928 14.8788L8.87859 14.293Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function IconUserDefault({
  className,
  width = 32,
  height = 32,
}: Omit<SidebarIconProps, "active">) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      width={width}
      height={height}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 16C0 7.16344 7.16344 0 16 0C24.8366 0 32 7.16344 32 16C32 24.8366 24.8366 32 16 32C7.16344 32 0 24.8366 0 16Z"
        fill="#CDD8FF"
      />
      <path
        d="M16.0001 6.0957C17.1115 6.0957 18.1773 6.5372 18.9632 7.32307C19.7491 8.10893 20.1906 9.1748 20.1906 10.2862C20.1906 11.3976 19.7491 12.4634 18.9632 13.2493C18.1773 14.0352 17.1115 14.4767 16.0001 14.4767C14.8887 14.4767 13.8228 14.0352 13.037 13.2493C12.2511 12.4634 11.8096 11.3976 11.8096 10.2862C11.8096 9.1748 12.2511 8.10893 13.037 7.32307C13.8228 6.5372 14.8887 6.0957 16.0001 6.0957ZM16.0001 8.19094C15.4444 8.19094 14.9115 8.41169 14.5185 8.80462C14.1256 9.19756 13.9049 9.73049 13.9049 10.2862C13.9049 10.8419 14.1256 11.3748 14.5185 11.7677C14.9115 12.1607 15.4444 12.3814 16.0001 12.3814C16.5558 12.3814 17.0887 12.1607 17.4817 11.7677C17.8746 11.3748 18.0953 10.8419 18.0953 10.2862C18.0953 9.73049 17.8746 9.19756 17.4817 8.80462C17.0887 8.41169 16.5558 8.19094 16.0001 8.19094ZM16.0001 15.5243C18.7972 15.5243 24.381 16.9176 24.381 19.7148V22.8576H7.61914V19.7148C7.61914 16.9176 13.203 15.5243 16.0001 15.5243ZM16.0001 17.5148C12.8887 17.5148 9.60962 19.0443 9.60962 19.7148V20.8671H22.3906V19.7148C22.3906 19.0443 19.1115 17.5148 16.0001 17.5148Z"
        fill="white"
      />
    </svg>
  );
}

export function IconFolderOutline({
  className,
  width = 20,
  height = 16,
}: Omit<SidebarIconProps, "active">) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      width={width}
      height={height}
      viewBox="0 0 14 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.33333 1.16675H5L7 3.16675H11.6667C12.0203 3.16675 12.3594 3.30722 12.6095 3.55727C12.8595 3.80732 13 4.14646 13 4.50008V9.83341C13 10.187 12.8595 10.5262 12.6095 10.7762C12.3594 11.0263 12.0203 11.1667 11.6667 11.1667H2.33333C1.97971 11.1667 1.64057 11.0263 1.39052 10.7762C1.14048 10.5262 1 10.187 1 9.83341V2.50008C1 2.14646 1.14048 1.80732 1.39052 1.55727C1.64057 1.30722 1.97971 1.16675 2.33333 1.16675Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconFolderOpen({
  className,
  width = 20,
  height = 16,
}: Omit<SidebarIconProps, "active">) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      width={width}
      height={height}
      viewBox="0 0 15 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.33333 11.1667L4.17133 6.26608C4.21896 6.13903 4.30421 6.02954 4.41571 5.95223C4.52722 5.87492 4.65965 5.83347 4.79533 5.83341H13M2.33333 11.1667H11.684C11.9942 11.1667 12.2946 11.0584 12.5336 10.8607C12.7726 10.663 12.9352 10.3881 12.9933 10.0834L13.6573 6.60941C13.6732 6.51395 13.6681 6.41618 13.6424 6.32289C13.6167 6.22959 13.5709 6.14302 13.5084 6.06918C13.4458 5.99534 13.368 5.936 13.2802 5.89529C13.1924 5.85457 13.0968 5.83346 13 5.83341M2.33333 11.1667C1.97971 11.1667 1.64057 11.0263 1.39052 10.7762C1.14048 10.5262 1 10.187 1 9.83341V2.50008C1 2.14646 1.14048 1.80732 1.39052 1.55727C1.64057 1.30722 1.97971 1.16675 2.33333 1.16675H5L7 3.16675H11.6667C12.0203 3.16675 12.3594 3.30722 12.6095 3.55727C12.8595 3.80732 13 4.14646 13 4.50008V5.83341"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconVersionHistory({
  className,
  width = 14,
  height = 14,
}: Omit<SidebarIconProps, "active">) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      width={width}
      height={height}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.59161 4.02734V6.68282L7.91935 8.01055"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M0.650024 6.01778C0.798792 4.55731 1.48004 3.20272 2.56378 2.21246C3.64752 1.2222 5.05791 0.665594 6.52584 0.648828C7.99378 0.632061 9.41651 1.15631 10.5226 2.12156C11.6287 3.0868 12.3407 4.42547 12.5228 5.88217C12.7048 7.33886 12.3443 8.81161 11.5098 10.0194C10.6754 11.2272 9.42546 12.0856 7.99857 12.4306C6.57168 12.7757 5.06768 12.5834 3.77352 11.8904C2.47937 11.1974 1.48565 10.0522 0.981959 8.67325M0.650024 11.9926V8.67325H3.96937"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconPlusSidebar({
  className,
  width = 12,
  height = 12,
}: Omit<SidebarIconProps, "active">) {
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width={width}
      height={height}
      viewBox="0 0 12 12"
      fill="none"
    >
      <path
        d="M5.39427 0.856801C5.39427 0.522043 5.66524 0.251068 6 0.251069C6.33476 0.251069 6.60573 0.522044 6.60573 0.856801V11.1432C6.60573 11.478 6.33476 11.7489 6 11.7489C5.66524 11.7489 5.39427 11.478 5.39427 11.1432V0.856801Z"
        fill="currentColor"
      />
      <path
        d="M0.251068 6C0.251068 5.66524 0.522043 5.39427 0.8568 5.39427L11.1432 5.39427C11.478 5.39427 11.7489 5.66524 11.7489 6C11.7489 6.33476 11.478 6.60573 11.1432 6.60573L0.8568 6.60573C0.522043 6.60573 0.251068 6.33476 0.251068 6Z"
        fill="currentColor"
      />
    </svg>
  );
}
