'use client';

export function TextViewer() {
  return (
    <div className='w-full h-full bg-white p-6 overflow-auto'>
      <div className='prose prose-sm max-w-none'>
        <h1 className='text-2xl font-bold mb-4'>Dayjob</h1>

        <p className='mb-4'>
          Since 2021, I have been working as a freelance webdesigner and developer under the name utill. My work
          primarily focuses on creating online identities by designing and developing websites for a variety of clients.
          I enjoy collaborating closely with my clients to understand their vision and bring it to life through unique
          design and user-friendly web experiences. To showcase my work, i have selected a few projects below that
          highlight my skills.
        </p>

        <h2 className='text-xl font-semibold mt-6 mb-3'>Projects</h2>

        <ul className='space-y-2'>
          <li>
            <strong>utill</strong> - Complete design and development of my personal website with Next.js
          </li>
          <li>
            <strong>Hannibal</strong> - Complete design and development of the website for a second hand furniture store
            with Wordpress
          </li>
          <li>
            <strong>Fabio Tozzo</strong> - Portfolio website designed in collaboration with Noel Oppliger and developed
            with Next.js
          </li>
          <li>
            <strong>Swing</strong> - Complete design and development of the website for a dance school with Wordpress
          </li>
          <li>
            <strong>Nicolai Kager</strong> - Portfolio website designed in collaboration with customer and developed
            with Wordpress
          </li>
          <li>
            <strong>Another Narrative</strong> - Agency website designed in collaboration with customer and developed
            with Wordpress
          </li>
          <li>
            <strong>Brooke Jackson</strong> - Portfolio website designed in collaboration with customer and developed
            with Wordpress
          </li>
        </ul>
      </div>
    </div>
  );
}
