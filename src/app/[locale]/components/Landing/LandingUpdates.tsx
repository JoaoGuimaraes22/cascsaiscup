'use client'

import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import NewsCard from './NewsCard'

// --- DATA ---
const testimonials = [
  {
    team: 'SC Arcozelo',
    quote: '“…mais uma vez o Sporting Clube de Arcozelo participou no torneio”'
  },
  {
    team: 'Pel Amora SC',
    quote:
      '“…uma experiência inesquecível, tanto a nível competitivo como de convívio.”'
  },
  {
    team: 'CRCD Luzense',
    quote: '“…um torneio garantido pela organização e ambiente fantástico.”'
  },
  {
    team: 'São Francisco AD',
    quote: '“…as miúdas adoraram e claro que para o ano querem voltar.”'
  },
  {
    team: 'Barcelona Flame',
    quote:
      '“We came to compete and left inspired. Cascais will always be part of our story.”'
  }
]

const newsItems = [
  {
    title: 'Ranking Cascais Volley Cup 2025',
    date: 'April 23, 2025',
    excerpt:
      'Ranking and Pictures of Cascais Volley Cup 2025, the volleyball tournament of Cascais',
    image: '/img/news/news1.jpg',
    link: '/news/cornacchia-2025'
  },
  {
    title: 'Under 21 – Rankings & Pictures',
    date: 'March 6, 2025',
    excerpt:
      'Check out pictures, video and rankings of the Under 21 tournament.',
    image: '/img/news/news2.jpg',
    link: '/news/nations-cup-9'
  },
  {
    title: 'New Arrivals: Pelamora SC',
    date: 'February 20, 2025',
    excerpt: 'Official Statement: Pelamora is coming with Under-15, 17 and 21',
    image: '/img/news/news3.png',
    link: '/news/streaming-scam-warning'
  },
  {
    title: 'MVP Awards',
    date: 'February 10, 2025',
    excerpt: 'MVP awards given to the athletes who stood out during the event.',
    image: '/img/news/news4.jpg',
    link: '/news/mvp-awards'
  }
]

// --- COMPONENT ---
export default function LandingUpdates() {
  const t = useTranslations('LandingPage')
  const [currentSlide, setCurrentSlide] = useState(0)

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slideChanged(s) {
      setCurrentSlide(s.track.details.rel)
    }
  })

  useEffect(() => {
    const id = setInterval(() => instanceRef.current?.next(), 5000)
    return () => clearInterval(id)
  }, [instanceRef])

  return (
    <section className='relative isolate overflow-hidden pb-6 sm:pb-8'>
      {/* Background for whole section */}
      <Image
        src='/img/landing/home-page-2.png'
        alt=''
        fill
        priority
        className='absolute inset-0 -z-10 object-cover'
      />

      {/* Top wave (flush to top) */}
      <div className='absolute inset-x-0 top-0 z-0'>
        <Image
          src='/img/global/ondas-4.png'
          alt='Wave divider'
          width={1920}
          height={135}
          className='-mt-px block h-auto w-full object-cover'
        />
      </div>

      {/* Content pushed below the top wave height */}
      <div className='mx-auto max-w-screen-xl px-4 pt-[clamp(96px,9vw,180px)]'>
        <h2 className='mb-6 text-2xl font-extrabold uppercase tracking-wide text-sky-500 sm:text-3xl'>
          {t('LandingNews.Latest_news') || 'LATEST NEWS'}
        </h2>

        <div className='grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-4'>
          {newsItems.map((n, i) => (
            <NewsCard key={i} {...n} />
          ))}
        </div>

        {/* What they say TITLE outside the wave */}
        <h3 className='mb-3 mt-12 text-2xl font-extrabold uppercase tracking-wide text-sky-500 sm:mb-4 sm:mt-16 sm:text-3xl'>
          {t('LandingReferences.What_they_say') || 'WHAT THEY SAY'}
        </h3>
      </div>

      {/* Full-bleed wave band with testimonials (mobile: ≥ 50vh) */}
      <div className='relative left-1/2 w-screen -translate-x-1/2'>
        <div className='relative min-h-[50vh] sm:min-h-[360px]'>
          {/* Wave background fills the wrapper */}
          <Image
            src='/img/global/ondas-8.png'
            alt='Wave band'
            fill
            className='object-cover'
          />

          {/* Testimonials overlay */}
          <div className='absolute inset-0 flex items-center text-white'>
            <div className='mx-auto w-full max-w-screen-xl px-4'>
              {/* Mobile slider */}
              <div className='lg:hidden'>
                <div ref={sliderRef} className='keen-slider'>
                  {testimonials.map((item, i) => (
                    <div
                      key={i}
                      className='keen-slider__slide min-h-[180px] px-2 py-6'
                    >
                      <TestimonialCard {...item} />
                    </div>
                  ))}
                </div>

                <div className='mt-6 flex justify-center gap-2'>
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => instanceRef.current?.moveToIdx(i)}
                      aria-label={`Go to slide ${i + 1}`}
                      className={`h-2 w-2 rounded-full transition-all ${
                        currentSlide === i
                          ? 'bg-white'
                          : 'bg-white/50 hover:bg-white/80'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Desktop 4-up */}
              <div className='hidden lg:grid lg:grid-cols-4 lg:gap-8'>
                {testimonials.slice(0, 4).map((item, i) => (
                  <div key={i} className='flex'>
                    <TestimonialCard {...item} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function TestimonialCard({ team, quote }: { team: string; quote: string }) {
  return (
    <div className='flex min-h-[140px] w-full flex-col items-center text-center text-white lg:min-h-[160px]'>
      <p className='mb-2 font-extrabold uppercase tracking-wide drop-shadow'>
        {team}
      </p>
      <p className='max-w-[52ch] text-base italic leading-relaxed drop-shadow sm:text-lg'>
        {quote}
      </p>
    </div>
  )
}
