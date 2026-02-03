'use client';

import { DockItem } from '@/types/macos';
import { motion } from 'framer-motion';
import Image from 'next/image';
import React, { useState } from 'react';

interface DockItemProps {
  item: DockItem;
}

export const DockItemComponent = React.memo(function DockItemComponent({ item }: DockItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (item.url) {
      window.open(item.url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className='cursor-pointer relative flex items-end justify-center w-14 h-14'
      aria-label={`Open ${item.label}`}
    >
      <Image
        src={item.icon}
        alt={item.label}
        width={56}
        height={56}
        className='w-full h-full rounded-xl object-contain'
        draggable={false}
      />

      {/* Tooltip */}
      {isHovered && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 5 }}
          transition={{ duration: 0.15 }}
          className='absolute -top-12 left-1/2 -translate-x-1/2 text-white text-xs px-2.5 py-1.5 rounded-md whitespace-nowrap pointer-events-none shadow-lg'
          style={{ backgroundColor: '#565758' }}
        >
          {item.label}
          {/* Pointer triangle */}
          <div
            className='absolute left-1/2 -translate-x-1/2 -bottom-1'
            style={{
              width: 0,
              height: 0,
              borderLeft: '4px solid transparent',
              borderRight: '4px solid transparent',
              borderTop: '4px solid #565758',
            }}
          />
        </motion.div>
      )}
    </button>
  );
});
