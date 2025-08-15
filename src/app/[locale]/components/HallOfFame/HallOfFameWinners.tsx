'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { FaMedal } from 'react-icons/fa'

type DivisionKey = 'Sub21' | 'Sub17' | 'Sub15'
const DIVISIONS: DivisionKey[] = ['Sub21', 'Sub17', 'Sub15']

// ====== Winners data (NOT translated) ======
// Add/extend years here. Team names are plain strings; each gets a country code.
const WINNERS: Record<
  string,
  Record<DivisionKey, { name: string; country: string }[]>
> = {
  // Latest first in UI; sort handles it anyway
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
      { name: 'Team A', country: 'PT' },
      { name: 'Team B', country: 'PT' },
      { name: 'Team C', country: 'PT' },
      { name: 'Team D', country: 'PT' }
    ],
    Sub17: [
      { name: 'Team E', country: 'PT' },
      { name: 'Team F', country: 'PT' },
      { name: 'Team G', country: 'PT' },
      { name: 'Team H', country: 'PT' }
    ],
    Sub15: [
      { name: 'Team I', country: 'PT' },
      { name: 'Team J', country: 'PT' },
      { name: 'Team K', country: 'PT' },
      { name: 'Team L', country: 'PT' }
    ]
  }
}

export default function HallOfFameWinners() {
  const t = useTranslations('HallOfFamePage.Winners')

  // ====== Assets ======
  const BG = '/img/hall-of-fame/hero-bg.png'
  const WINNERS_IMG = '/img/program/players.png'
  const TAGLINE = '/img/global/tagline.png'
  const WAVE = '/img/global/ondas-3.png'
  const WAVE_H = 135

  const years = Object.keys(WINNERS).sort((a, b) => Number(b) - Number(a))
  const [openYear, setOpenYear] = useState(years[0])

  const medalColors = [
    'text-yellow-400', // 1st
    'text-gray-300', // 2nd
    'text-amber-700', // 3rd
    'text-sky-400' // 4th
  ] as const

  const flagSrc = (code: string) =>
    `/img/hall-of-fame/${code.toLowerCase()}.svg`

  return (
    <section
      className='relative w-full overflow-hidden'
      id='hall-of-fame-winners'
    >
      {/* Background */}
      <Image
        src={BG}
        alt=''
        role='presentation'
        fill
        sizes='100vw'
        className='absolute inset-0 -z-10 object-cover opacity-40'
      />

      {/* Content */}
      <div className='mx-auto max-w-screen-xl px-4 pb-0 pt-10 lg:pt-14'>
        <div className='grid grid-cols-1 gap-8 lg:grid-cols-12'>
          {/* Left: Accordion & tagline */}
          <div className='flex flex-col lg:col-span-6'>
            <h2 className='mb-3 text-xl font-extrabold uppercase tracking-wide text-sky-600 sm:text-2xl'>
              {t('title')}
            </h2>
            <p className='mb-4 max-w-lg text-sm text-slate-700 sm:text-base'>
              {t('description')}
            </p>

            {/* Scroll area so the right image doesn't move */}
            <div
              className='space-y-4 overflow-y-auto pr-1'
              style={{ maxHeight: '480px' }}
            >
              {years.map(year => (
                <div
                  key={year}
                  className='rounded-lg bg-white/70 shadow-md ring-1 ring-slate-200'
                >
                  {/* Header */}
                  <button
                    onClick={() => setOpenYear(openYear === year ? '' : year)}
                    className='flex w-full items-center justify-between px-4 py-3 text-left font-bold text-sky-700 sm:px-5 sm:py-4'
                    aria-expanded={openYear === year}
                    aria-controls={`winners-${year}`}
                  >
                    <span className='text-lg'>{year}</span>
                    <span className='text-sky-500'>
                      {openYear === year ? '−' : '+'}
                    </span>
                  </button>

                  {/* Content (springy open/close) */}
                  <div
                    id={`winners-${year}`}
                    className={`grid overflow-hidden transition-all duration-300 ease-out ${
                      openYear === year
                        ? 'grid-rows-[1fr] opacity-100'
                        : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className='overflow-hidden'>
                      {DIVISIONS.map(divKey => (
                        <div key={divKey} className='px-4 py-2 sm:px-5'>
                          <h3 className='mb-2 text-sm font-semibold uppercase text-sky-600'>
                            {t(`labels.${divKey.toLowerCase()}`)}
                          </h3>

                          <ul className='space-y-1 text-sm'>
                            {WINNERS[year][divKey].map(
                              ({ name, country }, idx) => (
                                <li
                                  key={name}
                                  className='flex items-center gap-2 text-slate-700'
                                >
                                  {/* Medal */}
                                  <FaMedal
                                    className={
                                      medalColors[idx] ?? 'text-slate-300'
                                    }
                                  />

                                  {/* Flag */}
                                  <span className='relative inline-block h-[14px] w-[20px] shrink-0 overflow-hidden rounded-[2px] ring-1 ring-black/10'>
                                    <Image
                                      src={flagSrc(country)}
                                      alt={country}
                                      fill
                                      sizes='20px'
                                      className='object-cover'
                                    />
                                  </span>

                                  {/* Plain team name (not translated) */}
                                  <span>{name}</span>
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Tagline image at the bottom of the left column */}
            <div className='mt-6'>
              <Image
                src={TAGLINE}
                alt='Cascais Volley Cup Tagline'
                width={260}
                height={60}
                className='h-auto w-auto'
                priority={false}
              />
            </div>
          </div>

          {/* Right: Winners image (fixed height so it doesn't jump) */}
          <div className='relative flex items-start justify-center lg:col-span-6'>
            <div className='relative z-10 h-[320px] w-full sm:h-[420px] lg:h-[500px]'>
              <Image
                src={WINNERS_IMG}
                alt='Winners celebration'
                fill
                sizes='(max-width: 1024px) 90vw, 760px'
                className='object-contain object-bottom'
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Decorative full-width wave at the very bottom */}
      <div className='pointer-events-none absolute bottom-0 left-1/2 z-0 w-screen -translate-x-1/2'>
        <Image
          src={WAVE}
          alt=''
          role='presentation'
          width={2048}
          height={WAVE_H}
          sizes='100vw'
          className='block h-auto w-full'
        />
      </div>
    </section>
  )
}
