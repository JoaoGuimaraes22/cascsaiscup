'use client'

import { FC, useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { FiSun } from 'react-icons/fi'
import { FaPlane, FaMapPin, FaCalendarAlt } from 'react-icons/fa'
import clsx from 'clsx'

interface InfoChipData {
  label: string
  value: string
  icon: 'sun' | 'plane' | 'location' | 'calendar'
}

export default function LandingWelcome() {
  const t = useTranslations('LandingPage.Welcome')
  const [isLoaded, setIsLoaded] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  // Assets
  const BG = '/img/landing/hero-bg.png'
  const TAGLINE = '/img/global/tagline.png'
  const LOGO = '/img/global/logo-white.png'

  // Parallax effect for tagline
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)

    let ticking = false
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', throttledScroll, { passive: true })
    return () => window.removeEventListener('scroll', throttledScroll)
  }, [])

  // Load animation trigger
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const infoChips: InfoChipData[] = [
    {
      label: t('avg_air_temp') || 'AVG AIR TEMP',
      value: t('avg_air_temp_value') || '94°F | 34°C',
      icon: 'sun'
    },
    {
      label: t('airport') || 'AIRPORT (LIS)',
      value: t('airport_value') || '30 km | 25 min',
      icon: 'plane'
    },
    {
      label: t('location') || 'LOCATION',
      value: t('location_value') || 'CASCAIS BEACH',
      icon: 'location'
    }
  ]

  return (
    <section
      role='region'
      aria-labelledby='hero-heading'
      className='relative -mt-16 min-h-screen w-full overflow-hidden md:-mt-20'
    >
      {/* Background with subtle parallax */}
      <div className='absolute inset-0 z-0'>
        <Image
          src={BG}
          alt=''
          role='presentation'
          fill
          priority
          sizes='100vw'
          className='object-cover object-[center_60%] md:object-[center_58%] lg:object-[center_56%]'
          style={{
            transform: `translateY(${scrollY * 0.5}px)`
          }}
        />
        {/* Gradient overlay for better text readability */}
        <div className='absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent' />
      </div>

      {/* Floating tagline with subtle parallax */}
      <div
        className='absolute right-4 top-20 z-20 sm:right-6 sm:top-24 md:right-8 md:top-28'
        style={{
          transform: `translateY(${scrollY * 0.2}px)`
        }}
      >
        <div
          className={clsx(
            'transition-all duration-1000 ease-out',
            isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
          )}
        >
          <Image
            src={TAGLINE}
            alt={t('tagline_alt') || 'feel the ACTION, enjoy the SUMMER'}
            width={880}
            height={200}
            priority
            sizes='(max-width: 640px) 280px, (max-width: 1024px) 380px, 520px'
            className='h-auto w-[280px] drop-shadow-lg sm:w-[380px] lg:w-[520px]'
          />
        </div>
      </div>

      {/* Main content */}
      <div className='relative z-10 mx-auto flex min-h-screen w-full max-w-screen-2xl translate-y-0 flex-col items-center justify-center gap-7 px-6 sm:gap-8 sm:px-10 md:translate-y-[18vh] md:flex-row md:items-center md:justify-between'>
        {/* Left side - Event logo with animations */}
        <div className='relative flex flex-col items-start'>
          <div
            className={clsx(
              'transition-all delay-300 duration-1000 ease-out',
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            )}
          >
            <Image
              src={LOGO}
              alt='Cascais Volley Cup 2026'
              width={720}
              height={250}
              priority
              sizes='(max-width: 640px) 300px, (max-width: 1024px) 400px, 500px'
              className='h-auto w-[300px] drop-shadow-2xl sm:w-[380px] md:w-[420px] lg:w-[500px]'
            />
          </div>

          {/* Portugal - animated entrance */}
          <div
            className={clsx(
              'absolute right-2 top-2 transition-all delay-500 duration-700 ease-out',
              isLoaded
                ? 'translate-y-0 opacity-100'
                : '-translate-y-2 opacity-0'
            )}
          >
            <p className='text-[12px] font-bold uppercase tracking-[0.25em] text-white drop-shadow-md sm:text-sm md:text-base'>
              {t('PORTUGAL') || 'PORTUGAL'}
            </p>
          </div>

          {/* Dates - animated entrance */}
          <div
            className={clsx(
              'absolute bottom-2 right-2 transition-all delay-700 duration-700 ease-out',
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
            )}
          >
            <p className='text-[13px] font-bold uppercase tracking-wide text-white drop-shadow-md sm:text-base md:text-lg'>
              {t('dates') || '8 — 12 JULY'}
            </p>
          </div>
        </div>

        {/* Right side - Info chips with staggered animations */}
        <div className='flex flex-col items-end gap-4 sm:gap-5'>
          {infoChips.map((chip, index) => (
            <div
              key={chip.label}
              className={clsx(
                'transition-all duration-700 ease-out',
                isLoaded
                  ? 'translate-x-0 opacity-100'
                  : 'translate-x-8 opacity-0'
              )}
              style={{
                transitionDelay: `${600 + index * 150}ms`
              }}
            >
              <InfoChip {...chip} />
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className={clsx(
          'absolute bottom-8 left-1/2 -translate-x-1/2 text-white transition-all delay-1000 duration-1000 ease-out',
          isLoaded ? 'translate-y-0 opacity-70' : 'translate-y-4 opacity-0'
        )}
      >
        <div className='flex flex-col items-center gap-2'>
          <span className='text-xs font-medium uppercase tracking-wider'>
            {t('scrollDown') || 'Scroll Down'}
          </span>
          <div className='h-8 w-px animate-pulse bg-white/60' />
        </div>
      </div>
    </section>
  )
}

const InfoChip: FC<InfoChipData> = ({ label, value, icon }) => {
  const getIcon = useCallback(() => {
    const iconProps = {
      'aria-hidden': true,
      className: 'text-xl text-white sm:text-2xl'
    }

    switch (icon) {
      case 'sun':
        return <FiSun {...iconProps} />
      case 'plane':
        return <FaPlane {...iconProps} />
      case 'location':
        return <FaMapPin {...iconProps} />
      case 'calendar':
        return <FaCalendarAlt {...iconProps} />
      default:
        return <FiSun {...iconProps} />
    }
  }, [icon])

  return (
    <div className='group flex items-center gap-3 text-white transition-all hover:scale-105 sm:gap-4'>
      {/* Text block */}
      <div className='flex flex-col text-right leading-tight'>
        <span className='text-lg font-extrabold uppercase tracking-wide drop-shadow-md transition-colors group-hover:text-sky-200 sm:text-xl'>
          {label}
        </span>
        <span className='text-base font-medium opacity-90 drop-shadow-sm transition-opacity group-hover:opacity-100 sm:text-lg'>
          {value}
        </span>
      </div>

      {/* Icon circle with hover effects */}
      <div className='ml-2 grid h-11 w-11 place-items-center rounded-full bg-sky-500 shadow-[0_4px_14px_rgba(0,0,0,0.25)] transition-all group-hover:scale-110 group-hover:bg-sky-400 group-hover:shadow-[0_6px_20px_rgba(0,0,0,0.3)] sm:h-12 sm:w-12'>
        {getIcon()}
      </div>
    </div>
  )
}
