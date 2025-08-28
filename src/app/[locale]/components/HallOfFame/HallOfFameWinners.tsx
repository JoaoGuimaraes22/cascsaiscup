'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { FaMedal, FaChevronDown, FaTrophy } from 'react-icons/fa'
import { BiAward } from 'react-icons/bi'
import clsx from 'clsx'

type DivisionKey = 'Sub15' | 'Sub17' | 'Open'
const DIVISIONS: DivisionKey[] = ['Sub15', 'Sub17', 'Open']

// Updated winners data with the new structure
const WINNERS: Record<
  string,
  Record<DivisionKey, { name: string; country: string }[]>
> = {
  '2025': {
    Sub15: [
      { name: 'PEL Amora SC A', country: 'PT' },
      { name: 'Cascais Volley4all', country: 'PT' },
      { name: 'PEL Amora SC B', country: 'PT' }
    ],
    Sub17: [
      { name: 'SC Arcozelo', country: 'PT' },
      { name: 'PEL Amora SC', country: 'PT' },
      { name: 'São Francisco AD', country: 'PT' }
    ],
    Open: [
      { name: 'Cascais Volley4all', country: 'PT' },
      { name: 'CV Madrid', country: 'ES' },
      { name: 'AS Mónaco', country: 'MC' }
    ]
  },
  '2024': {
    Sub15: [
      { name: 'SC Arcozelo A', country: 'PT' },
      { name: 'SC Arcozelo B', country: 'PT' },
      { name: 'GDC Gueifães', country: 'PT' }
    ],
    Sub17: [
      { name: 'SC Arcozelo', country: 'PT' },
      { name: 'SC Vila Real', country: 'PT' },
      { name: 'Cascais Volley4all', country: 'PT' }
    ],
    Open: []
  },
  '2023': {
    Sub15: [
      { name: 'CF "Os Belenenses"', country: 'PT' },
      { name: 'CJS Arouca', country: 'PT' },
      { name: 'Cascais Volley4all', country: 'PT' }
    ],
    Sub17: [
      { name: 'Madeira Torres', country: 'PT' },
      { name: 'Cascais Volley4all', country: 'PT' },
      { name: 'Lusófona VC', country: 'PT' }
    ],
    Open: []
  }
}

export default function HallOfFameWinners() {
  const t = useTranslations('HallOfFamePage.Winners')
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  // Assets with better organization
  const ASSETS = {
    background: '/img/hall-of-fame/hero-bg.png',
    winnersImg: '/img/program/players.png',
    tagline: '/img/global/tagline.png',
    wave: '/img/global/ondas-3.png'
  } as const

  const WAVE_HEIGHT = 135
  const years = Object.keys(WINNERS).sort((a, b) => Number(b) - Number(a))
  const [openYear, setOpenYear] = useState(years[0])
  const [animatingYear, setAnimatingYear] = useState<string | null>(null)

  // Enhanced medal styling with gradients
  const medalStyles = [
    {
      color: 'text-yellow-400',
      bg: 'from-yellow-400 to-yellow-600',
      glow: 'shadow-yellow-400/30'
    }, // 1st Gold
    {
      color: 'text-gray-300',
      bg: 'from-gray-300 to-gray-500',
      glow: 'shadow-gray-400/30'
    }, // 2nd Silver
    {
      color: 'text-amber-600',
      bg: 'from-amber-600 to-amber-800',
      glow: 'shadow-amber-600/30'
    }, // 3rd Bronze
    {
      color: 'text-sky-500',
      bg: 'from-sky-400 to-sky-600',
      glow: 'shadow-sky-400/30'
    } // 4th
  ] as const

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.15, rootMargin: '50px' }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleYearToggle = (year: string) => {
    if (animatingYear) return // Prevent multiple clicks during animation

    setAnimatingYear(year)
    const newOpenYear = openYear === year ? '' : year
    setOpenYear(newOpenYear)

    // Clear animation state after transition
    setTimeout(() => setAnimatingYear(null), 350)
  }

  const flagSrc = (code: string) =>
    `/img/hall-of-fame/${code.toLowerCase()}.svg`

  const getDivisionIcon = (division: DivisionKey) => {
    switch (division) {
      case 'Open':
        return <FaTrophy className='h-3 w-3' />
      case 'Sub17':
        return <BiAward className='h-3 w-3' />
      case 'Sub15':
        return <FaMedal className='h-3 w-3' />
      default:
        return <FaMedal className='h-3 w-3' />
    }
  }

  const getDivisionLabel = (division: DivisionKey) => {
    switch (division) {
      case 'Open':
        return 'OPEN'
      case 'Sub17':
        return 'SUB17'
      case 'Sub15':
        return 'SUB15'
      default:
        return division
    }
  }

  return (
    <section
      ref={sectionRef}
      className='relative w-full overflow-hidden'
      id='hall-of-fame-winners'
      aria-labelledby='hall-of-fame-title'
    >
      {/* Background image - full visibility */}
      <div className='absolute inset-0 -z-10'>
        <Image
          src={ASSETS.background}
          alt=''
          role='presentation'
          fill
          sizes='100vw'
          className='object-cover object-center'
          priority
          quality={75}
        />
      </div>

      {/* Main Content */}
      <div className='mx-auto max-w-screen-xl px-4 pb-[180px] pt-10 lg:pb-[60px] lg:pt-16'>
        <div className='grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12'>
          {/* Left Column: Title, Description & Accordion */}
          <div className='flex flex-col lg:col-span-7'>
            {/* Header with animation */}
            <div
              className={clsx(
                'transition-all duration-1000 ease-out',
                isVisible
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-8 opacity-0'
              )}
            >
              <div className='mb-2 flex items-center gap-2'>
                <h2
                  id='hall-of-fame-title'
                  className='text-2xl font-extrabold uppercase tracking-wide text-sky-500 sm:text-3xl lg:text-[28px]'
                >
                  {t('title')}
                </h2>
              </div>
              <p className='mb-6 max-w-2xl text-sm leading-relaxed text-slate-700 sm:text-base'>
                {t('description')}
              </p>
            </div>

            {/* Enhanced Accordion */}
            <div
              className={clsx(
                'space-y-3 transition-all delay-200 duration-1000 ease-out',
                isVisible
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-8 opacity-0'
              )}
              style={{ maxHeight: '520px', overflowY: 'auto' }}
            >
              {years.map((year, yearIndex) => (
                <div
                  key={year}
                  className={clsx(
                    'group rounded-xl transition-all duration-300',
                    'bg-white/80 shadow-lg backdrop-blur-sm hover:shadow-xl',
                    'ring-1 ring-slate-200/50 hover:ring-sky-200',
                    openYear === year && 'shadow-sky-100/50 ring-sky-300'
                  )}
                  style={{
                    transitionDelay: `${yearIndex * 100}ms`
                  }}
                >
                  {/* Year Header Button */}
                  <button
                    onClick={() => handleYearToggle(year)}
                    className={clsx(
                      'flex w-full items-center justify-between px-5 py-4 text-left',
                      'rounded-xl transition-all duration-200',
                      'hover:bg-gradient-to-r hover:from-sky-50 hover:to-blue-50',
                      'focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300'
                    )}
                    aria-expanded={openYear === year}
                    aria-controls={`winners-${year}`}
                    disabled={animatingYear === year}
                  >
                    <div className='flex items-center gap-3'>
                      <span className='text-lg font-bold text-slate-800 sm:text-xl'>
                        {year}
                      </span>
                      {openYear === year && (
                        <span className='ml-2 rounded-full bg-sky-100 px-2 py-1 text-xs font-semibold text-sky-700'>
                          Active
                        </span>
                      )}
                    </div>
                    <FaChevronDown
                      className={clsx(
                        'h-4 w-4 text-sky-500 transition-transform duration-300',
                        openYear === year ? 'rotate-180' : 'rotate-0'
                      )}
                    />
                  </button>

                  {/* Collapsible Content */}
                  <div
                    id={`winners-${year}`}
                    className={clsx(
                      'duration-350 grid overflow-hidden transition-all ease-out',
                      openYear === year
                        ? 'grid-rows-[1fr] opacity-100'
                        : 'grid-rows-[0fr] opacity-0'
                    )}
                  >
                    <div className='overflow-hidden'>
                      <div className='px-5 pb-4'>
                        {DIVISIONS.map((divKey, divIndex) => {
                          const divisionWinners = WINNERS[year][divKey]

                          // Skip divisions with no winners
                          if (
                            !divisionWinners ||
                            divisionWinners.length === 0
                          ) {
                            return null
                          }

                          return (
                            <div
                              key={divKey}
                              className={clsx(
                                'border-t border-slate-100 py-4 first:border-t-0',
                                'transition-all duration-300 ease-out',
                                openYear === year
                                  ? 'translate-x-0 opacity-100'
                                  : 'translate-x-4 opacity-0'
                              )}
                              style={{
                                transitionDelay:
                                  openYear === year
                                    ? `${divIndex * 150}ms`
                                    : '0ms'
                              }}
                            >
                              {/* Division Header */}
                              <div className='mb-3 flex items-center gap-2'>
                                <div className='flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-sky-400 to-sky-600 text-white'>
                                  {getDivisionIcon(divKey)}
                                </div>
                                <h3 className='text-sm font-bold uppercase tracking-wide text-sky-700'>
                                  {getDivisionLabel(divKey)}
                                </h3>
                              </div>

                              {/* Teams List */}
                              <div className='grid gap-2 sm:grid-cols-2'>
                                {divisionWinners.map(
                                  ({ name, country }, teamIndex) => {
                                    const medal =
                                      medalStyles[teamIndex] || medalStyles[3]
                                    const position = teamIndex + 1

                                    return (
                                      <div
                                        key={`${name}-${teamIndex}`}
                                        className={clsx(
                                          'group flex items-center gap-3 rounded-lg p-3',
                                          'bg-gradient-to-r from-white/80 to-slate-50/80',
                                          'border border-slate-200/60 shadow-sm backdrop-blur-sm',
                                          'hover:border-sky-300/50 hover:shadow-md',
                                          'transition-all duration-200'
                                        )}
                                      >
                                        {/* Position Medal */}
                                        <div
                                          className={clsx(
                                            'flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br font-bold text-white shadow-lg',
                                            medal.bg,
                                            medal.glow
                                          )}
                                        >
                                          <span className='text-xs'>
                                            {position}
                                          </span>
                                        </div>

                                        {/* Flag */}
                                        <div className='relative inline-block h-[16px] w-[24px] shrink-0 overflow-hidden rounded-[3px] ring-1 ring-black/10'>
                                          <Image
                                            src={flagSrc(country)}
                                            alt={`${country} flag`}
                                            fill
                                            sizes='24px'
                                            className='object-cover'
                                            quality={75}
                                          />
                                        </div>

                                        {/* Team Name */}
                                        <span className='flex-1 text-sm font-medium text-slate-800'>
                                          {name}
                                        </span>
                                      </div>
                                    )
                                  }
                                )}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Winners Image - HIDDEN ON MOBILE */}
          <div className='relative hidden lg:col-span-5 lg:flex lg:items-center lg:justify-center'>
            <div
              className={clsx(
                'relative h-[420px] w-[420px] max-w-full transition-all delay-500 duration-1000 ease-out lg:h-[480px] lg:w-[480px]',
                isVisible
                  ? 'translate-y-0 scale-100 opacity-100'
                  : 'translate-y-12 scale-95 opacity-0'
              )}
            >
              {/* Decorative background circle */}
              <div className='absolute inset-0 -z-10 rounded-full bg-gradient-to-br from-sky-200/40 to-blue-300/30 blur-3xl' />

              <Image
                src={ASSETS.winnersImg}
                alt='Tournament winners celebrating with trophies'
                fill
                sizes='(max-width: 1024px) 90vw, 600px'
                className='object-contain object-center drop-shadow-2xl'
                quality={80}
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced bottom wave */}
      <div className='pointer-events-none absolute bottom-0 left-1/2 z-0 w-screen -translate-x-1/2'>
        <div className='relative'>
          <Image
            src={ASSETS.wave}
            alt=''
            role='presentation'
            width={2048}
            height={WAVE_HEIGHT}
            sizes='100vw'
            className='block h-auto w-full'
            style={{ height: `${WAVE_HEIGHT}px` }}
            loading='lazy'
            quality={75}
          />
        </div>
      </div>
    </section>
  )
}
