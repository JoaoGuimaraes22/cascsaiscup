// components/LandingReferences.tsx
'use client'

import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

const testimonials = [
  {
    quote: `It was a wonderful experience for the Japanese Team to participate in this tournament. Above all, we had a valuable experience from world class players that we could not experience in Japan. We hope our continuous relationship from now on.`,
    name: 'Daichi Saegusa',
    role: 'Team Leader',
    team: 'Japan National Team',
    flag: '/landing/flags/mn.png'
  },
  {
    quote: `Playing in Cascais was a dream come true — sun, competition, and great teams from across Europe. We'll definitely return.`,
    name: 'Elena Marques',
    role: 'Coach',
    team: 'Portugal U18',
    flag: '/landing/flags/pt.png'
  },
  {
    quote: `The organization was flawless. Our players felt welcomed and challenged. Cascais is now part of our journey.`,
    name: 'Michael Bauer',
    role: 'Head Coach',
    team: 'Germany Junior Team',
    flag: '/landing/flags/sp.png'
  }
]

export default function LandingReferences() {
  const t = useTranslations('LandingReferences')
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slideChanged() {},
    created() {}
  })

  // Autoplay
  useEffect(() => {
    const interval = setInterval(() => {
      instanceRef.current?.next()
    }, 5000)
    return () => clearInterval(interval)
  }, [instanceRef])

  return (
    <section className='bg-white py-16'>
      <div className='mx-auto max-w-3xl px-6 text-center'>
        <h2 className='mb-10 text-4xl font-bold text-primary'>
          {t('What_they_say')}
        </h2>

        <div ref={sliderRef} className='keen-slider'>
          {testimonials.map((item, i) => (
            <div
              key={i}
              className='keen-slider__slide flex flex-col items-center transition-all duration-700 ease-in-out'
            >
              <p className='mb-6 max-w-2xl text-lg italic text-gray-600'>
                “{item.quote}”
              </p>
              <div className='flex items-center gap-3'>
                <Image
                  src={item.flag}
                  alt={item.team}
                  width={40}
                  height={40}
                  className='rounded-full ring-1 ring-gray-200'
                />
                <div className='text-left'>
                  <p className='font-bold text-gray-800'>{item.team}</p>
                  <p className='text-sm text-gray-500'>
                    {item.name} ({item.role})
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Link
          href='/references'
          className='mt-10 inline-flex items-center text-sm font-medium text-primary hover:underline'
        >
          {t('MoreReferences')} <span className='ml-1'>→</span>
        </Link>
      </div>
    </section>
  )
}
