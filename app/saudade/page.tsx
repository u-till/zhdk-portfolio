'use client';

import { courierPrime } from '@/lib/fonts';
import { AnimatePresence, motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';

// Lazy load the 3D Globe to code-split three.js
const Globe = dynamic(() => import('@/components/saudade/globe').then((mod) => mod.Globe), {
  ssr: false,
  loading: () => <div className='w-full h-full bg-black' />,
});

const PHOTOS: {
  src: string;
  lat: number;
  lng: number;
  title: string;
  description: string;
  hideTitle?: boolean;
}[] = [
  {
    src: '/saudade/ambalavao-mdg-2.png',
    lat: -18.895,
    lng: 227.006,
    title: 'Ambalavao, Madagascar',
    description: 'Inside of the home of a Peacecorps volunteer who lived in Ambalavao.',
  },
  {
    src: '/saudade/addis.jpg',
    lat: 12.035,
    lng: 215.006,
    title: 'Addis Ababa, Ethiopia',
    description: 'Turtle transport captured in front of the national museum.',
    hideTitle: true,
  },
  {
    src: '/saudade/ambalavao-mdg.png',
    lat: -18.925,
    lng: 226.976,
    title: 'Ambalavao, Magagascar',
    description: 'A scenic landscape in the south of the country.',
    hideTitle: true,
  },
  {
    src: '/saudade/hanoi-3.jpg',
    lat: 24.075,
    lng: 284.046,
    title: 'Hanoi, Vietnam',
    description: 'A fishermen and his buddy at lake Hồ Tây',
    hideTitle: true,
  },
  {
    src: '/saudade/addis-2.jpg',
    lat: 11.985,
    lng: 214.956,
    title: 'Addis Ababa, Ethiopia',
    description: 'The farmers school of Selam Village, an orphanage in the middle of Addis',
    hideTitle: true,
  },
  {
    src: '/saudade/hanoi-2.jpg',
    lat: 24.135,
    lng: 284.106,
    title: 'Hanoi, Vietnam',
    description: 'Two students looking out of the Thăng Long Citadel.',
    hideTitle: true,
  },
  {
    src: '/saudade/addis-3.jpg',
    lat: 12.085,
    lng: 215.056,
    title: 'Addis Ababa, Ethiopia',
    description: 'A church with the classic pan-african colors in the east of Addis.',
    hideTitle: true,
  },
  {
    src: '/saudade/almaty-kz.jpg',
    lat: 46.875,
    lng: 253.235,
    title: 'Taldyqorghan, Kazakhstan',
    description: 'A busy markethall in the remote town of Taldyqorghan.',
    hideTitle: true,
  },
  {
    src: '/saudade/ankavandra-mdg.png',
    lat: -15.795,
    lng: 225.416,
    title: 'Ankavandra, Madagascar',
    description: 'A team of doctors on their way to an isolated village.',
    hideTitle: true,
  },
  {
    src: '/saudade/hongkong-2.jpg',
    lat: 25.325,
    lng: 290.436,
    title: 'Hongkong',
    description: 'Inside the maze of staircases and hallways of a block in Hongkong.',
    hideTitle: true,
  },
  {
    src: '/saudade/hanoi-4.jpg',
    lat: 24.155,
    lng: 284.126,
    title: 'Hanoi, Vietnam',
    description: 'Construction workers in stylish jeans-only workwear.',
    hideTitle: true,
  },
  {
    src: '/saudade/hongkong-1.jpg',
    lat: 25.325,
    lng: 290.436,
    title: 'Hongkong',
    description: 'A red facade of one of the gigantic blocks in Hongkong.',
    hideTitle: true,
  },
  {
    src: '/saudade/kunming.jpg',
    lat: 28.045,
    lng: 278.986,
    title: 'Kunming, China',
    description: 'A temple in Kunming, but maybe it was in Chengdu, not sure.',
    hideTitle: true,
  },
  {
    src: '/saudade/hongkong-3.jpg',
    lat: 25.325,
    lng: 290.436,
    title: 'Hongkong',
    description: 'Inside the museum of Kowloon Walled City.',
    hideTitle: true,
  },
  {
    src: '/saudade/kuala-lumpur.jpg',
    lat: 6.145,
    lng: 277.956,
    title: 'Kuala Lumpur, Malaysia',
    description: 'A sportscar being admired next to the Petronas Tower.',
    hideTitle: true,
  },
  {
    src: '/saudade/kathmandu.jpg',
    lat: 30.7,
    lng: 265.3,
    title: 'Kathmandu, Nepal',
    description: 'View over the city from a hill on the outskirts.',
    hideTitle: true,
  },
  {
    src: '/saudade/rio-1.jpg',
    lat: -19.9,
    lng: 136.8,
    title: 'Rio de Janeiro, Brazil',
    description: "Oscar Niemeyer's Art Museum in Niterói.",
    hideTitle: true,
  },
  {
    src: '/saudade/mesocco.jpg',
    lat: 49.535,
    lng: 189.126,
    title: 'Mesocco, Switzerland',
    description: 'Maiensäss near Mesocco, an italian speaking village in Grisons.',
    hideTitle: true,
  },
  {
    src: '/saudade/phnompenh.jpg',
    lat: 14.565,
    lng: 281.196,
    title: 'Phnom Penh, Cambodia',
    description: 'A scooter dealer waiting for customers among his many motorbikes.',
    hideTitle: true,
  },
  {
    src: '/saudade/rome.jpg',
    lat: 44.895,
    lng: 192.466,
    title: 'Rome',
    description: 'Really cool facade of an administrative building outside in Rome.',
    hideTitle: true,
  },
  {
    src: '/saudade/annapurna.jpg',
    lat: 31.5,
    lng: 263.9,
    title: 'Annapurna, Nepal',
    description: 'On the way to Annapurna Basecamp, high up in the Himalayas.',
    hideTitle: true,
  },
  {
    src: '/saudade/sambava-mdg.png',
    lat: -11.175,
    lng: 230.006,
    title: 'Sambava, Madagascar',
    description: 'Aerial surveillance in a rural town after a cyclone to map out damages.',
    hideTitle: true,
  },
  {
    src: '/saudade/stolze-1.jpg',
    lat: 50.435,
    lng: 188.546,
    title: 'Stolze Openair, Zürich',
    description: 'Emi, the brain behind the production of the Stolze Openair.',
    hideTitle: true,
  },
  {
    src: '/saudade/taldyqorghan-kz.png',
    lat: 47.915,
    lng: 253.016,
    title: 'Taldyqorghan, Kazakhstan',
    description: 'The two families gathering together, a day before the wedding.',
    hideTitle: true,
  },
];

export default function SaudadePage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isGlobeExpanded, setIsGlobeExpanded] = useState(false);
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
            PHOTOS[activeIndex]?.hideTitle ? 'opacity-0' : 'opacity-100'
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
              <div className='md:col-span-2'>till solenthaler</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
