'use client';

import { Welcome } from '@/components/sections/welcome';
import { Project1 } from '@/components/sections/project-1';
import { Project2 } from '@/components/sections/project-2';
import { Project3 } from '@/components/sections/project-3';
import { Project4 } from '@/components/sections/project-4';
import { Project5 } from '@/components/sections/project-5';
import { Project6 } from '@/components/sections/project-6';
import { Project7 } from '@/components/sections/project-7';
import { About } from '@/components/sections/about';
import { FullPageScroll } from '@/components/fullpage-scroll-motion';

export default function Home() {
  return (
    <FullPageScroll>
      <Welcome />
      <Project1 />
      <Project2 />
      <Project3 />
      <Project4 />
      <Project5 />
      <Project6 />
      <Project7 />
      <About />
    </FullPageScroll>
  );
}
