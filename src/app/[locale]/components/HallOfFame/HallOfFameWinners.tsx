'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { FaMedal } from 'react-icons/fa'

export default function HallOfFameWinners() {
  const t = useTranslations('HallOfFamePage.Winners')

  // ====== Assets ======
  const BG = '/img/hall-of-fame/hero-bg.png'
  const WINNERS_IMG = '/img/program/players.png'
  const TAGLINE = '/img/global/tagline.png'
  const WAVE = '/img/global/ondas-3.png' // Decorative wave
  const WAVE_H = 135

  // Sort years so latest first
  const years = Object.keys(t.raw('years')).sort(
    (a, b) => Number(b) - Number(a)
  )
  const [openYear, setOpenYear] = useState(years[0])

  const medalColors = [
    'text-yellow-400',
    'text-gray-300',
    'text-amber-700',
    'text-sky-400'
  ]

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

      <div className='mx-auto max-w-screen-xl px-4 pb-0 pt-10 lg:pt-14'>
        <div className='grid grid-cols-1 gap-8 lg:grid-cols-12'>
          {/* Left: Accordion */}
          <div className='flex flex-col lg:col-span-6'>
            <h2 className='mb-3 text-xl font-extrabold uppercase tracking-wide text-sky-600 sm:text-2xl'>
              {t('title')}
            </h2>
            <p className='mb-4 max-w-lg text-sm text-slate-700 sm:text-base'>
              {t('description')}
            </p>

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
                  >
                    <span className='text-lg'>{year}</span>
                    <span className='text-sky-500'>
                      {openYear === year ? '−' : '+'}
                    </span>
                  </button>

                  {/* Content */}
                  <div
                    className={`grid overflow-hidden transition-all duration-300 ease-out ${
                      openYear === year
                        ? 'grid-rows-[1fr] opacity-100'
                        : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className='overflow-hidden'>
                      {['Sub21', 'Sub17', 'Sub15'].map(divKey => (
                        <div key={divKey} className='px-4 py-2 sm:px-5'>
                          <h3 className='mb-2 text-sm font-semibold uppercase text-sky-600'>
                            {t(`labels.${divKey.toLowerCase()}`)}
                          </h3>
                          <ul className='space-y-1 text-sm'>
                            {t
                              .raw(`years.${year}.${divKey}`)
                              .map((team: string, idx: number) => (
                                <li
                                  key={idx}
                                  className='flex items-center gap-2 text-slate-700'
                                >
                                  <FaMedal className={medalColors[idx]} />
                                  {team}
                                </li>
                              ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Tagline image */}
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

          {/* Right: Winners image */}
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

            {/* Decorative wave under image */}
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
          </div>
        </div>
      </div>
    </section>
  )
}
