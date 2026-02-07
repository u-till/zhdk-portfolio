'use client';

import { useIsMobile } from '@/hooks/use-is-mobile';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const THICKNESS = 15;

interface AlbumViewer3DProps {
  coverImage: string;
  spotifyEmbedUrl: string;
  isFlipped: boolean;
  onFlip: () => void;
}

export function AlbumViewer3D({ coverImage, spotifyEmbedUrl, isFlipped, onFlip }: AlbumViewer3DProps) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isFlipping, setIsFlipping] = useState(false);
  const [isPushing, setIsPushing] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    setIsFlipping(true);
    setTilt({ x: 0, y: 0 });
    const timeout = setTimeout(() => setIsFlipping(false), 800);
    return () => clearTimeout(timeout);
  }, [isFlipped]);

  const handleFlip = () => {
    onFlip();
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Don't apply tilt while flipping or pushing
      if (isFlipping || isPushing) return;

      const windowCenterX = window.innerWidth / 2;
      const windowCenterY = window.innerHeight / 2;

      // Calculate tilt based on mouse position relative to window center
      const tiltX = ((e.clientY - windowCenterY) / windowCenterY) * -15;
      const tiltY = ((e.clientX - windowCenterX) / windowCenterX) * 15;

      setTilt({ x: tiltX, y: tiltY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isFlipping, isPushing]);

  // Keyboard navigation - push CD left/right with spring animation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isFlipping || isPushing) return;

      const pushStrength = 25;
      const animationDuration = 500;

      if (e.key === 'ArrowLeft') {
        setIsPushing(true);
        // Push left
        setTilt((prev) => ({ ...prev, y: -pushStrength }));
        // Spring back to center
        setTimeout(() => {
          setTilt((prev) => ({ ...prev, y: 0 }));
          setTimeout(() => setIsPushing(false), animationDuration);
        }, 100);
      } else if (e.key === 'ArrowRight') {
        setIsPushing(true);
        // Push right
        setTilt((prev) => ({ ...prev, y: pushStrength }));
        // Spring back to center
        setTimeout(() => {
          setTilt((prev) => ({ ...prev, y: 0 }));
          setTimeout(() => setIsPushing(false), animationDuration);
        }, 100);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFlipping, isPushing]);

  return (
    <div className='w-full h-full flex items-center justify-center aspect-square'>
      <div style={{ perspective: '1000px' }}>
        <div
          className='relative w-[340px] h-75 lg:w-[520px] lg:h-[450px]'
          style={{
            transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y + (isFlipped ? 180 : 0)}deg)`,
            transformStyle: 'preserve-3d',
            transition: isFlipping
              ? 'transform 0.8s cubic-bezier(0.4, 0.0, 0.2, 1)'
              : isPushing
                ? 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
                : 'transform 0.1s ease-out',
          }}
        >
          {/* Front - CD Cover */}
          <div
            className={`absolute inset-0 backface-hidden bg-[#B4AFB8] shadow-2xl cursor-pointer ${
              !isFlipped ? 'pointer-events-auto' : 'pointer-events-none'
            }`}
            onClick={handleFlip}
            style={{ transform: `translateZ(${THICKNESS / 2}px)` }}
          >
            <Image src={coverImage} alt='Album Cover' fill className='object-cover pointer-events-none' />
          </div>

          {/* Back - Spotify Player */}
          <div
            className={`absolute inset-0 backface-hidden overflow-hidden shadow-2xl ${
              isFlipped ? 'pointer-events-auto' : 'pointer-events-none'
            }`}
            style={{ transform: `translateZ(-${THICKNESS / 2}px) rotateY(180deg)` }}
          >
            {/* Background Image */}
            <Image
              src='/lost-in-space/backside.jpg'
              alt='Album Backside'
              fill
              className='object-cover pointer-events-none'
            />

            {/* Loading text - sits behind the player */}
            <p className='absolute inset-0 flex items-center justify-center text-white/60 text-sm'>
              Player is loading...
            </p>

            {/* Spotify Player Overlay */}
            <div className='absolute inset-0 pt-3 p-4'>
              <button
                onClick={handleFlip}
                className='cursor-pointer absolute rotate-90 origin-bottom top-8 md:top-14 -right-3 md:right-0 z-10 bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded text-sm'
              >
                Flip Back
              </button>
              <iframe
                data-testid='embed-iframe'
                src={spotifyEmbedUrl}
                width={isMobile ? '92%' : '92%'}
                height={isMobile ? '134%' : '101%'}
                style={{ border: 0 }}
                allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'
                loading='lazy'
              ></iframe>
            </div>
          </div>

          {/* Top Edge */}
          <div
            className='absolute w-full bg-[#B4AFB8]'
            style={{
              height: `${THICKNESS}px`,
              top: `${-THICKNESS}px`,
              left: 0,
              transform: `rotateX(90deg) translateY(8px)`,
              transformOrigin: 'center bottom',
            }}
          />

          {/* Bottom Edge */}
          <div
            className='absolute w-full bg-[#B4AFB8]'
            style={{
              height: `${THICKNESS}px`,
              bottom: `${-THICKNESS}px`,
              left: 0,
              transform: `rotateX(-90deg) translateY(-8px)`,
              transformOrigin: 'center top',
            }}
          />

          {/* Left Edge */}
          <div
            className='absolute h-full bg-[#B4AFB8]'
            style={{
              width: `${THICKNESS}px`,
              left: `${-THICKNESS}px`,
              top: 0,
              transform: `rotateY(-90deg) translateX(8px)`,
              transformOrigin: 'right center',
            }}
          />

          {/* Right Edge */}
          <div
            className='absolute h-full bg-[#B4AFB8]'
            style={{
              width: `${THICKNESS}px`,
              right: `${-THICKNESS}px`,
              top: 0,
              transform: `rotateY(90deg) translateX(-8px)`,
              transformOrigin: 'left center',
            }}
          />
        </div>
      </div>
    </div>
  );
}
