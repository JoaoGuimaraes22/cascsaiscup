'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { MouseEvent } from 'react'

export default function HallOfFameHero() {
  const t = useTranslations('HallOfFamePage.Hero')

  // ====== Assets ======
  const BG = '/img/hall-of-fame/hero-bg.png' // subtle background behind everything
  const HERO_IMG = '/img/hall-of-fame/players.png' // right-side players image
  const WAVE = '/img/global/ondas-10.png' // bottom ribbon/wave
  const LOGO = '/img/global/cascais-volley-cup-1-w.png' // white logo inside the wave
  const MVP_LOGO = '/img/hall-of-fame/mvp-logo.png' // "MVP 2025" lockup

  const WAVE_H = 150

  const onSeeMore = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const el = document.getElementById('hall-of-fame-teams')
    if (!el) {
      window.location.hash = '#hall-of-fame-teams'
      return
    }
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
  }

  return (
    <section
      className='relative w-full overflow-hidden'
      style={{ paddingBottom: `${WAVE_H}px` }}
    >
      {/* Soft background */}
      <Image
        src={BG}
        alt=''
        role='presentation'
        fill
        priority
        sizes='100vw'
        className='absolute inset-0 -z-10 object-cover opacity-40'
      />

      <div className='mx-auto max-w-screen-xl px-4 pt-8 sm:pt-12'>
        <div className='grid grid-cols-1 gap-8 lg:grid-cols-12'>
          {/* Left: text */}
          <div className='lg:col-span-7'>
            <h1 className='mb-3 text-2xl font-extrabold uppercase tracking-wide text-sky-600 sm:text-3xl'>
              {t('title')}
            </h1>

            <p className='max-w-3xl text-sm leading-relaxed text-slate-800/90 sm:text-base'>
              {t('intro')}
            </p>

            <a
              href='#hall-of-fame-teams'
              onClick={onSeeMore}
              className='mt-5 inline-flex items-center rounded-full bg-sky-700 px-5 py-2 text-sm font-bold text-white shadow-lg ring-1 ring-black/10 hover:bg-sky-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 sm:mt-6 sm:text-base'
            >
              {t('see_more')}
            </a>
          </div>

          {/* Right: players image */}
          <div className='relative lg:col-span-5'>
            <div
              className='relative z-10 mx-auto -mt-2 h-[320px] w-full overflow-visible
                         [-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_70%,transparent_100%)]
                         [mask-image:linear-gradient(to_bottom,black_0%,black_70%,transparent_100%)]
                         sm:-mt-4 sm:h-[380px] lg:-mt-6 lg:h-[460px] xl:h-[520px]'
            >
              <Image
                src={HERO_IMG}
                alt={t('hero_alt')}
                fill
                sizes='(max-width: 1024px) 90vw, 700px'
                className='object-contain object-bottom'
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Wave with logo (left) + MVP logo (right) */}
      <div className='pointer-events-none absolute bottom-0 left-1/2 w-screen -translate-x-1/2'>
        {/* Desktop */}
        <div className='relative hidden lg:block'>
          <Image
            src={WAVE}
            alt=''
            role='presentation'
            width={2048}
            height={WAVE_H}
            className='z-10 -mb-px block h-auto w-full'
            sizes='100vw'
          />
          <div className='pointer-events-none absolute inset-0 z-30'>
            <div className='mx-auto flex h-full max-w-screen-xl items-center justify-between px-4'>
              {/* Logo left */}
              <Image
                src={LOGO}
                alt={t('logoAlt')}
                width={240}
                height={96}
                className='h-[60px] w-auto sm:h-[68px]'
              />
              {/* MVP logo right */}
              <Image
                src={MVP_LOGO}
                alt={t('mvpAlt')}
                width={280}
                height={90}
                className='h-[54px] w-auto sm:h-[64px]'
              />
            </div>
          </div>
        </div>

        {/* Mobile: wave as background with the two images inside */}
        <div
          className='relative block lg:hidden'
          style={{
            backgroundImage: `url(${WAVE})`,
            backgroundSize: '100% 100%',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            height: `${WAVE_H}px`
          }}
        >
          <div className='pointer-events-none absolute inset-0 z-10 flex items-center justify-between px-4'>
            <Image
              src={LOGO}
              alt={t('logoAlt')}
              width={150}
              height={60}
              className='h-[36px] w-auto'
            />
            <Image
              src={MVP_LOGO}
              alt={t('mvpAlt')}
              width={140} // reduced
              height={48} // reduced
              className='h-[32px] w-auto'
            />
          </div>
        </div>
      </div>
    </section>
  )
}
