'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { FaMedal, FaChevronDown, FaTrophy } from 'react-icons/fa'
import { BiAward } from 'react-icons/bi'
import clsx from 'clsx'

type DivisionKey = 'Sub21' | 'Sub17' | 'Sub15'
const DIVISIONS: DivisionKey[] = ['Sub21', 'Sub17', 'Sub15']

// Portuguese teams only with PT flags
const WINNERS: Record<
  string,
  Record<DivisionKey, { name: string; country: string }[]>
> = {
  '2025': {
    Sub21: [
      { name: 'Lisboa Spikers', country: 'PT' },
      { name: 'Porto Power', country: 'PT' },
      { name: 'Algarve Waves', country: 'PT' },
      { name: 'Cascais Crushers', country: 'PT' }
    ],
    Sub17: [
      { name: 'Madeira Volley Stars', country: 'PT' },
      { name: 'Braga Blockers', country: 'PT' },
      { name: 'Oeiras Thunder', country: 'PT' },
      { name: 'Estoril Eagles', country: 'PT' }
    ],
    Sub15: [
      { name: 'Sintra Smash', country: 'PT' },
      { name: 'Coimbra Titans', country: 'PT' },
      { name: 'Funchal Flames', country: 'PT' },
      { name: 'Viana Sea Storm', country: 'PT' }
    ]
  },
  '2024': {
    Sub21: [
      { name: 'Setúbal Sharks', country: 'PT' },
      { name: 'Aveiro Ace Queens', country: 'PT' },
      { name: 'Faro Flyers', country: 'PT' },
      { name: 'Leiria Lightning', country: 'PT' }
    ],
    Sub17: [
      { name: 'Cascais Crushers', country: 'PT' },
      { name: 'Lisboa Spikers', country: 'PT' },
      { name: 'Porto Power', country: 'PT' },
      { name: 'Algarve Waves', country: 'PT' }
    ],
    Sub15: [
      { name: 'Braga Blockers', country: 'PT' },
      { name: 'Oeiras Thunder', country: 'PT' },
      { name: 'Estoril Eagles', country: 'PT' },
      { name: 'Madeira Volley Stars', country: 'PT' }
    ]
  },
  '2023': {
    Sub21: [
      { name: 'Aveiro Arrows', country: 'PT' },
      { name: 'Guimarães Giants', country: 'PT' },
      { name: 'Viseu Vipers', country: 'PT' },
      { name: 'Santarém Smashers', country: 'PT' }
    ],
    Sub17: [
      { name: 'Coimbra Comets', country: 'PT' },
      { name: 'Évora Eagles', country: 'PT' },
      { name: 'Beja Bombers', country: 'PT' },
      { name: 'Vila Real Volleyball', country: 'PT' }
    ],
    Sub15: [
      { name: 'Peniche Panthers', country: 'PT' },
      { name: 'Caldas Crushers', country: 'PT' },
      { name: 'Torres Vedras Titans', country: 'PT' },
      { name: 'Sesimbra Spikers', country: 'PT' }
    ]
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
      case 'Sub21':
        return <FaTrophy className='h-3 w-3' />
      case 'Sub17':
        return <BiAward className='h-3 w-3' />
      case 'Sub15':
        return <FaMedal className='h-3 w-3' />
      default:
        return <FaMedal className='h-3 w-3' />
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
        />
      </div>

      {/* Main Content */}
      <div className='mx-auto max-w-screen-xl px-4 pb-0 pt-10 lg:pt-16'>
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
                      <div className='flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-sky-600 font-bold text-white shadow-lg'>
                        {year.slice(-2)}
                      </div>
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
                        {DIVISIONS.map((divKey, divIndex) => (
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
                                {t(`labels.${divKey.toLowerCase()}`)}
                              </h3>
                            </div>

                            {/* Teams List */}
                            <div className='grid gap-2 sm:grid-cols-2'>
                              {WINNERS[year][divKey].map(
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
                                        'ring-1 ring-slate-200/50 transition-all duration-200',
                                        'hover:from-white hover:to-sky-50/60 hover:shadow-md hover:ring-sky-200',
                                        teamIndex === 0 &&
                                          'bg-gradient-to-r from-yellow-50/80 to-amber-50/60 ring-2 ring-yellow-300/50'
                                      )}
                                    >
                                      {/* Position Badge */}
                                      <div
                                        className={clsx(
                                          'flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold shadow-lg transition-transform duration-200 group-hover:scale-110',
                                          `bg-gradient-to-br ${medal.bg} ${medal.glow} text-white`
                                        )}
                                      >
                                        {position}
                                      </div>

                                      {/* Flag */}
                                      <div className='relative h-4 w-6 shrink-0 overflow-hidden rounded-sm ring-1 ring-black/10 transition-transform duration-200 group-hover:scale-110'>
                                        <Image
                                          src={flagSrc(country)}
                                          alt={`${country} flag`}
                                          fill
                                          sizes='24px'
                                          className='object-cover'
                                        />
                                      </div>

                                      {/* Team Name */}
                                      <span className='text-sm font-semibold text-slate-800 transition-colors duration-200 group-hover:text-sky-700'>
                                        {name}
                                      </span>

                                      {/* Winner Badge for 1st place */}
                                      {teamIndex === 0 && (
                                        <div className='ml-auto flex items-center gap-1 rounded-full bg-yellow-100 px-2 py-1 text-xs font-bold text-yellow-800'>
                                          <FaTrophy className='h-3 w-3' />
                                          Winner
                                        </div>
                                      )}
                                    </div>
                                  )
                                }
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Tagline without background */}
            <div
              className={clsx(
                'mt-8 transition-all delay-500 duration-1000 ease-out',
                isVisible
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-8 opacity-0'
              )}
            >
              <Image
                src={ASSETS.tagline}
                alt='Cascais Volley Cup Tagline'
                width={300}
                height={70}
                className='h-auto w-auto drop-shadow-lg transition-transform duration-300 hover:scale-105'
              />
            </div>
          </div>

          {/* Right Column: Winners Image */}
          <div className='relative flex items-center justify-center lg:col-span-5'>
            <div
              className={clsx(
                'relative z-10 w-full transition-all delay-300 duration-1000 ease-out',
                'h-[280px] sm:h-[380px] lg:h-[520px]',
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
          />
          {/* Subtle gradient overlay on wave */}
          <div className='absolute inset-0 bg-gradient-to-t from-sky-600/20 to-transparent' />
        </div>
      </div>
    </section>
  )
}
