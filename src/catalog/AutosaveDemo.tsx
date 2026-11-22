import { useEffect, useRef, useState } from "react";

import { FormField } from "../ui/FormField";
import { SaveStatusIndicator, type SaveStatus } from "../ui/SaveStatusIndicator";
import { TextArea } from "../ui/TextArea";
import { AppToaster, toast } from "../ui/Toast";
import { Toggle } from "../ui/Toggle";

const storageKey = "solvifai-ui:autosave-demo-note";
const autoSaveDelay = 5000;
const sampleNote = "週末は公園を散歩して、見つけた花の名前をメモする。";

function readNote() {
  try { return localStorage.getItem(storageKey) ?? sampleNote; }
  catch { return sampleNote; }
}

export function AutosaveDemo() {
  const [draft, setDraft] = useState(readNote);
  const [status, setStatus] = useState<SaveStatus>("idle");
  const [failNext, setFailNext] = useState(false);
  const failure = useRef(false);
  const latest = useRef(draft);
  const editSequence = useRef(0);
  const savedSequence = useRef(0);
  const timer = useRef<number>(undefined);
  const queue = useRef(Promise.resolve());

  useEffect(() => () => window.clearTimeout(timer.current), []);

  function notifyEdit(note: string) {
    setDraft(note);
    latest.current = note;
    editSequence.current += 1;
    setStatus((previous) => previous === "saving" ? previous : "idle");
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      queue.current = queue.current.then(async () => {
        if (editSequence.current <= savedSequence.current) return;
        const sequence = editSequence.current;
        const snapshot = latest.current;
        setStatus("saving");
        await new Promise((resolve) => window.setTimeout(resolve, 400));
        try {
          if (failure.current) {
            failure.current = false;
            setFailNext(false);
            throw new Error("サンプルの保存に失敗しました。");
          }
          localStorage.setItem(storageKey, snapshot);
          savedSequence.current = sequence;
          setStatus("saved");
        } catch {
          setStatus("error");
          toast.error("サンプルの保存に失敗しました。");
        }
      });
    }, autoSaveDelay);
  }

  return (
    <section aria-label="散歩メモ" className="grid gap-4 rounded-xl border border-catalog-line bg-white p-4">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-base font-bold">散歩メモ</h2>
        <div role="status"><SaveStatusIndicator status={status} /></div>
      </div>
      <FormField label="メモ" htmlFor="autosave-demo-note">
        <TextArea id="autosave-demo-note" rows={4} value={draft}
          onChange={(event) => notifyEdit(event.currentTarget.value)} />
      </FormField>
      <div className="flex items-center text-sm text-catalog-muted">
        <Toggle checked={failNext} ariaLabel="次の保存を失敗させる" onChange={(checked) => {
          failure.current = checked;
          setFailNext(checked);
        }} />
        <span aria-hidden="true">次の保存を失敗させる</span>
      </div>
      <AppToaster />
    </section>
  );
}
