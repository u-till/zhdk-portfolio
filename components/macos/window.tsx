'use client';

import { motion } from 'framer-motion';
import { WindowProps } from '@/types/macos';
import { TextViewer } from './text-viewer';
import { useState, useRef } from 'react';

export function Window({
  id,
  title,
  url,
  type,
  position,
  size,
  zIndex,
  isMaximized,
  onClose,
  onFocus,
  onMinimize,
  onMaximize,
  onResize,
  content,
}: WindowProps) {
  const [iframeError, setIframeError] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const windowRef = useRef<HTMLDivElement>(null);
  const startSizeRef = useRef({ width: 0, height: 0 });
  const startPosRef = useRef({ x: 0, y: 0 });

  const handleResizeStart = (e: React.MouseEvent, corner: string) => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);
    startSizeRef.current = { width: size.width, height: size.height };
    startPosRef.current = { x: e.clientX, y: e.clientY };

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - startPosRef.current.x;
      const deltaY = moveEvent.clientY - startPosRef.current.y;

      let newWidth = startSizeRef.current.width;
      let newHeight = startSizeRef.current.height;

      if (corner.includes('e')) newWidth += deltaX;
      if (corner.includes('s')) newHeight += deltaY;

      // Min size constraints
      newWidth = Math.max(400, newWidth);
      newHeight = Math.max(300, newHeight);

      onResize({ width: newWidth, height: newHeight });
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <motion.div
      ref={windowRef}
      drag={!isResizing && !isMaximized}
      dragMomentum={false}
      dragElastic={0}
      initial={{ scale: 0.3, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.3, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      style={{
        position: isMaximized ? 'absolute' : 'fixed',
        left: isMaximized ? 0 : position.x,
        top: isMaximized ? 0 : position.y,
        width: isMaximized ? '100%' : size.width,
        height: isMaximized ? '100%' : size.height,
        zIndex,
      }}
      onMouseDown={onFocus}
      className="rounded-lg shadow-2xl overflow-hidden"
    >
      {/* Window Chrome - Title Bar */}
      <div
        className="h-8 bg-neutral-100/80 backdrop-blur-md flex items-center px-3 border-b border-neutral-200/50 cursor-move select-none"
        onDoubleClick={(e) => {
          e.stopPropagation();
        }}
      >
        {/* Traffic Lights */}
        <div className="flex gap-2 mr-auto group">
          {/* Close */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="w-3 h-3 rounded-full bg-red-500 transition-colors relative"
            aria-label="Close"
          >
            <svg
              width="6"
              height="6"
              viewBox="0 0 6 6"
              className="absolute inset-0 m-auto opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <path
                d="M1 1L5 5M5 1L1 5"
                stroke="#4a0000"
                strokeWidth="1"
                strokeLinecap="round"
              />
            </svg>
          </button>

          {/* Minimize */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onMinimize();
            }}
            className="w-3 h-3 rounded-full bg-yellow-500 transition-colors relative"
            aria-label="Minimize"
          >
            <svg
              width="6"
              height="6"
              viewBox="0 0 6 6"
              className="absolute inset-0 m-auto opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <path
                d="M1 3H5"
                stroke="#4a3800"
                strokeWidth="1"
                strokeLinecap="round"
              />
            </svg>
          </button>

          {/* Maximize */}
          <button
            className="w-3 h-3 rounded-full bg-green-500 transition-colors relative"
            aria-label="Maximize"
            onClick={(e) => {
              e.stopPropagation();
              onMaximize();
            }}
          >
            <svg
              width="6"
              height="6"
              viewBox="0 0 6 6"
              className="absolute inset-0 m-auto opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <defs>
                <mask id="diagonalCut">
                  <rect width="6" height="6" fill="white" />
                  <line x1="0" y1="0" x2="6" y2="6" stroke="black" strokeWidth="0.8" />
                </mask>
              </defs>
              <rect
                x="1"
                y="1"
                width="4"
                height="4"
                rx="0.5"
                fill="#004a00"
                mask="url(#diagonalCut)"
              />
            </svg>
          </button>
        </div>

        {/* Window Title */}
        <div className="absolute left-1/2 -translate-x-1/2 text-sm font-medium text-neutral-700 truncate max-w-[60%]">
          {title}
        </div>
      </div>

      {/* Safari-style Toolbar (for browser windows) */}
      {type === 'browser' && url && (
        <div className="h-10 bg-white border-b border-neutral-200 flex items-center px-3 gap-3">
          {/* Previous/Next Buttons */}
          <div className="flex gap-1">
            <button
              className="w-6 h-6 rounded flex items-center justify-center hover:bg-neutral-100 transition-colors"
              disabled
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M7.5 2L3.5 6L7.5 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-400" />
              </svg>
            </button>
            <button
              className="w-6 h-6 rounded flex items-center justify-center hover:bg-neutral-100 transition-colors"
              disabled
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M4.5 2L8.5 6L4.5 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-400" />
              </svg>
            </button>
          </div>

          {/* Address Bar */}
          <div className="flex-1 bg-neutral-100 rounded-md px-3 py-1.5 text-xs text-neutral-600 truncate text-center">
            {url}
          </div>

          {/* Open in New Tab Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              window.open(url, '_blank', 'noopener,noreferrer');
            }}
            className="px-3 py-1 text-xs bg-neutral-100 hover:bg-neutral-200 rounded-md transition-colors whitespace-nowrap"
          >
            Open ↗
          </button>
        </div>
      )}

      {/* Window Content */}
      <div
        className="w-full bg-white"
        style={{
          height: type === 'browser' && url ? 'calc(100% - 4.5rem)' : 'calc(100% - 2rem)',
        }}
      >
        {type === 'browser' && url ? (
          iframeError ? (
            <div className="w-full h-full flex items-center justify-center bg-neutral-50 p-8 text-center">
              <div>
                <p className="text-neutral-600 mb-2">
                  This site cannot be embedded.
                </p>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Open in new tab →
                </a>
              </div>
            </div>
          ) : (
            <iframe
              src={url}
              className="w-full h-full border-0"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              title={title}
              onError={() => setIframeError(true)}
            />
          )
        ) : type === 'text' ? (
          <TextViewer />
        ) : (
          content
        )}
      </div>

      {/* Resize Handles - hidden when maximized */}
      {!isMaximized && (
        <>
          <div
            className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize"
            onMouseDown={(e) => handleResizeStart(e, 'se')}
          />
          <div
            className="absolute bottom-0 left-0 right-0 h-1 cursor-s-resize"
            onMouseDown={(e) => handleResizeStart(e, 's')}
          />
          <div
            className="absolute top-0 bottom-0 right-0 w-1 cursor-e-resize"
            onMouseDown={(e) => handleResizeStart(e, 'e')}
          />
        </>
      )}
    </motion.div>
  );
}
