'use client';

import { useIsMobile } from '@/hooks/use-is-mobile';
import { DockItem, WindowState } from '@/types/macos';
import Image from 'next/image';
import { useCallback, useState } from 'react';
import { DesktopIcon } from './desktop-icon';
import { Dock } from './dock';
import { MobileGrid } from './mobile-grid';
import { Window } from './window';

export const DOCK_ITEMS: DockItem[] = [
  {
    id: 'hannibal',
    label: 'Hannibal',
    icon: '/dayjob/icons/icon.png',
    url: 'https://hannibal.ch',
  },
  {
    id: 'fabio',
    label: 'Fabio Tozzo',
    icon: '/dayjob/icons/icon.png',
    url: 'https://fabiotozzo.com',
  },
  {
    id: 'swing',
    label: 'Swing',
    icon: '/dayjob/icons/icon.png',
    url: 'https://swing.ch',
  },
  {
    id: 'narrative',
    label: 'Another Narrative',
    icon: '/dayjob/icons/icon.png',
    url: 'https://anothernarrative.studio',
  },
  {
    id: 'brooke',
    label: 'Brooke Jackson',
    icon: '/dayjob/icons/icon.png',
    url: 'https://brookejackson.ch',
  },
];

export function Desktop() {
  const isMobile = useIsMobile(768);
  const [highestZIndex, setHighestZIndex] = useState(10);

  const [windows, setWindows] = useState<WindowState[]>([
    {
      id: 'hannibal',
      url: 'https://hannibal.ch',
      title: 'hannibal.ch',
      isOpen: false,
      isMinimized: false,
      zIndex: 10,
      position: { x: 100, y: 100 },
      size: { width: 1000, height: 700 },
      type: 'browser',
    },
    {
      id: 'fabio',
      url: 'https://fabiotozzo.com',
      title: 'fabiotozzo.com',
      isOpen: false,
      isMinimized: false,
      zIndex: 10,
      position: { x: 120, y: 100 },
      size: { width: 1000, height: 700 },
      type: 'browser',
    },
    {
      id: 'swing',
      url: 'https://swing.ch',
      title: 'swing.ch',
      isOpen: false,
      isMinimized: false,
      zIndex: 10,
      position: { x: 140, y: 100 },
      size: { width: 1000, height: 700 },
      type: 'browser',
    },
    {
      id: 'narrative',
      url: 'https://anothernarrative.studio',
      title: 'anothernarrative.studio',
      isOpen: false,
      isMinimized: false,
      zIndex: 10,
      position: { x: 160, y: 120 },
      size: { width: 1000, height: 700 },
      type: 'browser',
    },
    {
      id: 'brooke',
      url: 'https://brookejackson.ch',
      title: 'brookejackson.ch',
      isOpen: false,
      isMinimized: false,
      zIndex: 10,
      position: { x: 180, y: 140 },
      size: { width: 1000, height: 700 },
      type: 'browser',
    },
    {
      id: 'info',
      title: 'info.txt',
      isOpen: false,
      isMinimized: false,
      zIndex: 10,
      position: { x: 200, y: 160 },
      size: { width: 600, height: 400 },
      type: 'text',
    },
  ]);

  const openWindow = useCallback(
    (id: string) => {
      setWindows((prev) =>
        prev.map((w) =>
          w.id === id
            ? {
                ...w,
                isOpen: true,
                isMinimized: false,
                zIndex: highestZIndex + 1,
              }
            : w
        )
      );
      setHighestZIndex((prev) => prev + 1);
    },
    [highestZIndex]
  );

  const closeWindow = useCallback((id: string) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, isOpen: false } : w)));
  }, []);

  const focusWindow = useCallback(
    (id: string) => {
      setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, zIndex: highestZIndex + 1 } : w)));
      setHighestZIndex((prev) => prev + 1);
    },
    [highestZIndex]
  );

  const minimizeWindow = useCallback((id: string) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, isMinimized: true } : w)));
  }, []);

  if (isMobile) {
    return <MobileGrid items={DOCK_ITEMS} />;
  }

  return (
    <section className='h-screen overflow-hidden relative'>
      {/* Background - Full Screen */}
      <Image src='/dayjob/bg.jpg' alt='Desktop Background' fill className='object-cover' priority />

      {/* Virtual Desktop - Constrained Area */}
      <div className='absolute top-20 md:top-24 left-0 right-0 bottom-0 overflow-hidden'>
        {/* Desktop Icon for info.txt */}
        <DesktopIcon onOpen={() => openWindow('info')} />

        {/* Windows */}
        {windows
          .filter((w) => w.isOpen && !w.isMinimized)
          .map((window) => (
            <Window
              key={window.id}
              id={window.id}
              title={window.title}
              url={window.url}
              type={window.type}
              position={window.position}
              size={window.size}
              zIndex={window.zIndex}
              onClose={() => closeWindow(window.id)}
              onFocus={() => focusWindow(window.id)}
              onMinimize={() => minimizeWindow(window.id)}
            />
          ))}

        {/* Dock */}
        <Dock items={DOCK_ITEMS} onItemClick={openWindow} />
      </div>
    </section>
  );
}
