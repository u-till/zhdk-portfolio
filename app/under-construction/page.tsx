'use client';

import { Lightbox } from '@/components/traces/lightbox';
import { Viewer360 } from '@/components/under-construction/viewer-360';
import { useNavigation } from '@/contexts/navigation-context';
import { allertaStencil } from '@/lib/fonts';
import Image from 'next/image';
import { useState } from 'react';

const PROCESS_STEPS: {
  image: string;
  title: string;
  text: string;
  objectFit: 'cover' | 'contain';
}[] = [
  {
    image: '/under-construction/korpus-process-0.jpg',
    title: '01. CONCEPT',
    text: 'Conceptualized a mobile corpus to serve as a keyboard stand and storage unit to use the space in our living room more efficiently.',
    objectFit: 'contain',
  },
  {
    image: '/under-construction/korpus-process-1.jpg',
    title: '02. DESIGN',
    text: 'Created the design in SketchUp with real measurements to calculate planks, screws and corner-brackets needed. Sized to fit RAKO boxes with ideal keyboard height.',
    objectFit: 'cover',
  },
  {
    image: '/under-construction/korpus-process-2.jpg',
    title: '03. SOURCE MATERIALS',
    text: 'Workers from the construction site next door gave me planks they had cut to non-standard lengths.',
    objectFit: 'cover',
  },
  {
    image: '/under-construction/korpus-process-3.jpg',
    title: '04. BUILD',
    text: 'Cut planks to the four lengths from SketchUp, then assembled using corner-brackets and wheels.',
    objectFit: 'cover',
  },
  {
    image: '/under-construction/korpus-process-4.jpg',
    title: '05. CAPTURE & EDIT',
    text: 'Used a white backdrop and studio lights to capture 360° photos. Used Photoshop batch processing to adjust light temperature, crop, and remove backgrounds.',
    objectFit: 'cover',
  },
  {
    image: '/under-construction/korpus-process-5.jpg',
    title: '06. PUT TO USE',
    text: 'Final setup: mobile keyboard stand on wheels with storage space.',
    objectFit: 'cover',
  },
];

export default function UnderConstructionPage() {
  const { navigateTo } = useNavigation();
  const [selectedProcessIndex, setSelectedProcessIndex] = useState(0);
  const [lightboxImage, setLightboxImage] = useState<{ src: string; title?: string } | null>(null);

  return (
    <section className='bg-yellow-300'>
      {/* First View: Full-screen 360 Viewer */}
      <div className='h-screen relative overflow-hidden flex flex-col items-center'>
        {/* Title - Consistent position with other pages */}
        <div className='absolute bottom-8 left-4 md:left-8 pointer-events-none z-10'>
          <h1
            className={`text-[clamp(1.75rem,8vh,3rem)] md:text-[clamp(1.75rem,8vh,8rem)] font-bold text-black leading-none ${allertaStencil.className}`}
          >
            under
            <br />
            construction
          </h1>
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
      </div>

      {/* Info Content - Vertical 5-Column Layout */}
      <div className='bg-yellow-300 px-4 md:px-8 pt-16 pb-16'>
        <div className='flex flex-col gap-8'>
          {/* Brief Section */}
          <div>
            <h2 className='text-xl font-bold  border-b-2 border-black pb-2 mb-4'>brief</h2>
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

          {/* specifications Section */}
          <div>
            <h2 className='text-xl font-bold  border-b-2 border-black pb-2 mb-4'>specifications</h2>
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

          {/* Idea Section */}
          <div>
            <h2 className='text-xl font-bold  border-b-2 border-black pb-2 mb-4'>idea</h2>
            <div className='grid grid-cols-1 md:grid-cols-5 gap-y-2 text-sm'>
              <div className='hidden md:block'></div>
              <div className='hidden md:block'></div>
              <div className='hidden md:block'></div>
              <div className='md:col-span-2'>
                <p className='leading-relaxed'>
                  We needed mobile furniture for our keyboard in our flat to make the most out of the limited space in
                  our living room. My flatmate and I brainstormed for a bit and came to the conclusion that custom-built
                  furniture would be the best so we could have it to our exact specifications.
                </p>
              </div>
            </div>
          </div>

          {/* credits Section */}
          <div>
            <h2 className='text-xl font-bold  border-b-2 border-black pb-2 mb-4'>credits</h2>
            <div className='grid grid-cols-2 md:grid-cols-5 gap-y-2 text-sm'>
              <div className='hidden md:block'></div>
              <div className='font-bold md:text-right'>Solo Project</div>
              <div className='hidden md:block'></div>
              <div className='md:col-span-2'>Till Solenthaler</div>

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
          <h2 className='text-xl font-bold  border-b-2 border-black pb-2 mb-6'>process</h2>

          <div className='flex flex-col lg:flex-row lg:items-stretch gap-6'>
            {/* Left: Process List */}
            <div className='order-2 lg:order-1 lg:w-2/5 space-y-4'>
              {PROCESS_STEPS.map((step, index) => {
                const isActive = selectedProcessIndex === index;
                return (
                  <div
                    key={index}
                    onClick={() => setSelectedProcessIndex(index)}
                    className={`w-full p-3 transition-all text-left flex flex-col lg:flex-row lg:items-center gap-3 lg:cursor-pointer border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] ${
                      isActive ? 'bg-white lg:bg-red-600' : 'bg-white lg:hover:bg-neutral-100'
                    }`}
                  >
                    <div className='relative w-full aspect-square lg:w-20 lg:h-20 flex-shrink-0 overflow-hidden border-2 border-black bg-white'>
                      <Image
                        src={step.image}
                        alt={`${step.title} thumbnail`}
                        fill
                        className={step.objectFit === 'contain' ? 'object-contain p-2' : 'object-cover'}
                      />
                    </div>
                    <div className='flex-1'>
                      <span className={`font-bold block ${isActive ? 'lg:text-white' : ''}`}>{step.title}</span>
                      <span
                        className={`text-sm ${isActive ? 'lg:text-white/90 text-foreground/80' : 'text-foreground/80'}`}
                      >
                        {step.text}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right: Selected Image - Desktop only */}
            <div className='hidden lg:flex order-1 lg:order-2 lg:w-3/5'>
              <div
                className='relative w-full overflow-hidden border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] cursor-pointer'
                onClick={() => {
                  const step = PROCESS_STEPS[selectedProcessIndex] || PROCESS_STEPS[0];
                  setLightboxImage({ src: step.image, title: step.title });
                }}
              >
                <Image
                  src={PROCESS_STEPS[selectedProcessIndex]?.image || PROCESS_STEPS[0].image}
                  alt={PROCESS_STEPS[selectedProcessIndex]?.title || 'Process step'}
                  fill
                  className={
                    PROCESS_STEPS[selectedProcessIndex]?.objectFit === 'contain' ? 'object-contain p-8' : 'object-cover'
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Project Navigation */}
      <div className='bg-yellow-300 px-4 md:px-8 pb-16'>
        <div className='flex justify-between items-center border-b-2 border-black pb-2'>
          <span
            onClick={() => navigateTo('/')}
            className='font-bold cursor-pointer lowercase text-[clamp(0.625rem,3vh,1rem)] md:text-[clamp(0.875rem,4vh,4rem)] leading-none hover:opacity-60 transition-opacity'
          >
            index
          </span>
          <span
            onClick={() => navigateTo('/saudade')}
            className='font-bold cursor-pointer lowercase text-[clamp(0.625rem,3vh,1rem)] md:text-[clamp(0.875rem,4vh,4rem)] leading-none hover:opacity-60 transition-opacity'
          >
            next
          </span>
        </div>
      </div>

      <Lightbox src={lightboxImage?.src || null} title={lightboxImage?.title} onClose={() => setLightboxImage(null)} />
    </section>
  );
}
