'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { useEffect, useRef, useState } from 'react'
import { FiUsers, FiArrowDown, FiFlag } from 'react-icons/fi'
import clsx from 'clsx'

// Assets constant for better maintainability
const ASSETS = {
  background: '/img/hall-of-fame/hero-bg.png',
  players: '/img/hall-of-fame/players-2.png',
  wave: '/img/global/ondas-7.png'
} as const

const WAVE_HEIGHT = 135

// Team data type
interface Team {
  name: string
  country: string
}

// Sample teams data - all Portuguese teams
const SAMPLE_TEAMS: Team[] = [
  { name: 'Lisboa Spikers', country: 'PT' },
  { name: 'Porto Power', country: 'PT' },
  { name: 'Algarve Waves', country: 'PT' },
  { name: 'Madeira Volley Stars', country: 'PT' },
  { name: 'Cascais Crushers', country: 'PT' },
  { name: 'Braga Blockers', country: 'PT' },
  { name: 'Oeiras Thunder', country: 'PT' },
  { name: 'Estoril Eagles', country: 'PT' },
  { name: 'Sintra Smash', country: 'PT' },
  { name: 'Coimbra Titans', country: 'PT' },
  { name: 'Funchal Flames', country: 'PT' },
  { name: 'Viana Sea Storm', country: 'PT' },
  { name: 'Setúbal Sharks', country: 'PT' },
  { name: 'Aveiro Ace Queens', country: 'PT' },
  { name: 'Faro Flyers', country: 'PT' },
  { name: 'Leiria Lightning', country: 'PT' }
] as const

// Custom hook for intersection observer with staggered animations
function useStaggeredAnimation(threshold = 0.15) {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold, rootMargin: '50px' }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [threshold])

  return { isVisible, sectionRef }
}

// Team item component without hover animations
interface TeamItemProps {
  team: Team
  index: number
  isVisible: boolean
}

function TeamItem({ team, index, isVisible }: TeamItemProps) {
  const flagSrc = (code: string) =>
    `/img/hall-of-fame/${code.toLowerCase()}.svg`

  return (
    <li
      className={clsx(
        'flex items-center gap-3 rounded-lg bg-white/60 px-3 py-2 shadow-sm ring-1 ring-black/5 backdrop-blur-sm transition-all duration-500 ease-out',
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      )}
      style={{
        transitionDelay: `${700 + Math.floor(index / 2) * 100}ms`
      }}
    >
      {/* Flag - Portugal for all teams */}
      <div className='relative inline-block h-[16px] w-[24px] shrink-0 overflow-hidden rounded-[3px] ring-1 ring-black/10'>
        <Image
          src={flagSrc(team.country)}
          alt={`${team.country} flag`}
          fill
          sizes='24px'
          className='object-cover'
        />
      </div>

      {/* Team name - no hover effects */}
      <span className='flex-1 text-sm font-medium text-slate-800 sm:text-base'>
        {team.name}
      </span>
    </li>
  )
}

// Enhanced players image with parallax effect
interface PlayersImageProps {
  src: string
  alt: string
  isVisible: boolean
}

function PlayersImage({ src, alt, isVisible }: PlayersImageProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!imageRef.current) return

      const rect = imageRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      setMousePosition({
        x: (e.clientX - centerX) * 0.015,
        y: (e.clientY - centerY) * 0.015
      })
    }

    const handleMouseLeave = () => {
      setMousePosition({ x: 0, y: 0 })
    }

    const element = imageRef.current
    if (element) {
      element.addEventListener('mousemove', handleMouseMove as any)
      element.addEventListener('mouseleave', handleMouseLeave)
    }

    return () => {
      if (element) {
        element.removeEventListener('mousemove', handleMouseMove as any)
        element.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [])

  return (
    <div className='relative lg:col-span-6'>
      <div
        ref={imageRef}
        className={clsx(
          'group relative z-10 mx-auto -mt-2 h-[340px] w-full cursor-pointer overflow-visible transition-all duration-1000 ease-out sm:-mt-4 sm:h-[420px] lg:-mt-6 lg:h-[520px]',
          '[-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_75%,transparent_100%)]',
          '[mask-image:linear-gradient(to_bottom,black_0%,black_75%,transparent_100%)]',
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        )}
        style={{
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
          transitionDelay: '200ms'
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes='(max-width: 1024px) 90vw, 760px'
          className='object-contain object-bottom transition-transform duration-500 group-hover:scale-105'
          priority
        />

        {/* Subtle highlight effect */}
        <div className='absolute inset-0 bg-gradient-to-t from-sky-100/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100' />
      </div>
    </div>
  )
}

// Enhanced CTA button
interface CTAButtonProps {
  onClick: () => void
  children: React.ReactNode
  isVisible: boolean
}

function CTAButton({ onClick, children, isVisible }: CTAButtonProps) {
  return (
    <button
      type='button'
      onClick={onClick}
      className={clsx(
        'group relative mt-6 inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-sky-700 to-sky-800 px-6 py-3 text-sm font-bold text-white shadow-xl ring-1 ring-black/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-2 sm:text-base',
        'transition-all duration-700 ease-out',
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
      )}
      style={{ transitionDelay: '900ms' }}
    >
      <span className='relative z-10 flex items-center gap-2'>
        <FiUsers className='h-4 w-4' />
        {children}
        <FiArrowDown className='h-4 w-4 transition-transform duration-300 group-hover:translate-y-1' />
      </span>
      {/* Shimmer effect */}
      <div className='absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full' />
    </button>
  )
}

// Enhanced stats list component
interface StatsListProps {
  items: string[]
  compact?: boolean
  isVisible: boolean
}

function StatsList({ items, compact = false, isVisible }: StatsListProps) {
  return (
    <ul
      role='list'
      aria-label='Tournament statistics'
      className={clsx(
        'flex items-center whitespace-nowrap font-extrabold uppercase text-white drop-shadow-lg transition-all duration-1000 ease-out',
        compact
          ? 'gap-2 px-2 text-[10px] tracking-tight'
          : 'gap-3 px-3 text-[11px] tracking-normal sm:gap-4 sm:text-[13px] sm:tracking-wide lg:gap-6 lg:text-lg',
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      )}
      style={{ transitionDelay: '1100ms' }}
    >
      {items.map((item, index) => (
        <li
          key={`stat-${index}`}
          className={clsx(
            'flex items-center transition-all duration-300 hover:scale-105',
            compact ? 'gap-2' : 'gap-3 sm:gap-4 lg:gap-6'
          )}
        >
          <span className='relative'>
            {item}
            <span className='absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-opacity duration-500 hover:opacity-100' />
          </span>
          {index < items.length - 1 && (
            <span
              className={clsx(
                'leading-none text-sky-300',
                compact ? 'text-xs' : 'text-sm sm:text-lg lg:text-2xl'
              )}
              aria-hidden
            >
              •
            </span>
          )}
        </li>
      ))}
    </ul>
  )
}

// Enhanced wave section
interface WaveSectionProps {
  statsItems: string[]
  isVisible: boolean
}

function WaveSection({ statsItems, isVisible }: WaveSectionProps) {
  return (
    <div className='pointer-events-none absolute bottom-0 left-1/2 w-screen -translate-x-1/2'>
      {/* Desktop */}
      <div className='relative hidden lg:block'>
        <div
          className={clsx(
            'transition-all duration-1000 ease-out',
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          )}
          style={{ transitionDelay: '1000ms' }}
        >
          <Image
            src={ASSETS.wave}
            alt=''
            role='presentation'
            width={2048}
            height={WAVE_HEIGHT}
            sizes='100vw'
            className='z-10 -mb-px block h-auto w-full'
          />
        </div>

        <div className='pointer-events-none absolute inset-0 z-30'>
          <div className='mx-auto flex h-full max-w-screen-xl translate-y-[4px] items-center justify-end px-4'>
            <StatsList items={statsItems} isVisible={isVisible} />
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div
        className={clsx(
          'relative block transition-all duration-1000 ease-out lg:hidden',
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        )}
        style={{
          backgroundImage: `url(${ASSETS.wave})`,
          backgroundSize: '100% 100%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          height: `${WAVE_HEIGHT}px`,
          transitionDelay: '1000ms'
        }}
      >
        <div className='pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-4'>
          <StatsList compact items={statsItems} isVisible={isVisible} />
        </div>
      </div>
    </div>
  )
}

export default function HallOfFameParticipants() {
  const t = useTranslations('HallOfFamePage.Participants')
  const { isVisible, sectionRef } = useStaggeredAnimation(0.15)
  const [showAllTeams, setShowAllTeams] = useState(false)

  // Show first 7 teams on mobile, all on desktop
  const visibleTeams = showAllTeams ? SAMPLE_TEAMS : SAMPLE_TEAMS.slice(0, 7)
  const hasMoreTeams = SAMPLE_TEAMS.length > 7

  const handleSeeWinners = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    document
      .getElementById('hall-of-fame-winners')
      ?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' })
  }

  const handleSeeMoreTeams = () => {
    setShowAllTeams(true)
  }

  const statsItems = [
    t('stats.teams'),
    t('stats.athletes'),
    t('stats.countries'),
    t('stats.games')
  ]

  return (
    <section
      ref={sectionRef}
      id='hall-of-fame-teams'
      className='relative w-full overflow-hidden'
      aria-labelledby='participants-title'
    >
      {/* Background */}
      <div className='absolute inset-0 -z-10'>
        <Image
          src={ASSETS.background}
          alt=''
          role='presentation'
          fill
          priority
          sizes='100vw'
          className='object-cover'
        />
      </div>

      {/* Content */}
      <div
        className='mx-auto max-w-screen-xl px-4 pt-8 sm:pt-12 lg:pb-[135px]'
        style={{ paddingBottom: `calc(${WAVE_HEIGHT}px + 12px)` }}
      >
        <div className='grid grid-cols-1 gap-8 lg:grid-cols-12'>
          {/* Enhanced Left: players image */}
          <PlayersImage
            src={ASSETS.players}
            alt={t('playersAlt')}
            isVisible={isVisible}
          />

          {/* Enhanced Right: content */}
          <div className='lg:col-span-6'>
            <header>
              <h2
                id='participants-title'
                className={clsx(
                  'mb-4 text-xl font-extrabold uppercase tracking-wide text-sky-500 transition-all duration-1000 ease-out sm:text-2xl',
                  isVisible
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-6 opacity-0'
                )}
                style={{ transitionDelay: '400ms' }}
              >
                {t('title')}
              </h2>
            </header>

            {/* Teams grid with mobile limitation */}
            <div
              className={clsx(
                'transition-all duration-1000 ease-out',
                isVisible
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-4 opacity-0'
              )}
              style={{ transitionDelay: '600ms' }}
            >
              {/* Desktop: Show all teams */}
              <ul className='hidden grid-cols-1 gap-3 text-sm sm:grid sm:grid-cols-2 sm:text-base lg:gap-2'>
                {SAMPLE_TEAMS.map((team, index) => (
                  <TeamItem
                    key={`${team.name}-${index}`}
                    team={team}
                    index={index}
                    isVisible={isVisible}
                  />
                ))}
              </ul>

              {/* Mobile: Show limited teams */}
              <ul className='grid grid-cols-1 gap-3 text-sm sm:hidden'>
                {visibleTeams.map((team, index) => (
                  <TeamItem
                    key={`${team.name}-${index}`}
                    team={team}
                    index={index}
                    isVisible={isVisible}
                  />
                ))}
              </ul>

              {/* Mobile: See More Teams button */}
              {hasMoreTeams && !showAllTeams && (
                <button
                  type='button'
                  onClick={handleSeeMoreTeams}
                  className={clsx(
                    'mt-4 inline-flex items-center gap-2 rounded-lg bg-white/70 px-4 py-2 text-sm font-semibold text-sky-700 shadow-sm ring-1 ring-black/5 backdrop-blur-sm transition-all duration-300 hover:bg-white/90 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 sm:hidden',
                    'transition-all duration-700 ease-out',
                    isVisible
                      ? 'translate-y-0 opacity-100'
                      : 'translate-y-6 opacity-0'
                  )}
                  style={{ transitionDelay: '800ms' }}
                >
                  <FiUsers className='h-4 w-4' />
                  See {SAMPLE_TEAMS.length - 7} more teams
                  <FiArrowDown className='h-4 w-4' />
                </button>
              )}

              <CTAButton onClick={handleSeeWinners} isVisible={isVisible}>
                {t('seeWinners')}
              </CTAButton>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced wave section with stats */}
      <WaveSection statsItems={statsItems} isVisible={isVisible} />
    </section>
  )
}
