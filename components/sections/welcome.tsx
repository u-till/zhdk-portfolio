'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const PROJECT_IMAGES: Record<string, string[]> = {
  'under-construction': [
    '/under-construction/korpus-process-4.jpg',
    '/under-construction/korpus-process-0.jpg',
    '/under-construction/korpus-process-1.jpg',
    '/under-construction/korpus-process-2.jpg',
    '/under-construction/korpus-process-3.jpg',
  ],
  retrofitted: [
    '/retrofitted/lamp-process.jpg',
    '/retrofitted/lamp-mood.jpg',
    '/retrofitted/lamp-mood-2.jpg',
    '/retrofitted/schematic.png',
  ],
  'amped-up': [
    '/amped-up/preview.jpg',
    '/amped-up/speaker-1.jpg',
    '/amped-up/speaker-3.jpg',
    '/amped-up/speaker-4.jpg',
    '/amped-up/speaker-5.jpg',
    '/amped-up/speaker-6.jpg',
    '/amped-up/speaker-7.jpg',
  ],
  'toy-lexicon': ['/toy-lexicon/cover.jpg', '/toy-lexicon/front-mockup.png'],
  'lost-in-space': ['/lost-in-space/cover.jpg'],
  saudade: [
    '/saudade/addis.jpg',
    '/saudade/hongkong-2.jpg',
    '/saudade/kunming.jpg',
    '/saudade/taldyqorghan-kz.png',
    '/saudade/stolze-1.jpg',
  ],
  dayjob: ['/dayjob/bg.jpg'],
};

export function Welcome() {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<Record<string, number>>({});

  // Cycle through images for hovered project
  useEffect(() => {
    if (hoveredProject && PROJECT_IMAGES[hoveredProject]?.length > 0) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => {
          const images = PROJECT_IMAGES[hoveredProject];
          const currentIndex = prev[hoveredProject] ?? 0;
          return {
            ...prev,
            [hoveredProject]: (currentIndex + 1) % images.length,
          };
        });
      }, 2500);

      return () => clearInterval(interval);
    }
  }, [hoveredProject]);

  const currentImages = hoveredProject ? PROJECT_IMAGES[hoveredProject] : [];
  const hasImages = currentImages && currentImages.length > 0;
  const currentIndex = hoveredProject ? currentImageIndex[hoveredProject] ?? 0 : 0;

  // Format project name for display
  const getProjectName = (key: string) => {
    return key
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const projectKeys = Object.keys(PROJECT_IMAGES);

  return (
    <section className='h-full flex items-start pt-32 justify-start relative overflow-hidden px-4 pb-4 md:pb-8 md:px-8'>
      {/* Background Image Slideshow */}
      <AnimatePresence mode='wait'>
        {hoveredProject && hasImages && (
          <motion.div
            key={hoveredProject}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className='absolute inset-0 z-0'
          >
            <AnimatePresence initial={false}>
              <motion.div
                key={`${hoveredProject}-${currentIndex}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2 }}
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

      {/* Project List */}
      <div
        className={`relative z-10 flex flex-col items-start w-full h-full justify-between group ${
          hoveredProject ? 'mix-blend-difference text-white' : ''
        }`}
      >
        {projectKeys.map((projectKey) => {
          const isHovered = hoveredProject === projectKey;
          const shouldHide = hoveredProject && !isHovered;
          return (
            <motion.h1
              key={projectKey}
              onMouseEnter={() => setHoveredProject(projectKey)}
              onMouseLeave={() => setHoveredProject(null)}
              onClick={() => {
                const sectionIndex = [
                  'welcome',
                  'under-construction',
                  'retrofitted',
                  'amped-up',
                  'toy-lexicon',
                  'lost-in-space',
                  'saudade',
                  'dayjob',
                  'about',
                ].indexOf(projectKey);
                if (sectionIndex !== -1) {
                  window.__scrollToSection?.(sectionIndex);
                }
              }}
              className={`font-bold cursor-pointer transition-opacity duration-300 flex items-center gap-2 md:gap-4 lowercase flex-1 w-full border-b border-black group-hover:border-white pb-0 md:pb-2 ${
                shouldHide ? 'opacity-0' : ''
              }`}
              style={{ fontSize: 'clamp(1.75rem, 5vw, 8rem)', lineHeight: 1 }}
            >
              <span className='text-[0.88em] pb-[2px]'>●</span>
              {getProjectName(projectKey)}
            </motion.h1>
          );
        })}
      </div>
    </section>
  );
}
