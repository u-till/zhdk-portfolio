'use client';

import { PHOTOS, PROCESS_STEPS } from '@/constants/saudade';
import { courierPrime } from '@/lib/fonts';
import { AnimatePresence, motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';

const Globe = dynamic(() => import('@/components/saudade/globe').then((mod) => mod.Globe), {
  ssr: false,
  loading: () => <div className='w-full h-full bg-black' />,
});

export default function SaudadePage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isGlobeExpanded, setIsGlobeExpanded] = useState(false);
  const [selectedProcessIndex, setSelectedProcessIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const navigateToPhoto = useCallback((index: number) => {
    if (scrollRef.current) {
      const width = scrollRef.current.offsetWidth;
      scrollRef.current.scrollTo({
        left: width * index,
        behavior: 'smooth',
      });
    }
  }, []);

  const handlePrev = useCallback(() => {
    const newIndex = activeIndex > 0 ? activeIndex - 1 : PHOTOS.length - 1;
    navigateToPhoto(newIndex);
  }, [activeIndex, navigateToPhoto]);

  const handleNext = useCallback(() => {
    const newIndex = activeIndex < PHOTOS.length - 1 ? activeIndex + 1 : 0;
    navigateToPhoto(newIndex);
  }, [activeIndex, navigateToPhoto]);

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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  return (
    <section>
      {/* First View: Gallery */}
      <div className='h-screen relative overflow-hidden flex flex-col items-center bg-neutral-900'>
        {/* Title - Bottom Left */}
        <div
          className={`absolute bottom-4 md:bottom-8 left-4 md:left-8 pointer-events-none z-10 transition-opacity duration-300 ${
            PHOTOS[activeIndex]?.hideTitle ? 'lg:opacity-0' : ''
          }`}
        >
          <h2 className={`text-5xl lg:text-7xl font-bold text-white mix-blend-difference ${courierPrime.className}`}>
            saudade
          </h2>
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
                alt={`saudade ${index + 1}`}
                fill
                className='object-contain'
                priority={index === 0}
                sizes='100vw'
              />
            </div>
          ))}
        </div>

        {/* Navigation Buttons - Desktop Only */}
        <div className='absolute inset-0 flex items-center justify-between px-8 pointer-events-none z-10'>
          <button
            onClick={handlePrev}
            className='hidden cursor-pointer lg:flex items-center justify-center w-12 h-12 rounded-lg border border-white/20 bg-black/40 backdrop-blur-md text-white hover:bg-black/60 transition-colors pointer-events-auto'
            aria-label='Previous photo'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={2}
              stroke='currentColor'
              className='w-6 h-6'
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
            </svg>
          </button>
          <button
            onClick={handleNext}
            className='hidden cursor-pointer lg:flex items-center justify-center w-12 h-12 rounded-lg border border-white/20 bg-black/40 backdrop-blur-md text-white hover:bg-black/60 transition-colors pointer-events-auto'
            aria-label='Next photo'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={2}
              stroke='currentColor'
              className='w-6 h-6'
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
            </svg>
          </button>
        </div>

        {/* Globe Panel - Bottom Right */}
        <motion.div
          className={`absolute right-4 md:right-8 bottom-4 md:bottom-8 rounded-xl border border-white/20 bg-black/40 backdrop-blur-md overflow-hidden pointer-events-auto w-36 h-36 lg:w-48 lg:h-48 z-20 ${
            isGlobeExpanded ? 'z-30' : ''
          }`}
          animate={{
            width: isGlobeExpanded ? 'min(calc(100vw - 2rem), 512px)' : undefined,
            height: isGlobeExpanded ? 'min(calc(100vw - 2rem), 512px)' : undefined,
          }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        >
          <button
            onClick={() => setIsGlobeExpanded(!isGlobeExpanded)}
            className='absolute cursor-pointer top-2 right-2 w-8 h-8 rounded-lg border border-white/20 bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors z-10 font-mono'
          >
            {isGlobeExpanded ? '×' : 'i'}
          </button>

          <AnimatePresence mode='wait'>
            {!isGlobeExpanded ? (
              <motion.div
                key='globe-collapsed'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className='w-full h-full flex items-center justify-center cursor-pointer'
                onClick={() => setIsGlobeExpanded(true)}
              >
                <Globe activeLocation={{ lat: PHOTOS[activeIndex].lat, lng: PHOTOS[activeIndex].lng }} />
              </motion.div>
            ) : (
              <motion.div
                key='globe-expanded'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, delay: 0.2 }}
                className='w-full h-full p-4 text-white overflow-y-auto flex flex-col'
              >
                <h3 className={`text-2xl font-bold ${courierPrime.className}`}>{PHOTOS[activeIndex].title}</h3>
                <p className='text-sm leading-relaxed'>{PHOTOS[activeIndex].description}</p>
                <div className='flex-1 h-full flex items-center justify-center'>
                  <Globe activeLocation={{ lat: PHOTOS[activeIndex].lat, lng: PHOTOS[activeIndex].lng }} />
                </div>
                <p className='text-sm leading-relaxed'>Use your keyboard arrows to navigate through the photos.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Scroll Down Arrow */}
        <div className='hidden md:block absolute bottom-8 left-1/2 -translate-x-1/2 z-10 pointer-events-none'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='32'
            height='32'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2.5'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='text-foreground/30 animate-bounce'
          >
            <path d='M12 5v14M5 12l7 7 7-7' />
          </svg>
        </div>
      </div>

      {/* Info Content - Vertical 5-Column Layout */}
      <div className='bg-neutral-900 px-4 md:px-8 pt-16 pb-16'>
        <div className='flex flex-col gap-8 text-white'>
          {/* Brief Section */}
          <div>
            <h3 className={`text-xl font-bold  border-b-2 border-white/40 pb-2 mb-4 ${courierPrime.className}`}>
              brief
            </h3>
            <div className='grid grid-cols-1 md:grid-cols-5 gap-y-2 text-sm'>
              <div className='hidden md:block'></div>
              <div className='hidden md:block'></div>
              <div className='hidden md:block'></div>
              <div className='md:col-span-2'>
                <p className='leading-relaxed'>
                  A collection of photographs taken during my travels around the world. The project explores the
                  portuguese concept of &quot;saudade&quot; - a melancholic longing for places and moments that have
                  passed.
                </p>
              </div>
            </div>
          </div>

          {/* Motivation Section */}
          <div>
            <h3 className={`text-xl font-bold  border-b-2 border-white/40 pb-2 mb-4 ${courierPrime.className}`}>
              motivation
            </h3>
            <div className='grid grid-cols-1 md:grid-cols-5 gap-y-2 text-sm'>
              <div className='hidden md:block'></div>
              <div className='hidden md:block'></div>
              <div className='hidden md:block'></div>
              <div className='md:col-span-2'>
                <p className='leading-relaxed'>
                  I bought my first camera when I was about 12 and quickly filled my SD card with an abundance of
                  photos. Later, I rediscovered the appeal of photography through analog cameras, drawn to the limiting
                  nature of film. I especially enjoy taking pictures in the context of street photography and
                  architecture.
                </p>
              </div>
            </div>
          </div>

          {/* specifications Section */}
          <div>
            <h3 className={`text-xl font-bold  border-b-2 border-white/40 pb-2 mb-4 ${courierPrime.className}`}>
              specifications
            </h3>
            <div className='grid grid-cols-2 md:grid-cols-5 gap-y-2 text-sm'>
              <div className='hidden md:block'></div>
              <div className='font-bold md:text-right'>Year</div>
              <div className='hidden md:block'></div>
              <div className='md:col-span-2'>2009-Ongoing</div>

              <div className='hidden md:block'></div>
              <div className='font-bold md:text-right'>For</div>
              <div className='hidden md:block'></div>
              <div className='md:col-span-2'>Personal Project</div>

              <div className='hidden md:block'></div>
              <div className='font-bold md:text-right'>Type</div>
              <div className='hidden md:block'></div>
              <div className='md:col-span-2'>Photography / Travel</div>

              <div className='hidden md:block'></div>
              <div className='font-bold md:text-right'>Cameras</div>
              <div className='hidden md:block'></div>
              <div className='md:col-span-2'>Olympus XA2 / Lomo LC-A / Canon EOS 60D</div>

              <div className='hidden md:block'></div>
              <div className='font-bold md:text-right'>Subjects</div>
              <div className='hidden md:block'></div>
              <div className='md:col-span-2'>Cities, Architecture, People, Nature</div>
            </div>
          </div>

          {/* credits Section */}
          <div>
            <h3 className={`text-xl font-bold  border-b-2 border-white/40 pb-2 mb-4 ${courierPrime.className}`}>
              credits
            </h3>
            <div className='grid grid-cols-2 md:grid-cols-5 gap-y-2 text-sm'>
              <div className='hidden md:block'></div>
              <div className='font-bold md:text-right'>Solo Project</div>
              <div className='hidden md:block'></div>
              <div className='md:col-span-2'>Till Solenthaler</div>
            </div>
          </div>
        </div>
      </div>

      {/* Process Section */}
      <div className='bg-neutral-900 px-4 md:px-8 pt-12 pb-16 text-white'>
        <div>
          <h3 className={`text-xl font-bold  border-b-2 border-white/40 pb-2 mb-6 ${courierPrime.className}`}>
            process
          </h3>

          <div className='flex flex-col lg:flex-row lg:items-stretch gap-6'>
            <div className='order-2 lg:order-1 lg:w-2/5 space-y-3'>
              {PROCESS_STEPS.map((step, index) => {
                const isActive = selectedProcessIndex === index;
                return (
                  <div
                    key={index}
                    onClick={() => setSelectedProcessIndex(index)}
                    className={`w-full p-3 rounded-lg transition-all text-left flex flex-col md:flex-row md:items-center gap-3 lg:cursor-pointer ${
                      isActive ? 'bg-white/5 lg:bg-white/20' : 'bg-white/5 lg:hover:bg-white/10'
                    }`}
                  >
                    <div className='relative w-full aspect-square md:w-20 md:h-20 flex-shrink-0 overflow-hidden rounded-lg ring-1 ring-white/20'>
                      <Image src={step.image} alt={`${step.title} thumbnail`} fill className='object-cover' />
                    </div>
                    <div className='flex-1'>
                      <span className={`font-bold block ${isActive ? 'lg:text-white text-white/80' : 'text-white/80'}`}>
                        {step.title}
                      </span>
                      <span className={`text-sm ${isActive ? 'lg:text-white/90 text-white/60' : 'text-white/60'}`}>{step.text}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className='hidden lg:flex order-1 lg:order-2 lg:w-3/5'>
              <div className='relative w-full rounded-lg overflow-hidden ring-1 ring-white/20'>
                <Image
                  src={PROCESS_STEPS[selectedProcessIndex]?.image || PROCESS_STEPS[0].image}
                  alt={PROCESS_STEPS[selectedProcessIndex]?.title || 'Process step'}
                  fill
                  className='object-cover bg-neutral-800'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
