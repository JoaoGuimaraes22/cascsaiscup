'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'

export default function AccomodationHero() {
  const t = useTranslations('AccommodationPage.Hero')

  // Assets
  const BG = '/img/accommodation/hero-bg.png'
  const WAVE = '/img/global/ondas-3.png'
  const PLAYER = '/img/accommodation/ac-player.png'
  const LOGO = '/img/global/cascais-volley-cup-3.png'

  const WAVE_H = 135 // px

  return (
    <section className='relative min-h-[720px] w-full overflow-hidden pb-[135px]'>
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
      <div className='relative mx-auto max-w-screen-xl px-4 pt-8 sm:pt-12'>
        <div className='grid grid-cols-1 gap-8 lg:grid-cols-12'>
          {/* LEFT */}
          <div className='relative z-10 lg:col-span-7'>
            <h1 className='mb-2 text-2xl font-extrabold uppercase tracking-wide text-sky-600 sm:text-3xl'>
              {t('title')}
            </h1>

            <section className='space-y-4'>
              <h2 className='text-lg font-extrabold uppercase tracking-wide text-sky-700 sm:text-xl'>
                {t('schools.title')}
              </h2>

              <p className='text-sm leading-relaxed text-slate-800/90 sm:text-base'>
                {t('schools.p1')}
              </p>

              <ul className='list-disc pl-5 text-sm leading-relaxed text-slate-800/90 marker:text-slate-500 sm:text-base'>
                <li>{t('schools.list.a')}</li>
                <li>{t('schools.list.b')}</li>
                <li>{t('schools.list.c')}</li>
                <li>{t('schools.list.d')}</li>
              </ul>

              <p className='whitespace-pre-line text-sm leading-relaxed text-slate-800/90 sm:text-base'>
                {t('schools.p2')}
              </p>
            </section>

            <section className='mt-8 space-y-3'>
              <h2 className='text-lg font-extrabold uppercase tracking-wide text-sky-700 sm:text-xl'>
                {t('hotel.title')}
              </h2>
              <p className='text-sm leading-relaxed text-slate-800/90 sm:text-base'>
                {t('hotel.p1')}
              </p>
            </section>
          </div>

          {/* RIGHT */}
          <div className='relative lg:col-span-5'>
            {/* Player (desktop) */}
            <div className='absolute inset-y-0 right-0 hidden w-[38vw] max-w-[520px] lg:block'>
              <Image
                src={PLAYER}
                alt={t('playerAlt')}
                fill
                className='object-contain object-bottom'
                sizes='(max-width: 1280px) 38vw, 520px'
                decoding='async'
                draggable={false}
              />
            </div>

            {/* Mobile/tablet: player + logo side by side */}
            <div className='mt-6 flex w-full items-end justify-between gap-4 lg:hidden'>
              <div className='relative h-44 flex-1 overflow-hidden rounded-md'>
                <Image
                  src={PLAYER}
                  alt={t('playerAlt')}
                  fill
                  className='object-contain object-bottom'
                  sizes='100vw'
                  decoding='async'
                  draggable={false}
                />
              </div>
              <div className='shrink-0'>
                <Image
                  src={LOGO}
                  alt={t('logoAlt')}
                  width={80}
                  height={28}
                  className='h-auto w-[70px] object-contain opacity-95 sm:w-[80px]'
                  sizes='80px'
                  decoding='async'
                  draggable={false}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tiny logo above wave (desktop only) — aligned to container, not viewport */}
      <div
        className='pointer-events-none absolute left-1/2 z-20 hidden w-screen -translate-x-1/2 lg:block'
        style={{ bottom: `calc(${WAVE_H}px + 6px)` }} // 6px above the wave
      >
        <div className='mx-auto max-w-screen-xl px-4'>
          <div className='flex justify-end'>
            <Image
              src={LOGO}
              alt={t('logoAlt')}
              width={80}
              height={28}
              className='h-auto w-[70px] object-contain opacity-95 xl:w-[80px]'
              sizes='80px'
              decoding='async'
              draggable={false}
            />
          </div>
        </div>
      </div>

      {/* ---- Bottom wave (no trim) + stats overlay ---- */}
      <div className='pointer-events-none absolute bottom-0 left-1/2 z-10 w-screen -translate-x-1/2'>
        {/* Desktop: intrinsic ratio + right-aligned stats, nudged down */}
        <div className='relative hidden lg:block'>
          <Image
            src={WAVE}
            alt=''
            width={2048}
            height={WAVE_H}
            className='-mb-px block h-auto w-full'
            sizes='100vw'
          />
          <div className='pointer-events-none absolute inset-0'>
            <div className='mx-auto flex h-full max-w-screen-xl translate-y-[4px] items-center justify-end px-4'>
              <ul className='flex flex-wrap items-center gap-x-6 gap-y-3 text-lg font-extrabold text-white sm:text-xl'>
                <li>{t('stats.teams')}</li>
                <li className='text-2xl leading-none'>•</li>
                <li>{t('stats.athletes')}</li>
                <li className='text-2xl leading-none'>•</li>
                <li>{t('stats.countries')}</li>
                <li className='text-2xl leading-none'>•</li>
                <li>{t('stats.games')}</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Mobile wave (stretched) + centered one-line stats */}
        <div
          className='relative block overflow-hidden bg-center bg-no-repeat [background-size:100%_100%] lg:hidden'
          style={{ backgroundImage: `url(${WAVE})`, height: `${WAVE_H}px` }}
        >
          <div className='absolute inset-0 flex items-center justify-center'>
            <ul className='flex items-center gap-4 whitespace-nowrap px-4 text-[12px] font-extrabold uppercase tracking-wide text-white sm:text-[13px]'>
              <li>{t('stats.teams')}</li>
              <li className='text-lg leading-none'>•</li>
              <li>{t('stats.athletes')}</li>
              <li className='text-lg leading-none'>•</li>
              <li>{t('stats.countries')}</li>
              <li className='text-lg leading-none'>•</li>
              <li>{t('stats.games')}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

/* --- tiny UI bits --- */
function StatBullet({ children }: { children: React.ReactNode }) {
  return <li className='leading-none'>{children}</li>
}
function StatDot() {
  return <li className='text-xl leading-none'>•</li>
}
