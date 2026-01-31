'use client';

import { Viewer360 } from '@/components/under-construction/viewer-360';
import { allertaStencil } from '@/lib/fonts';
import Image from 'next/image';
import { useState } from 'react';

const PROCESS_STEPS = [
  {
    image: '/under-construction/korpus-process-0.jpg',
    title: '01. DESIGN & CONCEPT',
    text: 'Created the design in SketchUp with real measurements to calculate planks, screws and corner-brackets needed. Sized to fit RAKO boxes with ideal keyboard height.',
  },
  {
    image: '/under-construction/korpus-process-1.jpg',
    title: '02. SOURCE MATERIALS',
    text: 'Workers from the construction site next door gave me planks they had cut to non-standard lengths.',
  },
  {
    image: '/under-construction/korpus-process-2.jpg',
    title: '03. BUILD',
    text: 'Cut planks to the four lengths from SketchUp, then assembled using corner-brackets and wheels.',
  },
  {
    image: '/under-construction/korpus-process-3.jpg',
    title: '04. CAPTURE',
    text: 'Set up a makeshift white backdrop and studio lights to capture 360° photos.',
  },
  {
    image: '/under-construction/korpus-process-4.jpg',
    title: '05. EDIT',
    text: 'Used Photoshop batch processing to adjust light temperature, crop, and remove backgrounds.',
  },
  {
    image: '/under-construction/korpus-process-5.jpg',
    title: '06. PUT TO USE',
    text: 'Final setup: mobile keyboard stand on wheels with storage space.',
  },
];

export default function UnderConstructionPage() {
  const [selectedProcessIndex, setSelectedProcessIndex] = useState(0);

  return (
    <section className='bg-yellow-300'>
      {/* First View: Full-screen 360 Viewer */}
      <div className='h-screen relative overflow-hidden flex flex-col items-center'>
        {/* Title - Bottom Left */}
        <div className='absolute bottom-4 md:bottom-8 left-4 md:left-8 pointer-events-none z-10'>
          <h2 className={`text-5xl lg:text-7xl font-bold text-black ${allertaStencil.className}`}>
            under
            <br />
            construction
          </h2>
        </div>

        {/* 360 Viewer - Full Width */}
        <div className='absolute inset-0'>
          <Viewer360
            imageFolder='under-construction/korpus-360'
            totalFrames={27}
            imageFormat='png'
            imagePrefix='normalized-'
            imagePadding={2}
          />
        </div>

        {/* Scroll Down Arrow */}
        <div className='hidden md:block absolute bottom-8 left-1/2 -translate-x-1/2 z-10 pointer-events-none'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='32'
            height='32'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2.5'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='text-black animate-bounce'
          >
            <path d='M12 5v14M5 12l7 7 7-7' />
          </svg>
        </div>
      </div>

      {/* Info Content - Vertical 5-Column Layout */}
      <div className='bg-yellow-300 px-4 md:px-8 pt-16 pb-16'>
        <div className='flex flex-col gap-8'>
          {/* Brief Section */}
          <div>
            <h3 className={`text-xl font-bold  border-b-2 border-black pb-2 mb-4 ${allertaStencil.className}`}>
              brief
            </h3>
            <div className='grid grid-cols-1 md:grid-cols-5 gap-y-2 text-sm'>
              <div className='hidden md:block'></div>
              <div className='hidden md:block'></div>
              <div className='hidden md:block'></div>
              <div className='md:col-span-2'>
                <p className='leading-relaxed'>
                  Mobile filing cabinet built with the visually distinct planks from a construction site. An ode to
                  continuous change and reusing materials in a different context. When is something truly done?
                  Everything is in perpetual development and keeps on changing its form.
                </p>
              </div>
            </div>
          </div>

          {/* Idea Section */}
          <div>
            <h3 className={`text-xl font-bold  border-b-2 border-black pb-2 mb-4 ${allertaStencil.className}`}>idea</h3>
            <div className='grid grid-cols-1 md:grid-cols-5 gap-y-2 text-sm'>
              <div className='hidden md:block'></div>
              <div className='hidden md:block'></div>
              <div className='hidden md:block'></div>
              <div className='md:col-span-2'>
                <p className='leading-relaxed'>
                  We needed mobile furniture for our keyboard in our flat to make the most out of the limited space in
                  our livingroom. My flatmate and i brainstormed for a bit and came to the conclusion that custom built
                  furniture would be the best so we could have it to our exact specifications.
                </p>
              </div>
            </div>
          </div>

          {/* specifications Section */}
          <div>
            <h3 className={`text-xl font-bold  border-b-2 border-black pb-2 mb-4 ${allertaStencil.className}`}>
              specifications
            </h3>
            <div className='grid grid-cols-2 md:grid-cols-5 gap-y-2 text-sm'>
              <div className='hidden md:block'></div>
              <div className='font-bold md:text-right'>Year</div>
              <div className='hidden md:block'></div>
              <div className='md:col-span-2'>2025</div>

              <div className='hidden md:block'></div>
              <div className='font-bold md:text-right'>For</div>
              <div className='hidden md:block'></div>
              <div className='md:col-span-2'>Personal Project</div>

              <div className='hidden md:block'></div>
              <div className='font-bold md:text-right'>Type</div>
              <div className='hidden md:block'></div>
              <div className='md:col-span-2'>Furniture</div>

              <div className='hidden md:block'></div>
              <div className='font-bold md:text-right'>Size (W x D x H)</div>
              <div className='hidden md:block'></div>
              <div className='md:col-span-2'>343mm x 414mm x 640mm</div>

              <div className='hidden md:block'></div>
              <div className='font-bold md:text-right'>Material</div>
              <div className='hidden md:block'></div>
              <div className='md:col-span-2'>Wood & Metal</div>
            </div>
          </div>

          {/* learnings Section */}
          <div>
            <h3 className={`text-xl font-bold  border-b-2 border-black pb-2 mb-4 ${allertaStencil.className}`}>
              learnings
            </h3>
            <div className='grid grid-cols-1 md:grid-cols-5 gap-y-2 text-sm'>
              <div className='hidden md:block'></div>
              <div className='hidden md:block'></div>
              <div className='hidden md:block'></div>
              <div className='md:col-span-2'>
                <ul className='list-disc list-inside space-y-1'>
                  <li>Use a circular saw instead of a jigsaw for cleaner cuts</li>
                  <li>Use sandpaper to refine the edges</li>
                  <li>Use live view on external screen to spot out of focus shots</li>
                </ul>
              </div>
            </div>
          </div>

          {/* credits Section */}
          <div>
            <h3 className={`text-xl font-bold  border-b-2 border-black pb-2 mb-4 ${allertaStencil.className}`}>
              credits
            </h3>
            <div className='grid grid-cols-2 md:grid-cols-5 gap-y-2 text-sm'>
              <div className='hidden md:block'></div>
              <div className='font-bold md:text-right'>Solo Project</div>
              <div className='hidden md:block'></div>
              <div className='md:col-span-2'>Till solenthaler</div>

              <div className='hidden md:block'></div>
              <div className='font-bold md:text-right'>AI Declaration</div>
              <div className='hidden md:block'></div>
              <div className='md:col-span-2'>Nano Banana for the background image of the 360° viewer</div>
            </div>
          </div>
        </div>
      </div>

      {/* Process Section */}
      <div className='bg-yellow-300 px-4 md:px-8 pt-12 pb-16'>
        <div>
          <h3 className={`text-xl font-bold  border-b-2 border-black pb-2 mb-6 ${allertaStencil.className}`}>
            process
          </h3>

          <div className='grid grid-cols-1 lg:grid-cols-5 gap-6'>
            {/* Left: Process List (2 cols on desktop, full on mobile) */}
            <div className='lg:col-span-2 space-y-4'>
              {PROCESS_STEPS.map((step, index) => {
                const isActive = selectedProcessIndex === index;
                return (
                  <div
                    key={index}
                    onClick={() => setSelectedProcessIndex(index)}
                    className={`w-full p-3 transition-all text-left flex flex-col md:flex-row md:items-center gap-3 lg:cursor-pointer border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] ${
                      isActive ? 'bg-red-600' : 'bg-white lg:hover:bg-neutral-100'
                    }`}
                  >
                    <div className='relative w-full aspect-square md:w-20 md:h-20 flex-shrink-0 overflow-hidden border-2 border-black'>
                      <Image src={step.image} alt={`${step.title} thumbnail`} fill className='object-cover' />
                    </div>
                    <div className='flex-1'>
                      <span className={`font-bold block ${isActive ? 'text-white' : ''}`}>{step.title}</span>
                      <span className={`text-sm ${isActive ? 'text-white/90' : 'text-foreground/80'}`}>
                        {step.text}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right: Selected Image (3 cols) - Desktop only */}
            <div className='hidden lg:block lg:col-span-3'>
              <div className='relative w-full aspect-[4/3] overflow-hidden border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]'>
                <Image
                  src={PROCESS_STEPS[selectedProcessIndex]?.image || PROCESS_STEPS[0].image}
                  alt={PROCESS_STEPS[selectedProcessIndex]?.title || 'Process step'}
                  fill
                  className='object-cover'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
