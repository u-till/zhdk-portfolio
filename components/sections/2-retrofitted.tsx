'use client';

import { Lamp3DViewer } from '@/components/lamp-3d-viewer';
import { useCarouselKeyboard } from '@/hooks/use-carousel-keyboard';
import { useIsMobile } from '@/hooks/use-is-mobile';
import { shrikhand } from '@/lib/fonts';
import { ImageItem, Tab } from '@/types/project';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

const IMAGES: ImageItem[] = [
  { src: '/retrofitted/lamp-1.png', objectFit: 'contain' },
  { src: '/retrofitted/lamp-2.png', objectFit: 'contain' },
  { src: '/retrofitted/lamp-3.png', objectFit: 'contain' },
  { src: '/retrofitted/lamp-schematic.png', objectFit: 'contain', bg: '#ffc19dff' },
  { src: '/retrofitted/lamp-process.jpg', objectFit: 'cover' },
  { src: '/retrofitted/lamp-mood.jpg', objectFit: 'cover' },
  { src: '/retrofitted/lamp-mood-2.jpg', objectFit: 'cover' },
];

function RetrofittedTabs({
  tabs,
  onClose,
  activeTab,
  onTabChange,
}: {
  tabs: Tab[];
  onClose: () => void;
  activeTab: string;
  onTabChange: (tabId: string) => void;
}) {
  const handleTabChange = (tabId: string) => {
    onTabChange(tabId);
  };

  return (
    <div className='w-full h-full rounded-[32px] border border-orange-300/40 bg-orange-500/80 backdrop-blur-md shadow-lg'>
      {/* Tab Headers */}
      <div className='flex border-b border-orange-300/40'>
        <button
          onClick={onClose}
          className='relative cursor-pointer py-4 px-6 font-mono text-xl font-medium transition-all rounded-tr-[32px] bg-transparent text-white/80 hover:bg-orange-500/50'
        >
          ×
        </button>
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`relative cursor-pointer flex-1 py-4 px-4 font-mono text-sm md:text-base font-medium uppercase transition-all ${
              index === 0 ? 'rounded-tl-[32px]' : ''
            } ${
              activeTab === tab.id
                ? 'bg-orange-600 text-white rounded-t-[32px]'
                : 'bg-transparent text-white/80 hover:bg-orange-500/50 hover:rounded-t-[32px]'
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                layoutId='activeRetroTab'
                className='absolute inset-0 bg-orange-600 -z-10 rounded-t-[32px]'
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className='relative h-[calc(100%-4rem)] p-6 md:p-8 overflow-auto'>
        <AnimatePresence mode='wait'>
          {tabs.map(
            (tab) =>
              activeTab === tab.id && (
                <motion.div
                  key={tab.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className='font-mono text-sm md:text-base leading-relaxed text-white'
                >
                  {tab.content}
                </motion.div>
              )
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export function Project2() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedPanel, setExpandedPanel] = useState(false);
  const isMobile = useIsMobile(768);
  const [activeTab, setActiveTab] = useState<'infos' | 'process'>('infos');
  const [showThumbnails, setShowThumbnails] = useState(false);
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

  const handleTabChange = useCallback(
    (tabId: string) => {
      setActiveTab(tabId as 'infos' | 'process');
      if (tabId === 'infos') {
        navigateToPhoto(0);
      } else if (tabId === 'process') {
        navigateToPhoto(5);
      }
    },
    [navigateToPhoto]
  );

  const handlePrev = useCallback(() => {
    const totalItems = IMAGES.length + 1; // +1 for 3D viewer
    const newIndex = activeIndex > 0 ? activeIndex - 1 : totalItems - 1;
    navigateToPhoto(newIndex);
  }, [activeIndex, navigateToPhoto]);

  const handleNext = useCallback(() => {
    const totalItems = IMAGES.length + 1; // +1 for 3D viewer
    const newIndex = activeIndex < totalItems - 1 ? activeIndex + 1 : 0;
    navigateToPhoto(newIndex);
  }, [activeIndex, navigateToPhoto]);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const scrollLeft = scrollRef.current.scrollLeft;
        const width = scrollRef.current.offsetWidth;
        const newIndex = Math.round(scrollLeft / width);

        setActiveIndex((prevIndex) => {
          // Only update thumbnails if index actually changed
          if (prevIndex !== newIndex) {
            if (newIndex === 0) {
              // Navigated to 3D viewer - close thumbnails
              setShowThumbnails(false);
            } else if (prevIndex === 0 && !isMobile) {
              // Navigated from 3D to photo on desktop - open thumbnails
              setShowThumbnails(true);
            }
          }
          return newIndex;
        });
      }
    };

    const scrollEl = scrollRef.current;
    scrollEl?.addEventListener('scroll', handleScroll);
    return () => scrollEl?.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  useCarouselKeyboard(handlePrev, handleNext);

  const tabs = useMemo(
    () => [
      {
        id: 'infos',
        label: 'INFOS',
        content: (
          <div className='space-y-6'>
            <div>
              <h3 className='text-lg font-bold uppercase border-b border-orange-300/40 pb-2'>Project Details</h3>
              <p className='mt-4'>
                A stunning space-age lamp from the 1970s, retrofitted with modern technology including a rechargable
                battery and a USB-C connector and a stepless dimmer, while preserving its iconic aesthetic.
              </p>
              <div className='grid grid-cols-2 gap-4 pt-4'>
                <div>
                  <span className='font-bold block'>TYPE:</span>
                  <span>Lighting Design</span>
                </div>
                <div>
                  <span className='font-bold block'>YEAR:</span>
                  <span>2025</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className='text-lg font-bold uppercase border-b border-orange-300/40 pb-2 mt-6'>Specifications</h3>
              <ul className='space-y-2 list-none mt-4'>
                <li className='border-l-2 border-orange-300 pl-4'>
                  <span className='font-bold'>STYLE:</span> Space Age / Atomic Era
                </li>
                <li className='border-l-2 border-orange-300 pl-4'>
                  <span className='font-bold'>LIGHTING:</span> Modern LED Retrofit
                </li>
                <li className='border-l-2 border-orange-300 pl-4'>
                  <span className='font-bold'>MATERIALS:</span> Acrylic & Metal
                </li>
                <li className='border-l-2 border-orange-300 pl-4'>
                  <span className='font-bold'>CONDITION:</span> Restored & Updated
                </li>
              </ul>
            </div>
            <div>
              <h3 className='text-lg font-bold uppercase border-b border-orange-300/40 pb-2 mt-6'>Credits</h3>
              <div className='space-y-3 mt-4'>
                <div>
                  <span className='font-bold block uppercase text-xs tracking-wider'>Restoration</span>
                  <span>Till Solenthaler</span>
                </div>
                <div>
                  <span className='font-bold block uppercase text-xs tracking-wider'>Photography</span>
                  <span>Till Solenthaler</span>
                </div>
                <div>
                  <span className='font-bold block uppercase text-xs tracking-wider'>Year</span>
                  <span>2024</span>
                </div>
              </div>
            </div>
          </div>
        ),
      },
      {
        id: 'process',
        label: 'PROCESS',
        content: (
          <div className='space-y-4'>
            <h3 className='text-lg font-bold uppercase border-b border-orange-300/40 pb-2'>Restoration Process</h3>
            <div className='space-y-3'>
              <button
                onClick={() => navigateToPhoto(5)}
                className='w-full cursor-pointer bg-orange-600/30 p-3 border-l-2 border-orange-300 rounded-lg hover:bg-orange-600/50 transition-colors text-left flex items-center gap-3'
              >
                {IMAGES[4] && (
                  <div
                    className={`relative w-16 h-16 flex-shrink-0 rounded overflow-hidden ${
                      activeIndex === 5 ? 'ring-4 ring-orange-300' : 'ring-1 ring-orange-300/40'
                    }`}
                  >
                    <Image src={IMAGES[4].src} alt='Sourcing step' fill className='object-cover' />
                  </div>
                )}
                <div className='flex-1'>
                  <span className='font-bold block'>01. SOURCING</span>
                  <span className='text-sm'>Finding authentic 70s piece</span>
                </div>
              </button>
              <button
                onClick={() => navigateToPhoto(6)}
                className='w-full cursor-pointer bg-orange-600/30 p-3 border-l-2 border-orange-300 rounded-lg hover:bg-orange-600/50 transition-colors text-left flex items-center gap-3'
              >
                {IMAGES[5] && (
                  <div
                    className={`relative w-16 h-16 flex-shrink-0 rounded overflow-hidden ${
                      activeIndex === 6 ? 'ring-4 ring-orange-300' : 'ring-1 ring-orange-300/40'
                    }`}
                  >
                    <Image src={IMAGES[5].src} alt='Restoration step' fill className='object-cover' />
                  </div>
                )}
                <div className='flex-1'>
                  <span className='font-bold block'>02. RESTORATION</span>
                  <span className='text-sm'>Cleaning and repair work</span>
                </div>
              </button>
              <button
                onClick={() => navigateToPhoto(7)}
                className='w-full cursor-pointer bg-orange-600/30 p-3 border-l-2 border-orange-300 rounded-lg hover:bg-orange-600/50 transition-colors text-left flex items-center gap-3'
              >
                {IMAGES[6] && (
                  <div
                    className={`relative w-16 h-16 flex-shrink-0 rounded overflow-hidden ${
                      activeIndex === 7 ? 'ring-4 ring-orange-300' : 'ring-1 ring-orange-300/40'
                    }`}
                  >
                    <Image src={IMAGES[6].src} alt='Modernization step' fill className='object-cover' />
                  </div>
                )}
                <div className='flex-1'>
                  <span className='font-bold block'>03. MODERNIZATION</span>
                  <span className='text-sm'>LED retrofit installation</span>
                </div>
              </button>
            </div>
          </div>
        ),
      },
    ],
    [navigateToPhoto, activeIndex]
  );

  return (
    <section className='h-screen relative overflow-hidden pt-28 md:pt-42 px-4 md:px-8 flex flex-col items-center'>
      {/* Title */}
      <div className='absolute top-24 md:bottom-28 md:top-auto left-0 right-0 md:left-8 md:right-auto flex justify-center md:justify-start pointer-events-none z-10'>
        <h2
          className={`text-5xl lg:text-7xl font-bold text-white text-center mix-blend-difference ${shrikhand.className}`}
        >
          retrofitted
        </h2>
      </div>

      {/* Scrolling Photos - Full Width */}
      <div
        ref={scrollRef}
        className='absolute inset-0 top-0 overflow-x-auto overflow-y-hidden snap-x snap-mandatory flex scrollbar-hide'
      >
        {/* First item: 3D Lamp Viewer */}
        <div className='h-full min-w-full snap-center flex items-center justify-center relative'>
          <div className='w-full h-full'>
            <Lamp3DViewer />
          </div>
        </div>

        {/* Rest of the images */}
        {IMAGES.map((image, index) => (
          <div
            key={image.src}
            className={`h-full min-w-full snap-center flex items-center justify-center relative`}
            style={image.bg ? { backgroundColor: image.bg } : undefined}
          >
            <Image
              src={image.src}
              alt={`Retrofitted ${index + 1}`}
              fill
              className={`${image.objectFit === 'contain' ? 'object-contain p-8' : 'object-cover'}`}
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
          className='hidden cursor-pointer lg:flex items-center justify-center w-12 h-12 rounded-full border border-orange-300/40 bg-orange-500/80 backdrop-blur-md hover:bg-orange-600/80 transition-colors pointer-events-auto group'
          aria-label='Previous photo'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={2}
            stroke='currentColor'
            className='w-6 h-6 text-white/60 group-hover:text-white transition-colors'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
          </svg>
        </button>
        <button
          onClick={handleNext}
          className='hidden cursor-pointer lg:flex items-center justify-center w-12 h-12 rounded-full border border-orange-300/40 bg-orange-500/80 backdrop-blur-md hover:bg-orange-600/80 transition-colors pointer-events-auto group'
          aria-label='Next photo'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={2}
            stroke='currentColor'
            className='w-6 h-6 text-white/60 group-hover:text-white transition-colors'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
          </svg>
        </button>
      </div>

      {/* Album Controls - Bottom Left */}
      <div className='absolute bottom-4 md:bottom-8 left-4 md:left-8 z-20 pointer-events-auto flex flex-col md:flex-row items-start md:items-end gap-2'>
        {/* Thumbnails - Vertical on mobile, Horizontal on desktop */}
        <AnimatePresence>
          {showThumbnails && (
            <motion.div
              initial={{ opacity: 0, x: isMobile ? 0 : 20, y: isMobile ? 20 : 0 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, x: isMobile ? 0 : 20, y: isMobile ? 20 : 0 }}
              transition={{ duration: 0.3 }}
              className='order-first md:order-last flex flex-col md:flex-row gap-2 max-h-[calc(100vh-16rem)] md:max-h-none md:max-w-[calc(100vw-16rem)] overflow-y-auto md:overflow-y-visible md:overflow-x-auto scrollbar-hide p-1'
            >
              {IMAGES.map((image, index) => (
                <button
                  key={index}
                  onClick={() => {
                    navigateToPhoto(index + 1);
                    if (!isMobile) {
                      // Keep thumbnails open on desktop
                    } else {
                      setShowThumbnails(false);
                    }
                  }}
                  className={`relative cursor-pointer overflow-hidden transition-all flex-shrink-0 w-16 h-16 rounded-full border border-orange-300/40 bg-orange-500/20 backdrop-blur-sm hover:bg-orange-600/30 ${
                    activeIndex === index + 1 ? 'ring-2 ring-orange-300/60' : ''
                  }`}
                >
                  <Image src={image.src} alt={`Thumbnail ${index + 1}`} fill className='object-cover rounded-full' />
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Control Buttons Row */}
        <div className='flex gap-2'>
          {/* Album/Photos Button - First on mobile */}
          <button
            onClick={() => setShowThumbnails(!showThumbnails)}
            className={`md:order-2 relative cursor-pointer transition-all flex-shrink-0 w-16 h-16 rounded-full border border-orange-300/40 bg-orange-500/80 backdrop-blur-md hover:bg-orange-600/80 flex items-center justify-center ${
              showThumbnails ? 'ring-2 ring-orange-300/60' : ''
            }`}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='28'
              height='28'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='text-white'
            >
              <rect x='3' y='3' width='18' height='18' rx='2' ry='2' />
              <circle cx='8.5' cy='8.5' r='1.5' />
              <polyline points='21 15 16 10 5 21' />
            </svg>
          </button>

          {/* 3D Button - Second on mobile */}
          <button
            onClick={() => {
              navigateToPhoto(0);
              setShowThumbnails(false);
            }}
            className={`md:order-1 relative cursor-pointer transition-all flex-shrink-0 w-16 h-16 rounded-full border border-orange-300/40 bg-orange-500/80 backdrop-blur-md hover:bg-orange-600/80 flex items-center justify-center ${
              activeIndex === 0 ? 'ring-2 ring-orange-300/60' : ''
            }`}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='28'
              height='28'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='text-white'
            >
              <path d='M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z' />
              <polyline points='3.27 6.96 12 12.01 20.73 6.96' />
              <line x1='12' y1='22.08' x2='12' y2='12' />
            </svg>
          </button>
        </div>
      </div>

      {/* Info Panel - Expandable */}
      <div className='absolute inset-0 mx-0 pointer-events-none z-20'>
        <motion.div
          className='absolute right-4 bottom-4 md:right-8 md:bottom-8 pointer-events-auto w-36 h-36 lg:w-48 lg:h-48'
          animate={{
            width: expandedPanel ? (isMobile ? 'calc(100vw - 2rem)' : 'calc(50vw - 2rem)') : undefined,
            height: expandedPanel ? (isMobile ? 'calc(100vh - 7rem)' : 'calc(100vh - 10rem)') : undefined,
            top: expandedPanel ? (isMobile ? '6rem' : '8rem') : undefined,
            bottom: expandedPanel ? 'auto' : undefined,
          }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        >
          {!expandedPanel ? (
            <div className='w-full h-full relative rounded-[32px] bg-orange-500/80 backdrop-blur-md overflow-hidden'>
              <button
                onClick={() => setExpandedPanel(true)}
                className='absolute cursor-pointer top-4 left-4 w-8 h-8 rounded-full border border-orange-300/40 bg-orange-500/80 backdrop-blur-md hover:bg-orange-600/80 flex items-center justify-center transition-colors z-10 font-mono text-white'
              >
                i
              </button>
              <Image
                src='/retrofitted/lamp-1.png'
                alt='Lamp'
                fill
                className='object-cover cursor-pointer rounded-[32px]'
                onClick={() => setExpandedPanel(true)}
              />
            </div>
          ) : (
            <div className='w-full h-full relative rounded-[32px] overflow-hidden'>
              <RetrofittedTabs
                tabs={tabs}
                onClose={() => setExpandedPanel(false)}
                activeTab={activeTab}
                onTabChange={handleTabChange}
              />
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
