'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'

export default function AboutHero() {
  const t = useTranslations('AboutPage')

  const sponsors = [
    {
      src: '/img/sponsors/cascais-estoril.png',
      alt: t('sponsors.cascaisEstorilAlt'),
      w: 140,
      h: 56
    },
    {
      src: '/img/sponsors/cascais-camara.png',
      alt: t('sponsors.camaraAlt'),
      w: 160,
      h: 56
    },
    {
      src: '/img/sponsors/cam-ford.png',
      alt: t('sponsors.camFordAlt'),
      w: 150,
      h: 56
    }
  ]

  return (
    <section className='relative min-h-screen w-full overflow-hidden'>
      {/* Full-section background image */}
      <div className='absolute inset-0 z-0'>
        <Image
          src='/img/about/about-bg.png' // ensure this file exists; adjust extension if needed
          alt=''
          fill
          className='object-cover'
          sizes='100vw'
          priority
        />
      </div>

      {/* Content */}
      <div className='relative z-10 mx-auto grid max-w-screen-2xl grid-cols-1 gap-10 px-4 pb-20 pt-12 md:grid-cols-2 md:items-center lg:px-8'>
        {/* LEFT */}
        <div className='space-y-6'>
          <h2 className='text-3xl font-extrabold uppercase text-sky-600 md:text-4xl'>
            {t('title')}
          </h2>

          <p className='text-sm leading-relaxed text-slate-700 sm:text-base'>
            {t('p1')}
          </p>
          <p className='text-sm leading-relaxed text-slate-700 sm:text-base'>
            {t('p2')}
          </p>
          <p className='text-sm leading-relaxed text-slate-700 sm:text-base'>
            {t('p3')}
          </p>

          <p className='text-sm leading-relaxed text-slate-700 sm:text-base'>
            {t('p4')}
          </p>

          {/* Sponsors */}
          <div className='flex flex-wrap items-center gap-6'>
            {sponsors.map((s, i) => (
              <Image
                key={i}
                src={s.src}
                alt={s.alt}
                width={s.w}
                height={s.h}
                className='h-auto max-h-12 w-auto object-contain'
                priority={i === 0}
              />
            ))}
          </div>

          {/* Club logo */}
          <Image
            src='/img/sponsors/volley4all.png'
            alt={t('club.logoAlt')}
            width={260}
            height={70}
            className='h-auto w-auto object-contain'
          />

          {/* CTA */}
          <button
            type='button'
            className='rounded-md bg-sky-600 px-6 py-2 font-bold text-white shadow-md ring-1 ring-black/10 hover:bg-sky-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300'
          >
            {t('cta')}
          </button>
        </div>

        {/* RIGHT image */}
        <div className='relative h-[420px] w-full overflow-hidden rounded-md md:h-[520px] md:rounded-xl'>
          <Image
            src='/img/about/about-hero.png'
            alt={t('title')}
            fill
            className='object-cover'
            priority
          />
        </div>
      </div>

      {/* Bottom wave (kept on top of bg) */}
      <div className='pointer-events-none absolute bottom-0 left-1/2 z-20 w-screen -translate-x-1/2'>
        <Image
          src='/img/global/ondas-3.png'
          alt=''
          width={2048}
          height={135}
          className='h-auto w-full object-cover'
          priority
          sizes='100vw'
        />
      </div>
    </section>
  )
}
