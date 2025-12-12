'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';

interface Viewer360Props {
  imageFolder: string;
  totalFrames: number;
  imageFormat?: string; // e.g., 'jpg', 'png'
  imagePrefix?: string; // e.g., 'frame-' or empty for just numbers
  imagePadding?: number; // e.g., 3 for '001', '002'
  width?: number;
  height?: number;
}

export function Viewer360({
  imageFolder,
  totalFrames,
  imageFormat = 'jpg',
  imagePrefix = '',
  imagePadding = 0,
}: Viewer360Props) {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<NodeJS.Timeout | null>(null);

  const getImagePath = (frameIndex: number) => {
    const frameNumber = imagePadding > 0 ? String(frameIndex + 1).padStart(imagePadding, '0') : String(frameIndex + 1);
    return `/${imageFolder}/${imagePrefix}${frameNumber}.${imageFormat}`;
  };

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
    [isAnimating, totalFrames]
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalFrames, imageFolder]);

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
      className='overflow-hidden cursor-grab active:cursor-grabbing select-none border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] h-full relative aspect-square'
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background image */}
      <Image
        src='/under-construction/korpus-360/uc-360-bg.jpg'
        alt='360 viewer background'
        fill
        className='object-cover pointer-events-none'
        priority
      />

      {/* 360 rotating image */}
      <div className='absolute inset-0 flex items-center justify-center z-10 p-0'>
        <div className='relative w-full h-full'>
          <Image
            src={getImagePath(currentFrame)}
            alt={`360 view frame ${currentFrame + 1}`}
            fill
            className='object-cover pointer-events-none'
            priority={currentFrame === 0}
            draggable={false}
          />
        </div>
      </div>

      {/* Loading overlay */}
      {isLoading && (
        <div className='absolute inset-0 bg-white/80 flex items-center justify-center z-20'>
          <div className='text-black font-bold text-lg animate-pulse'>Loading...</div>
        </div>
      )}
    </div>
  );
}
