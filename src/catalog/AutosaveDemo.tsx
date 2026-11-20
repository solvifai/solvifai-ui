import { useEffect, useEffectEvent, useRef, useState } from "react";

import { AlertBanner } from "../ui/AlertBanner";
import { AppButton } from "../ui/AppButton";
import { FormField } from "../ui/FormField";
import { SaveStatusIndicator, type SaveStatus } from "../ui/SaveStatusIndicator";
import { TextArea } from "../ui/TextArea";
import { Toggle } from "../ui/Toggle";

const storageKey = "solvifai-ui:autosave-demo-note";
const sampleNote = "週末は公園を散歩して、見つけた花の名前をメモする。";
const simulateFailureLabel = "次の保存を失敗させる";

function readSavedNote() {
  try {
    return window.localStorage.getItem(storageKey);
  } catch {
    return null;
  }
}

export function AutosaveDemo() {
  const [savedNote, setSavedNote] = useState(readSavedNote);
  const [draft, setDraft] = useState(savedNote ?? sampleNote);
  const [status, setStatus] = useState<SaveStatus>(savedNote === null ? "idle" : "saved");
  const [failNext, setFailNext] = useState(false);
  const noteInput = useRef<HTMLTextAreaElement>(null);

  const advanceSave = useEffectEvent((phase: "idle" | "saving", note: string) => {
    if (status !== phase || draft !== note) return;
    if (phase === "idle") {
      setStatus("saving");
      return;
    }
    if (failNext) {
      setFailNext(false);
      setStatus("error");
      return;
    }
    try {
      window.localStorage.setItem(storageKey, note);
      setSavedNote(note);
      setStatus("saved");
    } catch {
      setStatus("error");
    }
  });

  useEffect(() => {
    if (status !== "idle" && status !== "saving") return;
    if (draft === (savedNote ?? sampleNote)) return;

    const timer = window.setTimeout(
      () => advanceSave(status, draft),
      status === "idle" ? 600 : 650,
    );
    return () => window.clearTimeout(timer);
  }, [draft, savedNote, status]);

  return (
    <>
      <section
        aria-labelledby="autosave-demo-heading"
        className="mt-2 grid gap-4 rounded-xl border border-catalog-line bg-white p-4 sm:p-5"
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 id="autosave-demo-heading" className="text-base font-bold">散歩メモ</h2>
          <SaveStatusIndicator status={status} />
        </div>
        <FormField label="メモ" htmlFor="autosave-demo-note">
          <TextArea
            id="autosave-demo-note"
            ref={noteInput}
            rows={4}
            value={draft}
            onChange={(event) => {
              const note = event.currentTarget.value;
              setDraft(note);
              setStatus(note === savedNote ? "saved" : "idle");
            }}
          />
        </FormField>
        {status === "error" && (
          <AlertBanner
            action={
              <AppButton
                variant="back"
                onClick={() => {
                  setStatus("saving");
                  noteInput.current?.focus();
                }}
              >
                再試行
              </AppButton>
            }
          >
            入力したメモは編集欄に残っています。
          </AlertBanner>
        )}
        <div className="flex items-center gap-2 text-sm text-catalog-muted">
          <Toggle checked={failNext} onChange={setFailNext} ariaLabel={simulateFailureLabel} />
          <span aria-hidden="true">{simulateFailureLabel}</span>
        </div>
      </section>
      <div className="mt-4 flex flex-wrap gap-x-5">
        <a className="source-link" href="#text-area">入力欄の使い方</a>
        <a className="source-link" href="#save-status-indicator">保存状態の使い方</a>
      </div>
    </>
  );
}
