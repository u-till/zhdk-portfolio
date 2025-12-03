'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

const ActiveSectionContext = createContext<{
  activeSection: string;
  setActiveSection: (section: string) => void;
  hoveredProject: string | null;
  setHoveredProject: (project: string | null) => void;
}>({
  activeSection: '',
  setActiveSection: () => {},
  hoveredProject: null,
  setHoveredProject: () => {},
});

export function ActiveSectionProvider({ children }: { children: ReactNode }) {
  const [activeSection, setActiveSection] = useState('welcome');
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  return (
    <ActiveSectionContext.Provider value={{ activeSection, setActiveSection, hoveredProject, setHoveredProject }}>
      {children}
    </ActiveSectionContext.Provider>
  );
}

export function useActiveSectionContext() {
  return useContext(ActiveSectionContext);
}
