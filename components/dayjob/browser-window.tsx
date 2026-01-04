'use client';

import { WindowProps } from '@/types/macos';
import { ANIMATIONS } from '@/constants/macos';
import { useWindowResize } from '@/hooks/use-window-resize';
import { motion } from 'framer-motion';
import React, { useRef, useState } from 'react';
import { TrafficLights } from './traffic-lights';

export const BrowserWindow = React.memo(function BrowserWindow({
  title,
  url,
  position,
  size,
  zIndex,
  isMaximized,
  onClose,
  onFocus,
  onMaximize,
  onResize,
}: Omit<WindowProps, 'id' | 'type' | 'content' | 'onMinimize'>) {
  const [iframeError, setIframeError] = useState(false);
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
      {/* Browser Window - Single Row Header */}
      <div className='bg-[#ECECED] backdrop-blur-md flex items-center justify-between px-4 py-3 border-b border-[neutral-200/50]'>
        {/* Left: Traffic Lights + Nav Buttons */}
        <div className='flex items-center gap-4'>
          {/* Traffic Lights */}
          <TrafficLights onClose={onClose} onMaximize={onMaximize} maskId='diagonalCut-browser' />

          {/* Previous/Next Buttons */}
          <div className='flex gap-1'>
            <button
              className='w-7 h-7 rounded flex items-center justify-center hover:bg-neutral-200/50 transition-colors'
              disabled
            >
              <svg width='14' height='14' viewBox='0 0 12 12' fill='none'>
                <path
                  d='M7.5 2L3.5 6L7.5 10'
                  stroke='currentColor'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='text-neutral-400'
                />
              </svg>
            </button>
            <button
              className='w-7 h-7 rounded flex items-center justify-center hover:bg-neutral-200/50 transition-colors'
              disabled
            >
              <svg width='14' height='14' viewBox='0 0 12 12' fill='none'>
                <path
                  d='M4.5 2L8.5 6L4.5 10'
                  stroke='currentColor'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='text-neutral-400'
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Center: Address Bar */}
        <div className='flex-1 max-w-[50%] bg-[#ECECED] rounded-md px-2 py-1 text-[12px] text-neutral-700 truncate text-center border border-[#D4D5D6]'>
          {url?.replace(/^https?:\/\//, '')}
        </div>

        {/* Right: Open Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (url) window.open(url, '_blank', 'noopener,noreferrer');
          }}
          className='cursor-pointer px-2 py-1.5 text-[12px] bg-[#027BFF] hover:bg-[#026fe6] text-white rounded-md transition-colors whitespace-nowrap font-medium'
        >
          Open ↗
        </button>
      </div>

      {/* Window Content */}
      <div className='w-full bg-white' style={{ height: 'calc(100% - 53px)' }}>
        {iframeError ? (
          <div className='w-full h-full flex items-center justify-center bg-neutral-50 p-8 text-center'>
            <div>
              <p className='text-neutral-600 mb-2'>This site cannot be embedded.</p>
              <a href={url} target='_blank' rel='noopener noreferrer' className='text-blue-600 hover:underline'>
                Open in new tab →
              </a>
            </div>
          </div>
        ) : (
          <iframe
            src={url}
            className='w-full h-full border-0'
            sandbox='allow-scripts allow-same-origin allow-forms allow-popups'
            title={title}
            onError={() => setIframeError(true)}
          />
        )}
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
