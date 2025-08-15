'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { MouseEvent } from 'react'

export default function RegistrationHero() {
  const t = useTranslations('RegistrationPage.RegistrationHero')

  // Assets
  const ASSETS = {
    background: '/img/registration/hero-bg.png',
    player: '/img/registration/player.png',
    wave: '/img/global/ondas-3.png',
    tagline: '/img/global/tagline.png'
  } as const

  const WAVE_HEIGHT = 135

  const handleScrollToForm = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const formElement = document.getElementById('registration-form')

    if (!formElement) {
      window.location.hash = '#registration-form'
      return
    }

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    formElement.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'start'
    })
  }

  const statsData = [
    t('stats.teams'),
    t('stats.athletes'),
    t('stats.countries'),
    t('stats.games')
  ]

  return (
    <section
      className='relative w-full overflow-hidden'
      style={{
        minHeight: '89svh',
        maxHeight: 'none' // Allow content to expand naturally
      }}
      aria-labelledby='registration-title'
    >
      {/* Background Image */}
      <div className='absolute inset-0 -z-10'>
        <Image
          src={ASSETS.background}
          alt=''
          fill
          priority
          sizes='100vw'
          className='object-cover'
        />
      </div>

      {/* Main Content Container */}
      <div
        className='relative z-10 mx-auto max-w-screen-xl px-4 pt-8 sm:pt-12'
        style={{ paddingBottom: `${WAVE_HEIGHT + 40}px` }}
      >
        {/* Content Grid */}
        <div className='grid grid-cols-1 gap-8 lg:grid-cols-12'>
          {/* Left Column: Content */}
          <div className='flex flex-col justify-center lg:col-span-7'>
            <div className='space-y-6'>
              <h1
                id='registration-title'
                className='text-2xl font-extrabold uppercase tracking-wide text-sky-500 sm:text-3xl lg:text-4xl'
              >
                {t('title')}
              </h1>

              <div className='max-w-prose space-y-4 text-sm leading-relaxed text-slate-800/90 sm:text-base'>
                <p>{t('intro')}</p>

                <ul className='space-y-2 pl-5 marker:text-sky-600' role='list'>
                  <li className='list-disc'>
                    <span className='font-extrabold uppercase tracking-wide text-sky-700'>
                      {t('earlyBird.label')}
                    </span>{' '}
                    {t('earlyBird.text')}
                  </li>
                  <li className='list-disc'>
                    <span className='font-extrabold uppercase tracking-wide text-sky-700'>
                      {t('regularBird.label')}
                    </span>{' '}
                    {t('regularBird.text')}
                  </li>
                  <li className='list-disc'>{t('teamMinimum')}</li>
                  <li className='list-disc'>{t('coachesOffer')}</li>
                </ul>

                {/* Hotel Information */}
                <div>
                  <h3 className='mb-2 font-extrabold uppercase tracking-wide text-sky-600'>
                    {t('hotel.title')}
                  </h3>
                  <p>
                    {t('hotel.text')} <strong>{t('hotel.agents')}</strong>{' '}
                    {t('hotel.more')}{' '}
                    <a
                      href='https://www.cascaisvolleycup.com'
                      target='_blank'
                      rel='noopener noreferrer'
                      className='font-semibold text-sky-700 underline decoration-2 underline-offset-2 transition-colors hover:text-sky-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300'
                    >
                      www.cascaisvolleycup.com
                    </a>
                  </p>
                </div>

                {/* CTA Button */}
                <div className='pt-2'>
                  <button
                    onClick={handleScrollToForm}
                    className='group relative overflow-hidden rounded-full bg-gradient-to-r from-sky-600 to-sky-700 px-6 py-3 text-sm font-bold text-white shadow-xl ring-1 ring-black/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 sm:text-base'
                    aria-label={t('ctaScroll')}
                  >
                    <span className='relative z-10'>{t('ctaScroll')}</span>
                    <div className='absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full' />
                  </button>
                </div>

                {/* Tagline - Desktop Only */}
                <div className='hidden pt-6 xl:block'>
                  <Image
                    src={ASSETS.tagline}
                    alt={t('taglineAlt') || 'Feel the action, enjoy the summer'}
                    width={420}
                    height={160}
                    className='h-auto w-[320px] object-contain drop-shadow-lg lg:w-[380px]'
                    sizes='(max-width: 1024px) 320px, 380px'
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Player Image - Desktop Only */}
          <div className='relative hidden lg:col-span-5 lg:flex lg:items-center lg:justify-center'>
            <div className='relative h-[500px] w-full max-w-[400px] xl:h-[600px] xl:max-w-[480px]'>
              <div
                className='absolute inset-0'
                style={{
                  maskImage:
                    'linear-gradient(to bottom, black 0%, black 70%, transparent 100%)',
                  WebkitMaskImage:
                    'linear-gradient(to bottom, black 0%, black 70%, transparent 100%)'
                }}
              >
                <Image
                  src={ASSETS.player}
                  alt={t('playerAlt') || 'Beach volleyball player'}
                  fill
                  sizes='(max-width: 1280px) 400px, 480px'
                  className='object-contain object-bottom'
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave with Stats */}
      <div className='relative z-0'>
        <WaveSection
          waveAsset={ASSETS.wave}
          waveHeight={WAVE_HEIGHT}
          statsData={statsData}
        />
      </div>
    </section>
  )
}

/* -------- Wave Section Component -------- */
interface WaveSectionProps {
  waveAsset: string
  waveHeight: number
  statsData: string[]
}

function WaveSection({ waveAsset, waveHeight, statsData }: WaveSectionProps) {
  return (
    <div className='absolute bottom-0 left-1/2 w-screen -translate-x-1/2'>
      {/* Desktop Version */}
      <div className='relative hidden lg:block'>
        <Image
          src={waveAsset}
          alt=''
          width={2048}
          height={waveHeight}
          sizes='100vw'
          className='-mb-px block h-auto w-full'
          style={{ height: `${waveHeight}px` }}
        />
        <div className='absolute inset-0 flex items-center justify-end'>
          <div className='mx-auto max-w-screen-xl px-4'>
            <StatsList items={statsData} />
          </div>
        </div>
      </div>

      {/* Mobile Version */}
      <div
        className='relative flex items-center justify-center lg:hidden'
        style={{
          backgroundImage: `url(${waveAsset})`,
          backgroundSize: '100% 100%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          height: `${waveHeight}px`
        }}
      >
        <StatsList compact items={statsData} />
      </div>
    </div>
  )
}

/* -------- Stats List Component -------- */
interface StatsListProps {
  items: string[]
  compact?: boolean
}

function StatsList({ items, compact = false }: StatsListProps) {
  return (
    <ul
      role='list'
      aria-label='Tournament statistics'
      className={`flex items-center whitespace-nowrap font-extrabold uppercase text-white drop-shadow-lg ${
        compact
          ? 'gap-2 px-2 text-[10px] tracking-tight'
          : 'gap-3 px-3 text-[11px] tracking-normal sm:gap-4 sm:text-[13px] sm:tracking-wide lg:gap-6 lg:text-lg'
      }`}
    >
      {items.map((item, index) => (
        <li
          key={`stat-${index}`}
          className={`flex items-center ${
            compact ? 'gap-2' : 'gap-3 sm:gap-4 lg:gap-6'
          }`}
        >
          <span className='transition-all duration-300 hover:scale-105'>
            {item}
          </span>
          {index < items.length - 1 && (
            <span
              className={`leading-none text-sky-300 ${
                compact ? 'text-xs' : 'text-sm sm:text-lg lg:text-2xl'
              }`}
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
