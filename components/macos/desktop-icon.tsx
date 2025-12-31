'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface DesktopIconProps {
  onOpen: () => void;
}

export function DesktopIcon({ onOpen }: DesktopIconProps) {
  const [clickCount, setClickCount] = useState(0);
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    if (clickCount === 0) return;

    const timer = setTimeout(() => {
      if (clickCount === 2) {
        onOpen();
        setIsSelected(false);
      } else if (clickCount === 1) {
        setIsSelected(true);
      }
      setClickCount(0);
    }, 300);

    return () => clearTimeout(timer);
  }, [clickCount, onOpen]);

  const handleClick = () => {
    setClickCount((prev) => prev + 1);
  };

  return (
    <motion.button
      onClick={handleClick}
      whileHover={{ scale: 1.05 }}
      className="absolute top-24 left-8 flex flex-col items-center gap-1 p-2 rounded-lg transition-colors select-none"
      style={{
        backgroundColor: isSelected ? 'rgba(59, 130, 246, 0.3)' : 'transparent',
      }}
    >
      {/* Text File Icon */}
      <svg
        width="64"
        height="64"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-lg"
      >
        {/* Document shape */}
        <path
          d="M12 4C10.8954 4 10 4.89543 10 6V58C10 59.1046 10.8954 60 12 60H52C53.1046 60 54 59.1046 54 58V16L42 4H12Z"
          fill="white"
        />
        <path
          d="M42 4V14C42 15.1046 42.8954 16 44 16H54L42 4Z"
          fill="#E5E7EB"
        />
        {/* Text lines */}
        <line x1="18" y1="24" x2="46" y2="24" stroke="#6B7280" strokeWidth="2" />
        <line x1="18" y1="30" x2="46" y2="30" stroke="#6B7280" strokeWidth="2" />
        <line x1="18" y1="36" x2="38" y2="36" stroke="#6B7280" strokeWidth="2" />
        <line x1="18" y1="42" x2="42" y2="42" stroke="#6B7280" strokeWidth="2" />
        <line x1="18" y1="48" x2="46" y2="48" stroke="#6B7280" strokeWidth="2" />
      </svg>

      {/* Label */}
      <span
        className="text-xs text-white font-medium px-1 py-0.5 rounded"
        style={{
          textShadow: '0 1px 2px rgba(0, 0, 0, 0.8)',
        }}
      >
        info.txt
      </span>
    </motion.button>
  );
}
