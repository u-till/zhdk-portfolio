'use client';

import { useState } from 'react';
import { DockItem } from '@/types/macos';
import { DockItemComponent } from './dock-item';

interface DockProps {
  items: DockItem[];
  onItemClick: (id: string) => void;
}

export function Dock({ items, onItemClick }: DockProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      <div className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl p-2 flex gap-2">
        {items.map((item, index) => (
          <DockItemComponent
            key={item.id}
            item={item}
            index={index}
            hoveredIndex={hoveredIndex}
            onHoverStart={() => setHoveredIndex(index)}
            onHoverEnd={() => setHoveredIndex(null)}
            onClick={() => onItemClick(item.id)}
          />
        ))}
      </div>
    </div>
  );
}
