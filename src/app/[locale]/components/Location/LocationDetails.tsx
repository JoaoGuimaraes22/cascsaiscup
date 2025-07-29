'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'

export default function LocationDetails() {
  const t = useTranslations('LocationPage.LocationDetails')

  return (
    <section
      id='location-details'
      className='mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8'
    >
      <div className='grid items-center gap-12 md:grid-cols-2 md:gap-20'>
        {/* Left: Text Content */}
        <div>
          <h2 className='text-3xl font-bold sm:text-4xl'>
            {t('Heading')} {/* e.g. "A Seaside Gem" */}
          </h2>
          <p className='text-muted-foreground mt-6 text-lg'>
            {t('Description')} {/* paragraph about Cascais */}
          </p>

          <ul className='text-muted-foreground mt-6 list-disc space-y-2 pl-5'>
            <li>{t('Bullet1')}</li>
            <li>{t('Bullet2')}</li>
            <li>{t('Bullet3')}</li>
          </ul>
        </div>

        {/* Right: Image */}
        <div className='relative aspect-video w-full overflow-hidden rounded-xl shadow'>
          <Image
            src='/img/landing/cascais1.jpg'
            alt='Cascais coastline'
            fill
            className='object-cover'
          />
        </div>
      </div>
    </section>
  )
}
