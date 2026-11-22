import { AlertCircle, Check, Cloud, Loader2 } from 'lucide-react';

import { cn } from './cn';

export type SaveStatus = 'idle' | 'saving' | 'saved' | 'error' | 'unsaved';

interface SaveStatusIndicatorProps {
  status: SaveStatus;
  className?: string;
}

function SyncedCloudIcon() {
  return (
    <span className='relative inline-flex shrink-0'>
      <Cloud className='size-4' />
      <span className='absolute -right-0.5 -bottom-0.5 flex size-2.5 items-center justify-center rounded-full bg-white'>
        <Check className='size-2' strokeWidth={3} />
      </span>
    </span>
  );
}

export function SaveStatusIndicator({
  status,
  className,
}: SaveStatusIndicatorProps) {
  switch (status) {
    case 'unsaved':
      return (
        <span className={cn('text-xs text-gray-400', className)}>未保存</span>
      );
    case 'saving':
      return (
        <span
          className={cn(
            'flex items-center gap-1 text-xs text-gray-400',
            className,
          )}
        >
          <Loader2 className='size-3.5 motion-safe:animate-spin' />
          保存中...
        </span>
      );
    case 'error':
      return (
        <span
          className={cn(
            'flex items-center gap-1 text-xs text-red-500',
            className,
          )}
          title='自動保存に失敗しました'
        >
          <AlertCircle className='size-3.5' />
          保存に失敗しました
        </span>
      );
    case 'saved':
      return (
        <span
          className={cn(
            'flex items-center gap-1 text-xs text-emerald-600',
            className,
          )}
        >
          <SyncedCloudIcon />
          保存済み
        </span>
      );
    case 'idle':
    default:
      return (
        <span
          className={cn('flex items-center text-emerald-600', className)}
          title='保存済み'
        >
          <SyncedCloudIcon />
        </span>
      );
  }
}
