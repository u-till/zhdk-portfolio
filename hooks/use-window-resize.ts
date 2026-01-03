import { useCallback, useEffect, useRef, useState } from 'react';
import { WINDOW_CONSTRAINTS } from '@/constants/macos';

export function useWindowResize(
  size: { width: number; height: number },
  onResize: (size: { width: number; height: number }) => void,
  minWidth = WINDOW_CONSTRAINTS.MIN_WIDTH,
  minHeight = WINDOW_CONSTRAINTS.MIN_HEIGHT
) {
  const [isResizing, setIsResizing] = useState(false);
  const startSizeRef = useRef({ width: 0, height: 0 });
  const startPosRef = useRef({ x: 0, y: 0 });
  const cornerRef = useRef('');

  const handleResizeStart = useCallback(
    (e: React.MouseEvent, corner: string) => {
      e.preventDefault();
      e.stopPropagation();
      setIsResizing(true);
      cornerRef.current = corner;
      startSizeRef.current = { width: size.width, height: size.height };
      startPosRef.current = { x: e.clientX, y: e.clientY };
    },
    [size.width, size.height]
  );

  useEffect(() => {
    if (!isResizing) return;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - startPosRef.current.x;
      const deltaY = moveEvent.clientY - startPosRef.current.y;

      let newWidth = startSizeRef.current.width;
      let newHeight = startSizeRef.current.height;

      if (cornerRef.current.includes('e')) newWidth += deltaX;
      if (cornerRef.current.includes('s')) newHeight += deltaY;

      // Min size constraints
      newWidth = Math.max(minWidth, newWidth);
      newHeight = Math.max(minHeight, newHeight);

      onResize({ width: newWidth, height: newHeight });
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, onResize, minWidth, minHeight]);

  return { isResizing, handleResizeStart };
}
