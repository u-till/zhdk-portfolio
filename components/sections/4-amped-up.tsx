'use client';

import { useCarouselKeyboard } from '@/hooks/use-carousel-keyboard';
import { useCarouselScroll } from '@/hooks/use-carousel-scroll';
import { useIsMobile } from '@/hooks/use-is-mobile';
import { vt323 } from '@/lib/fonts';
import { ImageItem, Tab } from '@/types/project';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useCallback, useMemo, useRef, useState } from 'react';

const GALLERY_IMAGES: ImageItem[] = [
  { src: '/amped-up/preview.jpg', objectFit: 'cover' },
  { src: '/amped-up/speaker-11.jpg', objectFit: 'contain', hideTitle: true },
  { src: '/amped-up/speaker-4.jpg', objectFit: 'cover', hideTitle: true },
  { src: '/amped-up/speaker-5.jpg', objectFit: 'contain', hideTitle: true },
  { src: '/amped-up/speaker-6.jpg', objectFit: 'contain', hideTitle: true },
  { src: '/amped-up/speaker-7.jpg', objectFit: 'cover', hideTitle: true },
  { src: '/amped-up/speaker-8.jpg', objectFit: 'cover', hideTitle: true },
  { src: '/amped-up/speaker-9.jpg', objectFit: 'cover', hideTitle: true },
];

const PROCESS_IMAGES: ImageItem[] = [
  { src: '/amped-up/speaker-schematic.jpg', objectFit: 'contain', hideTitle: true },
  { src: '/amped-up/speaker-process-10.jpg', objectFit: 'cover' },
  { src: '/amped-up/speaker-8.jpg', objectFit: 'cover' },
  { src: '/amped-up/speaker-9.jpg', objectFit: 'cover' },
];

const PROCESS_STEPS = [
  {
    imageIndex: 0,
    title: '01. RESEARCH & DESIGN',
    text: 'In this phase, my flatmate Julian Fehr took the lead due to his expertise with speakers and amplifiers. Repairing the original amps proved impractical because replacement parts were likely unavailable, so we chose WONDOM digital amplifiers. These were fitted into the left speaker enclosure, using a main board for mids and highs and a separate board for the lows.',
  },
  {
    imageIndex: 1,
    title: '02. TEST CIRCUIT & BUILD ENCLOSURE',
    text: 'In order to mount the new amps, i created a simple backplate with a power connector, power switch, aux connector and audio cable terminals for the second speaker. Before mounting everything to the new enclosure, we connected everything first to test it.',
  },
  {
    imageIndex: 2,
    title: '03. MOUNT CIRCUIT TO ENCLOSURE',
    text: 'After sucessfully testing the new circuit, i mounted all the components to the enclosure and screwed the cover back onto the speaker.',
  },
  {
    imageIndex: 3,
    title: '04. CAPTURE',
    text: 'To create high quality images for this portfolio i also used my backdrop setup with the studio lights. I tried to take pictures in a continuously more disassembled state, to create an unpacking effect.',
  },
];

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
    <div className='w-full h-full border border-black/60 bg-background backdrop-blur-md flex flex-col'>
      {/* Tab Headers */}
      <div className='flex border-b border-black/60 flex-shrink-0'>
        <button
          onClick={onClose}
          className='relative cursor-pointer py-4 px-6 font-mono text-xl font-medium transition-colors border-r border-black/60 bg-transparent text-foreground hover:bg-neutral-100'
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
                : 'bg-transparent text-foreground hover:bg-neutral-100'
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
      <div className='relative flex-1 p-6 md:p-8 overflow-auto min-h-0'>
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
                  className='font-mono text-sm leading-relaxed'
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
      setActiveTab(tabId as 'infos' | 'process');
      navigateToPhoto(0);
    },
    [navigateToPhoto]
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
              <h3 className='text-lg font-bold uppercase border-b border-black/60 pb-2'>BRIEF</h3>
              <p className='mt-4'>
                An old pair of Klein+Hummel speakers where we replaced the analogue amplifiers with digital amps. This
                enables new functionality like EQ / DSP / and Bluetooth.
              </p>
            </div>
            <div>
              <h3 className='text-lg font-bold uppercase border-b border-black/60 pb-2 mt-6'>SPEFICICATIONS</h3>
              <ul className='space-y-2 list-none mt-4'>
                <li className='border-l-2 border-foreground pl-4'>
                  <span className='font-bold'>YEAR:</span> 2024-2025
                </li>
                <li className='border-l-2 border-foreground pl-4'>
                  <span className='font-bold'>FOR:</span> Collaborative Project
                </li>
                <li className='border-l-2 border-foreground pl-4'>
                  <span className='font-bold'>TYPE:</span> Upcycling / Retrofitting
                </li>
                <li className='border-l-2 border-foreground pl-4'>
                  <span className='font-bold'>MODEL:</span> Klein+Hummel O 96 / 3 way studio monitor speakers / 3 x 60W
                  AMP / XLR Connectors
                </li>
                <li className='border-l-2 border-foreground pl-4'>
                  <span className='font-bold'>UPGRADES:</span>{' '}
                  <a target='_blank' rel='noopener noreferrer' href='https://store.sure-electronics.com/product/757'>
                    Wondom 4x 30W Amp with Bluetooth and DSP
                  </a>{' '}
                  /{' '}
                  <a target='_blank' rel='noopener noreferrer' href='https://store.sure-electronics.com/product/804'>
                    Wondom 2x 50W Amp
                  </a>{' '}
                  /{' '}
                  <a target='_blank' rel='noopener noreferrer' href='https://store.sure-electronics.com/product/726'>
                    WONDOM ICP5 In-circuit Programmer
                  </a>{' '}
                  /{' '}
                  <a
                    target='_blank'
                    rel='noopener noreferrer'
                    href='https://www.meanwell.com/webapp/product/search.aspx?prod=LRS-200'
                  >
                    Meanwell LRS 200 -15
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className='text-lg font-bold uppercase border-b border-black/60 pb-2'>IDEA</h3>
              <p className='mt-4'>
                The idea came originally from my flatmate Julian Fehr, because he acquired these speakers with one
                broken amp and they were sitting around unused for a long time so we brainstormed how we could bring new
                life into these speakers. We thought of repairing the existing amps but opted for replacing them because
                this would give us new possibilities and is easier to implement.
              </p>
            </div>
            <div>
              <h3 className='text-lg font-bold uppercase border-b border-black/60 pb-2'>Learnings & Improvements</h3>
              <div className='space-y-3 mt-4'>
                <ul className='list-disc list-inside'>
                  <li>Implement room correction onto DSP Board</li>
                  <li>Connect front LED to DSP Board to use as bluetooth status LED</li>
                </ul>
              </div>
            </div>
            <div>
              <h3 className='text-lg font-bold uppercase border-b border-black/60 pb-2 mt-6'>Credits</h3>
              <div className='space-y-3 mt-4'>
                <div>
                  <span className='font-bold block uppercase text-xs tracking-wider'>Idea & Concept</span>
                  <span>Till Solenthaler & Julian Fehr</span>
                </div>
                <div>
                  <span className='font-bold block uppercase text-xs tracking-wider'>Build</span>
                  <span>Till Solenthaler</span>
                </div>
                <div>
                  <span className='font-bold block uppercase text-xs tracking-wider'>AI Declaration</span>
                  <div className='space-y-3 mt-2'>
                    <ul className='list-disc list-inside'>
                      <li>No AI tools used</li>
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
            <h3 className='text-lg font-bold uppercase border-b border-black/60 pb-2'>Build Process</h3>
            <div className='space-y-3'>
              {PROCESS_STEPS.map((step) => (
                <button
                  key={step.imageIndex}
                  onClick={() => navigateToPhoto(step.imageIndex)}
                  className='w-full cursor-pointer bg-neutral-100 p-3 border-l-2 border-foreground hover:bg-neutral-200 transition-colors text-left flex flex-col md:flex-row md:items-center gap-3'
                >
                  {PROCESS_IMAGES[step.imageIndex] && (
                    <div
                      className={`relative w-full aspect-video md:aspect-square md:w-16 flex-shrink-0 rounded overflow-hidden ${
                        activeIndex === step.imageIndex ? 'ring-4 ring-foreground' : 'ring-1 ring-foreground/20'
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
    <section className='h-screen relative overflow-hidden pt-32 md:pt-42 px-4 md:px-8 flex flex-col items-center'>
      {/* Title */}
      <div
        className={`absolute inset-x-0 top-32 md:top-42 flex justify-center pointer-events-none z-10 transition-opacity duration-300 ${
          activeImages[activeIndex]?.hideTitle ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <div className='max-w-screen-2xl mx-0 w-full flex justify-center'>
          <h2 className={`text-6xl lg:text-8xl font-bold text-white mix-blend-difference ${vt323.className}`}>
            amped up
          </h2>
        </div>
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
          className='hidden cursor-pointer lg:flex items-center justify-center w-12 h-12 border border-black/60 bg-background backdrop-blur-md hover:bg-neutral-100 transition-colors pointer-events-auto'
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
          className='hidden cursor-pointer lg:flex items-center justify-center w-12 h-12 border border-black/60 bg-background backdrop-blur-md hover:bg-neutral-100 transition-colors pointer-events-auto'
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
        {activeImages.map((image, index) => (
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
            <div className='w-full h-full relative overflow-hidden'>
              <div className='flex flex-row w-full h-full'>
                <button
                  onClick={() => {
                    handleTabChange('infos');
                    setExpandedPanel(true);
                  }}
                  className={`flex-1 relative flex flex-col justify-end p-4 cursor-pointer transition-colors bg-background backdrop-blur-md hover:bg-neutral-100 border border-black/60 border-r-0 border-b-3 ${
                    activeTab === 'infos' ? 'border-b-foreground' : 'border-b-black/60 hover:border-b-foreground'
                  }`}
                >
                  <div className='relative w-full h-full'>
                    <Image src='/amped-up/speaker-transparent.png' alt='Speaker' fill className='object-cover' />
                  </div>
                  <p className='text-foreground font-mono text-sm md:text-base font-medium uppercase'>INFOS</p>
                </button>
                <button
                  onClick={() => {
                    handleTabChange('process');
                    setExpandedPanel(true);
                  }}
                  className={`flex-1 relative flex flex-col justify-end p-4 cursor-pointer transition-colors bg-background backdrop-blur-md hover:bg-neutral-100 border border-black/60 border-b-3 ${
                    activeTab === 'process' ? 'border-b-foreground' : 'border-b-black/60 hover:border-b-foreground'
                  }`}
                >
                  <div className='relative w-full h-full'>
                    <Image src='/amped-up/screwdriver.png' alt='Screwdriver' fill className='object-cover' />
                  </div>
                  <p className='text-foreground font-mono text-sm md:text-base font-medium uppercase'>PROCESS</p>
                </button>
              </div>
            </div>
          ) : (
            <div className='w-full h-full relative'>
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
