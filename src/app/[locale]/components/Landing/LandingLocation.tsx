// components/LandingLocation.tsx
'use client'

import Image from 'next/image'
import Link from 'next/link'
import { FiMapPin } from 'react-icons/fi'
import { useTranslations } from 'next-intl'

export default function LandingLocation() {
  const t = useTranslations('LandingLocation') // use namespace "Welcome"

  return (
    <section className='bg-[#0C0141] py-16 text-white'>
      <div className='mx-auto flex max-w-screen-xl flex-col-reverse items-center gap-12 px-6 lg:flex-row'>
        {/* Left Column */}
        <div className='lg:w-1/2'>
          <p className='mb-2 text-lg font-medium text-teal-400'>
            {t('Tagline')}
          </p>
          <h2 className='mb-6 text-4xl font-extrabold lg:text-5xl'>
            {t('Title')}
          </h2>
          <p className='mb-4 text-lg'>{t('Intro')}</p>
          <p className='mb-6 text-base text-gray-200'>{t('Description')}</p>
          <Link
            href='/location'
            className='inline-flex items-center rounded-md bg-pink-600 px-6 py-3 text-lg font-medium text-white transition hover:bg-pink-500'
          >
            <FiMapPin className='mr-2 text-xl' />
            {t('Button')}
          </Link>
        </div>

        {/* Right Column */}
        <div className='w-full lg:w-1/2'>
          <div className='overflow-hidden rounded-md shadow-lg'>
            <Image
              src='/images/welcome.jpg'
              alt={t('ImageAlt')}
              width={800}
              height={500}
              className='h-auto w-full object-cover'
            />
          </div>
        </div>
      </div>
    </section>
  )
}
