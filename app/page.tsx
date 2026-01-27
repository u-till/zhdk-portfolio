'use client';

import { useActiveSectionContext } from '@/contexts/active-section-context';
import { useNavigation } from '@/contexts/navigation-context';
import { AnimatePresence, motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';

// Lazy load the 3D preview to code-split three.js
const Lamp3DPreview = dynamic(() => import('@/components/home/lamp-preview').then((mod) => mod.Lamp3DPreview), {
  ssr: false,
  loading: () => <div className='w-64 h-64 md:w-80 md:h-80 lg:w-[416px] lg:h-[416px]' />,
});

// Size presets for previews
const SIZES = {
  sm: 'w-36 h-36 md:w-48 md:h-48 lg:w-60 lg:h-60',
  md: 'w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80',
  lg: 'w-56 h-56 md:w-72 md:h-72 lg:w-96 lg:h-96',
} as const;

// Preview configuration for each project
type PreviewConfig =
  | { type: 'image'; src: string; size?: keyof typeof SIZES }
  | { type: 'toggle'; src: string; altSrc: string; interval: number; size?: keyof typeof SIZES }
  | { type: 'blink'; src: string; altSrc: string; interval: number; blinkDuration: number; size?: keyof typeof SIZES }
  | { type: '360'; src: string }
  | { type: '3d'; src: string };

const PROJECT_PREVIEWS: Record<string, PreviewConfig> = {
  'under-construction': { type: '360', src: '/under-construction/korpus-360' },
  saudade: {
    type: 'blink',
    src: '/saudade/olympus.png',
    altSrc: '/saudade/olympus-blinking.png',
    interval: 2000,
    blinkDuration: 150,
    size: 'sm',
  },
  retrofitted: { type: '3d', src: '/retrofitted/lamp.glb' },
  'amped-up': {
    type: 'blink',
    src: '/amped-up/speaker-transparent.png',
    altSrc: '/amped-up/speaker-transparent-2.png',
    interval: 500,
    blinkDuration: 150,
  },
  'toy-lexicon': {
    type: 'toggle',
    src: '/toy-lexicon/mockup-1.png',
    altSrc: '/toy-lexicon/mockup-3.png',
    interval: 2000,
    size: 'lg',
  },
  'lost-in-space': {
    type: 'toggle',
    src: '/lost-in-space/cover.jpg',
    altSrc: '/lost-in-space/backside-1.jpg',
    interval: 2000,
    size: 'sm',
  },
  dayjob: { type: 'image', src: '/dayjob/dayjob-thumb.png' },
};

// Shared floating animation for all previews
const floatingAnimation = {
  animate: { y: [0, -6, 0] },
  transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' as const },
};

// Unified animated image preview - handles toggle and blink patterns
function AnimatedImagePreview({
  src,
  altSrc,
  alt,
  sizeClass,
  interval,
  blinkDuration,
}: {
  src: string;
  altSrc: string;
  alt: string;
  sizeClass: string;
  interval: number;
  blinkDuration?: number;
}) {
  const [showAlt, setShowAlt] = useState(false);

  useEffect(() => {
    // For blink pattern: show alt briefly then return
    // For toggle pattern: alternate between images
    const isBlink = blinkDuration !== undefined;

    if (isBlink) {
      // Initial blink on mount
      const initialTimeout = setTimeout(() => {
        setShowAlt(true);
        setTimeout(() => setShowAlt(false), blinkDuration);
      }, 100);

      const blinkInterval = setInterval(() => {
        setShowAlt(true);
        setTimeout(() => setShowAlt(false), blinkDuration);
      }, interval);

      return () => {
        clearTimeout(initialTimeout);
        clearInterval(blinkInterval);
      };
    } else {
      // Toggle pattern
      const toggleInterval = setInterval(() => {
        setShowAlt((prev) => !prev);
      }, interval);

      return () => clearInterval(toggleInterval);
    }
  }, [interval, blinkDuration]);

  return (
    <motion.div className={`relative ${sizeClass}`} {...floatingAnimation}>
      <Image src={showAlt ? altSrc : src} alt={alt} fill className='object-contain' priority />
    </motion.div>
  );
}

// Simple static image preview with floating animation
function StaticImagePreview({ src, alt, sizeClass }: { src: string; alt: string; sizeClass: string }) {
  return (
    <motion.div className={`relative ${sizeClass}`} {...floatingAnimation}>
      <Image src={src} alt={alt} fill className='object-contain' priority />
    </motion.div>
  );
}

// Auto-rotating 360 viewer
function Rotating360Preview() {
  const [currentFrame, setCurrentFrame] = useState(1);
  const totalFrames = 27;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFrame((prev) => (prev % totalFrames) + 1);
    }, 80);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='relative w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80'>
      <Image
        src={`/under-construction/korpus-360/normalized-${String(currentFrame).padStart(2, '0')}.png`}
        alt='360 preview'
        fill
        className='object-contain'
        priority
      />
    </div>
  );
}

export default function Home() {
  const { hoveredProject, setHoveredProject } = useActiveSectionContext();
  const [hoveredY, setHoveredY] = useState<number>(0);
  const sectionRef = useRef<HTMLElement>(null);
  const { navigateTo } = useNavigation();

  // Preload preview images
  useEffect(() => {
    Object.values(PROJECT_PREVIEWS).forEach((preview) => {
      if (preview.type === 'image') {
        const img = new window.Image();
        img.src = preview.src;
      } else if (preview.type === 'toggle' || preview.type === 'blink') {
        const img1 = new window.Image();
        const img2 = new window.Image();
        img1.src = preview.src;
        img2.src = preview.altSrc;
      }
    });
  }, []);

  const getProjectName = useCallback((key: string) => {
    return key
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }, []);

  const projectKeys = Object.keys(PROJECT_PREVIEWS);

  const renderPreview = useCallback((projectKey: string) => {
    const preview = PROJECT_PREVIEWS[projectKey];
    if (!preview) return null;

    const sizeClass = 'size' in preview ? SIZES[preview.size || 'md'] : SIZES.md;

    switch (preview.type) {
      case '360':
        return <Rotating360Preview />;
      case '3d':
        return <Lamp3DPreview />;
      case 'toggle':
        return (
          <AnimatedImagePreview
            src={preview.src}
            altSrc={preview.altSrc}
            alt={projectKey}
            sizeClass={sizeClass}
            interval={preview.interval}
          />
        );
      case 'blink':
        return (
          <AnimatedImagePreview
            src={preview.src}
            altSrc={preview.altSrc}
            alt={projectKey}
            sizeClass={sizeClass}
            interval={preview.interval}
            blinkDuration={preview.blinkDuration}
          />
        );
      case 'image':
        return <StaticImagePreview src={preview.src} alt={projectKey} sizeClass={sizeClass} />;
      default:
        return null;
    }
  }, []);

  const handleMouseEnter = useCallback(
    (projectKey: string, element: HTMLElement) => {
      setHoveredProject(projectKey);
      if (sectionRef.current) {
        const sectionRect = sectionRef.current.getBoundingClientRect();
        const elementRect = element.getBoundingClientRect();
        const relativeY = elementRect.top - sectionRect.top + elementRect.height / 2;
        setHoveredY(relativeY);
      }
    },
    [setHoveredProject],
  );

  return (
    <section
      ref={sectionRef}
      className='h-full flex items-start pt-32 justify-start relative overflow-hidden px-4 pb-4 md:pb-8 md:px-8'
    >
      {/* Floating Preview */}
      <AnimatePresence mode='wait'>
        {hoveredProject && (
          <motion.div
            key={hoveredProject}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className='absolute right-8 md:right-16 z-20 pointer-events-none -translate-y-1/2'
            style={{ top: hoveredY }}
          >
            {renderPreview(hoveredProject)}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Project List */}
      <div className='relative z-10 flex flex-col items-start w-full h-full justify-between group'>
        {projectKeys.map((projectKey) => {
          const isHovered = hoveredProject === projectKey;
          const shouldHide = hoveredProject && !isHovered;
          return (
            <motion.h1
              key={projectKey}
              onMouseEnter={(e) => handleMouseEnter(projectKey, e.currentTarget)}
              onMouseLeave={() => setHoveredProject(null)}
              onClick={() => navigateTo(`/${projectKey}`)}
              className={`font-bold cursor-pointer transition-opacity duration-200 flex items-center gap-2 md:gap-4 lowercase flex-1 w-full border-b-2 border-black pb-0 md:pb-2 ${
                shouldHide ? 'opacity-20' : ''
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
