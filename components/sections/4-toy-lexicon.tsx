'use client';

import { dinNext } from '@/lib/fonts';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';

type ImageItem = {
  src: string;
  objectFit: 'cover' | 'contain';
};

const IMAGES: ImageItem[] = [
  { src: '/toy-lexicon/front-mockup.png', objectFit: 'contain' },
  { src: '/toy-lexicon/cover.jpg', objectFit: 'cover' },
];

const TABS = [
  {
    id: 'info',
    label: 'INFO',
    content: (
      <div className='space-y-6'>
        <div>
          <h3 className='text-lg font-bold uppercase border-b border-green-500/40 pb-2'>Project Details</h3>
          <p className='mt-4'>
            A book on visual exploration of the broad variety of kids construction kits from the last 100 years. My
            fathers hobby has been collecting and building with old construction kids for a long time. Now with two
            friends of his, he photographed all his work and i made it into a book.
          </p>
          <div className='grid grid-cols-2 gap-4 pt-4'>
            <div>
              <span className='font-bold block'>TYPE:</span>
              <span>Book Design</span>
            </div>
            <div>
              <span className='font-bold block'>YEAR:</span>
              <span>2024</span>
            </div>
          </div>
        </div>
        <div>
          <h3 className='text-lg font-bold uppercase border-b border-green-500/40 pb-2 mt-6'>Specifications</h3>
          <ul className='space-y-2 list-none mt-4'>
            <li className='border-l-2 border-green-500 pl-4'>
              <span className='font-bold'>FORMAT:</span> Hardcover Book
            </li>
            <li className='border-l-2 border-green-500 pl-4'>
              <span className='font-bold'>PAGES:</span> 120+
            </li>
            <li className='border-l-2 border-green-500 pl-4'>
              <span className='font-bold'>PHOTOGRAPHY:</span> High Quality
            </li>
            <li className='border-l-2 border-green-500 pl-4'>
              <span className='font-bold'>LAYOUT:</span> Custom Design
            </li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: 'process',
    label: 'PROCESS',
    content: (
      <div className='space-y-4'>
        <h3 className='text-lg font-bold uppercase border-b border-green-500/40 pb-2'>Creation Process</h3>
        <div className='space-y-3'>
          <div className='bg-green-500/10 p-3 border-l-2 border-green-500'>
            <span className='font-bold block'>01. COLLECTION</span>
            <span className='text-sm'>Curating childhood objects</span>
          </div>
          <div className='bg-green-500/10 p-3 border-l-2 border-green-500'>
            <span className='font-bold block'>02. PHOTOGRAPHY</span>
            <span className='text-sm'>Professional documentation</span>
          </div>
          <div className='bg-green-500/10 p-3 border-l-2 border-green-500'>
            <span className='font-bold block'>03. DESIGN</span>
            <span className='text-sm'>Book layout and typesetting</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'credits',
    label: 'CREDITS',
    content: (
      <div className='space-y-4'>
        <h3 className='text-lg font-bold uppercase border-b border-green-500/40 pb-2'>Credits</h3>
        <div className='space-y-3'>
          <div>
            <span className='font-bold block uppercase text-xs tracking-wider'>Photography</span>
            <span>Till Solenthaler</span>
          </div>
          <div>
            <span className='font-bold block uppercase text-xs tracking-wider'>Design</span>
            <span>Till Solenthaler</span>
          </div>
          <div>
            <span className='font-bold block uppercase text-xs tracking-wider'>Year</span>
            <span>2024</span>
          </div>
        </div>
      </div>
    ),
  },
];

function ToyLexiconTabs({ tabs, onClose }: { tabs: typeof TABS; onClose: () => void }) {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <div className='w-full h-full rounded-lg bg-green-500/10 border-2 border-green-500/40 backdrop-blur-md flex flex-col p-6 md:p-8'>
      {/* Close button and Tab Headers */}
      <div className='flex gap-2 mb-6'>
        <button
          onClick={onClose}
          className='cursor-pointer w-8 h-8 rounded-full font-medium text-lg transition-colors bg-transparent text-foreground border border-green-500/40 hover:bg-green-500/10 flex items-center justify-center flex-shrink-0'
        >
          ×
        </button>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative cursor-pointer py-2 px-4 rounded-full font-medium text-sm uppercase transition-colors ${
              activeTab === tab.id
                ? 'bg-green-500 text-white'
                : 'bg-transparent text-foreground border border-green-500/40 hover:bg-green-500/10'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className='flex-1 overflow-y-auto overflow-x-hidden'>
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
                  className='text-sm md:text-base leading-relaxed'
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

export function Project4() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedPanel, setExpandedPanel] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

  return (
    <section
      className={`h-screen relative overflow-hidden pt-32 md:pt-42 px-4 md:px-8 flex flex-col items-center ${dinNext.className}`}
    >
      {/* Title */}
      <div className='absolute inset-x-0 top-32 md:top-42 flex justify-center pointer-events-none z-10'>
        <div className='max-w-screen-2xl mx-0 w-full flex justify-center'>
          <h2
            className={`text-5xl lg:text-7xl uppercase font-bold text-black mix-blend-difference ${dinNext.className}`}
          >
            toy lexicon
          </h2>
        </div>
      </div>

      {/* Scrolling Photos - Full Width */}
      <div
        ref={scrollRef}
        className='absolute inset-0 top-0 overflow-x-auto overflow-y-hidden snap-x snap-mandatory flex scrollbar-hide'
      >
        {IMAGES.map((image, index) => (
          <div key={image.src} className={`h-full min-w-full snap-center flex items-center justify-center relative `}>
            <Image
              src={image.src}
              alt={`Toy Lexicon ${index + 1}`}
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
          className='hidden cursor-pointer lg:flex items-center justify-center w-12 h-12 rounded-full bg-green-500/10 border-2 border-green-500/40 backdrop-blur-md hover:bg-green-500/20 transition-colors pointer-events-auto'
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
          className='hidden cursor-pointer lg:flex items-center justify-center w-12 h-12 rounded-full bg-green-500/10 border-2 border-green-500/40 backdrop-blur-md hover:bg-green-500/20 transition-colors pointer-events-auto'
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
      <div className='absolute bottom-8 left-8 right-8 flex gap-2 justify-start overflow-x-auto scrollbar-hide z-20 pointer-events-auto'>
        {IMAGES.map((image, index) => (
          <button
            key={index}
            onClick={() => navigateToPhoto(index)}
            className={`relative cursor-pointer overflow-hidden transition-all flex-shrink-0 w-16 h-16 rounded-lg border ${
              activeIndex === index
                ? 'border-2 border-green-500 opacity-100'
                : 'border border-green-500/40 opacity-60 hover:opacity-100'
            }`}
          >
            <Image src={image.src} alt={`Thumbnail ${index + 1}`} fill className='object-cover' />
          </button>
        ))}
      </div>

      {/* Info Panel - Expandable */}
      <div className='absolute inset-0 mx-0 pointer-events-none z-20'>
        <motion.div
          className='absolute right-4 bottom-4 md:right-8 md:bottom-8 pointer-events-auto w-36 h-36 lg:w-48 lg:h-48'
          animate={{
            width: expandedPanel ? (isMobile ? 'calc(100vw - 2rem)' : 'calc(50vw - 2rem)') : undefined,
            height: expandedPanel ? 'calc(100vh - 10rem)' : undefined,
            top: expandedPanel ? '8rem' : undefined,
            bottom: expandedPanel ? 'auto' : undefined,
          }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        >
          {!expandedPanel ? (
            <div className='w-full h-full relative rounded-lg bg-green-500/10 border-2 border-green-500/40 backdrop-blur-md overflow-hidden'>
              <button
                onClick={() => setExpandedPanel(true)}
                className='absolute cursor-pointer top-4 left-4 w-8 h-8 rounded-full bg-green-500/10 border-2 border-green-500/40 hover:bg-green-500/20 flex items-center justify-center transition-colors z-10 font-mono'
              >
                i
              </button>
              <Image
                src='/toy-lexicon/front-mockup.png'
                alt='Toy Lexicon Cover'
                fill
                className='object-cover cursor-pointer rounded-lg'
                onClick={() => setExpandedPanel(true)}
              />
            </div>
          ) : (
            <div className='w-full h-full relative overflow-hidden'>
              <ToyLexiconTabs tabs={TABS} onClose={() => setExpandedPanel(false)} />
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
