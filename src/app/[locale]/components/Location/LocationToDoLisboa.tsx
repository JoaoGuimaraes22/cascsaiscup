'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'

export default function LocationToDoLisboa() {
  const t = useTranslations('LocationPage.LocationToDoLisboa')

  const items = [
    {
      title: t('BelemTowerTitle'),
      desc: t('BelemTowerDesc'),
      image: '/img/location/belem1.png'
    },
    {
      title: t('AlfamaTitle'),
      desc: t('AlfamaDesc'),
      image: '/img/location/alfama1.jpg'
    },
    {
      title: t('LXFactoryTitle'),
      desc: t('LXFactoryDesc'),
      image: '/img/location/lxfactory1.jpg'
    },
    {
      title: t('PenaPalaceTitle'),
      desc: t('PenaPalaceDesc'),
      image: '/img/location/pena1.jpg'
    },
    {
      title: t('MoorishCastleTitle'),
      desc: t('MoorishCastleDesc'),
      image: '/img/location/moorish1.jpg'
    },
    {
      title: t('QuintaRegaleiraTitle'),
      desc: t('QuintaRegaleiraDesc'),
      image: '/img/location/regaleira1.jpg'
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
            className='dark:bg-muted/30 rounded-xl bg-background p-4 text-center shadow-md transition hover:shadow-lg'
          >
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
