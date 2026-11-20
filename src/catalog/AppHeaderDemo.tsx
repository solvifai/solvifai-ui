import { Bell, Leaf } from "lucide-react";
import { useState } from "react";

import { AppButton } from "../ui/AppButton";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "../ui/Dialog";
import { Tabs } from "../ui/Tabs";

const sections = [
  { value: "home", label: "ホーム", title: "きょうの観察", text: "公園の入口でツバメを見かけました。" },
  { value: "records", label: "観察記録", title: "最近の記録", text: "川沿いでカワセミを1羽観察しました。" },
  { value: "places", label: "観察場所", title: "次の散歩先", text: "池のそばの遊歩道を歩く予定です。" },
] as const;

const tabs = sections.map(({ value, label, title, text }) => ({
  value,
  label,
  panel: (
    <div className="border-t border-catalog-line bg-background-bg p-4 sm:p-5">
      <h3 className="text-base font-bold">{title}</h3>
      <p className="mt-1 text-sm text-catalog-muted">{text}</p>
    </div>
  ),
}));

export function AppHeaderDemo() {
  const [active, setActive] = useState<(typeof sections)[number]["value"]>("home");

  return (
    <>
      <section aria-labelledby="app-header-demo-title" className="rounded-xl border border-catalog-line bg-white">
        <header className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-5">
          <div className="flex items-center gap-2">
            <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-emerald-50 text-emerald-800">
              <Leaf size={18} aria-hidden="true" />
            </span>
            <h2 id="app-header-demo-title" className="text-base font-bold">野鳥ノート</h2>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <AppButton variant="back" iconLeft={<Bell size={16} aria-hidden="true" />}>
                お知らせ
              </AppButton>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle className="pr-8">お知らせ</DialogTitle>
              <DialogDescription>週末の観察会は午前9時に公園の入口へ集合します。</DialogDescription>
              <DialogFooter>
                <DialogClose asChild>
                  <AppButton variant="back">確認しました</AppButton>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </header>
        <Tabs
          tabs={tabs}
          value={active}
          onChange={setActive}
          ariaLabel="野鳥ノートのセクション"
          className="gap-0 [&>[role=tablist]]:mx-4 [&>[role=tablist]]:mb-3 sm:[&>[role=tablist]]:mx-5"
        />
      </section>
      <div className="mt-4 flex flex-wrap gap-x-5">
        <a className="source-link" href="#tabs">タブの使い方</a>
        <a className="source-link" href="#dialog">ダイアログの使い方</a>
      </div>
    </>
  );
}
