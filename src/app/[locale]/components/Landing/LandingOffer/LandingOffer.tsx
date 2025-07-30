'use client'

import OfferCard from './OfferCard'
import { useTranslations } from 'next-intl'
import type { ValidPathname } from '@/src/navigation'

export default function LandingOffer() {
  const t = useTranslations('LandingPage.LandingOffer')

  const offers: {
    title: string
    description: string
    buttonLabel: string
    link: ValidPathname
    image: string
  }[] = [
    {
      title: t('Card1.Title'),
      description: t('Card1.Description'),
      buttonLabel: t('Card1.Button'),
      link: '/hall-of-fame',
      image: '/img/landing/talents1.jpg'
    },
    {
      title: t('Card2.Title'),
      description: t('Card2.Description'),
      buttonLabel: t('Card2.Button'),
      link: '/about',
      image: '/img/landing/talents2.jpg'
    },
    {
      title: t('Card3.Title'),
      description: t('Card3.Description'),
      buttonLabel: t('Card3.Button'),
      link: '/hall-of-fame',
      image: '/img/landing/talents3.jpg'
    }
  ]

  return (
    <section className='bg-white py-16 transition-colors duration-300 dark:bg-background'>
      <div className='mx-auto max-w-screen-xl px-6'>
        <h2 className='mb-12 text-center text-4xl font-bold text-primary dark:text-white'>
          {t('Title')}
        </h2>
        <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
          {offers.map((card, i) => (
            <OfferCard key={i} {...card} />
          ))}
        </div>
      </div>
    </section>
  )
}
