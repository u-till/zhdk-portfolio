'use client';

import { ImageGallery } from '@/components/image-gallery';
import { RetroTabs } from '@/components/retro-tabs';
import { shrikhand } from '@/lib/fonts';

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
    <section className='h-screen flex flex-col pt-24 md:pt-28 gap-4 md:gap-8'>
      {/* Content Container */}
      <div className='flex-1 flex flex-col lg:flex-row gap-4 md:gap-8 p-4 md:p-8 max-w-screen-2xl mx-auto w-full overflow-hidden'>
        {/* Column 1: Image Gallery */}
        <div className='flex flex items-start justify-start'>
          <ImageGallery images={IMAGES} variant='retro' />
        </div>

        {/* Column 2: Tabs */}
        <div className='flex flex-1 w-full flex-col gap-4 md:gap-8 items-start justify-start'>
          <h2 className={`text-4xl lg:text-7xl font-bold text-white ${shrikhand.className}`}>retrofitted</h2>
          <div className='w-full h-full'>
            <RetroTabs tabs={TABS} />
          </div>
        </div>
      </div>
    </section>
  );
}
