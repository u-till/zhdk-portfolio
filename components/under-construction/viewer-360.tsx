'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';

interface Viewer360Props {
  imageFolder: string;
  totalFrames: number;
  imageFormat?: string; // e.g., 'jpg', 'png'
  imagePrefix?: string; // e.g., 'frame-' or empty for just numbers
  imagePadding?: number; // e.g., 3 for '001', '002'
  backgroundImage?: string; // Background image path
  width?: number;
  height?: number;
}

export function Viewer360({
  imageFolder,
  totalFrames,
  imageFormat = 'jpg',
  imagePrefix = '',
  imagePadding = 0,
  backgroundImage = '/under-construction/korpus-360/uc-360-bg.jpg',
}: Viewer360Props) {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<NodeJS.Timeout | null>(null);

  const getImagePath = useCallback(
    (frameIndex: number) => {
      const frameNumber =
        imagePadding > 0 ? String(frameIndex + 1).padStart(imagePadding, '0') : String(frameIndex + 1);
      return `/${imageFolder}/${imagePrefix}${frameNumber}.${imageFormat}`;
    },
    [imageFolder, imagePrefix, imagePadding, imageFormat],
  );

  const animateRotation = useCallback(
    (direction: number) => {
      if (isAnimating) return;

      setIsAnimating(true);
      const framesToMove = 4;
      let step = 0;

      if (animationRef.current) {
        clearInterval(animationRef.current);
      }

      animationRef.current = setInterval(() => {
        if (step < framesToMove) {
          setCurrentFrame((prev) => (prev + direction + totalFrames) % totalFrames);
          step++;
        } else {
          if (animationRef.current) {
            clearInterval(animationRef.current);
          }
          setIsAnimating(false);
        }
      }, 30);
    },
    [isAnimating, totalFrames],
  );

  const rotateLeft = useCallback(() => {
    animateRotation(-1);
  }, [animateRotation]);

  const rotateRight = useCallback(() => {
    animateRotation(1);
  }, [animateRotation]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isLoading) return;
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    // Track mouse position relative to container
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }

    if (!isDragging || isLoading) return;

    const deltaX = e.clientX - startX;
    const sensitivity = 5; // pixels per frame

    if (Math.abs(deltaX) >= sensitivity) {
      if (deltaX > 0) {
        rotateRight();
      } else {
        rotateLeft();
      }
      setStartX(e.clientX);
    }
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (isLoading) return;
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || isLoading) return;

    const deltaX = e.touches[0].clientX - startX;
    const sensitivity = 5; // pixels per frame

    if (Math.abs(deltaX) >= sensitivity) {
      if (deltaX > 0) {
        rotateRight();
      } else {
        rotateLeft();
      }
      setStartX(e.touches[0].clientX);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const handleMouseUpGlobal = () => setIsDragging(false);

    if (isDragging) {
      document.addEventListener('mouseup', handleMouseUpGlobal);
      return () => document.removeEventListener('mouseup', handleMouseUpGlobal);
    }
  }, [isDragging]);

  // Preload all images
  useEffect(() => {
    setIsLoading(true);

    const loadImages = async () => {
      const imagePromises = [];

      for (let i = 0; i < totalFrames; i++) {
        const promise = new Promise((resolve, reject) => {
          const img = new window.Image();
          img.onload = () => resolve(img);
          img.onerror = reject;
          img.src = getImagePath(i);
        });
        imagePromises.push(promise);
      }

      try {
        await Promise.all(imagePromises);
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading 360 images:', error);
        setIsLoading(false);
      }
    };

    loadImages();
  }, [totalFrames, imageFolder, getImagePath]);

  // Cleanup animation on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        clearInterval(animationRef.current);
      }
    };
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isLoading) return;

      if (e.key === 'ArrowLeft') {
        rotateLeft();
      } else if (e.key === 'ArrowRight') {
        rotateRight();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [rotateLeft, rotateRight, isLoading]);

  return (
    <div
      ref={containerRef}
      className='overflow-hidden cursor-none select-none w-full h-full relative'
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background image */}
      <Image
        src={backgroundImage}
        alt='360 viewer background'
        fill
        className='object-cover pointer-events-none'
        priority
      />

      {/* 360 rotating image */}
      <div className='absolute inset-0 flex items-center justify-center z-10 pt-24 pb-32 md:pt-28 md:pb-36'>
        <div className='relative w-full h-full'>
          <Image
            src={getImagePath(currentFrame)}
            alt={`360 view frame ${currentFrame + 1}`}
            fill
            className='object-contain pointer-events-none'
            priority={currentFrame === 0}
            draggable={false}
          />
        </div>
      </div>

      {/* Loading overlay */}
      {isLoading && (
        <div className='absolute inset-0 bg-black/50 flex items-center justify-center z-20'>
          <div className='text-white font-bold text-lg animate-pulse'>Loading...</div>
        </div>
      )}

      {/* Rotate hint - follows cursor */}
      {!isLoading && isHovering && (
        <div
          className='absolute z-30 hidden md:flex items-center justify-center bg-black/80 p-2 rounded-full pointer-events-none transition-opacity -translate-x-1/2 -translate-y-1/2'
          style={{
            left: mousePos.x,
            top: mousePos.y,
          }}
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
            className='text-white'
          >
            <path d='M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8' />
            <path d='M3 3v5h5' />
          </svg>
        </div>
      )}
    </div>
  );
}
