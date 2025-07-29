'use client'

import { useTranslations } from 'next-intl'

import Image from 'next/image'

export default function LocationToDoCascais() {
  const t = useTranslations('LocationPage.LocationToDoCascais')

  const items = [
    {
      title: t('BeachesTitle'),
      desc: t('BeachesDesc'),
      image: '/img/location/beach1.jpg'
    },
    {
      title: t('SightseeingTitle'),
      desc: t('SightseeingDesc'),
      image: '/img/location/sightseeing1.jpg'
    },
    {
      title: t('LocalFoodTitle'),
      desc: t('LocalFoodDesc'),
      image: '/img/location/food1.jpg'
    }
  ]

  return (
    <section className='mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8'>
      <h2 className='mb-12 text-center text-3xl font-bold sm:text-4xl'>
        {t('Heading')}
      </h2>

      <div className='grid gap-10 sm:grid-cols-2 md:grid-cols-3'>
        {items.map((item, index) => (
          <div
            key={index}
            className='dark:bg-muted/30 rounded-xl bg-background p-6 text-center shadow-md transition hover:shadow-lg'
          >
            {/* Image */}
            <div className='relative mb-4 aspect-video w-full overflow-hidden rounded-lg'>
              <Image
                src={item.image}
                alt={item.title}
                fill
                className='object-cover'
              />
            </div>

            <h3 className='mb-2 text-xl font-semibold'>{item.title}</h3>
            <p className='text-muted-foreground text-sm'>{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
