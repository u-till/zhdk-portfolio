'use client';

import { useActiveSectionContext } from '@/contexts/active-section-context';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

const PROJECT_VIDEOS: Record<string, string> = {
  'under-construction': '/under-construction/preview-under-construction.mp4',
  retrofitted: '/retrofitted/preview-retrofitted.mp4',
  'amped-up': '/amped-up/preview-amped-up.mp4',
  'toy-lexicon': '/toy-lexicon/preview-toy-lexicon.mp4',
  'lost-in-space': '/lost-in-space/preview-lost-in-space.mp4',
  saudade: '/saudade/preview-saudade.mp4',
  dayjob: '/dayjob/preview-dayjob.mp4',
};

export function Welcome() {
  const { hoveredProject } = useActiveSectionContext();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && hoveredProject) {
      // Reset and play the video
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {
        // Ignore autoplay errors
      });
    }
  }, [hoveredProject]);

  return (
    <section className='h-screen flex items-center justify-center relative overflow-hidden'>
      {/* Background Video */}
      <AnimatePresence mode='wait'>
        {hoveredProject && PROJECT_VIDEOS[hoveredProject] && (
          <motion.div
            key={hoveredProject}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className='absolute inset-0 z-0'
          >
            <video
              key={hoveredProject}
              ref={videoRef}
              src={PROJECT_VIDEOS[hoveredProject]}
              className='w-full h-full object-cover'
              autoPlay
              loop
              muted
              playsInline
            />
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
