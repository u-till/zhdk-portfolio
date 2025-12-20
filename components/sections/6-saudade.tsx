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
    title: 'Addis Ababa, Ethiopia',
    description: 'Turtle transport captured in front of the national museum.',
  },
  {
    src: '/saudade/ambalavao-mdg.png',
    lat: -18.925,
    lng: 226.976,
    title: 'Ambalavao, Magagascar',
    description: 'A scenic landscape in the south of the country.',
  },
  {
    src: '/saudade/hanoi-3.jpg',
    lat: 24.075,
    lng: 284.046,
    title: 'Hanoi, Vietnam',
    description: 'A fishermen and his buddy at lake Hồ Tây',
  },
  {
    src: '/saudade/ambalavao-mdg-2.png',
    lat: -18.895,
    lng: 227.006,
    title: 'Ambalavao, Madagascar',
    description: 'Inside of the home of a Peacecorps volunteer who lived in Ambalavao.',
  },
  {
    src: '/saudade/addis-2.jpg',
    lat: 11.985,
    lng: 214.956,
    title: 'Addis Ababa, Ethiopia',
    description: 'The farmers school of Selam Village, an orphanage in the middle of Addis',
  },
  {
    src: '/saudade/angkor-wat.jpg',
    lat: 16.435,
    lng: 281.876,
    title: 'Angkor Wat, Cambodia',
    description: 'A luxury import market in Siem Reap, symbolic for the mass tourism.',
  },
  {
    src: '/saudade/hanoi-2.jpg',
    lat: 24.135,
    lng: 284.106,
    title: 'Hanoi, Vietnam',
    description: 'Two young women looking out of the Thăng Long Citadel.',
  },
  {
    src: '/saudade/addis-3.jpg',
    lat: 12.085,
    lng: 215.056,
    title: 'Addis Ababa, Ethiopia',
    description: 'A church with the classic pan-african colors in the east of Addis.',
  },
  {
    src: '/saudade/almaty-kz.jpg',
    lat: 46.875,
    lng: 253.235,
    title: 'Taldyqorghan, Kazakhstan',
    description: 'A busy markethall in the remote town of Taldyqorghan.',
  },
  {
    src: '/saudade/addis-4.jpg',
    lat: 12.005,
    lng: 214.986,
    title: 'Addis Ababa, Ethiopia',
    description: 'Tomoca Coffee, a family owned coffee roasting business founded in 1953.',
  },
  {
    src: '/saudade/ankavandra-mdg.png',
    lat: -15.795,
    lng: 225.416,
    title: 'Ankavandra, Madagascar',
    description: 'A team of doctors on their way to an isolated village.',
  },
  {
    src: '/saudade/bkk.jpg',
    lat: 16.765,
    lng: 280.556,
    title: 'Bangkok, Thailand',
    description: 'Temples also need to be vacuumed from time to time.',
  },
  {
    src: '/saudade/bokor-hill.jpg',
    lat: 13.565,
    lng: 281.876,
    title: 'Bokor Hill, Cambodia',
    description: 'A haunting building which used to be a scamming compound.',
  },
  {
    src: '/saudade/chiang-mai.jpg',
    lat: 21.325,
    lng: 279.906,
    title: 'Chiang Mai, Thailand',
    description: 'An old computer shop in the outskirts of Chiang Mai.',
  },
  {
    src: '/saudade/hanoi.jpg',
    lat: 24.105,
    lng: 284.076,
    title: 'Hanoi, Vietnam',
    description: 'Vendors inside a markethall passing time.',
  },
  {
    src: '/saudade/hongkong-2.jpg',
    lat: 25.325,
    lng: 290.436,
    title: 'Hongkong',
    description: 'Inside the maze of staircases and hallways of a block in Hongkong.',
  },
  {
    src: '/saudade/hanoi-4.jpg',
    lat: 24.155,
    lng: 284.126,
    title: 'Hanoi, Vietnam',
    description: 'Construction workers in stylish jeans-only workwear.',
  },
  {
    src: '/saudade/ho-chi-min.jpg',
    lat: 13.755,
    lng: 286.696,
    title: 'Ho Chi Minh, Vietnam',
    description: 'A cute bike shop in the outskirts of Saigon as the locals call it.',
  },
  {
    src: '/saudade/hongkong-1.jpg',
    lat: 25.325,
    lng: 290.436,
    title: 'Hongkong',
    description: 'A red facade of one of the gigantic blocks in Hongkong.',
  },
  {
    src: '/saudade/kunming.jpg',
    lat: 28.045,
    lng: 278.986,
    title: 'Kunming, China',
    description: 'A temple in Kunming, but maybe it was in Chengdu, not sure.',
  },
  {
    src: '/saudade/hongkong-3.jpg',
    lat: 25.325,
    lng: 290.436,
    title: 'Hongkong',
    description: 'Inside the museum of Kowloon Walled City.',
  },
  {
    src: '/saudade/kuala-lumpur.jpg',
    lat: 6.145,
    lng: 277.956,
    title: 'Kuala Lumpur, Malaysia',
    description: 'A sportscar being admired next to the Petronas Tower.',
  },

  {
    src: '/saudade/mesocco.jpg',
    lat: 49.535,
    lng: 189.126,
    title: 'Mesocco, Switzerland',
    description: 'Maiensäss near Mesocco, an italian speaking village in Grisons.',
  },
  {
    src: '/saudade/phnompenh.jpg',
    lat: 14.565,
    lng: 281.196,
    title: 'Phnom Penh, Cambodia',
    description: 'A scooter dealer waiting for customers among his many motorbikes.',
  },
  {
    src: '/saudade/rome.jpg',
    lat: 44.895,
    lng: 192.466,
    title: 'Rome',
    description: 'Really cool facade of a administrative building outside in Rome.',
  },
  {
    src: '/saudade/sambava-mdg.png',
    lat: -11.175,
    lng: 230.006,
    title: 'Sambava, Madagascar',
    description: 'Aerial surveillance in a rural town after a cyclone to map out damages.',
  },
  {
    src: '/saudade/sihanoukville.jpg',
    lat: 13.355,
    lng: 281.676,
    title: 'Sihanoukville, Cambodia',
    description: 'A shady port city, hosting many illicit casinos & businesses.',
  },
  {
    src: '/saudade/stolze-1.jpg',
    lat: 50.435,
    lng: 188.546,
    title: 'Stolze Openair, Zürich',
    description: 'Once a year for two weeks, volunteers organize a festival in Zurich.',
  },
  {
    src: '/saudade/taldyqorghan-kz.png',
    lat: 47.915,
    lng: 253.016,
    title: 'Taldyqorghan, Kazakhstan',
    description: 'The two families gathering together, a day before the wedding.',
  },
  {
    src: '/saudade/zurich.jpg',
    lat: 50.435,
    lng: 188.546,
    title: 'Zurich, Switzerland',
    description: 'My humble abode on a quiet day in June.',
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
    <section className='h-screen relative overflow-hidden pt-32 md:pt-42 px-4 md:px-8 flex flex-col items-center'>
      {/* Title */}
      <div className='absolute inset-x-0 top-32 md:top-42 flex justify-center pointer-events-none z-10'>
        <div className='max-w-screen-2xl mx-0 w-full flex justify-center'>
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
      <div className='absolute inset-0 mx-0 pointer-events-none z-20'>
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
                <div className='flex-1 h-full flex items-center justify-center'>
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
