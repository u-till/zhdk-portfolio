'use client';

import { BrutalistTabs } from '@/components/under-construction/brutalist-tabs';
import { Viewer360 } from '@/components/under-construction/viewer-360';
import { allertaStencil } from '@/lib/fonts';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useCallback, useMemo, useState } from 'react';

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

const getTabsContent = (onProcessImageClick?: (imageIndex: number) => void, selectedProcessImage?: number | null) => [
  {
    id: 'infos',
    label: 'INFOS',
    content: (
      <div className='space-y-6 pb-16'>
        <div>
          <h3 className='text-lg font-bold uppercase border-b-2 border-black pb-2'>Brief</h3>
          <p className='mt-4 max-w-[600px]'>
            Mobile filing cabinet built with the visually distinct planks from a construction site. An ode to continuous
            change and reusing materials in a different context. When is something truly done? Everything is in
            perpetual development and keeps on changing its form.
          </p>
        </div>
        <div>
          <h3 className='text-lg font-bold uppercase border-b-2 border-black pb-2 mt-6'>Specifications</h3>
          <ul className='space-y-2 list-none mt-4 max-w-[600px]'>
            <li className='border-l-4 border-red-600 pl-4'>
              <span className='font-bold'>YEAR:</span> 2025
            </li>
            <li className='border-l-4 border-red-600 pl-4'>
              <span className='font-bold'>FOR:</span> Personal Project
            </li>
            <li className='border-l-4 border-red-600 pl-4'>
              <span className='font-bold'>TYPE:</span> Furniture
            </li>
            <li className='border-l-4 border-red-600 pl-4'>
              <span className='font-bold'>SIZE (W x D x H):</span> 343mm x 414mm x 640mm
            </li>
            <li className='border-l-4 border-red-600 pl-4'>
              <span className='font-bold'>MATERIAL:</span> Wood & Metal
            </li>
          </ul>
        </div>
        <div>
          <h3 className='text-lg font-bold uppercase border-b-2 border-black pb-2'>Idea</h3>
          <p className='mt-4 max-w-[600px]'>
            We needed mobile furniture for our keyboard in our flat to make the most out of the limited space in our
            livingroom. My flatmate and i brainstormed for a bit and came to the conclusion that custom built furniture
            would be the best so we could have it to our exact specifications.
          </p>
        </div>
        <div className='pb-4'>
          <h3 className='text-lg font-bold uppercase border-b-2 border-black pb-2 mt-6'>Learnings & Improvements</h3>
          <ul className='list-disc list-inside mt-4 max-w-[600px]'>
            <li>Use a circular saw instead of a jigsaw for cleaner cuts</li>
            <li>Use sandpaper to refine the edges</li>
            <li>Use live view on external screen to spot out of focus shots</li>
          </ul>
        </div>
        <div>
          <h3 className='text-lg font-bold uppercase border-b-2 border-black pb-2 mt-6'>Credits</h3>
          <div className='space-y-3 mt-4 max-w-[600px]'>
            <div>
              <span className='font-bold block uppercase text-xs tracking-wider'>Solo Project</span>
              <span>Till Solenthaler</span>
            </div>
            <div>
              <span className='font-bold block uppercase text-xs tracking-wider'>AI Declaration</span>
              <span>Nano Banana for the background image of the 360° viewer</span>
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
      <div className='h-full flex flex-col mb-16'>
        <h3 className='text-lg font-bold uppercase border-b-2 border-black pb-2 mb-4'>Development Process</h3>
        <div className='space-y-3 flex-1 flex flex-col justify-start'>
          {PROCESS_STEPS.map((step, index) => (
            <button
              key={index}
              onClick={() => onProcessImageClick?.(index)}
              className='w-full cursor-pointer bg-neutral-100 p-3 border-l-4 border-black hover:bg-neutral-200 transition-colors text-left flex flex-col md:flex-row md:items-center gap-3'
            >
              <div
                className={`relative w-full aspect-square md:w-32 flex-shrink-0 rounded overflow-hidden ${
                  selectedProcessImage === index ? 'ring-4 ring-black' : 'ring-1 ring-black/20'
                }`}
              >
                <Image src={step.image} alt={`${step.title} step`} fill className='object-cover' />
              </div>
              <div className='flex-1 max-w-[600px]'>
                <span className='font-bold block'>{step.title}</span>
                <span className='text-sm'>{step.text}</span>
              </div>
            </button>
          ))}
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
      <div className='hidden lg:flex flex-1 items-start justify-center w-full overflow-hidden pb-8'>
        <div className='flex gap-8 pt-8 h-full w-full '>
          {/* Column 1: 360 Viewer / Process Image */}
          <div className='relative h-full aspect-square'>
            {selectedProcessImage !== null ? (
              <div className='w-full h-full relative border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]'>
                <Image
                  src={`/under-construction/korpus-process-${selectedProcessImage}.jpg`}
                  alt={`Process ${selectedProcessImage + 1}`}
                  fill
                  className='object-cover'
                />
              </div>
            ) : (
              <div className='w-full h-full'>
                <Viewer360
                  imageFolder='under-construction/korpus-360'
                  totalFrames={27}
                  imageFormat='png'
                  imagePrefix='normalized-'
                  imagePadding={2}
                />
              </div>
            )}
          </div>

          {/* Column 2: Title & Tabs */}
          <div className='flex-1 flex flex-col gap-8 items-start justify-start relative group'>
            <h2
              className={`text-4xl lg:text-7xl w-full text-right font-bold transition-opacity duration-300 ${allertaStencil.className}`}
            >
              under <br></br>construction
            </h2>
            <div className='absolute inset-0 pr-2 transition-all duration-300 pt-[160px] group-hover:pt-0'>
              <BrutalistTabs tabs={tabs} activeTab={activeTab} onTabChange={handleTabChange} />
            </div>
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
                <h2 className={`text-4xl font-bold  ${allertaStencil.className}`}>
                  under<br></br>construction
                </h2>
                <div className='flex-1 flex items-center justify-center'>
                  {selectedProcessImage !== null ? (
                    <div className='w-full h-full relative border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] aspect-square'>
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
