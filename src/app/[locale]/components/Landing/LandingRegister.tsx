'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Link } from '@/src/navigation'

export default function LandingRegister() {
  const t = useTranslations('LandingPage.LandingRegister')

  return (
    <section className='bg-[#0C0141] py-20 text-white'>
      <div className='mx-auto flex max-w-screen-xl flex-col-reverse items-center gap-12 px-6 md:flex-row md:justify-between'>
        {/* Text Content */}
        <div className='text-center md:w-1/2 md:text-left'>
          <p className='text-accent mb-2 text-sm font-medium'>
            {t('Subtitle')}
          </p>
          <h2 className='mb-4 text-4xl font-bold leading-tight'>
            {t('Title')}
          </h2>
          <p className='mb-8 whitespace-pre-line text-base opacity-90'>
            {t('Description')}
          </p>
          <Link
            href='/registration'
            className='inline-flex items-center justify-center rounded-md bg-[#00A9C9] px-6 py-3 text-lg font-semibold text-white shadow transition hover:brightness-110'
          >
            {t('Button')} <span className='ml-2 text-xl'>➔</span>
          </Link>
        </div>

        {/* Image */}
        <div className='flex justify-center md:w-1/2'>
          <Image
            src='/img/landing/ph4.jpg'
            alt='Youth teams celebrating'
            width={600}
            height={400}
            className='h-auto w-full max-w-md rounded-xl object-cover shadow-xl'
            priority
          />
        </div>
      </div>
    </section>
  )
}
