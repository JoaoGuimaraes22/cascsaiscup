'use client'

import {
  FC,
  useEffect,
  useState,
  MouseEvent,
  startTransition,
  useLayoutEffect,
  useRef
} from 'react'
import { usePathname, useRouter } from 'next/navigation'
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

type StaticPathname = Exclude<ValidPathname, '/gallery/[year]'>
const HEADER_BG = '/img/footer/footer-bg.png'

export const Header: FC<Props> = ({ locale }) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const headerRef = useRef<HTMLElement | null>(null)

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  // Lock page scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      const { overflow } = document.body.style
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = overflow
      }
    }
  }, [menuOpen])

  // Dynamically sync --header-h with current header height
  const syncHeaderHeight = () => {
    const h = headerRef.current?.offsetHeight ?? 0
    document.documentElement.style.setProperty('--header-h', `${h}px`)
  }

  useLayoutEffect(() => {
    syncHeaderHeight()
    if (!headerRef.current) return
    const ro = new ResizeObserver(syncHeaderHeight)
    ro.observe(headerRef.current)
    return () => ro.disconnect()
  }, [])

  // Re-measure after mobile menu transition (300ms in your classes)
  useEffect(() => {
    const id = setTimeout(syncHeaderHeight, 320)
    return () => clearTimeout(id)
  }, [menuOpen])

  const handleLogoClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const isHome = pathname === `/${locale}` || pathname === `/${locale}/`
    if (isHome) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant' as ScrollBehavior
      })
      return
    }
    startTransition(() => {
      router.push('/', { scroll: false })
      requestAnimationFrame(() => {
        window.scrollTo(0, 0)
        setTimeout(() => window.scrollTo(0, 0), 0)
      })
    })
  }

  return (
    <header
      ref={headerRef}
      role='banner'
      className='fixed inset-x-0 top-0 z-[200] w-full bg-slate-100 shadow-md'
      style={{
        backgroundImage: `url(${HEADER_BG})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className='mx-auto flex max-w-screen-2xl flex-col items-center justify-between px-3 py-2 sm:flex-row sm:px-5 sm:py-4'>
        {/* Logo */}
        <div className='ml-1 flex w-full items-center justify-between sm:ml-3 sm:w-auto md:ml-6'>
          <Link
            lang={locale}
            href='/'
            aria-label='Cascais Volley Cup 2026'
            onClick={handleLogoClick}
          >
            <Image
              src={Logo}
              alt='Cascais Volley Cup 2026'
              priority
              sizes='(max-width: 640px) 150px, (max-width: 1024px) 190px, 240px'
              className='h-10 w-auto sm:h-12 md:h-14 lg:h-[4.5rem]'
            />
          </Link>

          {/* Lang + Mobile menu button */}
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

        {/* Mobile dropdown */}
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

  const links: { href: StaticPathname; label: string; cta?: boolean }[] = [
    { href: '/about', label: t('About') },
    { href: '/accommodation', label: t('Accommodation') },
    { href: '/program', label: t('Program') },
    { href: '/competition', label: t('Competition') },
    { href: '/gallery', label: t('Gallery') },
    { href: '/hall-of-fame', label: t('Hall_of_Fame') },
    { href: '/registration', label: t('Registration'), cta: true }
  ]

  const isActive = (href: string) => {
    const withLocale = `/${locale}${href}`
    return pathname === withLocale || pathname.startsWith(withLocale + '/')
  }

  return (
    <>
      {links.map(({ href, label, cta }) => {
        const active = isActive(href)
        if (cta) {
          return (
            <Link
              key={href}
              lang={locale}
              href={href}
              aria-current={active ? 'page' : undefined}
              aria-label={label}
              className={clsx(
                'inline-flex items-center font-semibold shadow-sm motion-safe:transition-colors motion-safe:duration-200',
                isMobile
                  ? 'w-full justify-center rounded-md px-3 py-2 text-sm'
                  : 'rounded-full px-4 py-1.5 text-xs md:text-sm',
                active
                  ? 'bg-sky-800 text-white'
                  : 'bg-sky-700 text-white hover:bg-sky-800 focus-visible:bg-sky-800',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300'
              )}
            >
              {label}
            </Link>
          )
        }
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
            aria-current={active ? 'page' : undefined}
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
