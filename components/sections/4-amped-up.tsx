'use client';

import { useCarouselKeyboard } from '@/hooks/use-carousel-keyboard';
import { useCarouselScroll } from '@/hooks/use-carousel-scroll';
import { vt323 } from '@/lib/fonts';
import { ImageItem } from '@/types/project';
import Image from 'next/image';
import { useCallback, useRef, useState } from 'react';

const GALLERY_IMAGES: ImageItem[] = [
  { src: '/amped-up/preview.jpg', objectFit: 'cover' },
  { src: '/amped-up/speaker-11.jpg', objectFit: 'contain', hideTitle: true },
  { src: '/amped-up/speaker-4.jpg', objectFit: 'cover', hideTitle: true },
  { src: '/amped-up/speaker-5.jpg', objectFit: 'contain', hideTitle: true },
  { src: '/amped-up/speaker-6.jpg', objectFit: 'contain', hideTitle: true },
  { src: '/amped-up/speaker-7.jpg', objectFit: 'cover', hideTitle: true },
];

const PROCESS_IMAGES: ImageItem[] = [
  { src: '/amped-up/speaker-schematic.jpg', objectFit: 'contain' },
  { src: '/amped-up/speaker-process-9.jpg', objectFit: 'contain' },
  { src: '/amped-up/speaker-process-10.jpg', objectFit: 'cover' },
  { src: '/amped-up/speaker-8.jpg', objectFit: 'cover' },
  { src: '/amped-up/speaker-9.jpg', objectFit: 'cover' },
  { src: '/amped-up/speaker-process-12.jpg', objectFit: 'cover' },
];

const PROCESS_STEPS = [
  {
    imageIndex: 0,
    title: '01. RESEARCH & DESIGN',
    text: 'Julian led this phase due to his speaker expertise. We chose digital amps for DSP functionality, fitted into the left enclosure with separate boards for mids/highs and lows.',
  },
  {
    imageIndex: 1,
    title: '02. REMOVE OLD AMPS',
    text: 'Removed old analogue amplifiers by unscrewing and unplugging cables. Screenshot of the manual shown as reference since no photo was taken.',
  },
  {
    imageIndex: 2,
    title: '03. TEST CIRCUIT & BUILD ENCLOSURE',
    text: 'Created a backplate with power connector, switch, aux input and speaker terminals for the second speaker. Tested everything before mounting.',
  },
  {
    imageIndex: 3,
    title: '04. MOUNT CIRCUIT TO ENCLOSURE',
    text: 'Mounted all components to the enclosure and screwed the cover back onto the speaker.',
  },
  {
    imageIndex: 4,
    title: '05. CONNECT AND TEST',
    text: 'Connected everything and tested functionality. Bluetooth worked and EQ settings could be adjusted via DSP software.',
  },
  {
    imageIndex: 5,
    title: '06. CAPTURE IMAGES',
    text: 'Used backdrop setup with studio lights to create portfolio images.',
  },
];

export function Project4() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedProcessIndex, setSelectedProcessIndex] = useState(0);
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

  const handlePrev = useCallback(() => {
    const newIndex = activeIndex > 0 ? activeIndex - 1 : GALLERY_IMAGES.length - 1;
    navigateToPhoto(newIndex);
  }, [activeIndex, navigateToPhoto]);

  const handleNext = useCallback(() => {
    const newIndex = activeIndex < GALLERY_IMAGES.length - 1 ? activeIndex + 1 : 0;
    navigateToPhoto(newIndex);
  }, [activeIndex, navigateToPhoto]);

  useCarouselScroll(scrollRef, setActiveIndex);
  useCarouselKeyboard(handlePrev, handleNext);

  return (
    <section className='h-screen overflow-y-auto overflow-x-hidden'>
      {/* First View: Gallery */}
      <div className='h-screen relative overflow-hidden flex flex-col items-center'>
        {/* Title - Bottom Left */}
        <div
          className={`absolute bottom-4 md:bottom-8 left-4 md:left-8 pointer-events-none z-10 transition-opacity duration-300 ${
            activeIndex > 0 && GALLERY_IMAGES[activeIndex]?.hideTitle ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <h2
            className={`text-6xl lg:text-8xl font-bold text-black ${vt323.className}`}
          >
            amped up
          </h2>
        </div>

        {/* Scrolling Photos - Full Width */}
        <div
          ref={scrollRef}
          className='absolute inset-0 top-0 overflow-x-auto overflow-y-hidden snap-x snap-mandatory flex scrollbar-hide'
        >
          {GALLERY_IMAGES.map((image, index) => (
            <div
              key={image.src}
              className='h-full min-w-full snap-center flex items-center justify-center relative'
            >
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

        {/* Thumbnail Strip - Bottom Right */}
        <div className='absolute bottom-4 md:bottom-8 right-4 md:right-8 z-20 pointer-events-auto flex gap-2 overflow-x-auto max-w-[calc(100vw-2rem)] md:max-w-[calc(100vw-4rem)]'>
          {GALLERY_IMAGES.map((image, index) => (
            <button
              key={index}
              onClick={() => navigateToPhoto(index)}
              className={`relative cursor-pointer overflow-hidden transition-all flex-shrink-0 w-16 h-16 border ${
                activeIndex === index
                  ? 'border-2 border-black opacity-100'
                  : 'border-black/60 opacity-60 hover:opacity-100'
              }`}
            >
              <Image src={image.src} alt={`Thumbnail ${index + 1}`} fill className='object-cover' />
            </button>
          ))}
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
      <div className='bg-gradient-to-b from-neutral-50 to-neutral-100 px-4 md:px-8 pt-16 pb-16'>
        <div>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 text-foreground font-mono'>
            {/* Column 1: Brief & Idea */}
            <div className='space-y-6'>
              <div>
                <h3 className='text-xl font-bold uppercase border-b-2 border-foreground pb-2'>Brief</h3>
                <p className='mt-4 leading-relaxed'>
                  An old pair of Klein+Hummel speakers where we replaced the analogue amplifiers with digital amps. This
                  enables new functionality like EQ / DSP / and Bluetooth.
                </p>
              </div>
              <div>
                <h3 className='text-xl font-bold uppercase border-b-2 border-foreground pb-2'>Idea</h3>
                <p className='mt-4 leading-relaxed'>
                  Julian acquired these speakers with one broken amp. We brainstormed how to revive them with modern
                  features: digital amps with bluetooth and DSP for frequency response control and room acoustic
                  adaptation.
                </p>
              </div>
            </div>

            {/* Column 2: Specifications */}
            <div>
              <h3 className='text-xl font-bold uppercase border-b-2 border-foreground pb-2'>Specifications</h3>
              <ul className='space-y-2 list-none mt-4'>
                <li className='border-l-2 border-foreground pl-3 py-1'>
                  <span className='font-bold'>YEAR:</span> 2024-2025
                </li>
                <li className='border-l-2 border-foreground pl-3 py-1'>
                  <span className='font-bold'>FOR:</span> Collaborative Project
                </li>
                <li className='border-l-2 border-foreground pl-3 py-1'>
                  <span className='font-bold'>TYPE:</span> Upcycling / Retrofitting
                </li>
                <li className='border-l-2 border-foreground pl-3 py-1'>
                  <span className='font-bold'>MODEL:</span> Klein+Hummel O 96 / 3 way studio monitor speakers / 3 x 60W AMP / XLR Connectors
                </li>
                <li className='border-l-2 border-foreground pl-3 py-1'>
                  <span className='font-bold'>UPGRADES:</span>{' '}
                  <a target='_blank' rel='noopener noreferrer' href='https://store.sure-electronics.com/product/757' className='underline hover:no-underline'>
                    Wondom 4x 30W Amp with Bluetooth and DSP
                  </a>{' / '}
                  <a target='_blank' rel='noopener noreferrer' href='https://store.sure-electronics.com/product/804' className='underline hover:no-underline'>
                    Wondom 2x 50W Amp
                  </a>{' / '}
                  <a target='_blank' rel='noopener noreferrer' href='https://store.sure-electronics.com/product/726' className='underline hover:no-underline'>
                    WONDOM ICP5 In-circuit Programmer
                  </a>{' / '}
                  <a target='_blank' rel='noopener noreferrer' href='https://www.meanwell.com/webapp/product/search.aspx?prod=LRS-200' className='underline hover:no-underline'>
                    Meanwell LRS 200-15 PSU
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Learnings & Credits */}
            <div className='space-y-6'>
              <div>
                <h3 className='text-xl font-bold uppercase border-b-2 border-foreground pb-2'>Learnings</h3>
                <ul className='list-disc list-inside mt-4 space-y-1'>
                  <li>Implement room correction onto DSP board</li>
                  <li>Connect front LED to DSP board to use as bluetooth status LED</li>
                </ul>
              </div>
              <div>
                <h3 className='text-xl font-bold uppercase border-b-2 border-foreground pb-2'>Credits</h3>
                <div className='space-y-4 mt-4'>
                  <div>
                    <span className='font-bold block uppercase text-sm tracking-wider'>Idea & Concept</span>
                    <span>Till Solenthaler & Julian Fehr</span>
                  </div>
                  <div>
                    <span className='font-bold block uppercase text-sm tracking-wider'>Build</span>
                    <span>Till Solenthaler</span>
                  </div>
                  <div>
                    <span className='font-bold block uppercase text-sm tracking-wider'>AI Declaration</span>
                    <span>No AI tools used</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Process Section */}
      <div className='bg-neutral-100 px-4 md:px-8 pt-12 pb-16'>
        <div className='flex flex-col font-mono'>
          <h3 className='text-xl font-bold uppercase border-b-2 border-foreground pb-2 mb-6 flex-shrink-0'>Process</h3>

          <div className='flex flex-col lg:flex-row gap-6'>
            {/* Left: Process List (1/3 on desktop, full on mobile) */}
            <div className='lg:w-1/3 space-y-2'>
              {PROCESS_STEPS.map((step, index) => (
                <div
                  key={step.imageIndex}
                  onClick={() => setSelectedProcessIndex(index)}
                  className={`w-full p-3 border-l-4 transition-all text-left flex flex-col md:flex-row md:items-center gap-3 lg:cursor-pointer border-foreground bg-neutral-300/50 ${
                    selectedProcessIndex !== index && 'lg:border-neutral-400 lg:bg-neutral-200/30 lg:hover:bg-neutral-200/60'
                  }`}
                >
                  <div
                    className={`relative w-full aspect-square md:w-20 md:h-20 flex-shrink-0 overflow-hidden ring-2 ring-foreground ${
                      selectedProcessIndex !== index && 'lg:ring-1 lg:ring-neutral-400'
                    }`}
                  >
                    <Image
                      src={PROCESS_IMAGES[step.imageIndex]?.src || PROCESS_IMAGES[0].src}
                      alt={`${step.title} thumbnail`}
                      fill
                      className='object-cover'
                    />
                  </div>
                  <div className='flex-1'>
                    <span className='font-bold block'>{step.title}</span>
                    <span className='text-foreground/80 text-sm'>{step.text}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Right: Selected Image (2/3) - Desktop only */}
            <div className='hidden lg:block lg:w-2/3'>
              <div
                className='relative w-full aspect-[4/3] overflow-hidden border border-black/60'
              >
                <Image
                  src={PROCESS_IMAGES[PROCESS_STEPS[selectedProcessIndex]?.imageIndex]?.src || PROCESS_IMAGES[0].src}
                  alt={PROCESS_STEPS[selectedProcessIndex]?.title || 'Process step'}
                  fill
                  className={`${PROCESS_IMAGES[PROCESS_STEPS[selectedProcessIndex]?.imageIndex]?.objectFit === 'contain' ? 'object-contain' : 'object-cover'}`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
