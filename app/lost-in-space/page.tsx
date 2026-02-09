'use client';

import { AlbumViewer3D } from '@/components/lost-in-space/album-viewer-3d';
import { StarField } from '@/components/lost-in-space/star-field';
import { Lightbox } from '@/components/traces/lightbox';
import { useNavigation } from '@/contexts/navigation-context';
import { orbitron } from '@/lib/fonts';
import Image from 'next/image';
import { useState } from 'react';

const IMAGES = [
  '/lost-in-space/cover.jpg',
  '/lost-in-space/backside-1.jpg',
  '/lost-in-space/backside-2.jpg',
  '/lost-in-space/backside-3.jpg',
  '/lost-in-space/backside-4.jpg',
];

const PROCESS_STEPS: {
  image: string;
  objectFit: 'cover' | 'contain';
  title: string;
  text: string;
}[] = [
  {
    image: '/lost-in-space/cover.jpg',
    objectFit: 'cover',
    title: '01. COVER ART',
    text: 'The whole project actually started because I created the cover art. We then searched for fitting beats and also produced a few tracks specifically for this space theme.',
  },
  {
    image: '/lost-in-space/backside-1.jpg',
    objectFit: 'cover',
    title: '02. PRODUCTION',
    text: 'Made at Vogelsang, a creative interim building. Mostly produced by me (Ableton) and Lars (FL Studio). We often collaborated on tracks - one creating samples, the other drums.',
  },
  {
    image: '/lost-in-space/backside-2.jpg',
    objectFit: 'cover',
    title: '03. RELEASE',
    text: 'We then released the album on all major streaming platforms, including Spotify, Apple Music, and SoundCloud.',
  },
  {
    image: '/lost-in-space/backside-3.jpg',
    objectFit: 'cover',
    title: '04. OUTREACH TO ARTISTS',
    text: 'We then reached out to various artists to collaborate on vocals for each track, but we only got about half of the tracks done before losing momentum on the project. Also COVID hit around that time, which made collaboration even harder.',
  },
  {
    image: '/lost-in-space/backside-4.jpg',
    objectFit: 'cover',
    title: '05. FINALIZATION',
    text: 'We then reached out to various artists to collaborate on vocals for each track, but we only got about half of the tracks done before losing momentum on the project. Also COVID hit around that time, which made collaboration even harder.',
  },
];

export default function LostInSpacePage() {
  const { navigateTo } = useNavigation();
  const [selectedProcessIndex, setSelectedProcessIndex] = useState(0);
  const [lightboxImage, setLightboxImage] = useState<{ src: string; title?: string } | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <section className='relative'>
      <StarField />

      {/* First View: Album Viewer */}
      <div className='h-screen relative overflow-hidden flex flex-col items-center'>
        {/* Title - Consistent position with other pages */}
        <div className='absolute bottom-8 left-4 md:left-8 pointer-events-none z-10'>
          <h1
            className={`text-[clamp(1.75rem,8vh,3rem)] md:text-[clamp(1.75rem,8vh,8rem)] font-bold text-[#e34c42] leading-none ${orbitron.className}`}
          >
            lost in space
          </h1>
        </div>

        {/* Album Viewer */}
        <div className='absolute inset-0 flex items-center justify-center z-10'>
          <AlbumViewer3D
            coverImage={IMAGES[0]}
            spotifyEmbedUrl='https://open.spotify.com/embed/album/6qs3jyw9rqToXnp1EjEXzL?utm_source=generator&theme=0'
            isFlipped={isFlipped}
            onFlip={() => setIsFlipped(!isFlipped)}
          />
        </div>

        {/* Play Button */}
        <button
          onClick={() => setIsFlipped(true)}
          className='absolute bottom-24 md:bottom-8 left-4 md:right-8 z-20 px-6 py-3 rounded-lg bg-[#e34c42] hover:bg-[#c93d34] text-white font-bold text-sm transition-colors shadow-md cursor-pointer flex items-center gap-2'
        >
          play
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='16'
            height='16'
            viewBox='0 0 24 24'
            fill='currentColor'
            stroke='none'
          >
            <polygon points='5 3 19 12 5 21 5 3' />
          </svg>
        </button>
      </div>

      {/* Info Content - Vertical 5-Column Layout */}
      <div className='px-4 md:px-8 pt-16 pb-16 relative z-10'>
        <div className='flex flex-col gap-8 text-white'>
          {/* Brief Section */}
          <div>
            <h2 className='text-xl font-bold  border-b-2 border-[#e34c42] pb-2 mb-4 text-[#e34c42]'>brief</h2>
            <div className='grid grid-cols-1 md:grid-cols-5 gap-y-2 text-sm'>
              <div className='hidden md:block'></div>
              <div className='hidden md:block'></div>
              <div className='hidden md:block'></div>
              <div className='md:col-span-2'>
                <p className='leading-relaxed'>
                  An album I did together with my friends when I used to live in a house full of musicians. Combining
                  productions under the theme of space, with cover art created by me.
                </p>
              </div>
            </div>
          </div>

          {/* specifications Section */}
          <div>
            <h2 className='text-xl font-bold  border-b-2 border-[#e34c42] pb-2 mb-4 text-[#e34c42]'>specifications</h2>
            <div className='grid grid-cols-2 md:grid-cols-5 gap-y-2 text-sm'>
              <div className='hidden md:block'></div>
              <div className='font-bold md:text-right text-[#e34c42]'>Year</div>
              <div className='hidden md:block'></div>
              <div className='md:col-span-2'>2019</div>

              <div className='hidden md:block'></div>
              <div className='font-bold md:text-right text-[#e34c42]'>For</div>
              <div className='hidden md:block'></div>
              <div className='md:col-span-2'>Collaborative Project</div>

              <div className='hidden md:block'></div>
              <div className='font-bold md:text-right text-[#e34c42]'>Type</div>
              <div className='hidden md:block'></div>
              <div className='md:col-span-2'>Music Album / Cover Art</div>

              <div className='hidden md:block'></div>
              <div className='font-bold md:text-right text-[#e34c42]'>Methodology</div>
              <div className='hidden md:block'></div>
              <div className='md:col-span-2'>
                Recording instruments / sounds, sampling and programming MIDI with Ableton and FL Studio.
              </div>
            </div>
          </div>

          {/* Idea Section */}
          <div>
            <h2 className='text-xl font-bold  border-b-2 border-[#e34c42] pb-2 mb-4 text-[#e34c42]'>idea</h2>
            <div className='grid grid-cols-1 md:grid-cols-5 gap-y-2 text-sm'>
              <div className='hidden md:block'></div>
              <div className='hidden md:block'></div>
              <div className='hidden md:block'></div>
              <div className='md:col-span-2'>
                <p className='leading-relaxed'>
                  Started with the cover art, which set the direction. We searched for fitting beats and produced tracks
                  to match the space theme. Original plan included vocal collaborations for each track, which never
                  materialized.
                </p>
              </div>
            </div>
          </div>

          {/* learnings Section 
          <div>
            <h2
              className={`text-xl font-bold  border-b-2 border-[#e34c42] pb-2 mb-4 text-[#e34c42] ${orbitron.className}`}
            >
              learnings
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-5 gap-y-2 text-sm'>
              <div className='hidden md:block'></div>
              <div className='hidden md:block'></div>
              <div className='hidden md:block'></div>
              <div className='md:col-span-2'>
                <ul className='list-disc list-outside pl-3 space-y-1'>
                  <li>Outreach to more artists for collaboration</li>
                  <li>Maintain momentum on long-term projects</li>
                </ul>
              </div>
            </div>
          </div>*/}

          {/* credits Section */}
          <div>
            <h2 className='text-xl font-bold  border-b-2 border-[#e34c42] pb-2 mb-4 text-[#e34c42]'>credits</h2>
            <div className='grid grid-cols-2 md:grid-cols-5 gap-y-2 text-sm'>
              <div className='hidden md:block'></div>
              <div className='font-bold md:text-right text-[#e34c42]'>Album Art</div>
              <div className='hidden md:block'></div>
              <div className='md:col-span-2'>Till Solenthaler</div>

              <div className='hidden md:block'></div>
              <div className='font-bold md:text-right text-[#e34c42]'>Music Production</div>
              <div className='hidden md:block'></div>
              <div className='md:col-span-2'>
                Till Solenthaler (Freddie Chopper), Lars Faber (Dirty Uludag), Julian Fehr, Ilja Kager, Michael Ehlers,
                Unikat Dynamik
              </div>

              <div className='hidden md:block'></div>
              <div className='font-bold md:text-right text-[#e34c42]'>AI Declaration</div>
              <div className='hidden md:block'></div>
              <div className='md:col-span-2'>No AI was used in this project</div>
            </div>
          </div>
        </div>
      </div>

      {/* Process Section */}
      <div className='px-4 md:px-8 pt-12 pb-16 relative z-10'>
        <div>
          <h2 className='text-xl font-bold  border-b-2 border-[#e34c42] pb-2 mb-6 text-[#e34c42]'>process</h2>

          <div className='flex flex-col lg:flex-row lg:items-stretch gap-6'>
            {/* Left: Process List */}
            <div className='order-2 lg:order-1 lg:w-2/5 space-y-2'>
              {PROCESS_STEPS.map((step, index) => {
                const isActive = selectedProcessIndex === index;
                return (
                  <div
                    key={index}
                    onClick={() => setSelectedProcessIndex(index)}
                    className={`w-full p-3 lg:border-l-4 transition-all text-left flex flex-col lg:flex-row lg:items-center gap-3 lg:cursor-pointer ${
                      isActive
                        ? 'lg:border-[#e34c42] bg-[#AA4742]/20'
                        : 'bg-[#AA4742]/20 lg:border-[#e34c42]/40 lg:bg-[#AA4742]/10 lg:hover:bg-[#AA4742]/20'
                    }`}
                  >
                    <div
                      className={`relative w-full aspect-square lg:w-20 lg:h-20 flex-shrink-0 overflow-hidden rounded ${
                        isActive ? 'ring-2 ring-[#e34c42]' : 'ring-2 ring-[#e34c42] lg:ring-1 lg:ring-[#AA4742]/40'
                      }`}
                    >
                      <Image
                        src={step.image}
                        alt={`${step.title} thumbnail`}
                        fill
                        className={step.objectFit === 'contain' ? 'object-contain' : 'object-cover'}
                      />
                    </div>
                    <div className='flex-1 text-white'>
                      <span className='font-bold block text-[#e34c42]'>{step.title}</span>
                      <span className='text-white/80 text-sm'>{step.text}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right: Selected Image - Desktop only */}
            <div className='hidden lg:flex order-1 lg:order-2 lg:w-3/5'>
              <div
                className='relative w-full rounded-lg overflow-hidden cursor-pointer'
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
                    PROCESS_STEPS[selectedProcessIndex]?.objectFit === 'contain' ? 'object-contain' : 'object-cover'
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Project Navigation */}
      <div className='relative z-10 px-4 md:px-8 pb-16'>
        <div className='flex justify-between items-center border-b-2 border-[#e34c42] pb-2'>
          <span
            onClick={() => navigateTo('/toy-lexicon')}
            className='font-bold cursor-pointer lowercase text-[clamp(0.625rem,3vh,1rem)] md:text-[clamp(0.875rem,4vh,4rem)] leading-none text-[#e34c42] hover:opacity-60 transition-opacity'
          >
            previous
          </span>
          <span
            onClick={() => navigateTo('/dayjob')}
            className='font-bold cursor-pointer lowercase text-[clamp(0.625rem,3vh,1rem)] md:text-[clamp(0.875rem,4vh,4rem)] leading-none text-[#e34c42] hover:opacity-60 transition-opacity'
          >
            next
          </span>
        </div>
      </div>

      <Lightbox src={lightboxImage?.src || null} title={lightboxImage?.title} onClose={() => setLightboxImage(null)} />
    </section>
  );
}
