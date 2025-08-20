'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import clsx from 'clsx'
import { useMemo, useEffect, useRef, useState } from 'react'

// Constants for better maintainability
const ASSETS = {
  wave: '/img/global/ondas-3.png'
} as const

const WAVE_HEIGHT = 135

// Types for better type safety
interface FactItem {
  id: string
  heading: string
  lines: (string | JSX.Element)[]
}

interface StatsListProps {
  items: string[]
  compact?: boolean
}

export default function CompetitionFacts() {
  const t = useTranslations('CompetitionPage.Facts')
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  // Intersection observer for scroll animations
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

  // Memoize fact items to prevent unnecessary re-renders
  const factItems = useMemo<FactItem[]>(
    () => [
      {
        id: 'ages',
        heading: t('ages.heading'),
        lines: [t('ages.l1'), t('ages.l2'), t('ages.l3')].filter(Boolean)
      },
      {
        id: 'who',
        heading: t('who.heading'),
        lines: [
          t('who.l1'),
          t('who.l2'),
          t('who.l3'),
          t('who.l4'),
          t('who.l5')
        ].filter(Boolean)
      },
      {
        id: 'wherewhen',
        heading: t('wherewhen.heading'),
        lines: [
          t('wherewhen.l1'),
          t('wherewhen.l2') && (
            <strong key='wherewhen-emphasis' className='text-white'>
              {t('wherewhen.l2')}
            </strong>
          ),
          t('wherewhen.l3')
        ].filter(Boolean)
      },
      {
        id: 'games',
        heading: t('games.heading'),
        lines: [
          t('games.maxPrefix') && t('games.maxSuffix') && (
            <span key='games-max'>
              <strong className='text-white'>{t('games.maxPrefix')}</strong>{' '}
              {t('games.maxSuffix')}
            </span>
          ),
          t('games.minPrefix') && t('games.minSuffix') && (
            <span key='games-min'>
              <strong className='text-white'>{t('games.minPrefix')}</strong>{' '}
              {t('games.minSuffix')}
            </span>
          )
        ].filter(Boolean)
      }
    ],
    [t]
  )

  const statsItems = useMemo(
    () =>
      [
        t('stats.teams'),
        t('stats.athletes'),
        t('stats.countries'),
        t('stats.games')
      ].filter(Boolean),
    [t]
  )

  return (
    <section
      ref={sectionRef}
      className='relative w-full overflow-hidden'
      style={{ paddingBottom: `${WAVE_HEIGHT}px` }}
      aria-labelledby='competition-facts-title'
      id='regulations'
    >
      {/* Hidden title for screen readers */}
      <h2 id='competition-facts-title' className='sr-only'>
        {t('sectionTitle') || 'Competition Facts and Information'}
      </h2>

      {/* Flowing Blue-Cyan-Green Gradient Background */}
      <div className='absolute inset-0 -z-10 bg-gradient-to-r from-blue-600 via-cyan-400 to-emerald-300 sm:bg-gradient-to-b lg:bg-gradient-to-r' />

      {/* Main Content */}
      <div className='relative z-10 mx-auto max-w-screen-xl px-4 py-16 sm:py-20 lg:py-24'>
        <FactsGrid items={factItems} isVisible={isVisible} />
      </div>

      {/* Wave Section with Stats */}
      <WaveSection statsItems={statsItems} isVisible={isVisible} />
    </section>
  )
}

// Facts grid component with animations
function FactsGrid({
  items,
  isVisible
}: {
  items: FactItem[]
  isVisible: boolean
}) {
  return (
    <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6'>
      {items.map((item, index) => (
        <FactCard
          key={item.id}
          item={item}
          index={index}
          isVisible={isVisible}
        />
      ))}
    </div>
  )
}

// Individual fact card with staggered animations
function FactCard({
  item,
  index,
  isVisible
}: {
  item: FactItem
  index: number
  isVisible: boolean
}) {
  if (!item.heading || item.lines.length === 0) return null

  const delay = index * 150 // Staggered animation delay

  return (
    <article
      className={clsx(
        'flex flex-col items-center gap-6 text-center transition-all duration-700 ease-out',
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <header>
        <h3 className='text-sm font-extrabold uppercase tracking-wide text-white sm:text-base lg:text-lg'>
          {item.heading}
        </h3>
      </header>

      <CircleMarker index={index} isVisible={isVisible}>
        <div
          className='space-y-1 text-[13px] font-bold uppercase leading-snug text-white sm:text-sm'
          role='list'
          aria-label={`Details for ${item.heading}`}
        >
          {item.lines.map((line, lineIndex) => (
            <div
              key={lineIndex}
              role='listitem'
              className={clsx(
                'transition-all duration-300',
                lineIndex === 0 && 'text-[14px] sm:text-base'
              )}
            >
              {line}
            </div>
          ))}
        </div>
      </CircleMarker>
    </article>
  )
}

// Enhanced pin marker with improved design and animations
function CircleMarker({
  children,
  index,
  isVisible
}: {
  children: React.ReactNode
  index: number
  isVisible: boolean
}) {
  const delay = index * 150 + 300

  return (
    <div
      className={clsx(
        'group relative mx-auto transition-all duration-700 ease-out',
        isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
      )}
      style={{
        transitionDelay: `${delay}ms`,
        width: '220px',
        height: '280px'
      }}
    >
      {/* Pin Shape SVG */}
      <svg
        viewBox='0 0 120 160'
        className='h-full w-full drop-shadow-lg transition-transform duration-300 group-hover:scale-105'
        aria-hidden='true'
      >
        <defs>
          <linearGradient
            id={`pin-gradient-${index}`}
            x1='0%'
            y1='0%'
            x2='100%'
            y2='100%'
          >
            <stop offset='0%' stopColor='rgba(255, 255, 255, 0.3)' />
            <stop offset='50%' stopColor='rgba(255, 255, 255, 0.2)' />
            <stop offset='100%' stopColor='rgba(255, 255, 255, 0.1)' />
          </linearGradient>
        </defs>

        {/* Pin Shape Path */}
        <path
          d='M60 0C26.863 0 0 26.863 0 60c0 45 60 100 60 100s60-55 60-100C120 26.863 93.137 0 60 0z'
          fill={`url(#pin-gradient-${index})`}
          stroke='rgba(255, 255, 255, 0.4)'
          strokeWidth='2'
        />

        {/* Inner highlight for depth */}
        <path
          d='M60 8C32.386 8 10 30.386 10 58c0 35.5 50 80 50 80s50-44.5 50-80C110 30.386 87.614 8 60 8z'
          fill='rgba(255, 255, 255, 0.15)'
        />
      </svg>

      {/* Content overlay */}
      <div className='absolute inset-0 flex items-center justify-center px-6 pb-12'>
        <div className='transform text-center transition-transform duration-300 group-hover:scale-105'>
          {children}
        </div>
      </div>
    </div>
  )
}

// Wave section with statistics and animations
function WaveSection({
  statsItems,
  isVisible
}: {
  statsItems: string[]
  isVisible: boolean
}) {
  return (
    <div className='absolute bottom-0 left-1/2 w-screen -translate-x-1/2'>
      {/* Wave Image */}
      <Image
        src={ASSETS.wave}
        alt=''
        width={2048}
        height={WAVE_HEIGHT}
        className='-mb-px block w-full object-cover'
        style={{ height: `${WAVE_HEIGHT}px` }}
        sizes='100vw'
        quality={85}
        loading='lazy'
        draggable={false}
        aria-hidden='true'
      />

      {/* Statistics Overlay */}
      <div className='pointer-events-none absolute inset-0'>
        <div className='mx-auto flex h-full max-w-screen-xl items-center justify-center px-4 lg:justify-end lg:px-8'>
          <div
            className={clsx(
              'transition-all duration-1000 ease-out',
              isVisible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-4 opacity-0'
            )}
            style={{ transitionDelay: '800ms' }}
          >
            {/* Mobile: Compact Layout */}
            <div className='block lg:hidden'>
              <StatsList compact items={statsItems} />
            </div>

            {/* Desktop: Standard Layout */}
            <div className='hidden lg:block'>
              <StatsList items={statsItems} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Enhanced statistics list component
function StatsList({ items, compact = false }: StatsListProps) {
  if (items.length === 0) return null

  return (
    <div
      role='region'
      aria-label={
        compact ? 'Tournament statistics (compact)' : 'Tournament statistics'
      }
    >
      <ul
        className={clsx(
          'flex items-center whitespace-nowrap font-extrabold uppercase text-white drop-shadow-lg',
          compact
            ? 'gap-2 text-[10px] tracking-tight'
            : 'gap-3 text-[11px] tracking-normal sm:gap-4 sm:text-[13px] sm:tracking-wide lg:gap-6 lg:text-lg'
        )}
      >
        {items.map((item, index) => (
          <li
            key={index}
            className={clsx(
              'flex items-center transition-all duration-300 hover:scale-105',
              compact ? 'gap-1' : 'gap-2 lg:gap-4'
            )}
          >
            <span className='relative'>
              {item}
              <span className='absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-opacity duration-500 hover:opacity-100' />
            </span>
            {index < items.length - 1 && (
              <span
                className={clsx(
                  'leading-none text-cyan-300',
                  compact ? 'text-xs' : 'text-sm sm:text-base lg:text-xl'
                )}
                aria-hidden='true'
              >
                •
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
