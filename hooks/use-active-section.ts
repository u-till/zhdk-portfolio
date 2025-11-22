'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export function useActiveSection() {
  const [activeSection, setActiveSection] = useState<string>('');
  const pathname = usePathname();

  useEffect(() => {
    const setupObserver = () => {
      const sections = document.querySelectorAll('section');

      if (sections.length === 0) {
        return null;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          const visibleSections = entries
            .filter((entry) => entry.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

          if (visibleSections.length > 0) {
            const mostVisibleSection = visibleSections[0].target.id || '';
            setActiveSection(mostVisibleSection);
          }
        },
        {
          threshold: [0, 0.25, 0.5, 0.75, 1],
          rootMargin: '-20% 0px -20% 0px',
        }
      );

      sections.forEach((section) => observer.observe(section));
      return observer;
    };

    const timeoutId = setTimeout(() => {
      const observer = setupObserver();
      return () => observer?.disconnect();
    }, 100);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [pathname]);

  return activeSection;
}
