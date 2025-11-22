import Link from 'next/link';

export function About() {
  return (
    <section id='about' className='h-screen flex items-center justify-center snap-start'>
      <div className='max-w-2xl text-center'>
        <h2 className='text-4xl font-bold mb-6'>About</h2>
        <p className='text-lg text-muted-foreground'>This is the about section.</p>
        <Link href='/about'>about</Link>
      </div>
    </section>
  );
}
