'use client'

import { useTranslations } from 'next-intl'
import { FaCalendarAlt, FaUsers, FaGlobeEurope } from 'react-icons/fa'

export default function ProgramDetails() {
  const t = useTranslations('ProgramPage.ProgramDetails')

  return (
    <section className='bg-background py-20 text-primary'>
      <div className='mx-auto max-w-6xl px-6 text-center'>
        <h2 className='text-4xl font-extrabold'>{t('title')}</h2>

        <div className='mt-12 grid grid-cols-1 gap-8 md:grid-cols-3'>
          {/* Categories */}
          <div className='rounded-2xl bg-white p-8 shadow-lg dark:bg-slate-900'>
            <FaUsers className='mb-4 text-4xl text-blue-600' />
            <h3 className='mb-2 text-xl font-bold text-blue-700'>
              {t('categories.title')}
            </h3>
            <ul className='text-left text-gray-700 dark:text-gray-300'>
              <li>{t('categories.b19')}</li>
              <li>{t('categories.g19')}</li>
              <li>{t('categories.b17')}</li>
              <li>{t('categories.g17')}</li>
            </ul>
          </div>

          {/* Where */}
          <div className='rounded-2xl bg-white p-8 shadow-lg dark:bg-slate-900'>
            <FaGlobeEurope className='mb-4 text-4xl text-blue-600' />
            <h3 className='mb-2 text-xl font-bold text-blue-700'>
              {t('where.title')}
            </h3>
            <p className='text-gray-700 dark:text-gray-300'>
              {t('where.description')}
            </p>
          </div>

          {/* When */}
          <div className='rounded-2xl bg-white p-8 shadow-lg dark:bg-slate-900'>
            <FaCalendarAlt className='mb-4 text-4xl text-blue-600' />
            <h3 className='mb-2 text-xl font-bold text-blue-700'>
              {t('when.title')}
            </h3>
            <p className='text-gray-700 dark:text-gray-300'>
              {t('when.dates')}
            </p>
            <p className='text-gray-700 dark:text-gray-300'>{t('when.note')}</p>
            <p className='mt-2 text-sm italic text-gray-500 dark:text-gray-400'>
              {t('when.previous')}
              <br />
              {t('when.next')}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
