'use client';

import { Dock } from '@/components/dayjob/dock';
import { Lightbox } from '@/components/traces/lightbox';
import { useNavigation } from '@/contexts/navigation-context';
import { archivo } from '@/lib/fonts';
import { DockItem } from '@/types/macos';
import Image from 'next/image';
import { useState } from 'react';

const DOCK_ITEMS: DockItem[] = [
  { id: 'utill', label: 'utill.ch', icon: '/dayjob/icons/utill-logo.jpg', url: 'https://utill.ch' },
  { id: 'hannibal', label: 'hannibal.ch', icon: '/dayjob/icons/hannibal-icon.png', url: 'https://hannibal.ch' },
  { id: 'fabio', label: 'fabiotozzo.com', icon: '/dayjob/icons/fabiotozzo-icon.png', url: 'https://fabiotozzo.com' },
  { id: 'swing', label: 'swing.ch', icon: '/dayjob/icons/swing-icon.jpg', url: 'https://swing.ch' },
  {
    id: 'njk',
    label: 'nicolaijaronkager.ch',
    icon: '/dayjob/icons/cropped-favicon-njk-2-192x192.png',
    url: 'https://nicolaijaronkager.ch',
  },
  {
    id: 'narrative',
    label: 'anothernarrative.studio',
    icon: '/dayjob/icons/anothernarrative-icon.png',
    url: 'https://anothernarrative.studio',
  },
  {
    id: 'brooke',
    label: 'brookejackson.ch',
    icon: '/dayjob/icons/brookejackson-icon.png',
    url: 'https://brookejackson.ch',
  },
];

const PROCESS_STEPS = [
  {
    title: '01. DISCOVERY',
    text: 'Initial meeting to understand client needs, goals, and target audience. Define project scope and timeline.',
    image: '/dayjob/bg.jpg',
  },
  {
    title: '02. STRUCTURE & DESIGN',
    text: 'Create sitemap, wireframes, design-system and views in Figma. Tailor style and design language to client needs.',
    image: '/dayjob/screenshots/dayjob-process-design.png',
  },
  {
    title: '03. DEVELOP',
    text: 'Build the website using open source technologies. Nowadays mostly with Claude Code and Agents.',
    image: '/dayjob/screenshots/dayjob-process-develop.png',
  },
  {
    title: '04. LAUNCH',
    text: 'Fill content, test for speed, accessibility and seo. Deploy to hosting and set up analytics. Train client on content management.',
    image: '/dayjob/screenshots/brookejackson-screenshot.jpg',
  },
  {
    title: '05. MAINTAIN & OPTIMIZE',
    text: 'Ongoing support, updates, and improvements. Monitor search engine performance and security.',
    image: '/dayjob/screenshots/dayjob-process-optimize.png',
  },
];

export default function DayjobPage() {
  const { navigateTo } = useNavigation();
  const [selectedProcessIndex, setSelectedProcessIndex] = useState(0);
  const [lightboxImage, setLightboxImage] = useState<{ src: string; title?: string } | null>(null);

  return (
    <section>
      {/* Hero: Video + Dock */}
      <div className='h-screen relative overflow-hidden'>
        <div className='absolute inset-0 isolate'>
          <video autoPlay loop muted playsInline className='absolute inset-0 w-full h-full object-cover object-bottom'>
            <source src='/dayjob/dayjob-trailer.mp4' type='video/mp4' />
          </video>
          <h1
            className={`absolute bottom-4 md:bottom-8 left-4 md:left-8 text-[clamp(1.75rem,8vh,3rem)] md:text-[clamp(1.75rem,8vh,8rem)] font-bold text-white mix-blend-difference leading-none pointer-events-none ${archivo.className}`}
          >
            dayjob
          </h1>
        </div>

        <Dock items={DOCK_ITEMS} />
      </div>

      {/* Content */}
      <div className='relative bg-[#E4E3E3] z-10'>
        {/* Mobile Grid - visible only on mobile */}
        <div className='md:hidden relative px-4 py-8'>
          <div className='grid grid-cols-2 gap-4 max-w-md mx-auto'>
            {DOCK_ITEMS.map((item) => (
              <a
                key={item.id}
                href={item.url}
                target='_blank'
                rel='noopener noreferrer'
                className='bg-foreground/70 backdrop-blur-md rounded-2xl p-4 flex flex-col items-center gap-3 active:scale-95 transition-transform shadow-xl'
              >
                <Image src={item.icon} alt={item.label} width={64} height={64} className='rounded-lg' />
                <p className='text-white text-sm text-center font-medium'>{item.label}</p>
              </a>
            ))}
          </div>
        </div>

        {/* Info Content */}
        <div className='relative px-4 md:px-8 pt-16 pb-16'>
          <div className='flex flex-col gap-8 text-foreground'>
            {/* Brief Section */}
            <div>
              <h2 className='text-xl font-bold border-b-2 border-foreground pb-2 mb-4'>
                brief
              </h2>
              <div className='grid grid-cols-1 md:grid-cols-5 gap-y-2 text-sm'>
                <div className='hidden md:block'></div>
                <div className='hidden md:block'></div>
                <div className='hidden md:block'></div>
                <div className='md:col-span-2'>
                  <p className='leading-relaxed'>
                    A selection of freelance web projects I have worked on over the years. These range from small
                    portfolio sites to larger business websites, showcasing my experience in web development and design.
                  </p>
                </div>
              </div>
            </div>

            {/* Specifications Section */}
            <div>
              <h2 className='text-xl font-bold border-b-2 border-foreground pb-2 mb-4'>
                specifications
              </h2>
              <div className='grid grid-cols-2 md:grid-cols-5 gap-y-2 text-sm'>
                <div className='hidden md:block'></div>
                <div className='font-bold md:text-right'>Year</div>
                <div className='hidden md:block'></div>
                <div className='md:col-span-2'>2021-Ongoing</div>

                <div className='hidden md:block'></div>
                <div className='font-bold md:text-right'>For</div>
                <div className='hidden md:block'></div>
                <div className='md:col-span-2'>Various Clients</div>

                <div className='hidden md:block'></div>
                <div className='font-bold md:text-right'>Type</div>
                <div className='hidden md:block'></div>
                <div className='md:col-span-2'>Web Design & Development</div>

                <div className='hidden md:block'></div>
                <div className='font-bold md:text-right'>Tech</div>
                <div className='hidden md:block'></div>
                <div className='md:col-span-2'>React, Next.js, TypeScript, Tailwind, WordPress, PHP</div>

                <div className='hidden md:block'></div>
                <div className='font-bold md:text-right'>Services</div>
                <div className='hidden md:block'></div>
                <div className='md:col-span-2'>Design, Development, Consulting, Hosting, Maintenance</div>
              </div>
            </div>

            {/* Idea Section */}
            <div>
              <h2 className='text-xl font-bold border-b-2 border-foreground pb-2 mb-4'>idea</h2>
              <div className='grid grid-cols-1 md:grid-cols-5 gap-y-2 text-sm'>
                <div className='hidden md:block'></div>
                <div className='hidden md:block'></div>
                <div className='hidden md:block'></div>
                <div className='md:col-span-2'>
                  <p className='leading-relaxed'>
                    I started freelancing because I wanted to move towards more creative and challenging work.
                    Freelancing allows me to choose projects that align with my interests and skills, while also
                    providing the flexibility to manage my own time and work environment.
                  </p>
                </div>
              </div>
            </div>

            {/* Learnings Section
            <div>
              <h2 className={`text-xl font-bold border-b-2 border-foreground pb-2 mb-4 ${archivo.className}`}>
                learnings
              </h2>
              <div className='grid grid-cols-1 md:grid-cols-5 gap-y-2 text-sm'>
                <div className='hidden md:block'></div>
                <div className='hidden md:block'></div>
                <div className='hidden md:block'></div>
                <div className='md:col-span-2'>
                  <ul className='list-disc list-outside pl-3 space-y-1'>
                    <li>Client communication</li>
                    <li>Clear boundaries and scope</li>
                    <li>Documentation</li>
                    <li>Continuous learning</li>
                  </ul>
                </div>
              </div>
            </div> */}

            {/* Credits Section */}
            <div>
              <h2 className='text-xl font-bold border-b-2 border-foreground pb-2 mb-4'>
                credits
              </h2>
              <div className='grid grid-cols-2 md:grid-cols-5 gap-y-2 text-sm'>
                <div className='hidden md:block'></div>
                <div className='font-bold md:text-right'>utill.ch</div>
                <div className='hidden md:block'></div>
                <div className='md:col-span-2'>Design & Development: Till Solenthaler</div>

                <div className='hidden md:block'></div>
                <div className='font-bold md:text-right'>hannibal.ch</div>
                <div className='hidden md:block'></div>
                <div className='md:col-span-2'>Design & Development: Till Solenthaler</div>

                <div className='hidden md:block'></div>
                <div className='font-bold md:text-right'>fabiotozzo.com</div>
                <div className='hidden md:block'></div>
                <div className='md:col-span-2'>
                  Design: Noel Oppliger & Till Solenthaler, Development: Till Solenthaler
                </div>

                <div className='hidden md:block'></div>
                <div className='font-bold md:text-right'>swing.ch</div>
                <div className='hidden md:block'></div>
                <div className='md:col-span-2'>Design & Development: Till Solenthaler</div>

                <div className='hidden md:block'></div>
                <div className='font-bold md:text-right'>nicolaijaronkager.ch</div>
                <div className='hidden md:block'></div>
                <div className='md:col-span-2'>
                  Design: Nicolai Kager & Till Solenthaler, Development: Till Solenthaler
                </div>

                <div className='hidden md:block'></div>
                <div className='font-bold md:text-right'>anothernarrative.studio</div>
                <div className='hidden md:block'></div>
                <div className='md:col-span-2'>
                  Design: Another Narrative & Till Solenthaler, Development: Till Solenthaler
                </div>

                <div className='hidden md:block'></div>
                <div className='font-bold md:text-right'>brookejackson.ch</div>
                <div className='hidden md:block'></div>
                <div className='md:col-span-2'>
                  Design: Brooke Jackson & Till Solenthaler, Development: Till Solenthaler
                </div>

                <div className='hidden md:block'></div>
                <div className='font-bold md:text-right'>AI Declaration</div>
                <div className='hidden md:block'></div>
                <div className='md:col-span-2'>Claude Code for recent projects</div>
              </div>
            </div>
          </div>
        </div>

        {/* Process Section */}
        <div className='relative px-4 md:px-8 pt-12 pb-16'>
          <h2 className='text-xl font-bold border-b-2 border-foreground pb-2 mb-6'>process</h2>

          <div className='flex flex-col lg:flex-row lg:items-stretch gap-6'>
            {/* Left: Process List */}
            <div className='order-2 lg:order-1 lg:w-2/5 space-y-3'>
              {PROCESS_STEPS.map((step, index) => {
                const isActive = selectedProcessIndex === index;
                return (
                  <div
                    key={index}
                    onClick={() => setSelectedProcessIndex(index)}
                    className={`w-full p-3 rounded-lg transition-all text-left flex flex-col lg:flex-row lg:items-center gap-3 lg:cursor-pointer ${
                      isActive ? 'bg-white lg:bg-blue-500' : 'bg-white lg:hover:bg-white/80'
                    }`}
                  >
                    <div className='relative w-full aspect-square lg:w-20 lg:h-20 flex-shrink-0 overflow-hidden rounded-lg ring-1 ring-neutral-400/80 bg-white'>
                      <Image src={step.image} alt={`${step.title} thumbnail`} fill className='object-cover' />
                    </div>
                    <div className='flex-1'>
                      <span className={`font-bold block ${isActive ? 'lg:text-white' : ''}`}>{step.title}</span>
                      <span
                        className={`text-sm ${isActive ? 'lg:text-white/90 text-foreground/80' : 'text-foreground/80'}`}
                      >
                        {step.text}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right: Selected Image - Desktop only */}
            <div className='hidden lg:flex order-1 lg:order-2 lg:w-3/5'>
              <div
                className='relative w-full rounded-lg overflow-hidden bg-white cursor-pointer'
                onClick={() => {
                  const step = PROCESS_STEPS[selectedProcessIndex] || PROCESS_STEPS[0];
                  setLightboxImage({ src: step.image, title: step.title });
                }}
              >
                <Image
                  src={PROCESS_STEPS[selectedProcessIndex]?.image || PROCESS_STEPS[0].image}
                  alt={PROCESS_STEPS[selectedProcessIndex]?.title || 'Process step'}
                  fill
                  className='object-cover'
                />
              </div>
            </div>
          </div>
        </div>

        {/* Project Navigation */}
        <div className='relative px-4 md:px-8 pb-16'>
          <div className='flex justify-between items-center border-b-2 border-black pb-2'>
            <span
              onClick={() => navigateTo('/lost-in-space')}
              className='font-bold cursor-pointer lowercase text-[clamp(0.625rem,3vh,1rem)] md:text-[clamp(0.875rem,4vh,4rem)] leading-none hover:opacity-60 transition-opacity'
            >
              previous
            </span>
            <span
              onClick={() => navigateTo('/traces')}
              className='font-bold cursor-pointer lowercase text-[clamp(0.625rem,3vh,1rem)] md:text-[clamp(0.875rem,4vh,4rem)] leading-none hover:opacity-60 transition-opacity'
            >
              next
            </span>
          </div>
        </div>
      </div>

      <Lightbox src={lightboxImage?.src || null} title={lightboxImage?.title} onClose={() => setLightboxImage(null)} />
    </section>
  );
}
