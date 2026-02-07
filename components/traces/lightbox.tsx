'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

interface LightboxProps {
  src: string | null;
  overlaySrc?: string;
  title?: string;
  onClose: () => void;
}

export function Lightbox({ src, overlaySrc, title, onClose }: LightboxProps) {
  const [size, setSize] = useState<{ width: number; height: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!src) {
      setSize(null);
      return;
    }

    const img = new window.Image();
    img.src = src;
    img.onload = () => {
      const maxW = window.innerWidth * 0.9;
      const maxH = window.innerHeight * 0.9;
      const scale = Math.min(maxW / img.naturalWidth, maxH / img.naturalHeight, 1);
      setSize({ width: img.naturalWidth * scale, height: img.naturalHeight * scale });
    };
  }, [src]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (src) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [src, onClose]);

  return (
    <AnimatePresence>
      {src && size && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            ref={containerRef}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="relative group"
            style={{ width: size.width, height: size.height }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={src}
              alt={title || 'Image'}
              fill
              className="object-contain"
              sizes="90vw"
            />

            {overlaySrc && (
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <Image
                  src={overlaySrc}
                  alt="Artwork overlay"
                  fill
                  className="object-contain"
                  sizes="90vw"
                />
              </div>
            )}
          </motion.div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
