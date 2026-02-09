'use client';

import Image from 'next/image';

export default function AboutPage() {
  return (
    <section className='min-h-screen px-4 md:px-8 py-24 md:py-32'>
      <div className='flex flex-col gap-8 pt-16'>
        {/* About Section */}
        <div>
          <h2 className='text-xl font-bold flex items-center gap-2  lowercase border-b-2 border-black pb-2 mb-4'>
            <span className='text-[0.88em] pb-[2px]'>●</span>
            about
          </h2>
          <div className='grid grid-cols-2 md:grid-cols-5 gap-y-4 text-sm'>
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
                href='mailto:tillsolenthaler@gmail.com'
                className='text-muted-foreground hover:text-foreground transition-colors'
              >
                tillsolenthaler@gmail.com
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
        </div>

        {/* Education Section */}
        <div>
          <h2 className='text-xl font-bold flex items-center gap-2  lowercase border-b-2 border-black pb-2 mb-4'>
            <span className='text-[0.88em] pb-[2px]'>●</span>
            Education
          </h2>
          <div className='grid grid-cols-2 md:grid-cols-5 gap-y-2 text-sm'>
            {/* First entry */}
            <div className='hidden md:block'></div>
            <div className='text-muted-foreground md:text-right'>2013 - 2017</div>
            <div className='hidden md:block'></div>
            <div className='md:col-span-2'>
              <div className='font-semibold'>IT Systems Engineering EFZ</div>
              <div className='text-muted-foreground'>
                <a
                  href='https://tbz.ch'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='hover:text-foreground transition-colors'
                >
                  TBZ
                </a>
                {' & '}
                <a
                  href='https://www.six-group.com'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='hover:text-foreground transition-colors'
                >
                  SIX Group
                </a>
              </div>
            </div>
            {/* Second entry */}
            <div className='hidden md:block'></div>
            <div className='text-muted-foreground md:text-right'>2020</div>
            <div className='hidden md:block'></div>
            <div className='md:col-span-2'>
              <div className='font-semibold'>Full-Stack Developer Bootcamp</div>
              <div className='text-muted-foreground'>
                <a
                  href='https://propulsion.academy'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='hover:text-foreground transition-colors'
                >
                  Propulsion Academy
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Job Section */}
        <div>
          <h2 className='text-xl font-bold flex items-center gap-2  lowercase border-b-2 border-black pb-2 mb-4'>
            <span className='text-[0.88em] pb-[2px]'>●</span>
            Job
          </h2>
          <div className='grid grid-cols-2 md:grid-cols-5 gap-y-2 text-sm'>
            <div className='hidden md:block'></div>
            <div className='text-muted-foreground md:text-right'>2017 - 2018</div>
            <div className='hidden md:block'></div>
            <div className='md:col-span-2'>
              <div className='font-semibold'>System Engineer</div>
              <div className='text-muted-foreground'>
                <a
                  href='https://www.six-group.com'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='hover:text-foreground transition-colors'
                >
                  SIX Group
                </a>
              </div>
            </div>

            <div className='hidden md:block'></div>
            <div className='text-muted-foreground md:text-right'>2018 - 2019</div>
            <div className='hidden md:block'></div>
            <div className='md:col-span-2'>
              <div className='font-semibold'>System Engineer</div>
              <div className='text-muted-foreground'>
                <a
                  href='https://nexpert.ch'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='hover:text-foreground transition-colors'
                >
                  Nexpert
                </a>
              </div>
            </div>

            <div className='hidden md:block'></div>
            <div className='text-muted-foreground md:text-right'>2019 - 2020</div>
            <div className='hidden md:block'></div>
            <div className='md:col-span-2'>
              <div className='font-semibold'>IT Manager</div>
              <div className='text-muted-foreground'>
                <a
                  href='https://madagascar.mafint.org/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='hover:text-foreground transition-colors'
                >
                  MAF Madagascar
                </a>
                {' · Civil Service'}
              </div>
            </div>

            <div className='hidden md:block'></div>
            <div className='text-muted-foreground md:text-right'>2020 - 2021</div>
            <div className='hidden md:block'></div>
            <div className='md:col-span-2'>
              <div className='font-semibold'>Software Engineer Automation</div>
              <div className='text-muted-foreground'>
                <a
                  href='https://www.six-group.com'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='hover:text-foreground transition-colors'
                >
                  SIX Group
                </a>
              </div>
            </div>

            <div className='hidden md:block'></div>
            <div className='text-muted-foreground md:text-right'>2021 - Present</div>
            <div className='hidden md:block'></div>
            <div className='md:col-span-2'>
              <div className='font-semibold'>Web Designer & Developer</div>
              <div className='text-muted-foreground'>
                <a
                  href='https://utill.ch'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='hover:text-foreground transition-colors'
                >
                  utill.ch
                </a>
                {' · Self-employed'}
              </div>
            </div>

            {/* Separator */}

            <div className='hidden md:block'></div>
            <div className='text-muted-foreground md:text-right border-t border-transparent my-2'>2018 - Present</div>
            <div className='hidden md:block'></div>
            <div className='md:col-span-2'>
              <div className='w-1/2 border-t border-foreground/10 my-2'></div>
              <div className='font-semibold'>Booking, Production & Web</div>
              <div className='text-muted-foreground'>
                <a
                  href='https://stolze-openair.ch/year/2025/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='hover:text-foreground transition-colors'
                >
                  Stolze Openair
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div>
          <h2 className='text-xl font-bold flex items-center gap-2  lowercase border-b-2 border-black pb-2 mb-4'>
            <span className='text-[0.88em] pb-[2px]'>●</span>
            Skills
          </h2>
          <div className='grid grid-cols-2 md:grid-cols-5 gap-y-2 text-sm'>
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
        </div>

        {/* Motivational Letter Section */}
        <div>
          <h2 className='text-xl font-bold flex items-center gap-2  lowercase border-b-2 border-black pb-2 mb-4'>
            <span className='text-[0.88em] pb-[2px]'>●</span>
            Motivational Letter
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-5 gap-y-2 text-sm'>
            <div className='hidden md:block'></div>
            <div className='hidden md:block'></div>
            <div className='hidden md:block'></div>
            <div className='md:col-span-2 text-justify'>
              <p>
                For me, interaction design is the interface between people and technology, with the aim of creating
                human-centred solutions. This is achieved by questioning familiar concepts, developing new approaches
                and considering the social and cultural context that technology influences. It is within this framework
                that I would like to make a contribution to our society.
              </p>
              <br />
              <p>
                I acquired my technical foundation during my IT apprenticeship in systems engineering at SIX, where I
                dealt with IT infrastructure, networks, Linux and security. As I felt this work didn&apos;t challenge my
                creativity enough, I completed further training as a full-stack developer a few years later. This opened
                the door to web design, which ultimately led me to become self-employed with my small web agency
                utill.ch. Self-employment proved to be an efficient catalyst: it constantly challenges me to learn new
                skills. From corporate identity and UX/UI design to conceptual thinking and project management.
              </p>
              <br />
              <p>
                Parallel to my working life, I have always pursued creative projects. I was already making short films
                in primary school, followed later by photography and music production. My interest in design and
                architecture has also been with me since childhood. I had the privilege of growing up with parents who
                valued art and culture highly. I owe my passion and basic education in this field to them. I also live
                out this passion at Openair Stolze, where I have been jointly responsible for booking, production and
                the website since 2018.
              </p>
              <br />
              <p>
                Through exchanges with IAD students in my circle, I realised that this degree programme is a perfect fit
                for my career, interests and goals. It allows me to combine my technical and creative skills. I am
                particularly fascinated by the variety of the work: from conceptual development to technical
                implementation, from experimental approaches to everyday solutions. I am also motivated by the
                opportunity to collaborate with other students and apply the knowledge I have acquired directly to
                projects. I am eager to learn, ambitious and willing to engage intensively with new topics.
              </p>
              <br />
              <p>
                Studying IAD at ZHdK is the logical step for my personal, creative and professional development. It
                provides me with the framework to deepen my creative and conceptual approach and raise it to a
                professional level. In the future I see myself starting an agency together with friends and one day
                I&apos;d like to go into teaching to pass my knowledge to others.
              </p>
            </div>
          </div>
        </div>
        {/* Motivational Letter Section */}
        <div>
          <h2 className='text-xl font-bold flex items-center gap-2  lowercase border-b-2 border-black pb-2 mb-4'>
            <span className='text-[0.88em] pb-[2px]'>●</span>
            portfolio
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-5 gap-y-2 text-sm'>
            <div className='hidden md:block'></div>
            <div className='hidden md:block'></div>
            <div className='hidden md:block'></div>
            <div className='md:col-span-2 text-justify'>
              <p>
                Portfolio website made with Next.js, Tailwind, Motion & Three.js. Created together with Claude Code.
              </p>
              <div className='pt-4 text-xs text-muted-foreground'>
                <a
                  href='https://github.com/u-till/zhdk-portfolio'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='hover:text-foreground transition-colors'
                >
                  Source on GitHub
                </a>
                {' · '}
                <a
                  href='https://github.com/u-till/zhdk-portfolio/blob/main/LICENSE'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='hover:text-foreground transition-colors'
                >
                  CC BY-NC 4.0 / MIT
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
