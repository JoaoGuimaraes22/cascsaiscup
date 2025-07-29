'use client'
import { Link } from '@/src/navigation'
import { useTranslations } from 'next-intl'
import { FC } from 'react'
import LogoIcon from '../../../icons/logo'
import LangSwitcher from '../LangSwitcher'
import ThemeSwitch from '../ThemeSwitch'
interface Props {
  locale: string
}
export const Header: FC<Props> = ({ locale }) => {
  const t = useTranslations('')
  return (
    <div className='relative z-20 mx-auto flex max-w-screen-2xl flex-row items-center justify-between p-5'>
      <Link lang={locale} href='/'>
        <div className='flex flex-row items-center'>
          <div className='mb-2 h-14 w-14'>
            <LogoIcon />
          </div>
          <strong className='mx-2 select-none'>Cascais Volley Cup 2026</strong>
        </div>
      </Link>
      <div className='flex flex-row items-center gap-3'>
        <nav className='mr-10 inline-flex gap-14'>
          <Link lang={locale} href={`/about`}>
            {t('About')}
          </Link>
          <Link lang={locale} href={`/hall-of-fame`}>
            {t('Hall_of_Fame')}
          </Link>
          <Link lang={locale} href={`/program`}>
            {t('Program')}
          </Link>
          <Link lang={locale} href={`/photos`}>
            {t('Photos')}
          </Link>
          <Link lang={locale} href={`/registration`}>
            {t('Registration')}
          </Link>
        </nav>
        <ThemeSwitch />
        <LangSwitcher />
      </div>
    </div>
  )
}
