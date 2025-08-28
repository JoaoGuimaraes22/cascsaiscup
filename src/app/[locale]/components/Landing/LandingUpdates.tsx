'use client'

import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import { useCallback, useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { FiChevronLeft, FiChevronRight, FiPlay, FiPause } from 'react-icons/fi'
import NewsCard from './NewsCard'
import clsx from 'clsx'

// --- ASSETS ---
const ASSETS = {
  images: {
    backgroundMain: '/img/landing/home-page-2.webp',
    waveTop: '/img/global/ondas-4.png',
    waveTestimonials: '/img/global/ondas-9.png',
    news: {
      news1: '/img/news/news1.webp',
      news2: '/img/news/news2.webp',
      news3: '/img/news/news3.webp',
      news4: '/img/news/news4.webp'
    }
  },
  links: {
    news: {
      cornacchia2025: '/news/cornacchia-2025',
      nationsCup9: '/news/nations-cup-9',
      streamingScamWarning: '/news/streaming-scam-warning',
      mvpAwards: '/news/mvp-awards'
    }
  },
  animations: {
    testimonials: {
      duration: 800,
      autoPlayInterval: 4000
    },
    news: {
      duration: 600
    },
    fadeIn: {
      duration: 1000,
      delay: 600
    }
  },
  breakpoints: {
    mobile: '(min-width: 768px)',
    desktop: '(min-width: 1024px)'
  },
  spacing: {
    mobile: 16,
    tablet: 20,
    desktop: 24
  }
} as const

// --- TYPES ---
interface Testimonial {
  team: string
  quote: string
  country?: string
  year?: string
}

interface NewsItem {
  title: string
  date: string
  excerpt: string
  image: string
  link: string
}

// --- DATA ---
const testimonials: Testimonial[] = [
  {
    team: 'SC Arcozelo',
    country: 'Portugal',
    year: '2025',
    quote: '"…mais uma vez o Sporting Clube de Arcozelo participou no torneio"'
  },
  {
    team: 'Pel Amora SC',
    country: 'Portugal',
    year: '2025',
    quote:
      '"…uma experiência inesquecível, tanto a nível competitivo como de convívio."'
  },
  {
    team: 'CRCD Luzense',
    country: 'Portugal',
    year: '2025',
    quote: '"…um torneio garantido pela organização e ambiente fantástico."'
  },
  {
    team: 'São Francisco AD',
    country: 'Portugal',
    year: '2025',
    quote: '"…as miúdas adoraram e claro que para o ano querem voltar."'
  },
  {
    team: 'CD Foz do Porto',
    country: 'Portugal',
    year: '2025',
    quote:
      '"...o torneio foi muito bem organizado, com espaço para crescermos enquanto equipa, não só a nível competitivo, mas também com momentos dedicados ao lazer."'
  }
]

const newsItems: NewsItem[] = [
  {
    title: 'Ranking Cascais Volley Cup 2025',
    date: 'April 23, 2025',
    excerpt:
      'Ranking and Pictures of Cascais Volley Cup 2025, the volleyball tournament of Cascais',
    image: ASSETS.images.news.news1,
    link: ASSETS.links.news.cornacchia2025
  },
  {
    title: 'Under 21 – Rankings & Pictures',
    date: 'March 6, 2025',
    excerpt:
      'Check out pictures, video and rankings of the Under 21 tournament.',
    image: ASSETS.images.news.news2,
    link: ASSETS.links.news.nationsCup9
  },
  {
    title: 'New Arrivals: Pelamora SC',
    date: 'February 20, 2025',
    excerpt: 'Official Statement: Pelamora is coming with Under-15, 17 and 21',
    image: ASSETS.images.news.news3,
    link: ASSETS.links.news.streamingScamWarning
  },
  {
    title: 'MVP Awards',
    date: 'February 10, 2025',
    excerpt: 'MVP awards given to the athletes who stood out during the event.',
    image: ASSETS.images.news.news4,
    link: ASSETS.links.news.mvpAwards
  }
]

// --- COMPONENT ---
export default function LandingUpdates() {
  const t = useTranslations('LandingPage.Updates')
  const [currentSlide, setCurrentSlide] = useState(0)
  const [currentNewsSlide, setCurrentNewsSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval>>()

  // Testimonials slider
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    defaultAnimation: { duration: ASSETS.animations.testimonials.duration },
    slides: {
      perView: 1,
      spacing: ASSETS.spacing.mobile
    },
    breakpoints: {
      [ASSETS.breakpoints.mobile]: {
        slides: { perView: 2, spacing: ASSETS.spacing.tablet }
      },
      [ASSETS.breakpoints.desktop]: {
        slides: { perView: 4, spacing: ASSETS.spacing.desktop }
      }
    },
    slideChanged(s) {
      setCurrentSlide(s.track.details.rel)
    },
    created() {
      setIsVisible(true)
    }
  })

  // News slider - same structure as testimonials
  const [newsSliderRef, newsInstanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    defaultAnimation: { duration: ASSETS.animations.news.duration },
    slides: {
      perView: 1,
      spacing: ASSETS.spacing.mobile
    },
    breakpoints: {
      [ASSETS.breakpoints.mobile]: {
        slides: { perView: 2, spacing: ASSETS.spacing.tablet }
      },
      [ASSETS.breakpoints.desktop]: {
        slides: { perView: 4, spacing: ASSETS.spacing.desktop }
      }
    },
    slideChanged(s) {
      setCurrentNewsSlide(s.track.details.rel)
    }
  })

  // Auto-play functionality for testimonials
  const startAutoPlay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      if (isAutoPlaying && instanceRef.current) {
        instanceRef.current.next()
      }
    }, ASSETS.animations.testimonials.autoPlayInterval)
  }, [isAutoPlaying, instanceRef])

  const stopAutoPlay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
  }, [])

  const toggleAutoPlay = useCallback(() => {
    setIsAutoPlaying(prev => !prev)
  }, [])

  // Navigation functions for testimonials
  const goToPrevious = useCallback(() => {
    instanceRef.current?.prev()
    stopAutoPlay()
    setIsAutoPlaying(false)
  }, [instanceRef, stopAutoPlay])

  const goToNext = useCallback(() => {
    instanceRef.current?.next()
    stopAutoPlay()
    setIsAutoPlaying(false)
  }, [instanceRef, stopAutoPlay])

  const goToSlide = useCallback(
    (index: number) => {
      instanceRef.current?.moveToIdx(index)
      stopAutoPlay()
      setIsAutoPlaying(false)
    },
    [instanceRef, stopAutoPlay]
  )

  // Navigation functions for news slider
  const goToNewsSlide = useCallback(
    (index: number) => {
      newsInstanceRef.current?.moveToIdx(index)
    },
    [newsInstanceRef]
  )

  const goToNewsPrevious = useCallback(() => {
    newsInstanceRef.current?.prev()
  }, [newsInstanceRef])

  const goToNewsNext = useCallback(() => {
    newsInstanceRef.current?.next()
  }, [newsInstanceRef])

  // Auto-play effect
  useEffect(() => {
    if (isAutoPlaying) {
      startAutoPlay()
    } else {
      stopAutoPlay()
    }
    return stopAutoPlay
  }, [isAutoPlaying, startAutoPlay, stopAutoPlay])

  // Intersection observer for scroll-triggered animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className='relative isolate overflow-hidden pb-6 sm:pb-8'
      aria-labelledby='updates-heading'
    >
      {/* Background for whole section */}
      <Image
        src={ASSETS.images.backgroundMain}
        alt=''
        role='presentation'
        fill
        loading='eager'
        className='absolute inset-0 -z-10 object-cover'
        quality={75}
      />

      {/* Top wave - responsive height with better mobile scaling */}
      <div className='absolute inset-x-0 top-0 z-0 h-[60px] sm:h-[80px] lg:h-[120px]'>
        <Image
          src={ASSETS.images.waveTop}
          alt=''
          role='presentation'
          fill
          className='object-cover object-center'
          quality={75}
          loading='eager'
        />
      </div>

      {/* Content with responsive padding that matches wave height */}
      <div className='mx-auto max-w-screen-xl px-4 pt-[80px] sm:pt-[100px] lg:pt-[140px]'>
        {/* News Section */}
        <div
          className={clsx(
            'transition-all duration-1000 ease-out',
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          )}
        >
          <h2
            id='updates-heading'
            className='mb-6 text-2xl font-extrabold uppercase tracking-wide text-sky-500 sm:text-3xl'
          >
            {t('Latest_news') || 'LATEST NEWS'}
          </h2>

          {/* News Slider */}
          <div className='relative'>
            <div
              ref={newsSliderRef}
              className='keen-slider'
              aria-labelledby='updates-heading'
            >
              {newsItems.map((item, index) => (
                <div key={index} className='keen-slider__slide px-2'>
                  <NewsCard {...item} />
                </div>
              ))}
            </div>

            {/* News slider controls */}
            <div className='mt-4 flex items-center justify-center gap-4'>
              {/* Navigation arrows */}
              <button
                onClick={goToNewsPrevious}
                aria-label='Previous news'
                className='rounded-full bg-sky-500/20 p-2 backdrop-blur-sm transition-all hover:bg-sky-500/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/50'
              >
                <FiChevronLeft className='h-4 w-4 text-sky-500' />
              </button>

              {/* Dots - One for each news item */}
              <div className='flex gap-2'>
                {newsItems.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToNewsSlide(index)}
                    aria-label={`Go to news item ${index + 1}`}
                    className={clsx(
                      'h-2 w-2 rounded-full transition-all',
                      currentNewsSlide === index
                        ? 'scale-125 bg-sky-500'
                        : 'bg-sky-500/50 hover:bg-sky-500/80'
                    )}
                  />
                ))}
              </div>

              <button
                onClick={goToNewsNext}
                aria-label='Next news'
                className='rounded-full bg-sky-500/20 p-2 backdrop-blur-sm transition-all hover:bg-sky-500/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/50'
              >
                <FiChevronRight className='h-4 w-4 text-sky-500' />
              </button>
            </div>
          </div>
        </div>

        {/* Testimonials Section Title */}
        <div
          className={clsx(
            `delay-[${ASSETS.animations.fadeIn.delay}ms] transition-all duration-${ASSETS.animations.fadeIn.duration} ease-out`,
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          )}
        >
          <h3
            id='testimonials-heading'
            className='mb-3 mt-12 text-2xl font-extrabold uppercase tracking-wide text-sky-500 sm:mb-4 sm:mt-16 sm:text-3xl'
          >
            {t('What_they_say') || 'WHAT THEY SAY'}
          </h3>
        </div>
      </div>

      {/* Full-bleed wave band with testimonials */}
      <div className='relative left-1/2 w-screen -translate-x-1/2'>
        <div className='relative min-h-[50vh] sm:min-h-[360px]'>
          {/* Wave background */}
          <Image
            src={ASSETS.images.waveTestimonials}
            alt=''
            role='presentation'
            fill
            className='object-cover'
            loading='eager'
            quality={75}
          />

          {/* Testimonials overlay */}
          <div className='absolute inset-0 flex items-center text-white'>
            <div className='mx-auto w-full max-w-screen-xl px-4'>
              {/* Slider with controls */}
              <div className='relative'>
                <div
                  ref={sliderRef}
                  className='keen-slider'
                  onMouseEnter={stopAutoPlay}
                  onMouseLeave={() => isAutoPlaying && startAutoPlay()}
                  aria-labelledby='testimonials-heading'
                >
                  {testimonials.map((item, index) => (
                    <div
                      key={index}
                      className='keen-slider__slide min-h-[180px] px-2 py-6 lg:px-4'
                    >
                      <TestimonialCard {...item} />
                    </div>
                  ))}
                </div>

                {/* Navigation arrows (desktop only) */}
                <div className='hidden lg:block'>
                  <button
                    onClick={goToPrevious}
                    aria-label={
                      t('previousTestimonial') || 'Previous testimonial'
                    }
                    className='absolute left-0 top-1/2 -translate-x-4 -translate-y-1/2 rounded-full bg-white/20 p-2 backdrop-blur-sm transition-all hover:scale-110 hover:bg-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50'
                  >
                    <FiChevronLeft className='h-6 w-6' />
                  </button>
                  <button
                    onClick={goToNext}
                    aria-label={t('nextTestimonial') || 'Next testimonial'}
                    className='absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 rounded-full bg-white/20 p-2 backdrop-blur-sm transition-all hover:scale-110 hover:bg-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50'
                  >
                    <FiChevronRight className='h-6 w-6' />
                  </button>
                </div>

                {/* Controls */}
                <div className='mt-6 flex items-center justify-center gap-4'>
                  {/* Dots */}
                  <div className='flex gap-2'>
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        aria-label={`${t('goToSlide') || 'Go to slide'} ${index + 1}`}
                        className={clsx(
                          'h-2 w-2 rounded-full transition-all',
                          currentSlide === index
                            ? 'scale-125 bg-white'
                            : 'bg-white/50 hover:bg-white/80'
                        )}
                      />
                    ))}
                  </div>

                  {/* Auto-play toggle */}
                  <button
                    onClick={toggleAutoPlay}
                    aria-label={
                      isAutoPlaying
                        ? t('pauseSlideshow') || 'Pause slideshow'
                        : t('playSlideshow') || 'Play slideshow'
                    }
                    className='ml-4 rounded-full bg-white/20 p-2 backdrop-blur-sm transition-all hover:bg-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50'
                  >
                    {isAutoPlaying ? (
                      <FiPause className='h-4 w-4' />
                    ) : (
                      <FiPlay className='h-4 w-4' />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const TestimonialCard: React.FC<Testimonial> = ({
  team,
  quote,
  country,
  year
}) => {
  return (
    <div className='flex min-h-[140px] w-full flex-col items-center justify-center text-center text-white lg:min-h-[160px]'>
      <div className='mb-3'>
        <p className='text-lg font-extrabold uppercase tracking-wide drop-shadow'>
          {team}
        </p>
        {(country || year) && (
          <p className='mt-1 text-xs opacity-80'>
            {country && year ? `${country} • ${year}` : country || year}
          </p>
        )}
      </div>

      <blockquote className='max-w-[52ch] text-base italic leading-relaxed drop-shadow sm:text-lg'>
        {quote}
      </blockquote>
    </div>
  )
}
