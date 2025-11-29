import { CDPlayer } from '@/components/cd-player';
import { StarField } from '@/components/star-field';
import { orbitron } from '@/lib/fonts';

export function Project5() {
  return (
    <section className='h-screen flex flex-col relative overflow-hidden'>
      <StarField />
      <div className='absolute inset-x-0 top-0 pt-32 md:pt-42 flex justify-center pointer-events-none z-10'>
        <h2
          className={`text-5xl lg:text-7xl font-bold text-white ${orbitron.className}`}
          style={{ transform: 'perspective(300px) rotateX(25deg)' }}
        >
          LOST IN SPACE
        </h2>
      </div>
      <div className='absolute inset-0 z-10'>
        <CDPlayer />
      </div>
    </section>
  );
}
