'use client';

import { useNavigation } from '@/contexts/navigation-context';
import Image from 'next/image';
import { useEffect } from 'react';

const NAVBAR_CONFIG: Record<string, { navbar: string; brand: string; link: string }> = {
  welcome: {
    navbar: 'rounded-sm bg-background/60 backdrop-blur-md border-black border-2',
    brand: 'text-foreground hover:text-foreground/80',
    link: 'text-muted-foreground hover:text-foreground',
  },
  'under-construction': {
    navbar: 'rounded-[0px] border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]',
    brand: 'text-black hover:text-black/80',
    link: 'text-black hover:text-red-600',
  },
  retrofitted: {
    navbar: 'rounded-[32px] border border-[#e7d68d]/40 bg-[#c33b32] backdrop-blur-md shadow-sm',
    brand: 'text-white hover:text-white/80',
    link: 'text-white/60 hover:text-white',
  },
  'amped-up': {
    navbar: 'rounded-[0px] border border-black/60 bg-background backdrop-blur-md',
    brand: 'hover:text-foreground/80',
    link: 'text-muted-foreground hover:text-foreground',
  },
  'toy-lexicon': {
    navbar: 'rounded-lg border-2 border-[#5BB660]/60 bg-[#5BB660]/40 backdrop-blur-md shadow-sm',
    brand: 'hover:text-foreground/80',
    link: 'text-neutral-600 hover:text-foreground',
  },
  'lost-in-space': {
    navbar: 'rounded-lg border-4 border-foreground/20 bg-neutral-600/60 backdrop-blur-md shadow-xl',
    brand: 'text-white',
    link: 'text-muted-foreground hover:text-white',
  },
  saudade: {
    navbar: 'rounded-xl border border-white/10 bg-neutral-500/10 backdrop-blur-md',
    brand: 'text-white/60 hover:text-white',
    link: 'text-white/60 hover:text-white',
  },
  dayjob: {
    navbar: 'rounded-2xl border-0 border-transparent bg-foreground/70 backdrop-blur-md shadow-2xl',
    brand: 'text-white hover:text-white/80',
    link: 'text-white/60 hover:text-white',
  },
  traces: {
    navbar: 'rounded-2xl border-0 border-transparent bg-sky-700/70 backdrop-blur-md shadow-2xl',
    brand: 'text-white hover:text-white/80',
    link: 'text-white/60 hover:text-white',
  },
  about: {
    navbar: 'rounded-sm bg-background/60 backdrop-blur-md border-black border-2',
    brand: 'hover:text-foreground/80',
    link: 'text-muted-foreground hover:text-foreground',
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
  traces: '#EAEAE8',
  about: '#f9fafb',
};

export function Navigation() {
  const { currentPage, navigateTo } = useNavigation();

  const currentSection = currentPage && NAVBAR_CONFIG[currentPage] ? currentPage : 'welcome';

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
    <div className='fixed top-4 md:top-8 w-full z-50 flex justify-start'>
      <nav className={`mx-4 md:mx-8 px-4 md:px-6 py-3 md:py-4 flex items-center gap-2 ${config.navbar}`} style={navbarStyle}>
        <button onClick={() => navigateTo('/')} className='cursor-pointer flex-shrink-0'>
          <Image src='/icon.png' alt='Logo' width={24} height={24} className='rounded-sm' />
        </button>
        <div className='flex items-baseline gap-2'>
          <button
            onClick={() => navigateTo('/')}
            className={`text-base md:text-lg font-medium tracking-tight transition-colors ${config.brand} cursor-pointer whitespace-nowrap`}
          >
            till solenthaler
          </button>
          <button
            onClick={() => navigateTo('/about')}
            className={`text-sm font-semibold transition-colors cursor-pointer ${config.link}`}
          >
            about
          </button>
        </div>
      </nav>
    </div>
  );
}
