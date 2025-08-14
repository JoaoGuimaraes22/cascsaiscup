'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { MouseEvent } from 'react'

export default function RegistrationHero() {
  const t = useTranslations('RegistrationPage.RegistrationHero')

  // Assets
  const BG = '/img/registration/hero-bg.png'
  const PLAYER = '/img/registration/player.png'
  const WAVE = '/img/global/ondas-3.png'
  const TAGLINE = '/img/global/tagline.png'

  const WAVE_H = 135

  const onScrollToForm = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const el = document.getElementById('registration-form')
    if (!el) {
      window.location.hash = '#registration-form'
      return
    }
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollIntoView({
      behavior: prefersReduced ? 'auto' : 'smooth',
      block: 'start'
    })
  }

  return (
    <section
      className='relative max-h-[89vh] w-full overflow-hidden'
      style={{ maxHeight: '89svh' }}
    >
      {/* Background */}
      <Image
        src={BG}
        alt=''
        role='presentation'
        fill
        priority
        sizes='100vw'
        className='absolute inset-0 -z-10 object-cover'
      />

      {/* Padding for the wave lives here so wave fits inside 89vh */}
      <div
        className='mx-auto max-w-screen-xl px-4 pt-8 sm:pt-12'
        style={{ paddingBottom: `${WAVE_H}px` }}
      >
        {/* Content grid */}
        <div className='grid grid-cols-1 gap-8 lg:grid-cols-12'>
          {/* Left: heading + copy + CTA */}
          <div className='lg:col-span-7'>
            <h1 className='mb-3 text-2xl font-extrabold uppercase tracking-wide text-sky-500 sm:text-3xl'>
              {t('title')}
            </h1>

            <div className='space-y-4 text-sm leading-relaxed text-slate-800/90 sm:text-base'>
              <p>{t('intro')}</p>

              <ul className='list-disc space-y-2 pl-5'>
                <li>
                  <span className='font-extrabold uppercase tracking-wide text-sky-700'>
                    {t('earlyBird.label')}
                  </span>{' '}
                  {t('earlyBird.text')}
                </li>
                <li>
                  <span className='font-extrabold uppercase tracking-wide text-sky-700'>
                    {t('regularBird.label')}
                  </span>{' '}
                  {t('regularBird.text')}
                </li>
                <li>{t('teamMinimum')}</li>
                <li>{t('coachesOffer')}</li>
              </ul>

              {/* Alojamento em Hotel section */}
              <div>
                <h3 className='mb-1 font-extrabold uppercase tracking-wide text-sky-500'>
                  {t('hotel.title')}
                </h3>
                <p>
                  {t('hotel.text')} <strong>{t('hotel.agents')}</strong>{' '}
                  {t('hotel.more')}{' '}
                  <a
                    href='https://www.cascaisvolleycup.com'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='font-semibold underline'
                  >
                    www.cascaisvolleycup.com
                  </a>
                </p>
              </div>

              <button
                onClick={onScrollToForm}
                className='inline-flex items-center rounded-full bg-sky-700 px-5 py-2 text-sm font-bold text-white shadow-lg ring-1 ring-black/10 hover:bg-sky-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 sm:text-base'
                aria-label={t('ctaScroll')}
              >
                {t('ctaScroll')}
              </button>

              {/* Tagline (desktop only) */}
              <div className='hidden pt-6 lg:block'>
                <Image
                  src={TAGLINE}
                  alt={t('taglineAlt')}
                  width={420}
                  height={160}
                  className='h-auto w-[320px] object-contain'
                  sizes='(max-width:1024px) 320px, 420px'
                />
              </div>
            </div>
          </div>

          {/* Right: player image */}
          <div className='relative lg:col-span-5'>
            <div
              className='relative z-20 mx-auto -mt-2 h-[360px] w-full overflow-visible
                         [-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_70%,transparent_100%)]
                         [mask-image:linear-gradient(to_bottom,black_0%,black_70%,transparent_100%)]
                         sm:-mt-4 sm:h-[420px] lg:-mt-8 lg:h-[560px] xl:h-[640px]'
            >
              <Image
                src={PLAYER}
                alt={t('playerAlt')}
                fill
                sizes='(max-width: 1024px) 90vw, 700px'
                className='object-contain object-bottom'
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Wave + centered stats */}
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
              <ul className='flex flex-wrap items-center gap-x-6 gap-y-2 text-lg font-extrabold text-white sm:text-xl'>
                <li>{t('stats.teams')}</li>
                <li className='text-2xl leading-none'>•</li>
                <li>{t('stats.athletes')}</li>
                <li className='text-2xl leading-none'>•</li>
                <li>{t('stats.countries')}</li>
                <li className='text-2xl leading-none'>•</li>
                <li>{t('stats.games')}</li>
              </ul>
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
            <ul className='flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-base font-extrabold text-white'>
              <li>{t('stats.teams')}</li>
              <li className='text-xl leading-none'>•</li>
              <li>{t('stats.athletes')}</li>
              <li className='text-xl leading-none'>•</li>
              <li>{t('stats.countries')}</li>
              <li className='text-xl leading-none'>•</li>
              <li>{t('stats.games')}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
