// components/Forms/RegistrationForm.tsx
'use client'

import { useTranslations } from 'next-intl'
import { useState } from 'react'

export default function RegistrationForm() {
  const t = useTranslations('RegistrationPage')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    club: '',
    city: '',
    country: '',
    questions: ''
  })

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <form className='space-y-6'>
      <div>
        <label className='font-medium'>
          {t('Name')} *
          <input
            type='text'
            name='name'
            value={formData.name}
            onChange={handleChange}
            className='mt-1 w-full rounded border p-2'
            placeholder={t('NamePlaceholder')}
            required
          />
        </label>
      </div>

      <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
        <label className='font-medium'>
          Email *
          <input
            type='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            className='mt-1 w-full rounded border p-2'
            required
          />
        </label>
        <label className='font-medium'>
          {t('Mobile')}
          <input
            type='text'
            name='mobile'
            value={formData.mobile}
            onChange={handleChange}
            className='mt-1 w-full rounded border p-2'
          />
        </label>
      </div>

      <div>
        <label className='font-medium'>
          {t('Club')} *
          <input
            type='text'
            name='club'
            value={formData.club}
            onChange={handleChange}
            className='mt-1 w-full rounded border p-2'
            required
          />
        </label>
      </div>

      <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
        <label className='font-medium'>
          {t('City')} *
          <input
            type='text'
            name='city'
            value={formData.city}
            onChange={handleChange}
            className='mt-1 w-full rounded border p-2'
            required
          />
        </label>
        <label className='font-medium'>
          {t('Country')} *
          <input
            type='text'
            name='country'
            value={formData.country}
            onChange={handleChange}
            className='mt-1 w-full rounded border p-2'
            required
          />
        </label>
      </div>

      <div>
        <label className='font-medium'>
          {t('Questions')}
          <textarea
            name='questions'
            value={formData.questions}
            onChange={handleChange}
            className='mt-1 w-full rounded border p-2'
            rows={4}
          />
        </label>
      </div>

      <div className='my-4'>
        <div className='text-muted rounded border bg-background p-4 text-center text-sm'>
          [ reCAPTCHA will go here ]
        </div>
      </div>

      <button
        type='submit'
        className='hover:bg-primary/80 rounded bg-primary px-6 py-2 text-white transition'
      >
        {t('Submit')}
      </button>
    </form>
  )
}
