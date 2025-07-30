'use client'

import { useTranslations } from 'next-intl'
import { FaHotel, FaUtensils, FaShuttleVan } from 'react-icons/fa'

export default function ServicesHero() {
  const t = useTranslations('ServicesPage.ServicesHero')

  const services = [
    {
      icon: <FaHotel size={40} className='text-primary' />,
      title: t('Accommodation'),
      description: t('AccommodationDescription')
    },
    {
      icon: <FaUtensils size={40} className='text-primary' />,
      title: t('Food'),
      description: t('FoodDescription')
    },
    {
      icon: <FaShuttleVan size={40} className='text-primary' />,
      title: t('Transportation'),
      description: t('TransportationDescription')
    }
  ]

  return (
    <section className='mx-auto max-w-7xl px-4 py-16'>
      <h2 className='mb-10 text-center text-3xl font-bold text-primary dark:text-white'>
        {t('Title')}
      </h2>
      <div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-3'>
        {services.map(({ icon, title, description }) => (
          <div
            key={title}
            className='rounded-2xl border bg-white p-6 text-center shadow-md transition hover:shadow-lg dark:border-neutral-700 dark:bg-neutral-900'
          >
            <div className='mb-4 flex justify-center'>{icon}</div>
            <h3 className='mb-2 text-xl font-semibold text-primary dark:text-white'>
              {title}
            </h3>
            <p className='text-muted-foreground text-sm'>{description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
