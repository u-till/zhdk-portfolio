import { allertaStencil } from '@/lib/fonts';
import Image from 'next/image';

export function Project1() {
  return (
    <section id='project-1' className='h-screen flex items-center justify-center snap-start'>
      <div className='flex flex-row w-full px-6'>
        <div className='max-w-lg'>
          <Image alt='korpus' src='/under-construction/korpus.png' width='1191' height='1551' />
        </div>
        <h2 className={`mt-32 text-6xl font-bold ${allertaStencil.className}`}>under construction</h2>
      </div>
    </section>
  );
}
