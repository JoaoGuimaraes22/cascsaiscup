'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

export default function AboutVilla() {
  const t = useTranslations('AboutPage.AboutVilla')

  // Correct paths
  const BG = '/img/about/villa-bg.png'
  const WAVE = '/img/global/ondas-6.png'
  const TAGLINE = '/img/global/tagline.png'
  const LOGO = '/img/global/cascais-volley-cup-1-w.png'
  const SPONSOR = '/img/sponsors/cascais-camara-w.png'

  return (
    <section className='relative min-h-[640px] w-full overflow-hidden'>
      {/* Background */}
      <Image
        src={BG}
        alt=''
        fill
        priority
        className='absolute inset-0 -z-10 object-cover'
        sizes='100vw'
      />

      {/* Tagline */}
      <div className='mx-auto max-w-screen-xl px-4 pt-4 sm:pt-6'>
        <div className='flex justify-center sm:justify-end'>
          <Image
            src={TAGLINE}
            alt={t('taglineAlt')}
            width={520}
            height={220}
            priority
            className='h-auto w-[200px] object-contain drop-shadow sm:w-[340px] lg:w-[520px]'
            sizes='(max-width: 640px) 200px, (max-width: 1024px) 340px, 520px'
          />
        </div>
      </div>

      {/* Wave band */}
      <div className='relative left-1/2 mt-4 w-screen -translate-x-1/2 sm:mt-6'>
        {/* Mobile/Tablet: allow the band to grow with text (cover) */}
        <div className='relative block lg:hidden'>
          <Image
            src={WAVE}
            alt=''
            fill
            priority
            className='absolute inset-0 -z-10 h-full w-full object-cover'
            sizes='100vw'
          />
          <div className='mx-auto max-w-screen-xl px-4 py-6 sm:py-8 md:py-10'>
            <h2 className='mb-3 text-2xl font-extrabold uppercase tracking-wide text-white drop-shadow sm:text-3xl'>
              {t('title')}
            </h2>
            <div className='space-y-4 text-[15px] leading-relaxed text-white/95 drop-shadow sm:text-base'>
              <p>{t('p1')}</p>
              <p>{t('p2')}</p>
              <p>{t('p3')}</p>
              <p>{t('p4')}</p>
            </div>
          </div>
        </div>

        {/* Desktop: preserve full wave shape (no trimming) */}
        <div className='relative hidden lg:block'>
          {/* Render at intrinsic aspect ratio so it's never cropped */}
          <Image
            src={WAVE}
            alt=''
            width={2048}
            height={380}
            priority
            className='block h-auto w-full'
            sizes='100vw'
          />
          {/* Overlay copy centered within the wave area */}
          <div className='absolute inset-0 flex items-center'>
            <div className='mx-auto max-w-screen-xl px-4 py-8'>
              <h2 className='mb-3 text-3xl font-extrabold uppercase tracking-wide text-white drop-shadow'>
                {t('title')}
              </h2>
              <div className='space-y-4 text-base leading-relaxed text-white/95 drop-shadow'>
                <p>{t('p1')}</p>
                <p>{t('p2')}</p>
                <p>{t('p3')}</p>
                <p>{t('p4')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <div className='mx-auto max-w-screen-xl px-4 py-5 sm:py-7'>
        <div className='flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center sm:gap-5'>
          <Image
            src={LOGO}
            alt={t('eventLogoAlt')}
            width={260}
            height={80}
            priority
            className='h-auto w-[160px] object-contain drop-shadow sm:w-[220px] lg:w-[260px]'
            sizes='(max-width: 640px) 160px, (max-width: 1024px) 220px, 260px'
          />
          <div className='flex w-full items-center justify-between gap-4 sm:w-auto sm:justify-end sm:gap-5'>
            <Image
              src={SPONSOR}
              alt={t('sponsorAlt')}
              width={240}
              height={80}
              priority
              className='h-auto w-[150px] object-contain drop-shadow sm:w-[200px] lg:w-[240px]'
              sizes='(max-width: 640px) 150px, (max-width: 1024px) 200px, 240px'
            />
            <Link
              href='https://www.visitcascais.com/en'
              className='inline-flex shrink-0 items-center rounded-full bg-sky-600 px-4 py-2 text-sm font-bold text-white shadow-lg ring-1 ring-black/10 hover:bg-sky-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 sm:text-base'
            >
              {t('cta')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
