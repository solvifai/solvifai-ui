import { useEffect, useRef, useState } from "react";

import { AppButton } from "../ui/AppButton";
import { FormField } from "../ui/FormField";
import { TextArea } from "../ui/TextArea";
import { TextInput } from "../ui/TextInput";
import { cn } from "../ui/cn";

const steps = ["入力", "確認", "完了"];
const headings = ["参加者情報", "入力内容の確認", "申し込み完了"];

export function StepReviewDemo() {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const heading = useRef<HTMLHeadingElement>(null);
  const moved = useRef(false);

  useEffect(() => {
    if (!moved.current) return;
    moved.current = false;
    heading.current?.focus();
  }, [step]);

  function goTo(next: number) {
    moved.current = true;
    setStep(next);
  }

  return (
    <>
      <section aria-label="観察会の申し込み" className="grid gap-4 rounded-xl border border-catalog-line bg-white p-4 sm:p-5">
        <ol aria-label="申し込みの手順" className="grid grid-cols-3 gap-2">
          {steps.map((label, index) => (
            <li
              key={label}
              aria-current={step === index ? "step" : undefined}
              className={cn(
                "rounded-md px-2 py-2 text-center text-sm font-medium",
                step === index ? "bg-blue-50 text-brand-foreground" : "bg-gray-50 text-catalog-muted",
              )}
            >
              {index + 1}. {label}
            </li>
          ))}
        </ol>
        <h2 ref={heading} tabIndex={-1} className="text-base font-bold">{headings[step]}</h2>
        {step === 0 && (
          <form
            className="grid gap-4"
            onSubmit={(event) => {
              event.preventDefault();
              if (name.trim()) goTo(1);
            }}
          >
            <FormField label="参加者名（必須）" htmlFor="step-review-name">
              <TextInput id="step-review-name" value={name} onChange={setName} placeholder="例　山田はな" />
            </FormField>
            <FormField label="ひとこと（任意）" htmlFor="step-review-note">
              <TextArea id="step-review-note" value={note} onChange={(event) => setNote(event.currentTarget.value)} />
            </FormField>
            <div className="flex justify-end">
              <AppButton type="submit" variant="primary" disabled={!name.trim()}>確認へ</AppButton>
            </div>
          </form>
        )}
        {step === 1 && (
          <>
            <dl className="grid gap-3 rounded-md bg-gray-50 p-3 text-sm">
              <div>
                <dt className="text-catalog-muted">参加者名</dt>
                <dd className="mt-1 wrap-anywhere font-medium">{name.trim()}</dd>
              </div>
              <div>
                <dt className="text-catalog-muted">ひとこと</dt>
                <dd className="mt-1 wrap-anywhere whitespace-pre-wrap">{note.trim() || "未入力"}</dd>
              </div>
            </dl>
            <div className="flex flex-wrap justify-end gap-2">
              <AppButton variant="back" onClick={() => goTo(0)}>入力に戻る</AppButton>
              <AppButton variant="primary" onClick={() => goTo(2)}>申し込む</AppButton>
            </div>
          </>
        )}
        {step === 2 && (
          <>
            <p className="text-sm text-catalog-muted">サンプルの申し込みが完了しました。</p>
            <div className="flex justify-end">
              <AppButton
                variant="back"
                onClick={() => {
                  setName("");
                  setNote("");
                  goTo(0);
                }}
              >
                最初から試す
              </AppButton>
            </div>
          </>
        )}
      </section>
      <a className="source-link mt-4" href="#text-input">入力欄の使い方</a>
    </>
  );
}
