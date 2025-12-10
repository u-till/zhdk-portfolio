'use client';

import { useActiveSectionContext } from '@/contexts/active-section-context';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const PROJECT_IMAGES: Record<string, string[]> = {
  'under-construction': [
    '/under-construction/korpus-process-0.jpg',
    '/under-construction/korpus-process-1.jpg',
    '/under-construction/korpus-process-2.jpg',
    '/under-construction/korpus-process-3.jpg',
    '/under-construction/korpus-process-4.jpg',
  ],
  retrofitted: [
    '/retrofitted/schematic.png',
    '/retrofitted/lamp-process.jpg',
    '/retrofitted/lamp-mood.jpg',
    '/retrofitted/lamp-mood-2.jpg',
  ],
  'amped-up': [
    '/amped-up/preview.jpg',
    '/amped-up/speaker-1.jpg',
    '/amped-up/speaker-2.jpg',
    '/amped-up/speaker-3.jpg',
    '/amped-up/speaker-4.jpg',
    '/amped-up/speaker-5.jpg',
    '/amped-up/speaker-6.jpg',
    '/amped-up/speaker-7.jpg',
  ],
  'toy-lexicon': ['/toy-lexicon/front-mockup-small.png', '/toy-lexicon/cover.jpg'],
  'lost-in-space': [], // Uses 3D viewer, no preview images
  saudade: [
    '/saudade/addis.jpg',
    '/saudade/hongkong-2.jpg',
    '/saudade/kunming.jpg',
    '/saudade/taldyqorghan-kz.png',
    '/saudade/stolze-1.jpg',
  ],
  dayjob: [], // Empty project
};

export function Welcome() {
  const { hoveredProject } = useActiveSectionContext();
  const [currentImageIndex, setCurrentImageIndex] = useState<Record<string, number>>({});

  useEffect(() => {
    if (hoveredProject && PROJECT_IMAGES[hoveredProject]?.length > 0) {
      // Set up interval to cycle through images
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => {
          const images = PROJECT_IMAGES[hoveredProject];
          const currentIndex = prev[hoveredProject] ?? 0;
          return {
            ...prev,
            [hoveredProject]: (currentIndex + 1) % images.length,
          };
        });
      }, 1000); // Change image every 800ms

      return () => clearInterval(interval);
    }
  }, [hoveredProject]);

  const currentImages = hoveredProject ? PROJECT_IMAGES[hoveredProject] : [];
  const hasImages = currentImages && currentImages.length > 0;
  const currentIndex = hoveredProject ? currentImageIndex[hoveredProject] ?? 0 : 0;

  return (
    <section className='h-screen flex items-center justify-center relative overflow-hidden'>
      {/* Background Image Slideshow */}
      <AnimatePresence mode='wait'>
        {hoveredProject && hasImages && (
          <motion.div
            key={hoveredProject}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className='absolute inset-0 z-0'
          >
            <AnimatePresence initial={false}>
              <motion.div
                key={`${hoveredProject}-${currentIndex}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className='absolute inset-0'
              >
                <Image
                  src={currentImages[currentIndex]}
                  alt={`${hoveredProject} preview ${currentIndex + 1}`}
                  fill
                  className='object-cover'
                  priority={currentIndex === 0}
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content */}
      <div className='text-center relative z-10'>
        <h1 className='text-6xl font-bold mb-4'>Welcome</h1>
        <p className='text-xl text-muted-foreground'>Portfolio</p>
      </div>
    </section>
  );
}
