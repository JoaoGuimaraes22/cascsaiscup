'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import clsx from 'clsx'

export default function AccommodationHero() {
  const t = useTranslations('AccommodationPage.Hero')

  // Assets
  const BG = '/img/accommodation/hero-bg.png'
  const WAVE = '/img/global/ondas-3.png'
  const PLAYER = '/img/accommodation/ac-player.png'
  const LOGO = '/img/global/cascais-volley-cup-3.png'

  const WAVE_H = 135 // px

  return (
    <section
      className='relative min-h-[720px] w-full overflow-hidden'
      style={{ paddingBottom: `${WAVE_H}px` }}
    >
      {/* Background (decorative) */}
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

      {/* Mobile: player BEHIND the text */}
      <div className='pointer-events-none absolute inset-x-0 top-0 z-0 h-[80vh] lg:hidden'>
        <Image
          src={PLAYER}
          alt=''
          fill
          className='object-contain object-top opacity-10'
          sizes='100vw'
          decoding='async'
          draggable={false}
        />
      </div>

      {/* Content */}
      <div className='relative z-10 mx-auto max-w-screen-xl px-4 pt-8 sm:pt-12'>
        <div className='grid grid-cols-1 gap-8 lg:grid-cols-12'>
          {/* LEFT */}
          <div className='relative lg:col-span-7'>
            <h1 className='mb-2 text-2xl font-extrabold uppercase tracking-wide text-sky-500 sm:text-3xl'>
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
            <div className='absolute inset-y-0 right-[-6vw] hidden w-[65vw] max-w-[900px] lg:block'>
              <Image
                src={PLAYER}
                alt={t('playerAlt')}
                fill
                className='object-contain object-bottom'
                sizes='(max-width: 1280px) 65vw, 900px'
                decoding='async'
                draggable={false}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Tiny logo above wave (desktop only) */}
      <div
        className='pointer-events-none absolute left-1/2 z-20 hidden w-screen -translate-x-1/2 lg:block'
        style={{ bottom: `calc(${WAVE_H}px + 6px)` }}
      >
        <div className='mx-auto max-w-screen-xl px-4'>
          <div className='flex justify-end'>
            <Logo
              src={LOGO}
              alt={t('logoAlt')}
              width={80}
              className='opacity-95'
            />
          </div>
        </div>
      </div>

      {/* ---- Bottom wave + stats overlay ---- */}
      <div className='pointer-events-none absolute bottom-0 left-1/2 z-10 w-screen -translate-x-1/2'>
        {/* Desktop: intrinsic ratio + right-aligned stats */}
        <div className='relative hidden lg:block'>
          <Image
            src={WAVE}
            alt=''
            width={2048}
            height={WAVE_H}
            className='-mb-px block h-auto w-full'
            sizes='100vw'
            decoding='async'
            draggable={false}
          />
          <div className='absolute inset-0'>
            <div className='mx-auto flex h-full max-w-screen-xl items-center justify-end px-4'>
              <StatsList
                items={[
                  t('stats.teams'),
                  t('stats.athletes'),
                  t('stats.countries'),
                  t('stats.games')
                ]}
              />
            </div>
          </div>
        </div>

        {/* Mobile wave (stretched) + centered one-line stats */}
        <div
          className='relative block overflow-hidden bg-center bg-no-repeat [background-size:100%_100%] lg:hidden'
          style={{ backgroundImage: `url(${WAVE})`, height: `${WAVE_H}px` }}
        >
          <div className='absolute inset-0 flex items-center justify-center'>
            <StatsList
              compact
              items={[
                t('stats.teams'),
                t('stats.athletes'),
                t('stats.countries'),
                t('stats.games')
              ]}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

/* --- tiny UI bits --- */

function Logo({
  src,
  alt,
  width = 80,
  className
}: {
  src: string
  alt: string
  width?: number
  className?: string
}) {
  const height = Math.round((width * 28) / 80)
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={clsx('h-auto object-contain', className)}
      sizes={`${width}px`}
      decoding='async'
      draggable={false}
    />
  )
}

function StatsList({
  items,
  compact = false
}: {
  items: string[]
  compact?: boolean
}) {
  return (
    <ul
      aria-label='Tournament stats'
      className={clsx(
        'flex items-center whitespace-nowrap font-extrabold uppercase text-white',
        compact
          ? 'gap-2 px-2 text-[10px] tracking-tight' // mobile/compact: tighter, one line
          : 'gap-3 px-3 text-[11px] tracking-normal sm:gap-4 sm:text-[13px] sm:tracking-wide lg:gap-6 lg:text-lg'
      )}
    >
      {items.map((item, i) => (
        <li
          key={i}
          className={clsx(
            'flex items-center',
            compact ? 'gap-2' : 'gap-3 sm:gap-4 lg:gap-6'
          )}
        >
          <span>{item}</span>
          {i < items.length - 1 && (
            <span
              className={clsx(
                'leading-none',
                compact ? 'text-xs' : 'text-sm sm:text-lg lg:text-2xl'
              )}
            >
              •
            </span>
          )}
        </li>
      ))}
    </ul>
  )
}
