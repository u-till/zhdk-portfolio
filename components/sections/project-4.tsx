'use client';

import { doto } from '@/lib/fonts';
import { motion } from 'framer-motion';
import Image from 'next/image';

export function Project4() {
  return (
    <section className='h-screen flex flex-col relative overflow-hidden pt-32 md:pt-42 gap-8'>
      <div className='flex justify-center max-w-6xl mx-auto w-full px-4 md:px-6'>
        <h2 className={`text-5xl lg:text-7xl font-bold ${doto.className}`}>toy lexicon</h2>
      </div>
      <div className='flex-1 flex flex-col md:flex-row items-center justify-center px-4 md:px-6 gap-6 md:gap-16 max-w-6xl mx-auto'>
        <motion.div
          className='w-full md:flex-[2] max-w-md md:max-w-none'
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <Image
            alt='Toy Lexicon Book Mockup'
            src='/toy-lexicon/front-mockup-small.png'
            width='900'
            height='1200'
            className='w-full h-auto'
            quality={100}
          />
        </motion.div>
        <div className='w-full md:flex-[1] flex flex-col gap-4 md:gap-6 text-center md:text-left'>
          <p className='text-sm md:text-lg leading-relaxed max-w-xl mx-auto md:mx-0'>
            A visual exploration of childhood objects and their meanings. This lexicon captures the essence of toys
            through photography and thoughtful documentation, creating a reference book that bridges nostalgia and
            contemporary design.
          </p>
        </div>
      </div>
    </section>
  );
}
