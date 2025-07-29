'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'

export default function LocationLisbon() {
  const t = useTranslations('LocationPage.LocationLisbon')

  return (
    <section className='mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8'>
      <div className='grid items-center gap-12 md:grid-cols-2 md:gap-20'>
        {/* Image first on desktop, second on mobile */}
        <div className='relative order-1 aspect-video w-full overflow-hidden rounded-xl shadow md:order-none'>
          <Image
            src='/img/location/lisbon1.jpg'
            alt='Lisbon city view'
            fill
            className='object-cover'
          />
        </div>

        {/* Text content */}
        <div>
          <h2 className='text-3xl font-bold sm:text-4xl'>{t('Heading')}</h2>
          <p className='text-muted-foreground mt-6 text-lg'>
            {t('Description')}
          </p>
          <ul className='text-muted-foreground mt-6 list-disc space-y-2 pl-5'>
            <li>{t('Bullet1')}</li>
            <li>{t('Bullet2')}</li>
            <li>{t('Bullet3')}</li>
          </ul>
        </div>
      </div>
    </section>
  )
}
