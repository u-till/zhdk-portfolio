'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface ImageGalleryProps {
  images: string[];
  width?: number;
  height?: number;
  variant?: 'minimal' | 'retro' | 'pill';
}

export function ImageGallery({ images, width = 500, height = 500, variant = 'minimal' }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const styles = {
    minimal: {
      container: 'border border-black/60 bg-background/90 backdrop-blur-md',
      containerFullscreen: 'bg-background/95 backdrop-blur-md',
      button: 'border border-black/60 bg-background/90 backdrop-blur-md hover:bg-foreground/5',
      thumbnail: 'border-black/60',
      thumbnailActive: 'border-2 border-black',
      backdrop: 'bg-background/95 backdrop-blur-md',
    },
    retro: {
      container: 'rounded-[32px] border border-none bg-none backdrop-blur-md',
      containerFullscreen: 'border border-orange-300/40 bg-orange-500/80 backdrop-blur-md shadow-lg',
      button: 'rounded-full border border-orange-300/40 bg-orange-500/80 backdrop-blur-md hover:bg-orange-600/80',
      thumbnail: 'border-orange-300/40 rounded-lg',
      thumbnailActive: 'border-2 border-orange-300 rounded-lg',
      backdrop: 'bg-orange-400 backdrop-blur-md',
    },
    pill: {
      container: 'bg-transparent',
      containerFullscreen: 'bg-background/95 backdrop-blur-md',
      button: 'rounded-full bg-green-500 text-white hover:bg-green-600 border-0',
      thumbnail: 'border border-green-500/40 rounded-lg',
      thumbnailActive: 'border-2 border-green-500 rounded-lg',
      backdrop: 'bg-background/95 backdrop-blur-md',
    },
  };

  const currentStyle = styles[variant];

  // Keyboard navigation - works always, not just in fullscreen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setSelectedImage((prev) => (prev > 0 ? prev - 1 : images.length - 1));
      } else if (e.key === 'ArrowRight') {
        setSelectedImage((prev) => (prev < images.length - 1 ? prev + 1 : 0));
      } else if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [images.length, isFullscreen]);

  return (
    <>
      {/* Normal Gallery View */}
      <motion.div
        layout
        className={`overflow-hidden relative aspect-square h-full ${currentStyle.container}`}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
      >
        {/* Expand Button */}
        <button
          onClick={() => setIsFullscreen(true)}
          className={`absolute cursor-pointer top-4 right-4 w-10 h-10 transition-colors z-10 flex items-center justify-center ${currentStyle.button}`}
          aria-label='Fullscreen'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='20'
            height='20'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <path d='M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3' />
          </svg>
        </button>

        {/* Main Image */}
        <div className='relative w-full h-full'>
          <Image
            key={selectedImage}
            src={images[selectedImage]}
            alt={`Gallery image ${selectedImage + 1}`}
            fill
            className='object-contain transition-all'
            priority={selectedImage === 0}
          />
        </div>

        {/* Thumbnail Strip */}
        <div className='absolute bottom-4 left-4 right-4 flex gap-2 justify-start overflow-x-auto scrollbar-hide'>
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`relative cursor-pointer overflow-hidden transition-all flex-shrink-0 w-16 h-16 ${
                selectedImage === index
                  ? `${currentStyle.thumbnailActive} opacity-100`
                  : `border ${currentStyle.thumbnail} opacity-60 hover:opacity-100`
              }`}
            >
              <Image src={image} alt={`Thumbnail ${index + 1}`} fill className='object-cover' />
            </button>
          ))}
        </div>
      </motion.div>

      {/* Fullscreen View - Rendered via Portal */}
      {typeof window !== 'undefined' && isFullscreen && createPortal(
        <AnimatePresence mode="wait">
          <motion.div
            key="fullscreen-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60]"
          >
            {/* Backdrop */}
            <div
              className={`fixed inset-0 ${currentStyle.backdrop}`}
              onClick={() => setIsFullscreen(false)}
            />

            {/* Fullscreen Gallery */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className={`fixed inset-0 w-full h-full overflow-hidden ${currentStyle.containerFullscreen} flex flex-col`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setIsFullscreen(false)}
                className={`absolute cursor-pointer top-4 right-4 w-10 h-10 transition-colors z-10 flex items-center justify-center ${currentStyle.button}`}
                aria-label='Close fullscreen'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='20'
                  height='20'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <line x1='18' y1='6' x2='6' y2='18'></line>
                  <line x1='6' y1='6' x2='18' y2='18'></line>
                </svg>
              </button>

              {/* Main Image */}
              <div className='relative flex-1 w-full'>
                <Image
                  key={selectedImage}
                  src={images[selectedImage]}
                  alt={`Gallery image ${selectedImage + 1}`}
                  fill
                  className='object-contain'
                  priority={selectedImage === 0}
                />
              </div>

              {/* Thumbnail Strip */}
              <div className='p-4 flex gap-2 justify-start overflow-x-auto scrollbar-hide'>
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative cursor-pointer overflow-hidden transition-all flex-shrink-0 w-20 h-20 ${
                      selectedImage === index
                        ? `${currentStyle.thumbnailActive} opacity-100`
                        : `border ${currentStyle.thumbnail} opacity-60 hover:opacity-100`
                    }`}
                  >
                    <Image src={image} alt={`Thumbnail ${index + 1}`} fill className='object-cover' />
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
