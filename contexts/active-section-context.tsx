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
  const [activeSection, setActiveSectionState] = useState('welcome');
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  // Wrapper that clears hovered project when leaving welcome section
  const setActiveSection = (section: string) => {
    setActiveSectionState(section);
    if (section !== 'welcome') {
      setHoveredProject(null);
    }
  };

  return (
    <ActiveSectionContext.Provider value={{ activeSection, setActiveSection, hoveredProject, setHoveredProject }}>
      {children}
    </ActiveSectionContext.Provider>
  );
}

export function useActiveSectionContext() {
  return useContext(ActiveSectionContext);
}
