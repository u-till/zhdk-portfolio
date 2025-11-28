import { vt323 } from '@/lib/fonts';

export function Project3() {
  return (
    <section className='h-screen flex flex-col relative overflow-hidden'>
      <div className='absolute inset-x-0 top-0 pt-24 md:pt-36 flex justify-center pointer-events-none z-10'>
        <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold ${vt323.className}`}>amped up</h2>
      </div>
    </section>
  );
}
