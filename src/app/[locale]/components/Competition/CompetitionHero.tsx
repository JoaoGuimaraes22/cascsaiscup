'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

export default function CompetitionHero() {
  const t = useTranslations('CompetitionPage.Hero')

  // Assets
  const BG = '/img/competition/hero-bg.png' // background image
  const PHONE = '/img/global/hand-phone.png'
  const MOSAIC = '/img/competition/mosaic.png'
  const MOSAIC_2 = '/img/competition/mosaic-2.png' // half-size variant

  return (
    <section className='relative w-full overflow-hidden'>
      {/* Background */}
      <Image
        src={BG}
        alt=''
        fill
        priority
        className='absolute inset-0 -z-10 object-cover'
        sizes='100vw'
        decoding='async'
        draggable={false}
      />

      {/* Content */}
      <div className='mx-auto max-w-screen-xl px-4 py-10 sm:py-12 lg:py-16'>
        <div className='grid grid-cols-1 items-center gap-10 md:grid-cols-12'>
          {/* Left: phone image — hug the left edge, slightly off-screen on large, smaller on desktop */}
          <div className='md:col-span-5 lg:col-span-5'>
            <div
              className='
      /*
      pull past padding, but not too much */ /* responsive
      size (smaller than before on desktop)
      */ container relative -ml-4 h-64 w-[200px] sm:-ml-6 sm:h-72 sm:w-[230px]
      md:-ml-14  md:h-[300px]
      md:w-[260px] lg:-ml-[8vw]
      lg:h-[320px] lg:w-[280px]
      xl:-ml-[9vw] xl:h-[340px]
      xl:w-[300px] 2xl:-ml-[10vw]
    '
            >
              <Image
                src={PHONE}
                alt={t('phoneAlt') || 'App preview in a hand'}
                fill
                className='object-contain object-left drop-shadow-xl'
                sizes='(max-width: 640px) 200px, (max-width: 768px) 230px, (max-width: 1024px) 260px, (max-width: 1280px) 280px, 300px'
                decoding='async'
                draggable={false}
              />
            </div>
          </div>

          {/* Right: text + button */}
          <div className='md:col-span-7 lg:col-span-7'>
            <h2 className='text-2xl font-extrabold uppercase tracking-wide text-sky-600 sm:text-3xl'>
              {t('title') || 'A COMPETIÇÃO'}
            </h2>

            <div className='mt-4 space-y-4 text-sm leading-relaxed text-slate-700 sm:text-base'>
              <p>{t('p1')}</p>
              <p>{t('p2')}</p>
              <p>{t('p3')}</p>
            </div>

            <Link
              href={t('ctaHref') || '/regulations'}
              className='mt-6 inline-flex items-center rounded-full bg-sky-600 px-6 py-2.5 font-bold text-white shadow-lg ring-1 ring-black/10 hover:bg-sky-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300'
              aria-label={t('cta') || 'Regulamento'}
            >
              {t('cta') || 'REGULAMENTO'}
            </Link>
          </div>
        </div>
      </div>

      {/* Mosaic strip (desktop/tablet) */}
      <div className='mx-auto hidden w-full max-w-screen-2xl px-0 md:block'>
        <div className='relative h-[220px] w-full overflow-hidden'>
          <Image
            src={MOSAIC}
            alt={t('mosaicAlt') || 'Competition photo mosaic'}
            fill
            className='object-cover'
            sizes='100vw'
            decoding='async'
            draggable={false}
            priority={false}
          />
        </div>
      </div>

      {/* Mosaic strip (mobile: uses smaller image) */}
      <div className='mx-auto block w-full max-w-screen-2xl px-0 md:hidden'>
        <div className='relative h-[160px] w-full overflow-hidden'>
          <Image
            src={MOSAIC_2}
            alt={t('mosaicAlt') || 'Competition photo mosaic'}
            fill
            className='object-cover'
            sizes='100vw'
            decoding='async'
            draggable={false}
            priority={false}
          />
        </div>
      </div>
    </section>
  )
}
