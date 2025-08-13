'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'

export default function AboutPortugal() {
  const t = useTranslations('AboutPage.AboutPortugal')

  // 4 feature cards (Portugal, Cabo da Roca, Boca do Inferno, Sec XVII/XIX)
  const spots = [
    {
      key: 'portugal',
      img: '/img/about/portugal.png', // Torre de Belém (example)
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

  return (
    <section className='relative w-full overflow-x-hidden'>
      {/* Background image (soft) */}
      <div className='absolute inset-0 -z-10'>
        <Image
          src='/img/about/portugal-bg.png' // your scenic background asset
          alt=''
          fill
          className='object-cover'
          sizes='100vw'
          priority
        />
      </div>

      {/* Content container */}
      <div className='mx-auto max-w-screen-2xl px-4 py-10 sm:py-12 lg:px-8 lg:py-16'>
        {/* Title + intro + logo/tagline on the right */}
        <div className='relative grid grid-cols-1 gap-8 md:grid-cols-[1.1fr_0.9fr]'>
          {/* LEFT: Title & paragraphs */}
          <div className='space-y-6'>
            <h2 className='text-2xl font-extrabold uppercase text-sky-700 sm:text-3xl md:text-4xl'>
              {t('title')}
            </h2>

            <p className='text-slate-700'>{t('p1')}</p>
            <p className='text-slate-700'>{t('p2')}</p>
            <p className='text-slate-700'>{t('p3')}</p>
            <p className='text-slate-700'>{t('p4')}</p>
          </div>

          {/* RIGHT: Logo + tagline (desktop) */}
          <div className='relative hidden items-start justify-end md:flex'>
            <div className='flex flex-col items-end gap-4'>
              <Image
                src='/img/global/LOGO-2-CVCUP2026.png' // tournament logo
                alt={t('logoAlt')}
                width={260}
                height={180}
                className='h-auto w-[220px] object-contain lg:w-[260px]'
                priority
              />
              <Image
                src='/img/global/tagline.png'
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
                <h3 className='text-base font-extrabold uppercase text-sky-700'>
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

      {/* Bottom wave ribbon with stats */}
      <div className='relative'>
        <div className='pointer-events-none absolute inset-x-0 -top-6'>
          <Image
            src='/img/global/ondas-3.png'
            alt=''
            width={2048}
            height={135}
            className='h-auto w-full object-cover'
            priority
            sizes='100vw'
          />
        </div>

        <div className='mx-auto max-w-screen-2xl px-4 pb-8 pt-16 text-white lg:px-8'>
          <ul className='flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm font-semibold sm:text-base'>
            <li className='flex items-center gap-2'>
              <span className='inline-block rounded-full bg-white/20 px-3 py-1'>
                {t('stats.teams')}
              </span>
            </li>
            <li className='flex items-center gap-2'>
              <span className='inline-block rounded-full bg-white/20 px-3 py-1'>
                {t('stats.athletes')}
              </span>
            </li>
            <li className='flex items-center gap-2'>
              <span className='inline-block rounded-full bg-white/20 px-3 py-1'>
                {t('stats.countries')}
              </span>
            </li>
            <li className='flex items-center gap-2'>
              <span className='inline-block rounded-full bg-white/20 px-3 py-1'>
                {t('stats.matches')}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
