'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

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
  width = 600,
  height = 600,
}: Viewer360Props) {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<NodeJS.Timeout | null>(null);

  const getImagePath = (frameIndex: number) => {
    const frameNumber = imagePadding > 0 ? String(frameIndex + 1).padStart(imagePadding, '0') : String(frameIndex + 1);
    return `/${imageFolder}/${imagePrefix}${frameNumber}.${imageFormat}`;
  };

  const animateRotation = (direction: number) => {
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
  };

  const rotateLeft = () => {
    animateRotation(-1);
  };

  const rotateRight = () => {
    animateRotation(1);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;

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

  useEffect(() => {
    const handleMouseUpGlobal = () => setIsDragging(false);

    if (isDragging) {
      document.addEventListener('mouseup', handleMouseUpGlobal);
      return () => document.removeEventListener('mouseup', handleMouseUpGlobal);
    }
  }, [isDragging]);

  // Preload all images
  useEffect(() => {
    for (let i = 0; i < totalFrames; i++) {
      const img = new window.Image();
      img.src = getImagePath(i);
    }
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

  return (
    <div className='flex flex-col items-center gap-4'>
      <motion.div
        ref={containerRef}
        className='relative overflow-hidden cursor-grab active:cursor-grabbing select-none border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] w-full lg:w-auto aspect-square'
        style={{ width, height }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
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
        <div className='absolute inset-0 flex items-center justify-center z-10 p-8'>
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
      </motion.div>
    </div>
  );
}
