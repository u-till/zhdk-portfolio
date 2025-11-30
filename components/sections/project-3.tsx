'use client';

import { ImageGallery } from '@/components/image-gallery';
import { MinimalTabs } from '@/components/minimal-tabs';
import { vt323 } from '@/lib/fonts';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

const IMAGES = ['/amped-up/speakers-front.jpg', '/amped-up/speakers-back.jpg'];

const TABS = [
  {
    id: 'info',
    label: 'INFO',
    content: (
      <div className='space-y-4'>
        <h3 className='text-lg font-bold uppercase border-b border-black/60 pb-2'>Project Details</h3>
        <p>A custom speaker build project featuring handcrafted wooden enclosures with modern audio components.</p>
        <div className='grid grid-cols-2 gap-4 pt-4'>
          <div>
            <span className='font-bold block'>TYPE:</span>
            <span>Audio Hardware</span>
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
        <h3 className='text-lg font-bold uppercase border-b border-black/60 pb-2'>Technical Specifications</h3>
        <ul className='space-y-2 list-none'>
          <li className='border-l-2 border-foreground pl-4'>
            <span className='font-bold'>DRIVERS:</span> Custom Selected
          </li>
          <li className='border-l-2 border-foreground pl-4'>
            <span className='font-bold'>ENCLOSURE:</span> Wooden Cabinet
          </li>
          <li className='border-l-2 border-foreground pl-4'>
            <span className='font-bold'>FINISH:</span> Natural Wood
          </li>
          <li className='border-l-2 border-foreground pl-4'>
            <span className='font-bold'>OUTPUT:</span> High Fidelity
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
        <h3 className='text-lg font-bold uppercase border-b border-black/60 pb-2'>Build Process</h3>
        <div className='space-y-3'>
          <div className='bg-neutral-100 p-3 border-l-2 border-foreground'>
            <span className='font-bold block'>01. DESIGN</span>
            <span className='text-sm'>Enclosure planning and measurements</span>
          </div>
          <div className='bg-neutral-100 p-3 border-l-2 border-foreground'>
            <span className='font-bold block'>02. BUILD</span>
            <span className='text-sm'>Woodworking and assembly</span>
          </div>
          <div className='bg-neutral-100 p-3 border-l-2 border-foreground'>
            <span className='font-bold block'>03. TUNE</span>
            <span className='text-sm'>Audio calibration and testing</span>
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
        <h3 className='text-lg font-bold uppercase border-b border-black/60 pb-2'>Credits</h3>
        <div className='space-y-3'>
          <div>
            <span className='font-bold block uppercase text-xs tracking-wider'>Design & Build</span>
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

export function Project3() {
  const [showMobileTabs, setShowMobileTabs] = useState(false);

  return (
    <section className='h-screen flex flex-col relative overflow-hidden pt-32 md:pt-42 gap-8'>
      <div className='flex justify-center max-w-screen-2xl mx-auto w-full px-4 md:px-6'>
        <h2 className={`text-5xl lg:text-7xl font-bold ${vt323.className}`}>amped up</h2>
      </div>
      {/* Horizontal Scrolling Container */}
      <div className='flex-1 overflow-x-auto overflow-y-hidden snap-x snap-mandatory lg:snap-none flex gap-8 px-4 md:px-6 pb-8 max-w-screen-2xl mx-auto scrollbar-hide'>
        {/* Column 1: Image Gallery */}
        <div className='min-w-full max-h-[60vh] lg:max-h-none lg:min-w-[480px] lg:flex-1 snap-center lg:snap-align-none flex-shrink-0 flex items-center justify-center relative'>
          <ImageGallery images={IMAGES} width={500} height={500} />

          {/* Mobile Info Button */}
          <button
            onClick={() => setShowMobileTabs(!showMobileTabs)}
            className='lg:hidden absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-12 h-12 border border-black/60 bg-background/90 backdrop-blur-md font-mono font-bold text-xl hover:bg-foreground/5 transition-colors z-20 flex items-center justify-center'
          >
            {showMobileTabs ? '×' : 'i'}
          </button>
        </div>

        {/* Column 2: Tabs */}
        <div className='min-w-full max-h-[60vh] lg:max-h-none lg:min-w-[480px] lg:flex-1 snap-center lg:snap-align-none flex-shrink-0 flex items-center justify-center'>
          <div className='w-full max-w-4xl h-[500px]'>
            <MinimalTabs tabs={TABS} />
          </div>
        </div>

        {/* Column 3: Empty styled div */}
        <div className='min-w-full max-h-[60vh] lg:max-h-none lg:min-w-[480px] lg:flex-1 snap-center lg:snap-align-none flex-shrink-0 flex items-center justify-center'>
          <div className='w-full max-w-4xl h-[500px] border border-black/60 bg-background/90 backdrop-blur-md'></div>
        </div>
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
            <MinimalTabs tabs={TABS} />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
