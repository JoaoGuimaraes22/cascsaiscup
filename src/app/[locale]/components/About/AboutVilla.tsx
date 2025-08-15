'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { useEffect, useRef, useState } from 'react'
import { FiExternalLink } from 'react-icons/fi'
import clsx from 'clsx'

export default function AboutVilla() {
  const t = useTranslations('AboutPage.Villa')
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [backgroundLoaded, setBackgroundLoaded] = useState(false)

  // ===== Constants =====
  const ASSETS = {
    background: '/img/about/villa-bg.png',
    wave: '/img/global/ondas-6.png',
    tagline: '/img/global/tagline.png',
    logo: '/img/global/cascais-volley-cup-1-w.png',
    sponsor: '/img/sponsors/cascais-camara-w.png'
  } as const

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

  return (
    <section
      ref={sectionRef}
      className='relative min-h-[640px] w-full overflow-hidden'
      aria-labelledby='villa-title'
    >
      {/* Enhanced Background with Loading State */}
      <div className='absolute inset-0 -z-10'>
        <div className='absolute inset-0 bg-gradient-to-br from-blue-900 to-blue-800' />
        <Image
          src={ASSETS.background}
          alt=''
          role='presentation'
          fill
          priority
          className={clsx(
            'object-cover transition-opacity duration-700',
            backgroundLoaded ? 'opacity-100' : 'opacity-0'
          )}
          sizes='100vw'
          draggable={false}
          onLoad={() => setBackgroundLoaded(true)}
        />
      </div>

      {/* Animated Tagline */}
      <div className='mx-auto max-w-screen-xl px-4 pt-4 sm:pt-6'>
        <div
          className={clsx(
            'flex justify-center transition-all duration-1000 ease-out sm:justify-end',
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          )}
        >
          <Image
            src={ASSETS.tagline}
            alt={t('taglineAlt')}
            width={520}
            height={220}
            className='h-auto w-[200px] object-contain drop-shadow transition-transform duration-300 hover:scale-105 sm:w-[340px] lg:w-[520px]'
            sizes='(max-width: 640px) 200px, (max-width: 1024px) 340px, 520px'
            decoding='async'
            draggable={false}
          />
        </div>
      </div>

      {/* Enhanced Wave Band */}
      <div className='relative left-1/2 mt-4 w-screen -translate-x-1/2 sm:mt-6'>
        {/* MOBILE/TABLET: stretch wave to content */}
        <div
          className={clsx(
            'relative block overflow-hidden bg-center bg-no-repeat transition-all duration-1000 ease-out [background-size:100%_100%] lg:hidden',
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          )}
          style={{
            backgroundImage: `url(${ASSETS.wave})`,
            transitionDelay: '300ms'
          }}
        >
          <div className='mx-auto max-w-screen-xl px-4 py-6 sm:py-7'>
            <h2
              id='villa-title'
              className='mb-2 inline-block rounded-md bg-sky-500 px-2 py-1 text-[20px] font-extrabold uppercase tracking-wide text-white drop-shadow transition-transform duration-300 hover:scale-105 sm:text-2xl'
            >
              {t('title')}
            </h2>
            <div className='space-y-3 text-[13.5px] leading-[1.55] text-white/95 drop-shadow sm:text-[14.5px]'>
              {PARAGRAPHS.map((key, index) => (
                <p
                  key={key}
                  className={clsx(
                    'transition-all duration-700 ease-out',
                    index === 2 && 'hidden sm:block',
                    isVisible
                      ? 'translate-y-0 opacity-100'
                      : 'translate-y-4 opacity-0'
                  )}
                  style={{
                    transitionDelay: `${500 + index * 100}ms`
                  }}
                >
                  {t(key)}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* DESKTOP: preserve full wave shape */}
        <div
          className={clsx(
            'relative hidden transition-all duration-1000 ease-out lg:block',
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          )}
          style={{ transitionDelay: '300ms' }}
        >
          <Image
            src={ASSETS.wave}
            alt=''
            role='presentation'
            width={2048}
            height={380}
            className='block h-auto w-full'
            sizes='100vw'
            decoding='async'
            draggable={false}
          />
          <div className='absolute inset-0 flex items-center'>
            <div className='mx-auto max-w-screen-xl px-4 py-8'>
              <div className='xl:max-w-[110ch] 2xl:max-w-[120ch]'>
                <h2
                  id='villa-title-desktop'
                  className='mb-3 text-3xl font-extrabold uppercase tracking-wide text-white drop-shadow transition-transform duration-300 hover:scale-105'
                >
                  {t('title')}
                </h2>
                <div className='space-y-4 text-base leading-relaxed text-white/95 drop-shadow'>
                  {PARAGRAPHS.map((key, index) => (
                    <p
                      key={key}
                      className={clsx(
                        'transition-all duration-700 ease-out',
                        isVisible
                          ? 'translate-y-0 opacity-100'
                          : 'translate-y-4 opacity-0'
                      )}
                      style={{
                        transitionDelay: `${500 + index * 100}ms`
                      }}
                    >
                      {t(key)}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Bottom Row */}
      <div className='mx-auto max-w-screen-xl px-4 py-5 sm:py-7'>
        <div
          className={clsx(
            'flex flex-col items-start justify-between gap-4 transition-all duration-1000 ease-out sm:flex-row sm:items-center sm:gap-5',
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          )}
          style={{ transitionDelay: '900ms' }}
        >
          {/* Logo with hover effect */}
          <div className='group'>
            <Image
              src={ASSETS.logo}
              alt={t('eventLogoAlt')}
              width={260}
              height={80}
              className='h-auto w-[160px] object-contain drop-shadow transition-transform duration-300 group-hover:scale-105 sm:w-[220px] lg:w-[260px]'
              sizes='(max-width: 640px) 160px, (max-width: 1024px) 220px, 260px'
              decoding='async'
              draggable={false}
            />
          </div>

          <div className='flex w-full items-center justify-between gap-4 sm:w-auto sm:justify-end sm:gap-5'>
            {/* Sponsor logo with hover effect */}
            <div className='group'>
              <Image
                src={ASSETS.sponsor}
                alt={t('sponsorAlt')}
                width={240}
                height={80}
                className='h-auto w-[150px] object-contain drop-shadow transition-transform duration-300 group-hover:scale-105 sm:w-[200px] lg:w-[240px]'
                sizes='(max-width: 640px) 150px, (max-width: 1024px) 200px, 240px'
                decoding='async'
                draggable={false}
              />
            </div>

            {/* Enhanced CTA Button */}
            <EnhancedButton
              href='https://www.visitcascais.com/en'
              ariaLabel={t('cta')}
            >
              {t('cta')}
            </EnhancedButton>
          </div>
        </div>
      </div>
    </section>
  )
}

/* --- Enhanced Button Component --- */
interface EnhancedButtonProps {
  href: string
  ariaLabel: string
  children: React.ReactNode
}

function EnhancedButton({ href, ariaLabel, children }: EnhancedButtonProps) {
  return (
    <Link
      href={href}
      target='_blank'
      rel='noopener noreferrer'
      className='group relative inline-flex shrink-0 items-center gap-2 overflow-hidden rounded-full bg-white px-4 py-2 text-sm font-bold text-sky-700 shadow-lg ring-1 ring-black/10 transition-all duration-300 hover:scale-105 hover:bg-sky-700 hover:text-white hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 sm:text-base'
      aria-label={ariaLabel}
    >
      <span className='relative z-10 flex items-center gap-2'>
        {children}
        <FiExternalLink className='h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5' />
      </span>

      {/* Hover shimmer effect */}
      <div className='absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-full' />
    </Link>
  )
}
