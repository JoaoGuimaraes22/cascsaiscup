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
import clsx from 'clsx'

interface Props {
  locale: string
}

/** Exclude the dynamic route so Header links stay static-only */
type StaticPathname = Exclude<ValidPathname, '/gallery/[year]'>

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
    <header role='banner' className='relative z-[200] w-full bg-slate-100'>
      <div className='mx-auto flex max-w-screen-2xl flex-col items-center justify-between px-3 py-2 sm:flex-row sm:px-5 sm:py-4'>
        {/* Logo (nudged right) */}
        <div className='ml-1 flex w-full items-center justify-between sm:ml-3 sm:w-auto md:ml-6'>
          <Link lang={locale} href='/' aria-label='Cascais Volley Cup 2026'>
            <Image
              src={Logo}
              alt='Cascais Volley Cup 2026'
              priority
              sizes='(max-width: 640px) 150px, (max-width: 1024px) 190px, 240px'
              className='h-10 w-auto sm:h-12 md:h-14 lg:h-[4.5rem]'
            />
          </Link>

          {/* Lang + Mobile toggle (mobile only) */}
          <div className='flex items-center gap-3 sm:hidden'>
            <LangButton />
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
          <LangButton />
        </nav>

        {/* Mobile dropdown menu (site nav) */}
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

  const links: { href: StaticPathname; label: string }[] = [
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
            className={clsx(
              'group relative pb-0.5 font-medium transition-colors hover:text-sky-700',
              active ? 'text-sky-700' : 'text-slate-600',
              isMobile ? 'block w-full text-xs' : 'text-xs md:text-sm'
            )}
          >
            {label}
            <span
              className={clsx(
                'absolute bottom-0 left-0 h-px w-full origin-left transform bg-sky-700',
                'motion-safe:transition-transform motion-safe:duration-300',
                active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
              )}
            />
          </Link>
        )
      })}
    </>
  )
}

function LangButton({ className }: { className?: string }) {
  return (
    <span
      className={clsx(
        'lang-sky inline-flex items-center rounded-md bg-sky-700 px-3 py-1.5 text-sm font-medium text-white shadow-sm',
        'focus-within:outline-none focus-within:ring-2 focus-within:ring-sky-300',
        className
      )}
    >
      <LangSwitcher />
    </span>
  )
}
