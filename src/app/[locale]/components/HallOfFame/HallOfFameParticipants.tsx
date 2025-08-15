'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import clsx from 'clsx'

export default function HallOfFameParticipants() {
  const t = useTranslations('HallOfFamePage.Participants')

  // ====== Assets ======
  const BG = '/img/hall-of-fame/hero-bg.png'
  const PLAYERS = '/img/hall-of-fame/players-2.png'
  const WAVE = '/img/global/ondas-7.png'
  const WAVE_H = 135

  // Team + country (ISO alpha-2)
  const SAMPLE_TEAMS: { name: string; country: string }[] = [
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
  ]

  const flagSrc = (code: string) =>
    `/img/hall-of-fame/${code.toLowerCase()}.svg`

  return (
    <section
      id='hall-of-fame-teams'
      className='relative w-full overflow-hidden'
    >
      {/* Background */}
      <Image
        src={BG}
        alt=''
        role='presentation'
        fill
        priority
        sizes='100vw'
        className='absolute inset-0 -z-10 object-cover opacity-40'
      />

      {/* Content */}
      <div
        className='mx-auto max-w-screen-xl px-4 pt-8 sm:pt-12 lg:pb-[135px]'
        style={{ paddingBottom: `calc(${WAVE_H}px + 12px)` }}
      >
        <div className='grid grid-cols-1 gap-8 lg:grid-cols-12'>
          {/* Left: players image */}
          <div className='relative lg:col-span-6'>
            <div
              className='relative z-10 mx-auto -mt-2 h-[340px] w-full overflow-visible
                         [-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_75%,transparent_100%)]
                         [mask-image:linear-gradient(to_bottom,black_0%,black_75%,transparent_100%)]
                         sm:-mt-4 sm:h-[420px] lg:-mt-6 lg:h-[520px]'
            >
              <Image
                src={PLAYERS}
                alt={t('playersAlt')}
                fill
                sizes='(max-width: 1024px) 90vw, 760px'
                className='object-contain object-bottom'
                priority
              />
            </div>
          </div>

          {/* Right: text */}
          <div className='lg:col-span-6'>
            <h2 className='mb-3 text-xl font-extrabold uppercase tracking-wide text-sky-600 sm:text-2xl'>
              {t('title')}
            </h2>

            <ul className='grid grid-cols-2 gap-1 text-sm sm:text-base'>
              {SAMPLE_TEAMS.map(({ name, country }, idx) => (
                <li key={idx} className='flex items-center gap-2'>
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
                  {/* Team name */}
                  <span>{name}</span>
                </li>
              ))}
            </ul>

            <button
              type='button'
              className='mt-5 inline-flex items-center rounded-full bg-sky-700 px-4 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-black/10 hover:bg-sky-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300'
              onClick={() =>
                document
                  .getElementById('hall-of-fame-winners')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              {t('seeWinners')}
            </button>
          </div>
        </div>
      </div>

      {/* Wave + stats */}
      <div className='pointer-events-none absolute bottom-0 left-1/2 w-screen -translate-x-1/2'>
        {/* Desktop */}
        <div className='relative hidden lg:block'>
          <Image
            src={WAVE}
            alt=''
            role='presentation'
            width={2048}
            height={WAVE_H}
            sizes='100vw'
            className='z-10 -mb-px block h-auto w-full'
          />
          <div className='pointer-events-none absolute inset-0 z-30'>
            <div className='mx-auto flex h-full max-w-screen-xl translate-y-[4px] items-center justify-end px-4'>
              <StatsList
                items={[
                  t('stats.teams'),
                  t('stats.athletes'),
                  t('stats.countries'),
                  t('stats.games')
                ]}
              />
            </div>
          </div>
        </div>

        {/* Mobile */}
        <div
          className='relative block lg:hidden'
          style={{
            backgroundImage: `url(${WAVE})`,
            backgroundSize: '100% 100%',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            height: `${WAVE_H}px`
          }}
        >
          <div className='pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-4'>
            <StatsList
              compact
              items={[
                t('stats.teams'),
                t('stats.athletes'),
                t('stats.countries'),
                t('stats.games')
              ]}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

/* --- Reusable stats list (desktop standard, mobile compact) --- */
function StatsList({
  items,
  compact = false
}: {
  items: string[]
  compact?: boolean
}) {
  return (
    <ul
      aria-label='Tournament stats'
      className={clsx(
        'flex items-center whitespace-nowrap font-extrabold uppercase text-white',
        compact
          ? 'gap-2 px-2 text-[10px] tracking-tight' // mobile compact: single line
          : 'gap-3 px-3 text-[11px] tracking-normal sm:gap-4 sm:text-[13px] sm:tracking-wide lg:gap-6 lg:text-lg'
      )}
    >
      {items.map((item, i) => (
        <li
          key={i}
          className={clsx(
            'flex items-center',
            compact ? 'gap-2' : 'gap-3 sm:gap-4 lg:gap-6'
          )}
        >
          <span>{item}</span>
          {i < items.length - 1 && (
            <span
              className={clsx(
                'leading-none',
                compact ? 'text-xs' : 'text-sm sm:text-lg lg:text-2xl'
              )}
            >
              •
            </span>
          )}
        </li>
      ))}
    </ul>
  )
}
