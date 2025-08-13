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
      {/* Background */}
      <Image
        src='/img/landing/hero-bg.png'
        alt='Cascais coastline with player'
        fill
        priority
        sizes='100vw'
        className='z-0 object-cover object-[center_60%] md:object-[center_58%] lg:object-[center_56%]'
      />

      {/* Tagline — RIGHT on mobile & desktop */}
      <div className='absolute right-4 top-20 z-10 sm:right-6 sm:top-24 md:right-8 md:top-28'>
        <Image
          src='/img/global/tagline.png'
          alt={t('tagline_alt') || 'feel the ACTION, enjoy the SUMMER'}
          width={880}
          height={200}
          priority
          sizes='(max-width: 640px) 280px, (max-width: 1024px) 380px, 520px'
          className='h-auto w-[280px] sm:w-[380px] lg:w-[520px]'
        />
      </div>

      {/* Foreground content — centered vertically on mobile; larger sizing */}
      <div
        className='
          relative z-10 mx-auto flex min-h-screen w-full max-w-screen-2xl
          translate-y-0 flex-col items-center justify-center gap-7 px-6
          sm:gap-8 sm:px-10
          md:translate-y-[18vh] md:flex-row md:items-center md:justify-between
        '
      >
        {/* Left — event logo */}
        <div className='relative flex flex-col items-start'>
          <Image
            src='/img/global/logo-white.png'
            alt='Cascais Volley Cup 2026'
            width={720}
            height={250}
            priority
            sizes='(max-width: 640px) 300px, (max-width: 1024px) 400px, 500px'
            className='h-auto w-[300px] sm:w-[380px] md:w-[420px] lg:w-[500px]'
          />

          {/* Portugal - top right of logo */}
          <p className='absolute right-2 top-2 text-[12px] font-bold uppercase tracking-[0.25em] text-white sm:text-sm md:text-base'>
            {t('PORTUGAL') || 'PORTUGAL'}
          </p>

          {/* Dates - bottom right of logo */}
          <p className='absolute bottom-2 right-2 text-[13px] font-bold uppercase tracking-wide text-white sm:text-base md:text-lg'>
            {t('dates') || '8 — 12 JULY'}
          </p>
        </div>

        {/* Right — info chips */}
        <div className='flex flex-col items-end gap-4 sm:gap-5'>
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
    <div className='flex items-center gap-3 text-white sm:gap-4'>
      {/* text block (bigger on mobile now) */}
      <div className='flex flex-col text-right leading-tight'>
        <span className='text-lg font-extrabold uppercase tracking-wide sm:text-xl'>
          {label}
        </span>
        <span className='text-base font-medium opacity-90 sm:text-lg'>
          {value}
        </span>
      </div>

      {/* round blue icon on the right (slightly larger on mobile) */}
      <div className='ml-2 grid h-11 w-11 place-items-center rounded-full bg-sky-500 shadow-[0_4px_14px_rgba(0,0,0,0.25)] sm:h-12 sm:w-12'>
        <Icon aria-hidden className='text-xl text-white sm:text-2xl' />
      </div>
    </div>
  )
}
