'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { DockItem } from '@/types/macos';

interface DockItemProps {
  item: DockItem;
  index: number;
  hoveredIndex: number | null;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  onClick: () => void;
}

function getScale(index: number, hoveredIndex: number | null): number {
  if (hoveredIndex === null) return 1;
  const distance = Math.abs(index - hoveredIndex);
  if (distance === 0) return 1.6; // Hovered item
  if (distance === 1) return 1.3; // Adjacent
  if (distance === 2) return 1.1; // Next adjacent
  return 1; // Rest
}

export function DockItemComponent({
  item,
  index,
  hoveredIndex,
  onHoverStart,
  onHoverEnd,
  onClick,
}: DockItemProps) {
  const scale = getScale(index, hoveredIndex);
  const isHovered = hoveredIndex === index;

  return (
    <motion.button
      animate={{
        scale,
        y: isHovered ? -8 : 0,
      }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      onClick={onClick}
      className="relative flex items-end justify-center origin-bottom"
      style={{ height: '64px', width: '64px' }}
      aria-label={`Open ${item.label}`}
    >
      <Image
        src={item.icon}
        alt={item.label}
        width={64}
        height={64}
        className="rounded-lg"
      />

      {/* Tooltip */}
      {isHovered && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -top-10 bg-neutral-800/90 text-white text-xs px-2 py-1 rounded whitespace-nowrap pointer-events-none"
        >
          {item.label}
        </motion.div>
      )}
    </motion.button>
  );
}
