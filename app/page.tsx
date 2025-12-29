'use client';

import { Welcome } from '@/components/sections/welcome';
import { Project1 } from '@/components/sections/1-under-construction';
import { Project2 } from '@/components/sections/2-retrofitted';
import { Project3 } from '@/components/sections/3-amped-up';
import { Project4 } from '@/components/sections/4-toy-lexicon';
import { Project5 } from '@/components/sections/5-lost-in-space';
import { Project6 } from '@/components/sections/6-saudade';
import { Project7 } from '@/components/sections/7-dayjob';
import { About } from '@/components/sections/about';
import { SectionNavigator } from '@/components/section-navigator';

export default function Home() {
  return (
    <SectionNavigator>
      <Welcome />
      <Project1 />
      <Project2 />
      <Project3 />
      <Project4 />
      <Project5 />
      <Project6 />
      <Project7 />
      <About />
    </SectionNavigator>
  );
}
