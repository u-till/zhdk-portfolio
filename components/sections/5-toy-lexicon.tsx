'use client';

import { useCarouselKeyboard } from '@/hooks/use-carousel-keyboard';
import { useCarouselScroll } from '@/hooks/use-carousel-scroll';
import { useIsMobile } from '@/hooks/use-is-mobile';
import { dinNext } from '@/lib/fonts';
import { ImageItem, Tab } from '@/types/project';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useCallback, useMemo, useRef, useState } from 'react';

const GALLERY_IMAGES: ImageItem[] = [
  { src: '/toy-lexicon/mockup-1.png', objectFit: 'contain' },
  { src: '/toy-lexicon/mockup-2.png', objectFit: 'contain', hideTitle: true },
  { src: '/toy-lexicon/mockup-3.png', objectFit: 'contain', hideTitle: true },
  { src: '/toy-lexicon/mockup-4.png', objectFit: 'contain', hideTitle: true },
  { src: '/toy-lexicon/mockup-5.png', objectFit: 'contain', hideTitle: true },
  { src: '/toy-lexicon/macbook-mockup-1.png', objectFit: 'contain', hideTitle: true },
  { src: '/toy-lexicon/macbook-mockup-2.png', objectFit: 'contain', hideTitle: true },
];

const PROCESS_IMAGES: ImageItem[] = [
  { src: '/toy-lexicon/book-process-1.jpg', objectFit: 'cover', hideTitle: true },
  { src: '/toy-lexicon/book-process-2.jpg', objectFit: 'cover', hideTitle: true },
  { src: '/toy-lexicon/book-process-3.jpg', objectFit: 'cover', hideTitle: true },
  { src: '/toy-lexicon/book-process-4.jpg', objectFit: 'cover', hideTitle: true },
];

const PROCESS_STEPS = [
  {
    imageIndex: 0,
    title: '01. COVER DESIGN',
    text: 'I started this project by designing the cover of the book, experimenting with different layouts and typography. This would then set the tone for the rest of the book. I defined a grid system, which would help to create a consistent layout throughout the book.',
  },
  {
    imageIndex: 1,
    title: '02. RESEARCH AND CATALOGING',
    text: 'My father provided me with some other books on construction kits, which i used for inspiration. I also created a database of all the kits, including information such as the manufacturer, country and title as a JSON file to later programmatically import into InDesign. Thats when i noticed that a lot of the data was missing or incomplete.',
  },
  {
    imageIndex: 2,
    title: '03. CMS FOR CONTENT',
    text: 'I realized that going over the content and completing it would be a challenge as my father is not very tech-savvy. So I built a custom CMS that would allow him and his two friends to easily add, edit, and organize the content of the book without any technical knowledge.',
  },
  {
    imageIndex: 3,
    title: '04. INDESIGN AUTOMATION',
    text: 'I developed an InDesign ExtendScript that would automatically layout the content from the JSON database into InDesign, using a template that has labeled fields for each data point. This allows me to quickly generate a consistent and professional-looking layout which then can be refined and adjusted.',
  },
];

function ToyLexiconTabs({
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
    <div className='w-full h-full rounded-lg bg-white/95 border-2 border-green-500/60 backdrop-blur-md flex flex-col p-6 md:p-8'>
      {/* Close button and Tab Headers */}
      <div className='flex gap-2 mb-6'>
        <button
          onClick={onClose}
          className='cursor-pointer py-2 px-4 rounded-full font-medium text-lg transition-colors bg-white/90 text-foreground border border-green-500/60 hover:bg-green-500/20 flex items-center justify-center flex-shrink-0'
        >
          ×
        </button>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`relative cursor-pointer py-2 px-4 rounded-full font-medium text-sm uppercase transition-colors ${
              activeTab === tab.id
                ? 'bg-green-500 text-white'
                : 'bg-white/90 text-foreground border border-green-500/60 hover:bg-green-500/20'
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

export function Project5() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedPanel, setExpandedPanel] = useState(false);
  const isMobile = useIsMobile(768);
  const [activeTab, setActiveTab] = useState<'infos' | 'process'>('infos');
  const scrollRef = useRef<HTMLDivElement>(null);

  const navigateToPhoto = useCallback((imageIndex: number) => {
    if (scrollRef.current) {
      const width = scrollRef.current.offsetWidth;
      scrollRef.current.scrollTo({
        left: width * imageIndex,
        behavior: 'smooth',
      });
    }
  }, []);

  const handleTabChange = useCallback(
    (tabId: string) => {
      if (tabId !== activeTab) {
        setActiveTab(tabId as 'infos' | 'process');
        navigateToPhoto(0);
      }
    },
    [navigateToPhoto, activeTab]
  );

  const activeImages = activeTab === 'infos' ? GALLERY_IMAGES : PROCESS_IMAGES;

  const handlePrev = useCallback(() => {
    const newIndex = activeIndex > 0 ? activeIndex - 1 : activeImages.length - 1;
    navigateToPhoto(newIndex);
  }, [activeIndex, navigateToPhoto, activeImages.length]);

  const handleNext = useCallback(() => {
    const newIndex = activeIndex < activeImages.length - 1 ? activeIndex + 1 : 0;
    navigateToPhoto(newIndex);
  }, [activeIndex, navigateToPhoto, activeImages.length]);

  useCarouselScroll(scrollRef, setActiveIndex);
  useCarouselKeyboard(handlePrev, handleNext);

  const tabs = useMemo(
    () => [
      {
        id: 'infos',
        label: 'INFOS',
        content: (
          <div className='space-y-6'>
            <div>
              <h3 className='text-lg font-bold uppercase border-b border-green-500/40 pb-2'>Brief</h3>
              <p className='mt-4'>
                A book on visual exploration of the broad variety of construction kits from the last 100 years. My
                fathers hobby has been collecting and building with old construction kits for a long time. Now with two
                friends of his, he photographed all his work and asked me if i can help him make it into a book.
                <br />
                <br />
                This turned out to be way harder than excpected because the objects have been photographed over a long
                timespan, so some images where missing and other infos as well. Because my dad is not very good with
                computers, i created a custom website where we could work together to complete the data into one central
                JSON database.
                <br />
                <br />
                With this JSON database ready, I then created an InDesign ExtendScript that would automatically layout
                all the content into InDesign, following the grid system and styles defined earlier.
              </p>
            </div>
            <div>
              <h3 className='text-lg font-bold uppercase border-b border-green-500/40 pb-2 mt-6'>Specifications</h3>
              <ul className='space-y-2 list-none mt-4'>
                <li className='border-l-2 border-green-500 pl-4'>
                  <span className='font-bold'>YEAR:</span> 2025-Ongoing
                </li>
                <li className='border-l-2 border-green-500 pl-4'>
                  <span className='font-bold'>FOR:</span> My father
                </li>
                <li className='border-l-2 border-green-500 pl-4'>
                  <span className='font-bold'>TYPE:</span> Book Layout /
                  <a href='https://adb-cms.vercel.app/' target='_blank' className='ml-1 underline underline-offset-2'>
                    Web App
                  </a>{' '}
                  [user: guest | password: guest]
                </li>
                <li className='border-l-2 border-green-500 pl-4'>
                  <span className='font-bold'>FORMAT:</span> Hardcover Book, 120+ pages
                </li>
              </ul>
            </div>
            <div>
              <h3 className='text-lg font-bold uppercase border-b border-green-500/40 pb-2 mt-6'>Idea</h3>
              <p className='mt-4'>
                My father has been collecting and building with old construction kits for decades. When he asked me to
                help turn his collection into a book, I saw an opportunity to combine my design skills with his passion
                project.
              </p>
            </div>
            <div>
              <h3 className='text-lg font-bold uppercase border-b border-green-500/40 pb-2 mt-6'>
                Learnings & Improvements
              </h3>
              <div className='space-y-3 mt-4'>
                <ul className='list-disc list-inside'>
                  <li>Align vision before starting</li>
                  <li>Make sure source material is complete and consistent</li>
                  <li>Invest more time in gathering inspiration for layouting</li>
                  <li>Allocate more time for experimentation</li>
                </ul>
              </div>
            </div>
            <div>
              <h3 className='text-lg font-bold uppercase border-b border-green-500/40 pb-2 mt-6'>Credits</h3>
              <div className='space-y-3 mt-4'>
                <div>
                  <span className='font-bold block uppercase text-xs tracking-wider'>Models and Curation</span>
                  <span>Peter Leutenegger</span>
                </div>
                <div>
                  <span className='font-bold block uppercase text-xs tracking-wider'>Photography</span>
                  <span>Alex Colle</span>
                </div>
                <div>
                  <span className='font-bold block uppercase text-xs tracking-wider'>Collages</span>
                  <span>Kurt Kleinert</span>
                </div>
                <div>
                  <span className='font-bold block uppercase text-xs tracking-wider'>Layout and CMS</span>
                  <span>Till Solenthaler</span>
                </div>
                <div>
                  <span className='font-bold block uppercase text-xs tracking-wider'>AI Declaration</span>
                  <div className='space-y-3 mt-2'>
                    <ul className='list-disc list-inside'>
                      <li>Claude Code for co-programming CMS and InDesign ExtendScript</li>
                    </ul>
                  </div>
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
            <h3 className='text-lg font-bold uppercase border-b border-green-500/40 pb-2'>Creation Process</h3>
            <div className='space-y-3'>
              {PROCESS_STEPS.map((step) => (
                <button
                  key={step.imageIndex}
                  onClick={() => navigateToPhoto(step.imageIndex)}
                  className='w-full cursor-pointer bg-white/80 p-3 border-l-2 border-green-500 rounded-lg hover:bg-white transition-colors text-left flex flex-col md:flex-row md:items-center gap-3'
                >
                  {PROCESS_IMAGES[step.imageIndex] && (
                    <div
                      className={`relative w-full aspect-video md:aspect-square md:w-16 flex-shrink-0 rounded overflow-hidden ${
                        activeIndex === step.imageIndex ? 'ring-4 ring-green-500' : 'ring-1 ring-green-500/40'
                      }`}
                    >
                      <Image
                        src={PROCESS_IMAGES[step.imageIndex].src}
                        alt={`${step.title} step`}
                        fill
                        className='object-cover'
                      />
                    </div>
                  )}
                  <div className='flex-1'>
                    <span className='font-bold block'>{step.title}</span>
                    <span className='text-sm'>{step.text}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ),
      },
    ],
    [navigateToPhoto, activeIndex]
  );

  return (
    <section
      className={`h-screen relative overflow-hidden pt-32 md:pt-32 px-4 md:px-8 flex flex-col items-center ${dinNext.className}`}
    >
      {/* Title */}
      <div
        className={`absolute inset-x-0 top-32 md:top-34 left-4 right-4 md:left-8 md:right-8 flex justify-start pointer-events-none z-10 transition-opacity duration-300 ${
          activeImages[activeIndex]?.hideTitle ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <h2 className={`text-5xl lg:text-7xl uppercase font-bold text-black mix-blend-difference ${dinNext.className}`}>
          toy lexicon
        </h2>
      </div>

      {/* Scrolling Photos - Full Width */}
      <div
        ref={scrollRef}
        className='absolute inset-0 top-0 overflow-x-auto overflow-y-hidden snap-x snap-mandatory flex scrollbar-hide'
      >
        {activeImages.map((image, index) => (
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
          className='hidden cursor-pointer lg:flex items-center justify-center w-12 h-12 rounded-lg bg-green-500/10 border-2 border-green-500/40 backdrop-blur-md hover:bg-green-500/20 transition-colors pointer-events-auto'
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
          className='hidden cursor-pointer lg:flex items-center justify-center w-12 h-12 rounded-lg bg-green-500/10 border-2 border-green-500/40 backdrop-blur-md hover:bg-green-500/20 transition-colors pointer-events-auto'
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
      <div className='absolute bottom-4 md:bottom-8 left-8 right-8 flex gap-2 justify-start overflow-x-auto scrollbar-hide z-20 pointer-events-auto'>
        {activeImages.map((image, index) => (
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
          className='absolute right-4 bottom-4 md:right-8 md:bottom-8 pointer-events-auto w-36 h-36 lg:w-64 lg:h-36'
          animate={{
            width: expandedPanel ? (isMobile ? 'calc(100vw - 2rem)' : 'calc(50vw - 2rem)') : undefined,
            height: expandedPanel ? (isMobile ? 'calc(100vh - 7rem)' : 'calc(100vh - 10rem)') : undefined,
            top: expandedPanel ? (isMobile ? '6rem' : '8rem') : undefined,
            bottom: expandedPanel ? 'auto' : undefined,
          }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        >
          {!expandedPanel ? (
            <div className='w-full h-full relative rounded-lg bg-green-500/40 border-2 border-green-500/60 backdrop-blur-md overflow-hidden'>
              <div className='flex flex-row w-full h-full'>
                <button
                  onClick={() => {
                    handleTabChange('infos');
                    setExpandedPanel(true);
                  }}
                  className='flex-1 relative flex flex-col justify-end p-4 cursor-pointer transition-all hover:bg-green-500/30'
                >
                  <div className='relative w-full h-full'>
                    <Image src='/toy-lexicon/mockup-1.png' alt='Book' fill className='object-cover' />
                  </div>
                  <p className='text-foreground font-medium text-sm uppercase'>INFOS</p>
                </button>
                <div className='w-px bg-green-500/60' />
                <button
                  onClick={() => {
                    handleTabChange('process');
                    setExpandedPanel(true);
                  }}
                  className='flex-1 relative flex flex-col justify-end p-4 cursor-pointer transition-all hover:bg-green-500/30'
                >
                  <div className='relative w-full h-full'>
                    <Image src='/toy-lexicon/macbook-mockup-small.png' alt='Process' fill className='object-cover' />
                  </div>
                  <p className='text-foreground font-medium text-sm uppercase'>PROCESS</p>
                </button>
              </div>
            </div>
          ) : (
            <div className='w-full h-full relative overflow-hidden'>
              <ToyLexiconTabs
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
