'use client';

import { useNavigation } from '@/contexts/navigation-context';
import { AnimatePresence, motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

const Lamp3DPreview = dynamic(() => import('@/components/home/lamp-preview').then((mod) => mod.Lamp3DPreview), {
  ssr: false,
  loading: () => <div className='w-64 h-64 md:w-80 md:h-80 lg:w-[416px] lg:h-[416px]' />,
});

const SIZES = {
  sm: 'w-36 h-36 md:w-48 md:h-48 lg:w-60 lg:h-60',
  md: 'w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80',
  lg: 'w-56 h-56 md:w-72 md:h-72 lg:w-96 lg:h-96',
} as const;

type PreviewConfig =
  | { type: 'image'; src: string; size?: keyof typeof SIZES }
  | { type: 'toggle'; src: string; altSrc: string; interval: number; size?: keyof typeof SIZES }
  | { type: 'blink'; src: string; altSrc: string; interval: number; blinkDuration: number; size?: keyof typeof SIZES }
  | { type: '360'; src: string }
  | { type: '3d'; src: string };

const PROJECTS: Record<string, { name: string; mobileName?: string; preview: PreviewConfig }> = {
  'under-construction': {
    name: 'under construction',
    mobileName: 'construction',
    preview: { type: '360', src: '/under-construction/korpus-360' },
  },
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
  dayjob: { name: 'utill.ch', preview: { type: 'image', src: '/dayjob/dayjob-thumb.png' } },
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

const TAGS: Array<{ name: string; projects: string[] }> = [
  { name: 'object', projects: ['under-construction', 'retrofitted', 'amped-up'] },
  { name: 'visual', projects: ['saudade', 'traces'] },
  { name: 'interactive', projects: ['traces'] },
  { name: 'music', projects: ['lost-in-space'] },
  { name: 'code', projects: ['dayjob', 'toy-lexicon'] },
];

const floatingAnimation = {
  animate: { y: [0, -6, 0] },
  transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' as const },
};

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

function StaticImagePreview({ src, alt, sizeClass }: { src: string; alt: string; sizeClass: string }) {
  return (
    <motion.div className={`relative ${sizeClass}`} {...floatingAnimation}>
      <Image src={src} alt={alt} fill className='object-contain' />
    </motion.div>
  );
}

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
  const [openTag, setOpenTag] = useState<string | null>(null);
  const cycleRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useLayoutEffect(() => {
    window.dispatchEvent(new Event('resize'));
  }, []);

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

  useEffect(() => {
    return () => {
      if (cycleRef.current) clearInterval(cycleRef.current);
    };
  }, []);

  const renderPreview = useCallback((projectKey: string) => {
    const project = PROJECTS[projectKey];
    if (!project) return null;
    const preview = project.preview;
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

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  }, []);

  const startCycling = useCallback(
    (projects: string[]) => {
      if (cycleRef.current) clearInterval(cycleRef.current);
      let index = 0;
      setHoveredProject(projects[0]);
      cycleRef.current = setInterval(() => {
        index = (index + 1) % projects.length;
        setHoveredProject(projects[index]);
      }, 3000);
    },
    [setHoveredProject],
  );

  const stopCycling = useCallback(() => {
    if (cycleRef.current) {
      clearInterval(cycleRef.current);
      cycleRef.current = null;
    }
  }, []);

  return (
    <section onMouseMove={handleMouseMove} className='pt-32 px-4 pb-16 md:pb-16 md:px-8'>
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

      {/* Tag List */}
      <div className='relative z-10 flex flex-col w-full'>
        {TAGS.map((tag) => {
          const isOpen = openTag === tag.name;
          return (
            <div key={tag.name}>
              {/* Tag row */}
              <div
                onClick={() => setOpenTag(isOpen ? null : tag.name)}
                onMouseEnter={() => startCycling(tag.projects)}
                onMouseLeave={() => {
                  stopCycling();
                  setHoveredProject(null);
                }}
                className='font-extrabold tracking-tight cursor-pointer flex items-center gap-2 md:gap-4 lowercase w-full border-b-2 border-black pb-0 md:pb-2 text-[clamp(1.75rem,8vh,3rem)] md:text-[clamp(1.75rem,8vh,8rem)] leading-none py-1 md:py-2'
              >
                <span className='inline-block rounded-full bg-current flex-shrink-0 w-[1cap] h-[1cap]' />
                {tag.name}
              </div>

              {/* Project drawer */}
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className='overflow-hidden'
                  >
                    <div className='flex flex-col pl-6 md:pl-10'>
                      {tag.projects.map((projectKey) => (
                        <div
                          key={projectKey}
                          onClick={() => navigateTo(`/${projectKey}`)}
                          onMouseEnter={() => {
                            stopCycling();
                            setHoveredProject(projectKey);
                          }}
                          onMouseLeave={() => setHoveredProject(null)}
                          className='group/project relative font-extrabold tracking-tight cursor-pointer flex items-center lowercase w-full border-b border-black/30 text-[clamp(0.875rem,4vh,1.5rem)] md:text-[clamp(0.875rem,4vh,4rem)] leading-none py-1 md:py-2'
                        >
                          <span className='absolute -left-[1em] translate-x-[-0.5em] opacity-0 group-hover/project:translate-x-0 group-hover/project:opacity-100 transition-all duration-300 ease-out'>
                            ➔
                          </span>
                          {PROJECTS[projectKey].mobileName ? (
                            <>
                              <span className='md:hidden'>{PROJECTS[projectKey].mobileName}</span>
                              <span className='hidden md:inline'>{PROJECTS[projectKey].name}</span>
                            </>
                          ) : (
                            PROJECTS[projectKey].name
                          )}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
