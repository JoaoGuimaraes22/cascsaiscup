'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'

export default function AboutHero() {
  const t = useTranslations('AboutPage.AboutHero')

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
    <section
      className='
        /* reserve space for
        bottom wave
        (135px)  */ relative min-h-[calc(100vh-80px)] w-full overflow-x-hidden pb-[135px] md:h-[calc(100vh-80px)] md:overflow-hidden
      '
    >
      {/* Background */}
      <div className='absolute inset-0 z-0'>
        <Image
          src='/img/about/about-bg.png'
          alt=''
          fill
          className='object-cover'
          sizes='100vw'
          priority
        />
      </div>

      {/* Right image panel (desktop+) */}
      <div className='absolute inset-y-0 right-0 z-0 hidden w-[34vw] md:block'>
        <Image
          src='/img/about/about-hero.png'
          alt={t('title')}
          fill
          className='object-cover object-top'
          priority
          sizes='(max-width: 768px) 0px, 34vw'
        />
      </div>

      {/* Content container — aligned with other sections */}
      <div className='relative z-10 mx-auto h-full max-w-screen-xl px-4 pb-24 pt-20 md:pb-20 md:pr-[34vw]'>
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
          <div className='flex flex-wrap items-center gap-6 sm:gap-8'>
            {sponsors.map((s, i) => (
              <div key={i} className='p-2 sm:p-3'>
                <Image
                  src={s.src}
                  alt={s.alt}
                  width={s.w}
                  height={s.h}
                  className='h-14 w-auto object-contain sm:h-16'
                  loading='lazy'
                  decoding='async'
                  sizes='(max-width: 640px) 33vw, (max-width: 1024px) 160px, 200px'
                />
              </div>
            ))}
          </div>

          {/* Club logo */}
          <Image
            src='/img/sponsors/volley4all.png'
            alt={t('club.logoAlt')}
            width={260}
            height={70}
            className='h-14 w-auto object-contain'
            loading='lazy'
            decoding='async'
            sizes='(max-width: 640px) 40vw, 260px'
          />

          {/* CTA */}
          <a
            href='https://volley4all.com'
            target='_blank'
            rel='noopener noreferrer'
            className='inline-block rounded-md bg-sky-600 px-6 py-2 font-bold text-white shadow-md ring-1 ring-black/10 hover:bg-sky-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300'
          >
            {t('cta')}
          </a>
        </div>

        {/* Mobile banner (stacks under content) */}
        <div className='relative mt-8 block h-56 w-full overflow-hidden rounded-md md:hidden'>
          <Image
            src='/img/about/about-hero.png'
            alt={t('title')}
            fill
            className='object-cover object-top'
            sizes='100vw'
            priority
          />
        </div>
      </div>

      {/* Bottom wave pinned to section bottom (no gap) */}
      <div className='pointer-events-none absolute bottom-0 left-1/2 z-20 w-screen -translate-x-1/2'>
        <Image
          src='/img/global/ondas-3.png'
          alt=''
          width={2048}
          height={135}
          className='-mb-px block h-[135px] w-full object-cover'
          sizes='100vw'
          priority
        />
      </div>
    </section>
  )
}
