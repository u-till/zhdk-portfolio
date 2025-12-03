'use client';

import Image from 'next/image';
import { useState } from 'react';

const THICKNESS = 15;

interface AlbumViewer3DProps {
  coverImage: string;
  spotifyEmbedUrl: string;
}

export function AlbumViewer3D({ coverImage, spotifyEmbedUrl }: AlbumViewer3DProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const tiltX = ((y - centerY) / centerY) * -15;
    const tiltY = ((x - centerX) / centerX) * 15;

    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      className='w-full h-full flex items-center justify-center aspect-square'
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div style={{ perspective: '1000px' }}>
        <div
          className='relative w-[420px] h-96 lg:w-[570px] lg:h-[500px]'
          style={{
            transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y + (isFlipped ? 180 : 0)}deg)`,
            transformStyle: 'preserve-3d',
            transition: isFlipped ? 'transform 1s' : 'transform 1s',
          }}
        >
          {/* Front - CD Cover */}
          <div
            className={`absolute inset-0 backface-hidden shadow-2xl cursor-pointer ${
              !isFlipped ? 'pointer-events-auto' : 'pointer-events-none'
            }`}
            onClick={() => setIsFlipped(true)}
            style={{ transform: `translateZ(${THICKNESS / 2}px)` }}
          >
            <Image src={coverImage} alt='Album Cover' fill className='object-cover pointer-events-none' />
          </div>

          {/* Back - Spotify Player */}
          <div
            className={`absolute inset-0 backface-hidden shadow-2xl bg-black p-4 ${
              isFlipped ? 'pointer-events-auto' : 'pointer-events-none'
            }`}
            style={{ transform: `translateZ(-${THICKNESS / 2}px) rotateY(180deg)` }}
          >
            <button
              onClick={() => setIsFlipped(false)}
              className='absolute top-2 right-2 z-10 bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded text-sm'
            >
              Flip Back
            </button>
            <iframe
              data-testid='embed-iframe'
              src={spotifyEmbedUrl}
              width='100%'
              height='100%'
              frameBorder='0'
              allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'
              loading='lazy'
            ></iframe>
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
