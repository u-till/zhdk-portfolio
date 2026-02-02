'use client';

import { useNavigation } from '@/contexts/navigation-context';
import { useCarouselKeyboard } from '@/hooks/use-carousel-keyboard';
import { useCarouselScroll } from '@/hooks/use-carousel-scroll';
import { dinNext } from '@/lib/fonts';
import { ImageItem } from '@/types/project';
import Image from 'next/image';
import { useCallback, useRef, useState } from 'react';

const GALLERY_IMAGES: ImageItem[] = [
  { src: '/toy-lexicon/mockup-1.png', objectFit: 'contain' },
  { src: '/toy-lexicon/mockup-2.png', objectFit: 'contain' },
  { src: '/toy-lexicon/mockup-3.png', objectFit: 'contain' },
  { src: '/toy-lexicon/mockup-4.png', objectFit: 'contain' },
  { src: '/toy-lexicon/mockup-5.png', objectFit: 'contain' },
  { src: '/toy-lexicon/macbook-mockup-1.png', objectFit: 'contain' },
  { src: '/toy-lexicon/macbook-mockup-2.png', objectFit: 'contain' },
];

const PROCESS_STEPS: {
  image: string;
  objectFit: 'cover' | 'contain';
  title: string;
  text: string;
}[] = [
  {
    image: '/toy-lexicon/book-process-1.jpg',
    objectFit: 'cover',
    title: '01. COVER DESIGN',
    text: 'Designed the cover first, experimenting with layouts and typography to set the tone. Defined a grid system for consistent layout throughout.',
  },
  {
    image: '/toy-lexicon/book-process-2.jpg',
    objectFit: 'cover',
    title: '02. RESEARCH AND CATALOGING',
    text: 'Used reference books for inspiration. Created a JSON database of all kits with manufacturer, country and title for InDesign import. Found lots of missing data.',
  },
  {
    image: '/toy-lexicon/book-process-3.jpg',
    objectFit: 'cover',
    title: '03. CMS FOR CONTENT',
    text: 'Built a custom CMS so my father and his friends could easily add, edit and organize content without technical knowledge.',
  },
  {
    image: '/toy-lexicon/book-process-4.jpg',
    objectFit: 'cover',
    title: '04. INDESIGN AUTOMATION',
    text: 'Developed an InDesign ExtendScript to automatically layout content from JSON using labeled template fields. Enables quick generation of consistent layouts for refinement.',
  },
  {
    image: '/toy-lexicon/book-process-4.jpg',
    objectFit: 'cover',
    title: '05. ITERATE AND REFINE',
    text: 'Continuous feedback loops with my father to adjust layouts, fix data issues, and improve the visual presentation until ready for print.',
  },
];

export default function ToyLexiconPage() {
  const { navigateTo } = useNavigation();
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
    <section className={dinNext.className}>
      {/* First View: Gallery */}
      <div className='h-screen relative overflow-hidden flex flex-col items-center'>
        {/* Title - Above thumbnails on mobile, bottom left on desktop */}
        <div
          className={`absolute bottom-24 md:bottom-8 left-4 md:left-8 pointer-events-none z-10 transition-opacity duration-300 ${
            activeIndex > 0 && GALLERY_IMAGES[activeIndex]?.hideTitle ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <h2
            className={`text-[clamp(1.75rem,8vh,3rem)] md:text-[clamp(1.75rem,8vh,8rem)] font-bold text-black leading-none ${dinNext.className}`}
          >
            toy lexicon
          </h2>
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
            className='hidden cursor-pointer lg:flex items-center justify-center w-12 h-12 rounded-lg bg-[#5BB660]/10 border-2 border-[#5BB660]/40 backdrop-blur-md hover:bg-[#5BB660]/20 transition-colors pointer-events-auto'
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
            className='hidden cursor-pointer lg:flex items-center justify-center w-12 h-12 rounded-lg bg-[#5BB660]/10 border-2 border-[#5BB660]/40 backdrop-blur-md hover:bg-[#5BB660]/20 transition-colors pointer-events-auto'
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
              className={`relative cursor-pointer overflow-hidden transition-all flex-shrink-0 w-16 h-16 rounded-lg border ${
                index === 0 ? 'ml-4 md:ml-0' : ''
              } ${index === GALLERY_IMAGES.length - 1 ? 'mr-4 md:mr-0' : ''} ${
                activeIndex === index
                  ? 'border-2 border-[#5BB660] opacity-100'
                  : 'border-[#5BB660]/40 opacity-60 hover:opacity-100'
              }`}
            >
              <Image src={image.src} alt={`Thumbnail ${index + 1}`} fill className='object-cover' />
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
      <div className=' px-4 md:px-8 pt-16 pb-16'>
        <div className='flex flex-col gap-8 text-foreground'>
          {/* Brief Section */}
          <div>
            <h3 className={`text-xl font-bold  border-b-2 border-[#5BB660] pb-2 mb-4 ${dinNext.className}`}>brief</h3>
            <div className='grid grid-cols-1 md:grid-cols-5 gap-y-2 text-sm'>
              <div className='hidden md:block'></div>
              <div className='hidden md:block'></div>
              <div className='hidden md:block'></div>
              <div className='md:col-span-2'>
                <p className='leading-relaxed'>
                  A book exploring construction kits from the last 100 years. My father and two friends photographed his
                  collection and asked me to make it into a book.
                  <br />
                  <br />
                  Since images were taken over years with missing data, I built a custom CMS for collaborative editing
                  into a central JSON database. This then feeds into an InDesign ExtendScript for automated layout.
                </p>
              </div>
            </div>
          </div>

          {/* Idea Section */}
          <div>
            <h3 className={`text-xl font-bold  border-b-2 border-[#5BB660] pb-2 mb-4 ${dinNext.className}`}>idea</h3>
            <div className='grid grid-cols-1 md:grid-cols-5 gap-y-2 text-sm'>
              <div className='hidden md:block'></div>
              <div className='hidden md:block'></div>
              <div className='hidden md:block'></div>
              <div className='md:col-span-2'>
                <p className='leading-relaxed'>
                  My father has been collecting and building with old construction kits for decades. When he asked me to
                  help turn his collection into a book, I saw an opportunity to combine my design skills with his
                  passion project.
                </p>
              </div>
            </div>
          </div>

          {/* specifications Section */}
          <div>
            <h3 className={`text-xl font-bold  border-b-2 border-[#5BB660] pb-2 mb-4 ${dinNext.className}`}>
              specifications
            </h3>
            <div className='grid grid-cols-2 md:grid-cols-5 gap-y-2 text-sm'>
              <div className='hidden md:block'></div>
              <div className='font-bold md:text-right'>Year</div>
              <div className='hidden md:block'></div>
              <div className='md:col-span-2'>2025-Ongoing</div>

              <div className='hidden md:block'></div>
              <div className='font-bold md:text-right'>For</div>
              <div className='hidden md:block'></div>
              <div className='md:col-span-2'>My father</div>

              <div className='hidden md:block'></div>
              <div className='font-bold md:text-right'>Type</div>
              <div className='hidden md:block'></div>
              <div className='md:col-span-2'>Book Layout / Web App</div>

              <div className='hidden md:block'></div>
              <div className='font-bold md:text-right'>Format</div>
              <div className='hidden md:block'></div>
              <div className='md:col-span-2'>Hardcover Book, 120+ pages</div>

              <div className='hidden md:block'></div>
              <div className='hidden md:block'></div>
              <div className='hidden md:block'></div>
              <div className='md:col-span-2 col-span-2'>
                <a
                  href='https://adb-cms.vercel.app/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='inline-block mt-2 px-6 py-3 bg-[#5BB660] text-white font-bold  text-sm rounded-lg hover:bg-[#4d9b52] transition-colors'
                >
                  Editor Demo
                  <span className='block text-xs font-normal opacity-80'>user: guest / password: guest</span>
                </a>
              </div>
            </div>
          </div>

          {/* learnings Section */}
          <div>
            <h3 className={`text-xl font-bold  border-b-2 border-[#5BB660] pb-2 mb-4 ${dinNext.className}`}>
              learnings
            </h3>
            <div className='grid grid-cols-1 md:grid-cols-5 gap-y-2 text-sm'>
              <div className='hidden md:block'></div>
              <div className='hidden md:block'></div>
              <div className='hidden md:block'></div>
              <div className='md:col-span-2'>
                <ul className='list-disc list-outside pl-3 space-y-1'>
                  <li>Align vision before starting</li>
                  <li>Make sure source material is complete and consistent</li>
                  <li>Invest more time in gathering inspiration for layouting</li>
                </ul>
              </div>
            </div>
          </div>

          {/* credits Section */}
          <div>
            <h3 className={`text-xl font-bold  border-b-2 border-[#5BB660] pb-2 mb-4 ${dinNext.className}`}>credits</h3>
            <div className='grid grid-cols-2 md:grid-cols-5 gap-y-2 text-sm'>
              <div className='hidden md:block'></div>
              <div className='font-bold md:text-right'>Models and Curation</div>
              <div className='hidden md:block'></div>
              <div className='md:col-span-2'>Peter Leutenegger</div>

              <div className='hidden md:block'></div>
              <div className='font-bold md:text-right'>Photography</div>
              <div className='hidden md:block'></div>
              <div className='md:col-span-2'>Alex Colle</div>

              <div className='hidden md:block'></div>
              <div className='font-bold md:text-right'>Collages</div>
              <div className='hidden md:block'></div>
              <div className='md:col-span-2'>Kurt Kleinert</div>

              <div className='hidden md:block'></div>
              <div className='font-bold md:text-right'>Layout and CMS</div>
              <div className='hidden md:block'></div>
              <div className='md:col-span-2'>Till Solenthaler</div>

              <div className='hidden md:block'></div>
              <div className='font-bold md:text-right'>AI Declaration</div>
              <div className='hidden md:block'></div>
              <div className='md:col-span-2'>Claude Code for co-programming CMS and InDesign ExtendScript</div>
            </div>
          </div>
        </div>
      </div>

      {/* Process Section */}
      <div className=' px-4 md:px-8 pt-12 pb-16'>
        <div>
          <h3 className={`text-xl font-bold  border-b-2 border-[#5BB660] pb-2 mb-6 ${dinNext.className}`}>process</h3>

          <div className='flex flex-col lg:flex-row lg:items-stretch gap-6'>
            {/* Left: Process List */}
            <div className='order-2 lg:order-1 lg:w-2/5 space-y-2'>
              {PROCESS_STEPS.map((step, index) => {
                const isActive = selectedProcessIndex === index;
                return (
                  <div
                    key={index}
                    onClick={() => setSelectedProcessIndex(index)}
                    className={`w-full p-3 lg:border-l-4 transition-all text-left flex flex-col md:flex-row md:items-center gap-3 rounded-r-lg lg:cursor-pointer ${
                      isActive
                        ? 'lg:border-[#5BB660] bg-[#cee9cf]/50'
                        : 'bg-[#cee9cf]/50 lg:border-[#addaaf] lg:bg-[#def0df]/50 lg:hover:bg-[#cee9cf]/30'
                    }`}
                  >
                    <div
                      className={`relative w-full aspect-square md:w-20 md:h-20 flex-shrink-0 overflow-hidden rounded-lg ${
                        isActive ? 'ring-2 ring-[#5BB660]' : 'ring-2 ring-[#5BB660] lg:ring-1 lg:ring-[#addaaf]'
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
              <div className='relative w-full rounded-lg overflow-hidden border-2 border-[#5BB660]/40'>
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
          <h1
            onClick={() => navigateTo('/amped-up')}
            className='font-bold cursor-pointer lowercase text-[clamp(0.625rem,3vh,1rem)] md:text-[clamp(0.875rem,4vh,4rem)] leading-none hover:opacity-60 transition-opacity'
          >
            previous
          </h1>
          <h1
            onClick={() => navigateTo('/lost-in-space')}
            className='font-bold cursor-pointer lowercase text-[clamp(0.625rem,3vh,1rem)] md:text-[clamp(0.875rem,4vh,4rem)] leading-none hover:opacity-60 transition-opacity'
          >
            next
          </h1>
        </div>
      </div>
    </section>
  );
}
