'use client';

import { useNavigation } from '@/contexts/navigation-context';
import { archivo } from '@/lib/fonts';
import { DockItem } from '@/types/macos';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { TextViewer } from './text-viewer';

interface MobileGridProps {
  items: DockItem[];
}

// Text file icon SVG component
function TextFileIcon() {
  return (
    <svg width='64' height='64' viewBox='0 0 64 64' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M12 4C12 2.89543 12.8954 2 14 2H38L52 16V60C52 61.1046 51.1046 62 50 62H14C12.8954 62 12 61.1046 12 60V4Z'
        fill='white'
      />
      <path d='M38 2L52 16H40C38.8954 16 38 15.1046 38 14V2Z' fill='#E5E5E5' />
      <path d='M38 2L52 16H40C38.8954 16 38 15.1046 38 14V2Z' stroke='#CCCCCC' strokeWidth='0.5' />
      <path
        d='M12 4C12 2.89543 12.8954 2 14 2H38L52 16V60C52 61.1046 51.1046 62 50 62H14C12.8954 62 12 61.1046 12 60V4Z'
        stroke='#CCCCCC'
        strokeWidth='1.5'
      />
      <rect x='18' y='24' width='28' height='2' rx='1' fill='#999999' />
      <rect x='18' y='30' width='24' height='2' rx='1' fill='#999999' />
      <rect x='18' y='36' width='26' height='2' rx='1' fill='#999999' />
      <rect x='18' y='42' width='20' height='2' rx='1' fill='#999999' />
      <rect x='18' y='48' width='22' height='2' rx='1' fill='#999999' />
    </svg>
  );
}

const PROCESS_STEPS = [
  {
    title: '01. DISCOVERY',
    text: 'Initial meeting to understand client needs, goals, and target audience. Define project scope and timeline.',
    image: '/dayjob/icons/utill-logo.jpg',
  },
  {
    title: '02. DESIGN',
    text: 'Create wireframes and visual designs in Figma. Iterate based on client feedback until approved.',
    image: '/dayjob/icons/hannibal-icon.png',
  },
  {
    title: '03. DEVELOP',
    text: 'Build the website using modern technologies. Regular check-ins to ensure alignment with vision.',
    image: '/dayjob/icons/swing-icon.jpg',
  },
  {
    title: '04. LAUNCH',
    text: 'Deploy to production, configure hosting, and set up analytics. Train client on content management.',
    image: '/dayjob/icons/fabiotozzo-icon.png',
  },
  {
    title: '05. MAINTAIN',
    text: 'Ongoing support, updates, and improvements. Monitor performance and security.',
    image: '/dayjob/icons/anothernarrative-icon.png',
  },
];

export function MobileGrid({ items }: MobileGridProps) {
  const { navigateTo } = useNavigation();
  const [showInfo, setShowInfo] = useState(false);

  // Add info.txt as the FIRST item
  const infoItem = { id: 'info', label: 'infos.txt', icon: '', url: '' };
  const allItems = [infoItem, ...items];

  return (
    <section>
      {/* Video Section with Title */}
      <div className='relative h-screen overflow-hidden isolate'>
        <video autoPlay loop muted playsInline className='absolute inset-0 w-full h-full object-cover'>
          <source src='/dayjob/dayjob-trailer.mp4' type='video/mp4' />
        </video>

        {/* Title - centered on video */}
        <div className='absolute inset-0 flex items-center justify-center'>
          <h2 className='text-6xl font-bold text-white mix-blend-difference'>dayjob</h2>
        </div>
      </div>

      {/* Content wrapper with shared background */}
      <div className='relative bg-[#E4E3E3]'>
        {/* Grain overlay */}
        <div
          className='absolute inset-0 pointer-events-none opacity-[0.08]'
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Icons Grid Section */}
        <div className='relative px-4 py-8'>
          <div className='grid grid-cols-2 gap-4 max-w-md mx-auto'>
            {allItems.map((item) => {
              const isInfo = item.id === 'info';
              const content = (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className='bg-foreground/70 backdrop-blur-md border-0 rounded-2xl p-4 flex flex-col items-center gap-3 hover:bg-foreground/80 transition-colors cursor-pointer shadow-xl'
                  onClick={isInfo ? () => setShowInfo(true) : undefined}
                >
                  {isInfo ? (
                    <TextFileIcon />
                  ) : (
                    <Image src={item.icon} alt={item.label} width={64} height={64} className='rounded-lg' />
                  )}
                  <p className='text-white text-sm text-center font-medium drop-shadow'>{item.label}</p>
                </motion.div>
              );

              return isInfo ? (
                <div key={item.id}>{content}</div>
              ) : (
                <a key={item.id} href={item.url} target='_blank' rel='noopener noreferrer'>
                  {content}
                </a>
              );
            })}
          </div>
        </div>

        {/* Info Content */}
        <div className='relative px-4 pt-8 pb-16'>
          <div className='flex flex-col gap-8 text-foreground'>
            {/* Brief Section */}
            <div>
              <h3 className={`text-xl font-bold border-b-2 border-neutral-500 pb-2 mb-4 ${archivo.className}`}>
                brief
              </h3>
              <div className='text-sm'>
                <p className='leading-relaxed'>Freelance web projects. Portfolio sites to business websites.</p>
              </div>
            </div>

            {/* Idea Section */}
            <div>
              <h3 className={`text-xl font-bold border-b-2 border-neutral-500 pb-2 mb-4 ${archivo.className}`}>idea</h3>
              <div className='text-sm'>
                <p className='leading-relaxed'>Creative freedom. Flexible work. Aligned projects.</p>
              </div>
            </div>

            {/* Specifications Section */}
            <div>
              <h3 className={`text-xl font-bold border-b-2 border-neutral-500 pb-2 mb-4 ${archivo.className}`}>
                specifications
              </h3>
              <div className='grid grid-cols-2 gap-y-2 text-sm'>
                <div className='font-bold'>Year</div>
                <div>2021-Ongoing</div>

                <div className='font-bold'>For</div>
                <div>Various Clients</div>

                <div className='font-bold'>Type</div>
                <div>Web Design & Development</div>

                <div className='font-bold'>Tech</div>
                <div>React, Next.js, TypeScript, Tailwind, WordPress, PHP</div>

                <div className='font-bold'>Services</div>
                <div>Design, Development, Consulting, Hosting, Maintenance</div>
              </div>
            </div>

            {/* Learnings Section */}
            <div>
              <h3 className={`text-xl font-bold border-b-2 border-neutral-500 pb-2 mb-4 ${archivo.className}`}>
                learnings
              </h3>
              <div className='text-sm'>
                <ul className='list-disc list-outside pl-3 space-y-1'>
                  <li>Client communication</li>
                  <li>Clear boundaries and scope</li>
                  <li>Documentation</li>
                  <li>Continuous learning</li>
                </ul>
              </div>
            </div>

            {/* Credits Section */}
            <div>
              <h3 className={`text-xl font-bold border-b-2 border-neutral-500 pb-2 mb-4 ${archivo.className}`}>
                credits
              </h3>
              <div className='grid grid-cols-2 gap-y-2 text-sm'>
                <div className='font-bold'>Solo Projects</div>
                <div>Till Solenthaler</div>

                <div className='font-bold'>AI Declaration</div>
                <div>Claude Code for recent projects</div>
              </div>
            </div>
          </div>
        </div>

        {/* Process Section */}
        <div className='relative px-4 pt-12 pb-16'>
          <h3 className={`text-xl font-bold border-b-2 border-neutral-500 pb-2 mb-6 ${archivo.className}`}>process</h3>

          <div className='space-y-3'>
            {PROCESS_STEPS.map((step, index) => (
              <div key={index} className='w-full p-3 rounded-lg bg-white text-left flex flex-col gap-3'>
                <div className='relative w-full aspect-square overflow-hidden rounded-lg ring-1 ring-blue-400'>
                  <Image src={step.image} alt={`${step.title} thumbnail`} fill className='object-cover' />
                </div>
                <div className='flex-1'>
                  <span className='font-bold block'>{step.title}</span>
                  <span className='text-sm text-foreground/80'>{step.text}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Next Project */}
        <div className='relative px-4 pb-16'>
          <h1
            onClick={() => navigateTo('/about')}
            className='font-bold cursor-pointer flex items-center gap-2 lowercase w-full border-b-2 border-black pb-2 text-[clamp(0.625rem,3vh,1rem)] leading-none hover:opacity-60 transition-opacity'
          >
            <span className='text-[0.88em] pb-[2px]'>●</span>
            about
          </h1>
        </div>
      </div>

      {/* Info Modal */}
      <AnimatePresence>
        {showInfo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4'
            onClick={() => setShowInfo(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className='bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden'
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className='h-12 bg-neutral-100 flex items-center px-4 border-b border-neutral-200'>
                <button
                  onClick={() => setShowInfo(false)}
                  className='w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors'
                  aria-label='Close'
                />
                <div className='absolute left-1/2 -translate-x-1/2 text-sm font-medium text-neutral-700'>infos.txt</div>
              </div>

              {/* Content */}
              <div className='overflow-auto max-h-[calc(80vh-3rem)]'>
                <TextViewer />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
