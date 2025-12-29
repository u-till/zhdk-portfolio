'use client';

import { RefObject, useEffect } from 'react';

export function useCarouselScroll(
  scrollRef: RefObject<HTMLDivElement | null>,
  setActiveIndex: (index: number) => void
) {
  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const scrollLeft = scrollRef.current.scrollLeft;
        const width = scrollRef.current.offsetWidth;
        const index = Math.round(scrollLeft / width);
        setActiveIndex(index);
      }
    };

    const scrollEl = scrollRef.current;
    scrollEl?.addEventListener('scroll', handleScroll);
    return () => scrollEl?.removeEventListener('scroll', handleScroll);
  }, [scrollRef, setActiveIndex]);
}
