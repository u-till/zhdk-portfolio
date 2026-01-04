'use client';

import { BrowserWindow } from '@/components/dayjob/browser-window';
import { DesktopIcon } from '@/components/dayjob/desktop-icon';
import { Dock } from '@/components/dayjob/dock';
import { MobileGrid } from '@/components/dayjob/mobile-grid';
import { TerminalWindow } from '@/components/dayjob/terminal-window';
import { TextWindow } from '@/components/dayjob/text-window';
import { useIsMobile } from '@/hooks/use-is-mobile';
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
    isMinimized: false,
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
    isMinimized: false,
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
    isMinimized: false,
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
    isMinimized: false,
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
    isMinimized: false,
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
    isMinimized: false,
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
    isMinimized: false,
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
    isMinimized: false,
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

export function Project7() {
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
              isMinimized: false,
              zIndex: newZ,
            }
          : w
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
    <section className='h-screen overflow-hidden relative'>
      {/* Background - Full Screen */}
      <Image src='/dayjob/bg.jpg' alt='Desktop Background' fill className='object-cover' priority />

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
          .filter((w) => w.isOpen && !w.isMinimized)
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
    </section>
  );
}
