// components/about/AboutTestimonials.tsx

'use client'

import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const testimonials = [
  {
    name: 'Inês Carvalho',
    quote:
      'An unforgettable experience for our team. The organization was flawless.',
    country: 'Portugal'
  },
  {
    name: 'Coach Matteo R.',
    quote:
      'Cascais Volley Cup brings together great talent in a beautiful setting.',
    country: 'Italy'
  },
  {
    name: 'Lucía Fernández',
    quote: 'Truly international. We competed, we connected, we learned.',
    country: 'Spain'
  }
]

export default function AboutTestimonials() {
  const t = useTranslations('AboutPage')
  const [index, setIndex] = useState(0)

  const prev = () => {
    setIndex((index - 1 + testimonials.length) % testimonials.length)
  }

  const next = () => {
    setIndex((index + 1) % testimonials.length)
  }

  const { name, quote, country } = testimonials[index]

  return (
    <section className='bg-white px-4 py-16 dark:bg-background'>
      <div className='mx-auto max-w-screen-md text-center'>
        <h2 className='mb-6 text-3xl font-bold text-primary'>
          {t('WhatPeopleAreSaying')}
        </h2>
        <div className='bg-muted relative rounded-lg p-6 shadow-md'>
          <p className='mb-4 text-lg italic text-text-secondary'>“{quote}”</p>
          <p className='font-semibold text-primary'>{name}</p>
          <p className='text-text-muted text-sm'>{country}</p>

          <div className='absolute left-4 top-1/2 -translate-y-1/2'>
            <button onClick={prev} aria-label='Previous testimonial'>
              <FaChevronLeft className='hover:text-accent text-xl text-primary transition' />
            </button>
          </div>
          <div className='absolute right-4 top-1/2 -translate-y-1/2'>
            <button onClick={next} aria-label='Next testimonial'>
              <FaChevronRight className='hover:text-accent text-xl text-primary transition' />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
