'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { useEffect, useRef, useState } from 'react'
import { FiArrowDown } from 'react-icons/fi'
import clsx from 'clsx'

export default function AccommodationHero() {
  const t = useTranslations('AccommodationPage.Hero')
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [backgroundLoaded, setBackgroundLoaded] = useState(false)

  // ===== Constants =====
  const ASSETS = {
    background: '/img/accommodation/hero-bg.png',
    wave: '/img/global/ondas-3.png',
    player: '/img/accommodation/ac-player.png',
    logo: '/img/global/cascais-volley-cup-3.png'
  } as const

  const WAVE_HEIGHT = 135

  const STATS = [
    t('stats.teams'),
    t('stats.athletes'),
    t('stats.countries'),
    t('stats.games')
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
      className='relative min-h-[90vh] w-full overflow-hidden'
      style={{ paddingBottom: `${WAVE_HEIGHT}px` }}
      aria-labelledby='accommodation-title'
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
          priority
          onLoad={() => setBackgroundLoaded(true)}
        />
      </div>

      {/* Mobile: Enhanced player background */}
      <div className='pointer-events-none absolute inset-x-0 top-0 z-0 h-[80vh] lg:hidden'>
        <Image
          src={ASSETS.player}
          alt=''
          role='presentation'
          fill
          className={clsx(
            'object-contain object-top transition-opacity duration-1000',
            isVisible ? 'opacity-20' : 'opacity-10'
          )}
          sizes='100vw'
        />
      </div>

      {/* Content */}
      <div className='relative z-10 mx-auto max-w-screen-xl px-4 pt-8 sm:pt-12'>
        <div className='grid grid-cols-1 gap-8 lg:grid-cols-12'>
          {/* LEFT CONTENT */}
          <div className='relative lg:col-span-7'>
            {/* Title */}
            <div
              className={clsx(
                'mb-8 transition-all duration-1000 ease-out',
                isVisible
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-8 opacity-0'
              )}
            >
              <h1
                id='accommodation-title'
                className='mb-2 text-2xl font-extrabold uppercase tracking-wide text-sky-500 sm:text-3xl'
              >
                {t('title')}
              </h1>
            </div>

            {/* Schools Section */}
            <AccommodationSection
              title={t('schools.title')}
              delay={200}
              isVisible={isVisible}
            >
              <p className='mb-4 text-sm leading-relaxed text-slate-800/90 sm:text-base'>
                {t('schools.p1')}
              </p>

              <ul className='mb-4 space-y-2'>
                {[
                  t('schools.list.a'),
                  t('schools.list.b'),
                  t('schools.list.c'),
                  t('schools.list.d')
                ].map((item, index) => (
                  <li
                    key={index}
                    className='flex items-start gap-3 text-sm leading-relaxed text-slate-800/90 sm:text-base'
                  >
                    <span className='mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-sky-500' />
                    {item}
                  </li>
                ))}
              </ul>

              <p className='whitespace-pre-line text-sm leading-relaxed text-slate-800/90 sm:text-base'>
                {t('schools.p2')}
              </p>
            </AccommodationSection>

            {/* Hotel Section */}
            <AccommodationSection
              title={t('hotel.title')}
              delay={400}
              isVisible={isVisible}
            >
              <p className='mb-6 text-sm leading-relaxed text-slate-800/90 sm:text-base'>
                {t('hotel.p1')}
              </p>
            </AccommodationSection>

            {/* Food & Meals CTA */}
            <div
              className={clsx(
                'mt-8 transition-all duration-700 ease-out',
                isVisible
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-8 opacity-0'
              )}
              style={{ transitionDelay: '600ms' }}
            >
              <FoodMealsButton />
            </div>
          </div>

          {/* RIGHT CONTENT - Player Image */}
          <div className='relative lg:col-span-5'>
            <div
              className={clsx(
                'absolute inset-y-0 right-[-6vw] hidden w-[65vw] max-w-[900px] transition-all duration-1000 ease-out lg:block',
                isVisible
                  ? 'translate-x-0 opacity-100'
                  : 'translate-x-8 opacity-0'
              )}
              style={{ transitionDelay: '600ms' }}
            >
              <Image
                src={ASSETS.player}
                alt={t('playerAlt')}
                fill
                className='object-contain object-bottom transition-transform duration-300 hover:scale-105'
                sizes='(max-width: 1280px) 65vw, 900px'
              />
            </div>
          </div>
        </div>
      </div>

      {/* Logo above wave (desktop only) */}
      <div
        className='pointer-events-none absolute left-1/2 z-20 hidden w-screen -translate-x-1/2 lg:block'
        style={{ bottom: `calc(${WAVE_HEIGHT}px + 6px)` }}
      >
        <div className='mx-auto max-w-screen-xl px-4'>
          <div
            className={clsx(
              'flex justify-end transition-all duration-700 ease-out',
              isVisible ? 'translate-y-0 opacity-95' : 'translate-y-4 opacity-0'
            )}
            style={{ transitionDelay: '800ms' }}
          >
            <Logo
              src={ASSETS.logo}
              alt={t('logoAlt')}
              width={80}
              className='transition-transform duration-300 hover:scale-105'
            />
          </div>
        </div>
      </div>

      {/* Wave with Stats */}
      <WaveWithStats
        waveHeight={WAVE_HEIGHT}
        stats={STATS}
        isVisible={isVisible}
      />
    </section>
  )
}

/* --- Enhanced Components --- */

interface AccommodationSectionProps {
  title: string
  children: React.ReactNode
  delay: number
  isVisible: boolean
}

function AccommodationSection({
  title,
  children,
  delay,
  isVisible
}: AccommodationSectionProps) {
  return (
    <section
      className={clsx(
        'mb-8 space-y-4 transition-all duration-700 ease-out',
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <h2 className='text-lg font-extrabold uppercase tracking-wide text-sky-700 sm:text-xl'>
        {title}
      </h2>
      <div>{children}</div>
    </section>
  )
}

function FoodMealsButton() {
  const scrollToFoodMeals = () => {
    const foodSection = document.getElementById('food-meals')
    if (foodSection) {
      foodSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <button
      onClick={scrollToFoodMeals}
      className='group inline-flex items-center gap-2 rounded-full bg-sky-600 px-6 py-3 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-sky-700 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 sm:text-base'
    >
      <span>Go to Food & Meals</span>
      <FiArrowDown className='h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5' />
    </button>
  )
}

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
    />
  )
}

interface WaveWithStatsProps {
  waveHeight: number
  stats: readonly string[]
  isVisible: boolean
}

function WaveWithStats({ waveHeight, stats, isVisible }: WaveWithStatsProps) {
  return (
    <div className='pointer-events-none absolute bottom-0 left-1/2 w-screen -translate-x-1/2'>
      {/* Desktop */}
      <div className='relative hidden lg:block'>
        <Image
          src='/img/global/ondas-3.png'
          alt=''
          role='presentation'
          width={2048}
          height={waveHeight}
          className='z-10 -mb-px block h-auto w-full'
          sizes='100vw'
        />
        <div className='pointer-events-none absolute inset-0 z-30'>
          <div className='mx-auto flex h-full max-w-screen-xl items-center justify-end px-4'>
            <div
              className={clsx(
                'transition-all duration-1000 ease-out',
                isVisible
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-4 opacity-0'
              )}
              style={{ transitionDelay: '1000ms' }}
            >
              <StatsList items={stats} />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div
        className='relative block lg:hidden'
        style={{
          backgroundImage: 'url(/img/global/ondas-3.png)',
          backgroundSize: '100% 100%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          height: `${waveHeight}px`
        }}
      >
        <div className='pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-4'>
          <div
            className={clsx(
              'transition-all duration-1000 ease-out',
              isVisible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-4 opacity-0'
            )}
            style={{ transitionDelay: '1000ms' }}
          >
            <StatsList compact items={stats} />
          </div>
        </div>
      </div>
    </div>
  )
}

interface StatsListProps {
  items: readonly string[]
  compact?: boolean
}

function StatsList({ items, compact = false }: StatsListProps) {
  return (
    <ul
      aria-label='Tournament statistics'
      className={clsx(
        'flex items-center whitespace-nowrap font-extrabold uppercase text-white',
        compact
          ? 'gap-2 px-2 text-[10px] tracking-tight'
          : 'gap-3 px-3 text-[11px] tracking-normal sm:gap-4 sm:text-[13px] sm:tracking-wide lg:gap-6 lg:text-lg'
      )}
    >
      {items.map((item, index) => (
        <li
          key={index}
          className={clsx(
            'flex items-center',
            compact ? 'gap-2' : 'gap-3 sm:gap-4 lg:gap-6'
          )}
        >
          <span>{item}</span>
          {index < items.length - 1 && (
            <span
              className={clsx(
                'leading-none text-white/70',
                compact ? 'text-xs' : 'text-sm sm:text-lg lg:text-2xl'
              )}
              aria-hidden='true'
            >
              •
            </span>
          )}
        </li>
      ))}
    </ul>
  )
}
