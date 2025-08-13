'use client'

import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

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

export default function LandingReferences() {
  const t = useTranslations('LandingPage.LandingReferences')
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
    <section className='relative'>
      {/* Title */}
      <div className='mx-auto max-w-6xl px-6'>
        <h2 className='mb-4 text-center text-3xl font-extrabold uppercase tracking-wide text-sky-500 sm:text-4xl lg:text-left'>
          {t('What_they_say') || 'O QUE ELES DIZEM'}
        </h2>
      </div>

      {/* Wave + content */}
      <div className='relative isolate overflow-hidden text-white'>
        {/* Wave background */}
        <div className='absolute inset-0 -z-10'>
          <Image
            src='/img/global/ondas-7.png'
            alt=''
            fill
            priority
            className='object-cover'
          />
        </div>

        <div className='mx-auto max-w-6xl px-6 py-10 sm:py-12'>
          {/* Mobile/Tablet: slider */}
          <div className='lg:hidden'>
            <div ref={sliderRef} className='keen-slider'>
              {testimonials.map((item, i) => (
                <div key={i} className='keen-slider__slide px-4'>
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

          {/* Desktop: first 4 side-by-side */}
          <div className='hidden lg:grid lg:grid-cols-4 lg:gap-8'>
            {testimonials.slice(0, 4).map((item, i) => (
              <div key={i} className='flex'>
                <TestimonialCard {...item} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function TestimonialCard({ team, quote }: { team: string; quote: string }) {
  return (
    <div className='flex w-full flex-col items-center text-center lg:min-h-[160px]'>
      <p className='mb-2 font-extrabold uppercase tracking-wide drop-shadow'>
        {team}
      </p>
      <p className='max-w-[50ch] text-base italic leading-relaxed drop-shadow sm:text-lg'>
        {quote}
      </p>
    </div>
  )
}
