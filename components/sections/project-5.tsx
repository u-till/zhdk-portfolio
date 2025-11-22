import { orbitron } from '@/lib/fonts';
import { StarField } from '@/components/star-field';

export function Project5() {
  return (
    <section id='project-5' className='h-screen flex items-center justify-center snap-start relative overflow-hidden'>
      <StarField />
      <h2 className={`text-4xl font-bold text-white relative z-10 ${orbitron.className}`}>lost in space</h2>
    </section>
  );
}
