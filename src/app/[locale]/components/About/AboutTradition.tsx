// components/about/AboutTradition.tsx

'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'

export default function AboutTradition() {
  const t = useTranslations('AboutPage')

  return (
    <section className='bg-background py-16 text-primary'>
      <div className='mx-auto grid max-w-screen-xl gap-12 px-4 md:px-8 lg:grid-cols-2 lg:items-center'>
        <div className='overflow-hidden rounded-lg shadow-lg'>
          <Image
            src='/landing/ph2.jpg'
            alt={t('CornacchiaFamilyCaption')}
            width={800}
            height={600}
            className='h-auto w-full'
          />
        </div>
        <div>
          <h4 className='text-accent mb-2 font-medium'>
            {t('Family_And_40_Years')}
          </h4>
          <h2 className='mb-4 text-4xl font-extrabold'>
            {t('Tradition_Title')}
          </h2>
          <p className='text-muted whitespace-pre-line text-lg leading-relaxed'>
            {t('Tradition_Body')}
          </p>
        </div>
      </div>
    </section>
  )
}
