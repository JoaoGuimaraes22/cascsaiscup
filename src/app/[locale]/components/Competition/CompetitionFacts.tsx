'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import clsx from 'clsx'

export default function CompetitionFacts() {
  const t = useTranslations('CompetitionPage.Facts')

  // ===== Assets =====
  const BG = '/img/landing/home-page-2.png'
  const WAVE = '/img/global/ondas-3.png'
  const WAVE_H = 135

  const items: Array<{
    id: string
    heading: string
    lines: (string | JSX.Element)[]
  }> = [
    {
      id: 'ages',
      heading: t('ages.heading'),
      lines: [t('ages.l1'), t('ages.l2'), t('ages.l3')]
    },
    {
      id: 'who',
      heading: t('who.heading'),
      lines: [t('who.l1'), t('who.l2'), t('who.l3'), t('who.l4'), t('who.l5')]
    },
    {
      id: 'wherewhen',
      heading: t('wherewhen.heading'),
      lines: [
        t('wherewhen.l1'),
        <strong key='b'>{t('wherewhen.l2')}</strong>,
        t('wherewhen.l3')
      ]
    },
    {
      id: 'games',
      heading: t('games.heading'),
      lines: [
        <>
          <strong>{t('games.maxPrefix')}</strong> {t('games.maxSuffix')}
        </>,
        <>
          <strong>{t('games.minPrefix')}</strong> {t('games.minSuffix')}
        </>
      ]
    }
  ]

  return (
    <section
      className='relative w-full overflow-hidden'
      style={{ paddingBottom: `${WAVE_H}px` }}
    >
      {/* Background */}
      <Image
        src={BG}
        alt=''
        fill
        className='absolute inset-0 -z-10 object-cover'
        sizes='100vw'
        decoding='async'
        loading='lazy'
        draggable={false}
      />

      {/* Content grid */}
      <div className='mx-auto max-w-screen-xl px-4 py-10 sm:py-12'>
        <div className='grid grid-cols-1 gap-8 lg:grid-cols-4'>
          {items.map((it, i) => (
            <div
              key={it.id}
              className='flex flex-col items-center gap-3 text-center sm:gap-4'
            >
              <h3 className='text-sm font-extrabold uppercase tracking-wide text-sky-500 sm:text-base'>
                {it.heading}
              </h3>
              <PinMarker index={i}>
                <div className='space-y-1 text-[13px] font-bold uppercase leading-snug text-white sm:text-sm'>
                  {it.lines.map((ln, idx) => (
                    <div
                      key={idx}
                      className={clsx(
                        'opacity-95',
                        idx === 0 && 'text-[14px] sm:text-base'
                      )}
                    >
                      {ln}
                    </div>
                  ))}
                </div>
              </PinMarker>
            </div>
          ))}
        </div>
      </div>

      {/* ---- Wave + stats (mobile & desktop) ---- */}
      <div className='absolute bottom-0 left-1/2 w-screen -translate-x-1/2'>
        {/* Wave image */}
        <Image
          src={WAVE}
          alt=''
          width={2048}
          height={WAVE_H}
          className='-mb-px block w-full object-cover'
          style={{ height: `${WAVE_H}px` }}
          sizes='100vw'
          decoding='async'
          loading='lazy'
          draggable={false}
        />

        {/* Stats overlay: centered on mobile, right-aligned on lg+ */}
        <div className='pointer-events-none absolute inset-0'>
          <div className='mx-auto flex h-full max-w-screen-xl items-center justify-center px-4 lg:justify-end'>
            {/* Mobile: compact single-line */}
            <div className='block lg:hidden'>
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
            {/* Desktop: standard, right-aligned */}
            <div className='hidden lg:block'>
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
      </div>
    </section>
  )
}

/* --- UI bits --- */
function PinMarker({
  children,
  index
}: {
  children: React.ReactNode
  index: number
}) {
  const gradId = `pin-grad-${index}`
  return (
    <div className='relative mx-auto w-[180px] sm:w-[210px]'>
      <svg
        viewBox='0 0 48 64'
        xmlns='http://www.w3.org/2000/svg'
        className='h-auto w-full drop-shadow'
        aria-hidden
      >
        <defs>
          <linearGradient id={gradId} x1='0%' y1='0%' x2='100%' y2='0%'>
            <stop offset='0%' stopColor='#22d3ee' />
            <stop offset='100%' stopColor='#60a5fa' />
          </linearGradient>
        </defs>
        <path
          d='M24 0C10.745 0 0 10.745 0 24c0 17.25 24 40 24 40s24-22.75 24-40C48 10.745 37.255 0 24 0z'
          fill={`url(#${gradId})`}
        />
        <path
          d='M24 4c-11.046 0-20 8.954-20 20 0 14.355 16.5 31 20 31s20-16.645 20-31c0-11.046-8.954-20-20-20z'
          fill='white'
          opacity='0.06'
        />
      </svg>
      <div className='pointer-events-none absolute inset-0 flex items-center justify-center px-5'>
        <div className='pointer-events-auto'>{children}</div>
      </div>
    </div>
  )
}

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
          ? 'gap-2 px-2 text-[10px] tracking-tight' // tighter on mobile; forces one line
          : 'gap-3 px-3 text-[11px] tracking-normal sm:gap-4 sm:text-[13px] sm:tracking-wide lg:gap-6 lg:text-lg'
      )}
    >
      {items.map((item, i) => (
        <li
          key={i}
          className={clsx(
            'flex items-center',
            compact ? 'gap-2' : 'gap-4 lg:gap-6'
          )}
        >
          <span>{item}</span>
          {i < items.length - 1 && (
            <span
              className={clsx(
                'leading-none',
                compact ? 'text-xs' : 'text-base sm:text-lg lg:text-2xl'
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
