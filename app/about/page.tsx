'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

export default function AboutPage() {
  const [openSections, setOpenSections] = useState<Set<string>>(new Set(['about', 'contact']));

  const toggle = (section: string) =>
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(section)) next.delete(section);
      else next.add(section);
      return next;
    });

  return (
    <section className='min-h-screen px-4 md:px-8 py-24 md:py-32'>
      <div className='flex flex-col gap-8 pt-16'>
        {/* About Section - drawer, default open */}
        <div>
          <h2
            onClick={() => toggle('about')}
            className='text-xl font-extrabold tracking-tight flex items-center gap-2 lowercase border-b-2 border-black pb-2 cursor-pointer'
          >
            <span className='inline-block rounded-full bg-current flex-shrink-0 w-[1cap] h-[1cap]' />
            about
          </h2>
          <AnimatePresence initial={false}>
            {openSections.has('about') && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className='overflow-hidden'
              >
                <div className='grid grid-cols-2 md:grid-cols-5 gap-y-4 text-base pt-4'>
                  <div className='hidden md:block'></div>
                  <div className='flex md:justify-end'>
                    <div className='relative aspect-square h-32 overflow-hidden'>
                      <Image src='/about/pp.jpg' alt='Profile Picture' fill className='object-cover' priority />
                    </div>
                  </div>
                  <div className='hidden md:block'></div>
                  <div className='md:col-span-2'>
                    <div className='font-semibold'>Web Designer & Developer</div>
                    <div className='text-muted-foreground'>
                      <a
                        href='https://utill.ch'
                        target='_blank'
                        className='text-muted-foreground hover:text-foreground transition-colors'
                      >
                        utill.ch{' '}
                      </a>
                      | Zurich, Switzerland
                    </div>
                    <a
                      href='mailto:hello@utill.ch'
                      className='text-muted-foreground hover:text-foreground transition-colors'
                    >
                      hello@utill.ch
                    </a>
                  </div>
                  <div className='hidden md:block'></div>
                  <div className='hidden md:block'></div>
                  <div className='hidden md:block'></div>
                  <p className='col-span-2 md:col-span-2'>
                    I like open source software, the old-school internet movement before Silicon Valley turned dystopian,
                    traveling, photography, design and architecture (especially brutalism), geography and geopolitics, arte,
                    flea markets, bicycles and music.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Education Section - drawer */}
        <div>
          <h2
            onClick={() => toggle('education')}
            className='text-xl font-extrabold tracking-tight flex items-center gap-2 lowercase border-b-2 border-black pb-2 cursor-pointer'
          >
            <span className='inline-block rounded-full bg-current flex-shrink-0 w-[1cap] h-[1cap]' />
            education
          </h2>
          <AnimatePresence initial={false}>
            {openSections.has('education') && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className='overflow-hidden'
              >
                <div className='grid grid-cols-2 md:grid-cols-5 gap-y-2 text-base pt-4'>
                  <div className='hidden md:block'></div>
                  <div className='text-muted-foreground md:text-right'>2013 - 2017</div>
                  <div className='hidden md:block'></div>
                  <div className='md:col-span-2'>
                    <div className='font-semibold'>IT Systems Engineering EFZ</div>
                    <div className='text-muted-foreground'>
                      <a href='https://tbz.ch' target='_blank' rel='noopener noreferrer' className='hover:text-foreground transition-colors'>TBZ</a>
                      {' & '}
                      <a href='https://www.six-group.com' target='_blank' rel='noopener noreferrer' className='hover:text-foreground transition-colors'>SIX Group</a>
                    </div>
                  </div>
                  <div className='hidden md:block'></div>
                  <div className='text-muted-foreground md:text-right'>2020</div>
                  <div className='hidden md:block'></div>
                  <div className='md:col-span-2'>
                    <div className='font-semibold'>Full-Stack Developer Bootcamp</div>
                    <div className='text-muted-foreground'>
                      <a href='https://propulsion.academy' target='_blank' rel='noopener noreferrer' className='hover:text-foreground transition-colors'>Propulsion Academy</a>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Job Section - drawer */}
        <div>
          <h2
            onClick={() => toggle('job')}
            className='text-xl font-extrabold tracking-tight flex items-center gap-2 lowercase border-b-2 border-black pb-2 cursor-pointer'
          >
            <span className='inline-block rounded-full bg-current flex-shrink-0 w-[1cap] h-[1cap]' />
            experience
          </h2>
          <AnimatePresence initial={false}>
            {openSections.has('job') && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className='overflow-hidden'
              >
                <div className='grid grid-cols-2 md:grid-cols-5 gap-y-2 text-base pt-4'>
                  <div className='hidden md:block'></div>
                  <div className='text-muted-foreground md:text-right'>2017 - 2018</div>
                  <div className='hidden md:block'></div>
                  <div className='md:col-span-2'>
                    <div className='font-semibold'>System Engineer</div>
                    <div className='text-muted-foreground'>
                      <a href='https://www.six-group.com' target='_blank' rel='noopener noreferrer' className='hover:text-foreground transition-colors'>SIX Group</a>
                    </div>
                  </div>

                  <div className='hidden md:block'></div>
                  <div className='text-muted-foreground md:text-right'>2018 - 2019</div>
                  <div className='hidden md:block'></div>
                  <div className='md:col-span-2'>
                    <div className='font-semibold'>System Engineer</div>
                    <div className='text-muted-foreground'>
                      <a href='https://nexpert.ch' target='_blank' rel='noopener noreferrer' className='hover:text-foreground transition-colors'>Nexpert</a>
                    </div>
                  </div>

                  <div className='hidden md:block'></div>
                  <div className='text-muted-foreground md:text-right'>2019 - 2020</div>
                  <div className='hidden md:block'></div>
                  <div className='md:col-span-2'>
                    <div className='font-semibold'>IT Manager</div>
                    <div className='text-muted-foreground'>
                      <a href='https://madagascar.mafint.org/' target='_blank' rel='noopener noreferrer' className='hover:text-foreground transition-colors'>MAF Madagascar</a>
                      {' · Civil Service'}
                    </div>
                  </div>

                  <div className='hidden md:block'></div>
                  <div className='text-muted-foreground md:text-right'>2020 - 2021</div>
                  <div className='hidden md:block'></div>
                  <div className='md:col-span-2'>
                    <div className='font-semibold'>Software Engineer Automation</div>
                    <div className='text-muted-foreground'>
                      <a href='https://www.six-group.com' target='_blank' rel='noopener noreferrer' className='hover:text-foreground transition-colors'>SIX Group</a>
                    </div>
                  </div>

                  <div className='hidden md:block'></div>
                  <div className='text-muted-foreground md:text-right'>2021 - Present</div>
                  <div className='hidden md:block'></div>
                  <div className='md:col-span-2'>
                    <div className='font-semibold'>Web Designer & Developer</div>
                    <div className='text-muted-foreground'>
                      <a href='https://utill.ch' target='_blank' rel='noopener noreferrer' className='hover:text-foreground transition-colors'>utill.ch</a>
                      {' · Self-employed'}
                    </div>
                  </div>

                  <div className='hidden md:block'></div>
                  <div className='text-muted-foreground md:text-right border-t border-transparent my-2'>2018 - Present</div>
                  <div className='hidden md:block'></div>
                  <div className='md:col-span-2'>
                    <div className='w-1/2 border-t border-foreground/10 my-2'></div>
                    <div className='font-semibold'>Booking, Production & Web</div>
                    <div className='text-muted-foreground'>
                      <a href='https://stolze-openair.ch/year/2025/' target='_blank' rel='noopener noreferrer' className='hover:text-foreground transition-colors'>Stolze Openair</a>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Skills Section - drawer */}
        <div>
          <h2
            onClick={() => toggle('skills')}
            className='text-xl font-extrabold tracking-tight flex items-center gap-2 lowercase border-b-2 border-black pb-2 cursor-pointer'
          >
            <span className='inline-block rounded-full bg-current flex-shrink-0 w-[1cap] h-[1cap]' />
            skills
          </h2>
          <AnimatePresence initial={false}>
            {openSections.has('skills') && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className='overflow-hidden'
              >
                <div className='grid grid-cols-2 md:grid-cols-5 gap-y-2 text-base pt-4'>
                  <div className='hidden md:block'></div>
                  <div className='font-semibold md:text-right'>Development</div>
                  <div className='hidden md:block'></div>
                  <div className='text-muted-foreground md:col-span-2'>
                    React, Tailwind, Next.js, TypeScript, Python, WordPress
                  </div>

                  <div className='hidden md:block'></div>
                  <div className='font-semibold md:text-right'>Creative Tools</div>
                  <div className='hidden md:block'></div>
                  <div className='text-muted-foreground md:col-span-2'>
                    Photoshop, Illustrator, Figma, InDesign, Premiere / DaVinci, Ableton, Three.js / Blender
                  </div>

                  <div className='hidden md:block'></div>
                  <div className='font-semibold md:text-right'>Infrastructure</div>
                  <div className='hidden md:block'></div>
                  <div className='text-muted-foreground md:col-span-2'>Linux, Docker, Infra as code, Networks, Security</div>

                  <div className='hidden md:block'></div>
                  <div className='font-semibold md:text-right'>Languages</div>
                  <div className='hidden md:block'></div>
                  <div className='text-muted-foreground md:col-span-2'>German: Native, English: Fluent, French: Basics</div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Contact Section - drawer, default open */}
        <div>
          <h2
            onClick={() => toggle('contact')}
            className='text-xl font-extrabold tracking-tight flex items-center gap-2 lowercase border-b-2 border-black pb-2 cursor-pointer'
          >
            <span className='inline-block rounded-full bg-current flex-shrink-0 w-[1cap] h-[1cap]' />
            contact
          </h2>
          <AnimatePresence initial={false}>
            {openSections.has('contact') && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className='overflow-hidden'
              >
                <div className='grid grid-cols-2 md:grid-cols-5 gap-y-2 text-base pt-4'>
                  <div className='hidden md:block'></div>
                  <div className='font-semibold md:text-right'>Email</div>
                  <div className='hidden md:block'></div>
                  <div className='md:col-span-2'>
                    <a href='mailto:hello@utill.ch' className='text-muted-foreground hover:text-foreground transition-colors'>
                      hello@utill.ch
                    </a>
                  </div>

                  <div className='hidden md:block'></div>
                  <div className='font-semibold md:text-right'>Web</div>
                  <div className='hidden md:block'></div>
                  <div className='md:col-span-2'>
                    <a href='https://utill.ch' target='_blank' rel='noopener noreferrer' className='text-muted-foreground hover:text-foreground transition-colors'>
                      utill.ch
                    </a>
                  </div>

                  <div className='hidden md:block'></div>
                  <div className='font-semibold md:text-right'>GitHub</div>
                  <div className='hidden md:block'></div>
                  <div className='md:col-span-2'>
                    <a href='https://github.com/u-till' target='_blank' rel='noopener noreferrer' className='text-muted-foreground hover:text-foreground transition-colors'>
                      u-till
                    </a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Portfolio Section - drawer */}
        <div>
          <h2
            onClick={() => toggle('portfolio')}
            className='text-xl font-extrabold tracking-tight flex items-center gap-2 lowercase border-b-2 border-black pb-2 cursor-pointer'
          >
            <span className='inline-block rounded-full bg-current flex-shrink-0 w-[1cap] h-[1cap]' />
            portfolio
          </h2>
          <AnimatePresence initial={false}>
            {openSections.has('portfolio') && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className='overflow-hidden'
              >
                <div className='grid grid-cols-1 md:grid-cols-5 gap-y-2 text-base pt-4'>
                  <div className='hidden md:block'></div>
                  <div className='hidden md:block'></div>
                  <div className='hidden md:block'></div>
                  <div className='md:col-span-2 text-justify'>
                    <p>
                      Portfolio website made with Next.js, Tailwind, Motion & Three.js. Created together with Claude Code.
                    </p>
                    <div className='pt-4 text-xs text-muted-foreground'>
                      <a href='https://github.com/u-till/zhdk-portfolio' target='_blank' rel='noopener noreferrer' className='hover:text-foreground transition-colors'>
                        Source on GitHub
                      </a>
                      {' · '}
                      <a href='https://github.com/u-till/zhdk-portfolio/blob/main/LICENSE' target='_blank' rel='noopener noreferrer' className='hover:text-foreground transition-colors'>
                        CC BY-NC 4.0 / MIT
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
