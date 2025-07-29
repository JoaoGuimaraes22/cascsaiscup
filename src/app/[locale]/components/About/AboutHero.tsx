// components/About/AboutHero.tsx
'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'

export default function AboutHero() {
  const t = useTranslations('AboutPage')

  return (
    <section className='grid grid-cols-1 gap-10 px-6 py-20 md:grid-cols-2 md:items-center'>
      <div>
        <p className='mb-2 text-lg text-secondary'>{t('since')}</p>
        <h1 className='text-4xl font-extrabold leading-snug text-primary md:text-5xl'>
          {t('headline')}
        </h1>
        <p className='mt-6 text-lg text-text-secondary'>{t('description')}</p>
      </div>
      <div className='flex justify-center'>
        <Image
          src='/img/landing/ph1.jpg'
          alt='Cascais Volley Cup action shot'
          width={600}
          height={400}
          className='rounded-xl shadow-lg'
        />
      </div>
    </section>
  )
}
