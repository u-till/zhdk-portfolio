import { CDPlayer } from '@/components/cd-player';
import { StarField } from '@/components/star-field';
import { orbitron } from '@/lib/fonts';

export function Project5() {
  return (
    <section
      id='project-5'
      className='h-screen flex flex-col items-center snap-start relative overflow-hidden pt-32 gap-16'
    >
      <StarField />
      <h2
        className={`text-8xl font-bold text-white relative z-10 ${orbitron.className}`}
        style={{ transform: 'perspective(300px) rotateX(25deg)' }}
      >
        LOST IN SPACE
      </h2>
      <div className='absolute inset-0 z-10'>
        <CDPlayer />
      </div>
    </section>
  );
}
