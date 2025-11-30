import { CDPlayer } from '@/components/cd-player';
import { StarField } from '@/components/star-field';
import { orbitron } from '@/lib/fonts';

export function Project5() {
  return (
    <section className='h-screen flex flex-col relative overflow-hidden pt-32 md:pt-42 gap-8'>
      <StarField />
      <div className='flex justify-center max-w-6xl mx-auto w-full px-4 md:px-6'>
        <h2
          className={`text-5xl lg:text-7xl font-bold text-white ${orbitron.className}`}
          style={{ transform: 'perspective(300px) rotateX(25deg)' }}
        >
          LOST IN SPACE
        </h2>
      </div>
      <div className='absolute inset-0 top-auto z-10 max-w-6xl mx-auto px-4 md:px-6'>
        <CDPlayer />
      </div>
    </section>
  );
}
