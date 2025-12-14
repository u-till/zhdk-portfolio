'use client';

import { ImageGallery } from '@/components/image-gallery';
import { PillTabs } from '@/components/pill-tabs';
import { dinNext } from '@/lib/fonts';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

const IMAGES = ['/toy-lexicon/front-mockup.png', '/toy-lexicon/cover.jpg'];

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

export function Project4() {
  const [showMobileInfo, setShowMobileInfo] = useState(false);

  return (
    <section
      className={`h-screen flex flex-col items-center pt-24 md:pt-28 gap-4 md:gap-8 px-4 md:px-8 ${dinNext.className}`}
    >
      {/* Desktop Layout */}
      <div className='hidden lg:flex flex-1 flex-row gap-4 md:gap-8 max-w-screen-2xl mx-0 md:pt-8 w-full overflow-hidden pb-8 max-h-[1000px]'>
        {/* Column 1: Image Gallery */}
        <div className='flex flex items-start justify-start'>
          <ImageGallery images={IMAGES} variant='pill' />
        </div>

        {/* Column 2: Tabs */}
        <div className='flex flex-1 w-full flex-col gap-4 md:gap-8 items-start justify-start'>
          <h2 className={`text-4xl lg:text-7xl uppercase font-bold ${dinNext.className}`}>toy lexicon</h2>
          <div className='w-full h-full'>
            <PillTabs tabs={TABS} />
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className='lg:hidden flex-1 flex flex-col gap-4 max-w-screen-2xl mx-auto px-0 w-full overflow-visible pb-4'>
        {/* Title - Always visible */}
        <h2 className={`text-4xl text-center font-bold ${dinNext.className}`}>toy lexicon</h2>

        {/* Middle Content - Swipeable */}
        <div className='flex-1 relative'>
          <AnimatePresence initial={false}>
            {!showMobileInfo ? (
              <motion.div
                key='viewer'
                initial={{ x: 'calc(-100% - 1rem)' }}
                animate={{ x: 0 }}
                exit={{ x: 'calc(-100% - 1rem)' }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className='absolute inset-0 flex items-center justify-center w-full'
              >
                <ImageGallery images={IMAGES} variant='pill' />
              </motion.div>
            ) : (
              <motion.div
                key='info'
                initial={{ x: 'calc(100% + 1rem)' }}
                animate={{ x: 0 }}
                exit={{ x: 'calc(100% + 1rem)' }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className='absolute inset-0 overflow-hidden'
              >
                <PillTabs tabs={TABS} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Button - Always visible */}
        <button
          onClick={() => setShowMobileInfo(!showMobileInfo)}
          className='w-full py-4 px-6 rounded-full bg-green-500/10 border-2 border-green-500/40 backdrop-blur-md font-bold uppercase hover:bg-green-500/20 transition-colors'
        >
          {showMobileInfo ? 'Back' : 'More Infos'}
        </button>
      </div>
    </section>
  );
}
