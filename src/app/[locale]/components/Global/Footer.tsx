// components/Global/Footer.tsx
'use client'

import { Link } from '@/src/navigation'
import { useTranslations } from 'next-intl'
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa'

export default function Footer() {
  const t = useTranslations('Footer')

  return (
    <footer className='bg-primary text-white'>
      <div className='mx-auto grid max-w-screen-xl grid-cols-1 gap-10 px-6 py-12 sm:grid-cols-2 md:grid-cols-4'>
        {/* Section 1 */}
        <div>
          <h3 className='mb-4 font-semibold uppercase tracking-wide'>
            {t('Section1.Title')}
          </h3>
          <ul className='space-y-2 text-sm'>
            <li>
              <Link href='/about'>{t('Section1.About')}</Link>
            </li>
            <li>
              <Link href='/hall-of-fame'>{t('Section1.HallOfFame')}</Link>
            </li>
            <li>
              <Link href='/location'>{t('Section1.Location')}</Link>
            </li>
            <li>
              <Link href='/merchandise'>{t('Section1.Merchandise')}</Link>
            </li>
          </ul>
        </div>

        {/* Section 2 */}
        <div>
          <h3 className='mb-4 font-semibold uppercase tracking-wide'>
            {t('Section2.Title')}
          </h3>
          <ul className='space-y-2 text-sm'>
            <li>
              <Link href='/program'>{t('Section2.Program')}</Link>
            </li>
            <li>
              <Link href='/registration'>{t('Section2.Registration')}</Link>
            </li>
            <li>
              <a href='#'>{t('Section2.Regulation')}</a>
            </li>
            <li>
              <a href='#'>{t('Section2.WinterCup')}</a>
            </li>
          </ul>
        </div>

        {/* Section 3 */}
        <div>
          <h3 className='mb-4 font-semibold uppercase tracking-wide'>
            {t('Section3.Title')}
          </h3>
          <ul className='space-y-2 text-sm'>
            <li>
              <a href='#'>{t('Section3.Services')}</a>
            </li>
            <li>
              <Link href='/news'>{t('Section3.News')}</Link>
            </li>
            <li>
              <a href='#'>{t('Section3.Partners')}</a>
            </li>
            <li>
              <a href='#'>{t('Section3.PressKits')}</a>
            </li>
          </ul>
        </div>

        {/* Section 4 - Contact */}
        <div>
          <h3 className='mb-4 font-semibold uppercase tracking-wide'>
            {t('Section4.Title')}
          </h3>
          <div className='mb-4 flex space-x-3'>
            <a href='#' className='rounded bg-white p-2 text-primary'>
              <FaFacebookF size={18} />
            </a>
            <a href='#' className='rounded bg-white p-2 text-primary'>
              <FaInstagram size={18} />
            </a>
            <a href='#' className='rounded bg-white p-2 text-primary'>
              <FaLinkedinIn size={18} />
            </a>
          </div>
          <div className='text-sm'>
            <p>info@cascaisvolleycup.com</p>
            <p>+351 912 345 678</p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className='bg-gray-600 py-4 text-center text-sm text-white'>
        © {new Date().getFullYear()} Cascais Volley Cup — All rights reserved
      </div>
    </footer>
  )
}
