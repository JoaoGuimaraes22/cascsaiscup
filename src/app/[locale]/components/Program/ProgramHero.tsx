'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { useEffect, useRef, useState } from 'react'
import { FiDownload } from 'react-icons/fi'
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
    wave: '/img/global/ondas-3.png'
  } as const

  const PROGRAM_PDF = '/docs/program-2026.pdf'
  const WAVE_HEIGHT = 135

  // Days configuration with new design
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
      style={{ paddingBottom: `${WAVE_HEIGHT - 50}px` }}
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
        {/* Title & Tagline Section */}
        <div className='grid grid-cols-1 gap-8 lg:grid-cols-12'>
          {/* Left: Title */}
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
              className='mb-6 text-2xl font-extrabold uppercase tracking-wide text-sky-500 sm:text-3xl'
            >
              {t('title')}
            </h1>
          </div>

          {/* Right: Tagline */}
          <div
            className={clsx(
              'flex items-start justify-end transition-all duration-1000 ease-out lg:col-span-5',
              isVisible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-8 opacity-0'
            )}
            style={{ transitionDelay: '200ms' }}
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

        {/* Reordered Content Structure */}
        <div className='mt-8 space-y-8'>
          {/* 1. July 7 - Weekday */}
          <InfoSection
            title={t('checkin.label')}
            content={t('checkin.text')}
            isVisible={isVisible}
            delay={400}
            isWeekday={true}
          />

          {/* 3. Day Cards/Boxes */}
          <div
            className={clsx(
              'transition-all duration-1000 ease-out',
              isVisible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-8 opacity-0'
            )}
            style={{ transitionDelay: '600ms' }}
          >
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

          {/* 4-6. Side by Side: July 13, Checkout, Lay Day, Button on Left | Image on Right */}
          <div className='grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start'>
            {/* Left: All Text Content */}
            <div className='space-y-6 lg:col-span-7'>
              {/* July 13 - Weekday */}
              <InfoSection
                title={t('checkout.label')}
                content=''
                isVisible={isVisible}
                delay={1200}
                isWeekday={true}
              />

              {/* Checkout Text */}
              <InfoSection
                title=''
                content={t('checkout.text')}
                isVisible={isVisible}
                delay={1400}
              />

              {/* Lay Day Section */}
              <div
                className={clsx(
                  'space-y-4 transition-all duration-700 ease-out',
                  isVisible
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-4 opacity-0'
                )}
                style={{ transitionDelay: '1600ms' }}
              >
                <InfoSection
                  title={t('layDay.title')}
                  content=''
                  isVisible={isVisible}
                  delay={0}
                  isLayDay={true}
                />
                <div className='text-sm leading-relaxed text-slate-800/90 sm:text-base'>
                  <p className='mb-4'>{t('layDay.content')}</p>
                  <p className='text-sm font-medium text-slate-700'>
                    {t('layDay.note')}
                  </p>
                </div>
              </div>

              {/* Download Brochure Button */}
              <div
                className={clsx(
                  'transition-all duration-700 ease-out',
                  isVisible
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-4 opacity-0'
                )}
                style={{ transitionDelay: '1800ms' }}
              >
                <DownloadButton href={PROGRAM_PDF}>
                  {t('downloadBrochure')}
                </DownloadButton>
              </div>
            </div>

            {/* Right: Players Image - positioned to "touch" the boxes */}
            <div
              className={clsx(
                'transition-all duration-1000 ease-out lg:col-span-5 lg:-mt-16',
                isVisible
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-8 opacity-0'
              )}
              style={{ transitionDelay: '2000ms' }}
            >
              <Image
                src={ASSETS.players}
                alt={t('playersAlt')}
                width={600}
                height={400}
                className='h-auto w-full object-contain transition-transform duration-300 hover:scale-105'
                sizes='(max-width:1024px) 100vw, 42vw'
              />
            </div>
          </div>
        </div>
      </div>

      {/* Wave positioned higher to sit above image feet */}
      <div
        className='pointer-events-none absolute left-1/2 w-screen -translate-x-1/2'
        style={{ bottom: '50px' }}
      >
        {/* Desktop */}
        <div className='relative hidden lg:block'>
          <Image
            src='/img/global/ondas-3.png'
            alt=''
            role='presentation'
            width={2048}
            height={WAVE_HEIGHT}
            className='z-10 -mb-px block h-auto w-full'
            sizes='100vw'
          />
        </div>

        {/* Mobile */}
        <div
          className='relative block lg:hidden'
          style={{
            backgroundImage: 'url(/img/global/ondas-3.png)',
            backgroundSize: '100% 100%',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            height: `${WAVE_HEIGHT}px`
          }}
        />
      </div>
    </section>
  )
}

/* --- Enhanced Components --- */

interface DayCardProps {
  day: {
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
        'group text-center text-white transition-all duration-300 ease-out',
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      )}
      style={{
        transitionDelay: `${800 + index * 100}ms`
      }}
    >
      {/* Top Header: Weekday + Date - Outside the box */}
      <div className='mb-3 px-3 py-2'>
        <span className='text-sm font-bold uppercase tracking-wide text-sky-600 sm:text-base'>
          {day.weekday}
        </span>
        <div className='text-xs font-light text-sky-500 sm:text-sm'>
          {day.date}
        </div>
      </div>

      {/* Main Blue Box: Group Stage and Game Times */}
      <div className='overflow-hidden rounded-2xl bg-sky-500 shadow-lg ring-1 ring-black/10 transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-2xl hover:ring-sky-400/30'>
        <div className='flex min-h-[200px] flex-col items-center justify-center gap-2 px-4 py-5 sm:min-h-[220px]'>
          {day.blocks.map((block, blockIndex) => {
            if (block.title) {
              return (
                <p
                  key={blockIndex}
                  className='text-base font-black uppercase tracking-wide text-white sm:text-lg'
                >
                  {block.title}
                </p>
              )
            }
            if (block.subtitle || block.times) {
              return (
                <p
                  key={blockIndex}
                  className='text-sm font-light text-white/95 sm:text-base'
                >
                  {block.subtitle || block.times}
                </p>
              )
            }
            if (block.note) {
              return (
                <p
                  key={blockIndex}
                  className='mt-2 max-w-[18ch] text-xs font-medium uppercase text-white/90 sm:text-sm'
                >
                  {block.note}
                </p>
              )
            }
            return null
          })}
        </div>
      </div>
    </article>
  )
}

interface InfoSectionProps {
  title: string
  content: string
  isVisible: boolean
  delay: number
  isWeekday?: boolean
  isLayDay?: boolean
}

function InfoSection({
  title,
  content,
  isVisible,
  delay,
  isWeekday = false,
  isLayDay = false
}: InfoSectionProps) {
  if (!title && !content) return null

  return (
    <div
      className={clsx(
        'transition-all duration-700 ease-out',
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {title && (
        <h3
          className={clsx(
            'mb-3 font-extrabold uppercase tracking-wide',
            isWeekday
              ? 'text-xl text-sky-700 sm:text-2xl'
              : isLayDay
                ? 'text-lg text-sky-500 sm:text-xl'
                : 'text-lg text-sky-500 sm:text-xl'
          )}
        >
          {title}
        </h3>
      )}
      {content && (
        <p className='text-sm leading-relaxed text-slate-800/90 sm:text-base'>
          {content}
        </p>
      )}
    </div>
  )
}

function DownloadButton({
  href,
  children
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <a
      href={href}
      download
      className='group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-sky-600 px-6 py-3 text-sm font-bold text-white shadow-lg ring-1 ring-black/10 transition-all duration-300 hover:scale-105 hover:bg-sky-700 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 sm:text-base'
    >
      <FiDownload className='h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5' />
      <span>{children}</span>
    </a>
  )
}
