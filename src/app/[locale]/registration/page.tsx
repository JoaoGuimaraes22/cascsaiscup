// Registration Page

import { useTranslations } from 'next-intl'
import RegistrationForm from '../components/Registration/RegistrationForm'

export default function About() {
  const t = useTranslations('RegistrationPage')
  return (
    <section className='mx-auto max-w-3xl px-4 py-12'>
      <h1 className='mb-2 text-4xl font-bold text-primary'>{t('Title')}</h1>
      <p className='mb-8 text-sm text-text-secondary'>{t('Description')}</p>
      <RegistrationForm />
    </section>
  )
}
