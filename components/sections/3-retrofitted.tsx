'use client';

import { Lamp3DViewer } from '@/components/retrofitted/lamp-3d-viewer';
import { useCarouselKeyboard } from '@/hooks/use-carousel-keyboard';
import { useCarouselScroll } from '@/hooks/use-carousel-scroll';
import { useIsMobile } from '@/hooks/use-is-mobile';
import { shrikhand } from '@/lib/fonts';
import { ImageItem } from '@/types/project';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';

const GALLERY_IMAGES: ImageItem[] = [
  { src: '/retrofitted/lamp-1.png', objectFit: 'contain' },
  { src: '/retrofitted/lamp-2.png', objectFit: 'contain' },
  { src: '/retrofitted/lamp-3.png', objectFit: 'contain' },
  { src: '/retrofitted/lamp-mood.jpg', objectFit: 'cover', hideTitle: true },
  { src: '/retrofitted/lamp-mood-2.jpg', objectFit: 'cover', hideTitle: true },
];

const PROCESS_IMAGES: ImageItem[] = [
  { src: '/retrofitted/lamp-schematic.png', objectFit: 'contain', bg: '#ffc19dff' },
  { src: '/retrofitted/lamp-process-13.jpg', objectFit: 'cover' },
  { src: '/retrofitted/lamp-process.jpg', objectFit: 'cover' },
  { src: '/retrofitted/lamp-process-12.jpg', objectFit: 'cover' },
  { src: '/retrofitted/lamp-process-11.jpg', objectFit: 'cover' },
];

const PROCESS_STEPS = [
  {
    imageIndex: 0,
    title: '01. RESEARCH & DESIGN',
    text: 'Drafted a schematic and shopping list with ChatGPT. Visualized in Fritzing and ordered parts from Aliexpress.',
  },
  {
    imageIndex: 1,
    title: '02. SALVAGE & UPGRADE',
    text: 'Removed the old transformer and power cable. Built separate blocks: base with charging board and USB-C, middle with dimmer and batteries, top with new LED bulb. Modified some casing to fit.',
  },
  {
    imageIndex: 2,
    title: '03. FINALIZE, TESTING AND ASSEMBLE',
    text: 'Tested all voltages, battery charging and lamp function while disassembled. Then assembled everything back together.',
  },
  {
    imageIndex: 3,
    title: '04. 3D CAPTURE',
    text: 'Captured as 3D model using Polycam app with backdrop setup for optimal lighting.',
  },
  {
    imageIndex: 4,
    title: '05. ENHANCE',
    text: 'Used Blender to crop, retouch, add a bottom, and fix corners and texture spots.',
  },
];

export function Project3() {
  const [activeIndex, setActiveIndex] = useState(0);
  const isMobile = useIsMobile(768);
  const [showThumbnails, setShowThumbnails] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedProcessIndex, setSelectedProcessIndex] = useState(0);

  const navigateToPhoto = useCallback((imageIndex: number) => {
    if (scrollRef.current) {
      const width = scrollRef.current.offsetWidth;
      scrollRef.current.scrollTo({
        left: width * imageIndex,
        behavior: 'smooth',
      });
    }
  }, []);

  const handlePrev = useCallback(() => {
    const totalItems = GALLERY_IMAGES.length + 1; // +1 for 3D viewer
    const newIndex = activeIndex > 0 ? activeIndex - 1 : totalItems - 1;
    navigateToPhoto(newIndex);
  }, [activeIndex, navigateToPhoto]);

  const handleNext = useCallback(() => {
    const totalItems = GALLERY_IMAGES.length + 1; // +1 for 3D viewer
    const newIndex = activeIndex < totalItems - 1 ? activeIndex + 1 : 0;
    navigateToPhoto(newIndex);
  }, [activeIndex, navigateToPhoto]);

  useCarouselScroll(scrollRef, setActiveIndex);
  useCarouselKeyboard(handlePrev, handleNext);

  // Handle thumbnail visibility based on active index
  useEffect(() => {
    if (activeIndex === 0) {
      setShowThumbnails(false);
    } else if (!isMobile && !showThumbnails) {
      setShowThumbnails(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex, isMobile]);

  return (
    <section className='h-screen overflow-y-auto overflow-x-hidden'>
      {/* First View: Gallery with 3D Viewer */}
      <div className='h-screen relative overflow-hidden flex flex-col items-center'>
        {/* Title */}
        <div
          className={`absolute top-24 md:bottom-28 md:top-auto left-0 right-0 md:left-8 md:right-auto flex justify-center md:justify-start pointer-events-none z-10 transition-opacity duration-300 ${
            activeIndex > 0 && GALLERY_IMAGES[activeIndex - 1]?.hideTitle ? 'opacity-0' : 'opacity-100'
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
          {/* First item: 3D Lamp Viewer */}
          <div className='h-full min-w-full snap-center flex items-center justify-center relative'>
            <div className='w-full h-full'>
              <Lamp3DViewer />
            </div>
          </div>

          {/* Gallery images */}
          {GALLERY_IMAGES.map((image, index) => (
            <div
              key={image.src}
              className='h-full min-w-full snap-center flex items-center justify-center relative'
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
          {/* Thumbnails */}
          <AnimatePresence>
            {showThumbnails && (
              <motion.div
                initial={{ opacity: 0, x: isMobile ? 0 : 20, y: isMobile ? 20 : 0 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                exit={{ opacity: 0, x: isMobile ? 0 : 20, y: isMobile ? 20 : 0 }}
                transition={{ duration: 0.3 }}
                className='order-first md:order-last flex flex-col md:flex-row gap-2 max-h-[calc(100vh-16rem)] md:max-h-none md:max-w-[calc(100vw-16rem)] overflow-y-auto md:overflow-y-visible md:overflow-x-auto scrollbar-hide p-1'
              >
                {GALLERY_IMAGES.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      navigateToPhoto(index + 1);
                      if (isMobile) {
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
            {/* Album/Photos Button */}
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

            {/* 3D Button */}
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

        {/* Scroll Down Arrow */}
        <div className='absolute bottom-8 left-1/2 -translate-x-1/2 z-10 pointer-events-none'>
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

      {/* Info Content - 3 Columns */}
      <div className='bg-gradient-to-b from-orange-50 to-orange-100 px-4 md:px-8 pt-16 pb-16'>
        <div>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 text-foreground'>
            {/* Column 1: Brief & Idea */}
            <div className='space-y-6'>
              <div>
                <h3 className='text-xl font-bold uppercase border-b-2 border-orange-400 pb-2'>Brief</h3>
                <p className='mt-4 leading-relaxed'>
                  An old lamp from the 70s which broke so i retrofitted it with modern technology including a USB-C
                  connector, a rechargable battery and a stepless dimmer, while preserving its iconic aesthetic. This
                  project embodies my passion for repairs and sustainability.
                </p>
              </div>
              <div>
                <h3 className='text-xl font-bold uppercase border-b-2 border-orange-400 pb-2'>Idea</h3>
                <p className='mt-4 leading-relaxed'>
                  My nightstand lamp broke, so i wanted to repair it. Upon opening it, i saw the tranformer and thought
                  this space could be used to fit a battery instead, so the project went from repair to upgrade.
                </p>
              </div>
            </div>

            {/* Column 2: Specifications */}
            <div>
              <h3 className='text-xl font-bold uppercase border-b-2 border-orange-400 pb-2'>Specifications</h3>
              <ul className='space-y-2 list-none mt-4'>
                <li className='border-l-2 border-orange-400 pl-3 py-1'>
                  <span className='font-bold'>YEAR:</span> 2025
                </li>
                <li className='border-l-2 border-orange-400 pl-3 py-1'>
                  <span className='font-bold'>FOR:</span> Personal Project
                </li>
                <li className='border-l-2 border-orange-400 pl-3 py-1'>
                  <span className='font-bold'>TYPE:</span> Upcycling / Retrofitting
                </li>
                <li className='border-l-2 border-orange-400 pl-3 py-1'>
                  <span className='font-bold'>MODEL:</span> Solis Typ 82 / 220V 25W
                </li>
                <li className='border-l-2 border-orange-400 pl-3 py-1'>
                  <span className='font-bold'>UPGRADES:</span>{' '}
                  <a target='_blank' rel='noopener noreferrer' href='https://de.aliexpress.com/item/1005006005453774.html' className='text-orange-600 hover:underline'>USB-C</a>{' / '}
                  <a target='_blank' rel='noopener noreferrer' href='https://de.aliexpress.com/item/1005004192388691.html' className='text-orange-600 hover:underline'>10.5Ah Battery</a>{' / '}
                  <a target='_blank' rel='noopener noreferrer' href='https://de.aliexpress.com/item/1005005579072790.html' className='text-orange-600 hover:underline'>LED 5W</a>{' / '}
                  <a target='_blank' rel='noopener noreferrer' href='https://de.aliexpress.com/item/1005007384516556.html' className='text-orange-600 hover:underline'>Dimmer</a>
                </li>
              </ul>
            </div>

            {/* Column 3: Learnings & Credits */}
            <div className='space-y-6'>
              <div>
                <h3 className='text-xl font-bold uppercase border-b-2 border-orange-400 pb-2'>Learnings</h3>
                <ul className='list-disc list-inside mt-4 space-y-1'>
                  <li>Use 3d printed mount for parts inside</li>
                  <li>Implement custom charging indicator</li>
                  <li>Animate dimmer knob in 3d model</li>
                </ul>
              </div>
              <div>
                <h3 className='text-xl font-bold uppercase border-b-2 border-orange-400 pb-2'>Credits</h3>
                <div className='space-y-4 mt-4'>
                  <div>
                    <span className='font-bold block uppercase text-sm tracking-wider'>Solo Project</span>
                    <span>Till Solenthaler</span>
                  </div>
                  <div>
                    <span className='font-bold block uppercase text-sm tracking-wider'>AI Declaration</span>
                    <ul className='list-disc list-inside mt-2 space-y-1'>
                      <li>ChatGPT for circuit design</li>
                      <li>Google Nano for schematic styling</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Process Section - flows after info */}
      <div className='bg-orange-100 px-4 md:px-8 pt-12 pb-16'>
        <div className='flex flex-col'>
          <h3 className='text-xl font-bold uppercase border-b-2 border-orange-400 pb-2 mb-6 flex-shrink-0'>Process</h3>

          <div className='flex flex-col lg:flex-row gap-6'>
            {/* Left: Process List (1/3) */}
            <div className='lg:w-1/3 space-y-2'>
              {PROCESS_STEPS.map((step, index) => (
                <button
                  key={step.imageIndex}
                  onClick={() => setSelectedProcessIndex(index)}
                  className={`w-full cursor-pointer p-4 border-l-4 transition-all text-left ${
                    selectedProcessIndex === index
                      ? 'border-orange-500 bg-orange-300/50'
                      : 'border-orange-300 bg-orange-200/30 hover:bg-orange-200/60'
                  }`}
                >
                  <span className='font-bold block'>{step.title}</span>
                  <span className='text-foreground/80'>{step.text}</span>
                </button>
              ))}
            </div>

            {/* Right: Selected Image (2/3) */}
            <div className='lg:w-2/3'>
              <div
                className='relative w-full aspect-[4/3] rounded-lg overflow-hidden'
                style={PROCESS_IMAGES[selectedProcessIndex]?.bg ? { backgroundColor: PROCESS_IMAGES[selectedProcessIndex].bg } : undefined}
              >
                <Image
                  src={PROCESS_IMAGES[selectedProcessIndex]?.src || PROCESS_IMAGES[0].src}
                  alt={PROCESS_STEPS[selectedProcessIndex]?.title || 'Process step'}
                  fill
                  className={`${PROCESS_IMAGES[selectedProcessIndex]?.objectFit === 'contain' ? 'object-contain p-8' : 'object-cover'}`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
