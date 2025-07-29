'use client'

import { Link } from '@/src/navigation'
import { useTranslations } from 'next-intl'

export default function LandingWelcome() {
  const t = useTranslations('LandingWelcome')

  return (
    <section
      className='relative flex min-h-[90vh] items-center justify-center bg-cover bg-center bg-no-repeat text-primary'
      style={{ backgroundImage: "url('/img/landing/ph8.jpg')" }}
    >
      {/* Optional background dimmer */}
      <div className='absolute inset-0 bg-black/10 dark:bg-black/30' />

      {/* Responsive box: white in light mode, dark in dark mode */}
      <div className='relative z-10 max-w-2xl rounded-xl bg-white/80 p-6 text-center shadow-lg backdrop-blur-sm dark:bg-black/40 sm:p-10'>
        <h1 className='text-3xl font-extrabold leading-tight text-black dark:text-white sm:text-4xl md:text-5xl'>
          <span className='bg-span-bg bg-clip-text text-transparent'>
            {t('Cascais')}
          </span>
          <br />
          {t('9_13_July')}
        </h1>

        <div className='my-4 text-base text-black/80 dark:text-white/80 sm:text-lg md:text-xl'>
          {t('5_days_40_teams_500_athletes_120_games')}
        </div>

        <div className='mt-4 flex flex-row justify-center gap-4'>
          <Link
            href='/program'
            className='hover:bg-primary/80 rounded bg-primary px-6 py-3 text-button-text transition'
          >
            {t('Program')}
          </Link>
        </div>
      </div>
    </section>
  )
}
