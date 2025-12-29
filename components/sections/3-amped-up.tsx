'use client';

import { useIsMobile } from '@/hooks/use-is-mobile';
import { vt323 } from '@/lib/fonts';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

type ImageItem = {
  src: string;
  objectFit: 'cover' | 'contain';
};

const IMAGES: ImageItem[] = [
  { src: '/amped-up/preview.jpg', objectFit: 'cover' },
  { src: '/amped-up/speaker-1.jpg', objectFit: 'contain' },
  { src: '/amped-up/speaker-3.jpg', objectFit: 'contain' },
  { src: '/amped-up/speaker-4.jpg', objectFit: 'cover' },
  { src: '/amped-up/speaker-5.jpg', objectFit: 'contain' },
  { src: '/amped-up/speaker-6.jpg', objectFit: 'contain' },
  { src: '/amped-up/speaker-7.jpg', objectFit: 'cover' },
  { src: '/amped-up/speaker-8.jpg', objectFit: 'cover' },
  { src: '/amped-up/speaker-9.jpg', objectFit: 'cover' },
  { src: '/amped-up/speaker-schematic.jpg', objectFit: 'contain' },
];

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

function AmpedUpTabs({
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
    <div className='w-full h-full border border-black/60 bg-background/90 backdrop-blur-md'>
      {/* Tab Headers */}
      <div className='flex border-b border-black/60'>
        <button
          onClick={onClose}
          className='relative cursor-pointer py-4 px-6 font-mono text-xl font-medium transition-colors border-r border-black/60 bg-transparent text-foreground hover:bg-foreground/5'
        >
          ×
        </button>
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`relative cursor-pointer flex-1 py-4 px-4 font-mono text-sm md:text-base font-medium uppercase transition-colors ${
              index < tabs.length - 1 ? 'border-r border-black/60' : ''
            } ${
              activeTab === tab.id
                ? 'bg-foreground text-background'
                : 'bg-transparent text-foreground hover:bg-foreground/5'
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                layoutId='activeAmpedTab'
                className='absolute inset-0 bg-foreground -z-10'
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className='relative min-h-[300px] md:min-h-[400px] p-6 md:p-8 overflow-auto'>
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
                  className='font-mono text-sm md:text-base leading-relaxed'
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

export function Project3() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedPanel, setExpandedPanel] = useState(false);
  const isMobile = useIsMobile(768);
  const [activeTab, setActiveTab] = useState<'infos' | 'process'>('infos');
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
        navigateToPhoto(6);
      }
    },
    [navigateToPhoto]
  );

  const handlePrev = useCallback(() => {
    const newIndex = activeIndex > 0 ? activeIndex - 1 : IMAGES.length - 1;
    navigateToPhoto(newIndex);
  }, [activeIndex, navigateToPhoto]);

  const handleNext = useCallback(() => {
    const newIndex = activeIndex < IMAGES.length - 1 ? activeIndex + 1 : 0;
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

  const tabs = useMemo(
    () => [
      {
        id: 'infos',
        label: 'INFOS',
        content: (
          <div className='space-y-6'>
            <div>
              <h3 className='text-lg font-bold uppercase border-b border-black/60 pb-2'>Project Details</h3>
              <p className='mt-4'>
                An old Klein+Hummel speaker where i replaced the analogue amplifier with a digital one. This enables new
                functionality like EQ / DSP / and Bluetooth.
              </p>
              <div className='grid grid-cols-2 gap-4 pt-4'>
                <div>
                  <span className='font-bold block'>TYPE:</span>
                  <span>Audio Hardware</span>
                </div>
                <div>
                  <span className='font-bold block'>YEAR:</span>
                  <span>2024</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className='text-lg font-bold uppercase border-b border-black/60 pb-2 mt-6'>Specifications</h3>
              <ul className='space-y-2 list-none mt-4'>
                <li className='border-l-2 border-foreground pl-4'>
                  <span className='font-bold'>DRIVERS:</span> Custom Selected
                </li>
                <li className='border-l-2 border-foreground pl-4'>
                  <span className='font-bold'>ENCLOSURE:</span> Wooden Cabinet
                </li>
                <li className='border-l-2 border-foreground pl-4'>
                  <span className='font-bold'>FINISH:</span> Natural Wood
                </li>
                <li className='border-l-2 border-foreground pl-4'>
                  <span className='font-bold'>OUTPUT:</span> High Fidelity
                </li>
              </ul>
            </div>
            <div>
              <h3 className='text-lg font-bold uppercase border-b border-black/60 pb-2 mt-6'>Credits</h3>
              <div className='space-y-3 mt-4'>
                <div>
                  <span className='font-bold block uppercase text-xs tracking-wider'>Design & Build</span>
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
            <h3 className='text-lg font-bold uppercase border-b border-black/60 pb-2'>Build Process</h3>
            <div className='space-y-3'>
              <button
                onClick={() => navigateToPhoto(6)}
                className='w-full cursor-pointer bg-neutral-100 p-3 border-l-2 border-foreground hover:bg-neutral-200 transition-colors text-left flex items-center gap-3'
              >
                {IMAGES[6] && (
                  <div
                    className={`relative w-16 h-16 flex-shrink-0 rounded overflow-hidden ${
                      activeIndex === 6 ? 'ring-4 ring-foreground' : 'ring-1 ring-foreground/20'
                    }`}
                  >
                    <Image src={IMAGES[6].src} alt='Design step' fill className='object-cover' />
                  </div>
                )}
                <div className='flex-1'>
                  <span className='font-bold block'>01. DESIGN</span>
                  <span className='text-sm'>Enclosure planning and measurements</span>
                </div>
              </button>
              <button
                onClick={() => navigateToPhoto(7)}
                className='w-full cursor-pointer bg-neutral-100 p-3 border-l-2 border-foreground hover:bg-neutral-200 transition-colors text-left flex items-center gap-3'
              >
                {IMAGES[7] && (
                  <div
                    className={`relative w-16 h-16 flex-shrink-0 rounded overflow-hidden ${
                      activeIndex === 7 ? 'ring-4 ring-foreground' : 'ring-1 ring-foreground/20'
                    }`}
                  >
                    <Image src={IMAGES[7].src} alt='Build step' fill className='object-cover' />
                  </div>
                )}
                <div className='flex-1'>
                  <span className='font-bold block'>02. BUILD</span>
                  <span className='text-sm'>Woodworking and assembly</span>
                </div>
              </button>
              <button
                onClick={() => navigateToPhoto(8)}
                className='w-full cursor-pointer bg-neutral-100 p-3 border-l-2 border-foreground hover:bg-neutral-200 transition-colors text-left flex items-center gap-3'
              >
                {IMAGES[8] && (
                  <div
                    className={`relative w-16 h-16 flex-shrink-0 rounded overflow-hidden ${
                      activeIndex === 8 ? 'ring-4 ring-foreground' : 'ring-1 ring-foreground/20'
                    }`}
                  >
                    <Image src={IMAGES[8].src} alt='Tune step' fill className='object-cover' />
                  </div>
                )}
                <div className='flex-1'>
                  <span className='font-bold block'>03. TUNE</span>
                  <span className='text-sm'>Audio calibration and testing</span>
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
    <section className='h-screen relative overflow-hidden pt-32 md:pt-42 px-4 md:px-8 flex flex-col items-center'>
      {/* Title */}
      <AnimatePresence>
        {activeIndex !== 9 && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className='absolute inset-x-0 top-32 md:top-42 flex justify-center pointer-events-none z-10'
          >
            <div className='max-w-screen-2xl mx-0 w-full flex justify-center'>
              <h2 className={`text-6xl lg:text-8xl font-bold text-white mix-blend-difference ${vt323.className}`}>
                amped up
              </h2>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scrolling Photos - Full Width */}
      <div
        ref={scrollRef}
        className='absolute inset-0 top-0 overflow-x-auto overflow-y-hidden snap-x snap-mandatory flex scrollbar-hide'
      >
        {IMAGES.map((image, index) => (
          <div key={image.src} className={`h-full min-w-full snap-center flex items-center justify-center relative `}>
            <Image
              src={image.src}
              alt={`Amped Up ${index + 1}`}
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
          className='hidden cursor-pointer lg:flex items-center justify-center w-12 h-12 border border-black/60 bg-background/90 backdrop-blur-md hover:bg-foreground/5 transition-colors pointer-events-auto'
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
          className='hidden cursor-pointer lg:flex items-center justify-center w-12 h-12 border border-black/60 bg-background/90 backdrop-blur-md hover:bg-foreground/5 transition-colors pointer-events-auto'
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

      {/* Thumbnail Strip - Bottom */}
      <div className='absolute bottom-4 md:bottom-8 left-0 md:left-8 right-0 flex gap-2 justify-start overflow-x-auto px-4 md:pr-8 z-20 pointer-events-auto'>
        {IMAGES.map((image, index) => (
          <button
            key={index}
            onClick={() => navigateToPhoto(index)}
            className={`relative cursor-pointer overflow-hidden transition-all flex-shrink-0 w-36 h-36 md:w-16 md:h-16 border ${
              activeIndex === index
                ? 'border-2 border-black opacity-100'
                : 'border-black/60 opacity-60 hover:opacity-100'
            }`}
          >
            <Image src={image.src} alt={`Thumbnail ${index + 1}`} fill className='object-cover' />
          </button>
        ))}
        {/* Hidden spacer item */}
        <div className='flex-shrink-0 w-36 h-36 md:w-16 md:h-16 opacity-0 pointer-events-none' />
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
            <div className='w-full h-full relative border border-black/60 bg-background/90 backdrop-blur-md overflow-hidden'>
              <button
                onClick={() => setExpandedPanel(true)}
                className='absolute cursor-pointer top-4 left-4 w-8 h-8 border border-black/60 bg-background/80 hover:bg-foreground/5 flex items-center justify-center transition-colors z-10 font-mono'
              >
                i
              </button>
              <Image
                src='/amped-up/speaker-2.jpg'
                alt='Speaker'
                fill
                className='object-cover cursor-pointer'
                onClick={() => setExpandedPanel(true)}
              />
            </div>
          ) : (
            <div className='w-full h-full relative overflow-hidden'>
              <AmpedUpTabs
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
