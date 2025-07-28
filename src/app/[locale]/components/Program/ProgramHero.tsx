// components/Program/ProgramHero.tsx
'use client'

import { useTranslations } from 'next-intl'
import { FaArrowCircleDown } from 'react-icons/fa'

export default function ProgramHero() {
  const t = useTranslations('ProgramPage')

  return (
    <section className='bg-hero-cascais relative bg-cover bg-center bg-no-repeat text-white'>
      <div className='bg-black/90'>
        <div className='flex min-h-[600px] flex-col items-center justify-center px-6 py-20 text-center'>
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
      </div>
    </section>
  )
}
