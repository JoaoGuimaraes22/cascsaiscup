'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import clsx from 'clsx'
import { useMemo } from 'react'

// Constants for better maintainability
const ASSETS = {
  BG: '/img/landing/home-page-2.png',
  WAVE: '/img/global/ondas-3.png'
} as const

const WAVE_HEIGHT = 135
const WAVE_DIMENSIONS = {
  width: 2048,
  height: WAVE_HEIGHT
} as const

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
            <strong key='wherewhen-emphasis' className='text-cyan-200'>
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
              <strong className='text-cyan-200'>{t('games.maxPrefix')}</strong>{' '}
              {t('games.maxSuffix')}
            </span>
          ),
          t('games.minPrefix') && t('games.minSuffix') && (
            <span key='games-min'>
              <strong className='text-cyan-200'>{t('games.minPrefix')}</strong>{' '}
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
      className='relative w-full overflow-hidden'
      style={{ paddingBottom: `${WAVE_HEIGHT}px` }}
      aria-labelledby='competition-facts-title'
    >
      {/* Hidden title for screen readers */}
      <h2 id='competition-facts-title' className='sr-only'>
        {t('sectionTitle') || 'Competition Facts and Information'}
      </h2>

      {/* Background Layer */}
      <BackgroundImage />

      {/* Main Content */}
      <div className='relative z-10 mx-auto max-w-screen-xl px-4 py-10 sm:py-12 lg:py-16'>
        <FactsGrid items={factItems} />
      </div>

      {/* Wave Section with Stats */}
      <WaveSection statsItems={statsItems} />
    </section>
  )
}

// Extracted background component
function BackgroundImage() {
  return (
    <div className='absolute inset-0 -z-10'>
      <Image
        src={ASSETS.BG}
        alt=''
        fill
        className='object-cover'
        sizes='100vw'
        quality={80}
        placeholder='blur'
        blurDataURL='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkbHB0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=='
        loading='lazy'
        draggable={false}
        aria-hidden='true'
      />
    </div>
  )
}

// Facts grid component
function FactsGrid({ items }: { items: FactItem[] }) {
  return (
    <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6'>
      {items.map((item, index) => (
        <FactCard key={item.id} item={item} index={index} />
      ))}
    </div>
  )
}

// Individual fact card
function FactCard({ item, index }: { item: FactItem; index: number }) {
  if (!item.heading || item.lines.length === 0) return null

  return (
    <article className='flex flex-col items-center gap-4 text-center'>
      <header>
        <h3 className='text-sm font-extrabold uppercase tracking-wide text-sky-600 sm:text-base lg:text-lg'>
          {item.heading}
        </h3>
      </header>

      <PinMarker index={index}>
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
                'opacity-95 transition-opacity duration-200 hover:opacity-100',
                lineIndex === 0 && 'text-[14px] sm:text-base'
              )}
            >
              {line}
            </div>
          ))}
        </div>
      </PinMarker>
    </article>
  )
}

// Enhanced pin marker with better accessibility
function PinMarker({
  children,
  index
}: {
  children: React.ReactNode
  index: number
}) {
  const gradientId = `pin-gradient-${index}`

  return (
    <div className='group relative mx-auto w-[180px] sm:w-[210px]'>
      <svg
        viewBox='0 0 48 64'
        xmlns='http://www.w3.org/2000/svg'
        className='h-auto w-full drop-shadow transition-transform duration-300 group-hover:scale-105'
        aria-hidden='true'
        role='img'
      >
        <defs>
          <linearGradient id={gradientId} x1='0%' y1='0%' x2='100%' y2='100%'>
            <stop offset='0%' stopColor='#22d3ee' />
            <stop offset='100%' stopColor='#60a5fa' />
          </linearGradient>
        </defs>

        {/* Main pin shape */}
        <path
          d='M24 0C10.745 0 0 10.745 0 24c0 17.25 24 40 24 40s24-22.75 24-40C48 10.745 37.255 0 24 0z'
          fill={`url(#${gradientId})`}
        />

        {/* Inner highlight */}
        <path
          d='M24 4c-11.046 0-20 8.954-20 20 0 14.355 16.5 31 20 31s20-16.645 20-31c0-11.046-8.954-20-20-20z'
          fill='white'
          opacity='0.08'
        />
      </svg>

      {/* Content overlay */}
      <div className='pointer-events-none absolute inset-0 flex items-center justify-center px-5'>
        <div className='pointer-events-auto max-w-full'>{children}</div>
      </div>
    </div>
  )
}

// Wave section with statistics
function WaveSection({ statsItems }: { statsItems: string[] }) {
  return (
    <div className='absolute bottom-0 left-1/2 w-screen -translate-x-1/2'>
      {/* Wave Image */}
      <Image
        src={ASSETS.WAVE}
        alt=''
        width={WAVE_DIMENSIONS.width}
        height={WAVE_DIMENSIONS.height}
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
          'flex items-center whitespace-nowrap font-extrabold uppercase text-white',
          compact
            ? 'gap-2 text-[10px] tracking-tight'
            : 'gap-3 text-[11px] tracking-normal sm:gap-4 sm:text-[13px] sm:tracking-wide lg:gap-6 lg:text-lg'
        )}
      >
        {items.map((item, index) => (
          <li
            key={index}
            className={clsx(
              'flex items-center transition-opacity duration-200 hover:opacity-80',
              compact ? 'gap-1' : 'gap-2 lg:gap-4'
            )}
          >
            <span className='drop-shadow-sm'>{item}</span>
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
