import Image from 'next/image';

export function About() {
  return (
    <section className='h-screen flex flex-col px-4 md:px-8 py-24 md:py-28 overflow-y-auto relative'>
      {/* Background Image 
      <div className='absolute inset-0 z-0'>
        <Image src='/about/bg.jpg' alt='Background' fill className='object-cover' priority />
      </div>*/}

      <div className='w-full max-w-screen-2xl mx-auto py-8 relative z-10'>
        {/* Header with Profile Picture */}
        <div className='flex flex-col md:flex-row gap-4 items-center md:items-start mb-6'>
          <div className='relative w-32 h-32 rounded-full overflow-hidden border-4 border-foreground/10 flex-shrink-0'>
            <Image src='/about/pp.jpg' alt='Profile Picture' fill className='object-cover' priority />
          </div>
          <div className='flex-1 text-center md:text-left'>
            <h1 className='text-3xl md:text-4xl font-bold mb-2'>Till Solenthaler</h1>
            <p className='text-xl text-muted-foreground mb-3'>Web Designer & Developer</p>
            {/* <p className='text-sm text-foreground/80 leading-relaxed'>
              Helping SMEs create and renew their digital presence and develop strategies for their online presence.
              Experienced in full-stack development, system engineering, and automation.
            </p> */}
          </div>
        </div>

        {/* CV Content */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          {/* Timeline - Combined Education & Experience */}
          <div className='md:col-span-2 bg-background/80 backdrop-blur-md rounded-lg p-6'>
            <h2 className='text-xl font-bold mb-3'>Background</h2>
            <div className='space-y-2'>
              <div>
                <h3 className='text-base font-semibold'>Web Designer & Developer</h3>
                <p className='text-sm text-muted-foreground'>utill.ch · Self-employed · Aug 2021 - Present</p>
              </div>
              <div>
                <h3 className='text-base font-semibold'>Software Engineer Automation</h3>
                <p className='text-sm text-muted-foreground'>SIX · Oct 2020 - Aug 2021</p>
              </div>
              <div>
                <h3 className='text-base font-semibold'>Full Stack Developer</h3>
                <p className='text-sm text-muted-foreground'>Constructor Nexademy · Education · 2020</p>
              </div>
              <div>
                <h3 className='text-base font-semibold'>IT Manager</h3>
                <p className='text-sm text-muted-foreground'>MAF Madagascar · Civil Service · Oct 2019 - Mar 2020</p>
              </div>
              <div>
                <h3 className='text-base font-semibold'>System Engineer</h3>
                <p className='text-sm text-muted-foreground'>nexpert AG · Dec 2018 - May 2019</p>
              </div>
              <div>
                <h3 className='text-base font-semibold'>System Engineer</h3>
                <p className='text-sm text-muted-foreground'>SIX Group · Aug 2017 - Dec 2018</p>
              </div>
              <div>
                <h3 className='text-base font-semibold'>EFZ System Engineer, Informatik</h3>
                <p className='text-sm text-muted-foreground'>TBZ · Education · 2013 - 2017</p>
              </div>
              <div>
                <h3 className='text-base font-semibold'>Engineering Apprentice</h3>
                <p className='text-sm text-muted-foreground'>SIX Group · Aug 2013 - Aug 2017</p>
              </div>
            </div>
          </div>

          {/* Skills & Contact Column */}
          <div className='space-y-6 bg-background/80 backdrop-blur-md rounded-lg p-6'>
            {/* Skills */}
            <div>
              <h2 className='text-xl font-bold mb-3'>Skills</h2>
              <div className='space-y-2'>
                <div>
                  <h3 className='font-semibold'>Development</h3>
                  <p className='text-sm text-muted-foreground'>React, Tailwind, Next.js, TypeScript, Python, Django</p>
                </div>
                <div>
                  <h3 className='font-semibold'>Creative Tools</h3>
                  <p className='text-sm text-muted-foreground'>
                    Photoshop, Illustrator, InDesign, Premiere / Davinci , Ableton, Three.js / Blender
                  </p>
                </div>
                <div>
                  <h3 className='font-semibold'>Infrastructure & Networking</h3>
                  <p className='text-sm text-muted-foreground'>
                    Docker, Linux, Ansible, Grafana, CI/CD, Web Application Firewalls
                  </p>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div>
              <h2 className='text-xl font-bold mb-3'>Contact</h2>
              <div className='space-y-2'>
                <p className='text-sm'>
                  <span className='font-semibold'>Email:</span>{' '}
                  <a
                    href='mailto:tillsolenthaler@gmail.com'
                    className='text-muted-foreground hover:text-foreground transition-colors'
                  >
                    tillsolenthaler@gmail.com
                  </a>
                </p>
                <p className='text-sm'>
                  <span className='font-semibold'>Location:</span>{' '}
                  <span className='text-muted-foreground'>Zurich, Switzerland</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
