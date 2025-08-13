'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { FiSun } from 'react-icons/fi'
import { FaPlane } from 'react-icons/fa'

export default function LandingWelcome() {
  const t = useTranslations('LandingPage.LandingWelcome')

  return (
    <section
      role='region'
      aria-label='Cascais Volley Cup 2026 hero'
      className='relative -mt-16 min-h-screen w-full overflow-hidden md:-mt-20'
    >
      {/* Background (full-bleed) */}
      <Image
        src='/img/landing/hero-bg.png'
        alt='Cascais coastline with player'
        fill
        priority
        sizes='100vw'
        className='z-0 object-cover object-[center_60%] md:object-[center_58%] lg:object-[center_56%]'
      />

      {/* Tagline — centered on mobile, right on desktop */}
      <div className='absolute left-1/2 top-20 z-10 -translate-x-1/2 sm:top-24 md:left-auto md:right-8 md:top-28 md:translate-x-0'>
        <Image
          src='/img/global/tagline.png'
          alt={t('tagline_alt') || 'feel the ACTION, enjoy the SUMMER'}
          width={880}
          height={200}
          priority
          sizes='(max-width: 640px) 240px, (max-width: 1024px) 360px, 520px'
          className='h-auto w-[240px] sm:w-[360px] lg:w-[520px]'
        />
      </div>

      {/* Foreground: center on mobile, offset only on md+ */}
      <div
        className='
          relative z-10 mx-auto flex min-h-screen w-full max-w-screen-2xl
          translate-y-0 flex-col items-center justify-center gap-6 px-12
          sm:px-14 md:translate-y-[20vh] md:flex-row md:items-center md:justify-between lg:translate-y-[18vh]
        '
      >
        {/* Left — logo block */}
        <div className='relative flex flex-col items-start text-left'>
          <Image
            src='/img/global/logo-white.png'
            alt='Cascais Volley Cup 2026'
            width={720}
            height={250}
            priority
            sizes='(max-width: 640px) 260px, (max-width: 1024px) 360px, 480px'
            className='h-auto w-[240px] sm:w-[340px] md:w-[400px] lg:w-[480px]'
          />

          {/* Portugal - top right */}
          <p className='absolute right-2 top-2 text-[11px] font-bold uppercase tracking-[0.25em] text-white sm:text-sm md:text-base'>
            {t('PORTUGAL') || 'PORTUGAL'}
          </p>

          {/* Dates - bottom right */}
          <p className='absolute bottom-2 right-2 text-[12px] font-bold uppercase tracking-wide text-white sm:text-base md:text-lg'>
            {t('dates') || '8 — 12 JULY'}
          </p>
        </div>

        {/* Right — chips block */}
        <div className='flex flex-col items-end gap-4'>
          <InfoChip
            label={t('avg_air_temp') || 'AVG AIR TEMP'}
            value={t('avg_air_temp_value') || '94°F | 34°C'}
            icon='sun'
          />
          <InfoChip
            label={t('airport') || 'AIRPORT (LIS)'}
            value={t('airport_value') || '30 km | 25 min'}
            icon='plane'
          />
        </div>
      </div>
    </section>
  )
}

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
    <div className='flex items-center gap-3 text-white md:gap-4'>
      {/* text block */}
      <div className='flex flex-col text-right leading-tight'>
        <span className='text-base font-extrabold uppercase tracking-wide md:text-lg'>
          {label}
        </span>
        <span className='text-sm font-medium opacity-90 md:text-base'>
          {value}
        </span>
      </div>

      {/* round blue icon on the right */}
      <div className='ml-2 grid h-10 w-10 place-items-center rounded-full bg-sky-500 shadow-[0_4px_14px_rgba(0,0,0,0.25)] md:h-12 md:w-12'>
        <Icon aria-hidden className='text-lg text-white md:text-xl' />
      </div>
    </div>
  )
}
