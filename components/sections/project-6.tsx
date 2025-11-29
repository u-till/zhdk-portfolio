'use client';

import { Globe } from '@/components/globe';
import { courierPrime } from '@/lib/fonts';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const PHOTOS = [
  { src: '/saudade/addis.jpg', lat: 40.7128, lng: -74.006 },
  { src: '/saudade/hongkong-1.jpg', lat: 51.5074, lng: -0.1278 },
  { src: '/saudade/hongkong-2.jpg', lat: 35.6762, lng: 139.6503 },
  { src: '/saudade/hongkong-3.jpg', lat: 35.6762, lng: 139.6503 },
  { src: '/saudade/kuala-lumpur.jpg', lat: 35.6762, lng: 139.6503 },
  { src: '/saudade/kunming.jpg', lat: 25.6762, lng: 129.6503 },
  { src: '/saudade/phnompenh.jpg', lat: 45.6762, lng: 119.6503 },
  { src: '/saudade/stolze-1.jpg', lat: 15.6762, lng: 149.6503 },
];

export function Project6() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedPanel, setExpandedPanel] = useState<'globe' | 'olympus' | null>(null);
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
    <section className='h-screen relative overflow-hidden'>
      {/* Title */}
      <div className='absolute inset-x-0 top-0 pt-32 md:pt-42 flex justify-center pointer-events-none z-10'>
        <h2 className={`text-5xl lg:text-7xl font-bold text-white mix-blend-difference ${courierPrime.className}`}>saudade</h2>
      </div>

      {/* Scrolling Photos */}
      <div
        ref={scrollRef}
        className='absolute inset-0 overflow-x-auto overflow-y-hidden snap-x snap-mandatory flex scrollbar-hide'
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

      {/* Globe Panel - Bottom Right */}
      <div
        className={`absolute right-8 bottom-8 rounded-xl border border-white/20 bg-black/40 backdrop-blur-md z-20 transition-all duration-500 ${
          expandedPanel === 'globe' ? 'w-96 h-96' : 'w-48 h-48'
        }`}
      >
        <button
          onClick={() => setExpandedPanel(expandedPanel === 'globe' ? null : 'globe')}
          className='absolute top-2 left-2 w-8 h-8 rounded-lg border border-white/20 bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors'
        >
          {expandedPanel === 'globe' ? '−' : '+'}
        </button>
        <div className='w-full h-full flex items-center justify-center'>
          <Globe activeLocation={{ lat: PHOTOS[activeIndex].lat, lng: PHOTOS[activeIndex].lng }} />
        </div>
      </div>

      {/* Olympus Panel - Bottom Left */}
      <div
        className={`absolute left-8 bottom-8 rounded-xl border border-white/20 bg-black/40 backdrop-blur-md overflow-hidden z-20 transition-all duration-500 ${
          expandedPanel === 'olympus' ? 'w-96 h-96' : 'w-48 h-48'
        }`}
      >
        <button
          onClick={() => setExpandedPanel(expandedPanel === 'olympus' ? null : 'olympus')}
          className='absolute top-2 right-2 w-8 h-8 rounded-lg border border-white/20 bg-white/10 hover:bg-white/20 text-white flex items-center justify-center z-10 transition-colors'
        >
          {expandedPanel === 'olympus' ? '−' : '+'}
        </button>
        <Image src='/saudade/olympus.png' alt='Olympus' fill className='object-cover' />
      </div>
    </section>
  );
}
