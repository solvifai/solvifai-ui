import { XIcon } from 'lucide-react';

import { FileTypeIcon } from './FileTypeIcon';
import { DocumentGradientIcon } from './icons';

export interface SelectedFile {
  id: string;
  file?: File;
  name: string;
  ext?: string;
  source: 'local' | 'document' | 'minute';
  sourceId?: number;
}

interface Props {
  files: readonly SelectedFile[];
  onRemove: (id: string) => void;
}

export function FileChipList({ files, onRemove }: Props) {
  if (files.length === 0) return null;
  return (
    <div className='mb-5 flex flex-wrap gap-3'>
      {files.map((f) => (
        <span
          key={f.id}
          className='inline-flex max-w-lg items-center gap-2 rounded-lg bg-gray-light px-3 py-2 text-sm text-text-primary'
          style={{ height: 41 }}
        >
          {f.source === 'minute' ? (
            <DocumentGradientIcon
              className='size-4 shrink-0 text-text-secondary'
              color='currentColor'
            />
          ) : (
            <FileTypeIcon
              extension={f.ext}
              fileName={f.file?.name ?? f.name}
              className='size-5'
            />
          )}
          <span className='truncate' title={f.name}>
            {f.name}
          </span>
          <button
            type='button'
            onClick={() => onRemove(f.id)}
            aria-label={`${f.name}を取り外す`}
            className='shrink-0 text-text-secondary hover:text-text-primary'
          >
            <XIcon className='size-3.5' />
          </button>
        </span>
      ))}
    </div>
  );
}
