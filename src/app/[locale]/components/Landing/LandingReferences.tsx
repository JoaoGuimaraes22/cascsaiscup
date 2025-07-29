'use client'

import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

const testimonials = [
  {
    quote: `It was an incredible opportunity for our players to compete at this level. The matches were intense, but the experience and hospitality were unmatched.`,
    name: 'Julien Morel',
    role: 'Team Manager',
    team: 'AS Monaco',
    flag: '/img/flags/mc.png'
  },
  {
    quote: `Playing in Cascais was a turning point for our young athletes. They grew on and off the court. We’ll be back stronger next year.`,
    name: 'Sofia Almeida',
    role: 'Head Coach',
    team: 'Clube Voleibol do Sul',
    flag: '/img/flags/pt.png'
  },
  {
    quote: `From the competition to the community, everything was world-class. Our players loved every second. Thank you, Cascais.`,
    name: 'Carlos Romero',
    role: 'Assistant Coach',
    team: 'Madrid Storm Volleyball',
    flag: '/img/flags/es.png'
  },
  {
    quote: `An unforgettable tournament. The atmosphere was electric, and our players learned so much from the international talent present.`,
    name: 'Amélie Duchamp',
    role: 'Coach',
    team: 'Olympique Sud Volley',
    flag: '/img/flags/fr.png'
  },
  {
    quote: `We came to compete and left inspired. Cascais will always be a part of our team’s story.`,
    name: 'Marcos Vázquez',
    role: 'Team Director',
    team: 'Barcelona Flame',
    flag: '/img/flags/es.png'
  }
]

export default function LandingReferences() {
  const t = useTranslations('LandingPage.LandingReferences')
  const [currentSlide, setCurrentSlide] = useState(0)
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    }
  })

  useEffect(() => {
    const interval = setInterval(() => {
      instanceRef.current?.next()
    }, 5000)
    return () => clearInterval(interval)
  }, [instanceRef])

  return (
    <section className='bg-white py-16 transition-colors duration-300 dark:bg-background'>
      <div className='mx-auto max-w-3xl px-6 text-center'>
        <h2 className='mb-10 text-4xl font-bold text-primary dark:text-white'>
          {t('What_they_say')}
        </h2>

        <div ref={sliderRef} className='keen-slider'>
          {testimonials.map((item, i) => (
            <div
              key={i}
              className='keen-slider__slide flex flex-col items-center px-6 transition-all duration-700 ease-in-out'
            >
              <p className='mb-6 max-w-2xl text-lg italic text-gray-700 dark:text-gray-300'>
                “{item.quote}”
              </p>
              <div className='flex items-center gap-3'>
                <Image
                  src={item.flag}
                  alt={item.team}
                  width={40}
                  height={40}
                  className='rounded-full ring-1 ring-gray-200 dark:ring-gray-600'
                />
                <div className='text-left'>
                  <p className='font-bold text-gray-900 dark:text-white'>
                    {item.team}
                  </p>
                  <p className='text-sm text-gray-600 dark:text-gray-400'>
                    {item.name} ({item.role})
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Dots */}
        <div className='mt-6 flex justify-center gap-2'>
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => instanceRef.current?.moveToIdx(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2 w-2 rounded-full transition-all duration-300 ${
                currentSlide === i
                  ? 'bg-primary dark:bg-white'
                  : 'hover:bg-primary/60 bg-gray-300 dark:bg-gray-600 dark:hover:bg-white/50'
              }`}
            />
          ))}
        </div>

        <Link
          href='/references'
          className='mt-10 inline-flex items-center text-sm font-medium text-primary hover:underline dark:text-white'
        >
          {t('MoreReferences')} <span className='ml-1'>→</span>
        </Link>
      </div>
    </section>
  )
}
