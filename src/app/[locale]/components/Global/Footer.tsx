'use client'

import Image from 'next/image'
import { Link } from '@/src/navigation'
import { FiMail, FiPhone } from 'react-icons/fi'
import { FaFacebookF, FaInstagram } from 'react-icons/fa'
import clsx from 'clsx'

interface Props {
  locale: string
}

export default function Footer({ locale }: Props) {
  const LOGO = '/img/global/cascais-volley-cup-1.png'

  // All 6 sponsors in one list (renders as 2x3 on mobile, 3x2 on >=sm)
  const SPONSORS = [
    { src: '/img/sponsors/cam-ford.png', alt: 'C.A.M. Ford', w: 220, h: 80 },
    {
      src: '/img/sponsors/cascais-camara.png',
      alt: 'Cascais Câmara Municipal',
      w: 220,
      h: 80
    },
    {
      src: '/img/sponsors/fpv.png',
      alt: 'Federação Portuguesa de Voleibol',
      w: 220,
      h: 80
    },
    {
      src: '/img/sponsors/cascais-estoril.png',
      alt: 'Cascais Estoril',
      w: 220,
      h: 80
    },
    {
      src: '/img/sponsors/volley4all.png',
      alt: 'Volley4All Sparrows',
      w: 220,
      h: 80
    },
    { src: '/img/sponsors/cam-ford.png', alt: 'Ford CAM', w: 220, h: 80 }
  ]

  const EMAIL = 'info@cascaisvolleycup.com'
  const FACEBOOK_URL = 'https://www.facebook.com/cascaisvolleycup'
  const INSTAGRAM_URL = 'https://www.instagram.com/cascaisvolleycup'

  return (
    <footer
      role='contentinfo'
      className="relative w-full border-t border-slate-200/60 bg-slate-100/95 bg-[url('/img/footer/footer-bg.png')] bg-cover bg-center backdrop-blur"
    >
      <div className='mx-auto max-w-screen-lg px-4 py-8 sm:py-10'>
        {/* Row 1 — stacks on mobile (1 col, 3 rows), 3 cols on >=sm */}
        <div className='grid grid-cols-1 items-center gap-6 sm:grid-cols-3'>
          {/* Left: Logo */}
          <div className='justify-self-center sm:justify-self-start'>
            <Link lang={locale} href='/' aria-label='Cascais Volley Cup - Home'>
              <Image
                src={LOGO}
                alt='Cascais Volley Cup'
                width={200}
                height={72}
                className='h-10 w-auto sm:h-12 md:h-14'
              />
            </Link>
          </div>

          {/* Center: icon buttons */}
          <div className='flex items-center justify-center gap-3'>
            <IconBtn
              as={Link}
              href='/contact'
              lang={locale}
              ariaLabel='Contact'
              title='Contact'
            >
              <FiPhone className='h-4 w-4' />
            </IconBtn>
            <IconBtn
              as='a'
              href={`mailto:${EMAIL}`}
              ariaLabel='Send email'
              title={EMAIL}
            >
              <FiMail className='h-4 w-4' />
            </IconBtn>
            <IconBtn
              as='a'
              href={FACEBOOK_URL}
              ariaLabel='Facebook'
              title='Facebook'
              rel='noopener noreferrer'
              target='_blank'
            >
              <FaFacebookF className='h-4 w-4' />
            </IconBtn>
            <IconBtn
              as='a'
              href={INSTAGRAM_URL}
              ariaLabel='Instagram'
              title='Instagram'
              rel='noopener noreferrer'
              target='_blank'
            >
              <FaInstagram className='h-4 w-4' />
            </IconBtn>
          </div>

          {/* Right: Registration CTA */}
          <div className='justify-self-center sm:justify-self-end'>
            <Link
              lang={locale}
              href='/registration'
              className='inline-flex items-center rounded-full bg-sky-700 px-4 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-black/10 hover:bg-sky-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300'
              aria-label='Registration'
            >
              Registration
            </Link>
          </div>
        </div>

        {/* Divider */}
        <div className='my-6 h-px w-full bg-slate-300/60' />

        {/* Sponsors — 2x3 on mobile, 3x2 on >=sm */}
        <div className='mx-auto grid max-w-screen-lg grid-cols-2 items-center justify-items-center gap-6 sm:grid-cols-3'>
          {SPONSORS.map((s, i) => (
            <div key={i} className='opacity-90 transition hover:opacity-100'>
              <Image
                src={s.src}
                alt={s.alt}
                width={s.w}
                height={s.h}
                className='h-auto w-auto object-contain'
                sizes='(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 220px'
              />
            </div>
          ))}
        </div>

        {/* Tiny meta */}
        <div className='mt-6 text-center text-xs text-slate-500'>
          © {new Date().getFullYear()} Cascais Volley Cup. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

/* Helpers */

type IconBtnProps =
  | {
      as: typeof Link
      href: string
      lang: string
      ariaLabel: string
      title?: string
      className?: string
      rel?: string
      target?: string
      children: React.ReactNode
    }
  | {
      as: 'a'
      href: string
      ariaLabel: string
      title?: string
      className?: string
      rel?: string
      target?: string
      children: React.ReactNode
    }

function IconBtn(props: IconBtnProps) {
  const base =
    'inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-sky-700 shadow-sm ring-1 ring-slate-300 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300'
  if (props.as === 'a') {
    const { href, ariaLabel, title, className, rel, target, children } = props
    return (
      <a
        href={href}
        aria-label={ariaLabel}
        title={title}
        className={clsx(base, className)}
        rel={rel}
        target={target}
      >
        {children}
      </a>
    )
  }
  const { href, lang, ariaLabel, title, className, children } = props
  return (
    <Link
      href={href as any}
      lang={lang}
      aria-label={ariaLabel}
      title={title}
      className={clsx(base, className)}
    >
      {children}
    </Link>
  )
}
