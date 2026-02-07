'use client';

import { Lightbox } from '@/components/traces/lightbox';
import { MapImage } from '@/components/traces/zurich-map';
import { useNavigation } from '@/contexts/navigation-context';
import { dinNext } from '@/lib/fonts';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useState } from 'react';

const ZurichMap = dynamic(() => import('@/components/traces/zurich-map').then((mod) => mod.ZurichMap), {
  ssr: false,
  loading: () => <div className='w-full h-full bg-neutral-200 animate-pulse' />,
});

const MAP_IMAGES: MapImage[] = [
  // {
  //   id: '3642',
  //   src: '/traces/IMG_3642.jpeg',
  //   overlaySrc: '/traces/IMG_3642_overlay.png',
  //   lat: 47.38391,
  //   lng: 8.52933,
  // },
  {
    id: '3664',
    src: '/traces/IMG_3664.jpeg',
    overlaySrc: '/traces/IMG_3664_overlay.png',
    lat: 47.3905,
    lng: 8.51609,
  },
  {
    id: '3673',
    src: '/traces/IMG_3673.jpeg',
    overlaySrc: '/traces/IMG_3673_overlay.png',
    lat: 47.39157,
    lng: 8.51334,
  },
  {
    id: '3682',
    src: '/traces/IMG_3682.jpeg',
    overlaySrc: '/traces/IMG_3682_overlay.png',
    lat: 47.3901,
    lng: 8.51663,
  },
  {
    id: '3704',
    src: '/traces/IMG_3704.jpeg',
    overlaySrc: '/traces/IMG_3704_overlay.png',
    lat: 47.37976,
    lng: 8.5366,
  },
  {
    id: '3707',
    src: '/traces/IMG_3707.jpg',
    overlaySrc: '/traces/IMG_3707_overlay.png',
    lat: 47.38118,
    lng: 8.53633,
  },
  {
    id: '3710',
    src: '/traces/IMG_3710.jpeg',
    overlaySrc: '/traces/IMG_3710_overlay.png',
    lat: 47.38329,
    lng: 8.53346,
  },
  // {
  //   id: '3712',
  //   src: '/traces/IMG_3712.jpeg',
  //   overlaySrc: '/traces/IMG_3712_overlay.jpg',
  //   lat: 47.38521,
  //   lng: 8.53259,
  // },
  // {
  //   id: '3715',
  //   src: '/traces/IMG_3715.jpeg',
  //   overlaySrc: '/traces/IMG_3715_overlay.jpg',
  //   lat: 47.38674,
  //   lng: 8.53088,
  // },
  {
    id: '3716',
    src: '/traces/IMG_3716.jpeg',
    overlaySrc: '/traces/IMG_3716_overlay.png',
    lat: 47.38733,
    lng: 8.53022,
  },
  {
    id: '3719',
    src: '/traces/IMG_3719.jpeg',
    overlaySrc: '/traces/IMG_3719_overlay.png',
    lat: 47.3875,
    lng: 8.52494,
  },
  {
    id: '3739',
    src: '/traces/IMG_3739.jpg',
    overlaySrc: '/traces/IMG_3739_overlay.png',
    lat: 47.38531,
    lng: 8.51703,
  },
  {
    id: '3720',
    src: '/traces/IMG_3720.jpeg',
    overlaySrc: '/traces/IMG_3720_overlay.png',
    lat: 47.38721,
    lng: 8.52385,
  },
  // {
  //   id: '3721',
  //   src: '/traces/IMG_3721.jpeg',
  //   overlaySrc: '/traces/IMG_3721_overlay.png',
  //   lat: 47.38733,
  //   lng: 8.5239,
  // },
  {
    id: '3724',
    src: '/traces/IMG_3724.jpg',
    overlaySrc: '/traces/IMG_3724_overlay.png',
    lat: 47.38576,
    lng: 8.51971,
  },
  // {
  //   id: '3732',
  //   src: '/traces/IMG_3732.jpeg',
  //   overlaySrc: '/traces/IMG_3732_overlay.png',
  //   lat: 47.38779,
  //   lng: 8.51963,
  // },
  {
    id: '3733',
    src: '/traces/IMG_3733.jpg',
    overlaySrc: '/traces/IMG_3733_overlay.png',
    lat: 47.38805,
    lng: 8.51857,
  },
  {
    id: '3743',
    src: '/traces/IMG_3743.jpg',
    overlaySrc: '/traces/IMG_3743_overlay.png',
    lat: 47.38187,
    lng: 8.51534,
  },
  // {
  //   id: '3744',
  //   src: '/traces/IMG_3744.jpeg',
  //   overlaySrc: '/traces/IMG_3744_overlay.png',
  //   lat: 47.38055,
  //   lng: 8.51721,
  // },
  {
    id: '3746',
    src: '/traces/IMG_3746.jpeg',
    overlaySrc: '/traces/IMG_3746_overlay.png',
    lat: 47.38036,
    lng: 8.52043,
  },
  {
    id: '3748',
    src: '/traces/IMG_3748.jpg',
    overlaySrc: '/traces/IMG_3748_overlay.png',
    lat: 47.37818,
    lng: 8.52419,
  },
  {
    id: '3749',
    src: '/traces/IMG_3749.jpg',
    overlaySrc: '/traces/IMG_3749_overlay.png',
    lat: 47.37779,
    lng: 8.5268,
  },
  // {
  //   id: '3751',
  //   src: '/traces/IMG_3751.jpeg',
  //   overlaySrc: '/traces/IMG_3751_overlay.png',
  //   lat: 47.37549,
  //   lng: 8.52679,
  // },
  // {
  //   id: '3752',
  //   src: '/traces/IMG_3752.jpeg',
  //   overlaySrc: '/traces/IMG_3752_overlay.png',
  //   lat: 47.37481,
  //   lng: 8.52586,
  // },
  {
    id: '3753',
    src: '/traces/IMG_3753.jpeg',
    overlaySrc: '/traces/IMG_3753_overlay.png',
    lat: 47.37442,
    lng: 8.5251,
  },
  {
    id: '3759',
    src: '/traces/IMG_3759.jpeg',
    overlaySrc: '/traces/IMG_3759_overlay.png',
    lat: 47.37743,
    lng: 8.53211,
  },
  {
    id: '3761',
    src: '/traces/IMG_3761.jpeg',
    overlaySrc: '/traces/IMG_3761_overlay.png',
    lat: 47.37753,
    lng: 8.53241,
  },
  {
    id: '3762',
    src: '/traces/IMG_3762.jpeg',
    overlaySrc: '/traces/IMG_3762_overlay.png',
    lat: 47.37771,
    lng: 8.53308,
  },
  {
    id: '3764',
    src: '/traces/IMG_3764.jpeg',
    overlaySrc: '/traces/IMG_3764_overlay.png',
    lat: 47.37816,
    lng: 8.53203,
  },
  {
    id: '3768',
    src: '/traces/IMG_3768.jpeg',
    overlaySrc: '/traces/IMG_3768_overlay.png',
    lat: 47.38183,
    lng: 8.52941,
  },
  {
    id: '3769',
    src: '/traces/IMG_3769.jpeg',
    overlaySrc: '/traces/IMG_3769_overlay.png',
    lat: 47.38137,
    lng: 8.53084,
  },
  // {
  //   id: '3771',
  //   src: '/traces/IMG_3771.jpeg',
  //   overlaySrc: '/traces/IMG_3771_overlay.png',
  //   lat: 47.3814,
  //   lng: 8.5311,
  // },
];

const PROCESS_STEPS: { image: string; objectFit: 'cover' | 'contain'; title: string; text: string }[] = [
  {
    image: '/traces/IMG_3642.jpeg',
    objectFit: 'cover',
    title: '01. EXPLORATION',
    text: 'Walking through Zurich, documenting interesting locations and perspectives.',
  },
  {
    image: '/traces/IMG_3642.jpeg',
    objectFit: 'cover',
    title: '02. DOCUMENTATION',
    text: 'Photographing and noting the GPS coordinates of each location.',
  },
];

export default function TracePage() {
  const { navigateTo } = useNavigation();
  const [selectedImage, setSelectedImage] = useState<MapImage | null>(null);
  const [selectedProcessIndex, setSelectedProcessIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'map' | 'grid'>('grid');

  return (
    <section className={dinNext.className}>
      {/* First View: Interactive Map */}
      <div className='h-screen relative'>
        {/* Title - Bottom Left */}
        <div className='absolute bottom-4 md:bottom-8 left-4 md:left-8 pointer-events-none z-20'>
          <h2 className={`text-5xl lg:text-7xl font-bold text-black drop-shadow-lg ${dinNext.className}`}>traces</h2>
        </div>

        {/* Map / Grid View */}
        <div className='w-full h-full relative z-10'>
          {viewMode === 'map' ? (
            <ZurichMap images={MAP_IMAGES} onImageClick={setSelectedImage} />
          ) : (
            <div className='w-full h-full p-4 md:p-8 pt-22 md:pt-32 pb-18 md:pb-8 bg-neutral-100 grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 auto-rows-fr'>
              {[...MAP_IMAGES].reverse().map((image) => (
                <div
                  key={image.id}
                  className='relative rounded-lg overflow-hidden border-2 border-sky-600 cursor-pointer group'
                  onClick={() => setSelectedImage(image)}
                >
                  <Image
                    src={image.src}
                    alt={image.id}
                    fill
                    className='object-cover'
                    sizes='(max-width: 768px) 25vw, (max-width: 1024px) 16vw, 12vw'
                  />
                  {image.overlaySrc && (
                    <div className='absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                      <Image
                        src={image.overlaySrc}
                        alt='Artwork overlay'
                        fill
                        className='object-cover'
                        sizes='(max-width: 768px) 25vw, (max-width: 1024px) 16vw, 12vw'
                      />
                    </div>
                  )}
                </div>
              ))}
              <div
                onClick={() => setViewMode('map')}
                className='relative rounded-lg overflow-hidden border-2 border-sky-600 cursor-pointer flex flex-col items-center justify-center gap-1 bg-white hover:bg-neutral-50 transition-colors font-bold text-sm'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='28'
                  height='28'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <polygon points='1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6' />
                  <line x1='8' y1='2' x2='8' y2='18' />
                  <line x1='16' y1='6' x2='16' y2='22' />
                </svg>
                map
              </div>
            </div>
          )}
        </div>

        {/* View Toggle Button - only shown in map mode */}
        {viewMode === 'map' && (
          <button
            onClick={() => setViewMode('grid')}
            className='absolute bottom-4 md:bottom-8 right-4 md:right-8 z-20 w-22 h-21 flex flex-col items-center justify-center gap-1 rounded-lg bg-white hover:bg-neutral-50 border-2 border-sky-600 text-md font-bold transition-colors shadow-md cursor-pointer'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='28'
              height='28'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <polygon points='1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6' />
              <line x1='8' y1='2' x2='8' y2='18' />
              <line x1='16' y1='6' x2='16' y2='22' />
            </svg>
            grid
          </button>
        )}
      </div>

      {/* Lightbox */}
      <Lightbox
        src={selectedImage?.src || null}
        overlaySrc={selectedImage?.overlaySrc}
        title={selectedImage?.title}
        onClose={() => setSelectedImage(null)}
      />

      {/* Info Content */}
      <div className='px-4 md:px-8 pt-16 pb-16'>
        <div className='flex flex-col gap-8 text-foreground'>
          {/* Brief Section */}
          <div>
            <h3 className={`text-xl font-bold border-b-2 border-sky-600 pb-2 mb-4 ${dinNext.className}`}>brief</h3>
            <div className='grid grid-cols-1 md:grid-cols-5 gap-y-2 text-sm'>
              <div className='hidden md:block'></div>
              <div className='hidden md:block'></div>
              <div className='hidden md:block'></div>
              <div className='md:col-span-2'>
                <p className='leading-relaxed'>
                  I focused on traces of traces. On urban interventions and natural processes, traces that have been
                  removed or disappeared over time, leaving new traces behind. Painted-over graffiti, scraped-off
                  stickers, walls with marks of climbing plants.
                  <br />
                  <br />
                  Using ProCreate and Photoshop, I reconstructed these erased traces, making faded urban traces visible
                  again. I deliberately oscillate between forensic reconstruction and speculative fiction. Some
                  restorations are intentionally &apos;wrong&apos;. This playful inaccuracy exposes both the difficulty
                  of objective reconstruction and the inherently vague nature of traces, while questioning who controls
                  urban narratives: whose traces are preserved, whose erased?
                  <br />
                  <br />
                  The interactive map documents my research process itself as a trace. GPS metadata reveals my path
                  through the city and lets the user compare present state and speculative past.
                </p>
              </div>
            </div>
          </div>

          {/* Specifications Section */}
          <div>
            <h3 className={`text-xl font-bold border-b-2 border-sky-600 pb-2 mb-4 ${dinNext.className}`}>
              specifications
            </h3>
            <div className='grid grid-cols-2 md:grid-cols-5 gap-y-2 text-sm'>
              <div className='hidden md:block'></div>
              <div className='font-bold md:text-right'>Year</div>
              <div className='hidden md:block'></div>
              <div className='md:col-span-2'>2026</div>

              <div className='hidden md:block'></div>
              <div className='font-bold md:text-right'>For</div>
              <div className='hidden md:block'></div>
              <div className='md:col-span-2'>ZHdk Homework Assignment</div>

              <div className='hidden md:block'></div>
              <div className='font-bold md:text-right'>Type</div>
              <div className='hidden md:block'></div>
              <div className='md:col-span-2'>Drawings/Photoshop & Interactive Map</div>
            </div>
          </div>

          {/* Idea Section */}
          <div>
            <h3 className={`text-xl font-bold border-b-2 border-sky-600 pb-2 mb-4 ${dinNext.className}`}>idea</h3>
            <div className='grid grid-cols-1 md:grid-cols-5 gap-y-2 text-sm'>
              <div className='hidden md:block'></div>
              <div className='hidden md:block'></div>
              <div className='hidden md:block'></div>
              <div className='md:col-span-2'>
                <p className='leading-relaxed'>
                  The idea of restoring traces came while I was walking around the city to do research and collect
                  traces for the assignment. Many traces like graffiti and trash are unwanted and get removed, but this
                  act itself often leaves a new trace behind. This caught my eye and I wanted to explore this further by
                  reconstructing erased traces.
                  <br />
                  <br /> During this process I realized that I would essentially have to just trace &quot;FCZ&quot; onto
                  jpegs, which sounded boring and one-dimensional. This led me to the idea of intentionally making some
                  of the reconstructions inaccurate, challenging the user to look closer and question the nature of
                  traces and the narratives they create. This caught my eye and i wanted to explore this further by
                  reconstructing erased traces.
                </p>
              </div>
            </div>
          </div>

          {/* Learnings Section 
          <div>
            <h3 className={`text-xl font-bold border-b-2 border-sky-600 pb-2 mb-4 ${dinNext.className}`}>learnings</h3>
            <div className='grid grid-cols-1 md:grid-cols-5 gap-y-2 text-sm'>
              <div className='hidden md:block'></div>
              <div className='hidden md:block'></div>
              <div className='hidden md:block'></div>
              <div className='md:col-span-2'>
                <ul className='list-disc list-outside pl-3 space-y-1'>
                  <li>tbd</li>
                </ul>
              </div>
            </div>
          </div>*/}

          {/* Credits Section */}
          <div>
            <h3 className={`text-xl font-bold border-b-2 border-sky-600 pb-2 mb-4 ${dinNext.className}`}>credits</h3>
            <div className='grid grid-cols-2 md:grid-cols-5 gap-y-2 text-sm'>
              <div className='hidden md:block'></div>
              <div className='font-bold md:text-right'>Solo Project</div>
              <div className='hidden md:block'></div>
              <div className='md:col-span-2'>Till Solenthaler</div>

              <div className='hidden md:block'></div>
              <div className='font-bold md:text-right'>AI Declaration</div>
              <div className='hidden md:block'></div>
              <div className='md:col-span-2'>Claude for Brainstorming, Nano Banana for the lamp post/tree image.</div>
            </div>
          </div>
        </div>
      </div>

      {/* Process Section */}
      <div className='px-4 md:px-8 pt-12 pb-16'>
        <div>
          <h3 className={`text-xl font-bold border-b-2 border-sky-600 pb-2 mb-6 ${dinNext.className}`}>process</h3>

          <div className='flex flex-col lg:flex-row lg:items-stretch gap-6'>
            {/* Left: Process List */}
            <div className='order-2 lg:order-1 lg:w-2/5 space-y-2'>
              {PROCESS_STEPS.map((step, index) => {
                const isActive = selectedProcessIndex === index;
                return (
                  <div
                    key={index}
                    onClick={() => setSelectedProcessIndex(index)}
                    className={`w-full p-3 lg:border-l-4 transition-all text-left flex flex-col md:flex-row md:items-center gap-3 rounded-r-lg lg:cursor-pointer ${
                      isActive
                        ? 'lg:border-sky-600 bg-sky-200/50'
                        : 'bg-sky-200/50 lg:border-sky-300 lg:bg-sky-100/50 lg:hover:bg-sky-200/30'
                    }`}
                  >
                    <div
                      className={`relative w-full aspect-square md:w-20 md:h-20 flex-shrink-0 overflow-hidden rounded-lg ${
                        isActive ? 'ring-2 ring-sky-600' : 'ring-2 ring-sky-600 lg:ring-1 lg:ring-sky-300'
                      }`}
                    >
                      <Image
                        src={step.image}
                        alt={`${step.title} thumbnail`}
                        fill
                        className={step.objectFit === 'contain' ? 'object-contain' : 'object-cover'}
                      />
                    </div>
                    <div className='flex-1'>
                      <span className='font-bold block'>{step.title}</span>
                      <span className='text-foreground/80 text-sm'>{step.text}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right: Selected Image - Desktop only */}
            <div className='hidden lg:flex order-1 lg:order-2 lg:w-3/5'>
              <div className='relative w-full rounded-lg overflow-hidden border-2 border-sky-600/40'>
                <Image
                  src={PROCESS_STEPS[selectedProcessIndex]?.image || PROCESS_STEPS[0].image}
                  alt={PROCESS_STEPS[selectedProcessIndex]?.title || 'Process step'}
                  fill
                  className={
                    PROCESS_STEPS[selectedProcessIndex]?.objectFit === 'contain' ? 'object-contain' : 'object-cover'
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Project Navigation */}
      <div className='px-4 md:px-8 pb-16'>
        <div className='flex justify-between items-center border-b-2 border-black pb-2'>
          <h1
            onClick={() => navigateTo('/dayjob')}
            className='font-bold cursor-pointer lowercase text-[clamp(0.625rem,3vh,1rem)] md:text-[clamp(0.875rem,4vh,4rem)] leading-none hover:opacity-60 transition-opacity'
          >
            previous
          </h1>
          <h1
            onClick={() => navigateTo('/about')}
            className='font-bold cursor-pointer lowercase text-[clamp(0.625rem,3vh,1rem)] md:text-[clamp(0.875rem,4vh,4rem)] leading-none hover:opacity-60 transition-opacity'
          >
            about
          </h1>
        </div>
      </div>
    </section>
  );
}
