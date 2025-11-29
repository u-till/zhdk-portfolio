'use client';

import { MobileMenuToggle } from '@/components/mobile-menu-toggle';
import { useActiveSectionContext } from '@/contexts/active-section-context';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const NAVIGATION_LINKS = [
  { href: '#project-1', label: 'under construction' },
  { href: '#project-2', label: 'retrofitted' },
  { href: '#project-3', label: 'amped up' },
  { href: '#project-4', label: 'toy lexicon' },
  { href: '#project-5', label: 'lost in space' },
  { href: '#project-6', label: 'saudade' },
  { href: '#project-7', label: 'dayjob' },
];

const NAVBAR_CONFIG: Record<string, { navbar: string; brand: string; link: string; activeLink: string }> = {
  welcome: {
    navbar: 'rounded-[0px] bg-background/60 backdrop-blur-md',
    brand: 'hover:text-foreground/80',
    link: 'text-muted-foreground hover:text-foreground',
    activeLink: 'text-foreground',
  },
  'project-1': {
    navbar: 'rounded-[0px] border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]',
    brand: 'text-black hover:text-black/80',
    link: 'text-black transition-colors',
    activeLink: 'text-white',
  },
  'project-2': {
    navbar: 'rounded-[32px] border border-border/40 bg-orange-500/80 backdrop-blur-md shadow-sm',
    brand: 'text-white hover:text-white/80',
    link: 'text-white/60 hover:text-white',
    activeLink: 'text-white',
  },
  'project-3': {
    navbar: 'rounded-[0px] border border-black/60 bg-background/90 backdrop-blur-md',
    brand: 'hover:text-foreground/80',
    link: 'text-muted-foreground hover:text-foreground',
    activeLink: 'text-foreground',
  },
  'project-4': {
    navbar: 'rounded-[32px] border-2 border-green-500/40 bg-green-500/20 backdrop-blur-md shadow-sm',
    brand: 'hover:text-foreground/80',
    link: 'text-muted-foreground hover:text-foreground',
    activeLink: 'text-foreground',
  },
  'project-5': {
    navbar: 'rounded-lg border-4 border-foreground/20 bg-neutral-600/60 backdrop-blur-md shadow-xl',
    brand: 'text-white',
    link: 'text-muted-foreground hover:text-white',
    activeLink: 'text-white',
  },
  'project-6': {
    navbar: 'rounded-xl border-1 border border-white/10 bg-neutral-500/10 backdrop-blur-md',
    brand: 'text-white/60 hover:text-white',
    link: 'text-white/60 hover:text-white',
    activeLink: 'text-white',
  },
  'project-7': {
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
  'project-1': '#ffdc51ff',
  'project-2': '#ffc19dff',
  'project-3': '#f9fafb',
  'project-4': '#eff6ff',
  'project-5': '#000000ff',
  'project-6': '#646464ff',
  'project-7': '#1f2937',
  about: '#f9fafb',
};

export function Navigation() {
  const pathname = usePathname();
  const { activeSection } = useActiveSectionContext();
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
    <nav
      className={`fixed top-4 md:top-8 left-4 right-4 md:left-0 md:right-0 z-50 max-w-6xl md:mx-auto ${config.navbar}`}
      style={navbarStyle}
    >
      <div className='flex flex-col'>
        <div className='flex items-center justify-between px-4 md:px-6 py-3 md:py-4'>
          <button
            onClick={() => {
              window.__scrollToSection?.(0);
              setIsMobileMenuOpen(false);
            }}
            className={`text-base md:text-lg font-medium tracking-tight transition-colors ${config.brand} cursor-pointer`}
          >
            till solenthaler
          </button>

          {/* Desktop Navigation */}
          <ul className='hidden md:flex items-center gap-8'>
            {NAVIGATION_LINKS.map((link) => {
              const linkSection = link.href.substring(1);
              const isActive = isHomePage && activeSection === linkSection;

              return (
                <li key={link.href}>
                  <button
                    onClick={() => {
                      const sectionIndex = [
                        'welcome',
                        'project-1',
                        'project-2',
                        'project-3',
                        'project-4',
                        'project-5',
                        'project-6',
                        'project-7',
                        'about',
                      ].indexOf(linkSection);
                      if (sectionIndex !== -1) {
                        window.__scrollToSection?.(sectionIndex);
                      }
                    }}
                    className={`relative text-sm font-medium transition-colors cursor-pointer py-2 px-2 whitespace-nowrap ${
                      isActive ? config.activeLink : config.link
                    }`}
                  >
                    {link.label}
                    {isActive && currentSection === 'project-1' && (
                      <motion.div
                        layoutId='activeNavLink'
                        className='absolute inset-x-0 -inset-y-2 md:-inset-y-3 bg-red-600 -z-10'
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
            className={`md:hidden ${config.link}`}
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
              className='overflow-hidden md:hidden'
            >
              <ul className='flex flex-col gap-2 px-4 pb-4'>
                {NAVIGATION_LINKS.map((link) => {
                  const linkSection = link.href.substring(1);
                  const isActive = isHomePage && activeSection === linkSection;

                  return (
                    <li key={link.href}>
                      <button
                        onClick={() => {
                          const sectionIndex = [
                            'welcome',
                            'project-1',
                            'project-2',
                            'project-3',
                            'project-4',
                            'project-5',
                            'project-6',
                            'project-7',
                            'about',
                          ].indexOf(linkSection);
                          if (sectionIndex !== -1) {
                            window.__scrollToSection?.(sectionIndex);
                          }
                          setIsMobileMenuOpen(false);
                        }}
                        className={`relative text-left text-sm font-medium transition-colors cursor-pointer w-full py-2 px-2 whitespace-nowrap ${
                          isActive ? config.activeLink : config.link
                        }`}
                      >
                        {link.label}
                        {isActive && currentSection === 'project-1' && (
                          <motion.div
                            layoutId='activeNavLinkMobile'
                            className='absolute inset-x-0 inset-y-0 bg-red-600 -z-10'
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
      </div>
    </nav>
  );
}
