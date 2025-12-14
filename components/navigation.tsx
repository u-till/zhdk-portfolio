'use client';

import { MobileMenuToggle } from '@/components/mobile-menu-toggle';
import { useActiveSectionContext } from '@/contexts/active-section-context';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const NAVIGATION_LINKS = [
  { href: '#under-construction', label: 'under construction' },
  { href: '#retrofitted', label: 'retrofitted' },
  { href: '#amped-up', label: 'amped up' },
  { href: '#toy-lexicon', label: 'toy lexicon' },
  { href: '#lost-in-space', label: 'lost in space' },
  { href: '#saudade', label: 'saudade' },
  { href: '#dayjob', label: 'dayjob' },
];

const NAVBAR_CONFIG: Record<string, { navbar: string; brand: string; link: string; activeLink: string }> = {
  welcome: {
    navbar: 'rounded-sm bg-background/60 backdrop-blur-md',
    brand: 'hover:text-foreground/80',
    link: 'text-muted-foreground hover:text-foreground',
    activeLink: 'text-foreground',
  },
  'under-construction': {
    navbar: 'rounded-[0px] border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]',
    brand: 'text-black hover:text-black/80',
    link: 'text-black transition-colors',
    activeLink: 'text-white',
  },
  retrofitted: {
    navbar: 'rounded-[32px] border border-border/40 bg-orange-500/80 backdrop-blur-md shadow-sm',
    brand: 'text-white hover:text-white/80',
    link: 'text-white/60 hover:text-white',
    activeLink: 'text-white',
  },
  'amped-up': {
    navbar: 'rounded-[0px] border border-black/60 bg-background/90 backdrop-blur-md',
    brand: 'hover:text-foreground/80',
    link: 'text-muted-foreground hover:text-foreground',
    activeLink: 'text-foreground',
  },
  'toy-lexicon': {
    navbar: 'rounded-[32px] border-2 border-green-500/40 bg-green-500/20 backdrop-blur-md shadow-sm',
    brand: 'hover:text-foreground/80',
    link: 'text-muted-foreground hover:text-foreground',
    activeLink: 'text-foreground',
  },
  'lost-in-space': {
    navbar: 'rounded-lg border-4 border-foreground/20 bg-neutral-600/60 backdrop-blur-md shadow-xl',
    brand: 'text-white',
    link: 'text-muted-foreground hover:text-white',
    activeLink: 'text-white',
  },
  saudade: {
    navbar: 'rounded-xl border-1 border border-white/10 bg-neutral-500/10 backdrop-blur-md',
    brand: 'text-white/60 hover:text-white',
    link: 'text-white/60 hover:text-white',
    activeLink: 'text-white',
  },
  dayjob: {
    navbar: 'rounded-2xl border-0 border-transparent bg-foreground/90 backdrop-blur-md shadow-2xl',
    brand: 'text-white hover:text-white/80',
    link: 'text-white/60 hover:text-white',
    activeLink: 'text-white',
  },
  about: {
    navbar: 'rounded-xl border border-border/20 bg-background/70 backdrop-blur-md shadow-md',
    brand: 'hover:text-foreground/80',
    link: 'text-muted-foreground hover:text-foreground',
    activeLink: 'text-foreground',
  },
};

const SECTION_BACKGROUNDS: Record<string, string> = {
  welcome: '#ffffff',
  'under-construction': '#ffdc51ff',
  retrofitted: '#ffc19dff',
  'amped-up': '#f9fafb',
  'toy-lexicon': '#eff6ff',
  'lost-in-space': '#000000ff',
  saudade: '#646464ff',
  dayjob: '#1f2937',
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
      'background-color 400ms ease-in-out, border-color 400ms ease-in-out, border-width 400ms ease-in-out, border-radius 400ms ease-in-out, box-shadow 400ms ease-in-out',
  };

  return (
    <div className={`fixed top-4 md:top-8 w-full z-50 flex justify-center`}>
      <nav className={`flex w-full flex-col max-w-screen-2xl mx-4 md:mx-8 ${config.navbar}`} style={navbarStyle}>
        <div className='flex items-center justify-between px-4 md:px-6 py-3 md:py-4'>
          <div className='flex items-baseline gap-2'>
            <button
              onClick={() => {
                window.__scrollToSection?.(0);
                // Restart preview after a short delay to ensure we're on welcome section
                setTimeout(() => {
                  window.__restartWelcomePreview?.();
                }, 100);
                setIsMobileMenuOpen(false);
              }}
              className={`text-base md:text-lg font-medium tracking-tight transition-colors ${config.brand} cursor-pointer`}
            >
              till solenthaler
            </button>
            <button
              onClick={() => {
                window.__scrollToSection?.(8);
                setIsMobileMenuOpen(false);
              }}
              className={`text-xs transition-colors cursor-pointer ${config.link}`}
            >
              about
            </button>
          </div>

          {/* Desktop Navigation */}
          <ul className='hidden lg:flex items-center gap-8'>
            {NAVIGATION_LINKS.map((link) => {
              const linkSection = link.href.substring(1);
              const isActive = isHomePage && activeSection === linkSection;
              const isHovered = isHomePage && activeSection === 'welcome' && hoveredProject === linkSection;

              return (
                <li key={link.href}>
                  <button
                    onClick={() => {
                      const sectionIndex = [
                        'welcome',
                        'under-construction',
                        'retrofitted',
                        'amped-up',
                        'toy-lexicon',
                        'lost-in-space',
                        'saudade',
                        'dayjob',
                        'about',
                      ].indexOf(linkSection);
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
                    className={`relative text-sm font-medium transition-colors cursor-pointer py-2 px-2 whitespace-nowrap isolate ${
                      isActive ? config.activeLink : isHovered ? 'text-foreground' : config.link
                    }`}
                  >
                    {link.label}
                    {isActive && linkSection === 'under-construction' && (
                      <motion.div
                        layoutId='activeNavLink'
                        className='absolute inset-x-0 -inset-y-2 md:-inset-y-3 bg-red-600 z-[-1]'
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden ${config.brand}`}
            aria-label='Toggle menu'
          >
            <MobileMenuToggle menuOpen={isMobileMenuOpen} />
          </button>
        </div>

        {/* Mobile Menu - Expandable */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className='overflow-hidden lg:hidden'
            >
              <ul className='flex flex-col gap-2 px-4 pb-4'>
                {NAVIGATION_LINKS.map((link) => {
                  const linkSection = link.href.substring(1);
                  const isActive = isHomePage && activeSection === linkSection;
                  const isHovered = isHomePage && activeSection === 'welcome' && hoveredProject === linkSection;

                  return (
                    <li key={link.href}>
                      <button
                        onClick={() => {
                          const sectionIndex = [
                            'welcome',
                            'under-construction',
                            'retrofitted',
                            'amped-up',
                            'toy-lexicon',
                            'lost-in-space',
                            'saudade',
                            'dayjob',
                            'about',
                          ].indexOf(linkSection);
                          if (sectionIndex !== -1) {
                            window.__scrollToSection?.(sectionIndex);
                          }
                          setIsMobileMenuOpen(false);
                        }}
                        className={`relative text-left text-sm font-medium transition-colors cursor-pointer w-full py-2 px-2 whitespace-nowrap isolate ${
                          isActive ? config.activeLink : isHovered ? 'text-foreground' : config.link
                        }`}
                      >
                        {link.label}
                        {isActive && linkSection === 'under-construction' && (
                          <motion.div
                            layoutId='activeNavLinkMobile'
                            className='absolute inset-x-0 inset-y-0 bg-red-600 z-[-1]'
                            transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                          />
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </div>
  );
}
