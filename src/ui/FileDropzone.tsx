import { UploadIcon, XIcon } from 'lucide-react';
import { useRef, useState, type DragEvent } from 'react';

import { AppButton } from './AppButton';

interface FileDropzoneProps {
  file: File | null;
  error: string | null;
  accept: string;
  hint: string;
  disabled?: boolean;
  onSelect: (file: File) => void;
  onClear: () => void;
}

export function FileDropzone({
  file,
  error,
  accept,
  hint,
  disabled = false,
  onSelect,
  onClear,
}: FileDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  if (file) {
    return (
      <div className='flex items-center justify-between rounded-lg bg-gray-light px-3 py-2.5'>
        <span className='truncate text-sm text-text-primary'>{file.name}</span>
        <button
          type='button'
          aria-label='ファイルを取り消す'
          disabled={disabled}
          onClick={onClear}
          className='ml-3 flex-shrink-0 cursor-pointer text-product-subtext disabled:cursor-not-allowed'
        >
          <XIcon className='size-5' />
        </button>
      </div>
    );
  }

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped && !disabled) onSelect(dropped);
  };

  const stateClass = isDragging
    ? 'border-brand-primary bg-brand-hover'
    : error
      ? 'border-border-error bg-function-low-red'
      : 'border-border-secondary bg-product-bg';

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      className={`flex flex-col items-center gap-2 rounded-lg border border-dashed px-6 py-8 transition-colors ${stateClass}`}
    >
      <UploadIcon className='size-6 text-text-secondary' />
      <p className='text-sm font-medium text-text-primary'>
        ファイルをドラッグ&ドロップ
      </p>
      <p className='text-xs text-product-subtext'>または</p>
      <AppButton
        variant='back'
        label='ファイルを選択'
        disabled={disabled}
        onClick={() => inputRef.current?.click()}
      />
      <p
        role={error ? 'alert' : undefined}
        className={`text-xs ${error ? 'text-function-red' : 'text-product-subtext'}`}
      >
        {error ?? hint}
      </p>
      <input
        ref={inputRef}
        type='file'
        accept={accept}
        className='hidden'
        onChange={(e) => {
          const selected = e.target.files?.[0];
          if (selected) onSelect(selected);
          // 同じファイルを選び直せるようにする
          e.target.value = '';
        }}
      />
    </div>
  );
}
