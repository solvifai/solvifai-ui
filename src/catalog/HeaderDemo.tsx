import { useRef, useState } from "react";

import { AppButton } from "../ui/AppButton";
import { AvatarGroup } from "../ui/AvatarGroup";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/Dialog";
import { FormField } from "../ui/FormField";
import { Header } from "../ui/Header";
import { ProjectSelectorModal } from "../ui/ProjectSelectorModal";
import { SampleNotificationDropdown } from "./NotificationDemo";
import { sourceUrl } from "./sources";

const sampleProjects = [
  { id: 1, name: "週末の自然観察", members: ["山田 はな", "佐藤 りく", "森 あおい"] },
  { id: 2, name: "まちの図書ノート", members: ["田中 みお", "林 そう"] },
  { id: 3, name: "公園のマップづくり", members: ["林 そう", "佐藤 りく"] },
];

export function HeaderDemo() {
  const [projects, setProjects] = useState(sampleProjects);
  const [currentId, setCurrentId] = useState(sampleProjects[0].id);
  const [panel, setPanel] = useState<"select" | "create" | null>(null);
  const [name, setName] = useState("");
  const projectButton = useRef<HTMLButtonElement>(null);
  const current = projects.find(({ id }) => id === currentId) ?? sampleProjects[0];

  function closePanel() {
    setPanel(null);
    requestAnimationFrame(() => projectButton.current?.focus({ preventScroll: true }));
  }

  return (
    <>
      <section aria-label="共通ヘッダーの例" className="min-h-72 rounded-xl border border-catalog-line bg-background-bg">
        <Header
          projectName={current.name}
          projectButtonRef={projectButton}
          onSelectProject={() => setPanel("select")}
          members={
            <Dialog>
              <DialogTrigger asChild>
                <button type="button" aria-label="メンバーを表示"
                  className="min-h-9 cursor-pointer rounded transition-opacity hover:opacity-80">
                  {current.members.length > 0
                    ? <AvatarGroup members={current.members.map((name) => ({ name, icon_path: "/img/icon/user.svg" }))} />
                    : <span className="text-xs text-text-secondary">メンバー</span>}
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
      {panel === "select" && (
        <ProjectSelectorModal
          anchorRef={projectButton}
          projects={projects}
          currentProjectId={currentId}
          onSelect={(id) => {
            setCurrentId(id);
            closePanel();
          }}
          onCreate={() => {
            setName("");
            setPanel("create");
          }}
          onClose={closePanel}
        />
      )}
      {panel === "create" && (
        <Dialog open onOpenChange={(open) => { if (!open) closePanel(); }}>
          <DialogContent className="gap-0 p-0 sm:max-w-[860px]"
            onCloseAutoFocus={(event) => event.preventDefault()}
            onInteractOutside={(event) => event.preventDefault()}>
            <DialogHeader className="border-b border-border-primary px-6 py-5 pr-12 text-left">
              <DialogTitle>新規プロジェクト作成</DialogTitle>
              <DialogDescription>このデモ内のプロジェクト一覧に名前を追加します。</DialogDescription>
            </DialogHeader>
            <form onSubmit={(event) => {
              event.preventDefault();
              if (!name.trim()) return;
              setProjects((previous) => [...previous, {
                id: previous.length + 1,
                name: name.trim(),
                members: [],
              }]);
              closePanel();
            }}>
              <FormField className="px-6 py-5" label="プロジェクト名（必須）" htmlFor="new-demo-project">
                <input id="new-demo-project" required maxLength={255} value={name}
                  onChange={(event) => setName(event.currentTarget.value)}
                  className="min-w-0 w-full rounded-lg border border-border-control px-3 py-2.5 text-sm text-text-primary" />
              </FormField>
              <div className="flex flex-wrap justify-between gap-3 border-t border-border-primary px-6 py-4">
                <AppButton onClick={closePanel}>キャンセル</AppButton>
                <AppButton type="submit" variant="primary" disabled={!name.trim()}>作成する</AppButton>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      )}
      <div className="mt-4 flex flex-wrap gap-x-5">
        <a className="source-link" href="https://github.com/solvifai/solvifai-ui/blob/main/src/ui/Header.tsx">
          切り出したヘッダーの実装をGitHubで見る
        </a>
        <a className="source-link" href={sourceUrl("components/layout/ProjectDialog.tsx")}>
          本体のプロジェクト選択の実装元（権限が必要）
        </a>
      </div>
    </>
  );
}
