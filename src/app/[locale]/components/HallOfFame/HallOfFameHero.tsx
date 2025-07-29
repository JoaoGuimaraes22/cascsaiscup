'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { FaArrowCircleDown } from 'react-icons/fa'

export default function HallOfFameHero() {
  const t = useTranslations('HallOfFamePage')

  return (
    <section className='grid grid-cols-1 items-center gap-10 px-8 py-20 md:grid-cols-2 md:px-24'>
      <div>
        <h1 className='mb-6 text-5xl font-extrabold leading-tight text-primary'>
          {t('title')}
        </h1>
        <p className='text-lg text-text-secondary'>{t('description')}</p>
        <div className='mt-10 flex flex-wrap gap-6'>
          <a
            href='#teams'
            className='hover:bg-primary/80 flex items-center gap-2 rounded bg-primary px-6 py-3 text-button-text transition'
          >
            <FaArrowCircleDown />
            {t('teams')}
          </a>
          <a
            href='#winners'
            className='hover:bg-primary/80 flex items-center gap-2 rounded bg-primary px-6 py-3 text-button-text transition'
          >
            <FaArrowCircleDown />
            {t('winners')}
          </a>
        </div>
      </div>

      <div className='flex justify-center'>
        <Image
          src='/img/halloffame/celeb2.jpg' // replace with your actual path
          alt='Celebrating team'
          width={600}
          height={400}
          className='rounded-xl shadow-xl'
        />
      </div>
    </section>
  )
}
