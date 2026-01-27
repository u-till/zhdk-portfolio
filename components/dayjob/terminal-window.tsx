'use client';

import { ANIMATIONS } from '@/constants/macos';
import { useWindowResize } from '@/hooks/use-window-resize';
import { WindowProps } from '@/types/macos';
import { motion } from 'framer-motion';
import React, { useRef } from 'react';
import { TrafficLights } from './traffic-lights';

export const TerminalWindow = React.memo(function TerminalWindow({
  title,
  position,
  size,
  zIndex,
  isMaximized,
  onClose,
  onFocus,
  onMaximize,
  onResize,
}: Omit<WindowProps, 'id' | 'type' | 'url' | 'content'>) {
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
      {/* Terminal Window - Title Bar */}
      <div
        className='h-8 bg-[#2D2D2D] backdrop-blur-md flex items-center px-3 border-b border-black/30 cursor-move select-none'
        onDoubleClick={(e) => {
          e.stopPropagation();
        }}
      >
        {/* Traffic Lights */}
        <div className='mr-auto'>
          <TrafficLights onClose={onClose} onMaximize={onMaximize} maskId='diagonalCut-terminal' />
        </div>

        {/* Window Title */}
        <div className='absolute left-1/2 -translate-x-1/2 text-sm font-medium text-gray-400 truncate max-w-[60%]'>
          {title}
        </div>
      </div>

      {/* Terminal Content */}
      <div
        className='w-full bg-[#1e1e1ee1] text-[#00FF00] backdrop-blur-md font-mono text-sm p-4 overflow-auto'
        style={{ height: 'calc(100% - 2rem)' }}
      >
        <div className='space-y-4'>
          <div>Last login: {new Date().toLocaleString()}</div>

          {/* MOTD */}
          <div className='text-gray-400 border-l-2 border-gray-600 pl-3 py-1'>
            <p className='mb-2'>
              My approach to web development is driven by open source software. I primarily build with{' '}
              <span className='text-[#00AAFF]'>Next.js</span> for projects that are more complex, require animations or
              3d integrations. For smaller projects, i use <span className='text-[#00AAFF]'>WordPress</span> because it
              has a big community which guarantees long-term support and easy maintenance for my clients.
            </p>
          </div>

          <div className='flex items-center gap-2'>
            <span className='text-[#00AAFF]'>user@portfolio</span>
            <span className='text-white'>~</span>
            <span className='text-white'>$</span>
            <span className='animate-pulse'>_</span>
          </div>
        </div>
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
