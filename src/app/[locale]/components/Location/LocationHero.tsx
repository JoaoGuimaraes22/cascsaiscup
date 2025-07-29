'use client'

import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { FiChevronDown } from 'react-icons/fi'

export default function LocationHero() {
  const t = useTranslations('LocationPage.LocationHero')

  return (
    <section
      className='relative flex h-[90vh] w-full items-center justify-center bg-cover bg-center bg-no-repeat text-white'
      style={{ backgroundImage: "url('/img/landing/cascais1.jpg')" }} // replace with your image
    >
      {/* Overlay for readability */}
      <div className='absolute inset-0 bg-black/40'></div>

      {/* Centered content */}
      <div className='relative z-10 px-4 text-center'>
        <h1 className='text-4xl font-extrabold leading-tight sm:text-5xl md:text-6xl'>
          {t('Title')} {/* e.g. "Cascais, the Pearl of the Atlantic" */}
        </h1>
        <p className='mx-auto mt-4 max-w-xl text-lg text-white/90 sm:text-xl'>
          {t('Subtitle')} {/* e.g. "Where tradition meets the sea breeze." */}
        </p>

        <a
          href='#location-details'
          className='mt-10 inline-flex items-center justify-center gap-2 rounded-full border-2 border-white px-6 py-3 text-base font-semibold transition hover:bg-white hover:text-black'
        >
          {t('Explore')} <FiChevronDown className='h-5 w-5' />
        </a>
      </div>
    </section>
  )
}
