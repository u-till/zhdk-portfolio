import { vt323 } from '@/lib/fonts';

export function Project3() {
  return (
    <section className='h-screen flex flex-col relative overflow-hidden'>
      <div className='absolute inset-x-0 top-0 pt-32 md:pt-42 flex justify-center pointer-events-none z-10'>
        <h2 className={`text-5xl lg:text-7xl font-bold ${vt323.className}`}>amped up</h2>
      </div>
    </section>
  );
}
