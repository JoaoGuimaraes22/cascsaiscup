'use client'

import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import Image from 'next/image'

const testimonials = [
  {
    name: 'Inês Carvalho',
    quote:
      'An unforgettable experience for our team. The organization was flawless.',
    country: 'Portugal',
    team: 'Lisboa Lions',
    flag: '/img/flags/pt.png'
  },
  {
    name: 'Coach Matteo R.',
    quote:
      'Cascais Volley Cup brings together great talent in a beautiful setting.',
    country: 'Italy',
    team: 'Roma Rising',
    flag: '/img/flags/fr.png'
  },
  {
    name: 'Lucía Fernández',
    quote: 'Truly international. We competed, we connected, we learned.',
    country: 'Spain',
    team: 'Madrid Stars',
    flag: '/img/flags/es.png'
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

  const { name, quote, country, team, flag } = testimonials[index]

  return (
    <section className='rounded-xl bg-white px-4 py-16 transition-all duration-300 dark:bg-background'>
      <div className='mx-auto max-w-screen-md text-center'>
        <h2 className='mb-6 text-3xl font-bold text-primary'>
          {t('WhatPeopleAreSaying')}
        </h2>

        <div className='bg-muted relative rounded-b-lg rounded-t-2xl p-6 shadow-md transition-colors duration-300'>
          <p className='mb-6 text-lg italic text-text-secondary dark:text-text-secondary'>
            “{quote}”
          </p>

          <div className='mb-1 flex items-center justify-center gap-3'>
            <Image
              src={flag}
              alt={`${country} flag`}
              width={24}
              height={16}
              className='rounded-sm shadow'
            />
            <p className='font-semibold text-primary dark:text-primary'>
              {name}
            </p>
          </div>

          <p className='text-text-muted dark:text-text-muted text-sm'>
            {team} — {country}
          </p>

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
