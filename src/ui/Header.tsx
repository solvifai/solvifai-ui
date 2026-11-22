import type { ReactNode, Ref } from "react";

import { IconChevronUpDown, IconFolder } from "./sidebar-icons";

interface HeaderProps {
  projectName?: string;
  projectButtonRef?: Ref<HTMLButtonElement>;
  onSelectProject: () => void;
  members?: ReactNode;
  notifications: ReactNode;
}

export function Header({
  projectName,
  projectButtonRef,
  onSelectProject,
  members,
  notifications,
}: HeaderProps) {
  return (
    <header aria-label="共通ヘッダー"
      className="flex min-h-16.75 w-full flex-wrap items-center gap-x-3 gap-y-2 border-b border-border-primary bg-white px-3 py-2 font-sans sm:flex-nowrap sm:px-5 lg:gap-x-0 lg:pr-8 lg:pl-15">
      <img
        src={import.meta.env.BASE_URL + "solvifai-logo.svg"}
        alt="SolvifAI"
        width={129}
        height={27}
        className="w-[105px] shrink-0 sm:w-[129px]"
      />
      <div className="order-last w-full min-w-0 sm:order-none sm:w-auto sm:flex-1 lg:ml-10">
        <button
          ref={projectButtonRef}
          type="button"
          aria-haspopup="dialog"
          onClick={onSelectProject}
          className="flex h-10 w-full min-w-0 items-center gap-2 rounded-lg border border-[#c8c8c8] bg-white px-3 text-sm text-text-primary transition-colors hover:bg-product-bg lg:w-auto lg:min-w-55 lg:gap-0 lg:pl-5"
        >
          <IconFolder className="shrink-0 lg:mr-5" active />
          <span className="min-w-0 flex-1 truncate text-left lg:max-w-45">
            {projectName || "プロジェクトを選択"}
          </span>
          <IconChevronUpDown className="shrink-0 text-text-secondary" />
        </button>
      </div>
      <div className="ml-auto flex shrink-0 items-center gap-3 sm:ml-0 lg:gap-4">
        {members}
        {notifications}
      </div>
    </header>
  );
}
