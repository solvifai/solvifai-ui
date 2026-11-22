import { useCallback, useEffect, useState } from 'react';

interface ResizeDividerProps {
  position: 'left' | 'right';
  onResize: (delta: number) => void;
  onResizeStart?: () => void;
  onResizeEnd?: () => void;
}

export function ResizeDivider({
  position,
  onResize,
  onResizeStart,
  onResizeEnd,
}: ResizeDividerProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      setIsDragging(true);
      setStartX(e.clientX);
      onResizeStart?.();
    },
    [onResizeStart],
  );

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const delta = e.clientX - startX;
      const adjustedDelta = position === 'left' ? delta : -delta;
      onResize(adjustedDelta);
      setStartX(e.clientX);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      onResizeEnd?.();
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, startX, position, onResize, onResizeEnd]);

  return (
    <div
      className={`relative z-10 -mx-0.5 flex h-full w-1.5 flex-shrink-0 cursor-col-resize items-center justify-center bg-transparent transition-colors hover:bg-blue-500/10 ${
        isDragging ? 'bg-blue-500/10' : ''
      }`}
      onMouseDown={handleMouseDown}
    >
      <div
        className={`h-full w-1 rounded-sm bg-gray-300 transition-colors ${
          isDragging ? 'bg-blue-500' : 'hover:bg-blue-500'
        }`}
      />
    </div>
  );
}
