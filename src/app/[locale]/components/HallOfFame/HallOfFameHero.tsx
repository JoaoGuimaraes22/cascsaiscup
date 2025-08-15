'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { MouseEvent, useEffect, useRef, useState } from 'react'
import { FiArrowDown, FiUsers, FiAward } from 'react-icons/fi'
import clsx from 'clsx'

// Assets constant for better maintainability
const ASSETS = {
  background: '/img/hall-of-fame/hero-bg.png',
  heroImage: '/img/hall-of-fame/players.png',
  wave: '/img/global/ondas-10.png',
  logo: '/img/global/cascais-volley-cup-1-w.png',
  mvpLogo: '/img/hall-of-fame/mvp-logo.png'
} as const

const WAVE_HEIGHT = 150

// Custom hook for intersection observer with staggered animations
function useStaggeredAnimation(threshold = 0.1) {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold, rootMargin: '100px' }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [threshold])

  return { isVisible, sectionRef }
}

// Enhanced CTA button with animations
interface CTAButtonProps {
  onClick: (e: MouseEvent<HTMLAnchorElement>) => void
  children: React.ReactNode
  isVisible: boolean
}

function CTAButton({ onClick, children, isVisible }: CTAButtonProps) {
  return (
    <a
      href='#hall-of-fame-teams'
      onClick={onClick}
      className={clsx(
        'group relative mt-6 inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-sky-700 to-sky-800 px-6 py-3 text-sm font-bold text-white shadow-xl ring-1 ring-black/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-2 sm:text-base',
        'transition-all delay-700 duration-700 ease-out',
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
      )}
    >
      <span className='relative z-10 flex items-center gap-2'>
        <FiUsers className='h-4 w-4' />
        {children}
        <FiArrowDown className='h-4 w-4 transition-transform duration-300 group-hover:translate-y-1' />
      </span>
      {/* Shimmer effect */}
      <div className='absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full' />
    </a>
  )
}

// Enhanced hero image component with parallax effect
interface HeroImageProps {
  src: string
  alt: string
  isVisible: boolean
}

function HeroImage({ src, alt, isVisible }: HeroImageProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!imageRef.current) return

      const rect = imageRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      setMousePosition({
        x: (e.clientX - centerX) * 0.02,
        y: (e.clientY - centerY) * 0.02
      })
    }

    const handleMouseLeave = () => {
      setMousePosition({ x: 0, y: 0 })
    }

    const element = imageRef.current
    if (element) {
      element.addEventListener('mousemove', handleMouseMove as any)
      element.addEventListener('mouseleave', handleMouseLeave)
    }

    return () => {
      if (element) {
        element.removeEventListener('mousemove', handleMouseMove as any)
        element.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [])

  return (
    <div className='relative lg:col-span-5'>
      <div
        ref={imageRef}
        className={clsx(
          'group relative z-10 mx-auto -mt-2 h-[320px] w-full cursor-pointer overflow-visible transition-all duration-1000 ease-out sm:-mt-4 sm:h-[380px] lg:-mt-6 lg:h-[460px] xl:h-[520px]',
          '[-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_70%,transparent_100%)]',
          '[mask-image:linear-gradient(to_bottom,black_0%,black_70%,transparent_100%)]',
          'delay-500',
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        )}
        style={{
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes='(max-width: 1024px) 90vw, 700px'
          className='object-contain object-bottom transition-transform duration-500 group-hover:scale-105'
          priority
        />

        {/* Subtle glow effect on hover */}
        <div className='absolute inset-0 bg-gradient-to-t from-sky-100/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100' />
      </div>

      {/* Floating achievement badge */}
      <div
        className={clsx(
          'absolute right-4 top-8 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 p-3 shadow-xl ring-4 ring-white/20 transition-all duration-700 ease-out lg:right-8',
          'delay-800',
          isVisible
            ? 'translate-y-0 rotate-0 opacity-100'
            : 'translate-y-4 -rotate-12 opacity-0'
        )}
      >
        <FiAward className='h-5 w-5 text-white drop-shadow-sm' />
      </div>
    </div>
  )
}

// Enhanced wave section with logos
interface WaveSectionProps {
  logoAlt: string
  mvpAlt: string
  isVisible: boolean
}

function WaveSection({ logoAlt, mvpAlt, isVisible }: WaveSectionProps) {
  return (
    <div className='pointer-events-none absolute bottom-0 left-1/2 w-screen -translate-x-1/2'>
      {/* Desktop */}
      <div className='relative hidden lg:block'>
        <div
          className={clsx(
            'transition-all duration-1000 ease-out',
            'delay-900',
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          )}
        >
          <Image
            src={ASSETS.wave}
            alt=''
            role='presentation'
            width={2048}
            height={WAVE_HEIGHT}
            className='z-10 -mb-px block h-auto w-full'
            sizes='100vw'
          />
        </div>

        <div className='pointer-events-none absolute inset-0 z-30'>
          <div className='mx-auto flex h-full max-w-screen-xl items-center justify-between px-4'>
            {/* Logo left with staggered animation */}
            <div
              className={clsx(
                'transition-all duration-700 ease-out',
                'delay-1000',
                isVisible
                  ? 'translate-x-0 opacity-100'
                  : '-translate-x-8 opacity-0'
              )}
            >
              <Image
                src={ASSETS.logo}
                alt={logoAlt}
                width={240}
                height={96}
                className='h-[60px] w-auto transition-transform duration-300 hover:scale-110 sm:h-[68px]'
              />
            </div>

            {/* MVP logo right with staggered animation */}
            <div
              className={clsx(
                'transition-all duration-700 ease-out',
                'delay-1100',
                isVisible
                  ? 'translate-x-0 opacity-100'
                  : 'translate-x-8 opacity-0'
              )}
            >
              <Image
                src={ASSETS.mvpLogo}
                alt={mvpAlt}
                width={280}
                height={90}
                className='h-[54px] w-auto transition-transform duration-300 hover:scale-110 sm:h-[64px]'
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: wave as background with the two images inside */}
      <div
        className={clsx(
          'relative block transition-all duration-1000 ease-out lg:hidden',
          'delay-900',
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        )}
        style={{
          backgroundImage: `url(${ASSETS.wave})`,
          backgroundSize: '100% 100%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          height: `${WAVE_HEIGHT}px`
        }}
      >
        <div className='pointer-events-none absolute inset-0 z-10 flex items-center justify-between px-4'>
          <div
            className={clsx(
              'transition-all duration-500 ease-out',
              'delay-1000',
              isVisible
                ? 'translate-x-0 opacity-100'
                : '-translate-x-4 opacity-0'
            )}
          >
            <Image
              src={ASSETS.logo}
              alt={logoAlt}
              width={150}
              height={60}
              className='h-[36px] w-auto transition-transform duration-300 hover:scale-110'
            />
          </div>

          <div
            className={clsx(
              'transition-all duration-500 ease-out',
              'delay-1100',
              isVisible
                ? 'translate-x-0 opacity-100'
                : 'translate-x-4 opacity-0'
            )}
          >
            <Image
              src={ASSETS.mvpLogo}
              alt={mvpAlt}
              width={140}
              height={48}
              className='h-[32px] w-auto transition-transform duration-300 hover:scale-110'
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function HallOfFameHero() {
  const t = useTranslations('HallOfFamePage.Hero')
  const { isVisible, sectionRef } = useStaggeredAnimation(0.1)

  const onSeeMore = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const el = document.getElementById('hall-of-fame-teams')
    if (!el) {
      window.location.hash = '#hall-of-fame-teams'
      return
    }
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
  }

  return (
    <section
      ref={sectionRef}
      className='relative w-full overflow-hidden'
      style={{ paddingBottom: `${WAVE_HEIGHT}px` }}
      aria-labelledby='hall-of-fame-title'
    >
      {/* Enhanced background with subtle animation */}
      <div className='absolute inset-0 -z-10'>
        <Image
          src={ASSETS.background}
          alt=''
          role='presentation'
          fill
          priority
          sizes='100vw'
          className='duration-[20s] object-cover opacity-40 transition-transform ease-out hover:scale-105'
        />
        {/* Subtle gradient overlay */}
        <div className='absolute inset-0 bg-gradient-to-br from-sky-50/30 via-transparent to-blue-50/20' />
      </div>

      <div className='mx-auto max-w-screen-xl px-4 pt-8 sm:pt-12'>
        <div className='grid grid-cols-1 gap-8 lg:grid-cols-12'>
          {/* Enhanced Left: text content */}
          <div className='lg:col-span-7'>
            <header>
              <h1
                id='hall-of-fame-title'
                className={clsx(
                  'mb-4 text-2xl font-extrabold uppercase tracking-wide text-sky-500 transition-all duration-1000 ease-out sm:text-3xl',
                  isVisible
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-8 opacity-0'
                )}
              >
                {t('title')}
              </h1>
            </header>

            <div
              className={clsx(
                'transition-all delay-300 duration-1000 ease-out',
                isVisible
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-6 opacity-0'
              )}
            >
              <p className='max-w-3xl text-sm leading-relaxed text-slate-800/90 sm:text-base lg:text-lg'>
                {t('intro')}
              </p>

              {/* Enhanced stats or highlights could go here */}
              <div className='mt-4 flex items-center gap-4 text-xs text-sky-600 sm:text-sm'>
                <div className='flex items-center gap-1'>
                  <FiAward className='h-3 w-3' />
                  <span className='font-semibold'>Hall of Fame</span>
                </div>
                <div className='h-1 w-1 rounded-full bg-sky-300' />
                <div className='flex items-center gap-1'>
                  <FiUsers className='h-3 w-3' />
                  <span className='font-semibold'>MVP Champions</span>
                </div>
              </div>

              <CTAButton onClick={onSeeMore} isVisible={isVisible}>
                {t('see_more')}
              </CTAButton>
            </div>
          </div>

          {/* Enhanced Right: players image with parallax */}
          <HeroImage
            src={ASSETS.heroImage}
            alt={t('hero_alt')}
            isVisible={isVisible}
          />
        </div>
      </div>

      {/* Enhanced Wave section with logos */}
      <WaveSection
        logoAlt={t('logoAlt')}
        mvpAlt={t('mvpAlt')}
        isVisible={isVisible}
      />
    </section>
  )
}
