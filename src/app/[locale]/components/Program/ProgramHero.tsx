'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Link } from '@/src/navigation'
import { useEffect, useRef, useState } from 'react'
import { FiDownload, FiExternalLink } from 'react-icons/fi'
import clsx from 'clsx'

export default function ProgramHero() {
  const t = useTranslations('ProgramPage.Hero')
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [backgroundLoaded, setBackgroundLoaded] = useState(false)

  // ===== Constants =====
  const ASSETS = {
    background: '/img/program/program-bg.png',
    tagline: '/img/global/tagline.png',
    players: '/img/program/players.png',
    wave: '/img/global/ondas-3.png',
    logo: '/img/global/cascais-volley-cup-1.png'
  } as const

  const PROGRAM_PDF = '/docs/program-2026.pdf'
  const WAVE_HEIGHT = 135

  const STATS = [
    t('stats.teams'),
    t('stats.athletes'),
    t('stats.countries'),
    t('stats.games')
  ] as const

  // Days configuration
  const DAYS = [
    {
      key: 'd1',
      weekday: t('days.d1.weekday'),
      date: t('days.d1.date'),
      blocks: [
        { title: t('days.d1.block1.title') },
        { subtitle: t('days.d1.block1.subtitle') },
        { times: t('days.d1.block1.times') }
      ]
    },
    {
      key: 'd2',
      weekday: t('days.d2.weekday'),
      date: t('days.d2.date'),
      blocks: [
        { title: t('days.d2.block1.title') },
        { subtitle: t('days.d2.block1.subtitle') },
        { times: t('days.d2.block1.times') }
      ]
    },
    {
      key: 'd3',
      weekday: t('days.d3.weekday'),
      date: t('days.d3.date'),
      blocks: [{ title: t('days.d3.block1.title') }]
    },
    {
      key: 'd4',
      weekday: t('days.d4.weekday'),
      date: t('days.d4.date'),
      blocks: [
        { title: t('days.d4.block1.title') },
        { title: t('days.d4.block2.title') },
        { subtitle: t('days.d4.block3.subtitle') },
        { times: t('days.d4.block3.times') }
      ]
    },
    {
      key: 'd5',
      weekday: t('days.d5.weekday'),
      date: t('days.d5.date'),
      blocks: [
        { title: t('days.d5.block1.title') },
        { title: t('days.d5.block2.title') },
        { title: t('days.d5.block3.title') },
        { subtitle: t('days.d5.block4.subtitle') },
        { times: t('days.d5.block4.times') },
        { note: t('days.d5.block5.note') }
      ]
    }
  ] as const

  // Intersection observer for animations
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

  return (
    <section
      ref={sectionRef}
      className='relative w-full overflow-hidden'
      style={{ paddingBottom: `${WAVE_HEIGHT}px` }}
      aria-labelledby='program-title'
    >
      {/* Enhanced Background */}
      <div className='absolute inset-0 -z-10'>
        <div className='absolute inset-0 bg-gradient-to-br from-slate-50 to-slate-100' />
        <Image
          src={ASSETS.background}
          alt=''
          role='presentation'
          fill
          className={clsx(
            'object-cover transition-opacity duration-700',
            backgroundLoaded ? 'opacity-100' : 'opacity-0'
          )}
          sizes='100vw'
          priority
          onLoad={() => setBackgroundLoaded(true)}
        />
      </div>

      <div className='mx-auto max-w-screen-xl px-4 pt-8 sm:pt-12'>
        {/* Top Section: Title & Tagline */}
        <div className='grid grid-cols-1 gap-8 lg:grid-cols-12'>
          {/* Left: title + intro */}
          <div
            className={clsx(
              'transition-all duration-1000 ease-out lg:col-span-7',
              isVisible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-8 opacity-0'
            )}
          >
            <h1
              id='program-title'
              className='mb-3 text-2xl font-extrabold uppercase tracking-wide text-sky-500 sm:text-3xl'
            >
              {t('title')}
            </h1>

            <div className='space-y-3 text-sm leading-relaxed text-slate-800/90 sm:text-base'>
              <p
                className={clsx(
                  'transition-all duration-700 ease-out',
                  isVisible
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-4 opacity-0'
                )}
                style={{ transitionDelay: '200ms' }}
              >
                <span className='font-extrabold uppercase tracking-wide text-sky-700'>
                  {t('checkin.label')}
                </span>{' '}
                {t('checkin.text')}
              </p>
              <p
                className={clsx(
                  'transition-all duration-700 ease-out',
                  isVisible
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-4 opacity-0'
                )}
                style={{ transitionDelay: '300ms' }}
              >
                <span className='font-extrabold uppercase tracking-wide text-sky-500'>
                  {t('daysHeader')}
                </span>
              </p>
            </div>
          </div>

          {/* Right: tagline */}
          <div
            className={clsx(
              'flex items-start justify-end transition-all duration-1000 ease-out lg:col-span-5',
              isVisible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-8 opacity-0'
            )}
            style={{ transitionDelay: '400ms' }}
          >
            <Image
              src={ASSETS.tagline}
              alt={t('taglineAlt')}
              width={420}
              height={160}
              className='h-auto w-[240px] object-contain transition-transform duration-300 hover:scale-105 sm:w-[320px] lg:w-[420px]'
              sizes='(max-width:640px) 240px, (max-width:1024px) 320px, 420px'
            />
          </div>
        </div>

        {/* Day Cards with Staggered Animation */}
        <div className='mt-6 sm:mt-8'>
          <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5'>
            {DAYS.map((day, index) => (
              <DayCard
                key={day.key}
                day={{ ...day, blocks: [...day.blocks] }}
                index={index}
                isVisible={isVisible}
              />
            ))}
          </div>
        </div>

        {/* Bottom Content: Details & Players */}
        <div className='mt-8 grid grid-cols-1 gap-8 lg:mt-10 lg:grid-cols-12'>
          {/* Left: Details & Actions */}
          <div
            className={clsx(
              'space-y-4 text-sm leading-relaxed text-slate-800/90 transition-all duration-1000 ease-out sm:text-base lg:col-span-7',
              isVisible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-8 opacity-0'
            )}
            style={{ transitionDelay: '800ms' }}
          >
            <InfoSection
              title={t('layday.title')}
              content={t('layday.text')}
              isVisible={isVisible}
              delay={900}
            />

            <InfoSection
              title={t('checkout.label')}
              content={t('checkout.text')}
              isVisible={isVisible}
              delay={1000}
              subtitle
            />

            <InfoSection
              title={t('attention.label')}
              content={t('attention.text')}
              isVisible={isVisible}
              delay={1100}
              subtitle
            />

            {/* Action Buttons */}
            <div
              className={clsx(
                'flex flex-col items-start gap-3 pt-2 transition-all duration-700 ease-out',
                isVisible
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-4 opacity-0'
              )}
              style={{ transitionDelay: '1200ms' }}
            >
              <EnhancedButton
                href={PROGRAM_PDF}
                variant='primary'
                download
                icon={<FiDownload className='h-4 w-4' />}
              >
                {t('downloadPdf')}
              </EnhancedButton>

              <Link
                href='/registration'
                className='group inline-flex items-center gap-2 rounded-full bg-white/90 px-5 py-2 text-sm font-bold text-sky-700 shadow-sm ring-1 ring-sky-600/40 transition-all duration-300 hover:scale-105 hover:bg-white hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 sm:text-base'
              >
                {t('ctaContact')}
                <FiExternalLink className='h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5' />
              </Link>
            </div>

            {/* Logo */}
            <div
              className={clsx(
                'flex justify-start pt-6 transition-all duration-700 ease-out',
                isVisible
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-4 opacity-0'
              )}
              style={{ transitionDelay: '1300ms' }}
            >
              <Image
                src={ASSETS.logo}
                alt={t('logoAlt') || 'Cascais Volley Cup'}
                width={200}
                height={60}
                className='h-auto w-[150px] object-contain transition-transform duration-300 hover:scale-105 sm:w-[180px] lg:w-[200px]'
                sizes='(max-width: 640px) 150px, (max-width: 1024px) 180px, 200px'
              />
            </div>
          </div>

          {/* Right: Players Image */}
          <div
            className={clsx(
              'relative transition-all duration-1000 ease-out lg:col-span-5',
              isVisible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-8 opacity-0'
            )}
            style={{ transitionDelay: '600ms' }}
          >
            <div className='relative z-20 mx-auto -mt-4 h-[360px] w-full overflow-visible [-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_68%,transparent_100%)] [mask-image:linear-gradient(to_bottom,black_0%,black_68%,transparent_100%)] sm:-mt-6 sm:h-[420px] lg:-mt-10 lg:h-[560px] xl:h-[640px]'>
              <Image
                src={ASSETS.players}
                alt={t('playersAlt')}
                fill
                className='object-contain object-bottom transition-transform duration-300 hover:scale-105'
                sizes='(max-width: 1024px) 90vw, 700px'
              />
            </div>
          </div>
        </div>
      </div>

      {/* Wave with Stats */}
      <WaveWithStats
        waveHeight={WAVE_HEIGHT}
        stats={STATS}
        isVisible={isVisible}
      />
    </section>
  )
}

/* --- Enhanced Components --- */

interface DayCardProps {
  day: {
    key: string
    weekday: string
    date: string
    blocks: Array<{
      title?: string
      subtitle?: string
      times?: string
      note?: string
    }>
  }
  index: number
  isVisible: boolean
}

function DayCard({ day, index, isVisible }: DayCardProps) {
  return (
    <article
      className={clsx(
        'group rounded-2xl bg-sky-500 px-3 py-4 text-center text-white shadow-lg ring-1 ring-black/10 transition-all duration-300 ease-out',
        'hover:-translate-y-2 hover:shadow-2xl hover:ring-sky-400/30',
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      )}
      style={{
        transitionDelay: `${600 + index * 100}ms`
      }}
    >
      <div className='mb-3 flex flex-col items-center justify-center gap-1'>
        <span className='text-base font-black uppercase tracking-wide text-white sm:text-lg'>
          {day.weekday}
        </span>
        <span className='text-sm font-bold text-white/90 sm:text-base'>
          {day.date}
        </span>
      </div>

      <div className='flex min-h-[160px] flex-col items-center justify-center gap-1 sm:min-h-[180px]'>
        {day.blocks.map((block, blockIndex) => (
          <p
            key={blockIndex}
            className={clsx(
              block.title && 'text-[15px] font-extrabold uppercase',
              block.note &&
                'mt-1 max-w-[18ch] text-[13px] font-extrabold uppercase',
              !block.title && !block.note && 'text-sm'
            )}
          >
            {block.title ?? block.subtitle ?? block.times ?? block.note}
          </p>
        ))}
      </div>
    </article>
  )
}

interface InfoSectionProps {
  title: string
  content: string
  isVisible: boolean
  delay: number
  subtitle?: boolean
}

function InfoSection({
  title,
  content,
  isVisible,
  delay,
  subtitle = false
}: InfoSectionProps) {
  return (
    <div
      className={clsx(
        'transition-all duration-700 ease-out',
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <h3
        className={clsx(
          'mb-1 font-extrabold uppercase tracking-wide',
          subtitle
            ? 'text-[15px] text-sky-700 sm:text-base'
            : 'text-lg text-sky-500 sm:text-xl'
        )}
      >
        {title}
      </h3>
      <p>{content}</p>
    </div>
  )
}

interface EnhancedButtonProps {
  href: string
  variant: 'primary' | 'secondary'
  children: React.ReactNode
  icon?: React.ReactNode
  download?: boolean
}

function EnhancedButton({
  href,
  variant,
  children,
  icon,
  download
}: EnhancedButtonProps) {
  const baseClasses =
    'group relative inline-flex items-center gap-2 overflow-hidden rounded-full px-5 py-2 text-sm font-bold shadow-lg ring-1 ring-black/10 transition-all duration-300 hover:scale-105 hover:shadow-xl focus:outline-none focus-visible:ring-2 sm:text-base'

  const variantClasses =
    variant === 'primary'
      ? 'bg-sky-600 text-white hover:bg-sky-700 focus-visible:ring-sky-300'
      : 'bg-white/90 text-sky-700 ring-sky-600/40 hover:bg-white focus-visible:ring-sky-300'

  return (
    <a
      href={href}
      target='_blank'
      rel='noopener noreferrer'
      type={download ? 'application/pdf' : undefined}
      download={download}
      className={clsx(baseClasses, variantClasses)}
    >
      <span className='relative z-10 flex items-center gap-2'>
        {icon}
        {children}
      </span>

      {/* Shimmer effect */}
      <div className='absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-full' />
    </a>
  )
}

interface WaveWithStatsProps {
  waveHeight: number
  stats: readonly string[]
  isVisible: boolean
}

function WaveWithStats({ waveHeight, stats, isVisible }: WaveWithStatsProps) {
  return (
    <div className='pointer-events-none absolute bottom-0 left-1/2 w-screen -translate-x-1/2'>
      {/* Desktop */}
      <div className='relative hidden lg:block'>
        <Image
          src='/img/global/ondas-3.png'
          alt=''
          role='presentation'
          width={2048}
          height={waveHeight}
          className='z-10 -mb-px block h-auto w-full'
          sizes='100vw'
        />
        <div className='pointer-events-none absolute inset-0 z-30'>
          <div className='mx-auto flex h-full max-w-screen-xl translate-y-[4px] items-center justify-end px-4'>
            <div
              className={clsx(
                'transition-all duration-1000 ease-out',
                isVisible
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-4 opacity-0'
              )}
              style={{ transitionDelay: '1400ms' }}
            >
              <StatsList items={stats} />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div
        className='relative block lg:hidden'
        style={{
          backgroundImage: 'url(/img/global/ondas-3.png)',
          backgroundSize: '100% 100%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          height: `${waveHeight}px`
        }}
      >
        <div className='pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-4'>
          <div
            className={clsx(
              'transition-all duration-1000 ease-out',
              isVisible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-4 opacity-0'
            )}
            style={{ transitionDelay: '1400ms' }}
          >
            <StatsList compact items={stats} />
          </div>
        </div>
      </div>
    </div>
  )
}

/* --- Stats List Component --- */
interface StatsListProps {
  items: readonly string[]
  compact?: boolean
}

function StatsList({ items, compact = false }: StatsListProps) {
  return (
    <ul
      aria-label='Tournament statistics'
      className={clsx(
        'flex items-center whitespace-nowrap font-extrabold uppercase text-white',
        compact
          ? 'gap-2 px-2 text-[10px] tracking-tight'
          : 'gap-3 px-3 text-[11px] tracking-normal sm:gap-4 sm:text-[13px] sm:tracking-wide lg:gap-6 lg:text-lg'
      )}
    >
      {items.map((item, index) => (
        <li
          key={index}
          className={clsx(
            'flex items-center',
            compact ? 'gap-2' : 'gap-3 sm:gap-4 lg:gap-6'
          )}
        >
          <span>{item}</span>
          {index < items.length - 1 && (
            <span
              className={clsx(
                'leading-none text-white/70',
                compact ? 'text-xs' : 'text-sm sm:text-lg lg:text-2xl'
              )}
              aria-hidden='true'
            >
              •
            </span>
          )}
        </li>
      ))}
    </ul>
  )
}
