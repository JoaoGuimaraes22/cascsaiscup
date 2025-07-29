// components/LandingRegister.tsx
'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Link } from '@/src/navigation'

export default function LandingRegister() {
  const t = useTranslations('LandingRegister')

  return (
    <section className='bg-primary py-16 text-white'>
      <div className='mx-auto flex max-w-screen-xl flex-col-reverse items-center gap-12 px-6 md:flex-row md:justify-between'>
        {/* Text Block */}
        <div className='md:w-1/2'>
          <p className='text-accent mb-2 font-medium'>{t('Subtitle')}</p>
          <h2 className='mb-4 text-4xl font-bold'>{t('Title')}</h2>
          <p className='mb-8 whitespace-pre-line text-base'>
            {t('Description')}
          </p>
          <Link
            href='/registration'
            className='bg-accent inline-flex items-center rounded-md px-6 py-3 text-lg font-semibold text-white shadow transition hover:brightness-110'
          >
            {t('Button')} <span className='ml-2 text-xl'>➔</span>
          </Link>
        </div>

        {/* Image Block */}
        <div className='flex justify-center md:w-1/2'>
          <Image
            src='/landing/ph4.jpg'
            alt='Youth teams celebrating'
            width={600}
            height={400}
            className='h-auto max-w-full rounded-xl object-cover shadow-lg'
            priority
          />
        </div>
      </div>
    </section>
  )
}
