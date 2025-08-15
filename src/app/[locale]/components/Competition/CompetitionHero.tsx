'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { MouseEvent } from 'react'

// Constants for better maintainability
const ASSETS = {
  BG: '/img/competition/hero-bg.png',
  PHONE: '/img/global/hand-phone.png',
  MOSAIC: '/img/competition/mosaic.png',
  MOSAIC_MOBILE: '/img/competition/mosaic-2.png'
} as const

const PHONE_DIMENSIONS = {
  mobile: { width: 200, height: 256 },
  tablet: { width: 230, height: 288 },
  desktop: { width: 260, height: 300 },
  large: { width: 280, height: 320 },
  xl: { width: 300, height: 340 }
} as const

export default function CompetitionHero() {
  const t = useTranslations('CompetitionPage.Hero')

  const handleScrollToRegulations = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const regulationsSection = document.getElementById('regulations')

    if (!regulationsSection) {
      // Fallback if section doesn't exist
      window.location.hash = '#regulations'
      return
    }

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    regulationsSection.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'start'
    })
  }

  return (
    <section
      className='relative w-full overflow-hidden'
      aria-labelledby='competition-hero-title'
    >
      {/* Background with loading optimization */}
      <div className='absolute inset-0 -z-10'>
        <Image
          src={ASSETS.BG}
          alt=''
          fill
          priority
          className='object-cover'
          sizes='100vw'
          quality={85}
          placeholder='blur'
          blurDataURL='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkbHB0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=='
          draggable={false}
        />
      </div>

      {/* Main Content Container */}
      <div className='relative z-10 mx-auto max-w-screen-xl px-4 py-10 sm:py-12 lg:py-16'>
        <div className='grid grid-cols-1 items-center gap-8 md:grid-cols-12 md:gap-10'>
          {/* Phone Image Section */}
          <div className='md:col-span-5'>
            <div className='phone-container relative -ml-4 sm:-ml-6 md:-ml-14 lg:-ml-[8vw] xl:-ml-[9vw] 2xl:-ml-[10vw]'>
              <Image
                src={ASSETS.PHONE}
                alt={
                  t('phoneAlt') ||
                  "Mobile app preview showing the competition interface in someone's hand"
                }
                width={PHONE_DIMENSIONS.xl.width}
                height={PHONE_DIMENSIONS.xl.height}
                className='h-auto w-auto max-w-none object-contain object-left drop-shadow-2xl transition-transform duration-300 hover:scale-105'
                sizes='(max-width: 640px) 200px, (max-width: 768px) 230px, (max-width: 1024px) 260px, (max-width: 1280px) 280px, 300px'
                priority
                quality={90}
                draggable={false}
              />
            </div>
          </div>

          {/* Text Content Section */}
          <div className='md:col-span-7'>
            <header>
              <h1
                id='competition-hero-title'
                className='text-2xl font-extrabold uppercase tracking-wide text-sky-500 sm:text-3xl lg:text-4xl'
              >
                {t('title') || 'A Competição'}
              </h1>
            </header>

            <div className='prose prose-slate mt-6 max-w-none'>
              <div className='space-y-4 text-sm leading-relaxed text-slate-700 sm:text-base lg:text-lg'>
                {t('p1') && <p>{t('p1')}</p>}
                {t('p2') && <p>{t('p2')}</p>}
                {t('p3') && <p>{t('p3')}</p>}
              </div>
            </div>

            <div className='mt-8'>
              <button
                onClick={handleScrollToRegulations}
                className='group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-600 to-sky-700 px-6 py-3 font-bold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:from-sky-700 hover:to-sky-800 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-2'
                aria-describedby='cta-description'
              >
                <span>{t('cta') || 'Regulamento'}</span>
                <svg
                  className='h-4 w-4 transition-transform group-hover:translate-x-1'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  aria-hidden='true'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M19 14l-7 7m0 0l-7-7m7 7V3'
                  />
                </svg>
              </button>
              <span id='cta-description' className='sr-only'>
                {t('ctaDescription') ||
                  'Scroll to view detailed competition rules and regulations'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Mosaic Section with Responsive Images */}
      <MosaicStrip
        desktopSrc={ASSETS.MOSAIC}
        mobileSrc={ASSETS.MOSAIC_MOBILE}
        alt={
          t('mosaicAlt') ||
          'Photo mosaic showcasing competition highlights and participants'
        }
      />
    </section>
  )
}

// Extracted Mosaic component for better organization
function MosaicStrip({
  desktopSrc,
  mobileSrc,
  alt
}: {
  desktopSrc: string
  mobileSrc: string
  alt: string
}) {
  return (
    <>
      {/* Desktop/Tablet Mosaic */}
      <div className='mx-auto hidden w-full max-w-screen-2xl md:block'>
        <div className='relative h-[180px] w-full overflow-hidden lg:h-[220px]'>
          <Image
            src={desktopSrc}
            alt={alt}
            fill
            className='object-cover transition-opacity duration-300'
            sizes='100vw'
            quality={80}
            loading='lazy'
            draggable={false}
          />
        </div>
      </div>

      {/* Mobile Mosaic */}
      <div className='mx-auto block w-full max-w-screen-2xl md:hidden'>
        <div className='relative h-[140px] w-full overflow-hidden sm:h-[160px]'>
          <Image
            src={mobileSrc}
            alt={alt}
            fill
            className='object-cover transition-opacity duration-300'
            sizes='100vw'
            quality={80}
            loading='lazy'
            draggable={false}
          />
        </div>
      </div>
    </>
  )
}
