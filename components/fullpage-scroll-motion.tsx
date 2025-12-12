'use client';

import { ReactNode, useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { PanInfo } from 'framer-motion';
import { useActiveSectionContext } from '@/contexts/active-section-context';
import { useRouter } from 'next/navigation';
import { useIsMobile } from '@/hooks/use-is-mobile';

const SECTION_IDS = ['welcome', 'under-construction', 'retrofitted', 'amped-up', 'toy-lexicon', 'lost-in-space', 'saudade', 'dayjob', 'about'];

interface Props {
  children: ReactNode[];
}

export function FullPageScroll({ children }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for down/next, -1 for up/previous
  const isMobile = useIsMobile();
  const isScrolling = useRef(false);
  const scrollAccumulator = useRef(0);
  const lastScrollTime = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { setActiveSection } = useActiveSectionContext();
  const router = useRouter();

  const scrollToSection = useCallback((index: number, scrollDirection?: number) => {
    if (index < 0 || index >= children.length || isScrolling.current) return;

    isScrolling.current = true;
    scrollAccumulator.current = 0;

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
    const SCROLL_THRESHOLD = 100;
    const DECAY_TIME = 150;
    let horizontalScrollTimeout: NodeJS.Timeout | null = null;
    let isActivelyScrollingHorizontally = false;

    const handleWheel = (e: WheelEvent) => {
      // Check if we're in a horizontally scrollable element
      let element = e.target as HTMLElement;
      let scrollContainer: HTMLElement | null = null;

      while (element && element !== document.body) {
        const style = window.getComputedStyle(element);
        const overflowX = style.overflowX;
        const hasHorizontalScroll = element.scrollWidth > element.clientWidth;

        if (hasHorizontalScroll && (overflowX === 'auto' || overflowX === 'scroll')) {
          scrollContainer = element;
          break;
        }
        element = element.parentElement as HTMLElement;
      }

      // If we found a horizontal scroll container
      if (scrollContainer) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainer;
        const atStart = scrollLeft <= 2;
        const atEnd = scrollLeft + clientWidth >= scrollWidth - 2;
        const isVerticalScroll = Math.abs(e.deltaY) > Math.abs(e.deltaX);

        // If user is actively scrolling horizontally, let them continue
        if (!isVerticalScroll) {
          isActivelyScrollingHorizontally = true;
          if (horizontalScrollTimeout) clearTimeout(horizontalScrollTimeout);
          horizontalScrollTimeout = setTimeout(() => {
            isActivelyScrollingHorizontally = false;
          }, 200);
          return; // Allow horizontal scroll
        }

        // Vertical scroll detected - check if we can leave the section
        if (isVerticalScroll && !isActivelyScrollingHorizontally) {
          // At start and scrolling up - go to previous section
          if (atStart && e.deltaY < 0) {
            e.preventDefault();
            if (!isScrolling.current) {
              scrollToSection(currentIndex - 1, -1); // Scrolling up
            }
            return;
          }

          // At end and scrolling down - go to next section
          if (atEnd && e.deltaY > 0) {
            e.preventDefault();
            if (!isScrolling.current) {
              scrollToSection(currentIndex + 1, 1); // Scrolling down
            }
            return;
          }

          // In the middle - snap to nearest edge based on scroll direction
          e.preventDefault();
          const snapToStart = scrollLeft < (scrollWidth - clientWidth) / 2;
          scrollContainer.scrollTo({
            left: snapToStart ? 0 : scrollWidth - clientWidth,
            behavior: 'smooth'
          });
          return;
        }

        // Allow horizontal scrolling
        return;
      }

      // Not in horizontal scroll container - handle vertical section switching
      e.preventDefault();

      if (isScrolling.current) return;

      // Decay accumulator over time
      const now = Date.now();
      const timeDelta = now - lastScrollTime.current;
      if (timeDelta > DECAY_TIME) {
        scrollAccumulator.current = 0;
      }
      lastScrollTime.current = now;

      // Accumulate scroll delta
      scrollAccumulator.current += e.deltaY;

      // Check if we've crossed threshold
      if (Math.abs(scrollAccumulator.current) >= SCROLL_THRESHOLD) {
        const direction = scrollAccumulator.current > 0 ? 1 : -1;
        scrollToSection(currentIndex + direction, direction);
        scrollAccumulator.current = 0;
      }
    };

    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      const index = hash ? SECTION_IDS.indexOf(hash) : 0;

      if (index !== -1 && index !== currentIndex && !isScrolling.current) {
        scrollToSection(index);
      }
    };

    // Handle initial hash on load
    handleHashChange();

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [currentIndex, scrollToSection]);

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const SWIPE_THRESHOLD = 50;
    const VELOCITY_THRESHOLD = 500;

    if (isScrolling.current) return;

    const { offset, velocity } = info;

    // Detect swipe based on offset or velocity
    if (Math.abs(offset.y) > SWIPE_THRESHOLD || Math.abs(velocity.y) > VELOCITY_THRESHOLD) {
      if (offset.y < 0 || velocity.y < 0) {
        // Swiped up - go to next section
        scrollToSection(currentIndex + 1, 1); // Scrolling down
      } else {
        // Swiped down - go to previous section
        scrollToSection(currentIndex - 1, -1); // Scrolling up
      }
    }
  };

  return (
    <motion.div
      ref={containerRef}
      className='relative w-full h-screen overflow-hidden'
      drag={isMobile ? "y" : false}
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={0.2}
      onDragEnd={isMobile ? handleDragEnd : undefined}
      dragMomentum={false}
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
