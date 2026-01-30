'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <section className='h-screen flex flex-col items-center justify-center px-4 bg-background text-foreground'>
      <h1 className='text-6xl font-bold mb-4'>404</h1>
      <p className='text-xl text-muted-foreground mb-8'>Page not found</p>
      <Link
        href='/'
        className='px-6 py-3 rounded-sm border-2 border-black hover:bg-black hover:text-white transition-colors'
      >
        Go back home
      </Link>
    </section>
  );
}
