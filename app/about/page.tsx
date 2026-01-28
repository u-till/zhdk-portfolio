import Image from 'next/image';

export default function AboutPage() {
  return (
    <section className='h-screen overflow-y-auto px-4 md:px-8 py-24 md:py-32'>
      <div className='flex flex-col gap-8'>
        {/* About Section */}
        <div>
          <h2 className='text-xl font-bold flex items-center gap-2 md:gap-4 lowercase border-b-2 border-black pb-2 mb-4'>
            <span className='text-[0.88em] pb-[2px]'>●</span>
            about
          </h2>
          <div className='grid grid-cols-5 gap-y-4 text-sm'>
            <div></div>
            <div className='flex justify-end'>
              <div className='relative aspect-square h-32 overflow-hidden'>
                <Image src='/about/pp.jpg' alt='Profile Picture' fill className='object-cover' priority />
              </div>
            </div>
            <div></div>
            <div className='col-span-2'>
              <div className='font-semibold'>Web Designer & Developer</div>
              <div className='text-muted-foreground'>Zurich, Switzerland</div>
              <a
                href='mailto:tillsolenthaler@gmail.com'
                className='text-muted-foreground hover:text-foreground transition-colors'
              >
                tillsolenthaler@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Education Section */}
        <div>
          <h2 className='text-xl font-bold flex items-center gap-2 md:gap-4 lowercase border-b-2 border-black pb-2 mb-4'>
            <span className='text-[0.88em] pb-[2px]'>●</span>
            Education
          </h2>
          <div className='grid grid-cols-5 gap-y-2 text-sm'>
            <div></div>
            <div className='text-muted-foreground text-right'>2020</div>
            <div></div>
            <div className='col-span-2'>
              <span className='font-semibold'>Full Stack Developer</span>
              <span className='text-muted-foreground'>
                {' · '}
                <a
                  href='https://constructor.org'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='hover:text-foreground transition-colors'
                >
                  Constructor Academy
                </a>
              </span>
            </div>

            <div></div>
            <div className='text-muted-foreground text-right'>2013 - 2017</div>
            <div></div>
            <div className='col-span-2'>
              <span className='font-semibold'>EFZ System Engineer, Informatik</span>
              <span className='text-muted-foreground'>
                {' · '}
                <a
                  href='https://tbz.ch'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='hover:text-foreground transition-colors'
                >
                  TBZ
                </a>
              </span>
            </div>
          </div>
        </div>

        {/* Job Section */}
        <div>
          <h2 className='text-xl font-bold flex items-center gap-2 md:gap-4 lowercase border-b-2 border-black pb-2 mb-4'>
            <span className='text-[0.88em] pb-[2px]'>●</span>
            Job
          </h2>
          <div className='grid grid-cols-5 gap-y-2 text-sm'>
            <div></div>
            <div className='text-muted-foreground text-right'>Aug 2021 - Present</div>
            <div></div>
            <div className='col-span-2'>
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

            <div></div>
            <div className='text-muted-foreground text-right'>Oct 2020 - Aug 2021</div>
            <div></div>
            <div className='col-span-2'>
              <div className='font-semibold'>Software Engineer Automation</div>
              <div className='text-muted-foreground'>
                <a
                  href='https://www.six-group.com'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='hover:text-foreground transition-colors'
                >
                  SIX
                </a>
              </div>
            </div>

            <div></div>
            <div className='text-muted-foreground text-right'>Oct 2019 - Mar 2020</div>
            <div></div>
            <div className='col-span-2'>
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

            <div></div>
            <div className='text-muted-foreground text-right'>Dec 2018 - May 2019</div>
            <div></div>
            <div className='col-span-2'>
              <div className='font-semibold'>System Engineer</div>
              <div className='text-muted-foreground'>
                <a
                  href='https://nexpert.ch'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='hover:text-foreground transition-colors'
                >
                  nexpert
                </a>
              </div>
            </div>

            <div></div>
            <div className='text-muted-foreground text-right'>Aug 2017 - Dec 2018</div>
            <div></div>
            <div className='col-span-2'>
              <div className='font-semibold'>System Engineer</div>
              <div className='text-muted-foreground'>
                <a
                  href='https://www.six-group.com'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='hover:text-foreground transition-colors'
                >
                  SIX
                </a>
              </div>
            </div>

            <div></div>
            <div className='text-muted-foreground text-right'>Aug 2013 - Aug 2017</div>
            <div></div>
            <div className='col-span-2'>
              <div className='font-semibold'>Engineering Apprentice</div>
              <div className='text-muted-foreground'>
                <a
                  href='https://www.six-group.com'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='hover:text-foreground transition-colors'
                >
                  SIX
                </a>
              </div>
            </div>

            <div></div>
            <div className='text-muted-foreground text-right'>2018 - Present</div>
            <div></div>
            <div className='col-span-2'>
              <div className='font-semibold'>Booking & Production and Web</div>
              <div className='text-muted-foreground'>
                <a
                  href='https://stolze-openair.ch'
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
          <h2 className='text-xl font-bold flex items-center gap-2 md:gap-4 lowercase border-b-2 border-black pb-2 mb-4'>
            <span className='text-[0.88em] pb-[2px]'>●</span>
            Skills
          </h2>
          <div className='grid grid-cols-5 gap-y-2 text-sm'>
            <div></div>
            <div className='font-semibold text-right'>Development</div>
            <div></div>
            <div className='text-muted-foreground col-span-2'>
              React, Tailwind, Next.js, TypeScript, Python, Wordpress
            </div>

            <div></div>
            <div className='font-semibold text-right'>Creative Tools</div>
            <div></div>
            <div className='text-muted-foreground col-span-2'>
              Photoshop, Illustrator, Figma, InDesign, Premiere / Davinci, Ableton, Three.js / Blender
            </div>

            <div></div>
            <div className='font-semibold text-right'>Infrastructure</div>
            <div></div>
            <div className='text-muted-foreground col-span-2'>Linux, Docker, Infra as code, Networks, Security</div>
          </div>
        </div>

        {/* Motivational Letter Section */}
        <div>
          <h2 className='text-xl font-bold flex items-center gap-2 md:gap-4 lowercase border-b-2 border-black pb-2 mb-4'>
            <span className='text-[0.88em] pb-[2px]'>●</span>
            Motivational Letter
          </h2>
          <div className='grid grid-cols-5 gap-y-2 text-sm'>
            <div></div>
            <div></div>
            <div></div>
            <div className='col-span-2 text-justify'>
              <p>
                Interaction Design ist für mich die Schnittstelle zwischen Mensch und Technologie, mit dem Ziel
                menschenzentrierte Lösungen zu schaffen. Dies gelingt, indem man gewohnte Konzepte hinterfragt, neue
                Ansätze erarbeitet und dabei den sozialen und kulturellen Kontext mitdenkt, auf den Technologie Einfluss
                hat. In diesem Rahmen möchte ich einen Beitrag für unsere Gesellschaft leisten.
              </p>
              <br />
              <p>
                Mein technisches Fundament habe ich mir während meiner Informatiklehre in Systemtechnik bei der SIX
                angeeignet, wo ich mich mit IT-Infrastruktur, Netzwerken, Linux und Security auseinandersetzte. Da diese
                Arbeit meine Kreativität kaum herausforderte, absolvierte ich einige Jahre später eine Weiterbildung zum
                Fullstack-Developer. Diese öffnete mir den Weg in Richtung Webdesign, was mich schliesslich in die
                Selbstständigkeit mit meiner kleinen Webagentur utill.ch führte. Die Selbstständigkeit erwies sich als
                effizienter Katalysator: Sie fordert mich ständig neue Fähigkeiten zu erlernen. Von Corporate Identity
                über UX/UI-Design bis hin zu konzeptionellem Denken und Projektmanagement.
              </p>
              <br />
              <p>
                Parallel zu meinem Arbeitsleben verfolge ich seit jeher kreative Projekte. Schon in der Primarschule
                drehte ich Kurzfilme, später folgten Fotografie und Musikproduktion. Mein Interesse an Design und
                Architektur begleitet mich ebenfalls seit der Kindheit. Ich hatte das Privileg, mit Eltern aufzuwachsen,
                denen Kunst und Kultur sehr wichtig sind. Ihnen verdanke ich meine Leidenschaft und Grundbildung in
                diesem Bereich. Diese Leidenschaft lebe ich auch im Openair Stolze aus, wo ich seit 2018 für Booking,
                Produktion und Webauftritt mitverantwortlich bin.
              </p>
              <br />
              <p>
                Durch den Austausch mit IAD-Studierenden aus meinem Umfeld wurde mir klar, dass dieses Studium perfekt
                zu meinem Werdegang, meinen Interessen und Zielen passt. Es ermöglicht mir, meine technischen und
                gestalterischen Fähigkeiten zusammenzuführen. Die Bandbreite der Arbeiten fasziniert mich besonders: von
                konzeptioneller Entwicklung bis zu handwerklicher Umsetzung, von experimentellen Ansätzen bis zu
                alltagstauglichen Lösungen. Auch die Zusammenarbeit mit anderen Studierenden und die Möglichkeit,
                erworbenes Wissen direkt in Projekten anzuwenden, motivieren mich. Ich bin wissenshungrig, ehrgeizig und
                gewillt, mich intensiv mit neuen Themen auseinanderzusetzen.
              </p>
              <br />
              <p>
                Das IAD-Studium an der ZHdK ist für mich der logische Schritt für meine persönliche, kreative und
                berufliche Entwicklung. Es bietet mir den Rahmen, meine gestalterische und konzeptionelle Arbeitsweise
                zu vertiefen und auf ein professionelles Niveau zu heben.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
