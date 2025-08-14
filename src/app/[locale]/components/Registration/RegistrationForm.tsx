'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

export default function RegistrationForm() {
  const t = useTranslations('RegistrationPage.Form')

  // Assets
  const BG = '/img/registration/hero-bg.png'
  const PLAYER_LEFT = '/img/registration/player-left.png'
  const PLAYER_RIGHT = '/img/registration/player.png'

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    club: '',
    city: '',
    country: '',
    questions: ''
  })

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (!res.ok) throw new Error('Network response failed.')

      const data = await res.json()

      if (data.success) {
        setMessage(t('SuccessMessage'))
        setFormData({
          name: '',
          email: '',
          mobile: '',
          club: '',
          city: '',
          country: '',
          questions: ''
        })
      } else {
        setMessage(t('ErrorMessage'))
      }
    } catch (error) {
      setMessage(t('ErrorMessage'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <section
      id='registration-form'
      className='relative overflow-hidden py-12 sm:py-16 lg:py-20'
    >
      {/* Background */}
      <Image
        src={BG}
        alt=''
        role='presentation'
        fill
        sizes='100vw'
        priority
        className='absolute inset-0 -z-20 object-cover'
      />

      {/* Players (desktop only) */}
      <div className='absolute inset-0 -z-10'>
        {/* Left player */}
        <div className='absolute left-0 top-1/2 hidden -translate-y-1/2 opacity-40 lg:block'>
          <Image
            src={PLAYER_LEFT}
            alt=''
            width={420}
            height={640}
            className='h-auto w-auto'
            priority
          />
        </div>
        {/* Right player */}
        <div className='absolute right-0 top-1/2 hidden -translate-y-1/2 opacity-40 lg:block'>
          <Image
            src={PLAYER_RIGHT}
            alt=''
            width={420}
            height={640}
            className='h-auto w-auto'
            priority
          />
        </div>
      </div>

      {/* Form container */}
      <div className='mx-auto max-w-screen-md rounded-2xl bg-white/95 p-6 shadow-lg ring-1 ring-black/10 backdrop-blur-sm'>
        <form onSubmit={handleSubmit} className='space-y-6'>
          <h2 className='mb-6 text-center text-2xl font-extrabold text-sky-600'>
            {t('FormTitle')}
          </h2>

          {/* Name */}
          <div>
            <label className='block font-medium'>
              {t('Name')} *
              <input
                type='text'
                name='name'
                value={formData.name}
                onChange={handleChange}
                className='mt-1 w-full rounded-md border border-slate-300 p-2 shadow-sm focus:border-sky-500 focus:ring-2 focus:ring-sky-300'
                placeholder={t('NamePlaceholder')}
                required
              />
            </label>
          </div>

          {/* Email + Mobile */}
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
            <label className='block font-medium'>
              Email *
              <input
                type='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                className='mt-1 w-full rounded-md border border-slate-300 p-2 shadow-sm focus:border-sky-500 focus:ring-2 focus:ring-sky-300'
                required
              />
            </label>
            <label className='block font-medium'>
              {t('Mobile')}
              <input
                type='tel'
                name='mobile'
                value={formData.mobile}
                onChange={handleChange}
                className='mt-1 w-full rounded-md border border-slate-300 p-2 shadow-sm focus:border-sky-500 focus:ring-2 focus:ring-sky-300'
              />
            </label>
          </div>

          {/* Club */}
          <div>
            <label className='block font-medium'>
              {t('Club')} *
              <input
                type='text'
                name='club'
                value={formData.club}
                onChange={handleChange}
                className='mt-1 w-full rounded-md border border-slate-300 p-2 shadow-sm focus:border-sky-500 focus:ring-2 focus:ring-sky-300'
                required
              />
            </label>
          </div>

          {/* City + Country */}
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
            <label className='block font-medium'>
              {t('City')} *
              <input
                type='text'
                name='city'
                value={formData.city}
                onChange={handleChange}
                className='mt-1 w-full rounded-md border border-slate-300 p-2 shadow-sm focus:border-sky-500 focus:ring-2 focus:ring-sky-300'
                required
              />
            </label>
            <label className='block font-medium'>
              {t('Country')} *
              <input
                type='text'
                name='country'
                value={formData.country}
                onChange={handleChange}
                className='mt-1 w-full rounded-md border border-slate-300 p-2 shadow-sm focus:border-sky-500 focus:ring-2 focus:ring-sky-300'
                required
              />
            </label>
          </div>

          {/* Questions */}
          <div>
            <label className='block font-medium'>
              {t('Questions')}
              <textarea
                name='questions'
                value={formData.questions}
                onChange={handleChange}
                rows={4}
                className='mt-1 w-full rounded-md border border-slate-300 p-2 shadow-sm focus:border-sky-500 focus:ring-2 focus:ring-sky-300'
              />
            </label>
          </div>

          {/* Submit */}
          <button
            type='submit'
            disabled={loading}
            className='inline-flex items-center justify-center rounded-full bg-sky-700 px-6 py-2 font-bold text-white shadow-lg ring-1 ring-black/10 hover:bg-sky-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 disabled:opacity-50'
          >
            {loading ? t('Submitting') : t('Submit')}
          </button>

          {message && (
            <div className='text-center text-sm text-slate-600'>{message}</div>
          )}
        </form>
      </div>
    </section>
  )
}
