'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'

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
