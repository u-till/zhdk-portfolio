'use client';

import { ImageGallery } from '@/components/image-gallery';
import { MinimalTabs } from '@/components/minimal-tabs';
import { vt323 } from '@/lib/fonts';

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
  return (
    <section className='h-screen flex flex-col pt-24 md:pt-28 gap-4 md:gap-8'>
      {/* Content Container */}
      <div className='flex-1 flex flex-col lg:flex-row gap-4 md:gap-8 p-4 md:p-8 max-w-screen-2xl mx-auto w-full overflow-hidden'>
        {/* Column 1: Image Gallery */}
        <div className='flex flex items-start justify-start'>
          <ImageGallery images={IMAGES} />
        </div>

        {/* Column 2: Tabs */}
        <div className='flex flex-1 w-full flex-col gap-4 md:gap-8 items-start justify-start'>
          <h2 className={`text-4xl lg:text-7xl font-bold ${vt323.className}`}>amped up</h2>
          <div className='w-full h-full'>
            <MinimalTabs tabs={TABS} />
          </div>
        </div>
      </div>
    </section>
  );
}
