'use client';

import { Lightbox } from '@/components/traces/lightbox';
import { useNavigation } from '@/contexts/navigation-context';
import { useCarouselKeyboard } from '@/hooks/use-carousel-keyboard';
import { useCarouselScroll } from '@/hooks/use-carousel-scroll';
import { vt323 } from '@/lib/fonts';
import { ImageItem } from '@/types/project';
import Image from 'next/image';
import { useCallback, useRef, useState } from 'react';

const GALLERY_IMAGES: ImageItem[] = [
  { src: '/amped-up/preview.jpg', objectFit: 'cover' },
  { src: '/amped-up/speaker-11.jpg', objectFit: 'contain' },
  { src: '/amped-up/speaker-4.jpg', objectFit: 'cover' },
  { src: '/amped-up/speaker-5.jpg', objectFit: 'contain' },
  { src: '/amped-up/speaker-6.jpg', objectFit: 'contain' },
  { src: '/amped-up/speaker-7.jpg', objectFit: 'cover', hideTitle: true },
];

const PROCESS_STEPS = [
  {
    image: '/amped-up/speaker-schematic.jpg',
    objectFit: 'contain' as const,
    title: '01. RESEARCH & DESIGN',
    text: 'Julian led this phase due to his speaker expertise. We chose digital amps for DSP functionality, fitted into the left enclosure with separate boards for mids/highs and lows.',
  },
  {
    image: '/amped-up/speaker-process-9.jpg',
    objectFit: 'contain' as const,
    title: '02. REMOVE OLD AMPS',
    text: 'Removed old analogue amplifiers. Screenshot of the manual shown as reference since I have no photo of the old amps.',
  },
  {
    image: '/amped-up/speaker-process-10.jpg',
    objectFit: 'cover' as const,
    title: '03. TEST CIRCUIT & BUILD ENCLOSURE',
    text: 'Created a backplate with a power connector, switch, aux input and speaker terminals for the second speaker. Mounted components onto the backplate and wired everything up.',
  },
  {
    image: '/amped-up/speaker-8.jpg',
    objectFit: 'cover' as const,
    title: '04. MOUNT BACKPLATE',
    text: 'Mounted the backplates to the speakers. The first one with the Amps and DSP board went onto the left speaker, the second one with only cable terminals went onto the right speaker.',
  },
  {
    image: '/amped-up/speaker-9.jpg',
    objectFit: 'cover' as const,
    title: '05. CONNECT AND TEST',
    text: 'Connected everything and tested functionality. Bluetooth worked and EQ settings could be adjusted via DSP software.',
  },
  {
    image: '/amped-up/speaker-process-12.jpg',
    objectFit: 'cover' as const,
    title: '06. CAPTURE IMAGES',
    text: 'Used backdrop setup with studio lights to create portfolio images.',
  },
];

export default function AmpedUpPage() {
  const { navigateTo } = useNavigation();
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedProcessIndex, setSelectedProcessIndex] = useState(0);
  const [lightboxImage, setLightboxImage] = useState<{ src: string; title?: string } | null>(null);
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
    <section>
      {/* First View: Gallery */}
      <div className='h-screen relative overflow-hidden flex flex-col items-center'>
        {/* Title - Above thumbnails on mobile, bottom left on desktop */}
        <div
          className={`absolute bottom-24 md:bottom-8 left-4 md:left-8 pointer-events-none z-10 transition-opacity duration-300 ${
            activeIndex > 0 && GALLERY_IMAGES[activeIndex]?.hideTitle ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <h1
            className={`text-[clamp(1.75rem,8vh,3rem)] md:text-[clamp(1.75rem,8vh,8rem)] font-bold text-black leading-none ${vt323.className}`}
          >
            amped up
          </h1>
        </div>

        {/* Scrolling Photos - Full Width */}
        <div
          ref={scrollRef}
          className='absolute inset-0 top-0 overflow-x-auto overflow-y-hidden snap-x snap-mandatory flex scrollbar-hide'
        >
          {GALLERY_IMAGES.map((image, index) => (
            <div key={image.src} className='h-full min-w-full snap-center flex items-center justify-center relative'>
              <Image
                src={image.src}
                alt={`amped up ${index + 1}`}
                fill
                className={`${image.objectFit === 'contain' ? 'object-contain p-8' : 'object-contain md:object-cover'}`}
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
        <div className='absolute bottom-4 md:bottom-8 left-0 right-0 md:left-auto md:right-8 z-20 pointer-events-auto flex gap-2 overflow-x-auto'>
          {GALLERY_IMAGES.map((image, index) => (
            <button
              key={index}
              onClick={() => navigateToPhoto(index)}
              className={`relative cursor-pointer overflow-hidden transition-all flex-shrink-0 w-16 h-16 border ${
                index === 0 ? 'ml-4 md:ml-0' : ''
              } ${index === GALLERY_IMAGES.length - 1 ? 'mr-4 md:mr-0' : ''} ${
                activeIndex === index
                  ? 'border-2 border-black opacity-100'
                  : 'border-black/60 opacity-60 hover:opacity-100'
              }`}
            >
              <Image src={image.src} alt={`Thumbnail ${index + 1}`} fill className='object-cover' />
            </button>
          ))}
        </div>
      </div>

      {/* Info Content - Vertical 5-Column Layout */}
      <div className='px-4 md:px-8 pt-16 pb-16'>
        <div className='flex flex-col gap-8 text-foreground'>
          {/* Brief Section */}
          <div>
            <h2 className={`text-xl font-bold  border-b-2 border-foreground pb-2 mb-4`}>brief</h2>
            <div className='grid grid-cols-1 md:grid-cols-5 gap-y-2 text-sm'>
              <div className='hidden md:block'></div>
              <div className='hidden md:block'></div>
              <div className='hidden md:block'></div>
              <div className='md:col-span-2'>
                <p className='leading-relaxed'>
                  An old pair of Klein+Hummel speakers where my flatmate and I replaced the analogue amplifiers with
                  digital amps. This enables new functionality like EQ, DSP and Bluetooth.
                </p>
              </div>
            </div>
          </div>

          {/* specifications Section */}
          <div>
            <h2 className={`text-xl font-bold  border-b-2 border-foreground pb-2 mb-4`}>specifications</h2>
            <div className='grid grid-cols-2 md:grid-cols-5 gap-y-2 text-sm'>
              <div className='hidden md:block'></div>
              <div className='font-bold md:text-right'>Year</div>
              <div className='hidden md:block'></div>
              <div className='md:col-span-2'>2024-2025</div>

              <div className='hidden md:block'></div>
              <div className='font-bold md:text-right'>For</div>
              <div className='hidden md:block'></div>
              <div className='md:col-span-2'>Collaborative Project</div>

              <div className='hidden md:block'></div>
              <div className='font-bold md:text-right'>Type</div>
              <div className='hidden md:block'></div>
              <div className='md:col-span-2'>Upcycling</div>

              <div className='hidden md:block'></div>
              <div className='font-bold md:text-right'>Model</div>
              <div className='hidden md:block'></div>
              <div className='md:col-span-2'>Klein+Hummel O 96 - 3 way studio monitor speakers</div>

              <div className='hidden md:block'></div>
              <div className='font-bold md:text-right'>Upgrades</div>
              <div className='hidden md:block'></div>
              <div className='md:col-span-2'>
                <a
                  target='_blank'
                  rel='noopener noreferrer'
                  href='https://store.sure-electronics.com/product/757'
                  className='underline hover:no-underline'
                >
                  30W Amp with Bluetooth and DSP
                </a>
                {' / '}
                <a
                  target='_blank'
                  rel='noopener noreferrer'
                  href='https://store.sure-electronics.com/product/804'
                  className='underline hover:no-underline'
                >
                  50W Amp for lows
                </a>
                {' / '}
                <a
                  target='_blank'
                  rel='noopener noreferrer'
                  href='https://store.sure-electronics.com/product/726'
                  className='underline hover:no-underline'
                >
                  ICP5 In-circuit Programmer
                </a>
                {' / '}
                <a
                  target='_blank'
                  rel='noopener noreferrer'
                  href='https://www.meanwell.com/webapp/product/search.aspx?prod=LRS-200'
                  className='underline hover:no-underline'
                >
                  15V Power Supply
                </a>
              </div>
            </div>
          </div>

          {/* Idea Section */}
          <div>
            <h2 className={`text-xl font-bold  border-b-2 border-foreground pb-2 mb-4`}>idea</h2>
            <div className='grid grid-cols-1 md:grid-cols-5 gap-y-2 text-sm'>
              <div className='hidden md:block'></div>
              <div className='hidden md:block'></div>
              <div className='hidden md:block'></div>
              <div className='md:col-span-2'>
                <p className='leading-relaxed'>
                  My friend Julian acquired these speakers with one broken amp. We brainstormed how to revive them with
                  modern features and came to the conclusion that digital amps with Bluetooth and DSP for frequency
                  response control and room acoustic adaptation would be the way to go.
                </p>
              </div>
            </div>
          </div>

          {/* credits Section */}
          <div>
            <h2 className={`text-xl font-bold  border-b-2 border-foreground pb-2 mb-4`}>credits</h2>
            <div className='grid grid-cols-2 md:grid-cols-5 gap-y-2 text-sm'>
              <div className='hidden md:block'></div>
              <div className='font-bold md:text-right'>Idea & Concept</div>
              <div className='hidden md:block'></div>
              <div className='md:col-span-2'>Till Solenthaler & Julian Fehr</div>

              <div className='hidden md:block'></div>
              <div className='font-bold md:text-right'>Build</div>
              <div className='hidden md:block'></div>
              <div className='md:col-span-2'>Till Solenthaler</div>

              <div className='hidden md:block'></div>
              <div className='font-bold md:text-right'>AI Declaration</div>
              <div className='hidden md:block'></div>
              <div className='md:col-span-2'>No AI tools used</div>
            </div>
          </div>
        </div>
      </div>

      {/* Process Section */}
      <div className='px-4 md:px-8 pt-12 pb-16'>
        <div>
          <h2 className={`text-xl font-bold  border-b-2 border-foreground pb-2 mb-6`}>process</h2>

          <div className='flex flex-col lg:flex-row lg:items-stretch gap-6'>
            {/* Left: Process List */}
            <div className='order-2 lg:order-1 lg:w-2/5 space-y-2'>
              {PROCESS_STEPS.map((step, index) => {
                const isActive = selectedProcessIndex === index;
                return (
                  <div
                    key={index}
                    onClick={() => setSelectedProcessIndex(index)}
                    className={`w-full p-3 lg:border-l-4 transition-all text-left flex flex-col lg:flex-row lg:items-center gap-3 lg:cursor-pointer ${
                      isActive
                        ? 'lg:border-foreground bg-neutral-300/50'
                        : 'bg-neutral-300/50 lg:border-neutral-400 lg:bg-neutral-200/30 lg:hover:bg-neutral-200/60'
                    }`}
                  >
                    <div
                      className={`relative w-full aspect-square lg:w-20 lg:h-20 flex-shrink-0 overflow-hidden ${
                        isActive ? 'ring-2 ring-foreground' : 'ring-2 ring-foreground lg:ring-1 lg:ring-neutral-400'
                      }`}
                    >
                      <Image
                        src={step.image}
                        alt={`${step.title} thumbnail`}
                        fill
                        className={step.objectFit === 'contain' ? 'object-contain' : 'object-cover'}
                      />
                    </div>
                    <div className='flex-1'>
                      <span className='font-bold block'>{step.title}</span>
                      <span className='text-foreground/80 text-sm'>{step.text}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right: Selected Image - Desktop only */}
            <div className='hidden lg:flex order-1 lg:order-2 lg:w-3/5'>
              <div
                className='relative w-full overflow-hidden border border-black/60 bg-white cursor-pointer'
                onClick={() => {
                  const step = PROCESS_STEPS[selectedProcessIndex] || PROCESS_STEPS[0];
                  setLightboxImage({ src: step.image, title: step.title });
                }}
              >
                <Image
                  src={PROCESS_STEPS[selectedProcessIndex]?.image || PROCESS_STEPS[0].image}
                  alt={PROCESS_STEPS[selectedProcessIndex]?.title || 'Process step'}
                  fill
                  className={
                    PROCESS_STEPS[selectedProcessIndex]?.objectFit === 'contain' ? 'object-contain' : 'object-cover'
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Project Navigation */}
      <div className='px-4 md:px-8 pb-16'>
        <div className='flex justify-between items-center border-b-2 border-black pb-2'>
          <span
            onClick={() => navigateTo('/retrofitted')}
            className='font-bold cursor-pointer lowercase text-[clamp(0.625rem,3vh,1rem)] md:text-[clamp(0.875rem,4vh,4rem)] leading-none hover:opacity-60 transition-opacity'
          >
            previous
          </span>
          <span
            onClick={() => navigateTo('/toy-lexicon')}
            className='font-bold cursor-pointer lowercase text-[clamp(0.625rem,3vh,1rem)] md:text-[clamp(0.875rem,4vh,4rem)] leading-none hover:opacity-60 transition-opacity'
          >
            next
          </span>
        </div>
      </div>

      <Lightbox src={lightboxImage?.src || null} title={lightboxImage?.title} onClose={() => setLightboxImage(null)} />
    </section>
  );
}
