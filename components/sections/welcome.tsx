'use client';

import { OrbitControls, useGLTF } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

// Size presets for previews
const SIZES = {
  sm: 'w-36 h-36 md:w-48 md:h-48 lg:w-60 lg:h-60',
  md: 'w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80',
  lg: 'w-56 h-56 md:w-72 md:h-72 lg:w-96 lg:h-96',
} as const;

// Preview image configuration for each project
const PROJECT_PREVIEWS: Record<string, { type: 'image' | 'camera' | '360' | '3d' | 'speaker' | 'book' | 'album'; src: string; size?: keyof typeof SIZES }> = {
  'under-construction': { type: '360', src: '/under-construction/korpus-360' },
  saudade: { type: 'camera', src: '/saudade/olympus.png', size: 'sm' },
  retrofitted: { type: '3d', src: '/retrofitted/lamp.glb' },
  'amped-up': { type: 'speaker', src: '/amped-up/speaker-transparent.png' },
  'toy-lexicon': { type: 'book', src: '/toy-lexicon/mockup-1.png', size: 'lg' },
  'lost-in-space': { type: 'album', src: '/lost-in-space/cover.jpg', size: 'sm' },
  dayjob: { type: 'image', src: '/dayjob/dayjob-thumb.png' },
};

// Auto-rotating 360 viewer for Under Construction (image sequence only, no container rotation)
function Rotating360Preview() {
  const [currentFrame, setCurrentFrame] = useState(1);
  const totalFrames = 27;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFrame((prev) => (prev % totalFrames) + 1);
    }, 80);
    return () => clearInterval(interval);
  }, []);

  const imagePath = `/under-construction/korpus-360/normalized-${String(currentFrame).padStart(2, '0')}.png`;

  return (
    <div className='relative w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80'>
      <Image src={imagePath} alt='360 preview' fill className='object-contain' priority />
    </div>
  );
}

// Camera preview for Saudade with blinking animation
function CameraPreview({ sizeClass }: { sizeClass: string }) {
  const [isBlinking, setIsBlinking] = useState(false);

  useEffect(() => {
    // Blink immediately on mount
    const initialBlink = setTimeout(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
    }, 100);

    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
    }, 2000);

    return () => {
      clearTimeout(initialBlink);
      clearInterval(blinkInterval);
    };
  }, []);

  return (
    <motion.div
      className={`relative ${sizeClass}`}
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
    >
      <Image
        src={isBlinking ? '/saudade/olympus-blinking.png' : '/saudade/olympus.png'}
        alt='Olympus camera'
        fill
        className='object-contain'
        priority
      />
    </motion.div>
  );
}

// Album preview for Lost in Space with switching animation
function AlbumPreview({ sizeClass }: { sizeClass: string }) {
  const [isAlt, setIsAlt] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAlt((prev) => !prev);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className={`relative ${sizeClass}`}
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
    >
      <Image
        src={isAlt ? '/lost-in-space/backside-1.jpg' : '/lost-in-space/cover.jpg'}
        alt='Lost in Space'
        fill
        className='object-contain'
        priority
      />
    </motion.div>
  );
}

// Book preview for Toy Lexicon with switching animation
function BookPreview({ sizeClass }: { sizeClass: string }) {
  const [isAlt, setIsAlt] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAlt((prev) => !prev);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className={`relative ${sizeClass}`}
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
    >
      <Image
        src={isAlt ? '/toy-lexicon/mockup-3.png' : '/toy-lexicon/mockup-1.png'}
        alt='Toy Lexicon'
        fill
        className='object-contain'
        priority
      />
    </motion.div>
  );
}

// Speaker preview for Amped Up with pulsing animation
function SpeakerPreview({ sizeClass }: { sizeClass: string }) {
  const [isPulsing, setIsPulsing] = useState(false);

  useEffect(() => {
    const initialPulse = setTimeout(() => {
      setIsPulsing(true);
      setTimeout(() => setIsPulsing(false), 150);
    }, 100);

    const interval = setInterval(() => {
      setIsPulsing(true);
      setTimeout(() => setIsPulsing(false), 150);
    }, 500);

    return () => {
      clearTimeout(initialPulse);
      clearInterval(interval);
    };
  }, []);

  return (
    <motion.div
      className={`relative ${sizeClass}`}
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
    >
      <Image
        src={isPulsing ? '/amped-up/speaker-transparent-2.png' : '/amped-up/speaker-transparent.png'}
        alt='Speaker'
        fill
        className='object-contain'
        priority
      />
    </motion.div>
  );
}

// Simple spinning lamp model for preview
function SpinningLampModel() {
  const { scene } = useGLTF('/retrofitted/lamp.glb');
  const groupRef = useRef<THREE.Group>(null);

  // Clone the scene to avoid shared state issues
  const clonedScene = useMemo(() => scene.clone(), [scene]);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <group ref={groupRef} position={[-0.4, -1.8, -0.3]}>
      <primitive object={clonedScene} scale={3.7} />
      <mesh position={[0.44, 2.55, -0.48]}>
        <sphereGeometry args={[0.08, 32, 32]} />
        <meshPhysicalMaterial color='#fff8e1' emissive='#ffa900' emissiveIntensity={6} transparent opacity={0.6} />
      </mesh>
    </group>
  );
}

// 3D spinning lamp preview for Retrofitted (30% bigger)
function Lamp3DPreview() {
  return (
    <div className='w-64 h-64 md:w-80 md:h-80 lg:w-[416px] lg:h-[416px]'>
      <Canvas camera={{ position: [2.74, 1.1, 0.9], fov: 50 }} gl={{ antialias: false }}>
        <Suspense fallback={null}>
          <ambientLight intensity={1.4} color='#faf7e9' />
          <directionalLight position={[0, 5, 7]} intensity={0.4} />
          <directionalLight position={[-3, 2, -2]} intensity={0.4} />
          <SpinningLampModel />
          <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
        </Suspense>
      </Canvas>
    </div>
  );
}

// Simple image preview for other projects
function ImagePreview({ src, alt, sizeClass }: { src: string; alt: string; sizeClass: string }) {
  return (
    <motion.div
      className={`relative ${sizeClass}`}
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
    >
      <Image src={src} alt={alt} fill className='object-contain' priority />
    </motion.div>
  );
}

export function Welcome() {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [hoveredY, setHoveredY] = useState<number>(0);
  const sectionRef = useRef<HTMLElement>(null);

  // Preload preview images
  useEffect(() => {
    Object.values(PROJECT_PREVIEWS).forEach((preview) => {
      if (preview.type === 'image' || preview.type === 'camera') {
        const img = new window.Image();
        img.src = preview.src;
      }
    });
  }, []);

  // Format project name for display
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

    const sizeClass = SIZES[preview.size || 'md'];

    switch (preview.type) {
      case '360':
        return <Rotating360Preview />;
      case 'camera':
        return <CameraPreview sizeClass={sizeClass} />;
      case 'speaker':
        return <SpeakerPreview sizeClass={sizeClass} />;
      case 'book':
        return <BookPreview sizeClass={sizeClass} />;
      case 'album':
        return <AlbumPreview sizeClass={sizeClass} />;
      case '3d':
        return <Lamp3DPreview />;
      case 'image':
        return <ImagePreview src={preview.src} alt={`${projectKey} preview`} sizeClass={sizeClass} />;
      default:
        return null;
    }
  }, []);

  const handleMouseEnter = useCallback((projectKey: string, element: HTMLElement) => {
    setHoveredProject(projectKey);
    if (sectionRef.current) {
      const sectionRect = sectionRef.current.getBoundingClientRect();
      const elementRect = element.getBoundingClientRect();
      // Get the center Y of the title relative to the section
      const relativeY = elementRect.top - sectionRect.top + elementRect.height / 2;
      setHoveredY(relativeY);
    }
  }, []);

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
              onMouseEnter={(e) => {
                handleMouseEnter(projectKey, e.currentTarget);
              }}
              onMouseLeave={() => {
                setHoveredProject(null);
              }}
              onClick={() => {
                const sectionIndex = [
                  'welcome',
                  'under-construction',
                  'saudade',
                  'retrofitted',
                  'amped-up',
                  'toy-lexicon',
                  'lost-in-space',
                  'dayjob',
                  'about',
                ].indexOf(projectKey);
                if (sectionIndex !== -1) {
                  window.__scrollToSection?.(sectionIndex);
                }
              }}
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
