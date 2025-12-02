'use client';

import { BrutalistTabs } from '@/components/brutalist-tabs';
import { Viewer360 } from '@/components/viewer-360';
import { allertaStencil } from '@/lib/fonts';

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
  return (
    <section className='h-screen flex flex-col pt-24 md:pt-28 gap-4 md:gap-8'>
      {/* Content Container */}
      <div className='flex-1 flex flex-col lg:flex-row gap-4 md:gap-8 p-4 md:p-8 max-w-screen-2xl mx-auto w-full overflow-hidden'>
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
    </section>
  );
}
