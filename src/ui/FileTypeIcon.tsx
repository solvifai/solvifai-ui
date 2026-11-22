import { FileCode, FileText, type LucideIcon } from 'lucide-react';

import { cn } from './cn';

const FILE_ICONS: Record<string, { icon: string; label: string }> = {};

const types = [
  ['ppt pptm pptx', 'pptx', 'PowerPoint'],
  ['doc docm docx', 'docx', 'Word'],
  ['xls xlsb xlsm xlsx', 'xlsx', 'Excel'],
  ['pdf', 'pdf', 'PDF'],
  ['txt', 'txt', 'テキスト'],
  ['csv', 'csv', 'CSV'],
  ['jpg jpeg png gif webp bmp tif tiff heic', 'photo', '画像'],
  ['wav mp3 m4a opus ogg flac wma aac amr spx', 'audio', '音声'],
  ['mp4 webm mov avi wmv', 'video', '動画'],
] as const;

export const fileTypes = types.map(([extensions, , label]) => ({ label, extensions: extensions.split(' ') }));

for (const [extensions, icon, label] of types) {
  for (const extension of extensions.split(' ')) {
    FILE_ICONS[extension] = { icon, label };
  }
}

const EXTRA_FILE_ICONS: Partial<
  Record<string, { Icon: LucideIcon; label: string; color: string }>
> = {
  md: { Icon: FileText, label: 'Markdown', color: 'text-violet-700' },
  c: { Icon: FileCode, label: 'Cソースコード', color: 'text-blue-700' },
};

interface FileTypeIconProps {
  extension?: string | null;
  fileName?: string;
  className?: string;
  nativeTooltip?: boolean;
  showExtension?: boolean;
}

/** Microsoft / Google の公式 PNG。取得元は public/assets/file-types/README.md。 */
export function FileTypeIcon({
  extension,
  fileName,
  className,
  nativeTooltip = true,
  showExtension = false,
}: FileTypeIconProps) {
  const ext = (
    extension?.trim().replace(/^\./, '') ||
    (fileName?.includes('.') ? fileName.split('.').pop() : '') ||
    ''
  ).toLowerCase();
  const fileIcon = FILE_ICONS[ext];
  const badge = showExtension && /^[a-z0-9]{1,5}$/.test(ext);
  const extra = badge ? EXTRA_FILE_ICONS[ext] : undefined;
  const kind = extra?.label ?? fileIcon?.label ?? 'ファイル';
  const label = ext ? `${kind} (.${ext})` : kind;
  const image = (
    <img
      src={`${import.meta.env.BASE_URL}assets/file-types/${fileIcon?.icon ?? 'genericfile'}.png`}
      alt={badge ? '' : label}
      title={!badge && nativeTooltip ? label : undefined}
      width={24}
      height={24}
      className={cn('size-6 shrink-0 object-contain', className)}
      draggable={false}
    />
  );
  if (!badge) return image;

  return (
    <span
      role='img'
      aria-label={label}
      title={nativeTooltip ? label : undefined}
      className='relative flex h-8 w-9 shrink-0 items-start justify-center'
    >
      {extra ? (
        <extra.Icon
          aria-hidden='true'
          className={cn('size-6', extra.color, className)}
        />
      ) : (
        image
      )}
      <span
        aria-hidden='true'
        className='absolute bottom-0 rounded border border-white bg-slate-700 px-1 text-[9px] leading-[13px] font-bold text-white'
      >
        {ext.toUpperCase()}
      </span>
    </span>
  );
}
