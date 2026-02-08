'use client';

import { AnimatePresence, motion } from 'framer-motion';

interface LightboxProps {
  src: string | null;
  overlaySrc?: string;
  title?: string;
  onClose: () => void;
}

export function Lightbox({ src, overlaySrc, title, onClose }: LightboxProps) {
  return (
    <AnimatePresence>
      {src && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className='fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-8 overscroll-contain'
          onClick={onClose}
          onKeyDown={(e) => e.key === 'Escape' && onClose()}
          tabIndex={0}
          autoFocus
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className='relative group'
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt={title || 'Image'} className='max-h-[calc(100vh-4rem)] max-w-[calc(100vw-4rem)] object-contain' />

            {overlaySrc && (
              <div className='absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none'>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={overlaySrc} alt='Artwork overlay' className='w-full h-full object-contain' />
              </div>
            )}
          </motion.div>

          <button
            onClick={onClose}
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
