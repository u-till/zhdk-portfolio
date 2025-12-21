'use client';

import { AlbumViewer3D } from '@/components/album-viewer-3d';
import { SpaceTabs } from '@/components/space-tabs';
import { StarField } from '@/components/star-field';
import { orbitron } from '@/lib/fonts';
import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useState } from 'react';

const IMAGES = [
  '/lost-in-space/cover.jpg',
  '/lost-in-space/studio.jpeg',
  '/lost-in-space/backside.jpg',
  '/lost-in-space/backside.jpg',
];

export function Project5() {
  const [showMobileInfo, setShowMobileInfo] = useState(false);
  const [activeTab, setActiveTab] = useState<'infos' | 'process'>('infos');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleTabChange = useCallback((tabId: string) => {
    setActiveTab(tabId as 'infos' | 'process');
    if (tabId === 'infos') {
      setCurrentImageIndex(0);
    }
  }, []);

  return (
    <section className='h-screen flex flex-col items-center pt-24 md:pt-28 gap-4 md:gap-8 px-4 md:px-8 relative overflow-hidden'>
      <StarField />

      {/* Desktop Layout */}
      <div className='hidden lg:flex flex-1 flex-row gap-4 md:gap-8 max-w-screen-2xl mx-0 md:pt-8 w-full overflow-hidden pb-8 max-h-[1000px] relative z-10'>
        {/* Column 1: 3D Album Viewer */}
        <div className='flex flex items-start justify-start'>
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
          <div className='w-full h-full'>
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
                        <button
                          onClick={() => setCurrentImageIndex(1)}
                          className='w-full cursor-pointer bg-[#AA4742]/10 p-3 border-l-2 border-[#AA4742]/60 hover:bg-[#AA4742]/20 transition-colors text-left'
                        >
                          <span className='font-bold block text-[#FF6B66]'>01. DESIGN</span>
                          <span className='text-sm'>Album artwork and layout</span>
                        </button>
                        <button
                          onClick={() => setCurrentImageIndex(2)}
                          className='w-full cursor-pointer bg-[#AA4742]/10 p-3 border-l-2 border-[#AA4742]/60 hover:bg-[#AA4742]/20 transition-colors text-left'
                        >
                          <span className='font-bold block text-[#FF6B66]'>02. DEVELOPMENT</span>
                          <span className='text-sm'>3D transformation implementation</span>
                        </button>
                        <button
                          onClick={() => setCurrentImageIndex(3)}
                          className='w-full cursor-pointer bg-[#AA4742]/10 p-3 border-l-2 border-[#AA4742]/60 hover:bg-[#AA4742]/20 transition-colors text-left'
                        >
                          <span className='font-bold block text-[#FF6B66]'>03. INTEGRATION</span>
                          <span className='text-sm'>Spotify player embedding</span>
                        </button>
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
                            <button
                              onClick={() => setCurrentImageIndex(1)}
                              className='w-full cursor-pointer bg-[#AA4742]/10 p-3 border-l-2 border-[#AA4742]/60 hover:bg-[#AA4742]/20 transition-colors text-left'
                            >
                              <span className='font-bold block text-[#FF6B66]'>01. DESIGN</span>
                              <span className='text-sm'>Album artwork and layout</span>
                            </button>
                            <button
                              onClick={() => setCurrentImageIndex(2)}
                              className='w-full cursor-pointer bg-[#AA4742]/10 p-3 border-l-2 border-[#AA4742]/60 hover:bg-[#AA4742]/20 transition-colors text-left'
                            >
                              <span className='font-bold block text-[#FF6B66]'>02. DEVELOPMENT</span>
                              <span className='text-sm'>3D transformation implementation</span>
                            </button>
                            <button
                              onClick={() => setCurrentImageIndex(3)}
                              className='w-full cursor-pointer bg-[#AA4742]/10 p-3 border-l-2 border-[#AA4742]/60 hover:bg-[#AA4742]/20 transition-colors text-left'
                            >
                              <span className='font-bold block text-[#FF6B66]'>03. INTEGRATION</span>
                              <span className='text-sm'>Spotify player embedding</span>
                            </button>
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
