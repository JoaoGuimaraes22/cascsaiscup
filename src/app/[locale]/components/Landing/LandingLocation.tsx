'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { FiSun } from 'react-icons/fi'
import { FaPlane } from 'react-icons/fa'
import clsx from 'clsx'

export default function LandingLocation() {
  const t = useTranslations('LandingPage.Location')

  // ====== Assets ======
  const BG = '/img/landing/home-page-2-2.png'
  const MAP = '/img/landing/mapa.png'
  const TAGLINE = '/img/global/tagline.png'
  const WAVE = '/img/global/ondas-3.png'

  const WAVE_H = 135 // px

  return (
    <section
      className='relative isolate min-h-[720px] overflow-hidden sm:min-h-[800px] lg:min-h-[880px]'
      style={{ paddingBottom: `${WAVE_H}px` }}
    >
      {/* Background */}
      <Image
        src={BG}
        alt=''
        fill
        priority
        className='absolute inset-0 -z-10 object-cover object-[50%_80%] md:object-[50%_78%] lg:object-[50%_76%]'
      />

      {/* Content container */}
      <div className='mx-auto grid max-w-screen-xl grid-cols-1 gap-10 px-4 pb-10 pt-[clamp(32px,4vw,64px)] sm:px-4 sm:pb-12 lg:grid-cols-12'>
        {/* LEFT: title + copy + map */}
        <div className='lg:col-span-7'>
          <h1 className='mb-4 text-2xl font-extrabold uppercase tracking-wide text-sky-500 sm:text-3xl lg:text-[32px]'>
            {t('title')}
          </h1>

          <p className='mb-4 max-w-prose text-sm leading-relaxed text-slate-800/90 sm:text-base'>
            {t('p1')}
          </p>
          <p className='mb-6 max-w-prose text-sm leading-relaxed text-slate-800/90 sm:text-base'>
            {t('p2_prefix')}
            <span className='font-extrabold'>{t('flixbus')}</span>
            {t('p2_suffix')}
          </p>

          {/* Map block */}
          <div className='rounded-md bg-sky-600/80 p-3 shadow-lg ring-1 ring-black/5 sm:p-4 md:max-w-[640px]'>
            <div className='overflow-hidden rounded-md bg-white'>
              <Image
                src={MAP}
                alt='Mapa Lisboa — Cascais'
                width={768}
                height={456}
                className='h-auto w-full object-cover'
                priority
              />
            </div>
          </div>
        </div>

        {/* RIGHT: tagline + chips + CTA (left on mobile, right on desktop) */}
        <div className='relative flex flex-col items-start gap-4 lg:col-span-5 lg:items-end'>
          <div className='w-[260px] self-start sm:w-[360px] lg:w-[420px] lg:self-end'>
            <Image
              src={TAGLINE}
              alt='feel the ACTION, enjoy the SUMMER'
              width={1000}
              height={215}
              className='h-auto w-full object-contain'
            />
          </div>

          <div className='mt-2 flex flex-col items-start gap-3 lg:items-end'>
            <InfoChip
              icon='sun'
              label={t('avg_air_temp')}
              value={t('avg_air_temp_value')}
            />
            <InfoChip
              icon='plane'
              label={t('airport')}
              value={t('airport_value')}
            />
          </div>

          <button
            type='button'
            className='mt-3 inline-flex items-center self-start rounded-full bg-sky-600 px-5 py-2 text-sm font-bold text-white shadow-lg ring-1 ring-black/10 hover:bg-sky-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 sm:text-base lg:self-end'
          >
            {t('cta')}
          </button>
        </div>
      </div>

      {/* ---- Bottom wave + stats ---- */}
      <div className='absolute bottom-0 left-1/2 w-screen -translate-x-1/2'>
        <Image
          src={WAVE}
          alt=''
          width={1920}
          height={WAVE_H}
          className='-mb-px block w-full object-cover'
          style={{ height: `${WAVE_H}px` }}
        />

        {/* stats overlay: centered on mobile, LEFT on desktop */}
        <div className='pointer-events-none absolute inset-0'>
          <div className='mx-auto flex h-full max-w-screen-xl items-center justify-center px-4 lg:justify-start'>
            {/* Mobile: compact, single-line */}
            <div className='block lg:hidden'>
              <StatsList
                compact
                items={[
                  t('stats_teams'),
                  t('stats_athletes'),
                  t('stats_countries'),
                  t('stats_games')
                ]}
              />
            </div>
            {/* Desktop: normal, left-aligned */}
            <div className='hidden lg:block'>
              <StatsList
                items={[
                  t('stats_teams'),
                  t('stats_athletes'),
                  t('stats_countries'),
                  t('stats_games')
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* -------- UI Bits -------- */

function InfoChip({
  label,
  value,
  icon
}: {
  label: string
  value: string
  icon: 'sun' | 'plane'
}) {
  const Icon = icon === 'sun' ? FiSun : FaPlane
  return (
    <div className='flex items-center gap-3 rounded-2xl bg-white/85 px-4 py-3 shadow-lg ring-1 ring-black/5 backdrop-blur-sm'>
      <div className='grid h-9 w-9 place-items-center rounded-full bg-sky-500 shadow-md ring-1 ring-black/10'>
        <Icon aria-hidden className='text-white' />
      </div>
      <div className='leading-tight'>
        <div className='text-[12px] font-extrabold tracking-wide text-slate-700 sm:text-[13px]'>
          {label}
        </div>
        <div className='text-[13px] font-bold text-slate-900 sm:text-sm'>
          {value}
        </div>
      </div>
    </div>
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
          ? 'gap-2 px-2 text-[10px] tracking-tight' // tighter for mobile, one line
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
