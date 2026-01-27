'use client';

import { WindowProps } from '@/types/macos';
import { ANIMATIONS } from '@/constants/macos';
import { useWindowResize } from '@/hooks/use-window-resize';
import { motion } from 'framer-motion';
import React, { useRef } from 'react';
import { TextViewer } from './text-viewer';
import { TrafficLights } from './traffic-lights';

export const TextWindow = React.memo(function TextWindow({
  title,
  position,
  size,
  zIndex,
  isMaximized,
  onClose,
  onFocus,
  onMaximize,
  onResize,
  content,
}: Omit<WindowProps, 'id' | 'type' | 'url'>) {
  const windowRef = useRef<HTMLDivElement>(null);
  const { isResizing, handleResizeStart } = useWindowResize(size, onResize);

  return (
    <motion.div
      ref={windowRef}
      drag={!isResizing && !isMaximized}
      dragMomentum={false}
      dragElastic={0}
      initial={{ scale: 0.3, opacity: 0 }}
      animate={{
        scale: 1,
        opacity: 1,
        x: isMaximized ? 0 : undefined,
        y: isMaximized ? 0 : undefined,
      }}
      exit={{ scale: 0.3, opacity: 0 }}
      transition={ANIMATIONS.WINDOW}
      style={{
        position: isMaximized ? 'absolute' : 'fixed',
        left: isMaximized ? 0 : position.x,
        top: isMaximized ? 0 : position.y,
        width: isMaximized ? '100%' : size.width,
        height: isMaximized ? '100%' : size.height,
        zIndex,
      }}
      onMouseDown={onFocus}
      className='rounded-lg shadow-2xl overflow-hidden border border-[#85858559]'
    >
      {/* Text Window - Traditional Title Bar */}
      <div
        className='h-8 bg-neutral-100/80 backdrop-blur-md flex items-center px-3 border-b border-neutral-200/50 cursor-move select-none'
        onDoubleClick={(e) => {
          e.stopPropagation();
        }}
      >
        {/* Traffic Lights */}
        <div className='mr-auto'>
          <TrafficLights onClose={onClose} onMaximize={onMaximize} maskId='diagonalCut-text' />
        </div>

        {/* Window Title */}
        <div className='absolute left-1/2 -translate-x-1/2 text-sm font-medium text-neutral-700 truncate max-w-[60%]'>
          {title}
        </div>
      </div>

      {/* Window Content */}
      <div className='w-full bg-white' style={{ height: 'calc(100% - 2rem)' }}>
        {content || <TextViewer />}
      </div>

      {/* Resize Handles - hidden when maximized */}
      {!isMaximized && (
        <>
          <div
            className='absolute bottom-0 right-0 w-4 h-4 cursor-se-resize'
            onMouseDown={(e) => handleResizeStart(e, 'se')}
          />
          <div
            className='absolute bottom-0 left-0 right-0 h-1 cursor-s-resize'
            onMouseDown={(e) => handleResizeStart(e, 's')}
          />
          <div
            className='absolute top-0 bottom-0 right-0 w-1 cursor-e-resize'
            onMouseDown={(e) => handleResizeStart(e, 'e')}
          />
        </>
      )}
    </motion.div>
  );
});
