'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'

// Types
interface RuleItemProps {
  children: React.ReactNode
  index: number
  isVisible: boolean
}

export default function CompetitionInfo() {
  const t = useTranslations('CompetitionPage.Info')
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  // Constants for better maintainability
  const ASSETS = {
    background: '/img/about/about-bg.png',
    waveTop: '/img/global/ondas-5.png',
    waveBottom: '/img/global/ondas-3.png',
    player: '/img/program/players.png',
    sponsor: '/img/sponsors/cascais-camara-w.png'
  } as const

  const WAVE_DIMENSIONS = {
    width: 2048,
    height: 160
  } as const

  const PLAYER_DIMENSIONS = {
    width: 520,
    height: 520
  } as const

  const SPONSOR_DIMENSIONS = {
    width: 240,
    height: 80
  } as const

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

  // Prepare rule items
  const ruleItems = [
    t.rich('rules.item1', {
      b: chunks => (
        <strong className='font-extrabold text-sky-700'>{chunks}</strong>
      )
    }),
    t.rich('rules.item2', {
      b: chunks => (
        <strong className='font-extrabold text-sky-700'>{chunks}</strong>
      )
    }),
    t.rich('rules.item3', {
      b: chunks => (
        <strong className='font-extrabold text-sky-700'>{chunks}</strong>
      )
    }),
    t.rich('rules.item4', {
      b: chunks => (
        <strong className='font-extrabold text-sky-700'>{chunks}</strong>
      )
    })
  ].filter(Boolean)

  const noteItems = [
    t.rich('notes.p1', {
      b: chunks => (
        <strong className='font-extrabold text-sky-700'>{chunks}</strong>
      )
    }),
    t('notes.p2'),
    t.rich('notes.p3', {
      b: chunks => (
        <strong className='font-extrabold text-sky-700'>{chunks}</strong>
      )
    }),
    t('notes.p4')
  ].filter(Boolean)

  return (
    <section
      ref={sectionRef}
      className='relative w-full overflow-hidden'
      aria-labelledby='competition-info-title'
    >
      {/* Background Layer */}
      <BackgroundImage />

      {/* Main Content */}
      <div className='relative z-10 mx-auto max-w-screen-xl px-4 pb-0 pt-8 sm:pt-10 lg:pt-12'>
        <div className='grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12'>
          {/* Content Section */}
          <ContentSection
            title={t('title')}
            intro={t('intro')}
            ruleItems={ruleItems}
            noteItems={noteItems}
            isVisible={isVisible}
          />

          {/* Player Image Section */}
          <PlayerSection
            playerAlt={t('playerAlt') || 'Beach volleyball player in action'}
            isVisible={isVisible}
          />
        </div>
      </div>

      {/* Wave Section with Sponsor */}
      <WaveSection
        sponsorAlt={t('sponsorAlt') || 'Câmara Municipal de Cascais'}
        isVisible={isVisible}
      />
    </section>
  )
}

// Background component
function BackgroundImage() {
  return (
    <div className='absolute inset-0 -z-10'>
      <Image
        src='/img/about/about-bg.png'
        alt=''
        fill
        className='object-cover'
        quality={80}
        placeholder='blur'
        blurDataURL='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkbHB0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=='
        loading='lazy'
        draggable={false}
        aria-hidden='true'
      />
    </div>
  )
}

// Content section component
function ContentSection({
  title,
  intro,
  ruleItems,
  noteItems,
  isVisible
}: {
  title: string
  intro: string
  ruleItems: React.ReactNode[]
  noteItems: React.ReactNode[]
  isVisible: boolean
}) {
  return (
    <div className='space-y-6 lg:col-span-7'>
      {/* Title */}
      <header>
        <h1
          id='competition-info-title'
          className={clsx(
            'text-2xl font-extrabold uppercase tracking-wide text-sky-500 sm:text-3xl lg:text-4xl',
            'transition-all duration-1000 ease-out',
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          )}
        >
          {title}
        </h1>
      </header>

      {/* Introduction */}
      {intro && (
        <div
          className={clsx(
            'transition-all delay-200 duration-1000 ease-out',
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          )}
        >
          <p className='text-sm leading-relaxed text-slate-800/90 sm:text-base lg:text-lg'>
            {intro}
          </p>
        </div>
      )}

      {/* Rules List */}
      {ruleItems.length > 0 && (
        <div
          className={clsx(
            'delay-400 transition-all duration-1000 ease-out',
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          )}
        >
          <RulesList items={ruleItems} isVisible={isVisible} />
        </div>
      )}

      {/* Notes Section */}
      {noteItems.length > 0 && (
        <div
          className={clsx(
            'delay-600 space-y-4 transition-all duration-1000 ease-out',
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          )}
        >
          {noteItems.map((note, index) => (
            <p
              key={index}
              className='text-sm leading-relaxed text-slate-800/90 sm:text-base lg:text-lg'
            >
              {note}
            </p>
          ))}
        </div>
      )}
    </div>
  )
}

// Rules list component
function RulesList({
  items,
  isVisible
}: {
  items: React.ReactNode[]
  isVisible: boolean
}) {
  return (
    <ul className='space-y-3 pl-5' role='list' aria-label='Competition rules'>
      {items.map((item, index) => (
        <RuleItem key={index} index={index} isVisible={isVisible}>
          {item}
        </RuleItem>
      ))}
    </ul>
  )
}

// Individual rule item with staggered animation
function RuleItem({ children, index, isVisible }: RuleItemProps) {
  return (
    <li
      className={clsx(
        'relative text-sm leading-relaxed text-slate-800/90 transition-all duration-700 ease-out sm:text-base lg:text-lg',
        'before:absolute before:-left-5 before:top-2 before:h-1.5 before:w-1.5 before:rounded-full before:bg-sky-500',
        isVisible ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
      )}
      style={{
        transitionDelay: `${800 + index * 100}ms`
      }}
    >
      <div className='pl-1'>{children}</div>
    </li>
  )
}

// Player section component
function PlayerSection({
  playerAlt,
  isVisible
}: {
  playerAlt: string
  isVisible: boolean
}) {
  return (
    <div className='lg:col-span-5'>
      <div
        className={clsx(
          'player-container relative z-20 mx-auto mb-0 h-[360px] w-full max-w-[520px] sm:mb-[-20px] sm:h-[420px] lg:mb-[-48px] lg:h-[520px]',
          'transition-all delay-300 duration-1000 ease-out',
          isVisible
            ? 'translate-y-0 scale-100 opacity-100'
            : 'translate-y-12 scale-95 opacity-0'
        )}
      >
        <Image
          src='/img/program/players.png'
          alt={playerAlt}
          fill
          className='object-contain object-center drop-shadow-xl transition-transform duration-500 hover:scale-105'
          sizes='(max-width: 1024px) 520px, 520px'
          quality={90}
          loading='lazy'
          draggable={false}
        />
      </div>
    </div>
  )
}

// Wave section with sponsor
function WaveSection({
  sponsorAlt,
  isVisible
}: {
  sponsorAlt: string
  isVisible: boolean
}) {
  return (
    <div className='relative -mt-6 sm:-mt-8 lg:-mt-10'>
      {/* Wave Image */}
      <Image
        src='/img/global/ondas-3.png'
        alt=''
        width={2048}
        height={160}
        className='block h-[110px] w-full object-cover sm:h-[130px] lg:h-auto lg:object-contain'
        quality={85}
        loading='lazy'
        draggable={false}
        aria-hidden='true'
      />

      {/* Sponsor Overlay */}
      <div className='pointer-events-none absolute inset-0'>
        <div className='mx-auto flex h-full max-w-screen-xl items-center px-4'>
          <div className='flex w-full items-center justify-center lg:justify-start'>
            <div
              className={clsx(
                'transition-all delay-1000 duration-1000 ease-out',
                isVisible
                  ? 'translate-y-0 opacity-95'
                  : 'translate-y-4 opacity-0'
              )}
            >
              <Image
                src='/img/sponsors/cascais-camara-w.png'
                alt={sponsorAlt}
                width={240}
                height={80}
                className='h-auto w-[170px] transition-transform duration-300 hover:scale-105 sm:w-[200px] lg:w-[240px]'
                sizes='(max-width: 640px) 170px, (max-width: 1024px) 200px, 240px'
                quality={90}
                loading='lazy'
                draggable={false}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
