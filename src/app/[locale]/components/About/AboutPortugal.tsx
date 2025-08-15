'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import clsx from 'clsx'

export default function AboutPortugal() {
  const t = useTranslations('AboutPage.Portugal')

  // ===== Assets =====
  const BG = '/img/about/portugal-bg.png'
  const LOGO = '/img/global/cascais-volley-cup-2.png'
  const TAGLINE = '/img/global/tagline.png'
  const WAVE = '/img/global/ondas-3.png'

  const spots = [
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
  ]

  const WAVE_H = 135 // px

  return (
    <section
      className='relative w-full overflow-hidden'
      style={{ paddingBottom: `${WAVE_H}px` }}
    >
      {/* Background scenic image */}
      <div className='absolute inset-0 -z-10'>
        <Image
          src={BG}
          alt=''
          fill
          className='object-cover'
          sizes='100vw'
          priority
        />
      </div>

      {/* Content */}
      <div className='mx-auto max-w-screen-xl px-4 py-10 sm:py-12'>
        {/* Title + intro + logo/tagline */}
        <div className='relative grid grid-cols-1 gap-8 md:grid-cols-[1.1fr_0.9fr]'>
          {/* LEFT */}
          <div className='space-y-6'>
            <h2 className='text-2xl font-extrabold uppercase text-sky-500 sm:text-3xl md:text-4xl'>
              {t('title')}
            </h2>
            <p className='text-slate-700'>{t('p1')}</p>
            <p className='text-slate-700'>{t('p2')}</p>
            <p className='text-slate-700'>{t('p3')}</p>
            <p className='text-slate-700'>{t('p4')}</p>
          </div>

          {/* RIGHT (logo + tagline, only on md+) */}
          <div className='relative hidden items-start justify-end md:flex'>
            <div className='flex flex-col items-end gap-4'>
              <Image
                src={LOGO}
                alt={t('logoAlt')}
                width={260}
                height={180}
                className='h-auto w-[220px] object-contain lg:w-[260px]'
                priority
              />
              <Image
                src={TAGLINE}
                alt={t('taglineAlt')}
                width={360}
                height={150}
                className='h-auto w-[280px] object-contain lg:w-[360px]'
              />
            </div>
          </div>
        </div>

        {/* Cards grid */}
        <div className='mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4'>
          {spots.map(s => (
            <article
              key={s.key}
              className='overflow-hidden rounded-xl bg-white/70 shadow-sm ring-1 ring-black/5 backdrop-blur-sm'
            >
              <div className='relative h-40 w-full sm:h-44'>
                <Image
                  src={s.img}
                  alt={s.alt}
                  fill
                  className='object-cover'
                  sizes='(max-width: 640px) 100vw, (max-width:1024px) 50vw, 25vw'
                  loading='lazy'
                  decoding='async'
                />
              </div>
              <div className='space-y-2 p-4'>
                <h3 className='text-base font-extrabold uppercase text-sky-500'>
                  {t(`cards.${s.key}.title`)}{' '}
                  <span className='font-semibold text-slate-500'>
                    {t(`cards.${s.key}.subtitle`)}
                  </span>
                </h3>
                <p className='text-sm leading-relaxed text-slate-700'>
                  {t(`cards.${s.key}.desc`)}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Bottom wave pinned + stats */}
      <div className='absolute bottom-0 left-1/2 w-screen -translate-x-1/2'>
        <Image
          src={WAVE}
          alt=''
          width={2048}
          height={WAVE_H}
          className='-mb-px block w-full object-cover'
          style={{ height: `${WAVE_H}px` }}
          sizes='100vw'
          priority
        />

        {/* Stats overlay */}
        <div className='pointer-events-none absolute inset-0'>
          <div className='mx-auto flex h-full max-w-screen-xl items-center justify-center px-4 lg:justify-end'>
            {/* Mobile: compact */}
            <div className='block lg:hidden'>
              <StatsList
                compact
                items={[
                  t('stats.teams'),
                  t('stats.athletes'),
                  t('stats.countries'),
                  t('stats.matches')
                ]}
              />
            </div>
            {/* Desktop */}
            <div className='hidden lg:block'>
              <StatsList
                items={[
                  t('stats.teams'),
                  t('stats.athletes'),
                  t('stats.countries'),
                  t('stats.matches')
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* --- Reusable stats list --- */
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
          ? 'gap-2 px-2 text-[10px] tracking-tight'
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
