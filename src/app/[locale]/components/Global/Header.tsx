'use client'

import { FC, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Link } from '@/src/navigation'
import { useTranslations } from 'next-intl'
import LogoIcon from '../../../icons/logo'
import LangSwitcher from '../LangSwitcher'
import ThemeSwitch from '../ThemeSwitch'
import { FiMenu, FiX } from 'react-icons/fi'

interface Props {
  locale: string
}

export const Header: FC<Props> = ({ locale }) => {
  const t = useTranslations('Header')
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header
      role='banner'
      className='relative z-20 mx-auto flex max-w-screen-2xl flex-col items-center justify-between p-5 sm:flex-row'
    >
      {/* Logo and title */}
      <div className='flex w-full items-center justify-between sm:w-auto'>
        <Link lang={locale} href='/'>
          <div className='flex flex-row items-center'>
            <div className='flex h-14 w-14 items-center'>
              <LogoIcon />
            </div>
            <div className='mx-2 flex select-none flex-col leading-tight'>
              <span className='text-lg font-bold sm:text-xl'>Cascais</span>
              <span className='text-muted-foreground text-sm'>
                Volley Cup 2026
              </span>
            </div>
          </div>
        </Link>

        {/* Theme + Lang + Mobile toggle (mobile only) */}
        <div className='flex items-center gap-4 sm:hidden'>
          <ThemeSwitch />
          <LangSwitcher />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <FiX size={26} /> : <FiMenu size={26} />}
          </button>
        </div>
      </div>

      {/* Desktop nav */}
      <nav className='hidden items-center gap-10 sm:inline-flex'>
        <NavLinks locale={locale} t={t} />
        <ThemeSwitch />
        <LangSwitcher />
      </nav>

      {/* Mobile dropdown menu */}
      <div
        className={`w-full flex-col items-start gap-4 overflow-hidden transition-all duration-300 ease-in-out sm:hidden ${
          menuOpen
            ? 'mt-4 flex max-h-screen translate-y-0 opacity-100'
            : 'pointer-events-none max-h-0 -translate-y-2 opacity-0'
        }`}
      >
        <NavLinks locale={locale} t={t} closeMenu={() => setMenuOpen(false)} />
      </div>
    </header>
  )
}

// Navigation links with underline behavior
const NavLinks = ({
  locale,
  t,
  closeMenu
}: {
  locale: string
  t: ReturnType<typeof useTranslations>
  closeMenu?: () => void
}) => {
  const pathname = usePathname()

  const links = [
    { href: '/about', label: t('About') },
    { href: '/hall-of-fame', label: t('Hall_of_Fame') },
    { href: '/program', label: t('Program') },
    { href: '/photos', label: t('Photos') },
    { href: '/registration', label: t('Registration') }
  ] as const

  return (
    <>
      {links.map(link => {
        const isActive = pathname?.includes(link.href)

        return (
          <Link
            key={link.href}
            lang={locale}
            href={link.href}
            onClick={closeMenu}
            className={`group relative pb-1 font-medium transition-colors hover:text-primary ${
              isActive ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            {link.label}
            <span
              className={`absolute bottom-0 left-0 h-[2px] w-full origin-left transform bg-primary transition-transform duration-300 ${
                isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
              }`}
            />
          </Link>
        )
      })}
    </>
  )
}
