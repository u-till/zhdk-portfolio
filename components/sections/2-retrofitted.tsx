'use client';

import { Lamp3DViewer } from '@/components/retrofitted/lamp-3d-viewer';
import { useCarouselKeyboard } from '@/hooks/use-carousel-keyboard';
import { useCarouselScroll } from '@/hooks/use-carousel-scroll';
import { useIsMobile } from '@/hooks/use-is-mobile';
import { shrikhand } from '@/lib/fonts';
import { ImageItem, Tab } from '@/types/project';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

const GALLERY_IMAGES: ImageItem[] = [
  { src: '/retrofitted/lamp-1.png', objectFit: 'contain' },
  { src: '/retrofitted/lamp-2.png', objectFit: 'contain' },
  { src: '/retrofitted/lamp-3.png', objectFit: 'contain' },
  { src: '/retrofitted/lamp-mood.jpg', objectFit: 'cover' },
  { src: '/retrofitted/lamp-mood-2.jpg', objectFit: 'cover' },
];

const PROCESS_IMAGES: ImageItem[] = [
  { src: '/retrofitted/lamp-schematic.png', objectFit: 'contain', bg: '#ffc19dff', hideTitle: true }, // index 5
  { src: '/retrofitted/lamp-process-13.jpg', objectFit: 'cover' }, // index 6
  { src: '/retrofitted/lamp-process.jpg', objectFit: 'cover' }, // index 7
  { src: '/retrofitted/lamp-process-12.jpg', objectFit: 'cover' }, // index 8
  { src: '/retrofitted/lamp-process-11.jpg', objectFit: 'cover' }, // index 9
];

const PROCESS_STEPS = [
  {
    imageIndex: 0,
    title: '01. RESEARCH & DESIGN',
    text: 'With the help of ChatGPT i drafted a schematic and a shopping list. I visualized the schematic with the app Fritzing and ordered the parts off Aliexpress. ',
  },
  {
    imageIndex: 1,
    title: '02. SALVAGE & UPGRADE',
    text: 'Once the parts arrived, i opened the lamp and removed the old transformer and power cable. Next i started building the different blocks to later combine them. The base with the charging board and the usb-c extender, the middle part with the dimmer and the batteries and the top part with the new bulb and the connectors to it. Some of the casing had to be modified to fit the new parts.',
  },
  {
    imageIndex: 2,
    title: '03. FINALIZE, TESTING AND ASSEMBLE',
    text: 'After finishing the circuit in a dissassembled state, i tested all the voltages on the circuit, if the battery charges and if the lamp works. After that i could finally assemble the lamp back toghether again.',
  },
  {
    imageIndex: 3,
    title: '04. 3D CAPTURE',
    text: 'To capture the lamp as a 3D model i used the mobile app Polycam with my backdrop setup for optimal lighting.',
  },
  {
    imageIndex: 4,
    title: '05. ENHANCE',
    text: 'To crop, retouch and give the 3D Model a bottom i used Blender. Some corners had to be improved as well as the texture in some spots.',
  },
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
    <div className='w-full h-full rounded-[32px] border border-orange-300/40 bg-orange-500/80 backdrop-blur-md shadow-lg flex flex-col'>
      {/* Tab Headers */}
      <div className='flex border-b border-orange-300/40 flex-shrink-0'>
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
      <div className='relative flex-1 p-6 md:p-8 overflow-auto retro-scrollbar min-h-0'>
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
      if (tabId === 'process') {
        navigateToPhoto(1); // Go to first process image (after 3D viewer)
      } else {
        navigateToPhoto(0); // Go to 3D viewer for infos
      }
    },
    [navigateToPhoto]
  );

  const activeImages = activeTab === 'infos' ? GALLERY_IMAGES : PROCESS_IMAGES;

  const handlePrev = useCallback(() => {
    const totalItems = activeImages.length + 1; // +1 for 3D viewer
    const newIndex = activeIndex > 0 ? activeIndex - 1 : totalItems - 1;
    navigateToPhoto(newIndex);
  }, [activeIndex, navigateToPhoto, activeImages.length]);

  const handleNext = useCallback(() => {
    const totalItems = activeImages.length + 1; // +1 for 3D viewer
    const newIndex = activeIndex < totalItems - 1 ? activeIndex + 1 : 0;
    navigateToPhoto(newIndex);
  }, [activeIndex, navigateToPhoto, activeImages.length]);

  useCarouselScroll(scrollRef, setActiveIndex);
  useCarouselKeyboard(handlePrev, handleNext);

  // Handle thumbnail visibility based on active index
  useEffect(() => {
    if (activeIndex === 0) {
      // Navigated to 3D viewer - close thumbnails
      setShowThumbnails(false);
    } else if (!isMobile && !showThumbnails) {
      // On photo (not 3D viewer) on desktop - open thumbnails if not already open
      setShowThumbnails(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex, isMobile]);

  const tabs = useMemo(
    () => [
      {
        id: 'infos',
        label: 'INFOS',
        content: (
          <div className='space-y-6'>
            <div>
              <h3 className='text-lg font-bold uppercase border-b border-orange-300/40 pb-2'>Brief</h3>
              <p className='mt-4'>
                An old lamp from the 70s which broke so i retrofitted it with modern technology including a USB-C
                connector, a rechargable battery and a stepless dimmer, while preserving its iconic aesthetic. This
                project embodies my passion for repairs and sustainability. With the right tools and motivation, old
                objects cannot just be repaired but also improved with modern technology.
              </p>
            </div>
            <div>
              <h3 className='text-lg font-bold uppercase border-b border-orange-300/40 pb-2 mt-6'>Specifications</h3>
              <ul className='space-y-2 list-none mt-4'>
                <li className='border-l-2 border-orange-300 pl-4'>
                  <span className='font-bold'>YEAR:</span> 2025
                </li>
                <li className='border-l-2 border-orange-300 pl-4'>
                  <span className='font-bold'>FOR:</span> Personal Project
                </li>
                <li className='border-l-2 border-orange-300 pl-4'>
                  <span className='font-bold'>TYPE:</span> Upcycling / Retrofitting
                </li>
                <li className='border-l-2 border-orange-300 pl-4'>
                  <span className='font-bold'>MODEL:</span> Solis Typ 82 / 220V 25W Wired Power with Transformer / Lamp
                  12V 21W / 3 Step Dimmer
                </li>
                <li className='border-l-2 border-orange-300 pl-4'>
                  <span className='font-bold'>UPGRADES:</span>{' '}
                  <a
                    target='_blank'
                    rel='noopener noreferrer'
                    href='https://de.aliexpress.com/item/1005006005453774.html'
                  >
                    USB-C Connector
                  </a>{' '}
                  /{' '}
                  <a
                    target='_blank'
                    rel='noopener noreferrer'
                    href='https://de.aliexpress.com/item/1005004192388691.html'
                  >
                    10&apos;500mAh Li-Ion Battery (6-7h power)
                  </a>{' '}
                  /{' '}
                  <a
                    target='_blank'
                    rel='noopener noreferrer'
                    href='https://de.aliexpress.com/item/1005005579072790.html'
                  >
                    LED 12V 5W
                  </a>{' '}
                  /{' '}
                  <a
                    target='_blank'
                    rel='noopener noreferrer'
                    href='https://de.aliexpress.com/item/1005007384516556.html'
                  >
                    Stepless Dimmer
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className='text-lg font-bold uppercase border-b border-orange-300/40 pb-2'>Idea</h3>
              <p className='mt-4'>
                My nightstand lamp broke, so i wanted to repair it. Upon opening it, i saw the tranformer and thought
                this space could be used to fit a battery instead, so the project went from repair to upgrade.
              </p>
            </div>
            <div>
              <h3 className='text-lg font-bold uppercase border-b border-orange-300/40 pb-2'>
                Learnings & Improvements
              </h3>
              <p className='mt-4'>
                The mounting of the batteries inside the base proved to be quite tricky. Considering this during the
                planing phase would have been helpful, possibly even designing a mount and using a 3d printer to print
                it. Also it would be cool to animate the dimmer knob in the 3d viewer and map it to the brightness
                slider.
              </p>
            </div>
            <div>
              <h3 className='text-lg font-bold uppercase border-b border-orange-300/40 pb-2 mt-6'>Credits</h3>
              <div className='space-y-3 mt-4'>
                <div>
                  <span className='font-bold block uppercase text-xs tracking-wider'>Solo Project</span>
                  <span>Till Solenthaler</span>
                </div>
                <div>
                  <span className='font-bold block uppercase text-xs tracking-wider'>AI Declaration</span>
                  <div className='space-y-3 mt-2'>
                    <ul className='list-disc list-inside'>
                      <li>ChatGPT for consultation on circuit design</li>
                      <li>Google Nano Banana for stylizing parts on schematic</li>
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
            <h3 className='text-lg font-bold uppercase border-b border-orange-300/40 pb-2'>Process</h3>
            <div className='space-y-3'>
              {PROCESS_STEPS.map((step) => (
                <button
                  key={step.imageIndex}
                  onClick={() => navigateToPhoto(step.imageIndex + 1)}
                  className='w-full cursor-pointer bg-orange-600/30 p-3 border-l-2 border-orange-300 rounded-lg hover:bg-orange-600/50 transition-colors text-left flex items-center gap-3'
                >
                  {PROCESS_IMAGES[step.imageIndex] && (
                    <div
                      className={`relative w-16 h-16 flex-shrink-0 rounded overflow-hidden ${
                        activeIndex === step.imageIndex + 1 ? 'ring-4 ring-orange-300' : 'ring-1 ring-orange-300/40'
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
    <section className='h-screen relative overflow-hidden pt-28 md:pt-42 px-4 md:px-8 flex flex-col items-center'>
      {/* Title */}
      <div
        className={`absolute top-24 md:bottom-28 md:top-auto left-0 right-0 md:left-8 md:right-auto flex justify-center md:justify-start pointer-events-none z-10 transition-opacity duration-300 ${
          activeIndex > 0 && activeImages[activeIndex - 1]?.hideTitle ? 'opacity-0' : 'opacity-100'
        }`}
      >
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
        {/* First item: 3D Lamp Viewer (available in both tabs) */}
        <div className='h-full min-w-full snap-center flex items-center justify-center relative'>
          <div className='w-full h-full'>
            <Lamp3DViewer />
          </div>
        </div>

        {/* Active gallery images */}
        {activeImages.map((image, index) => (
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
              {activeImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => {
                    navigateToPhoto(index + 1); // +1 because 3D viewer is at 0
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
