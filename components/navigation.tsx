'use client';

import { MobileMenuToggle } from '@/components/mobile-menu-toggle';
import { useActiveSectionContext } from '@/contexts/active-section-context';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const NAVIGATION_LINKS = [
  { href: 'under-construction', label: 'under construction' },
  { href: 'saudade', label: 'saudade' },
  { href: 'retrofitted', label: 'retrofitted' },
  { href: 'amped-up', label: 'amped up' },
  { href: 'toy-lexicon', label: 'toy lexicon' },
  { href: 'lost-in-space', label: 'lost in space' },
  { href: 'dayjob', label: 'dayjob' },
];

const SECTION_ORDER = [
  'welcome',
  'under-construction',
  'saudade',
  'retrofitted',
  'amped-up',
  'toy-lexicon',
  'lost-in-space',
  'dayjob',
  'about',
];

const NAVBAR_CONFIG: Record<string, { navbar: string; brand: string; link: string; activeLink: string }> = {
  welcome: {
    navbar: 'rounded-sm bg-background/60 backdrop-blur-md w-[200px] border-black border-2',
    brand: 'hover:text-foreground/80',
    link: 'text-muted-foreground hover:text-foreground opacity-0',
    activeLink: 'text-foreground',
  },
  'under-construction': {
    navbar: 'w-full rounded-[0px] border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]',
    brand: 'text-black hover:text-black/80',
    link: 'text-black transition-colors',
    activeLink: 'text-white',
  },
  retrofitted: {
    navbar: 'w-full rounded-[32px] border border-border/40 bg-orange-500/80 backdrop-blur-md shadow-sm',
    brand: 'text-white hover:text-white/80',
    link: 'text-white/60 hover:text-white',
    activeLink: 'text-white',
  },
  'amped-up': {
    navbar: 'w-full rounded-[0px] border border-black/60 bg-background backdrop-blur-md',
    brand: 'hover:text-foreground/80',
    link: 'text-muted-foreground hover:text-foreground',
    activeLink: 'text-foreground',
  },
  'toy-lexicon': {
    navbar: 'w-full rounded-lg border-2 border-green-500/60 bg-green-500/40 backdrop-blur-md shadow-sm',
    brand: 'hover:text-foreground/80',
    link: 'text-neutral-600 hover:text-foreground',
    activeLink: 'text-foreground',
  },
  'lost-in-space': {
    navbar: 'w-full rounded-lg border-4 border-foreground/20 bg-neutral-600/60 backdrop-blur-md shadow-xl',
    brand: 'text-white',
    link: 'text-muted-foreground hover:text-white',
    activeLink: 'text-white',
  },
  saudade: {
    navbar: 'w-full rounded-xl border-1 border border-white/10 bg-neutral-500/10 backdrop-blur-md',
    brand: 'text-white/60 hover:text-white',
    link: 'text-white/60 hover:text-white',
    activeLink: 'text-white',
  },
  dayjob: {
    navbar: 'w-full rounded-2xl border-0 border-transparent bg-foreground/70 backdrop-blur-md shadow-2xl',
    brand: 'text-white hover:text-white/80',
    link: 'text-white/60 hover:text-white',
    activeLink: 'text-white',
  },
  about: {
    navbar: 'w-full rounded-sm bg-background/60 backdrop-blur-md w-[200px] border-black border-2',
    brand: 'hover:text-foreground/80',
    link: 'text-muted-foreground hover:text-foreground',
    activeLink: 'text-foreground',
  },
};

const SECTION_BACKGROUNDS: Record<string, string> = {
  welcome: '#ffffff',
  'under-construction': '#ffdc51ff',
  retrofitted: '#3C4343',
  'amped-up': '#ffffff',
  'toy-lexicon': '#eff6ff',
  'lost-in-space': '#000000ff',
  saudade: 'rgb(0, 0, 0)',
  dayjob: '#EAEAE8',
  about: '#f9fafb',
};

export function Navigation() {
  const pathname = usePathname();
  const { activeSection, hoveredProject, setHoveredProject } = useActiveSectionContext();
  const isHomePage = pathname === '/';
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const currentSection = activeSection && NAVBAR_CONFIG[activeSection] ? activeSection : 'welcome';

  useEffect(() => {
    const backgroundColor = SECTION_BACKGROUNDS[currentSection] || SECTION_BACKGROUNDS.welcome;
    document.body.style.backgroundColor = backgroundColor;
    document.body.style.transition = 'background-color 600ms ease-in-out';
  }, [currentSection]);

  const config = NAVBAR_CONFIG[currentSection];

  const navbarStyle = {
    transition:
      'background-color 400ms ease-in-out, border-color 400ms ease-in-out, border-width 400ms ease-in-out, border-radius 400ms ease-in-out, box-shadow 400ms ease-in-out, width 400ms ease-in-out',
  };

  return (
    <div className={`fixed top-4 md:top-8 w-full z-50 flex justify-start`}>
      <nav className={`flex flex-col mx-4 md:mx-8 ${config.navbar}`} style={navbarStyle}>
        <div className='flex items-center justify-between px-4 gap-4 md:px-6 py-3 md:py-4'>
          <div className='flex items-baseline gap-2'>
            <button
              onClick={() => {
                window.__scrollToSection?.(0);
                setIsMobileMenuOpen(false);
              }}
              className={`text-base md:text-lg py-1 font-medium tracking-tight transition-colors ${config.brand} cursor-pointer whitespace-nowrap`}
            >
              till solenthaler
            </button>
            <button
              onClick={() => {
                window.__scrollToSection?.(8);
                setIsMobileMenuOpen(false);
              }}
              className={`text-xs transition-colors cursor-pointer ${
                currentSection === 'welcome'
                  ? 'text-muted-foreground hover:text-foreground'
                  : currentSection === 'under-construction'
                  ? 'text-black hover:text-red-600'
                  : config.link
              }`}
            >
              about
            </button>
          </div>

          {/* Desktop Navigation */}
          {currentSection !== 'welcome' && (
            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className='hidden lg:flex items-center gap-8'
            >
              {NAVIGATION_LINKS.map((link) => {
                const linkSection = link.href;
                const isActive = isHomePage && activeSection === linkSection;
                const isHovered = isHomePage && activeSection === 'welcome' && hoveredProject === linkSection;

                return (
                  <li key={link.href}>
                    <button
                      onClick={() => {
                        const sectionIndex = SECTION_ORDER.indexOf(linkSection);
                        if (sectionIndex !== -1) {
                          window.__scrollToSection?.(sectionIndex);
                        }
                      }}
                      onMouseEnter={() => {
                        if (activeSection === 'welcome') {
                          setHoveredProject(linkSection);
                        }
                      }}
                      onMouseLeave={() => {
                        if (activeSection === 'welcome') {
                          setHoveredProject(null);
                        }
                      }}
                      className={`relative text-sm font-medium transition-colors cursor-pointer pt-2 pb-2 px-2 whitespace-nowrap isolate ${
                        isActive
                          ? linkSection === 'under-construction'
                            ? 'text-red-600'
                            : config.activeLink
                          : currentSection === 'under-construction'
                          ? 'text-black hover:text-red-600'
                          : isHovered
                          ? 'text-foreground'
                          : config.link
                      }`}
                    >
                      {link.label}
                    </button>
                  </li>
                );
              })}
            </motion.ul>
          )}

          {/* Mobile Menu Button */}
          {currentSection !== 'welcome' && (
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden ${config.brand}`}
              aria-label='Toggle menu'
            >
              <MobileMenuToggle menuOpen={isMobileMenuOpen} />
            </button>
          )}
        </div>

        {/* Mobile Menu - Expandable */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className={`overflow-hidden lg:hidden ${currentSection === 'under-construction' ? 'bg-white' : ''}`}
            >
              {currentSection !== 'welcome' && (
                <ul className='flex flex-col gap-2 px-4 pb-4'>
                  {NAVIGATION_LINKS.map((link) => {
                    const linkSection = link.href;
                    const isActive = isHomePage && activeSection === linkSection;
                    const isHovered = isHomePage && activeSection === 'welcome' && hoveredProject === linkSection;

                    return (
                      <li key={link.href}>
                        <button
                          onClick={() => {
                            const sectionIndex = SECTION_ORDER.indexOf(linkSection);
                            if (sectionIndex !== -1) {
                              window.__scrollToSection?.(sectionIndex);
                            }
                            setIsMobileMenuOpen(false);
                          }}
                          className={`relative text-left text-sm font-medium transition-colors cursor-pointer w-full py-2 px-2 whitespace-nowrap isolate ${
                            isActive
                              ? linkSection === 'under-construction'
                                ? 'text-red-600'
                                : config.activeLink
                              : currentSection === 'under-construction'
                              ? 'text-black hover:text-red-600'
                              : isHovered
                              ? 'text-foreground'
                              : config.link
                          }`}
                        >
                          {link.label}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </div>
  );
}
