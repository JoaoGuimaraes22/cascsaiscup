'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

export default function AccomodationFood() {
  const t = useTranslations('AccommodationPage.Food')

  // Assets (same BG as hero)
  const BG = '/img/accommodation/hero-bg.png'
  const TAGLINE = '/img/global/tagline.png'
  const LOGO = '/img/global/cascais-volley-cup-1.png'

  return (
    <section className='relative w-full overflow-hidden'>
      {/* Background */}
      <Image
        src={BG}
        alt=''
        fill
        className='absolute inset-0 -z-10 object-cover'
        sizes='100vw'
        decoding='async'
        draggable={false}
      />

      <div className='mx-auto max-w-screen-xl px-4 py-8 sm:py-12'>
        <div className='grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10'>
          {/* LEFT: text + buttons (no background) */}
          <div className='lg:col-span-7 xl:col-span-8'>
            <h2 className='mb-3 text-xl font-extrabold uppercase tracking-wide text-sky-700 sm:text-2xl'>
              {t('title')}
            </h2>

            <p className='mb-4 text-sm leading-relaxed text-slate-800/90 sm:text-base'>
              {t('p1')}
            </p>

            <p className='mb-2 text-sm font-semibold text-slate-900 sm:text-base'>
              {t('scheduleTitle')}
            </p>
            <ul className='mb-4 list-disc pl-5 text-sm leading-relaxed text-slate-800/90 sm:text-base'>
              <li>{t('breakfast')}</li>
              <li>{t('lunch')}</li>
              <li>{t('dinner')}</li>
            </ul>

            <p className='text-sm leading-relaxed text-slate-800/90 sm:text-base'>
              {t('intolerances')}
            </p>

            {/* Buttons */}
            <div className='mt-5 flex flex-wrap items-center gap-3'>
              <Link
                href='/contact'
                className='inline-flex items-center rounded-full bg-sky-600 px-5 py-2 text-sm font-bold text-white shadow-lg ring-1 ring-black/10 hover:bg-sky-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 sm:text-base'
              >
                {t('ctaContact')}
              </Link>
              <Link
                href='/accommodation/info'
                className='inline-flex items-center rounded-full bg-white/90 px-5 py-2 text-sm font-bold text-sky-700 shadow-sm ring-1 ring-sky-600/40 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 sm:text-base'
              >
                {t('ctaMoreInfo')}
              </Link>
            </div>
          </div>

          {/* RIGHT: tagline + logo (smaller, same width) */}
          <div className='relative mt-6 lg:col-span-5 lg:mt-0 xl:col-span-4'>
            <div className='flex h-full flex-col items-center justify-center gap-6 lg:items-end lg:justify-between lg:gap-0'>
              {/* Shared width for both images */}
              <div className='w-[160px] sm:w-[240px] lg:w-[300px] xl:w-[360px]'>
                <Image
                  src={TAGLINE}
                  alt={t('taglineAlt')}
                  width={360}
                  height={160}
                  className='h-auto w-full object-contain'
                  sizes='(max-width: 640px) 160px, (max-width: 1024px) 240px, (max-width: 1280px) 300px, 360px'
                  decoding='async'
                  draggable={false}
                />
              </div>

              <div className='w-[160px] sm:w-[240px] lg:w-[300px] xl:w-[360px]'>
                <Image
                  src={LOGO}
                  alt={t('logoAlt')}
                  width={360}
                  height={110}
                  className='h-auto w-full object-contain opacity-95'
                  sizes='(max-width: 640px) 160px, (max-width: 1024px) 240px, (max-width: 1280px) 300px, 360px'
                  decoding='async'
                  draggable={false}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
