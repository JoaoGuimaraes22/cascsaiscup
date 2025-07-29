'use client'

import { Link } from '@/src/navigation'
import { useTranslations } from 'next-intl'
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa'

export default function Footer() {
  const t = useTranslations('Footer')

  return (
    <footer className='bg-primary text-white dark:bg-background dark:text-white'>
      <div className='mx-auto grid max-w-screen-xl grid-cols-1 gap-10 px-6 py-12 sm:grid-cols-2 md:grid-cols-4'>
        {/* Section 1 */}
        <div>
          <h3 className='mb-4 font-semibold uppercase tracking-wide'>
            {t('Section1.Title')}
          </h3>
          <ul className='space-y-2 text-sm'>
            <li>
              <Link href='/about' className='transition hover:underline'>
                {t('Section1.About')}
              </Link>
            </li>
            <li>
              <Link href='/hall-of-fame' className='transition hover:underline'>
                {t('Section1.HallOfFame')}
              </Link>
            </li>
            <li>
              <Link href='/location' className='transition hover:underline'>
                {t('Section1.Location')}
              </Link>
            </li>
            <li>
              <Link href='/merchandise' className='transition hover:underline'>
                {t('Section1.Merchandise')}
              </Link>
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
              <Link href='/program' className='transition hover:underline'>
                {t('Section2.Program')}
              </Link>
            </li>
            <li>
              <Link href='/registration' className='transition hover:underline'>
                {t('Section2.Registration')}
              </Link>
            </li>
            <li>
              <a href='#' className='transition hover:underline'>
                {t('Section2.Regulation')}
              </a>
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
              <a href='#' className='transition hover:underline'>
                {t('Section3.Services')}
              </a>
            </li>
            <li>
              <Link href='/news' className='transition hover:underline'>
                {t('Section3.News')}
              </Link>
            </li>
            <li>
              <a href='#' className='transition hover:underline'>
                {t('Section3.Partners')}
              </a>
            </li>
            <li>
              <a href='#' className='transition hover:underline'>
                {t('Section3.Photos_&_Media')}
              </a>
            </li>
          </ul>
        </div>

        {/* Section 4 - Contact */}
        <div>
          <h3 className='mb-4 font-semibold uppercase tracking-wide'>
            {t('Section4.Title')}
          </h3>

          <div className='mb-4 flex space-x-3'>
            <a
              href='#'
              target='_blank'
              rel='noopener noreferrer'
              aria-label='Facebook'
              className='rounded bg-white p-2 text-primary transition hover:bg-gray-100 dark:text-black dark:hover:bg-gray-200'
            >
              <FaFacebookF size={18} />
            </a>
            <a
              href='#'
              target='_blank'
              rel='noopener noreferrer'
              aria-label='Instagram'
              className='rounded bg-white p-2 text-primary transition hover:bg-gray-100 dark:text-black dark:hover:bg-gray-200'
            >
              <FaInstagram size={18} />
            </a>
            <a
              href='#'
              target='_blank'
              rel='noopener noreferrer'
              aria-label='LinkedIn'
              className='rounded bg-white p-2 text-primary transition hover:bg-gray-100 dark:text-black dark:hover:bg-gray-200'
            >
              <FaLinkedinIn size={18} />
            </a>
          </div>

          <address className='text-sm not-italic'>
            <p>
              <a
                href='mailto:info@cascaisvolleycup.com'
                className='transition hover:underline'
              >
                info@cascaisvolleycup.com
              </a>
            </p>
            <p>
              <a
                href='tel:+351912345678'
                className='transition hover:underline'
              >
                +351 912 345 678
              </a>
            </p>
          </address>
        </div>
      </div>

      {/* Bottom bar */}
      <div className='border-t border-white/20 bg-primary py-4 text-center text-sm text-white dark:border-white/30 dark:bg-background'>
        © {new Date().getFullYear()} Cascais Volley Cup — All rights reserved
      </div>
    </footer>
  )
}
