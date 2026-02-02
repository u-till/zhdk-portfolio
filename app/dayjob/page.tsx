'use client';

import { BrowserWindow } from '@/components/dayjob/browser-window';
import { DesktopIcon } from '@/components/dayjob/desktop-icon';
import { Dock } from '@/components/dayjob/dock';
import { MobileGrid } from '@/components/dayjob/mobile-grid';
import { TerminalWindow } from '@/components/dayjob/terminal-window';
import { TextWindow } from '@/components/dayjob/text-window';
import { useNavigation } from '@/contexts/navigation-context';
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
  const { navigateTo } = useNavigation();
  const isMobile = useIsMobile(768);
  const [windows, setWindows] = useState<WindowState[]>(WINDOW_CONFIGS);
  const [selectedProcessIndex, setSelectedProcessIndex] = useState(0);

  const openWindow = useCallback((id: string) => {
    setWindows((prevWindows) => {
      const maxZ = Math.max(...prevWindows.map((w) => w.zIndex));
      const newZ = Math.min(maxZ + 1, MAX_WINDOW_Z_INDEX);
      return prevWindows.map((w) =>
        w.id === id
          ? {
              ...w,
              isOpen: true,
              isMaximized: w.type === 'browser',
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
    <section>
      {/* First View: Desktop */}
      <div className='h-screen relative overflow-hidden isolate z-20'>
        {/* Background Video - Full Screen */}
        <video autoPlay loop muted playsInline className='absolute inset-0 w-full h-full object-cover object-bottom'>
          <source src='/dayjob/dayjob-trailer.mp4' type='video/mp4' />
        </video>

        {/* Virtual Desktop - Full Screen Area */}
        <div className='absolute top-0 left-0 right-0 bottom-0 overflow-hidden pointer-events-none'>
          {/* Title - Bottom Left (inside desktop area for proper blend) */}
          <h2
            className={`absolute bottom-4 md:bottom-8 left-4 md:left-8 text-[clamp(1.75rem,8vh,3rem)] md:text-[clamp(1.75rem,8vh,8rem)] font-bold text-white mix-blend-difference leading-none ${archivo.className}`}
          >
            dayjob
          </h2>
        </div>

        {/* Desktop Icons - Separate layer for interactivity */}
        <div className='absolute top-0 left-0 right-0 bottom-0 overflow-hidden z-30'>
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
        <div className='hidden md:block absolute bottom-8 left-1/2 -translate-x-1/2 z-10 pointer-events-none'>
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

      {/* Content wrapper with shared background */}
      <div className='relative bg-[#E4E3E3] z-10'>
        {/* Grain overlay */}
        <div
          className='absolute inset-0 pointer-events-none opacity-[0.08]'
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Info Content - Vertical 5-Column Layout */}
        <div className='relative px-4 md:px-8 pt-16 pb-16'>
          <div className='flex flex-col gap-8 text-foreground'>
            {/* Brief Section */}
            <div>
              <h3 className={`text-xl font-bold  border-b-2 border-neutral-500 pb-2 mb-4 ${archivo.className}`}>
                brief
              </h3>
              <div className='grid grid-cols-1 md:grid-cols-5 gap-y-2 text-sm'>
                <div className='hidden md:block'></div>
                <div className='hidden md:block'></div>
                <div className='hidden md:block'></div>
                <div className='md:col-span-2'>
                  <p className='leading-relaxed'>
                    A selection of freelance web projects I have worked on over the years. These range from small
                    portfolio sites to larger business websites, showcasing my experience in web development and design.
                  </p>
                </div>
              </div>
            </div>

            {/* Idea Section */}
            <div>
              <h3 className={`text-xl font-bold  border-b-2 border-neutral-500 pb-2 mb-4 ${archivo.className}`}>
                idea
              </h3>
              <div className='grid grid-cols-1 md:grid-cols-5 gap-y-2 text-sm'>
                <div className='hidden md:block'></div>
                <div className='hidden md:block'></div>
                <div className='hidden md:block'></div>
                <div className='md:col-span-2'>
                  <p className='leading-relaxed'>
                    I started freelancing because I wanted to move towards more creative and challenging work.
                    Freelancing allows me to choose projects that align with my interests and skills, while also
                    providing the flexibility to manage my own time and work environment..
                  </p>
                </div>
              </div>
            </div>

            {/* specifications Section */}
            <div>
              <h3 className={`text-xl font-bold  border-b-2 border-neutral-500 pb-2 mb-4 ${archivo.className}`}>
                specifications
              </h3>
              <div className='grid grid-cols-2 md:grid-cols-5 gap-y-2 text-sm'>
                <div className='hidden md:block'></div>
                <div className='font-bold md:text-right'>Year</div>
                <div className='hidden md:block'></div>
                <div className='md:col-span-2'>2021-Ongoing</div>

                <div className='hidden md:block'></div>
                <div className='font-bold md:text-right'>For</div>
                <div className='hidden md:block'></div>
                <div className='md:col-span-2'>Various Clients</div>

                <div className='hidden md:block'></div>
                <div className='font-bold md:text-right'>Type</div>
                <div className='hidden md:block'></div>
                <div className='md:col-span-2'>Web Design & Development</div>

                <div className='hidden md:block'></div>
                <div className='font-bold md:text-right'>Tech</div>
                <div className='hidden md:block'></div>
                <div className='md:col-span-2'>React, Next.js, TypeScript, Tailwind, WordPress, PHP</div>

                <div className='hidden md:block'></div>
                <div className='font-bold md:text-right'>Services</div>
                <div className='hidden md:block'></div>
                <div className='md:col-span-2'>Design, Development, Consulting, Hosting, Maintenance</div>
              </div>
            </div>

            {/* learnings Section */}
            <div>
              <h3 className={`text-xl font-bold  border-b-2 border-neutral-500 pb-2 mb-4 ${archivo.className}`}>
                learnings
              </h3>
              <div className='grid grid-cols-1 md:grid-cols-5 gap-y-2 text-sm'>
                <div className='hidden md:block'></div>
                <div className='hidden md:block'></div>
                <div className='hidden md:block'></div>
                <div className='md:col-span-2'>
                  <ul className='list-disc list-outside pl-3 space-y-1'>
                    <li>Client communication</li>
                    <li>Clear boundaries and scope</li>
                    <li>Documentation</li>
                    <li>Continuous learning</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* credits Section */}
            <div>
              <h3 className={`text-xl font-bold  border-b-2 border-neutral-500 pb-2 mb-4 ${archivo.className}`}>
                credits
              </h3>
              <div className='grid grid-cols-2 md:grid-cols-5 gap-y-2 text-sm'>
                <div className='hidden md:block'></div>
                <div className='font-bold md:text-right'>Solo Projects</div>
                <div className='hidden md:block'></div>
                <div className='md:col-span-2'>Till Solenthaler</div>

                <div className='hidden md:block'></div>
                <div className='font-bold md:text-right'>AI Declaration</div>
                <div className='hidden md:block'></div>
                <div className='md:col-span-2'>Claude Code for recent projects</div>
              </div>
            </div>
          </div>
        </div>

        {/* Process Section */}
        <div className='relative px-4 md:px-8 pt-12 pb-16'>
          <h3 className={`text-xl font-bold  border-b-2 border-neutral-500 pb-2 mb-6 ${archivo.className}`}>process</h3>

          {(() => {
            const PROCESS_STEPS: {
              title: string;
              text: string;
              image: string;
              objectFit: 'cover' | 'contain';
            }[] = [
              {
                title: '01. DISCOVERY',
                text: 'Initial meeting to understand client needs, goals, and target audience. Define project scope and timeline.',
                image: '/dayjob/bg.jpg',
                objectFit: 'cover',
              },
              {
                title: '02. DESIGN',
                text: 'Create wireframes and visual designs in Figma. Tailor style and design language to client needs.',
                image: '/dayjob/screenshots/dayjob-process-design.png',
                objectFit: 'cover',
              },
              {
                title: '03. DEVELOP',
                text: 'Build the website using open source technologies. Nowadays mostly with Claude Code and Agents.',
                image: '/dayjob/screenshots/dayjob-process-develop.png',
                objectFit: 'cover',
              },
              {
                title: '04. LAUNCH',
                text: 'Fill content, test for speed, accessibility and seo. Deploy to hosting and set up analytics. Train client on content management.',
                image: '/dayjob/screenshots/brookejackson-screenshot.jpg',
                objectFit: 'cover',
              },
              {
                title: '05. MAINTAIN & OPTIMIZE',
                text: 'Ongoing support, updates, and improvements. Monitor search engine performance and security.',
                image: '/dayjob/screenshots/dayjob-process-optimize.png',
                objectFit: 'cover',
              },
            ];
            return (
              <div className='flex flex-col lg:flex-row lg:items-stretch gap-6'>
                {/* Left: Process List */}
                <div className='order-2 lg:order-1 lg:w-2/5 space-y-3'>
                  {PROCESS_STEPS.map((step, index) => {
                    const isActive = selectedProcessIndex === index;
                    return (
                      <div
                        key={index}
                        onClick={() => setSelectedProcessIndex(index)}
                        className={`w-full p-3 rounded-lg transition-all text-left flex flex-col md:flex-row md:items-center gap-3 lg:cursor-pointer ${
                          isActive ? 'bg-white lg:bg-blue-500' : 'bg-white lg:hover:bg-white/80'
                        }`}
                      >
                        <div className='relative w-full aspect-square md:w-20 md:h-20 flex-shrink-0 overflow-hidden rounded-lg ring-1 ring-neutral-400/80 bg-white'>
                          <Image
                            src={step.image}
                            alt={`${step.title} thumbnail`}
                            fill
                            className={step.objectFit === 'contain' ? 'object-contain p-2' : 'object-cover'}
                          />
                        </div>
                        <div className='flex-1'>
                          <span className={`font-bold block ${isActive ? 'lg:text-white' : ''}`}>{step.title}</span>
                          <span
                            className={`text-sm ${isActive ? 'lg:text-white/90 text-foreground/80' : 'text-foreground/80'}`}
                          >
                            {step.text}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Right: Selected Image - Desktop only */}
                <div className='hidden lg:flex order-1 lg:order-2 lg:w-3/5'>
                  <div className='relative w-full rounded-lg overflow-hidden bg-white'>
                    <Image
                      src={PROCESS_STEPS[selectedProcessIndex]?.image || PROCESS_STEPS[0].image}
                      alt={PROCESS_STEPS[selectedProcessIndex]?.title || 'Process step'}
                      fill
                      className={
                        PROCESS_STEPS[selectedProcessIndex]?.objectFit === 'contain'
                          ? 'object-contain p-8'
                          : 'object-cover'
                      }
                    />
                  </div>
                </div>
              </div>
            );
          })()}
        </div>

        {/* Project Navigation */}
        <div className='relative px-4 md:px-8 pb-16'>
          <div className='flex justify-between items-center border-b-2 border-black pb-2'>
            <h1
              onClick={() => navigateTo('/lost-in-space')}
              className='font-bold cursor-pointer lowercase text-[clamp(0.625rem,3vh,1rem)] md:text-[clamp(0.875rem,4vh,4rem)] leading-none hover:opacity-60 transition-opacity'
            >
              previous
            </h1>
            <h1
              onClick={() => navigateTo('/under-construction')}
              className='font-bold cursor-pointer lowercase text-[clamp(0.625rem,3vh,1rem)] md:text-[clamp(0.875rem,4vh,4rem)] leading-none hover:opacity-60 transition-opacity'
            >
              next
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}
