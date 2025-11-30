'use client';

import { Globe } from '@/components/globe';
import { courierPrime } from '@/lib/fonts';
import { AnimatePresence, motion } from 'framer-motion';
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
  const [showFlash, setShowFlash] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleCameraClick = () => {
    setShowFlash(true);
    setTimeout(() => setShowFlash(false), 100);
    setExpandedPanel(expandedPanel === 'olympus' ? null : 'olympus');
  };

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
    <section className='h-screen relative overflow-hidden pt-32 md:pt-42'>
      {/* Title */}
      <div className='absolute inset-x-0 top-32 md:top-42 flex justify-center pointer-events-none z-10'>
        <div className='max-w-screen-2xl mx-auto w-full px-4 md:px-6 flex justify-center'>
          <h2 className={`text-5xl lg:text-7xl font-bold text-white mix-blend-difference ${courierPrime.className}`}>
            saudade
          </h2>
        </div>
      </div>

      {/* Scrolling Photos - Full Width */}
      <div
        ref={scrollRef}
        className='absolute inset-0 top-0 overflow-x-auto overflow-y-hidden snap-x snap-mandatory flex scrollbar-hide'
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

      {/* Container for panels - constrained width */}
      <div className='absolute inset-0 max-w-screen-2xl mx-auto px-4 md:px-6 pointer-events-none z-20'>
        {/* Globe Panel - Bottom Right */}
        <div
          className={`absolute right-4 bottom-8 rounded-xl border border-white/20 bg-black/40 backdrop-blur-md pointer-events-auto transition-all duration-500 ${
            expandedPanel === 'globe' ? 'w-36 h-36 lg:w-96 lg:h-96' : 'w-36 h-36 lg:w-48 lg:h-48'
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
          className={`absolute left-4 bottom-8 rounded-xl border border-white/20 bg-black/40 backdrop-blur-md overflow-hidden pointer-events-auto transition-all duration-500 ${
            expandedPanel === 'olympus' ? 'w-36 h-36 lg:w-96 lg:h-96' : 'w-36 h-36 lg:w-48 lg:h-48'
          }`}
        >
          <button
            onClick={() => setExpandedPanel(expandedPanel === 'olympus' ? null : 'olympus')}
            className='absolute top-2 right-2 w-8 h-8 rounded-lg border border-white/20 bg-white/10 hover:bg-white/20 text-white flex items-center justify-center z-10 transition-colors font-mono'
          >
            {expandedPanel === 'olympus' ? '×' : 'i'}
          </button>

          {!expandedPanel || expandedPanel !== 'olympus' ? (
            <Image
              src='/saudade/olympus.png'
              alt='Olympus'
              fill
              className='object-cover cursor-pointer'
              onClick={handleCameraClick}
            />
          ) : (
            <div className='w-full h-full p-6 text-white overflow-y-auto flex flex-col gap-4'>
              <h3 className={`text-2xl font-bold ${courierPrime.className}`}>Olympus OM-1</h3>
              <p className='text-sm leading-relaxed'>
                A legendary 35mm SLR camera from the 1970s. This compact marvel revolutionized camera design with its
                innovative engineering and timeless aesthetic.
              </p>
              <div className='space-y-2 text-sm'>
                <div className='border-l-2 border-white/40 pl-3'>
                  <span className='font-bold block'>Year:</span>
                  <span>1972-1984</span>
                </div>
                <div className='border-l-2 border-white/40 pl-3'>
                  <span className='font-bold block'>Type:</span>
                  <span>35mm SLR</span>
                </div>
                <div className='border-l-2 border-white/40 pl-3'>
                  <span className='font-bold block'>Legacy:</span>
                  <span>Capturing memories across continents</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Camera Flash Effect */}
      <AnimatePresence>
        {showFlash && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className='fixed inset-0 bg-white z-50 pointer-events-none'
          />
        )}
      </AnimatePresence>
    </section>
  );
}
