'use client';

import { ReactNode, useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useActiveSectionContext } from '@/contexts/active-section-context';
import { useRouter } from 'next/navigation';

const SECTION_IDS = ['welcome', 'under-construction', 'retrofitted', 'amped-up', 'toy-lexicon', 'lost-in-space', 'saudade', 'dayjob', 'about'];

interface Props {
  children: ReactNode[];
}

export function SectionNavigator({ children }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for down/next, -1 for up/previous
  const isScrolling = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { setActiveSection } = useActiveSectionContext();
  const router = useRouter();

  const scrollToSection = useCallback((index: number, scrollDirection?: number) => {
    if (index < 0 || index >= children.length || isScrolling.current) return;

    isScrolling.current = true;

    // Use the explicit scroll direction if provided, otherwise infer from index
    const newDirection = scrollDirection !== undefined
      ? scrollDirection
      : (index > currentIndex ? 1 : -1);

    // Update direction BEFORE updating index to ensure exit animation uses correct direction
    setDirection(newDirection);

    // Use setTimeout to ensure direction state updates before index changes
    setTimeout(() => {
      setCurrentIndex(index);
      setActiveSection(SECTION_IDS[index]);
    }, 0);

    // Update URL hash using Next.js router (no reload)
    const hash = index === 0 ? '' : SECTION_IDS[index];
    router.push(hash ? `/#${hash}` : '/', { scroll: false });

    setTimeout(() => {
      isScrolling.current = false;
    }, 1000);
  }, [children.length, router, setActiveSection, currentIndex]);

  // Expose scrollToSection to window for navigation
  useEffect(() => {
    window.__scrollToSection = scrollToSection;
    return () => {
      delete window.__scrollToSection;
    };
  }, [scrollToSection]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isScrolling.current) return;

      if (e.key === 'ArrowUp') {
        e.preventDefault();
        scrollToSection(currentIndex - 1, -1); // Scrolling up
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        scrollToSection(currentIndex + 1, 1); // Scrolling down
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, scrollToSection]);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      const index = hash ? SECTION_IDS.indexOf(hash) : 0;

      if (index !== -1 && index !== currentIndex && !isScrolling.current) {
        scrollToSection(index);
      }
    };

    // Handle initial hash on load
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [currentIndex, scrollToSection]);

  return (
    <motion.div
      ref={containerRef}
      className='relative w-full h-screen overflow-hidden'
    >
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          initial={{ y: direction > 0 ? '100%' : '-100%' }}
          animate={{ y: 0 }}
          exit={{ y: direction > 0 ? '-100%' : '100%' }}
          transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
          className='absolute inset-0'
        >
          {children[currentIndex]}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
