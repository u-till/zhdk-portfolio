export function MobileMenuToggle({ menuOpen }: { menuOpen: boolean }) {
  return (
    <svg
      className='stroke-current transition-transform duration-500'
      width='30'
      height='30'
      viewBox='0 0 30 30'
      xmlns='http://www.w3.org/2000/svg'
    >
      <line
        x1='0'
        x2='30'
        strokeWidth='4'
        y1='10'
        y2='10'
        className={`transition-all duration-500 ${menuOpen ? 'rotate-45-center' : ''}`}
      />
      <line
        x1='0'
        x2='30'
        strokeWidth='4'
        y2='20'
        y1='20'
        className={`transition-all duration-500 ${menuOpen ? 'rotate--45-center' : ''}`}
      />
    </svg>
  );
}
