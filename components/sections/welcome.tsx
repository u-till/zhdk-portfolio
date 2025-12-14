'use client';

import { HandIcon } from '@/components/hand-icon';
import { useActiveSectionContext } from '@/contexts/active-section-context';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    __restartWelcomePreview?: () => void;
  }
}

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
  'lost-in-space': ['/lost-in-space/cover.jpg'], // Uses 3D viewer, no preview images
  saudade: [
    '/saudade/addis.jpg',
    '/saudade/hongkong-2.jpg',
    '/saudade/kunming.jpg',
    '/saudade/taldyqorghan-kz.png',
    '/saudade/stolze-1.jpg',
  ],
  dayjob: ['/dayjob/bg.jpg'], // Empty project
};

export function Welcome() {
  const { hoveredProject, setHoveredProject } = useActiveSectionContext();
  const [currentImageIndex, setCurrentImageIndex] = useState<Record<string, number>>({});
  const [autoPlayProject, setAutoPlayProject] = useState<string | null>(null);
  const [restartTrigger, setRestartTrigger] = useState(0);
  const lastAutoProjectRef = useRef<string | null>(null);
  const hoveredProjectRef = useRef<string | null>(null);

  // Keep refs in sync
  useEffect(() => {
    hoveredProjectRef.current = hoveredProject;
  }, [hoveredProject]);

  // Expose restart function globally
  useEffect(() => {
    window.__restartWelcomePreview = () => setRestartTrigger((prev) => prev + 1);
    return () => {
      delete window.__restartWelcomePreview;
    };
  }, []);

  // Auto-cycle through projects - plays once then returns to welcome
  useEffect(() => {
    const projectKeys = Object.keys(PROJECT_IMAGES);
    const WELCOME_DURATION = 4000; // 4 seconds on welcome
    const PROJECT_DURATION = 2500; // 2.5 seconds per project (1 image)
    // If manually restarted (restartTrigger > 0), start immediately at first project
    // Otherwise start at -1 to show welcome first
    let currentIndex = restartTrigger > 0 ? 0 : -1;
    let timeoutId: NodeJS.Timeout;

    const cycleProjects = () => {
      if (currentIndex === -1) {
        // Show welcome
        setAutoPlayProject(null);
        // Only clear hoveredProject if it was set by auto-play
        if (hoveredProjectRef.current === lastAutoProjectRef.current) {
          setHoveredProject(null);
        }
        lastAutoProjectRef.current = null;
        timeoutId = setTimeout(() => {
          currentIndex = 0;
          cycleProjects();
        }, WELCOME_DURATION);
      } else if (currentIndex < projectKeys.length) {
        // Show current project
        const project = projectKeys[currentIndex];
        setAutoPlayProject(project);
        // Only update hoveredProject if user isn't actively hovering
        if (hoveredProjectRef.current === null || hoveredProjectRef.current === lastAutoProjectRef.current) {
          setHoveredProject(project);
        }
        lastAutoProjectRef.current = project;
        timeoutId = setTimeout(() => {
          currentIndex++;
          if (currentIndex >= projectKeys.length) {
            // Go back to welcome after all projects shown
            setAutoPlayProject(null);
            if (hoveredProjectRef.current === lastAutoProjectRef.current) {
              setHoveredProject(null);
            }
            lastAutoProjectRef.current = null;
            return;
          }
          cycleProjects();
        }, PROJECT_DURATION);
      }
    };

    cycleProjects(); // Start the cycle

    return () => {
      clearTimeout(timeoutId);
    };
  }, [setHoveredProject, restartTrigger]);

  // Cycle through images for current project (only when manually hovering, not during auto-play)
  useEffect(() => {
    // Only cycle images when user is hovering from navbar, not during auto-play
    if (hoveredProject && hoveredProject !== autoPlayProject && PROJECT_IMAGES[hoveredProject]?.length > 0) {
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
      }, 2500); // Change image every 2.5 seconds

      return () => clearInterval(interval);
    }
  }, [hoveredProject, autoPlayProject]);

  const activeProject = hoveredProject || autoPlayProject;
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
            key={activeProject || 'welcome'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            onClick={() => {
              if (!activeProject) {
                setRestartTrigger((prev) => prev + 1);
              }
            }}
            className={`font-bold mb-4 ${!activeProject ? 'cursor-pointer' : ''}`}
            style={{ fontSize: 'clamp(4rem, 8vw, 12rem)', lineHeight: 1 }}
          >
            {activeProject ? getProjectName(activeProject) : 'Welcome'}
          </motion.h1>
        </AnimatePresence>

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
              <span className='text-sm md:text-base font-medium tracking-wider text-center'>scroll</span>
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
              <span className='text-sm md:text-base font-medium tracking-wider text-center'>keys</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
