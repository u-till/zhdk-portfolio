'use client';

import { useActiveSection } from '@/hooks/use-active-section';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

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
    navbar: 'rounded-sm border-1 border-red-600/20 shadow-xl',
    brand: 'text-black',
    link: 'text-black',
    activeLink: 'text-black',
  },
  'project-2': {
    navbar: 'rounded-[50px] border border-border/40 bg-orange-500/80 backdrop-blur-md shadow-sm',
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
    navbar: 'rounded-[50px] border-2 border-green-500/40 bg-green-500/20 backdrop-blur-md shadow-sm',
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
  'project-1': '#fcd390ff',
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
  const activeSection = useActiveSection();
  const isHomePage = pathname === '/';

  const currentSection = activeSection && NAVBAR_CONFIG[activeSection] ? activeSection : 'welcome';

  useEffect(() => {
    const backgroundColor = SECTION_BACKGROUNDS[currentSection] || SECTION_BACKGROUNDS.welcome;
    document.body.style.backgroundColor = backgroundColor;
    document.body.style.transition = 'background-color 600ms ease-in-out';
  }, [currentSection]);

  const config = NAVBAR_CONFIG[currentSection];

  const navbarStyle =
    currentSection === 'project-1'
      ? {
          background:
            'repeating-linear-gradient(90deg, #dc2626 0%, #dc2626 14.28%, white 14.28%, white 28.56%, #dc2626 28.56%, #dc2626 42.84%, white 42.84%, white 57.12%, #dc2626 57.12%, #dc2626 71.4%, white 71.4%, white 85.68%, #dc2626 85.68%, #dc2626 100%)',
          transition:
            'background-color 400ms ease-in-out, border-color 400ms ease-in-out, border-width 400ms ease-in-out, border-radius 400ms ease-in-out, box-shadow 400ms ease-in-out',
        }
      : {
          transition:
            'background-color 400ms ease-in-out, border-color 400ms ease-in-out, border-width 400ms ease-in-out, border-radius 400ms ease-in-out, box-shadow 400ms ease-in-out',
        };

  return (
    <nav className={`fixed top-8 left-0 right-0 z-50 max-w-6xl mx-auto px-4 ${config.navbar}`} style={navbarStyle}>
      <div className='flex items-center justify-between px-6 py-4'>
        <Link href='/' className={`text-lg font-medium tracking-tight transition-colors ${config.brand}`}>
          till solenthaler
        </Link>

        <ul className='flex items-center gap-8'>
          {NAVIGATION_LINKS.map((link) => {
            const isActive =
              isHomePage && activeSection.startsWith('project-') && activeSection === link.href.substring(1);

            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`text-sm font-medium transition-colors ${isActive ? config.activeLink : config.link}`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
