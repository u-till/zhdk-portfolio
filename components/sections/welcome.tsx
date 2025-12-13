'use client';

import { HandIcon } from '@/components/hand-icon';
import { useActiveSectionContext } from '@/contexts/active-section-context';
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
    '/amped-up/speaker-2.jpg',
    '/amped-up/speaker-3.jpg',
    '/amped-up/speaker-4.jpg',
    '/amped-up/speaker-5.jpg',
    '/amped-up/speaker-6.jpg',
    '/amped-up/speaker-7.jpg',
  ],
  'toy-lexicon': ['/toy-lexicon/cover.jpg', '/toy-lexicon/front-mockup.png'],
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
  const [isMobile, setIsMobile] = useState(false);
  const [autoPlayProject, setAutoPlayProject] = useState<string | null>(null);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [previewProject, setPreviewProject] = useState<string | null>(null);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-cycle through projects on mobile
  useEffect(() => {
    if (!isMobile) {
      return;
    }

    const projectKeys = Object.keys(PROJECT_IMAGES).filter((key) => PROJECT_IMAGES[key].length > 0);
    let currentIndex = 0;

    const cycleProjects = () => {
      setAutoPlayProject(projectKeys[currentIndex]);
      currentIndex = (currentIndex + 1) % projectKeys.length;
    };

    cycleProjects(); // Start immediately
    const interval = setInterval(cycleProjects, 6000); // Change project every 6 seconds

    return () => {
      clearInterval(interval);
      setAutoPlayProject(null);
    };
  }, [isMobile]);

  // Preview mode - cycle through projects and show project names
  useEffect(() => {
    if (!isPreviewMode) {
      return;
    }

    const projectKeys = Object.keys(PROJECT_IMAGES).filter((key) => PROJECT_IMAGES[key].length > 0);
    let currentIndex = 0;

    const cyclePreview = () => {
      const projectKey = projectKeys[currentIndex];
      setPreviewProject(projectKey);
      // Reset image index to show first image of each project
      setCurrentImageIndex((prev) => ({ ...prev, [projectKey]: 0 }));
      currentIndex = (currentIndex + 1) % projectKeys.length;
    };

    cyclePreview(); // Start immediately
    const interval = setInterval(cyclePreview, 3000); // Change project every 3 seconds

    return () => {
      clearInterval(interval);
      setPreviewProject(null);
    };
  }, [isPreviewMode]);

  // Cycle through images for current project (skip in preview mode)
  useEffect(() => {
    // Don't cycle images in preview mode - only show first image
    if (isPreviewMode) {
      return;
    }

    const activeProject = hoveredProject || autoPlayProject;
    if (activeProject && PROJECT_IMAGES[activeProject]?.length > 0) {
      // Set up interval to cycle through images
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => {
          const images = PROJECT_IMAGES[activeProject];
          const currentIndex = prev[activeProject] ?? 0;
          return {
            ...prev,
            [activeProject]: (currentIndex + 1) % images.length,
          };
        });
      }, 2500); // Change image every 2.5 seconds

      return () => clearInterval(interval);
    }
  }, [hoveredProject, autoPlayProject, isPreviewMode]);

  const activeProject = hoveredProject || previewProject || autoPlayProject;
  const currentImages = activeProject ? PROJECT_IMAGES[activeProject] : [];
  const hasImages = currentImages && currentImages.length > 0;
  const currentIndex = activeProject ? currentImageIndex[activeProject] ?? 0 : 0;

  // Format project name for display
  const getProjectName = (key: string) => {
    return key
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <section className='h-screen flex items-center justify-center relative overflow-hidden'>
      {/* Background Image Slideshow with Invert Effect */}
      <AnimatePresence mode='wait'>
        {activeProject && hasImages && (
          <motion.div
            key={activeProject}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className='absolute inset-0 z-0'
          >
            <AnimatePresence initial={false}>
              <motion.div
                key={`${activeProject}-${currentIndex}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2 }}
                className='absolute inset-0'
              >
                <Image
                  src={currentImages[currentIndex]}
                  alt={`${activeProject} preview ${currentIndex + 1}`}
                  fill
                  className='object-cover'
                  priority={currentIndex === 0}
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content with inversion against background images */}
      <div className={`text-center relative z-10 w-full ${activeProject ? 'mix-blend-difference text-white' : ''}`}>
        <AnimatePresence mode='wait'>
          <motion.h1
            key={previewProject || 'welcome'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className='font-bold mb-4'
            style={{ fontSize: 'clamp(4rem, 8vw, 12rem)', lineHeight: 1 }}
          >
            {previewProject ? getProjectName(previewProject) : 'Welcome'}
          </motion.h1>
        </AnimatePresence>
        {!previewProject && <p className='text-3xl md:text-4xl font-medium mb-12'>to my portfolio</p>}

        {/* Navigation Instructions - Always visible */}
        <div className='mt-16 flex flex-col items-center justify-center'>
          {/* Navigation Icons */}
          <div className='flex items-center justify-center gap-10 mb-6 max-w-2xl'>
            {/* Swipe Icon - Hand */}
            <div className='flex flex-1 flex-col items-center gap-3'>
              <HandIcon className='w-20 h-20 md:w-10 md:h-10' />
              <span className='text-2xl md:text-base font-medium tracking-wider text-center'>swipe</span>
            </div>

            {/* Scroll Icon - Mouse */}
            <div className='hidden md:flex flex-1 flex-col items-center gap-3'>
              <svg
                width='40'
                height='40'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='1'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <rect x='8' y='3' width='8' height='14' rx='4' />
                <path d='M12 7v3' />
              </svg>
              <span className='text-sm md:text-base font-medium uppercase tracking-wider text-center'>scroll</span>
            </div>

            {/* Arrow Keys Icon */}
            <div className='hidden md:flex flex-1 flex-col items-center gap-3'>
              <svg
                width='40'
                height='40'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='1'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                {/* Up arrow key */}
                <rect x='9.5' y='3' width='5' height='5' rx='1' />
                {/* Left arrow key */}
                <rect x='3' y='10.5' width='5' height='5' rx='1' />
                {/* Down arrow key */}
                <rect x='9.5' y='10.5' width='5' height='5' rx='1' />
                {/* Right arrow key */}
                <rect x='16' y='10.5' width='5' height='5' rx='1' />
              </svg>
              <span className='text-sm md:text-base font-medium uppercase tracking-wider text-center'>keys</span>
            </div>
          </div>

          {/* Preview Button */}
          <button
            onClick={() => setIsPreviewMode(!isPreviewMode)}
            className={`mt-8 px-6 py-3 rounded-full border-2 transition-all font-medium flex items-center gap-2 ${
              isPreviewMode
                ? 'bg-foreground text-background border-foreground'
                : 'bg-transparent border-foreground/40 hover:border-foreground'
            }`}
          >
            {isPreviewMode ? (
              <>
                <svg width='16' height='16' viewBox='0 0 24 24' fill='currentColor'>
                  <rect x='6' y='5' width='4' height='14' rx='1' />
                  <rect x='14' y='5' width='4' height='14' rx='1' />
                </svg>
                Stop Preview
              </>
            ) : (
              <>
                <svg width='16' height='16' viewBox='0 0 24 24' fill='currentColor'>
                  <path d='M8 5v14l11-7z' />
                </svg>
                Preview
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
