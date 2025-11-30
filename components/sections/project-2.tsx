'use client';

import { ImageGallery } from '@/components/image-gallery';
import { RetroTabs } from '@/components/retro-tabs';
import { shrikhand } from '@/lib/fonts';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

const IMAGES = ['/retrofitted/lamp-1.png', '/retrofitted/lamp-2.png', '/retrofitted/lamp-3.png'];

const TABS = [
  {
    id: 'info',
    label: 'INFO',
    content: (
      <div className='space-y-4'>
        <h3 className='text-lg font-bold uppercase border-b border-orange-300/40 pb-2'>Project Details</h3>
        <p>A stunning space-age lamp from the 1970s, retrofitted with modern LED technology while preserving its iconic aesthetic.</p>
        <div className='grid grid-cols-2 gap-4 pt-4'>
          <div>
            <span className='font-bold block'>TYPE:</span>
            <span>Lighting Design</span>
          </div>
          <div>
            <span className='font-bold block'>ERA:</span>
            <span>1970s Revival</span>
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
        <h3 className='text-lg font-bold uppercase border-b border-orange-300/40 pb-2'>Technical Specifications</h3>
        <ul className='space-y-2 list-none'>
          <li className='border-l-2 border-orange-300 pl-4'>
            <span className='font-bold'>STYLE:</span> Space Age / Atomic Era
          </li>
          <li className='border-l-2 border-orange-300 pl-4'>
            <span className='font-bold'>LIGHTING:</span> Modern LED Retrofit
          </li>
          <li className='border-l-2 border-orange-300 pl-4'>
            <span className='font-bold'>MATERIALS:</span> Acrylic & Metal
          </li>
          <li className='border-l-2 border-orange-300 pl-4'>
            <span className='font-bold'>CONDITION:</span> Restored & Updated
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
        <h3 className='text-lg font-bold uppercase border-b border-orange-300/40 pb-2'>Restoration Process</h3>
        <div className='space-y-3'>
          <div className='bg-orange-600/30 p-3 border-l-2 border-orange-300 rounded-lg'>
            <span className='font-bold block'>01. SOURCING</span>
            <span className='text-sm'>Finding authentic 70s piece</span>
          </div>
          <div className='bg-orange-600/30 p-3 border-l-2 border-orange-300 rounded-lg'>
            <span className='font-bold block'>02. RESTORATION</span>
            <span className='text-sm'>Cleaning and repair work</span>
          </div>
          <div className='bg-orange-600/30 p-3 border-l-2 border-orange-300 rounded-lg'>
            <span className='font-bold block'>03. MODERNIZATION</span>
            <span className='text-sm'>LED retrofit installation</span>
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
        <h3 className='text-lg font-bold uppercase border-b border-orange-300/40 pb-2'>Credits</h3>
        <div className='space-y-3'>
          <div>
            <span className='font-bold block uppercase text-xs tracking-wider'>Restoration</span>
            <span>Till Solenthaler</span>
          </div>
          <div>
            <span className='font-bold block uppercase text-xs tracking-wider'>Photography</span>
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

export function Project2() {
  const [showMobileTabs, setShowMobileTabs] = useState(false);

  return (
    <section className='h-screen flex flex-col relative overflow-hidden pt-32 md:pt-42 gap-8'>
      <div className='flex justify-center max-w-6xl mx-auto w-full px-4 md:px-6'>
        <h2 className={`text-5xl lg:text-7xl font-bold text-white ${shrikhand.className}`}>retrofitted</h2>
      </div>
      <div className='flex-1 flex flex-col lg:flex-row items-start justify-center px-4 md:px-0 gap-8 lg:gap-12 max-w-6xl mx-auto w-full pb-8'>
        {/* Image Gallery */}
        <div className='w-full lg:w-auto flex-shrink-0 relative'>
          <ImageGallery images={IMAGES} width={500} height={500} variant='retro' />

          {/* Mobile Info Button */}
          <button
            onClick={() => setShowMobileTabs(!showMobileTabs)}
            className='lg:hidden absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-12 h-12 rounded-full border border-orange-300/40 bg-orange-500/80 backdrop-blur-md font-mono font-bold text-xl text-white hover:bg-orange-600/80 transition-colors z-20 flex items-center justify-center'
          >
            {showMobileTabs ? '×' : 'i'}
          </button>
        </div>

        {/* Tabbed Content - Desktop always visible, Mobile conditional */}
        <div className='hidden lg:block w-full'>
          <RetroTabs tabs={TABS} />
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
              <RetroTabs tabs={TABS} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
