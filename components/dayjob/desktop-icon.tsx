'use client';

import { motion } from 'framer-motion';

interface DesktopIconProps {
  onOpen: () => void;
  isWindowOpen: boolean;
  iconType: 'text' | 'terminal';
  label: string;
  positionClass?: string;
}

export function DesktopIcon({
  onOpen,
  isWindowOpen,
  iconType,
  label,
  positionClass = 'top-42 right-16',
}: DesktopIconProps) {
  const handleClick = () => {
    onOpen();
  };

  return (
    <motion.button
      onClick={handleClick}
      className={`cursor-pointer absolute p-2 rounded-lg transition-colors select-none ${positionClass}`}
    >
      {/* Icon */}
      <div
        className='rounded-lg transition-all p-1 w-[68px] h-[68px] flex items-center justify-center mx-auto'
        style={{
          backgroundColor: isWindowOpen ? 'rgba(127, 136, 153, 0.4)' : 'transparent',
          border: isWindowOpen ? '1px solid rgba(126, 134, 150, 0.6)' : '1px solid transparent',
        }}
      >
        {iconType === 'text' ? (
          <svg
            width='64'
            height='64'
            viewBox='0 0 64 64'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className='drop-shadow-lg'
          >
            {/* Document shape */}
            <path
              d='M12 4C10.8954 4 10 4.89543 10 6V58C10 59.1046 10.8954 60 12 60H52C53.1046 60 54 59.1046 54 58V16L42 4H12Z'
              fill='white'
            />
            <path d='M42 4V14C42 15.1046 42.8954 16 44 16H54L42 4Z' fill='#E5E7EB' />
            {/* Text lines */}
            <line x1='18' y1='24' x2='46' y2='24' stroke='#6B7280' strokeWidth='2' />
            <line x1='18' y1='30' x2='46' y2='30' stroke='#6B7280' strokeWidth='2' />
            <line x1='18' y1='36' x2='38' y2='36' stroke='#6B7280' strokeWidth='2' />
            <line x1='18' y1='42' x2='42' y2='42' stroke='#6B7280' strokeWidth='2' />
            <line x1='18' y1='48' x2='46' y2='48' stroke='#6B7280' strokeWidth='2' />
          </svg>
        ) : (
          <svg
            width='64'
            height='64'
            viewBox='0 0 64 64'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className='drop-shadow-lg'
          >
            {/* Silver outer border */}
            <rect rx='4' fill='#A8A8A8' width='50' height='50' x='6' y='6' />
            {/* Black inner border */}
            <rect rx='3' fill='#1A1A1A' width='48' height='48' x='7' y='7' />
            {/* Dark grey background */}
            <rect rx='2' fill='#3A3A3A' height='42' width='42' y='10' x='10' />
            {/* Terminal prompt */}
            <text fontFamily='monospace' fontSize='10' x='16' y='24' fill='white' fontWeight='bold'>
              &gt; _
            </text>
          </svg>
        )}
      </div>

      {/* Label */}
      <span
        className='absolute top-20 left-1/2 -translate-x-1/2 text-xs text-white font-medium px-1.5 py-1 rounded transition-colors whitespace-nowrap'
        style={{
          textShadow: '0 1px 2px rgba(0, 0, 0, 0.8)',
          backgroundColor: isWindowOpen ? '#027BFF' : 'transparent',
        }}
      >
        {label}
      </span>
    </motion.button>
  );
}
