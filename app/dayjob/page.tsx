'use client';

import { BrowserWindow } from '@/components/dayjob/browser-window';
import { DesktopIcon } from '@/components/dayjob/desktop-icon';
import { Dock } from '@/components/dayjob/dock';
import { MobileGrid } from '@/components/dayjob/mobile-grid';
import { TerminalWindow } from '@/components/dayjob/terminal-window';
import { TextWindow } from '@/components/dayjob/text-window';
import { useIsMobile } from '@/hooks/use-is-mobile';
import { archivo } from '@/lib/fonts';
import { DockItem, WindowState } from '@/types/macos';
import Image from 'next/image';
import { useCallback, useState } from 'react';

const MAX_WINDOW_Z_INDEX = 99; // Dock is at z-100

const WINDOW_CONFIGS: WindowState[] = [
  // Browser windows (appear in dock)
  {
    id: 'utill',
    url: 'https://utill.ch',
    title: 'utill.ch',
    icon: '/dayjob/icons/utill-logo.jpg',
    isOpen: false,
    isMaximized: false,
    zIndex: 51,
    position: { x: 80, y: 80 },
    size: { width: 1400, height: 700 },
    type: 'browser',
  },
  {
    id: 'hannibal',
    url: 'https://hannibal.ch',
    title: 'hannibal.ch',
    icon: '/dayjob/icons/hannibal-icon.png',
    isOpen: false,
    isMaximized: false,
    zIndex: 51,
    position: { x: 100, y: 100 },
    size: { width: 1400, height: 700 },
    type: 'browser',
  },
  {
    id: 'fabio',
    url: 'https://fabiotozzo.com',
    title: 'fabiotozzo.com',
    icon: '/dayjob/icons/fabiotozzo-icon.png',
    isOpen: false,
    isMaximized: false,
    zIndex: 51,
    position: { x: 120, y: 100 },
    size: { width: 1200, height: 700 },
    type: 'browser',
  },
  {
    id: 'swing',
    url: 'https://swing.ch',
    title: 'swing.ch',
    icon: '/dayjob/icons/swing-icon.jpg',
    isOpen: false,
    isMaximized: false,
    zIndex: 51,
    position: { x: 120, y: 100 },
    size: { width: 1200, height: 700 },
    type: 'browser',
  },
  {
    id: 'njk',
    url: 'https://nicolaijaronkager.ch',
    title: 'nicolaijaronkager.ch',
    icon: '/dayjob/icons/cropped-favicon-njk-2-192x192.png',
    isOpen: false,
    isMaximized: false,
    zIndex: 51,
    position: { x: 140, y: 100 },
    size: { width: 1200, height: 700 },
    type: 'browser',
  },
  {
    id: 'narrative',
    url: 'https://anothernarrative.studio',
    title: 'anothernarrative.studio',
    icon: '/dayjob/icons/anothernarrative-icon.png',
    isOpen: false,
    isMaximized: false,
    zIndex: 51,
    position: { x: 160, y: 120 },
    size: { width: 1200, height: 700 },
    type: 'browser',
  },
  {
    id: 'brooke',
    url: 'https://brookejackson.ch',
    title: 'brookejackson.ch',
    icon: '/dayjob/icons/brookejackson-icon.png',
    isOpen: false,
    isMaximized: false,
    zIndex: 51,
    position: { x: 180, y: 140 },
    size: { width: 1000, height: 700 },
    type: 'browser',
  },
  // Desktop apps (only appear as desktop icons)
  {
    id: 'info',
    title: 'infos.txt',
    isOpen: true,
    isMaximized: false,
    zIndex: 51,
    position: { x: 200, y: 160 },
    size: { width: 600, height: 400 },
    type: 'text',
  },
  {
    id: 'process',
    title: 'process.app',
    isOpen: false,
    isMaximized: false,
    zIndex: 51,
    position: { x: 250, y: 200 },
    size: { width: 700, height: 500 },
    type: 'terminal',
  },
];

// Dock items computed from browser windows only
const DOCK_ITEMS: DockItem[] = WINDOW_CONFIGS.filter((w) => w.type === 'browser').map((w) => ({
  id: w.id,
  label: w.title,
  icon: w.icon || '/dayjob/icons/utill-logo.jpg',
  url: w.url,
}));

export default function DayjobPage() {
  const isMobile = useIsMobile(768);
  const [windows, setWindows] = useState<WindowState[]>(WINDOW_CONFIGS);

  const openWindow = useCallback((id: string) => {
    setWindows((prevWindows) => {
      const maxZ = Math.max(...prevWindows.map((w) => w.zIndex));
      const newZ = Math.min(maxZ + 1, MAX_WINDOW_Z_INDEX);
      return prevWindows.map((w) =>
        w.id === id
          ? {
              ...w,
              isOpen: true,
              zIndex: newZ,
            }
          : w,
      );
    });
  }, []);

  const closeWindow = useCallback((id: string) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, isOpen: false } : w)));
  }, []);

  const focusWindow = useCallback((id: string) => {
    setWindows((prevWindows) => {
      const maxZ = Math.max(...prevWindows.map((w) => w.zIndex));
      const newZ = Math.min(maxZ + 1, MAX_WINDOW_Z_INDEX);
      return prevWindows.map((w) => (w.id === id ? { ...w, zIndex: newZ } : w));
    });
  }, []);

  const maximizeWindow = useCallback((id: string) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, isMaximized: !w.isMaximized } : w)));
  }, []);

  const resizeWindow = useCallback((id: string, size: { width: number; height: number }) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, size } : w)));
  }, []);

  if (isMobile) {
    return <MobileGrid items={DOCK_ITEMS} />;
  }

  return (
    <section className='h-screen overflow-y-auto overflow-x-hidden'>
      {/* First View: Desktop */}
      <div className='h-screen relative overflow-hidden'>
        {/* Background - Full Screen */}
        <Image src='/dayjob/bg.jpg' alt='Desktop Background' fill className='object-cover' priority />

        {/* Title - Bottom Left */}
        <div className='absolute bottom-4 md:bottom-8 left-4 md:left-8 pointer-events-none z-10'>
          <h2
            className={`text-5xl lg:text-7xl uppercase font-bold text-black mix-blend-difference ${archivo.className}`}
          >
            dayjob
          </h2>
        </div>

        {/* Virtual Desktop - Full Screen Area */}
        <div className='absolute top-0 left-0 right-0 bottom-0 overflow-hidden'>
          {/* Desktop Icons */}
          <DesktopIcon
            onOpen={() => openWindow('info')}
            isWindowOpen={windows.find((w) => w.id === 'info')?.isOpen ?? false}
            iconType='text'
            label='infos.txt'
            positionClass='top-42 right-16'
          />
          <DesktopIcon
            onOpen={() => openWindow('process')}
            isWindowOpen={windows.find((w) => w.id === 'process')?.isOpen ?? false}
            iconType='terminal'
            label='process.app'
            positionClass='top-72 right-16'
          />

          {/* Windows */}
          {windows
            .filter((w) => w.isOpen)
            .map((window) => {
              if (window.type === 'browser') {
                return (
                  <BrowserWindow
                    key={window.id}
                    title={window.title}
                    url={window.url}
                    position={window.position}
                    size={window.size}
                    zIndex={window.zIndex}
                    isMaximized={window.isMaximized}
                    onClose={() => closeWindow(window.id)}
                    onFocus={() => focusWindow(window.id)}
                    onMaximize={() => maximizeWindow(window.id)}
                    onResize={(size) => resizeWindow(window.id, size)}
                  />
                );
              } else if (window.type === 'terminal') {
                return (
                  <TerminalWindow
                    key={window.id}
                    title={window.title}
                    position={window.position}
                    size={window.size}
                    zIndex={window.zIndex}
                    isMaximized={window.isMaximized}
                    onClose={() => closeWindow(window.id)}
                    onFocus={() => focusWindow(window.id)}
                    onMaximize={() => maximizeWindow(window.id)}
                    onResize={(size) => resizeWindow(window.id, size)}
                  />
                );
              } else {
                return (
                  <TextWindow
                    key={window.id}
                    title={window.title}
                    position={window.position}
                    size={window.size}
                    zIndex={window.zIndex}
                    isMaximized={window.isMaximized}
                    onClose={() => closeWindow(window.id)}
                    onFocus={() => focusWindow(window.id)}
                    onMaximize={() => maximizeWindow(window.id)}
                    onResize={(size) => resizeWindow(window.id, size)}
                  />
                );
              }
            })}

          {/* Dock */}
          <Dock items={DOCK_ITEMS} onItemClick={openWindow} />
        </div>

        {/* Scroll Down Arrow */}
        <div className='absolute bottom-8 left-1/2 -translate-x-1/2 z-10 pointer-events-none'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='32'
            height='32'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2.5'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='text-white/30 animate-bounce'
          >
            <path d='M12 5v14M5 12l7 7 7-7' />
          </svg>
        </div>
      </div>

      {/* Info Content - 3 Columns */}
      <div className='px-4 md:px-8 pt-16 pb-16' style={{ backgroundColor: '#E0E0E0' }}>
        <div>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 text-foreground'>
            {/* Column 1: Brief & Idea */}
            <div className='space-y-6'>
              <div>
                <h3 className={`text-xl font-bold uppercase border-b-2 border-blue-400 pb-2 ${archivo.className}`}>
                  Brief
                </h3>
                <p className='mt-4 leading-relaxed'>
                  A selection of freelance web projects I have worked on over the years. These range from small
                  portfolio sites to larger business applications, showcasing my experience in web development and
                  design.
                </p>
              </div>
              <div>
                <h3 className={`text-xl font-bold uppercase border-b-2 border-blue-400 pb-2 ${archivo.className}`}>
                  Idea
                </h3>
                <p className='mt-4 leading-relaxed'>
                  I started freelancing during my studies to gain practical experience and earn some money on the side.
                  Over time, it became a way to explore different technologies and work with diverse clients across
                  various industries.
                </p>
              </div>
            </div>

            {/* Column 2: Specifications */}
            <div>
              <h3 className={`text-xl font-bold uppercase border-b-2 border-blue-400 pb-2 ${archivo.className}`}>
                Specifications
              </h3>
              <ul className='space-y-2 list-none mt-4'>
                <li className='border-l-2 border-blue-400 pl-3 py-1'>
                  <span className='font-bold'>YEAR:</span> 2018-Ongoing
                </li>
                <li className='border-l-2 border-blue-400 pl-3 py-1'>
                  <span className='font-bold'>FOR:</span> Various Clients
                </li>
                <li className='border-l-2 border-blue-400 pl-3 py-1'>
                  <span className='font-bold'>TYPE:</span> Freelance Web Development
                </li>
                <li className='border-l-2 border-blue-400 pl-3 py-1'>
                  <span className='font-bold'>TECH:</span> React, Next.js, TypeScript, Tailwind, WordPress, PHP
                </li>
                <li className='border-l-2 border-blue-400 pl-3 py-1'>
                  <span className='font-bold'>SERVICES:</span> Design, Development, Hosting, Maintenance
                </li>
              </ul>
            </div>

            {/* Column 3: Learnings & Credits */}
            <div className='space-y-6'>
              <div>
                <h3 className={`text-xl font-bold uppercase border-b-2 border-blue-400 pb-2 ${archivo.className}`}>
                  Learnings
                </h3>
                <ul className='list-disc list-inside mt-4 space-y-1'>
                  <li>Client communication is as important as technical skills</li>
                  <li>Set clear boundaries and scope from the start</li>
                  <li>Document everything for future maintenance</li>
                  <li>Always keep learning new technologies</li>
                </ul>
              </div>
              <div>
                <h3 className={`text-xl font-bold uppercase border-b-2 border-blue-400 pb-2 ${archivo.className}`}>
                  Credits
                </h3>
                <div className='space-y-4 mt-4'>
                  <div>
                    <span className='font-bold block uppercase text-sm tracking-wider'>Solo Projects</span>
                    <span>Till Solenthaler</span>
                  </div>
                  <div>
                    <span className='font-bold block uppercase text-sm tracking-wider'>AI Declaration</span>
                    <span>Claude Code for recent projects</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
