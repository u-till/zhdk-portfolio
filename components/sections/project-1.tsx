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
      <div className='space-y-4'>
        <h3 className='text-lg font-bold uppercase border-b-2 border-black pb-2'>Project Details</h3>
        <p>A 360° interactive view of the korpus object. Rotate using controls or drag to explore all angles.</p>
        <div className='grid grid-cols-2 gap-4 pt-4'>
          <div>
            <span className='font-bold block'>TYPE:</span>
            <span>3D Viewer</span>
          </div>
          <div>
            <span className='font-bold block'>YEAR:</span>
            <span>2024</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'specs',
    label: 'SPECS',
    content: (
      <div className='space-y-4'>
        <h3 className='text-lg font-bold uppercase border-b-2 border-black pb-2'>Technical Specifications</h3>
        <ul className='space-y-2 list-none'>
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
            <span>2024</span>
          </div>
        </div>
      </div>
    ),
  },
];

export function Project1() {
  const [showMobileTabs, setShowMobileTabs] = useState(false);

  return (
    <section className='h-screen flex flex-col relative overflow-hidden'>
      <div className='absolute inset-x-0 top-0 pt-32 md:pt-42 flex justify-center pointer-events-none z-10'>
        <h2 className={`text-5xl lg:text-7xl font-bold ${allertaStencil.className}`}>under construction</h2>
      </div>
      <div className='flex-1 flex flex-col lg:flex-row items-center justify-center px-4 md:px-8 lg:px-12 gap-8 lg:gap-12 pt-32 md:pt-40 max-w-7xl mx-auto w-full pb-8'>
        {/* 360 Viewer */}
        <div className='w-full lg:w-auto flex-shrink-0 relative'>
          <Viewer360
            imageFolder='under-construction/korpus-360'
            totalFrames={27}
            imageFormat='png'
            imagePrefix='normalized-'
            imagePadding={2}
            width={500}
            height={500}
          />

          {/* Mobile Info Button */}
          <button
            onClick={() => setShowMobileTabs(!showMobileTabs)}
            className='lg:hidden absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-12 h-12 border-4 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-mono font-bold text-xl hover:bg-neutral-100 transition-colors z-20 flex items-center justify-center'
          >
            {showMobileTabs ? '×' : 'i'}
          </button>
        </div>

        {/* Tabbed Content - Desktop always visible, Mobile conditional */}
        <div className='hidden lg:block lg:w-[500px] lg:h-[500px]'>
          <BrutalistTabs tabs={TABS} />
        </div>

        {/* Mobile Tabs Modal */}
        <AnimatePresence>
          {showMobileTabs && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className='lg:hidden fixed inset-4 top-32 max-h-[60vh] z-30'
            >
              <BrutalistTabs tabs={TABS} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
