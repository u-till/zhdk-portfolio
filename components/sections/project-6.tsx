'use client';

import { Globe } from '@/components/globe';
import { courierPrime } from '@/lib/fonts';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const PHOTOS = [
  { src: '/saudade/Untitled-001.jpg', lat: 40.7128, lng: -74.006 }, // NYC - update with real coords
  { src: '/saudade/Untitled-009.jpg', lat: 51.5074, lng: -0.1278 }, // London - update with real coords
  { src: '/saudade/Untitled-010.jpg', lat: 35.6762, lng: 139.6503 }, // Tokyo - update with real coords
];

export function Project6() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const scrollLeft = scrollRef.current.scrollLeft;
        const width = scrollRef.current.offsetWidth;
        const index = Math.round(scrollLeft / width);
        setActiveIndex(index);
      }
    };

    const scrollEl = scrollRef.current;
    scrollEl?.addEventListener('scroll', handleScroll);
    return () => scrollEl?.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id='project-6' className='h-screen snap-start overflow-hidden relative'>
      {/* Fixed Title and Globe Overlay */}
      <div className='absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 gap-8'>
        <div className='flex flex-col items-center gap-8 p-8 rounded-xl border-1 border border-white/10 bg-neutral-500/10 backdrop-blur-md'>
          <h2 className={`text-6xl font-bold text-white mix-blend-difference ${courierPrime.className}`}>saudade</h2>
          <Globe activeLocation={{ lat: PHOTOS[activeIndex].lat, lng: PHOTOS[activeIndex].lng }} />
        </div>
      </div>

      {/* Scrolling Photos */}
      <div
        ref={scrollRef}
        className='h-full overflow-x-auto overflow-y-hidden snap-x snap-mandatory flex scrollbar-hide'
      >
        {PHOTOS.map((photo, index) => (
          <div key={photo.src} className='h-full min-w-full snap-center flex items-center justify-center relative'>
            <Image
              src={photo.src}
              alt={`Saudade ${index + 1}`}
              fill
              className='object-cover'
              priority={index === 0}
              sizes='100vw'
            />
          </div>
        ))}
      </div>
    </section>
  );
}
