'use client';

import { AlbumViewer3D } from '@/components/lost-in-space/album-viewer-3d';
import { SpaceTabs } from '@/components/lost-in-space/space-tabs';
import { StarField } from '@/components/lost-in-space/star-field';
import { orbitron } from '@/lib/fonts';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useCallback, useState } from 'react';

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
    text: 'Vogelsang was a Projekt Interim Building that housed many creatives, mainly in music. My closest collaborators at that time were Lars (Dirty Uludag) and Julian (July). This Album / Beattape was mostly made by me and Lars. I used Ableton and Lars used Fruity Loops. We also would often work on the same tracks. Someone created a sample and the other the drums and vice-versa.',
  },
  {
    imageIndex: 3,
    title: '03. INTEGRATION',
    text: 'Spotify player embedding',
  },
  {
    imageIndex: 4,
    title: '04. FINALIZATION',
    text: 'Final album preparation',
  },
];

export function Project6() {
  const [showMobileInfo, setShowMobileInfo] = useState(false);
  const [activeTab, setActiveTab] = useState<'infos' | 'process'>('infos');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleTabChange = useCallback((tabId: string) => {
    setActiveTab(tabId as 'infos' | 'process');
    if (tabId === 'infos') {
      setCurrentImageIndex(0);
    } else if (tabId === 'process') {
      setCurrentImageIndex(1);
    }
  }, []);

  return (
    <section className='h-screen flex flex-col items-center pt-24 md:pt-28 gap-4 md:gap-8 px-4 md:px-8 relative overflow-hidden'>
      <StarField />

      {/* Desktop Layout */}
      <div className='hidden lg:flex flex-1 flex-row gap-4 md:gap-8 max-w-screen-2xl mx-0 md:pt-8 w-full overflow-hidden pb-8 max-h-[1000px] relative z-10'>
        {/* Column 1: 3D Album Viewer */}
        <div className='flex flex items-start justify-start '>
          <AlbumViewer3D
            coverImage={IMAGES[currentImageIndex]}
            spotifyEmbedUrl='https://open.spotify.com/embed/album/6qs3jyw9rqToXnp1EjEXzL?utm_source=generator&theme=0'
          />
        </div>

        {/* Column 2: Tabs */}
        <div className='flex flex-1 w-full flex-col gap-4 md:gap-8 items-center justify-start'>
          <h2
            className={`text-4xl lg:text-7xl font-bold text-white text-center ${orbitron.className}`}
            style={{ transform: 'perspective(300px) rotateX(25deg)' }}
          >
            LOST IN SPACE
          </h2>
          <div className='w-full flex-1 min-h-0'>
            <SpaceTabs
              tabs={[
                {
                  id: 'infos',
                  label: 'INFOS',
                  content: (
                    <div className='space-y-6 text-white'>
                      <div>
                        <h3 className='text-lg font-bold uppercase border-b-2 border-[#AA4742]/40 pb-2 text-[#FF6B66]'>
                          Brief
                        </h3>
                        <p className='leading-relaxed mt-4'>
                          An album i did toghether with my flatmate when we used to live in a studio. We produced beats
                          and invited friends to rap on them. The space theme came from the cover art which i created
                          first.
                        </p>
                      </div>
                      <div>
                        <h3 className='text-lg font-bold uppercase border-b-2 border-[#AA4742]/40 pb-2 text-[#FF6B66] mt-6'>
                          Specifications
                        </h3>
                        <ul className='space-y-2 list-none mt-4'>
                          <li className='border-l-2 border-[#AA4742]/60 pl-4'>
                            <span className='font-bold'>YEAR:</span> 2019
                          </li>
                          <li className='border-l-2 border-[#AA4742]/60 pl-4'>
                            <span className='font-bold'>FOR:</span> Personal Project
                          </li>
                          <li className='border-l-2 border-[#AA4742]/60 pl-4'>
                            <span className='font-bold'>TYPE:</span> Music Album / Cover Art
                          </li>
                          <li className='border-l-2 border-[#AA4742]/60 pl-4'>
                            <span className='font-bold'>PLATFORM:</span> Spotify, Apple Music
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h3 className='text-lg font-bold uppercase border-b-2 border-[#AA4742]/40 pb-2 text-[#FF6B66] mt-6'>
                          Idea
                        </h3>
                        <p className='leading-relaxed mt-4'>
                          The whole project actually started because I created the cover art. We then searched for
                          fitting beats and also produced a few tracks specifically to match this space theme.
                        </p>
                      </div>
                      <div>
                        <h3 className='text-lg font-bold uppercase border-b-2 border-[#AA4742]/40 pb-2 text-[#FF6B66] mt-6'>
                          Learnings & Improvements
                        </h3>
                        <div className='space-y-3 mt-4'>
                          <ul className='list-disc list-inside'>
                            <li>Create more cohesive album artwork across all tracks</li>
                            <li>Add animated visualizers for each track</li>
                            <li>Build a dedicated landing page with interactive 3D elements</li>
                          </ul>
                        </div>
                      </div>
                      <div>
                        <h3 className='text-lg font-bold uppercase border-b-2 border-[#AA4742]/40 pb-2 text-[#FF6B66] mt-6'>
                          Credits
                        </h3>
                        <div className='space-y-3 mt-4'>
                          <div>
                            <span className='font-bold block uppercase text-xs tracking-wider text-[#FF6B66]'>
                              Album Art
                            </span>
                            <span>Till Solenthaler</span>
                          </div>
                          <div>
                            <span className='font-bold block uppercase text-xs tracking-wider text-[#FF6B66]'>
                              Music Production
                            </span>
                            <span>
                              Till Solenthaler, Lars Faber, Julian Fehr, Ilja Kager, Michael Ehlers, Unikat Dynamik
                            </span>
                          </div>
                          <div>
                            <span className='font-bold block uppercase text-xs tracking-wider text-[#FF6B66]'>
                              AI Declaration
                            </span>
                            <div className='space-y-3 mt-2'>
                              <ul className='list-disc list-inside'>
                                <li>No AI was used in this project</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  id: 'process',
                  label: 'PROCESS',
                  content: (
                    <div className='space-y-4 text-white'>
                      <h3 className='text-lg font-bold uppercase border-b-2 border-[#AA4742]/40 pb-2 text-[#FF6B66]'>
                        Creation Process
                      </h3>
                      <div className='space-y-3'>
                        {PROCESS_STEPS.map((step) => (
                          <button
                            key={step.imageIndex}
                            onClick={() => setCurrentImageIndex(step.imageIndex)}
                            className='w-full cursor-pointer bg-[#AA4742]/10 p-3 border-l-2 border-[#AA4742]/60 hover:bg-[#AA4742]/20 transition-colors text-left flex items-center gap-3'
                          >
                            <div
                              className={`relative w-16 h-16 flex-shrink-0 rounded overflow-hidden ${
                                currentImageIndex === step.imageIndex ? 'ring-4 ring-[#FF6B66]' : 'ring-1 ring-[#AA4742]/40'
                              }`}
                            >
                              <Image src={IMAGES[step.imageIndex]} alt={`${step.title} step`} fill className='object-cover' />
                            </div>
                            <div className='flex-1'>
                              <span className='font-bold block text-[#FF6B66]'>{step.title}</span>
                              <span className='text-sm'>{step.text}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  ),
                },
              ]}
              activeTab={activeTab}
              onTabChange={handleTabChange}
            />
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className='lg:hidden flex-1 flex flex-col gap-4 max-w-screen-2xl mx-auto px-0 w-full overflow-visible pb-4 relative z-10'>
        {/* Middle Content - Swipeable */}
        <div className='flex-1 relative'>
          <AnimatePresence initial={false}>
            {!showMobileInfo ? (
              <motion.div
                key='viewer'
                initial={{ x: 'calc(-100% - 1rem)' }}
                animate={{ x: 0 }}
                exit={{ x: 'calc(-100% - 1rem)' }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className='absolute inset-0 flex flex-col gap-4 w-full'
              >
                <h2
                  className={`text-4xl text-center font-bold text-white ${orbitron.className}`}
                  style={{ transform: 'perspective(300px) rotateX(25deg)' }}
                >
                  LOST IN SPACE
                </h2>
                <div className='flex-1 flex items-center justify-center'>
                  <AlbumViewer3D
                    coverImage={IMAGES[currentImageIndex]}
                    spotifyEmbedUrl='https://open.spotify.com/embed/album/6qs3jyw9rqToXnp1EjEXzL?utm_source=generator&theme=0'
                  />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key='info'
                initial={{ x: 'calc(100% + 1rem)' }}
                animate={{ x: 0 }}
                exit={{ x: 'calc(100% + 1rem)' }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className='absolute inset-0 overflow-hidden'
              >
                <SpaceTabs
                  tabs={[
                    {
                      id: 'infos',
                      label: 'INFOS',
                      content: (
                        <div className='space-y-6 text-white'>
                          <div>
                            <h3 className='text-lg font-bold uppercase border-b-2 border-[#AA4742]/40 pb-2 text-[#FF6B66]'>
                              Project Details
                            </h3>
                            <p className='leading-relaxed mt-4'>
                              An album i did toghether with my flatmate when we used to live in a studio.
                            </p>
                            <div className='grid grid-cols-2 gap-4 pt-4'>
                              <div>
                                <span className='font-bold block text-[#FF6B66]'>TYPE:</span>
                                <span>Music Album</span>
                              </div>
                              <div>
                                <span className='font-bold block text-[#FF6B66]'>YEAR:</span>
                                <span>2019</span>
                              </div>
                            </div>
                          </div>
                          {/* <div>
                            <h3 className='text-lg font-bold uppercase border-b-2 border-[#AA4742]/40 pb-2 text-[#FF6B66] mt-6'>
                              Specifications
                            </h3>
                            <ul className='space-y-2 list-none mt-4'>
                              <li className='border-l-2 border-[#AA4742]/60 pl-4'>
                                <span className='font-bold text-[#FF6B66]'>FORMAT:</span> 3D Interactive
                              </li>
                              <li className='border-l-2 border-[#AA4742]/60 pl-4'>
                                <span className='font-bold text-[#FF6B66]'>PLATFORM:</span> Spotify
                              </li>
                              <li className='border-l-2 border-[#AA4742]/60 pl-4'>
                                <span className='font-bold text-[#FF6B66]'>INTERACTION:</span> Mouse Tilt & Flip
                              </li>
                              <li className='border-l-2 border-[#AA4742]/60 pl-4'>
                                <span className='font-bold text-[#FF6B66]'>ANIMATION:</span> CSS 3D Transform
                              </li>
                            </ul>
                          </div> */}
                          <div>
                            <h3 className='text-lg font-bold uppercase border-b-2 border-[#AA4742]/40 pb-2 text-[#FF6B66] mt-6'>
                              Credits
                            </h3>
                            <div className='space-y-3 mt-4'>
                              <div>
                                <span className='font-bold block uppercase text-xs tracking-wider text-[#FF6B66]'>
                                  Album Art
                                </span>
                                <span>Till Solenthaler</span>
                              </div>
                              <div>
                                <span className='font-bold block uppercase text-xs tracking-wider text-[#FF6B66]'>
                                  Music Production
                                </span>
                                <span>
                                  Till Solenthaler, Lars Faber, Julian Fehr, Ilja Kager, Michael Ehlers, Unikat Dynamik
                                </span>
                              </div>
                              <div>
                                <span className='font-bold block uppercase text-xs tracking-wider text-[#FF6B66]'>
                                  Development
                                </span>
                                <span>Till Solenthaler</span>
                              </div>
                              <div>
                                <span className='font-bold block uppercase text-xs tracking-wider text-[#FF6B66]'>
                                  Year
                                </span>
                                <span>2024</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ),
                    },
                    {
                      id: 'process',
                      label: 'PROCESS',
                      content: (
                        <div className='space-y-4 text-white'>
                          <h3 className='text-lg font-bold uppercase border-b-2 border-[#AA4742]/40 pb-2 text-[#FF6B66]'>
                            Creation Process
                          </h3>
                          <div className='space-y-3'>
                            {PROCESS_STEPS.map((step) => (
                              <button
                                key={step.imageIndex}
                                onClick={() => setCurrentImageIndex(step.imageIndex)}
                                className='w-full cursor-pointer bg-[#AA4742]/10 p-3 border-l-2 border-[#AA4742]/60 hover:bg-[#AA4742]/20 transition-colors text-left flex flex-col gap-3'
                              >
                                <div
                                  className={`relative w-full aspect-square flex-shrink-0 rounded overflow-hidden ${
                                    currentImageIndex === step.imageIndex ? 'ring-4 ring-[#FF6B66]' : 'ring-1 ring-[#AA4742]/40'
                                  }`}
                                >
                                  <Image src={IMAGES[step.imageIndex]} alt={`${step.title} step`} fill className='object-cover' />
                                </div>
                                <div className='flex-1'>
                                  <span className='font-bold block text-[#FF6B66]'>{step.title}</span>
                                  <span className='text-sm'>{step.text}</span>
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      ),
                    },
                  ]}
                  activeTab={activeTab}
                  onTabChange={handleTabChange}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Button - Always visible */}
        <button
          onClick={() => setShowMobileInfo(!showMobileInfo)}
          className='w-full py-4 px-6 rounded-lg border border-white/20 bg-white/10 backdrop-blur-md text-white font-mono font-bold uppercase hover:bg-white/20 transition-colors'
        >
          {showMobileInfo ? 'Back' : 'More Infos'}
        </button>
      </div>
    </section>
  );
}
