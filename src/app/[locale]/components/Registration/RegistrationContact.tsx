'use client'

import { useTranslations } from 'next-intl'
import { FiPhone, FiMail } from 'react-icons/fi'

export default function RegistrationContact() {
  const t = useTranslations('RegistrationPage.RegistrationContact')

  return (
    <section className='mx-auto max-w-3xl px-4 py-16 text-center'>
      <p className='mb-2 text-sm font-medium text-secondary'>{t('Subtitle')}</p>
      <h2 className='mb-6 text-3xl font-bold text-primary'>{t('Title')}</h2>
      <div className='text-muted-foreground space-y-4'>
        <p className='flex items-center justify-center gap-2 text-base'>
          <FiPhone className='text-xl text-primary' />
          +351 966 123 456
        </p>
        <p className='flex items-center justify-center gap-2 text-base'>
          <FiMail className='text-xl text-primary' />
          info@cascaisvolleycup.com
        </p>
      </div>
    </section>
  )
}
