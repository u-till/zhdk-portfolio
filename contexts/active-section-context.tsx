'use client';

import { getSectionFromPath } from '@/lib/routes';
import { usePathname } from 'next/navigation';
import { createContext, ReactNode, useContext, useState } from 'react';

const ActiveSectionContext = createContext<{
  activeSection: string;
  hoveredProject: string | null;
  setHoveredProject: (project: string | null) => void;
}>({
  activeSection: '',
  hoveredProject: null,
  setHoveredProject: () => {},
});

export function ActiveSectionProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  // Derive activeSection from pathname
  const activeSection = getSectionFromPath(pathname);

  return (
    <ActiveSectionContext.Provider value={{ activeSection, hoveredProject, setHoveredProject }}>
      {children}
    </ActiveSectionContext.Provider>
  );
}

export function useActiveSectionContext() {
  return useContext(ActiveSectionContext);
}
