'use client';

import { getRouteIndex } from '@/lib/routes';
import { usePathname, useRouter } from 'next/navigation';
import { createContext, ReactNode, useCallback, useContext, useRef, useState } from 'react';

// Animation duration in ms - must match PageTransition duration
export const TRANSITION_DURATION = 800;

interface NavigationContextType {
  direction: number;
  isNavigating: boolean;
  navigateTo: (path: string) => void;
}

const NavigationContext = createContext<NavigationContextType>({
  direction: 1,
  isNavigating: false,
  navigateTo: () => {},
});

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [direction, setDirection] = useState(1);
  const [isNavigating, setIsNavigating] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const isNavigatingRef = useRef(false);

  const navigateTo = useCallback(
    (path: string) => {
      if (isNavigatingRef.current || path === pathname) return;

      isNavigatingRef.current = true;
      setIsNavigating(true);

      const currentIndex = getRouteIndex(pathname);
      const targetIndex = getRouteIndex(path);

      // Set direction: 1 for forward (down), -1 for backward (up)
      const newDirection = targetIndex > currentIndex ? 1 : -1;
      setDirection(newDirection);

      // Navigate after direction is set
      setTimeout(() => {
        router.push(path);
        setTimeout(() => {
          isNavigatingRef.current = false;
          setIsNavigating(false);
        }, TRANSITION_DURATION + 100);
      }, 10);
    },
    [pathname, router],
  );

  return (
    <NavigationContext.Provider value={{ direction, isNavigating, navigateTo }}>{children}</NavigationContext.Provider>
  );
}

export function useNavigation() {
  return useContext(NavigationContext);
}
