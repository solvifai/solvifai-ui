import { useRef, useState } from "react";

import { AvatarGroup } from "../ui/AvatarGroup";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/Dialog";
import { Header } from "../ui/Header";
import { SearchInput } from "../ui/SearchInput";
import { IconFolder } from "../ui/sidebar-icons";
import { SampleNotificationDropdown } from "./NotificationDemo";

const projects = [
  { id: 1, name: "週末の自然観察", members: ["山田 はな", "佐藤 りく", "森 あおい"] },
  { id: 2, name: "まちの図書ノート", members: ["田中 みお", "林 そう"] },
  { id: 3, name: "公園のマップづくり", members: ["林 そう", "佐藤 りく"] },
];

export function HeaderDemo() {
  const [current, setCurrent] = useState(projects[0]);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [query, setQuery] = useState("");
  const projectButton = useRef<HTMLButtonElement>(null);
  const visible = projects.filter((project) => project.name.toLowerCase().includes(query.trim().toLowerCase()));

  return (
    <>
      <section aria-label="共通ヘッダーの例" className="min-h-72 rounded-xl border border-catalog-line bg-background-bg">
        <Header
          projectName={current.name}
          projectButtonRef={projectButton}
          onSelectProject={() => {
            setQuery("");
            setPickerOpen(true);
          }}
          members={
            <Dialog>
              <DialogTrigger asChild>
                <button type="button" aria-label="メンバーを表示"
                  className="min-h-9 cursor-pointer rounded transition-opacity hover:opacity-80">
                  <AvatarGroup members={current.members.map((name) => ({ name, icon_path: "/img/icon/user.svg" }))} />
                </button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="pr-8">プロジェクトのメンバー</DialogTitle>
                  <DialogDescription>{current.name}のサンプルメンバーです。</DialogDescription>
                </DialogHeader>
                <ul className="divide-y divide-border-control text-sm">
                  {current.members.map((name) => <li key={name} className="py-2">{name}</li>)}
                </ul>
              </DialogContent>
            </Dialog>
          }
          notifications={<SampleNotificationDropdown />}
        />
      </section>
      <Dialog open={pickerOpen} onOpenChange={setPickerOpen}>
        <DialogContent
          className="max-w-[480px] rounded-2xl"
          overlayClassName="bg-transparent"
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            projectButton.current?.focus();
          }}
        >
          <DialogTitle className="pr-8 text-base font-normal">プロジェクトを選択</DialogTitle>
          <DialogDescription className="sr-only">表示するサンプルプロジェクトを選びます。</DialogDescription>
          <SearchInput ariaLabel="プロジェクトを検索" placeholder="プロジェクト名で検索" value={query} onChange={setQuery} />
          <ul className="grid gap-2">
            {visible.map((project) => (
              <li key={project.id}>
                <button
                  type="button"
                  aria-current={project.id === current.id ? "true" : undefined}
                  className={`flex min-h-14 w-full items-center gap-3 rounded-lg px-4 text-left text-text-primary ${project.id === current.id ? "bg-brand-hover" : "hover:bg-brand-hover"}`}
                  onClick={() => {
                    setCurrent(project);
                    setPickerOpen(false);
                  }}
                >
                  <IconFolder width={20} height={20} className="shrink-0" active={project.id === current.id} />
                  <span className="truncate">{project.name}</span>
                </button>
              </li>
            ))}
          </ul>
          {visible.length === 0 && (
            <p role="status" className="py-4 text-center text-sm text-text-secondary">一致するプロジェクトがありません。</p>
          )}
        </DialogContent>
      </Dialog>
      <a className="source-link mt-4" href="https://github.com/solvifai/solvifai-ui/blob/main/src/ui/Header.tsx">
        切り出したヘッダーの実装をGitHubで見る
      </a>
    </>
  );
}
