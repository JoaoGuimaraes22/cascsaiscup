'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { useEffect, useRef, useState } from 'react'
import { FiClock, FiHeart, FiExternalLink, FiMail } from 'react-icons/fi'
import clsx from 'clsx'

export default function AccommodationFood() {
  const t = useTranslations('AccommodationPage.Food')
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [backgroundLoaded, setBackgroundLoaded] = useState(false)

  // ===== Constants =====
  const ASSETS = {
    background: '/img/about/portugal-bg.png',
    tagline: '/img/global/tagline.png',
    logo: '/img/global/cascais-volley-cup-1.png'
  } as const

  // Meal schedule data
  const MEALS = [
    {
      name: t('breakfast'),
      icon: '🌅',
      time: 'Morning'
    },
    {
      name: t('lunch'),
      icon: '☀️',
      time: 'Afternoon'
    },
    {
      name: t('dinner'),
      icon: '🌙',
      time: 'Evening'
    }
  ] as const

  // Intersection observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className='relative w-full overflow-hidden'
      id='food-meals'
      aria-labelledby='food-meals-title'
    >
      {/* Enhanced Background */}
      <div className='absolute inset-0 -z-10'>
        <div className='absolute inset-0 bg-gradient-to-br from-slate-50 to-slate-100' />
        <Image
          src={ASSETS.background}
          alt=''
          role='presentation'
          fill
          className={clsx(
            'object-cover transition-opacity duration-700',
            backgroundLoaded ? 'opacity-100' : 'opacity-0'
          )}
          sizes='100vw'
          onLoad={() => setBackgroundLoaded(true)}
        />
      </div>

      <div className='mx-auto max-w-screen-xl px-4 py-8 sm:py-12'>
        <div className='grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10'>
          {/* LEFT: Content */}
          <div className='lg:col-span-7 xl:col-span-8'>
            {/* Title */}
            <div
              className={clsx(
                'mb-6 transition-all duration-1000 ease-out',
                isVisible
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-8 opacity-0'
              )}
            >
              <h2
                id='food-meals-title'
                className='mb-3 text-xl font-extrabold uppercase tracking-wide text-sky-500 sm:text-2xl'
              >
                {t('title')}
              </h2>
            </div>

            {/* Main Description */}
            <div
              className={clsx(
                'mb-8 transition-all duration-700 ease-out',
                isVisible
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-4 opacity-0'
              )}
              style={{ transitionDelay: '200ms' }}
            >
              <p className='text-sm leading-relaxed text-slate-800/90 sm:text-base'>
                {t('p1')}
              </p>
            </div>

            {/* Meal Schedule Section */}
            <div
              className={clsx(
                'mb-8 transition-all duration-700 ease-out',
                isVisible
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-4 opacity-0'
              )}
              style={{ transitionDelay: '400ms' }}
            >
              <div className='mb-4 flex items-center gap-3'>
                <FiClock className='h-5 w-5 text-sky-600' />
                <h3 className='text-sm font-semibold text-slate-900 sm:text-base'>
                  {t('scheduleTitle')}
                </h3>
              </div>

              <div className='grid grid-cols-1 gap-3 sm:grid-cols-3'>
                {MEALS.map((meal, index) => (
                  <MealCard
                    key={index}
                    meal={meal}
                    index={index}
                    isVisible={isVisible}
                  />
                ))}
              </div>
            </div>

            {/* Intolerances Info */}
            <div
              className={clsx(
                'mb-8 transition-all duration-700 ease-out',
                isVisible
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-4 opacity-0'
              )}
              style={{ transitionDelay: '800ms' }}
            >
              <div className='mb-3 flex items-center gap-3'>
                <FiHeart className='h-5 w-5 text-sky-600' />
                <h3 className='text-sm font-semibold text-slate-900 sm:text-base'>
                  Special Dietary Requirements
                </h3>
              </div>
              <p className='text-sm leading-relaxed text-slate-800/90 sm:text-base'>
                {t('intolerances')}
              </p>
            </div>

            {/* Action Buttons */}
            <div
              className={clsx(
                'flex flex-wrap items-center gap-3 transition-all duration-700 ease-out',
                isVisible
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-4 opacity-0'
              )}
              style={{ transitionDelay: '1000ms' }}
            >
              <EnhancedButton
                href='/contact'
                variant='primary'
                icon={<FiMail className='h-4 w-4' />}
              >
                {t('ctaContact')}
              </EnhancedButton>

              <EnhancedButton
                href='/accommodation/info'
                variant='secondary'
                icon={<FiExternalLink className='h-4 w-4' />}
              >
                {t('ctaMoreInfo')}
              </EnhancedButton>
            </div>
          </div>

          {/* RIGHT: Tagline + Logo */}
          <div className='relative mt-6 lg:col-span-5 lg:mt-0 xl:col-span-4'>
            <div
              className={clsx(
                'flex h-full flex-col items-center justify-center gap-6 transition-all duration-1000 ease-out lg:items-end lg:justify-between lg:gap-0',
                isVisible
                  ? 'translate-x-0 opacity-100'
                  : 'translate-x-8 opacity-0'
              )}
              style={{ transitionDelay: '600ms' }}
            >
              {/* Tagline */}
              <div className='w-[160px] sm:w-[240px] lg:w-[300px] xl:w-[360px]'>
                <Image
                  src={ASSETS.tagline}
                  alt={t('taglineAlt')}
                  width={360}
                  height={160}
                  className='h-auto w-full object-contain transition-transform duration-300 hover:scale-105'
                  sizes='(max-width: 640px) 160px, (max-width: 1024px) 240px, (max-width: 1280px) 300px, 360px'
                />
              </div>

              {/* Logo */}
              <div className='w-[160px] sm:w-[240px] lg:w-[300px] xl:w-[360px]'>
                <Image
                  src={ASSETS.logo}
                  alt={t('logoAlt')}
                  width={360}
                  height={110}
                  className='h-auto w-full object-contain opacity-95 transition-transform duration-300 hover:scale-105'
                  sizes='(max-width: 640px) 160px, (max-width: 1024px) 240px, (max-width: 1280px) 300px, 360px'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* --- Enhanced Components --- */

interface MealCardProps {
  meal: {
    name: string
    icon: string
    time: string
  }
  index: number
  isVisible: boolean
}

function MealCard({ meal, index, isVisible }: MealCardProps) {
  return (
    <div
      className={clsx(
        'group rounded-xl bg-white/60 p-4 text-center backdrop-blur-sm transition-all duration-500 ease-out',
        'hover:-translate-y-1 hover:bg-white/80 hover:shadow-lg',
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      )}
      style={{
        transitionDelay: `${600 + index * 100}ms`
      }}
    >
      {/* Emoji Icon */}
      <div className='mb-2 text-2xl transition-transform duration-300 group-hover:scale-110'>
        {meal.icon}
      </div>

      {/* Meal Name */}
      <h4 className='mb-1 text-sm font-bold text-slate-800 sm:text-base'>
        {meal.name}
      </h4>

      {/* Time */}
      <p className='text-xs text-slate-600 sm:text-sm'>{meal.time}</p>
    </div>
  )
}

interface EnhancedButtonProps {
  href: string
  variant: 'primary' | 'secondary'
  children: React.ReactNode
  icon?: React.ReactNode
}

function EnhancedButton({
  href,
  variant,
  children,
  icon
}: EnhancedButtonProps) {
  const baseClasses =
    'group relative inline-flex items-center gap-2 overflow-hidden rounded-full px-5 py-2 text-sm font-bold shadow-lg transition-all duration-300 hover:scale-105 focus:outline-none focus-visible:ring-2 sm:text-base'

  const variantClasses =
    variant === 'primary'
      ? 'bg-sky-600 text-white ring-1 ring-black/10 hover:bg-sky-700 hover:shadow-xl focus-visible:ring-sky-300'
      : 'bg-white/90 text-sky-700 ring-1 ring-sky-600/40 hover:bg-white hover:shadow-xl focus-visible:ring-sky-300'

  return (
    <Link href={href} className={clsx(baseClasses, variantClasses)}>
      <span className='relative z-10 flex items-center gap-2'>
        {icon && (
          <span className='transition-transform duration-300 group-hover:-translate-y-0.5'>
            {icon}
          </span>
        )}
        {children}
      </span>

      {/* Shimmer effect */}
      <div className='absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-full' />
    </Link>
  )
}
