'use client'

import { useTranslations } from 'next-intl'

export default function ProgramIntro() {
  const t = useTranslations('ProgramPage')

  return (
    <section
      id='program-intro'
      className='text-text-primary bg-background px-6 py-16 text-center'
    >
      <p className='text-accent mb-2 text-lg font-semibold'>
        {t('intro_location')}
      </p>
      <h2 className='mb-4 text-4xl font-extrabold'>{t('intro_title')}</h2>
      <div className='bg-border mx-auto mb-6 h-[2px] w-20' />
      <p className='mx-auto max-w-3xl text-lg leading-relaxed text-text-secondary'>
        {t('intro_paragraph_1')}
      </p>
      <p className='mx-auto mt-4 max-w-3xl text-lg leading-relaxed text-text-secondary'>
        {t('intro_paragraph_2')}
      </p>
    </section>
  )
}
