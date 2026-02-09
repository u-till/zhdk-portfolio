'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

interface LightboxProps {
  src: string | null;
  overlaySrc?: string;
  title?: string;
  onClose: () => void;
}

export function Lightbox({ src, overlaySrc, title, onClose }: LightboxProps) {
  const [showOverlay, setShowOverlay] = useState(false);

  const handleClose = () => {
    setShowOverlay(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {src && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className='fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-8 overscroll-contain'
          onClick={handleClose}
          onKeyDown={(e) => e.key === 'Escape' && handleClose()}
          tabIndex={0}
          autoFocus
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className='relative group'
            onClick={(e) => {
              e.stopPropagation();
              if (overlaySrc && !window.matchMedia('(pointer: fine)').matches) setShowOverlay((prev) => !prev);
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt={title || 'Image'} className='max-h-[calc(100vh-4rem)] max-w-[calc(100vw-4rem)] object-contain' />

            {overlaySrc && (
              <div className={`absolute inset-0 transition-opacity duration-300 pointer-events-none ${showOverlay ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={overlaySrc} alt='Artwork overlay' className='w-full h-full object-contain' />
              </div>
            )}
          </motion.div>

          <button
            onClick={handleClose}
            className='absolute top-4 right-4 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer'
            aria-label='Close'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='white'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path d='M18 6L6 18M6 6l12 12' />
            </svg>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
