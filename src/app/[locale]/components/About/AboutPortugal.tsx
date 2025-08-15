'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'

export default function AboutPortugal() {
  const t = useTranslations('AboutPage.Portugal')
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  // ===== Constants =====
  const ASSETS = {
    background: '/img/about/portugal-bg.png',
    logo: '/img/global/cascais-volley-cup-2.png',
    tagline: '/img/global/tagline.png',
    wave: '/img/global/ondas-3.png'
  } as const

  const SPOTS = [
    {
      key: 'portugal',
      img: '/img/about/portugal.png',
      alt: t('cards.portugal.alt')
    },
    {
      key: 'cabo',
      img: '/img/about/cabo-da-roca.png',
      alt: t('cards.cabo.alt')
    },
    {
      key: 'boca',
      img: '/img/about/boca-do-inferno.png',
      alt: t('cards.boca.alt')
    },
    {
      key: 'sec1719',
      img: '/img/about/sec-xvii-xix.png',
      alt: t('cards.sec1719.alt')
    }
  ] as const

  const STATS = [
    t('stats.teams'),
    t('stats.athletes'),
    t('stats.countries'),
    t('stats.matches')
  ] as const

  const WAVE_HEIGHT = 135

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
      style={{ paddingBottom: `${WAVE_HEIGHT}px` }}
      aria-labelledby='portugal-title'
    >
      {/* Background with loading state */}
      <div className='absolute inset-0 -z-10'>
        <div className='absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100' />
        <Image
          src={ASSETS.background}
          alt=''
          role='presentation'
          fill
          className={clsx(
            'object-cover transition-opacity duration-700',
            imageLoaded ? 'opacity-100' : 'opacity-0'
          )}
          sizes='100vw'
          priority
          onLoad={() => setImageLoaded(true)}
        />
      </div>

      {/* Content */}
      <div className='mx-auto max-w-screen-xl px-4 py-10 sm:py-12'>
        {/* Title + intro + logo/tagline */}
        <div className='relative grid grid-cols-1 gap-8 md:grid-cols-[1.1fr_0.9fr]'>
          {/* LEFT - Content */}
          <div
            className={clsx(
              'space-y-6 transition-all duration-1000 ease-out',
              isVisible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-8 opacity-0'
            )}
          >
            <h2
              id='portugal-title'
              className='text-2xl font-extrabold uppercase text-sky-500 sm:text-3xl md:text-4xl'
            >
              {t('title')}
            </h2>

            <div className='space-y-4 text-slate-700'>
              {(['p1', 'p2', 'p3', 'p4'] as const).map((key, index) => (
                <p
                  key={key}
                  className={clsx(
                    'leading-relaxed transition-all duration-700 ease-out',
                    isVisible
                      ? 'translate-y-0 opacity-100'
                      : 'translate-y-8 opacity-0'
                  )}
                  style={{
                    transitionDelay: `${(index + 1) * 150}ms`
                  }}
                >
                  {t(key)}
                </p>
              ))}
            </div>
          </div>

          {/* RIGHT - Logo and tagline (desktop only) */}
          <div
            className={clsx(
              'relative hidden items-start justify-end transition-all duration-1000 ease-out md:flex',
              isVisible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-8 opacity-0'
            )}
            style={{ transitionDelay: '600ms' }}
          >
            <div className='flex flex-col items-end gap-4'>
              <Image
                src={ASSETS.logo}
                alt={t('logoAlt')}
                width={260}
                height={180}
                className='h-auto w-[220px] object-contain transition-transform duration-300 hover:scale-105 lg:w-[260px]'
                sizes='(max-width: 1024px) 220px, 260px'
              />
              <Image
                src={ASSETS.tagline}
                alt={t('taglineAlt')}
                width={360}
                height={150}
                className='h-auto w-[280px] object-contain transition-transform duration-300 hover:scale-105 lg:w-[360px]'
                sizes='(max-width: 1024px) 280px, 360px'
              />
            </div>
          </div>
        </div>

        {/* Cards grid with staggered animation */}
        <div
          className={clsx(
            'mt-10 grid grid-cols-1 gap-6 transition-all duration-1000 ease-out sm:grid-cols-2 lg:grid-cols-4',
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          )}
          style={{ transitionDelay: '800ms' }}
        >
          {SPOTS.map((spot, index) => (
            <SpotCard
              key={spot.key}
              spot={spot}
              index={index}
              t={t}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>

      {/* Bottom wave with stats overlay */}
      <div className='absolute bottom-0 left-1/2 w-screen -translate-x-1/2'>
        <Image
          src={ASSETS.wave}
          alt=''
          role='presentation'
          width={2048}
          height={WAVE_HEIGHT}
          className='-mb-px block w-full object-cover'
          style={{ height: `${WAVE_HEIGHT}px` }}
          sizes='100vw'
          priority
        />

        {/* Stats overlay with animation */}
        <div className='pointer-events-none absolute inset-0'>
          <div className='mx-auto flex h-full max-w-screen-xl items-center justify-center px-4 lg:justify-end'>
            <div
              className={clsx(
                'transition-all duration-1000 ease-out',
                isVisible
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-4 opacity-0'
              )}
              style={{ transitionDelay: '1200ms' }}
            >
              {/* Mobile: compact */}
              <div className='block lg:hidden'>
                <StatsList compact items={STATS} />
              </div>
              {/* Desktop */}
              <div className='hidden lg:block'>
                <StatsList items={STATS} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* --- Enhanced Spot Card Component --- */
interface SpotCardProps {
  spot: {
    key: string
    img: string
    alt: string
  }
  index: number
  t: (key: string) => string
  isVisible: boolean
}

function SpotCard({ spot, index, t, isVisible }: SpotCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <article
      className={clsx(
        'group overflow-hidden rounded-xl bg-white/70 shadow-sm ring-1 ring-black/5 backdrop-blur-sm transition-all duration-700 ease-out hover:shadow-lg hover:ring-black/10',
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      )}
      style={{
        transitionDelay: `${800 + index * 100}ms`
      }}
    >
      <div className='relative h-40 w-full overflow-hidden sm:h-44'>
        {/* Loading placeholder */}
        {!imageLoaded && (
          <div className='absolute inset-0 animate-pulse bg-slate-200' />
        )}

        <Image
          src={spot.img}
          alt={spot.alt}
          fill
          className={clsx(
            'object-cover transition-all duration-300 group-hover:scale-105',
            imageLoaded ? 'opacity-100' : 'opacity-0'
          )}
          sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw'
          loading='lazy'
          decoding='async'
          onLoad={() => setImageLoaded(true)}
        />
      </div>

      <div className='space-y-2 p-4'>
        <h3 className='text-base font-extrabold uppercase text-sky-500'>
          {t(`cards.${spot.key}.title`)}{' '}
          <span className='font-semibold text-slate-500'>
            {t(`cards.${spot.key}.subtitle`)}
          </span>
        </h3>
        <p className='text-sm leading-relaxed text-slate-700'>
          {t(`cards.${spot.key}.desc`)}
        </p>
      </div>
    </article>
  )
}

/* --- Enhanced Stats List Component --- */
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
