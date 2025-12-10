'use client';

import { Globe } from '@/components/globe';
import { courierPrime } from '@/lib/fonts';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';

const PHOTOS = [
  {
    src: '/saudade/addis.jpg',
    lat: 12.035,
    lng: 215.006,
    title: 'addis',
    description: 'A moment captured in Addis Ababa, where the light meets memory.',
  },
  {
    src: '/saudade/addis-2.jpg',
    lat: 11.985,
    lng: 214.956,
    title: 'addis-2',
    description: 'Another glimpse of Addis Ababa, frozen in time.',
  },
  {
    src: '/saudade/addis-3.jpg',
    lat: 12.085,
    lng: 215.056,
    title: 'addis-3',
    description: 'The streets of Addis Ababa, captured in silver.',
  },
  {
    src: '/saudade/addis-4.jpg',
    lat: 12.005,
    lng: 214.986,
    title: 'addis-4',
    description: 'Addis Ababa through the viewfinder, a memory preserved.',
  },
  {
    src: '/saudade/almaty-kz.jpg',
    lat: 46.875,
    lng: 253.235,
    title: 'almaty',
    description: 'Almaty in stillness, where mountains meet memory.',
  },
  {
    src: '/saudade/ambalavao-mdg.png',
    lat: -18.925,
    lng: 226.976,
    title: 'ambalavao',
    description: 'Ambalavao, Madagascar, a moment etched in emulsion.',
  },
  {
    src: '/saudade/ambalavao-mdg-2.png',
    lat: -18.895,
    lng: 227.006,
    title: 'ambalavao-2',
    description: 'Another frame from Ambalavao, another memory held.',
  },
  {
    src: '/saudade/angkor-wat.jpg',
    lat: 16.435,
    lng: 281.876,
    title: 'angkor wat',
    description: 'Angkor Wat in silence, where ancient stones whisper.',
  },
  {
    src: '/saudade/ankavandra-mdg.png',
    lat: -15.795,
    lng: 225.416,
    title: 'ankavandra',
    description: 'Ankavandra, Madagascar, captured in light and shadow.',
  },
  {
    src: '/saudade/bkk.jpg',
    lat: 16.765,
    lng: 280.556,
    title: 'bangkok',
    description: 'Bangkok through the lens, a city of contrasts.',
  },
  {
    src: '/saudade/bokor-hill.jpg',
    lat: 13.565,
    lng: 281.876,
    title: 'bokor hill',
    description: 'Bokor Hill in mist, a forgotten place remembered.',
  },
  {
    src: '/saudade/chiang-mai.jpg',
    lat: 21.325,
    lng: 279.906,
    title: 'chiang mai',
    description: 'Chiang Mai in fragments, preserved in time.',
  },
  {
    src: '/saudade/hanoi.jpg',
    lat: 24.105,
    lng: 284.076,
    title: 'hanoi',
    description: 'Hanoi in stillness, where the old city breathes.',
  },
  {
    src: '/saudade/hanoi-2.jpg',
    lat: 24.135,
    lng: 284.106,
    title: 'hanoi-2',
    description: 'Another moment in Hanoi, another layer of longing.',
  },
  {
    src: '/saudade/hanoi-3.jpg',
    lat: 24.075,
    lng: 284.046,
    title: 'hanoi-3',
    description: 'Hanoi through the viewfinder, a memory in grain.',
  },
  {
    src: '/saudade/hanoi-4.jpg',
    lat: 24.155,
    lng: 284.126,
    title: 'hanoi-4',
    description: 'The essence of Hanoi, captured in silver halide.',
  },
  {
    src: '/saudade/ho-chi-min.jpg',
    lat: 13.755,
    lng: 286.696,
    title: 'ho chi minh',
    description: 'Ho Chi Minh City in motion, frozen in a frame.',
  },
  {
    src: '/saudade/hongkong-1.jpg',
    lat: 25.325,
    lng: 290.436,
    title: 'hongkong-1',
    description: 'The first glimpse of Hong Kong through the lens of nostalgia.',
  },
  {
    src: '/saudade/hongkong-2.jpg',
    lat: 25.325,
    lng: 290.436,
    title: 'hongkong-2',
    description: 'Another frame from Hong Kong, another layer of longing.',
  },
  {
    src: '/saudade/hongkong-3.jpg',
    lat: 25.325,
    lng: 290.436,
    title: 'hongkong-3',
    description: 'The third Hong Kong memory, fading like ink on old paper.',
  },
  {
    src: '/saudade/kuala-lumpur.jpg',
    lat: 6.145,
    lng: 277.956,
    title: 'kuala lumpur',
    description: 'Kuala Lumpur in fragments, preserved in silver halide.',
  },
  {
    src: '/saudade/kunming.jpg',
    lat: 28.045,
    lng: 278.986,
    title: 'kunming',
    description: 'Kunming through the viewfinder, a place both present and past.',
  },
  {
    src: '/saudade/mesocco.jpg',
    lat: 49.535,
    lng: 189.126,
    title: 'mesocco',
    description: 'Mesocco in the Alps, where mountains touch the sky.',
  },
  {
    src: '/saudade/phnompenh.jpg',
    lat: 14.565,
    lng: 281.196,
    title: 'phnom penh',
    description: 'Phnom Penh in stillness, caught between shutter clicks.',
  },
  {
    src: '/saudade/rome.jpg',
    lat: 44.895,
    lng: 192.466,
    title: 'rome',
    description: 'Rome in eternal light, a city of layered memories.',
  },
  {
    src: '/saudade/sambava-mdg.png',
    lat: -11.175,
    lng: 230.006,
    title: 'sambava',
    description: 'Sambava, Madagascar, where ocean meets memory.',
  },
  {
    src: '/saudade/sihanoukville.jpg',
    lat: 13.355,
    lng: 281.676,
    title: 'sihanoukville',
    description: 'Sihanoukville by the sea, a coastal memory preserved.',
  },
  {
    src: '/saudade/stolze-1.jpg',
    lat: 50.105,
    lng: 223.366,
    title: 'stolze',
    description: 'Stolze in analog, a memory etched in grain and light.',
  },
  {
    src: '/saudade/taldyqorghan-kz.png',
    lat: 47.915,
    lng: 253.016,
    title: 'taldyqorghan',
    description: 'Taldyqorghan, Kazakhstan, a distant place remembered.',
  },
  {
    src: '/saudade/zurich.jpg',
    lat: 50.435,
    lng: 188.546,
    title: 'zurich',
    description: 'Zurich in stillness, where lake meets light.',
  },
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

      {/* Navigation Buttons - Desktop Only */}
      <div className='absolute inset-0 flex items-center justify-between px-8 pointer-events-none z-10'>
        <button
          onClick={handlePrev}
          className='hidden cursor-pointer lg:flex items-center justify-center w-12 h-12 rounded-full border border-white/20 bg-black/40 backdrop-blur-md text-white hover:bg-black/60 transition-colors pointer-events-auto'
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
          className='hidden cursor-pointer lg:flex items-center justify-center w-12 h-12 rounded-full border border-white/20 bg-black/40 backdrop-blur-md text-white hover:bg-black/60 transition-colors pointer-events-auto'
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

      {/* Container for panels - constrained width */}
      <div className='absolute inset-0 max-w-screen-2xl mx-auto px-4 md:px-6 pointer-events-none z-20'>
        {/* Globe Panel - Bottom Right */}
        <motion.div
          className={`absolute right-4 bottom-8 rounded-xl border border-white/20 bg-black/40 backdrop-blur-md overflow-hidden pointer-events-auto w-36 h-36 lg:w-48 lg:h-48 ${
            expandedPanel === 'globe' ? 'z-30' : 'z-10'
          }`}
          animate={{
            width: expandedPanel === 'globe' ? 'min(calc(100vw - 2rem), 512px)' : undefined,
            height: expandedPanel === 'globe' ? 'min(calc(100vw - 2rem), 512px)' : undefined,
          }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        >
          <button
            onClick={() => setExpandedPanel(expandedPanel === 'globe' ? null : 'globe')}
            className='absolute cursor-pointer top-2 left-2 w-8 h-8 rounded-lg border border-white/20 bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors z-10 font-mono'
          >
            {expandedPanel === 'globe' ? 'x' : 'i'}
          </button>

          <AnimatePresence mode='wait'>
            {!expandedPanel || expandedPanel !== 'globe' ? (
              <motion.div
                key='globe-collapsed'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className='w-full h-full flex items-center justify-center cursor-pointer'
                onClick={() => setExpandedPanel('globe')}
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
                className='w-full h-full pt-12 px-4 pb-6 text-white overflow-y-auto flex flex-col'
              >
                <h3 className={`text-2xl font-bold ${courierPrime.className}`}>{PHOTOS[activeIndex].title}</h3>
                <p className='text-sm leading-relaxed'>{PHOTOS[activeIndex].description}</p>
                <div className='flex-1 min-h-[200px] flex items-center justify-center'>
                  <Globe activeLocation={{ lat: PHOTOS[activeIndex].lat, lng: PHOTOS[activeIndex].lng }} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Olympus Panel - Bottom Left */}
        <motion.div
          className={`absolute left-4 bottom-8 rounded-xl border border-white/20 bg-black/40 backdrop-blur-md overflow-hidden pointer-events-auto w-36 h-36 lg:w-48 lg:h-48 ${
            expandedPanel === 'olympus' ? 'z-30' : 'z-10'
          }`}
          animate={{
            width: expandedPanel === 'olympus' ? 'min(calc(100vw - 2rem), 512px)' : undefined,
            height: expandedPanel === 'olympus' ? 'min(calc(100vw - 2rem), 512px)' : undefined,
          }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        >
          <button
            onClick={() => setExpandedPanel(expandedPanel === 'olympus' ? null : 'olympus')}
            className='absolute cursor-pointer top-2 right-2 w-8 h-8 rounded-lg border border-white/20 bg-white/10 hover:bg-white/20 text-white flex items-center justify-center z-10 transition-colors font-mono'
          >
            {expandedPanel === 'olympus' ? '×' : 'i'}
          </button>

          <AnimatePresence mode='wait'>
            {!expandedPanel || expandedPanel !== 'olympus' ? (
              <motion.div
                key='olympus-collapsed'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className='w-full h-full relative'
              >
                <Image
                  src='/saudade/olympus.png'
                  alt='Olympus'
                  fill
                  className='object-cover cursor-pointer'
                  onClick={handleCameraClick}
                />
              </motion.div>
            ) : (
              <motion.div
                key='olympus-expanded'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, delay: 0.2 }}
                className='w-full h-full p-6 text-white overflow-y-auto flex flex-col gap-4'
              >
                <h3 className={`text-2xl font-bold ${courierPrime.className}`}>Photography</h3>
                <p className='text-sm leading-relaxed'>
                  I bought my first proper camera when i was about 12, a Canon EOS 60D and filled my SD card with an
                  abundance of photos. Later i discovered the appeal of analogue photography, especially
                  streetphotography. I mostly take pictures when i am travelling.
                </p>
                <div className='space-y-2 text-sm'>
                  <div className='border-l-2 border-white/40 pl-3'>
                    <span className='font-bold block'>Year:</span>
                    <span>2009-now</span>
                  </div>
                  <div className='border-l-2 border-white/40 pl-3'>
                    <span className='font-bold block'>Type:</span>
                    <span>Photography</span>
                  </div>
                  <div className='border-l-2 border-white/40 pl-3'>
                    <span className='font-bold block'>Legacy:</span>
                    <span>Capturing memories across continents</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
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
