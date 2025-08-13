'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'

export default function ProgramHero() {
  const t = useTranslations('ProgramPage.ProgramHero')

  // Assets
  const BG = '/img/program/program-bg.png'
  const TAGLINE = '/img/global/tagline.png'
  const PLAYERS = '/img/program/players.png'
  const WAVE = '/img/global/ondas-3.png'
  const PROGRAM_PDF = '/docs/program-2026.pdf' // adjust if needed

  const WAVE_H = 135

  // Days (pull labels from i18n)
  const days = [
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
  ]

  return (
    <section className='relative w-full overflow-hidden pb-[135px]'>
      {/* BG */}
      <Image
        src={BG}
        alt=''
        fill
        className='absolute inset-0 -z-10 object-cover'
        sizes='100vw'
        priority
      />

      <div className='mx-auto max-w-screen-xl px-4 pt-8 sm:pt-12'>
        {/* Top: 2 columns */}
        <div className='grid grid-cols-1 gap-8 lg:grid-cols-12'>
          {/* Left: title + intro */}
          <div className='lg:col-span-7'>
            <h1 className='mb-3 text-2xl font-extrabold uppercase tracking-wide text-sky-600 sm:text-3xl'>
              {t('title')}
            </h1>

            <div className='space-y-3 text-sm leading-relaxed text-slate-800/90 sm:text-base'>
              <p>
                <span className='font-extrabold uppercase tracking-wide text-sky-700'>
                  {t('checkin.label')}
                </span>{' '}
                {t('checkin.text')}
              </p>
              <p>
                <span className='font-extrabold uppercase tracking-wide text-sky-700'>
                  {t('daysHeader')}
                </span>
              </p>
            </div>
          </div>

          {/* Right: tagline */}
          <div className='flex items-start justify-end lg:col-span-5'>
            <Image
              src={TAGLINE}
              alt={t('taglineAlt')}
              width={420}
              height={160}
              className='h-auto w-[240px] object-contain sm:w-[320px] lg:w-[420px]'
              sizes='(max-width:640px) 240px, (max-width:1024px) 320px, 420px'
            />
          </div>
        </div>

        {/* Day boxes */}
        <div className='mt-6 sm:mt-8'>
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5'>
            {days.map(d => (
              <article
                key={d.key}
                className='rounded-2xl bg-sky-600/90 p-4 text-center text-white shadow-lg ring-1 ring-black/10'
              >
                <div className='mb-2 text-xs font-extrabold uppercase tracking-wide text-white/90 sm:text-[13px]'>
                  {d.weekday}{' '}
                  <span className='font-semibold text-white/80'>{d.date}</span>
                </div>

                <div className='flex min-h-[160px] flex-col items-center justify-center gap-1 sm:min-h-[180px]'>
                  {d.blocks.map((b, i) => {
                    if (b.title)
                      return (
                        <p
                          key={i}
                          className='text-[15px] font-extrabold uppercase'
                        >
                          {b.title}
                        </p>
                      )
                    if (b.subtitle)
                      return (
                        <p key={i} className='text-sm'>
                          {b.subtitle}
                        </p>
                      )
                    if (b.times)
                      return (
                        <p key={i} className='text-sm'>
                          {b.times}
                        </p>
                      )
                    if (b.note)
                      return (
                        <p
                          key={i}
                          className='mt-1 max-w-[18ch] text-[13px] font-extrabold uppercase'
                        >
                          {b.note}
                        </p>
                      )
                    return null
                  })}
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Bottom content: 2 columns */}
        <div className='mt-8 grid grid-cols-1 gap-8 lg:mt-10 lg:grid-cols-12'>
          {/* Left: lay day + notes + buttons */}
          <div className='space-y-4 text-sm leading-relaxed text-slate-800/90 sm:text-base lg:col-span-7'>
            <div>
              <h3 className='mb-1 text-lg font-extrabold uppercase tracking-wide text-sky-700 sm:text-xl'>
                {t('layday.title')}
              </h3>
              <p>{t('layday.text')}</p>
            </div>

            <div>
              <h4 className='mb-1 text-[15px] font-extrabold uppercase tracking-wide text-sky-700 sm:text-base'>
                {t('checkout.label')}
              </h4>
              <p>{t('checkout.text')}</p>
            </div>

            <div>
              <h4 className='mb-1 text-[15px] font-extrabold uppercase tracking-wide text-sky-700 sm:text-base'>
                {t('attention.label')}
              </h4>
              <p>{t('attention.text')}</p>
            </div>

            {/* Download + Contact buttons (always stacked) */}
            <div className='flex flex-col items-start gap-3 pt-2'>
              <a
                href={PROGRAM_PDF}
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center rounded-full bg-sky-600 px-5 py-2 text-sm font-bold text-white shadow-lg ring-1 ring-black/10 hover:bg-sky-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 sm:text-base'
              >
                {t('downloadPdf')}
              </a>

              <a
                href='/contact'
                className='inline-flex items-center rounded-full bg-white/90 px-5 py-2 text-sm font-bold text-sky-700 shadow-sm ring-1 ring-sky-600/40 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 sm:text-base'
              >
                {t('ctaContact')}
              </a>
            </div>
          </div>

          {/* Right: players image — taller & reaching the boxes */}
          <div className='relative lg:col-span-5'>
            <div
              className='
                relative z-20 mx-auto -mt-4 h-[360px] w-full overflow-visible
                [-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_68%,transparent_100%)]
                [mask-image:linear-gradient(to_bottom,black_0%,black_68%,transparent_100%)]
                sm:-mt-6 sm:h-[420px] lg:-mt-10 lg:h-[560px] xl:h-[640px]
              '
            >
              <Image
                src={PLAYERS}
                alt={t('playersAlt')}
                fill
                className='object-contain object-bottom'
                sizes='(max-width: 1024px) 90vw, 700px'
              />
            </div>
          </div>
        </div>
      </div>

      {/* Wave + right-aligned stats (nudge down) */}
      <div className='pointer-events-none absolute bottom-0 left-1/2 w-screen -translate-x-1/2'>
        <div className='relative hidden lg:block'>
          {/* Wave background BELOW players */}
          <Image
            src={WAVE}
            alt=''
            width={2048}
            height={WAVE_H}
            className='z-10 -mb-px block h-auto w-full'
            sizes='100vw'
          />
          {/* Stats ABOVE players & wave */}
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

        {/* Mobile wave (stretched) */}
        <div
          className='relative block overflow-hidden bg-center bg-no-repeat [background-size:100%_100%] lg:hidden'
          style={{ backgroundImage: `url(${WAVE})`, height: `${WAVE_H}px` }}
        />
      </div>
    </section>
  )
}
