'use client';

import { usePathname, useRouter } from 'next/navigation';
import { createContext, ReactNode, useCallback, useContext, useRef, useState } from 'react';

export const TRANSITION_DURATION = 800;

function getPageFromPath(path: string): string {
  if (path === '/') return 'welcome';
  return path.slice(1);
}

interface NavigationContextType {
  currentPage: string;
  hoveredProject: string | null;
  setHoveredProject: (project: string | null) => void;
  isNavigating: boolean;
  navigateTo: (path: string) => void;
}

const NavigationContext = createContext<NavigationContextType>({
  currentPage: '',
  hoveredProject: null,
  setHoveredProject: () => {},
  isNavigating: false,
  navigateTo: () => {},
});

export function NavigationProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const isNavigatingRef = useRef(false);

  const currentPage = getPageFromPath(pathname);

  const navigateTo = useCallback(
    (path: string) => {
      if (isNavigatingRef.current || path === pathname) return;

      isNavigatingRef.current = true;
      setIsNavigating(true);

      const scrollY = window.scrollY;
      if (scrollY > 0) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        const scrollDuration = Math.min(scrollY * 0.5, 400);
        setTimeout(() => {
          router.push(path);
          setTimeout(() => {
            isNavigatingRef.current = false;
            setIsNavigating(false);
          }, TRANSITION_DURATION + 100);
        }, scrollDuration);
      } else {
        setTimeout(() => {
          router.push(path);
          setTimeout(() => {
            isNavigatingRef.current = false;
            setIsNavigating(false);
          }, TRANSITION_DURATION + 100);
        }, 10);
      }
    },
    [pathname, router],
  );

  return (
    <NavigationContext.Provider
      value={{ currentPage, hoveredProject, setHoveredProject, isNavigating, navigateTo }}
    >
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  return useContext(NavigationContext);
}
