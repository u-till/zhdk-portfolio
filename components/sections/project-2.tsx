'use client';

import { ImageGallery } from '@/components/image-gallery';
import { RetroTabs } from '@/components/retro-tabs';
import { shrikhand } from '@/lib/fonts';
import Image from 'next/image';

const IMAGES = ['/retrofitted/lamp-1.png', '/retrofitted/lamp-2.png', '/retrofitted/lamp-3.png'];

const TABS = [
  {
    id: 'info',
    label: 'INFO',
    content: (
      <div className='space-y-4'>
        <h3 className='text-lg font-bold uppercase border-b border-orange-300/40 pb-2'>Project Details</h3>
        <p>
          A stunning space-age lamp from the 1970s, retrofitted with modern LED technology while preserving its iconic
          aesthetic.
        </p>
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
  return (
    <section className='h-screen flex flex-col relative overflow-y-hidden pt-24 md:pt-42 gap-4 lg:gap-8'>
      <div className='flex justify-center max-w-screen-2xl mx-auto w-full px-4 md:px-6 flex-shrink-0'>
        <h2 className={`text-4xl lg:text-7xl font-bold text-white sticky left-2 lg:static ${shrikhand.className}`}>retrofitted</h2>
      </div>
      {/* Horizontal Scrolling Container */}
      <div className='flex-1 overflow-x-auto overflow-y-hidden lg:overflow-y-visible snap-x snap-mandatory lg:snap-none flex gap-4 lg:gap-8 px-4 md:px-6 pb-8 pt-4 max-w-screen-2xl mx-auto scrollbar-hide'>
        {/* Column 1: Image Gallery */}
        <div className='min-w-[90vw] max-w-[90vw] max-h-[60vh] lg:max-h-none lg:min-w-[480px] lg:flex-1 snap-center lg:snap-align-none flex-shrink-0 flex items-center justify-center relative'>
          <ImageGallery images={IMAGES} width={500} height={500} variant='retro' />
        </div>

        {/* Column 2: Tabs */}
        <div className='min-w-[90vw] max-w-[90vw] max-h-[60vh] lg:max-h-none lg:min-w-[480px] lg:flex-1 snap-center lg:snap-align-none flex-shrink-0 flex items-center justify-center'>
          <div className='w-full max-w-4xl h-[500px]'>
            <RetroTabs tabs={TABS} />
          </div>
        </div>

        {/* Column 3: Saudade Image */}
        <div className='min-w-[90vw] max-w-[90vw] max-h-[60vh] lg:max-h-none lg:min-w-[480px] lg:flex-1 snap-center lg:snap-align-none flex-shrink-0 flex items-center justify-center'>
          <div className='relative w-[500px] h-[500px] max-w-full max-h-full rounded-[32px] border border-orange-300/40 bg-orange-500/80 backdrop-blur-md shadow-lg overflow-hidden'>
            <Image src='/saudade/hongkong-2.jpg' alt='Saudade' fill className='object-cover' />
          </div>
        </div>
      </div>
    </section>
  );
}
