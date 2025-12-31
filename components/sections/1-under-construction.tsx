'use client';

import { BrutalistTabs } from '@/components/brutalist-tabs';
import { Viewer360 } from '@/components/viewer-360';
import { allertaStencil } from '@/lib/fonts';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useCallback, useMemo, useState } from 'react';

const getTabsContent = (onProcessImageClick?: (imageIndex: number) => void, selectedProcessImage?: number | null) => [
  {
    id: 'infos',
    label: 'INFOS',
    content: (
      <div className='space-y-6 pb-16'>
        <div>
          <h3 className='text-lg font-bold uppercase border-b-2 border-black pb-2'>Project Details</h3>
          <p className='mt-4'>
            A filing cabinet built with planks from a construction site visualised with a 360° rotatable viewer.
          </p>
          <div className='grid grid-cols-2 gap-4 pt-4'>
            <div>
              <span className='font-bold block'>TYPE:</span>
              <span>Furniture</span>
            </div>
            <div>
              <span className='font-bold block'>YEAR:</span>
              <span>2025</span>
            </div>
          </div>
        </div>
        <div>
          <h3 className='text-lg font-bold uppercase border-b-2 border-black pb-2 mt-6'>Specifications</h3>
          <ul className='space-y-2 list-none mt-4'>
            <li className='border-l-4 border-red-600 pl-4'>
              <span className='font-bold'>SIZE:</span> 27cm x 100cm x 120cm
            </li>
            <li className='border-l-4 border-red-600 pl-4'>
              <span className='font-bold'>MATEIAL:</span> Wood
            </li>
          </ul>
        </div>
        <div>
          <h3 className='text-lg font-bold uppercase border-b-2 border-black pb-2 mt-6'>Credits</h3>
          <div className='space-y-3 mt-4'>
            <div>
              <span className='font-bold block uppercase text-xs tracking-wider'>Solo Project</span>
              <span>Till Solenthaler</span>
            </div>
            <div>
              <span className='font-bold block uppercase text-xs tracking-wider'>Year</span>
              <span>2025</span>
            </div>
            <div>
              <span className='font-bold block uppercase text-xs tracking-wider'>AI Declaration</span>
              <span>Nano Banana for the background image</span>
            </div>
          </div>
        </div>
        <div className='pb-4'>
          <h3 className='text-lg font-bold uppercase border-b-2 border-black pb-2 mt-6'>Possible Improvements</h3>
          <div className='space-y-3 mt-4'>
            <ul className='list-disc list-inside'>
              <li>Use Kreissäge anstatt Stichsäge</li>
              <li>Use sandpaper</li>
            </ul>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'process',
    label: 'PROCESS',
    content: (
      <div className='h-full flex flex-col'>
        <h3 className='text-lg font-bold uppercase border-b-2 border-black pb-2 mb-4'>Development Process</h3>
        <div className='space-y-3 flex-1 flex flex-col justify-start'>
          <button
            onClick={() => onProcessImageClick?.(0)}
            className='w-full cursor-pointer bg-neutral-100 p-3 border-l-4 border-black hover:bg-neutral-200 transition-colors text-left flex items-center gap-3'
          >
            <div
              className={`relative w-16 h-16 flex-shrink-0 rounded overflow-hidden ${
                selectedProcessImage === 0 ? 'ring-4 ring-black' : 'ring-1 ring-black/20'
              }`}
            >
              <Image src='/under-construction/korpus-process-0.jpg' alt='Capture step' fill className='object-cover' />
            </div>
            <div className='flex-1'>
              <span className='font-bold block'>01. DESIGN</span>
              <span className='text-sm'>360° photography setup</span>
            </div>
          </button>
          <button
            onClick={() => onProcessImageClick?.(1)}
            className='w-full cursor-pointer bg-neutral-100 p-3 border-l-4 border-black hover:bg-neutral-200 transition-colors text-left flex items-center gap-3'
          >
            <div
              className={`relative w-16 h-16 flex-shrink-0 rounded overflow-hidden ${
                selectedProcessImage === 1 ? 'ring-4 ring-black' : 'ring-1 ring-black/20'
              }`}
            >
              <Image src='/under-construction/korpus-process-1.jpg' alt='Process step' fill className='object-cover' />
            </div>
            <div className='flex-1'>
              <span className='font-bold block'>02. SOURCE</span>
              <span className='text-sm'>Image normalization</span>
            </div>
          </button>
          <button
            onClick={() => onProcessImageClick?.(2)}
            className='w-full cursor-pointer bg-neutral-100 p-3 border-l-4 border-black hover:bg-neutral-200 transition-colors text-left flex items-center gap-3'
          >
            <div
              className={`relative w-16 h-16 flex-shrink-0 rounded overflow-hidden ${
                selectedProcessImage === 2 ? 'ring-4 ring-black' : 'ring-1 ring-black/20'
              }`}
            >
              <Image
                src='/under-construction/korpus-process-2.jpg'
                alt='Implement step'
                fill
                className='object-cover'
              />
            </div>
            <div className='flex-1'>
              <span className='font-bold block'>03. BUILD</span>
              <span className='text-sm'>Interactive viewer</span>
            </div>
          </button>
          <button
            onClick={() => onProcessImageClick?.(2)}
            className='w-full cursor-pointer bg-neutral-100 p-3 border-l-4 border-black hover:bg-neutral-200 transition-colors text-left flex items-center gap-3'
          >
            <div
              className={`relative w-16 h-16 flex-shrink-0 rounded overflow-hidden ${
                selectedProcessImage === 2 ? 'ring-4 ring-black' : 'ring-1 ring-black/20'
              }`}
            >
              <Image
                src='/under-construction/korpus-process-2.jpg'
                alt='Implement step'
                fill
                className='object-cover'
              />
            </div>
            <div className='flex-1'>
              <span className='font-bold block'>04. FINALIZE</span>
              <span className='text-sm'>Image of finished product</span>
            </div>
          </button>
          <button
            onClick={() => onProcessImageClick?.(2)}
            className='w-full cursor-pointer bg-neutral-100 p-3 border-l-4 border-black hover:bg-neutral-200 transition-colors text-left flex items-center gap-3'
          >
            <div
              className={`relative w-16 h-16 flex-shrink-0 rounded overflow-hidden ${
                selectedProcessImage === 2 ? 'ring-4 ring-black' : 'ring-1 ring-black/20'
              }`}
            >
              <Image
                src='/under-construction/korpus-process-2.jpg'
                alt='Implement step'
                fill
                className='object-cover'
              />
            </div>
            <div className='flex-1'>
              <span className='font-bold block'>05. CAPTURE</span>
              <span className='text-sm'>Image of capturing process</span>
            </div>
          </button>
          <button
            onClick={() => onProcessImageClick?.(2)}
            className='w-full cursor-pointer bg-neutral-100 p-3 border-l-4 border-black hover:bg-neutral-200 transition-colors text-left flex items-center gap-3'
          >
            <div
              className={`relative w-16 h-16 flex-shrink-0 rounded overflow-hidden ${
                selectedProcessImage === 2 ? 'ring-4 ring-black' : 'ring-1 ring-black/20'
              }`}
            >
              <Image
                src='/under-construction/korpus-process-2.jpg'
                alt='Implement step'
                fill
                className='object-cover'
              />
            </div>
            <div className='flex-1'>
              <span className='font-bold block'>06. PUT TO USE</span>
              <span className='text-sm'>image of how it is used</span>
            </div>
          </button>
        </div>
      </div>
    ),
  },
];

export function Project1() {
  const [showMobileInfo, setShowMobileInfo] = useState(false);
  const [selectedProcessImage, setSelectedProcessImage] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'infos' | 'process'>('infos');

  const handleProcessImageClick = useCallback((imageIndex: number) => {
    setSelectedProcessImage(imageIndex);
  }, []);

  const handleTabChange = useCallback((tabId: string) => {
    setActiveTab(tabId as 'infos' | 'process');
    if (tabId === 'infos') {
      setSelectedProcessImage(null);
    } else if (tabId === 'process') {
      setSelectedProcessImage(0);
    }
  }, []);

  const tabs = useMemo(
    () => getTabsContent(handleProcessImageClick, selectedProcessImage),
    [handleProcessImageClick, selectedProcessImage]
  );

  return (
    <section className='h-screen flex flex-col items-center pt-24 md:pt-28 gap-4 md:gap-8 px-4 md:px-8'>
      {/* Desktop Layout */}
      <div className='hidden lg:flex flex-1 flex-row gap-4 md:gap-8 max-w-screen-2xl mx-0 md:pt-8 w-full overflow-hidden pb-8 max-h-[1000px]'>
        {/* Column 1: 360 Viewer / Process Image */}
        <div className='flex flex-1 items-start justify-start relative'>
          {selectedProcessImage !== null ? (
            <div className='w-full h-full relative border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] aspect-square'>
              <button
                onClick={() => setSelectedProcessImage(null)}
                className='absolute top-4 right-4 z-10 cursor-pointer w-10 h-10 bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all font-bold'
              >
                ×
              </button>
              <Image
                src={`/under-construction/korpus-process-${selectedProcessImage}.jpg`}
                alt={`Process ${selectedProcessImage + 1}`}
                fill
                className='object-cover'
              />
            </div>
          ) : (
            <Viewer360
              imageFolder='under-construction/korpus-360'
              totalFrames={27}
              imageFormat='png'
              imagePrefix='normalized-'
              imagePadding={2}
            />
          )}
        </div>

        {/* Column 2: Tabs */}
        <div className='flex flex-1 w-full flex-col gap-4 md:gap-8 items-start justify-start relative group'>
          <h2 className={`text-4xl lg:text-7xl font-bold transition-opacity duration-300 ${allertaStencil.className}`}>
            under <br></br>construction
          </h2>
          <div className='absolute inset-0 pr-2 transition-all duration-300 pt-[160px] group-hover:pt-0'>
            <BrutalistTabs tabs={tabs} activeTab={activeTab} onTabChange={handleTabChange} />
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className='lg:hidden flex-1 flex flex-col gap-4 max-w-screen-2xl mx-auto px-0 w-full overflow-visible pb-4  '>
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
                <h2 className={`text-4xl font-bold ${allertaStencil.className}`}>
                  under <br></br>construction
                </h2>
                <div className='flex-1 flex items-center justify-center'>
                  {selectedProcessImage !== null ? (
                    <div className='w-full h-full relative border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] aspect-square'>
                      <button
                        onClick={() => setSelectedProcessImage(null)}
                        className='absolute top-4 right-4 z-10 cursor-pointer w-10 h-10 bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all font-bold'
                      >
                        ×
                      </button>
                      <Image
                        src={`/under-construction/korpus-process-${selectedProcessImage}.jpg`}
                        alt={`Process ${selectedProcessImage + 1}`}
                        fill
                        className='object-cover'
                      />
                    </div>
                  ) : (
                    <Viewer360
                      imageFolder='under-construction/korpus-360'
                      totalFrames={27}
                      imageFormat='png'
                      imagePrefix='normalized-'
                      imagePadding={2}
                    />
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key='info'
                initial={{ x: 'calc(100% + 1rem)' }}
                animate={{ x: 0 }}
                exit={{ x: 'calc(100% + 1rem)' }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className='absolute inset-0'
              >
                <BrutalistTabs tabs={tabs} activeTab={activeTab} onTabChange={handleTabChange} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Button - Always visible */}
        <button
          onClick={() => setShowMobileInfo(!showMobileInfo)}
          className='w-full py-4 px-6 bg-red-600 text-white font-mono font-bold uppercase border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:bg-red-700 transition-colors'
        >
          {showMobileInfo ? 'Back' : 'More Infos'}
        </button>
      </div>
    </section>
  );
}
