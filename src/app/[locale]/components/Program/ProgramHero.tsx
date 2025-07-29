'use client'

import { useTranslations } from 'next-intl'
import { FaArrowCircleDown } from 'react-icons/fa'

export default function ProgramHero() {
  const t = useTranslations('ProgramPage')

  return (
    <section
      className='relative bg-cover bg-center bg-no-repeat text-white'
      style={{ backgroundImage: "url('/img/landing/ph4.jpg')" }}
    >
      {/* Dark overlay */}
      <div className='absolute inset-0 bg-black/40' />

      {/* Content */}
      <div className='relative z-10 flex min-h-[600px] flex-col items-center justify-center px-6 py-20 text-center'>
        <h1 className='text-5xl font-extrabold sm:text-6xl'>
          <span className='block'>CASCAIS</span>
          <span className='text-accent block'>VOLLEY CUP 2025</span>
        </h1>
        <p className='mt-6 text-2xl font-medium'>
          {t('Dates')}
          <br />
          {t('Location')}
        </p>
        <a
          href='#program-intro'
          className='hover:bg-accent/80 mt-10 flex items-center gap-2 rounded bg-button px-8 py-4 text-lg font-semibold text-white shadow-lg transition'
        >
          {t('Program')} <FaArrowCircleDown />
        </a>
      </div>
    </section>
  )
}
