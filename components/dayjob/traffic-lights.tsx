'use client';

interface TrafficLightsProps {
  onClose: () => void;
  onMaximize: () => void;
  maskId?: string;
}

export function TrafficLights({ onClose, onMaximize, maskId = 'diagonalCut' }: TrafficLightsProps) {
  return (
    <div className='flex gap-2 group'>
      {/* Close */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className='cursor-pointer w-3 h-3 rounded-full bg-[#FF5F57] transition-colors relative'
        aria-label='Close'
      >
        <svg
          width='7'
          height='7'
          viewBox='0 0 6 6'
          className='absolute inset-0 m-auto opacity-0 group-hover:opacity-100 transition-opacity'
        >
          <path d='M1 1L5 5M5 1L1 5' stroke='#A00503' strokeWidth='1' strokeLinecap='round' />
        </svg>
      </button>

      {/* Minimize (Close) */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className='cursor-pointer w-3 h-3 rounded-full bg-[#FEBC2E] transition-colors relative'
        aria-label='Close'
      >
        <svg
          width='7'
          height='7'
          viewBox='0 0 6 6'
          className='absolute inset-0 m-auto opacity-0 group-hover:opacity-100 transition-opacity'
        >
          <path d='M1 3H5' stroke='#975601' strokeWidth='1' strokeLinecap='round' />
        </svg>
      </button>

      {/* Maximize */}
      <button
        className='cursor-pointer w-3 h-3 rounded-full bg-[#28C840] transition-colors relative'
        aria-label='Maximize'
        onClick={(e) => {
          e.stopPropagation();
          onMaximize();
        }}
      >
        <svg
          width='7'
          height='7'
          viewBox='0 0 6 6'
          className='absolute inset-0 m-auto opacity-0 group-hover:opacity-100 transition-opacity'
        >
          <defs>
            <mask id={maskId}>
              <rect width='6' height='6' fill='white' />
              <line x1='0' y1='0' x2='6' y2='6' stroke='black' strokeWidth='0.8' />
            </mask>
          </defs>
          <rect x='1' y='1' width='4' height='4' rx='0.5' fill='#006201' mask={`url(#${maskId})`} />
        </svg>
      </button>
    </div>
  );
}
