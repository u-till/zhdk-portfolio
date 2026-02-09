'use client';

import { Lightbox } from '@/components/traces/lightbox';
import { useNavigation } from '@/contexts/navigation-context';
import { courierPrime } from '@/lib/fonts';
import { AnimatePresence, motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';

interface SaudadePhoto {
  src: string;
  lat: number;
  lng: number;
  title: string;
  description: string;
  hideTitle?: boolean;
}

const PHOTOS: SaudadePhoto[] = [
  {
    src: '/saudade/ambalavao-mdg-2.png',
    lat: -18.895,
    lng: 227.006,
    title: 'Ambalavao, Madagascar',
    description: 'Inside the home of a Peace Corps volunteer who lived in Ambalavao.',
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
    title: 'Ambalavao, Madagascar',
    description: 'A scenic landscape in the south of the country.',
    hideTitle: true,
  },
  {
    src: '/saudade/hanoi-3.jpg',
    lat: 24.075,
    lng: 284.046,
    title: 'Hanoi, Vietnam',
    description: 'A fisherman and his buddy at lake Hồ Tây.',
    hideTitle: true,
  },
  {
    src: '/saudade/addis-2.jpg',
    lat: 11.985,
    lng: 214.956,
    title: 'Addis Ababa, Ethiopia',
    description: 'The farmers school of Selam Village, an orphanage in the middle of Addis.',
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
    description: 'A church with the classic Pan-African colors in the east of Addis.',
    hideTitle: true,
  },
  {
    src: '/saudade/almaty-kz.jpg',
    lat: 46.875,
    lng: 253.235,
    title: 'Taldyqorghan, Kazakhstan',
    description: 'A busy market hall in the remote town of Taldyqorghan.',
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
    title: 'Hong Kong',
    description: 'Inside the maze of staircases and hallways of a block in Hong Kong.',
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
    title: 'Hong Kong',
    description: 'A red facade of one of the gigantic blocks in Hong Kong.',
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
    title: 'Hong Kong',
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
    description: 'Maiensäss near Mesocco, an Italian-speaking village in Grisons.',
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
    description: 'A facade of an administrative building in Rome.',
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

const PROCESS_STEPS = [
  {
    title: '01. GO SOMEWHERE',
    text: 'It does not really matter where. There are good subjects everywhere.',
    image: '/saudade/process-1.jpg',
  },
  {
    title: '02. BRING THE CAMERA',
    text: 'More important is to always bring the camera everywhere you go.',
    image: '/saudade/process-2.jpg',
  },
  {
    title: '03. WALK AROUND FOR HOURS',
    text: 'My favorite way of exploring a new place is by just walking around for hours. Whenever something catches my attention, I take a photo.',
    image: '/saudade/process-3.jpg',
  },
  {
    title: '04. DROP OFF FILM',
    text: 'After filling a few films or upon returning home, I drop them off at a local lab for development.',
    image: '/saudade/process-4.jpg',
  },
  {
    title: '05. DOWNLOAD AND ARCHIVE',
    text: 'And then the exciting part: downloading the scans and going through them. I mark the best ones and archive them on my NAS.',
    image: '/saudade/process-5.jpg',
  },
];

const Globe = dynamic(() => import('@/components/saudade/globe').then((mod) => mod.Globe), {
  ssr: false,
  loading: () => <div className='w-full h-full bg-black' />,
});

export default function SaudadePage() {
  const { navigateTo } = useNavigation();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isGlobeExpanded, setIsGlobeExpanded] = useState(false);
  const [selectedProcessIndex, setSelectedProcessIndex] = useState(0);
  const [lightboxImage, setLightboxImage] = useState<{ src: string; title?: string } | null>(null);
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
        {/* Title - Above globe on mobile, bottom left on desktop */}
        <div
          className={`absolute bottom-8 left-4 md:left-8 pointer-events-none z-10 transition-opacity duration-300 ${
            PHOTOS[activeIndex]?.hideTitle ? 'lg:opacity-0' : ''
          }`}
        >
          <h1
            className={`text-[clamp(1.75rem,8vh,3rem)] md:text-[clamp(1.75rem,8vh,8rem)] font-bold text-white mix-blend-difference leading-none ${courierPrime.className}`}
          >
            saudade
          </h1>
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
          className={`absolute left-4 md:right-8 bottom-24 md:bottom-8 rounded-xl border border-white/20 bg-black/40 backdrop-blur-md overflow-hidden pointer-events-auto w-36 h-36 lg:w-48 lg:h-48 z-20 ${
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
                <h2 className={`text-2xl font-bold ${courierPrime.className}`}>{PHOTOS[activeIndex].title}</h2>
                <p className='text-sm leading-relaxed'>{PHOTOS[activeIndex].description}</p>
                <div className='flex-1 h-full flex items-center justify-center'>
                  <Globe activeLocation={{ lat: PHOTOS[activeIndex].lat, lng: PHOTOS[activeIndex].lng }} />
                </div>
                <p className='text-sm leading-relaxed'>
                  <span className='md:hidden'>Swipe to look through the photos.</span>
                  <span className='hidden md:inline'>Use your keyboard arrows to navigate through the photos.</span>
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Info Content - Vertical 5-Column Layout */}
      <div className='bg-neutral-900 px-4 md:px-8 pt-16 pb-16'>
        <div className='flex flex-col gap-8 text-white'>
          {/* Brief Section */}
          <div>
            <h2 className='text-xl font-bold  border-b-2 border-white pb-2 mb-4'>brief</h2>
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

          {/* specifications Section */}
          <div>
            <h2 className='text-xl font-bold  border-b-2 border-white pb-2 mb-4'>specifications</h2>
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
              <div className='md:col-span-2'>Photography</div>

              <div className='hidden md:block'></div>
              <div className='font-bold md:text-right'>Cameras</div>
              <div className='hidden md:block'></div>
              <div className='md:col-span-2'>Olympus XA2 / iPhone / Lomo LC-A / Canon EOS 60D </div>

              <div className='hidden md:block'></div>
              <div className='font-bold md:text-right'>Subjects</div>
              <div className='hidden md:block'></div>
              <div className='md:col-span-2'>Cities, Architecture, People, Nature</div>
            </div>
          </div>

          {/* Motivation Section */}
          <div>
            <h2 className='text-xl font-bold  border-b-2 border-white pb-2 mb-4'>motivation</h2>
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

          {/* credits Section */}
          <div>
            <h2 className='text-xl font-bold  border-b-2 border-white pb-2 mb-4'>credits</h2>
            <div className='grid grid-cols-2 md:grid-cols-5 gap-y-2 text-sm'>
              <div className='hidden md:block'></div>
              <div className='font-bold md:text-right'>Solo Project</div>
              <div className='hidden md:block'></div>
              <div className='md:col-span-2'>Till Solenthaler</div>
              <div className='hidden md:block'></div>
              <div className='font-bold md:text-right'>AI Declaration</div>
              <div className='hidden md:block'></div>
              <div className='md:col-span-2'>No AI used</div>
            </div>
          </div>
        </div>
      </div>

      {/* Process Section */}
      <div className='bg-neutral-900 px-4 md:px-8 pt-12 pb-16 text-white'>
        <div>
          <h2 className='text-xl font-bold  border-b-2 border-white pb-2 mb-6'>process</h2>

          <div className='flex flex-col lg:flex-row lg:items-stretch gap-6'>
            <div className='order-2 lg:order-1 lg:w-2/5 space-y-3'>
              {PROCESS_STEPS.map((step, index) => {
                const isActive = selectedProcessIndex === index;
                return (
                  <div
                    key={index}
                    onClick={() => setSelectedProcessIndex(index)}
                    className={`w-full p-3 rounded-lg transition-all text-left flex flex-col lg:flex-row lg:items-center gap-3 lg:cursor-pointer ${
                      isActive ? 'bg-white/5 lg:bg-white/20' : 'bg-white/5 lg:hover:bg-white/10'
                    }`}
                  >
                    <div className='relative w-full aspect-square lg:w-20 lg:h-20 flex-shrink-0 overflow-hidden rounded-lg ring-1 ring-white/20'>
                      <Image src={step.image} alt={`${step.title} thumbnail`} fill className='object-cover' />
                    </div>
                    <div className='flex-1'>
                      <span className={`font-bold block ${isActive ? 'lg:text-white text-white/80' : 'text-white/80'}`}>
                        {step.title}
                      </span>
                      <span className={`text-sm ${isActive ? 'lg:text-white/90 text-white/60' : 'text-white/60'}`}>
                        {step.text}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className='hidden lg:flex order-1 lg:order-2 lg:w-3/5'>
              <div
                className='relative w-full rounded-lg overflow-hidden ring-1 ring-white/20 cursor-pointer'
                onClick={() => {
                  const step = PROCESS_STEPS[selectedProcessIndex] || PROCESS_STEPS[0];
                  setLightboxImage({ src: step.image, title: step.title });
                }}
              >
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

      {/* Project Navigation */}
      <div className='bg-neutral-900 px-4 md:px-8 pb-16'>
        <div className='flex justify-between items-center border-b-2 border-white pb-2'>
          <span
            onClick={() => navigateTo('/under-construction')}
            className='font-bold cursor-pointer lowercase text-[clamp(0.625rem,3vh,1rem)] md:text-[clamp(0.875rem,4vh,4rem)] leading-none text-white hover:opacity-60 transition-opacity'
          >
            previous
          </span>
          <span
            onClick={() => navigateTo('/retrofitted')}
            className='font-bold cursor-pointer lowercase text-[clamp(0.625rem,3vh,1rem)] md:text-[clamp(0.875rem,4vh,4rem)] leading-none text-white hover:opacity-60 transition-opacity'
          >
            next
          </span>
        </div>
      </div>

      <Lightbox src={lightboxImage?.src || null} title={lightboxImage?.title} onClose={() => setLightboxImage(null)} />
    </section>
  );
}
