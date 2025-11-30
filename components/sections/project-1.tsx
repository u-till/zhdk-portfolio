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
    <section className='h-screen flex flex-col relative overflow-y-hidden pt-24 md:pt-42 gap-4 lg:gap-8'>
      <div className='flex justify-center max-w-screen-2xl mx-auto w-full px-4 md:px-6 flex-shrink-0'>
        <h2 className={`text-4xl lg:text-7xl font-bold sticky left-2 lg:static ${allertaStencil.className}`}>under construction</h2>
      </div>
      {/* Horizontal Scrolling Container */}
      <div className='flex-1 overflow-x-auto overflow-y-hidden lg:overflow-y-visible snap-x snap-mandatory lg:snap-none flex gap-4 lg:gap-8 px-4 md:px-6 pb-8 pt-4 max-w-screen-2xl mx-auto scrollbar-hide'>
        {/* Column 1: 360 Viewer */}
        <div className='min-w-[90vw] max-w-[90vw] max-h-[60vh] lg:max-h-none lg:min-w-[480px] lg:flex-1 snap-center lg:snap-align-none flex-shrink-0 flex items-center justify-center relative'>
          <Viewer360
            imageFolder='under-construction/korpus-360'
            totalFrames={27}
            imageFormat='png'
            imagePrefix='normalized-'
            imagePadding={2}
            width={500}
            height={500}
          />
        </div>

        {/* Column 2: Tabs */}
        <div className='min-w-[90vw] max-w-[90vw] max-h-[60vh] lg:max-h-none lg:min-w-[480px] lg:flex-1 snap-center lg:snap-align-none flex-shrink-0 flex items-center justify-center'>
          <div className='w-[500px] max-w-full h-[500px]'>
            <BrutalistTabs tabs={TABS} />
          </div>
        </div>

        {/* Column 3: Empty styled div */}
        <div className='min-w-[90vw] max-w-[90vw] max-h-[60vh] lg:max-h-none lg:min-w-[480px] lg:flex-1 snap-center lg:snap-align-none flex-shrink-0 flex items-center justify-center'>
          <div className='w-[500px] max-w-full h-[500px] border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]'></div>
        </div>
      </div>
    </section>
  );
}
