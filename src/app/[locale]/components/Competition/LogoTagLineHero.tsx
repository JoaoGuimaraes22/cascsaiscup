'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'

// Constants for better maintainability and type safety
const ASSETS = {
  BG: '/img/competition/hero-bg.png',
  WAVE: '/img/global/ondas-9.png',
  LOGO: '/img/global/cascais-volley-cup-1-w.png',
  TAGLINE: '/img/global/tagline-w.png'
} as const

const LOGO_DIMENSIONS = {
  width: 420,
  height: 160
} as const

const TAGLINE_DIMENSIONS = {
  width: 400,
  height: 140
} as const

const WAVE_DIMENSIONS = {
  width: 2048,
  height: 150
} as const

export default function LogoTaglineHero() {
  const t = useTranslations('CompetitionPage.LogoTaglineHero')

  return (
    <section
      aria-label={
        t('sectionLabel') ||
        'Cascais Volley Cup event banner with logo and tagline'
      }
      className='relative w-full overflow-hidden bg-slate-50'
      role='banner'
    >
      {/* Background Layer with optimized loading */}
      <BackgroundImage />

      {/* Wave Content Container */}
      <WaveContainer>
        <BrandContent
          logoAlt={t('logoAlt') || 'Cascais Volley Cup official logo'}
          taglineAlt={t('taglineAlt') || 'Tournament tagline and subtitle'}
        />
      </WaveContainer>
    </section>
  )
}

// Extracted Background component for cleaner organization
function BackgroundImage() {
  return (
    <div className='absolute inset-0 -z-10'>
      <Image
        src={ASSETS.BG}
        alt=''
        fill
        className='object-cover opacity-95'
        sizes='100vw'
        quality={75}
        placeholder='blur'
        blurDataURL='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkbHB0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=='
        priority={false}
        loading='lazy'
        draggable={false}
        aria-hidden='true'
      />
    </div>
  )
}

// Wave container with responsive handling
function WaveContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className='relative py-3 sm:py-4'>
      {/* Wave Background with improved responsive behavior */}
      <div className='relative overflow-hidden'>
        <Image
          src={ASSETS.WAVE}
          alt=''
          width={WAVE_DIMENSIONS.width}
          height={WAVE_DIMENSIONS.height}
          className='block h-[180px] w-full object-cover sm:h-[150px] lg:h-auto lg:object-contain'
          sizes='100vw'
          quality={85}
          loading='eager'
          draggable={false}
          aria-hidden='true'
        />

        {/* Overlay Content */}
        <div className='absolute inset-0 flex items-center justify-center'>
          <div className='mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8'>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

// Brand content with improved layout and accessibility
function BrandContent({
  logoAlt,
  taglineAlt
}: {
  logoAlt: string
  taglineAlt: string
}) {
  return (
    <div className='flex h-full flex-col items-center justify-center gap-4 sm:flex-row sm:justify-between sm:gap-8'>
      {/* Logo Section */}
      <div className='flex-shrink-0'>
        <Image
          src={ASSETS.LOGO}
          alt={logoAlt}
          width={LOGO_DIMENSIONS.width}
          height={LOGO_DIMENSIONS.height}
          className='h-auto w-[180px] transition-transform duration-300 hover:scale-105 sm:w-[260px] lg:w-[320px] xl:w-[340px]'
          sizes='(max-width: 640px) 180px, (max-width: 1024px) 260px, (max-width: 1280px) 320px, 340px'
          quality={75}
          loading='eager'
          draggable={false}
          priority
        />
      </div>

      {/* Tagline Section - Enhanced responsive visibility */}
      <div className='hidden flex-shrink-0 sm:block'>
        <Image
          src={ASSETS.TAGLINE}
          alt={taglineAlt}
          width={TAGLINE_DIMENSIONS.width}
          height={TAGLINE_DIMENSIONS.height}
          className='h-auto w-[240px] transition-transform duration-300 hover:scale-105 sm:w-[280px] md:w-[300px] lg:w-[330px] xl:w-[360px]'
          sizes='(max-width: 1024px) 280px, (max-width: 1280px) 330px, 360px'
          quality={75}
          loading='eager'
          draggable={false}
        />
      </div>

      {/* Mobile-only tagline fallback (if needed) */}
      <div className='block text-center sm:hidden'>
        <p className='text-sm font-medium text-white/90 drop-shadow-md'>
          {/* You could add a text fallback here if the tagline image is critical for mobile */}
        </p>
      </div>
    </div>
  )
}
