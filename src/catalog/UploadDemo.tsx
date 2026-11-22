import { Upload } from "lucide-react";
import { useRef, useState } from "react";

import { AppButton } from "../ui/AppButton";
import { AppToaster, toast } from "../ui/Toast";

const accept = ".pdf,.pptx,.docx,.xlsx,.xls,.xlsm,.txt,.md,.c,.wav,.mp4,.mp3,.m4a,.opus,.ogg,.flac,.wma,.aac,.amr,.webm,.spx";
const mb = 1024 * 1024;

export function UploadDemo() {
  const input = useRef<HTMLInputElement>(null);
  const [pending, setPending] = useState(false);
  const [added, setAdded] = useState<string[]>([]);

  return (
    <section aria-label="ファイル追加の例" className="grid gap-3 rounded-xl border border-catalog-line bg-white p-4">
      <AppButton variant="back" className="w-fit gap-2" disabled={pending}
        iconLeft={<Upload size={16} aria-hidden="true" />} onClick={() => input.current?.click()}>
        {pending ? "処理中…" : "ファイル追加"}
      </AppButton>
      <input ref={input} type="file" multiple accept={accept} className="hidden"
        aria-label="追加するファイル"
        onChange={(event) => {
          const files = Array.from(event.currentTarget.files ?? []);
          event.currentTarget.value = "";
          if (!files.length) return;
          if (files.length > 20 || files.some((file) => file.size > 100 * mb)
            || files.reduce((total, file) => total + file.size, 0) > 190 * mb) {
            toast.error("ファイルは20件まで、1件100MB・合計190MB以内で選んでください。");
            return;
          }
          setPending(true);
          window.setTimeout(() => {
            setAdded((previous) => [...previous, ...files.map(({ name }) => name)]);
            setPending(false);
          }, 750);
        }}
      />
      <p role="status" className="text-sm text-catalog-muted">{added.length}件を追加しました。</p>
      <ul className="list-disc pl-5 text-sm">{added.map((name, index) => (
        <li key={index} className="wrap-anywhere">{name}</li>
      ))}</ul>
      <AppToaster />
    </section>
  );
}
