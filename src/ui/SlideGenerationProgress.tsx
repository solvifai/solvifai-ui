import { SpinnerIcon } from './icons';

export interface SlideGenerationProgressProps {
  progress: number;
  label?: string;
  showPercent?: boolean;
  /** 指定すると「キャンセル」ボタンを表示し、押下時に呼び出す。 */
  onCancel?: () => void;
  /** キャンセル要求の送信中はボタンを無効化する。 */
  isCanceling?: boolean;
  cancelDisabled?: boolean;
  cancelLabel?: string;
}

export function SlideGenerationProgress({
  progress,
  label = 'スライド生成中',
  showPercent = true,
  onCancel,
  isCanceling = false,
  cancelDisabled = false,
  cancelLabel = 'ドラフトをキャンセル',
}: SlideGenerationProgressProps) {
  return (
    <div className='mb-2 py-3'>
      <div className='flex items-center gap-3'>
        <SpinnerIcon className='h-5 w-5 flex-shrink-0 motion-safe:animate-spin text-blue-600' />
        <div className='flex flex-1 items-center gap-3'>
          <span className='text-sm text-blue-900'>{label}</span>
          <div className='h-1.5 max-w-xs flex-1 rounded-full bg-blue-200' role='progressbar' aria-label={label} aria-valuenow={progress}>
            <div
              className='h-1.5 rounded-full bg-blue-600 transition-all duration-300'
              style={{ width: `${progress}%` }}
            />
          </div>
          {showPercent && (
            <span className='text-sm text-blue-700 tabular-nums'>
              {progress}%
            </span>
          )}
        </div>
        {onCancel && (
          <button
            type='button'
            onClick={onCancel}
            disabled={isCanceling || cancelDisabled}
            className='flex-shrink-0 rounded border border-blue-300 px-3 py-1 text-xs font-medium text-blue-700 transition-colors hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-50'
          >
            {isCanceling ? 'キャンセル中...' : cancelLabel}
          </button>
        )}
      </div>
    </div>
  );
}
