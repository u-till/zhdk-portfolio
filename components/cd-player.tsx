'use client';

import Image from 'next/image';
import { useState } from 'react';

const THICKNESS = 15;

export function CDPlayer() {
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
    <div className='w-screen h-screen flex overflow-hidden' onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      {/* Left Column - CD */}
      <div className='flex-1 flex items-center justify-center'>
        <div className='perspective-1000 mt-48'>
          <div
            className='relative w-92 h-92 transform-style-3d'
            style={{
              transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y + (isFlipped ? 180 : 0)}deg)`,
              transformStyle: 'preserve-3d',
              transition: isFlipped ? 'transform 0.7s' : 'transform 0.1s',
            }}
          >
            {/* Top Edge */}
            <div
              className='absolute w-full bg-[#B4AFB8]'
              style={{
                height: `${THICKNESS}px`,
                top: 0,
                transform: `rotateX(-90deg)`,
                transformOrigin: 'top',
              }}
            />

            {/* Bottom Edge */}
            <div
              className='absolute w-full bg-[#B4AFB8]'
              style={{
                height: `${THICKNESS}px`,
                bottom: 0,
                transform: `rotateX(90deg)`,
                transformOrigin: 'bottom',
              }}
            />

            {/* Left Edge */}
            <div
              className='absolute h-full bg-[#B4AFB8]'
              style={{
                width: `${THICKNESS}px`,
                left: 0,
                transform: `rotateY(-90deg)`,
                transformOrigin: 'left',
              }}
            />

            {/* Right Edge */}
            <div
              className='absolute h-full bg-[#B4AFB8]'
              style={{
                width: `${THICKNESS}px`,
                right: 0,
                transform: `rotateY(90deg)`,
                transformOrigin: 'right',
              }}
            />

            {/* Front - CD Cover */}
            <div
              className={`absolute inset-0 backface-hidden shadow-2xl cursor-pointer ${
                !isFlipped ? 'pointer-events-auto' : 'pointer-events-none'
              }`}
              onClick={() => setIsFlipped(true)}
              style={{ transform: `translateZ(${THICKNESS / 2}px)` }}
            >
              <Image
                src='/lost-in-space/lost-in-space-cd-cover.jpeg'
                alt='CD Cover'
                fill
                className='object-cover pointer-events-none'
              />
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
                src='https://open.spotify.com/embed/playlist/6NncGaE8c3pdJkJPfM6Jcc?utm_source=generator&theme=0'
                width='100%'
                height='352'
                frameBorder='0'
                allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'
                loading='lazy'
              ></iframe>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Panel */}
      <div className='flex-1 flex items-center justify-center text-white'>
        <div className='max-w-md'>
          <h3 className='text-2xl font-bold mb-4'>Track List</h3>
          <p className='text-gray-400'>Panel content here</p>
        </div>
      </div>
    </div>
  );
}
