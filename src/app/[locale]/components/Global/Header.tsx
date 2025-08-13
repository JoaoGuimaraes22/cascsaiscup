'use client'

import { FC, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Link } from '@/src/navigation'
import { useTranslations } from 'next-intl'
import LangSwitcher from '../LangSwitcher'
import { FiMenu, FiX } from 'react-icons/fi'
import Image from 'next/image'
import Logo from '@/public/img/global/cascais-volley-cup-1.png'
import type { ValidPathname } from '@/src/navigation'

interface Props {
  locale: string
}

export const Header: FC<Props> = ({ locale }) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    if (menuOpen) setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    if (menuOpen) {
      const { overflow } = document.body.style
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = overflow
      }
    }
  }, [menuOpen])

  return (
    <header role='banner' className='relative z-[200] w-full bg-background'>
      <div className='mx-auto flex max-w-screen-2xl flex-col items-center justify-between px-3 py-2 sm:flex-row sm:px-5 sm:py-4'>
        {/* Logo */}
        <div className='flex w-full items-center justify-between sm:w-auto'>
          <Link lang={locale} href='/' aria-label='Cascais Volley Cup 2026'>
            <Image
              src={Logo}
              alt='Cascais Volley Cup 2026'
              priority
              sizes='(max-width: 640px) 150px, (max-width: 1024px) 190px, 240px'
              className='h-10 w-auto sm:h-12 md:h-14 lg:h-[4.5rem]' // ~72px max
            />
          </Link>

          {/* Lang + Mobile toggle (mobile only) */}
          <div className='flex items-center gap-3 sm:hidden'>
            <LangSwitcher />
            <button
              onClick={() => setMenuOpen(o => !o)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls='mobile-nav'
              className='rounded p-1'
            >
              {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Desktop nav */}
        <nav
          aria-label='Primary'
          className='hidden items-center gap-7 sm:inline-flex md:gap-8'
        >
          <NavLinks locale={locale} />
          <LangSwitcher />
        </nav>

        {/* Mobile dropdown menu */}
        <div
          id='mobile-nav'
          aria-hidden={!menuOpen}
          className={`w-full flex-col items-start gap-4 overflow-hidden transition-all ease-in-out motion-safe:duration-300 sm:hidden
            ${
              menuOpen
                ? 'mt-3 flex max-h-[65vh] translate-y-0 opacity-100'
                : 'pointer-events-none max-h-0 -translate-y-2 opacity-0'
            }
          `}
        >
          <NavLinks locale={locale} isMobile />
        </div>
      </div>
    </header>
  )
}

function NavLinks({
  locale,
  isMobile = false
}: {
  locale: string
  isMobile?: boolean
}) {
  const t = useTranslations('Header')
  const pathname = usePathname()

  const links: { href: ValidPathname; label: string }[] = [
    { href: '/about', label: t('About') },
    { href: '/accommodation', label: t('Accommodation') },
    { href: '/program', label: t('Program') },
    { href: '/competition', label: t('Competition') },
    { href: '/gallery', label: t('Gallery') },
    { href: '/hall-of-fame', label: t('Hall_of_Fame') }
  ]

  const isActive = (href: string) => {
    const withLocale = `/${locale}${href}`
    return pathname === withLocale || pathname.startsWith(`${withLocale}/`)
  }

  return (
    <>
      {links.map(({ href, label }) => {
        const active = isActive(href)
        return (
          <Link
            key={href}
            lang={locale}
            href={href}
            className={`group relative pb-0.5 font-medium transition-colors hover:text-primary
              ${active ? 'text-primary' : 'text-muted-foreground'}
              ${isMobile ? 'block w-full text-sm' : 'text-sm md:text-[15px]'}
            `}
          >
            {label}
            <span
              className={`absolute bottom-0 left-0 h-px w-full origin-left transform bg-primary
                motion-safe:transition-transform motion-safe:duration-300
                ${active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}
              `}
            />
          </Link>
        )
      })}
    </>
  )
}
