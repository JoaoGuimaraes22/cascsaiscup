'use client'

import Image from 'next/image'

export default function Sponsors() {
  const sponsors = [
    { src: '/img/sponsors/sponsor1.png', alt: 'Cascais Volley Cup Sponsors' },
    { src: '/img/sponsors/sponsor2.png', alt: 'CAM Ford Sponsor' },
    {
      src: '/img/sponsors/sponsor3.png',
      alt: 'Scholarship and Excellence Promotion'
    }
  ]

  return (
    <section className='bg-background py-12'>
      <div className='mx-auto w-full max-w-screen-xl space-y-8 px-2 sm:px-4 md:px-8'>
        {sponsors.map((s, i) => (
          <div
            key={i}
            className='relative mx-auto aspect-[7/2] w-full overflow-hidden rounded-lg shadow-md sm:aspect-[5/1]'
          >
            <Image
              src={s.src}
              alt={s.alt}
              fill
              sizes='100vw'
              className='object-contain'
              priority={i === 0}
            />
          </div>
        ))}
      </div>
    </section>
  )
}
