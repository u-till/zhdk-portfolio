'use client';

import { BrutalistTabs } from '@/components/brutalist-tabs';
import { Viewer360 } from '@/components/viewer-360';
import { allertaStencil } from '@/lib/fonts';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

const TABS = [
  {
    id: 'info',
    label: 'INFO',
    content: (
      <div className='space-y-6'>
        <div>
          <h3 className='text-lg font-bold uppercase border-b-2 border-black pb-2'>Project Details</h3>
          <p className='mt-4'>A filing cabinet built with planks from a construction site visualised with a 360° rotatable viewer.</p>
          <div className='grid grid-cols-2 gap-4 pt-4'>
            <div>
              <span className='font-bold block'>TYPE:</span>
              <span>Furniture</span>
            </div>
            <div>
              <span className='font-bold block'>YEAR:</span>
              <span>2025</span>
            </div>
          </div>
        </div>
        <div>
          <h3 className='text-lg font-bold uppercase border-b-2 border-black pb-2'>Specifications</h3>
          <ul className='space-y-2 list-none mt-4'>
            <li className='border-l-4 border-red-600 pl-4'>
              <span className='font-bold'>FRAMES:</span> 27
            </li>
            <li className='border-l-4 border-red-600 pl-4'>
              <span className='font-bold'>FORMAT:</span> PNG
            </li>
            <li className='border-l-4 border-red-600 pl-4'>
              <span className='font-bold'>RESOLUTION:</span> High Quality
            </li>
            <li className='border-l-4 border-red-600 pl-4'>
              <span className='font-bold'>INTERACTION:</span> Drag & Click
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
        <h3 className='text-lg font-bold uppercase border-b-2 border-black pb-2'>Development Process</h3>
        <div className='space-y-3'>
          <div className='bg-neutral-100 p-3 border-l-4 border-black'>
            <span className='font-bold block'>01. CAPTURE</span>
            <span className='text-sm'>360° photography setup</span>
          </div>
          <div className='bg-neutral-100 p-3 border-l-4 border-black'>
            <span className='font-bold block'>02. PROCESS</span>
            <span className='text-sm'>Image normalization</span>
          </div>
          <div className='bg-neutral-100 p-3 border-l-4 border-black'>
            <span className='font-bold block'>03. IMPLEMENT</span>
            <span className='text-sm'>Interactive viewer</span>
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
        <h3 className='text-lg font-bold uppercase border-b-2 border-black pb-2'>Credits</h3>
        <div className='space-y-3'>
          <div>
            <span className='font-bold block uppercase text-xs tracking-wider'>Photography</span>
            <span>Till Solenthaler</span>
          </div>
          <div>
            <span className='font-bold block uppercase text-xs tracking-wider'>Development</span>
            <span>Till Solenthaler</span>
          </div>
          <div>
            <span className='font-bold block uppercase text-xs tracking-wider'>Year</span>
            <span>2025</span>
          </div>
        </div>
      </div>
    ),
  },
];

export function Project1() {
  const [showMobileInfo, setShowMobileInfo] = useState(false);

  return (
    <section className='h-screen flex flex-col items-center pt-24 md:pt-28 gap-4 md:gap-8 px-4 md:px-8'>
      {/* Desktop Layout */}
      <div className='hidden lg:flex flex-1 flex-row gap-4 md:gap-8 max-w-screen-2xl mx-0 md:pt-8 w-full overflow-hidden pb-8'>
        {/* Column 1: 360 Viewer */}
        <div className='flex flex items-start justify-start'>
          <Viewer360
            imageFolder='under-construction/korpus-360'
            totalFrames={27}
            imageFormat='png'
            imagePrefix='normalized-'
            imagePadding={2}
          />
        </div>

        {/* Column 2: Tabs */}
        <div className='flex flex-1 w-full flex-col gap-4 md:gap-8 items-start justify-start'>
          <h2 className={`text-4xl lg:text-7xl font-bold ${allertaStencil.className}`}>
            under <br></br>construction
          </h2>
          <div className='w-full h-full'>
            <BrutalistTabs tabs={TABS} />
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className='lg:hidden flex-1 flex flex-col gap-4 max-w-screen-2xl mx-auto px-0 w-full overflow-visible pb-4  '>
        {/* Title - Always visible */}
        <h2 className={`text-4xl font-bold ${allertaStencil.className}`}>
          under <br></br>construction
        </h2>

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
                <Viewer360
                  imageFolder='under-construction/korpus-360'
                  totalFrames={27}
                  imageFormat='png'
                  imagePrefix='normalized-'
                  imagePadding={2}
                />
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
                <BrutalistTabs tabs={TABS} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Button - Always visible */}
        <button
          onClick={() => setShowMobileInfo(!showMobileInfo)}
          className='w-full py-4 px-6 bg-red-600 text-white font-mono font-bold uppercase border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:bg-red-700 transition-colors'
        >
          {showMobileInfo ? 'Back' : 'More Infos'}
        </button>
      </div>
    </section>
  );
}
