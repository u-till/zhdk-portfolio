'use client';

import { DockItem } from '@/types/macos';
import React from 'react';
import { DockItemComponent } from './dock-item';

interface DockProps {
  items: DockItem[];
  onItemClick: (id: string) => void;
}

export function Dock({ items, onItemClick }: DockProps) {
  return (
    <div className='fixed bottom-4 left-1/2 -translate-x-1/2 z-100'>
      <div
        className='bg-[#65656ba1] backdrop-blur-2xl rounded-2xl px-3 py-3 flex gap-2 items-center'
        style={{
          boxShadow:
            '0 10px 40px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1), inset 0 0 0 2px #a5a5a543, 0 0 0 1px #61616065',
        }}
      >
        {items.map((item, index) => (
          <React.Fragment key={item.id}>
            <DockItemComponent item={item} onClick={() => onItemClick(item.id)} />
            {index === 0 && <div className='h-12 w-px bg-black/10 mx-1' aria-hidden='true' />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
