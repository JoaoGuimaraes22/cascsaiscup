'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { useEffect, useRef, useState } from 'react'
import { FiExternalLink, FiArrowRight } from 'react-icons/fi'
import clsx from 'clsx'

// Types
interface SponsorLogo {
  src: string
  alt: string
  w: number
  h: number
  id: string
}

interface ClubInfo {
  src: string
  alt: string
  w: number
  h: number
  url: string
}

export default function AboutHero() {
  const t = useTranslations('AboutPage.Hero')
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  // Constants for better maintainability
  const ASSETS = {
    background: '/img/about/about-bg.png',
    hero: '/img/about/about-hero.png',
    wave: '/img/global/ondas-3.png',
    club: '/img/sponsors/volley4all.png'
  } as const

  const SPONSOR_LOGOS: SponsorLogo[] = [
    {
      id: 'cascais-estoril',
      src: '/img/sponsors/cascais-estoril.png',
      alt: t('sponsors.cascaisEstorilAlt'),
      w: 140,
      h: 56
    },
    {
      id: 'camara',
      src: '/img/sponsors/cascais-camara.png',
      alt: t('sponsors.camaraAlt'),
      w: 160,
      h: 56
    },
    {
      id: 'cam-ford',
      src: '/img/sponsors/cam-ford.png',
      alt: t('sponsors.camFordAlt'),
      w: 150,
      h: 56
    }
  ]

  const CLUB_INFO: ClubInfo = {
    src: ASSETS.club,
    alt: t('club.logoAlt'),
    w: 260,
    h: 70,
    url: 'https://volley4all.com'
  }

  const PARAGRAPHS = ['p1', 'p2', 'p3', 'p4'] as const

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

  const handleCtaClick = () => {
    // Handle CTA click if needed
  }

  return (
    <section
      ref={sectionRef}
      className='relative min-h-[calc(100vh-1px)] w-full overflow-x-hidden md:h-[calc(100vh-80px)] md:overflow-hidden lg:pb-[135px]'
      aria-labelledby='about-hero-title'
    >
      {/* Enhanced Background with Loading State */}
      <div className='absolute inset-0 z-0'>
        <div className='absolute inset-0 bg-gradient-to-br from-slate-50 to-slate-100' />
        <Image
          src={ASSETS.background}
          alt=''
          role='presentation'
          fill
          className={clsx(
            'object-cover transition-opacity duration-700',
            imageLoaded ? 'opacity-100' : 'opacity-0'
          )}
          sizes='100vw'
          priority
          onLoad={() => setImageLoaded(true)}
        />
      </div>

      {/* Right Hero Image Panel */}
      <div className='absolute inset-y-0 right-0 z-0 hidden w-[34vw] md:block'>
        <div className='absolute inset-0 bg-gradient-to-l from-transparent to-white/20' />
        <Image
          src={ASSETS.hero}
          alt={
            t('heroImageAlt') ||
            'Volleyball players in action at Cascais tournament'
          }
          fill
          className='object-cover object-top'
          sizes='(max-width: 768px) 0px, 34vw'
          priority
        />
      </div>

      {/* Main Content Container */}
      <div className='relative z-10 mx-auto h-full max-w-screen-xl px-4 pb-8 pt-20 md:pb-20 md:pr-[34vw]'>
        <div className='space-y-6'>
          {/* Animated Title */}
          <div
            className={clsx(
              'transition-all duration-1000 ease-out',
              isVisible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-8 opacity-0'
            )}
          >
            <h1
              id='about-hero-title'
              className='text-3xl font-extrabold uppercase text-sky-500 md:text-4xl lg:text-5xl'
            >
              {t('title')}
            </h1>
          </div>

          {/* Animated Paragraphs with Staggered Delays */}
          <div className='space-y-4'>
            {PARAGRAPHS.map((key, index) => (
              <div
                key={key}
                className={clsx(
                  'transition-all duration-700 ease-out',
                  isVisible
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-8 opacity-0'
                )}
                style={{
                  transitionDelay: `${(index + 1) * 200}ms`
                }}
              >
                <p className='max-w-prose text-sm leading-relaxed text-slate-700 sm:text-base lg:text-lg'>
                  {t(key)}
                </p>
              </div>
            ))}
          </div>

          {/* Mobile Layout: 2x2 Grid + CTA */}
          <div className='md:hidden'>
            <div
              className={clsx(
                'mx-auto w-full max-w-[360px] transition-all duration-1000 ease-out',
                isVisible
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-8 opacity-0'
              )}
              style={{ transitionDelay: '1000ms' }}
            >
              <div className='grid grid-cols-2 gap-4'>
                {[...SPONSOR_LOGOS, CLUB_INFO].map((item, index) => (
                  <LogoCard
                    key={'id' in item ? item.id : 'club'}
                    logo={item}
                    index={index}
                    mobile
                  />
                ))}
              </div>

              <CtaButton
                href={CLUB_INFO.url}
                onClick={handleCtaClick}
                className='mt-6 block w-full'
                mobile
              >
                {t('cta')}
              </CtaButton>
            </div>
          </div>

          {/* Desktop Layout: Row + CTA */}
          <div className='hidden md:block'>
            <div
              className={clsx(
                'transition-all duration-1000 ease-out',
                isVisible
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-8 opacity-0'
              )}
              style={{ transitionDelay: '1000ms' }}
            >
              <div className='flex flex-wrap items-center justify-center gap-8 lg:justify-start'>
                {SPONSOR_LOGOS.map((logo, index) => (
                  <LogoCard key={logo.id} logo={logo} index={index} />
                ))}
                <LogoCard
                  logo={CLUB_INFO}
                  index={SPONSOR_LOGOS.length}
                  featured
                />
              </div>

              <CtaButton
                href={CLUB_INFO.url}
                onClick={handleCtaClick}
                className='mt-6 inline-flex'
              >
                {t('cta')}
              </CtaButton>
            </div>
          </div>
        </div>

        {/* Mobile Hero Banner */}
        <div
          className={clsx(
            'relative mt-8 block h-56 w-full overflow-hidden rounded-lg shadow-xl md:hidden',
            'transition-all duration-1000 ease-out',
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          )}
          style={{ transitionDelay: '1400ms' }}
        >
          <Image
            src={ASSETS.hero}
            alt={
              t('heroImageAlt') ||
              'Volleyball players in action at Cascais tournament'
            }
            fill
            className='object-cover object-top'
            sizes='100vw'
          />
          <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent' />
        </div>
      </div>

      {/* Bottom Wave (Desktop Only) */}
      <div className='pointer-events-none absolute bottom-0 left-1/2 z-0 hidden w-screen -translate-x-1/2 lg:block'>
        <Image
          src={ASSETS.wave}
          alt=''
          role='presentation'
          width={2048}
          height={135}
          className='-mb-px block h-[135px] w-full object-cover'
          sizes='100vw'
        />
      </div>
    </section>
  )
}

/* -------- Enhanced Sub-Components -------- */

interface LogoCardProps {
  logo: SponsorLogo | ClubInfo
  index: number
  mobile?: boolean
  featured?: boolean
}

function LogoCard({
  logo,
  index,
  mobile = false,
  featured = false
}: LogoCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <div
      className={clsx(
        'group flex items-center justify-center transition-all duration-300',
        mobile ? 'min-h-[80px]' : 'min-h-[100px]'
      )}
      style={{
        animationDelay: `${index * 100}ms`
      }}
    >
      {/* Loading placeholder */}
      {!imageLoaded && (
        <div className='absolute inset-0 animate-pulse rounded-lg bg-slate-200/30' />
      )}

      <Image
        src={logo.src}
        alt={logo.alt}
        width={logo.w}
        height={logo.h}
        className={clsx(
          'w-auto object-contain transition-all duration-300 group-hover:scale-105',
          mobile ? 'h-12' : 'h-14 lg:h-16',
          imageLoaded ? 'opacity-100' : 'opacity-0'
        )}
        loading='lazy'
        decoding='async'
        sizes={
          mobile
            ? '(max-width: 640px) 45vw, 160px'
            : '(max-width: 1024px) 160px, 200px'
        }
        onLoad={() => setImageLoaded(true)}
      />
    </div>
  )
}

interface CtaButtonProps {
  href: string
  onClick: () => void
  className?: string
  children: React.ReactNode
  mobile?: boolean
}

function CtaButton({
  href,
  onClick,
  className,
  children,
  mobile = false
}: CtaButtonProps) {
  return (
    <a
      href={href}
      target='_blank'
      rel='noopener noreferrer'
      onClick={onClick}
      className={clsx(
        'group relative overflow-hidden rounded-lg font-bold text-white shadow-lg ring-1 ring-black/10 transition-all duration-300',
        'bg-gradient-to-r from-sky-600 to-sky-700',
        'hover:scale-105 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300',
        mobile
          ? 'px-6 py-3 text-center text-base'
          : 'items-center gap-2 px-6 py-3 text-sm lg:text-base',
        className
      )}
    >
      <span className='relative z-10 flex items-center justify-center gap-2'>
        {children}
        {mobile ? (
          <FiExternalLink className='h-4 w-4' />
        ) : (
          <FiArrowRight className='h-4 w-4 transition-transform duration-300 group-hover:translate-x-1' />
        )}
      </span>

      {/* Shimmer effect */}
      <div className='absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full' />
    </a>
  )
}

// Extend global Window interface for gtag
declare global {
  interface Window {
    gtag?: (...args: any[]) => void
  }
}
