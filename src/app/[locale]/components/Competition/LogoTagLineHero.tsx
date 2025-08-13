'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'

export default function LogoTaglineHero() {
  const t = useTranslations('CompetitionPage.LogoTaglineHero')

  const BG = '/img/competition/hero-bg.png'
  const WAVE = '/img/global/ondas-9.png'
  const LOGO = '/img/global/cascais-volley-cup-1-w.png'
  const TAGLINE = '/img/global/tagline-w.png'

  return (
    <section
      aria-label={t('sectionLabel') || 'Cascais Volley Cup banner'}
      className='relative w-full overflow-hidden py-3 sm:py-4'
    >
      {/* Background (decorative) */}
      <Image
        src={BG}
        alt=''
        aria-hidden
        fill
        className='absolute inset-0 -z-10 object-cover'
        sizes='100vw'
        decoding='async'
        loading='lazy'
        draggable={false}
      />

      {/* Wave with content inside */}
      <div className='relative'>
        <div className='relative'>
          {/* MOBILE/TABLET: fixed height; DESKTOP: no crop, keep natural aspect */}
          <Image
            src={WAVE}
            alt=''
            aria-hidden
            width={2048}
            height={150}
            className='block h-[180px] w-full sm:h-[150px] lg:h-auto lg:object-contain'
            sizes='100vw'
            decoding='async'
            loading='lazy'
            draggable={false}
          />

          {/* Content overlay */}
          <div className='absolute inset-0'>
            <div className='mx-auto flex h-full max-w-screen-xl flex-col items-center justify-center gap-3 px-4 sm:flex-row sm:justify-between sm:gap-8'>
              {/* Logo */}
              <Image
                src={LOGO}
                alt={t('logoAlt')}
                width={420}
                height={160}
                className='h-auto w-[180px] sm:w-[260px] lg:w-[320px] xl:w-[340px]'
                sizes='(max-width: 640px) 180px, (max-width: 1024px) 260px, (max-width: 1280px) 320px, 340px'
                decoding='async'
                loading='lazy'
                draggable={false}
              />

              {/* Tagline (hidden on mobile) */}
              <Image
                src={TAGLINE}
                alt={t('taglineAlt')}
                width={400}
                height={140}
                className='hidden h-auto w-[240px] sm:block sm:w-[300px] lg:w-[330px] xl:w-[360px]'
                sizes='(max-width: 1024px) 300px, (max-width: 1280px) 330px, 360px'
                decoding='async'
                loading='lazy'
                draggable={false}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
