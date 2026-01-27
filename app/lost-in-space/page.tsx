'use client';

import { AlbumViewer3D } from '@/components/lost-in-space/album-viewer-3d';
import { StarField } from '@/components/lost-in-space/star-field';
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

const PROCESS_STEPS = [
  {
    imageIndex: 1,
    title: '01. COVER ART',
    text: 'The whole project actually started, because i created the cover art. We then searched for fitting beats and also produced a few tracks specifically to this space theme.',
  },
  {
    imageIndex: 2,
    title: '02. PRODUCTION',
    text: 'Made at Vogelsang, a creative interim building. Mostly produced by me (Ableton) and Lars (FL Studio). We often collaborated on tracks - one creating samples, the other drums.',
  },
  {
    imageIndex: 3,
    title: '03. RELEASE',
    text: 'We then released the album on all major streaming platforms, including Spotify, Apple Music, and Soundcloud.',
  },
  {
    imageIndex: 4,
    title: '04. OUTREACH TO ARTISTS',
    text: 'We then reached out to various artists to collaborate on vocals for each track, but we only got about half of the tracks done before losing momentum on the project. Also covid hit around that time, which made collaboration even harder.',
  },
];

export default function LostInSpacePage() {
  const [selectedProcessIndex, setSelectedProcessIndex] = useState(0);

  return (
    <section className='h-screen overflow-y-auto overflow-x-hidden relative'>
      <StarField />

      {/* First View: Album Viewer */}
      <div className='h-screen relative overflow-hidden flex flex-col items-center'>
        {/* Title - Bottom Left */}
        <div className='absolute bottom-4 md:bottom-8 left-4 md:left-8 pointer-events-none z-10'>
          <h2
            className={`text-5xl uppercase lg:text-7xl font-bold text-white ${orbitron.className}`}
            style={{ transform: 'perspective(300px) rotateX(25deg)' }}
          >
            lost in space
          </h2>
        </div>

        {/* Album Viewer */}
        <div className='absolute inset-0 flex items-center justify-center z-10'>
          <AlbumViewer3D
            coverImage={IMAGES[0]}
            spotifyEmbedUrl='https://open.spotify.com/embed/album/6qs3jyw9rqToXnp1EjEXzL?utm_source=generator&theme=0'
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
            className='text-white/30 animate-bounce'
          >
            <path d='M12 5v14M5 12l7 7 7-7' />
          </svg>
        </div>
      </div>

      {/* Info Content - 3 Columns */}
      <div className='px-4 md:px-8 pt-16 pb-16 relative z-10'>
        <div>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 text-white'>
            {/* Column 1: Brief & Idea */}
            <div className='space-y-6'>
              <div>
                <h3 className={`text-xl font-bold uppercase border-b-2 border-[#AA4742] pb-2 text-[#FF6B66] ${orbitron.className}`}>Brief</h3>
                <p className='mt-4 leading-relaxed'>
                  An album i did toghether with my friends when i used to live in a house full of musicians. Combining
                  productions under the theme of space, with cover art created by me.
                </p>
              </div>
              <div>
                <h3 className={`text-xl font-bold uppercase border-b-2 border-[#AA4742] pb-2 text-[#FF6B66] ${orbitron.className}`}>Idea</h3>
                <p className='mt-4 leading-relaxed'>
                  Started with the cover art, which set the direction. We searched for fitting beats and produced tracks
                  to match the space theme. Original plan included vocal collaborations for each track, which never
                  materialized.
                </p>
              </div>
            </div>

            {/* Column 2: Specifications */}
            <div>
              <h3 className={`text-xl font-bold uppercase border-b-2 border-[#AA4742] pb-2 text-[#FF6B66] ${orbitron.className}`}>
                Specifications
              </h3>
              <ul className='space-y-2 list-none mt-4'>
                <li className='border-l-2 border-[#AA4742] pl-3 py-1'>
                  <span className='font-bold text-[#FF6B66]'>YEAR:</span> 2019
                </li>
                <li className='border-l-2 border-[#AA4742] pl-3 py-1'>
                  <span className='font-bold text-[#FF6B66]'>FOR:</span> Collaborative Project
                </li>
                <li className='border-l-2 border-[#AA4742] pl-3 py-1'>
                  <span className='font-bold text-[#FF6B66]'>TYPE:</span> Music Album / Cover Art
                </li>
                <li className='border-l-2 border-[#AA4742] pl-3 py-1'>
                  <span className='font-bold text-[#FF6B66]'>METHODOLOGY:</span> Recording instruments / sounds,
                  sampling and programming MIDI with Ableton and FL Studio.
                </li>
              </ul>
            </div>

            {/* Column 3: Learnings & Credits */}
            <div className='space-y-6'>
              <div>
                <h3 className={`text-xl font-bold uppercase border-b-2 border-[#AA4742] pb-2 text-[#FF6B66] ${orbitron.className}`}>
                  Learnings
                </h3>
                <ul className='list-disc list-inside mt-4 space-y-1'>
                  <li>Outreach to more artists for collaboration</li>
                  <li>Maintain momentum on long-term projects</li>
                </ul>
              </div>
              <div>
                <h3 className={`text-xl font-bold uppercase border-b-2 border-[#AA4742] pb-2 text-[#FF6B66] ${orbitron.className}`}>Credits</h3>
                <div className='space-y-4 mt-4'>
                  <div>
                    <span className='font-bold block uppercase text-sm tracking-wider text-[#FF6B66]'>Album Art</span>
                    <span>Till Solenthaler</span>
                  </div>
                  <div>
                    <span className='font-bold block uppercase text-sm tracking-wider text-[#FF6B66]'>
                      Music Production
                    </span>
                    <span>Till Solenthaler, Lars Faber, Julian Fehr, Ilja Kager, Michael Ehlers, Unikat Dynamik</span>
                  </div>
                  <div>
                    <span className='font-bold block uppercase text-sm tracking-wider text-[#FF6B66]'>
                      AI Declaration
                    </span>
                    <span>No AI was used in this project</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Process Section */}
      <div className='px-4 md:px-8 pt-12 pb-16 relative z-10'>
        <div className='flex flex-col'>
          <h3 className={`text-xl font-bold uppercase border-b-2 border-[#AA4742] pb-2 mb-6 flex-shrink-0 text-[#FF6B66] ${orbitron.className}`}>
            Process
          </h3>

          <div className='flex flex-col lg:flex-row gap-6'>
            {/* Left: Process List (1/3 on desktop, full on mobile) */}
            <div className='lg:w-1/3 space-y-2'>
              {PROCESS_STEPS.map((step, index) => (
                <div
                  key={step.imageIndex}
                  onClick={() => setSelectedProcessIndex(index)}
                  className={`w-full p-3 border-l-4 transition-all text-left flex flex-col md:flex-row md:items-center gap-3 lg:cursor-pointer border-[#AA4742] bg-[#AA4742]/20 ${
                    selectedProcessIndex !== index &&
                    'lg:border-[#AA4742]/40 lg:bg-[#AA4742]/10 lg:hover:bg-[#AA4742]/20'
                  }`}
                >
                  <div
                    className={`relative w-full aspect-square md:w-20 md:h-20 flex-shrink-0 overflow-hidden rounded ring-2 ring-[#FF6B66] ${
                      selectedProcessIndex !== index && 'lg:ring-1 lg:ring-[#AA4742]/40'
                    }`}
                  >
                    <Image
                      src={IMAGES[step.imageIndex]}
                      alt={`${step.title} thumbnail`}
                      fill
                      className='object-cover'
                    />
                  </div>
                  <div className='flex-1 text-white'>
                    <span className='font-bold block text-[#FF6B66]'>{step.title}</span>
                    <span className='text-white/80 text-sm'>{step.text}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Right: Selected Image (2/3) - Desktop only */}
            <div className='hidden lg:block lg:w-2/3'>
              <div className='aspect-square max-h-[80vh] relative w-full aspect-[4/3] rounded-lg overflow-hidden'>
                <Image
                  src={IMAGES[PROCESS_STEPS[selectedProcessIndex]?.imageIndex] || IMAGES[0]}
                  alt={PROCESS_STEPS[selectedProcessIndex]?.title || 'Process step'}
                  fill
                  className='object-contain'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
