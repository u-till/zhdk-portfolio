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
    <section className='h-screen overflow-y-auto bg-yellow-300'>
      {/* First View: Full-screen 360 Viewer */}
      <div className='h-screen relative overflow-hidden flex flex-col items-center'>
        {/* Title - Bottom Left */}
        <div className='absolute bottom-4 md:bottom-8 left-4 md:left-8 pointer-events-none z-10'>
          <h2
            className={`text-5xl lg:text-7xl font-bold text-black ${allertaStencil.className}`}
          >
            under<br />construction
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
        <div className='absolute bottom-8 left-1/2 -translate-x-1/2 z-10 pointer-events-none'>
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

      {/* Info Content - 3 Columns */}
      <div className='bg-yellow-300 px-4 md:px-8 pt-16 pb-16'>
        <div>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 text-foreground'>
            {/* Column 1: Brief & Idea */}
            <div className='space-y-6'>
              <div>
                <h3 className={`text-xl font-bold uppercase border-b-2 border-black pb-2 ${allertaStencil.className}`}>Brief</h3>
                <p className='mt-4 leading-relaxed'>
                  Mobile filing cabinet built with the visually distinct planks from a construction site. An ode to continuous
                  change and reusing materials in a different context. When is something truly done? Everything is in
                  perpetual development and keeps on changing its form.
                </p>
              </div>
              <div>
                <h3 className={`text-xl font-bold uppercase border-b-2 border-black pb-2 ${allertaStencil.className}`}>Idea</h3>
                <p className='mt-4 leading-relaxed'>
                  We needed mobile furniture for our keyboard in our flat to make the most out of the limited space in our
                  livingroom. My flatmate and i brainstormed for a bit and came to the conclusion that custom built furniture
                  would be the best so we could have it to our exact specifications.
                </p>
              </div>
            </div>

            {/* Column 2: Specifications */}
            <div>
              <h3 className={`text-xl font-bold uppercase border-b-2 border-black pb-2 ${allertaStencil.className}`}>Specifications</h3>
              <ul className='space-y-2 list-none mt-4'>
                <li className='border-l-2 border-black pl-3 py-1'>
                  <span className='font-bold'>YEAR:</span> 2025
                </li>
                <li className='border-l-2 border-black pl-3 py-1'>
                  <span className='font-bold'>FOR:</span> Personal Project
                </li>
                <li className='border-l-2 border-black pl-3 py-1'>
                  <span className='font-bold'>TYPE:</span> Furniture
                </li>
                <li className='border-l-2 border-black pl-3 py-1'>
                  <span className='font-bold'>SIZE (W x D x H):</span> 343mm x 414mm x 640mm
                </li>
                <li className='border-l-2 border-black pl-3 py-1'>
                  <span className='font-bold'>MATERIAL:</span> Wood & Metal
                </li>
              </ul>
            </div>

            {/* Column 3: Learnings & Credits */}
            <div className='space-y-6'>
              <div>
                <h3 className={`text-xl font-bold uppercase border-b-2 border-black pb-2 ${allertaStencil.className}`}>Learnings</h3>
                <ul className='list-disc list-inside mt-4 space-y-1'>
                  <li>Use a circular saw instead of a jigsaw for cleaner cuts</li>
                  <li>Use sandpaper to refine the edges</li>
                  <li>Use live view on external screen to spot out of focus shots</li>
                </ul>
              </div>
              <div>
                <h3 className={`text-xl font-bold uppercase border-b-2 border-black pb-2 ${allertaStencil.className}`}>Credits</h3>
                <div className='space-y-4 mt-4'>
                  <div>
                    <span className='font-bold block uppercase text-sm tracking-wider'>Solo Project</span>
                    <span>Till Solenthaler</span>
                  </div>
                  <div>
                    <span className='font-bold block uppercase text-sm tracking-wider'>AI Declaration</span>
                    <span>Nano Banana for the background image of the 360° viewer</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Process Section */}
      <div className='bg-yellow-300 px-4 md:px-8 pt-12 pb-16'>
        <div className='flex flex-col'>
          <h3 className={`text-xl font-bold uppercase border-b-2 border-black pb-2 mb-6 flex-shrink-0 ${allertaStencil.className}`}>Process</h3>

          <div className='flex flex-col lg:flex-row gap-6'>
            {/* Left: Process List (1/3 on desktop, full on mobile) */}
            <div className='lg:w-1/3 space-y-2'>
              {PROCESS_STEPS.map((step, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedProcessIndex(index)}
                  className={`w-full p-3 border-l-4 transition-all text-left flex flex-col md:flex-row md:items-center gap-3 lg:cursor-pointer border-black bg-yellow-200 ${
                    selectedProcessIndex !== index && 'lg:border-yellow-600 lg:bg-yellow-100 lg:hover:bg-yellow-200/60'
                  }`}
                >
                  <div
                    className={`relative w-full aspect-square md:w-20 md:h-20 flex-shrink-0 overflow-hidden border-2 border-black ${
                      selectedProcessIndex !== index && 'lg:border-black/20'
                    }`}
                  >
                    <Image src={step.image} alt={`${step.title} thumbnail`} fill className='object-cover' />
                  </div>
                  <div className='flex-1'>
                    <span className='font-bold block'>{step.title}</span>
                    <span className='text-foreground/80 text-sm'>{step.text}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Right: Selected Image (2/3) - Desktop only */}
            <div className='hidden lg:block lg:w-2/3'>
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
