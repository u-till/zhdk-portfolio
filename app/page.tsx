'use client';

import { useNavigation } from '@/contexts/navigation-context';
import { AnimatePresence, motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';

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

const PROJECTS: Record<string, { name: string; preview: PreviewConfig }> = {
  'under-construction': { name: 'under construction', preview: { type: '360', src: '/under-construction/korpus-360' } },
  saudade: {
    name: 'saudade',
    preview: {
      type: 'blink',
      src: '/saudade/olympus.png',
      altSrc: '/saudade/olympus-blinking.png',
      interval: 2000,
      blinkDuration: 150,
      size: 'sm',
    },
  },
  retrofitted: { name: 'Retrofitted', preview: { type: '3d', src: '/retrofitted/lamp.glb' } },
  'amped-up': {
    name: 'amped up',
    preview: {
      type: 'blink',
      src: '/amped-up/speaker-transparent.png',
      altSrc: '/amped-up/speaker-transparent-2.png',
      interval: 500,
      blinkDuration: 150,
    },
  },
  'toy-lexicon': {
    name: 'Toy Lexicon',
    preview: {
      type: 'toggle',
      src: '/toy-lexicon/mockup-1-small.png',
      altSrc: '/toy-lexicon/mockup-3-small.png',
      interval: 2000,
      size: 'lg',
    },
  },
  'lost-in-space': {
    name: 'Lost in Space',
    preview: {
      type: 'toggle',
      src: '/lost-in-space/cover.jpg',
      altSrc: '/lost-in-space/backside-1.jpg',
      interval: 2000,
      size: 'sm',
    },
  },
  dayjob: { name: 'dayjob', preview: { type: 'image', src: '/dayjob/dayjob-thumb.png' } },
  traces: {
    name: 'traces',
    preview: {
      type: 'toggle',
      src: '/traces/trace-collection/IMG_3769_with_overlay.jpg',
      altSrc: '/traces/trace-collection/IMG_3769.jpeg',
      interval: 2000,
      size: 'sm',
    },
  },
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
    const isBlink = blinkDuration !== undefined;
    let intervalId: ReturnType<typeof setInterval>;
    let blinkTimeoutId: ReturnType<typeof setTimeout>;

    if (isBlink) {
      intervalId = setInterval(() => {
        setShowAlt(true);
        blinkTimeoutId = setTimeout(() => setShowAlt(false), blinkDuration);
      }, interval);
    } else {
      intervalId = setInterval(() => setShowAlt((prev) => !prev), interval);
    }

    return () => {
      clearInterval(intervalId);
      clearTimeout(blinkTimeoutId);
    };
  }, [interval, blinkDuration]);

  return (
    <motion.div className={`relative ${sizeClass}`} {...floatingAnimation}>
      <Image src={showAlt ? altSrc : src} alt={alt} fill className='object-contain' />
    </motion.div>
  );
}

// Simple static image preview with floating animation
function StaticImagePreview({ src, alt, sizeClass }: { src: string; alt: string; sizeClass: string }) {
  return (
    <motion.div className={`relative ${sizeClass}`} {...floatingAnimation}>
      <Image src={src} alt={alt} fill className='object-contain' />
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
  const { hoveredProject, setHoveredProject, navigateTo } = useNavigation();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeProject, setActiveProject] = useState<string | null>(null);

  // Preload only the first 3 preview images to avoid network congestion
  useEffect(() => {
    const projectValues = Object.values(PROJECTS);
    const preloadCount = Math.min(3, projectValues.length);

    for (let i = 0; i < preloadCount; i++) {
      const { preview } = projectValues[i];
      if (preview.type === 'image') {
        const img = new window.Image();
        img.src = preview.src;
      } else if (preview.type === 'toggle' || preview.type === 'blink') {
        const img1 = new window.Image();
        const img2 = new window.Image();
        img1.src = preview.src;
        img2.src = preview.altSrc;
      }
    }
  }, []);

  const projectKeys = Object.keys(PROJECTS);

  const renderPreview = useCallback((projectKey: string, isMobile: boolean = false) => {
    const project = PROJECTS[projectKey];
    if (!project) return null;
    const preview = project.preview;

    // Use smaller sizes for mobile inline preview
    const mobileSize = 'w-24 h-24';
    const sizeClass = isMobile ? mobileSize : 'size' in preview ? SIZES[preview.size || 'md'] : SIZES.md;

    switch (preview.type) {
      case '360':
        return isMobile ? (
          <div className={`relative ${mobileSize}`}>
            <Image
              src='/under-construction/korpus-360/normalized-01.png'
              alt='360 preview'
              fill
              className='object-contain'
            />
          </div>
        ) : (
          <Rotating360Preview />
        );
      case '3d':
        return isMobile ? (
          <div className={`relative ${mobileSize}`}>
            <Image src='/retrofitted/lamp-1.png' alt='3D preview' fill className='object-contain' />
          </div>
        ) : (
          <Lamp3DPreview />
        );
      case 'toggle':
        return isMobile ? (
          <div className={`relative ${mobileSize}`}>
            <Image src={preview.src} alt={projectKey} fill className='object-contain' />
          </div>
        ) : (
          <AnimatedImagePreview
            src={preview.src}
            altSrc={preview.altSrc}
            alt={projectKey}
            sizeClass={sizeClass}
            interval={preview.interval}
          />
        );
      case 'blink':
        return isMobile ? (
          <div className={`relative ${mobileSize}`}>
            <Image src={preview.src} alt={projectKey} fill className='object-contain' />
          </div>
        ) : (
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
        return isMobile ? (
          <div className={`relative ${mobileSize}`}>
            <Image src={preview.src} alt={projectKey} fill className='object-contain' />
          </div>
        ) : (
          <StaticImagePreview src={preview.src} alt={projectKey} sizeClass={sizeClass} />
        );
      default:
        return null;
    }
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  }, []);

  const handleMobileTouch = useCallback(
    (projectKey: string) => {
      if (activeProject === projectKey) {
        navigateTo(`/${projectKey}`);
      } else {
        setActiveProject(projectKey);
      }
    },
    [activeProject, navigateTo],
  );

  return (
    <section onMouseMove={handleMouseMove} className='h-full overflow-hidden pt-32 px-4 pb-4 md:pb-8 md:px-8'>
      {/* Floating Preview - follows cursor (desktop only) */}
      <AnimatePresence mode='wait'>
        {hoveredProject && (
          <motion.div
            key={hoveredProject}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className='fixed z-20 pointer-events-none -translate-y-1/2 hidden md:block'
            style={{ left: mousePos.x + 40, top: mousePos.y }}
          >
            {renderPreview(hoveredProject)}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Project List */}
      <div className='relative z-10 flex flex-col items-start w-full h-full justify-between group'>
        {projectKeys.map((projectKey) => {
          const isHovered = hoveredProject === projectKey;
          const isActive = activeProject === projectKey;
          const shouldHide = (hoveredProject && !isHovered) || (activeProject && !isActive);
          return (
            <motion.h1
              key={projectKey}
              onMouseEnter={() => setHoveredProject(projectKey)}
              onMouseLeave={() => setHoveredProject(null)}
              onClick={(e) => {
                // Check if it's a touch device (no hover capability)
                if (window.matchMedia('(hover: none)').matches) {
                  e.preventDefault();
                  handleMobileTouch(projectKey);
                } else {
                  navigateTo(`/${projectKey}`);
                }
              }}
              className={`font-bold cursor-pointer transition-opacity duration-200 flex items-center gap-2 md:gap-4 lowercase flex-1 w-full border-b-2 border-black pb-0 md:pb-2 text-[clamp(1.75rem,8vh,3rem)] md:text-[clamp(1.75rem,8vh,8rem)] leading-none relative ${
                shouldHide ? 'opacity-20' : ''
              }`}
            >
              <span className='text-[0.88em] pb-[2px]'>●</span>
              {PROJECTS[projectKey].name}
              {/* Mobile inline preview - absolutely positioned at right end */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.15 }}
                    className='md:hidden absolute right-0 top-0'
                  >
                    {renderPreview(projectKey, true)}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.h1>
          );
        })}
      </div>
    </section>
  );
}
