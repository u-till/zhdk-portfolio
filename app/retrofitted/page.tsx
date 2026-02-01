'use client';

import { useCarouselKeyboard } from '@/hooks/use-carousel-keyboard';
import { useCarouselScroll } from '@/hooks/use-carousel-scroll';
import { shrikhand } from '@/lib/fonts';
import { ImageItem } from '@/types/project';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useCallback, useRef, useState } from 'react';

// Lazy load the 3D Lamp viewer to code-split three.js
const Lamp3DViewer = dynamic(() => import('@/components/retrofitted/lamp-3d-viewer').then((mod) => mod.Lamp3DViewer), {
  ssr: false,
  loading: () => <div className='w-full h-full bg-[#3C4343]' />,
});

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

export default function RetrofittedPage() {
  const [activeIndex, setActiveIndex] = useState(0);
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

  return (
    <section>
      {/* First View: Gallery with 3D Viewer */}
      <div className='h-screen relative overflow-hidden flex flex-col items-center'>
        {/* Title - Bottom Left */}
        <div
          className={`absolute bottom-4 md:bottom-8 left-4 md:left-8 pointer-events-none z-10 transition-opacity duration-300 ${
            activeIndex > 0 && GALLERY_IMAGES[activeIndex - 1]?.hideTitle ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <h2 className={`text-5xl lg:text-7xl font-bold text-white mix-blend-difference ${shrikhand.className}`}>
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
            className='hidden cursor-pointer lg:flex items-center justify-center w-12 h-12 rounded-full border border-orange-300/40 bg-orange-500 backdrop-blur-md hover:bg-orange-600/80 transition-colors pointer-events-auto group'
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
            className='hidden cursor-pointer lg:flex items-center justify-center w-12 h-12 rounded-full border border-orange-300/40 bg-orange-500 backdrop-blur-md hover:bg-orange-600/80 transition-colors pointer-events-auto group'
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

        {/* Album Controls - Bottom Right */}
        <div className='absolute bottom-4 md:bottom-8 right-4 md:right-8 z-20 pointer-events-auto flex gap-2 items-center'>
          {/* 3D Button */}
          <button
            onClick={() => navigateToPhoto(0)}
            className={`relative cursor-pointer transition-all flex-shrink-0 w-16 h-16 rounded-full border border-orange-300/40 bg-orange-500 backdrop-blur-md hover:bg-orange-600/80 flex items-center justify-center ${
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

          {/* Thumbnails */}
          {GALLERY_IMAGES.map((image, index) => (
            <button
              key={index}
              onClick={() => navigateToPhoto(index + 1)}
              className={`relative cursor-pointer overflow-hidden transition-all flex-shrink-0 w-16 h-16 rounded-full border border-orange-300/40 bg-orange-500/20 backdrop-blur-sm hover:bg-orange-600/30 ${
                activeIndex === index + 1 ? 'ring-2 ring-orange-300/60' : ''
              }`}
            >
              <Image src={image.src} alt={`Thumbnail ${index + 1}`} fill className='object-cover rounded-full' />
            </button>
          ))}
        </div>

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
      <div className='bg-gradient-to-b from-orange-50 to-orange-100 px-4 md:px-8 pt-16 pb-16'>
        <div className='flex flex-col gap-8 text-foreground'>
          {/* Brief Section */}
          <div>
            <h3 className={`text-xl font-bold  border-b-2 border-orange-400 pb-2 mb-4 ${shrikhand.className}`}>
              brief
            </h3>
            <div className='grid grid-cols-1 md:grid-cols-5 gap-y-2 text-sm'>
              <div className='hidden md:block'></div>
              <div className='hidden md:block'></div>
              <div className='hidden md:block'></div>
              <div className='md:col-span-2'>
                <p className='leading-relaxed'>
                  An old lamp from the 70s which broke so i retrofitted it with modern technology including a USB-C
                  connector, a rechargable battery and a stepless dimmer, while preserving its iconic aesthetic. This
                  project embodies my passion for repairs and sustainability.
                </p>
              </div>
            </div>
          </div>

          {/* Idea Section */}
          <div>
            <h3 className={`text-xl font-bold  border-b-2 border-orange-400 pb-2 mb-4 ${shrikhand.className}`}>idea</h3>
            <div className='grid grid-cols-1 md:grid-cols-5 gap-y-2 text-sm'>
              <div className='hidden md:block'></div>
              <div className='hidden md:block'></div>
              <div className='hidden md:block'></div>
              <div className='md:col-span-2'>
                <p className='leading-relaxed'>
                  My nightstand lamp broke, so i wanted to repair it. Upon opening it, i saw the tranformer and thought
                  this space could be used to fit a battery instead, so the project went from repair to upgrade.
                </p>
              </div>
            </div>
          </div>

          {/* specifications Section */}
          <div>
            <h3 className={`text-xl font-bold  border-b-2 border-orange-400 pb-2 mb-4 ${shrikhand.className}`}>
              specifications
            </h3>
            <div className='grid grid-cols-2 md:grid-cols-5 gap-y-2 text-sm'>
              <div className='hidden md:block'></div>
              <div className='font-bold md:text-right'>Year</div>
              <div className='hidden md:block'></div>
              <div className='md:col-span-2'>2025</div>

              <div className='hidden md:block'></div>
              <div className='font-bold md:text-right'>For</div>
              <div className='hidden md:block'></div>
              <div className='md:col-span-2'>Personal Project</div>

              <div className='hidden md:block'></div>
              <div className='font-bold md:text-right'>Type</div>
              <div className='hidden md:block'></div>
              <div className='md:col-span-2'>Upcycling / Retrofitting</div>

              <div className='hidden md:block'></div>
              <div className='font-bold md:text-right'>Model</div>
              <div className='hidden md:block'></div>
              <div className='md:col-span-2'>Solis Typ 82 / 220V 25W</div>

              <div className='hidden md:block'></div>
              <div className='font-bold md:text-right'>Upgrades</div>
              <div className='hidden md:block'></div>
              <div className='md:col-span-2'>
                <a
                  target='_blank'
                  rel='noopener noreferrer'
                  href='https://de.aliexpress.com/item/1005006005453774.html'
                  className='text-orange-600 hover:underline'
                >
                  USB-C
                </a>
                {' / '}
                <a
                  target='_blank'
                  rel='noopener noreferrer'
                  href='https://de.aliexpress.com/item/1005004192388691.html'
                  className='text-orange-600 hover:underline'
                >
                  10.5Ah Battery
                </a>
                {' / '}
                <a
                  target='_blank'
                  rel='noopener noreferrer'
                  href='https://de.aliexpress.com/item/1005005579072790.html'
                  className='text-orange-600 hover:underline'
                >
                  LED 5W
                </a>
                {' / '}
                <a
                  target='_blank'
                  rel='noopener noreferrer'
                  href='https://de.aliexpress.com/item/1005007384516556.html'
                  className='text-orange-600 hover:underline'
                >
                  Dimmer
                </a>
              </div>
            </div>
          </div>

          {/* learnings Section */}
          <div>
            <h3 className={`text-xl font-bold  border-b-2 border-orange-400 pb-2 mb-4 ${shrikhand.className}`}>
              learnings
            </h3>
            <div className='grid grid-cols-1 md:grid-cols-5 gap-y-2 text-sm'>
              <div className='hidden md:block'></div>
              <div className='hidden md:block'></div>
              <div className='hidden md:block'></div>
              <div className='md:col-span-2'>
                <ul className='list-disc list-inside space-y-1'>
                  <li>Use 3d printed mount for parts inside</li>
                  <li>Implement custom charging indicator</li>
                  <li>Animate dimmer knob in 3d model</li>
                </ul>
              </div>
            </div>
          </div>

          {/* credits Section */}
          <div>
            <h3 className={`text-xl font-bold  border-b-2 border-orange-400 pb-2 mb-4 ${shrikhand.className}`}>
              credits
            </h3>
            <div className='grid grid-cols-2 md:grid-cols-5 gap-y-2 text-sm'>
              <div className='hidden md:block'></div>
              <div className='font-bold md:text-right'>Solo Project</div>
              <div className='hidden md:block'></div>
              <div className='md:col-span-2'>Till Solenthaler</div>

              <div className='hidden md:block'></div>
              <div className='font-bold md:text-right'>AI Declaration</div>
              <div className='hidden md:block'></div>
              <div className='md:col-span-2'>
                <ul className='list-disc list-inside space-y-1'>
                  <li>ChatGPT for circuit design</li>
                  <li>Google Nano Banana for stylizing images for schematic</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Process Section - flows after info */}
      <div className='bg-orange-100 px-4 md:px-8 pt-12 pb-16'>
        <div>
          <h3 className={`text-xl font-bold  border-b-2 border-orange-400 pb-2 mb-6 ${shrikhand.className}`}>
            process
          </h3>

          <div className='grid grid-cols-1 lg:grid-cols-5 gap-6'>
            {/* Left: Process List (2 cols on desktop, full on mobile) */}
            <div className='lg:col-span-2 space-y-3'>
              {PROCESS_STEPS.map((step, index) => {
                const isActive = selectedProcessIndex === index;
                return (
                  <div
                    key={step.imageIndex}
                    onClick={() => setSelectedProcessIndex(index)}
                    className={`w-full p-3 rounded-2xl transition-all text-left flex flex-col md:flex-row md:items-center gap-3 lg:cursor-pointer ${
                      isActive ? 'bg-orange-500' : 'bg-white/80 lg:hover:bg-white'
                    }`}
                  >
                    <div
                      className='relative w-full aspect-square md:w-20 md:h-20 flex-shrink-0 overflow-hidden rounded-full ring-2 ring-orange-400'
                      style={
                        PROCESS_IMAGES[step.imageIndex]?.bg
                          ? { backgroundColor: PROCESS_IMAGES[step.imageIndex].bg }
                          : undefined
                      }
                    >
                      <Image
                        src={PROCESS_IMAGES[step.imageIndex]?.src || PROCESS_IMAGES[0].src}
                        alt={`${step.title} thumbnail`}
                        fill
                        className={`${PROCESS_IMAGES[step.imageIndex]?.objectFit === 'contain' ? 'object-contain p-2' : 'object-cover'}`}
                      />
                    </div>
                    <div className='flex-1'>
                      <span className={`font-bold block ${isActive ? 'text-white' : ''}`}>{step.title}</span>
                      <span className={`text-sm ${isActive ? 'text-white/90' : 'text-foreground/80'}`}>
                        {step.text}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right: Selected Image (3 cols) - Desktop only */}
            <div className='hidden lg:block lg:col-span-3'>
              <div
                className='relative w-full aspect-[4/3] rounded-lg overflow-hidden'
                style={
                  PROCESS_IMAGES[selectedProcessIndex]?.bg
                    ? { backgroundColor: PROCESS_IMAGES[selectedProcessIndex].bg }
                    : undefined
                }
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
