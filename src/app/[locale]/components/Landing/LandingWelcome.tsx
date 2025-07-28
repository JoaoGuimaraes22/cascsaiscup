// components/LandingWelcome.tsx
'use client'

import { Link } from '@/src/navigation'
import { useTranslations } from 'next-intl'

export default function LandWelcome() {
  const t = useTranslations('LandingWelcome')

  return (
    <section className='flex flex-col items-center justify-center bg-background py-24 text-primary'>
      <h1 className='text-center text-7xl font-extrabold leading-tight'>
        <span className='bg-span-bg bg-clip-text text-transparent'>
          {t('Cascais')}
        </span>
        <br />
        {t('9_13_July')}
      </h1>
      <div className='my-6 px-20 text-center text-2xl text-text-secondary'>
        {t('5_days_40_teams_500_athletes_120_games')}
      </div>
      <div className='mt-4 flex flex-row gap-4'>
        <Link
          href='/program'
          className='hover:bg-primary/80 rounded bg-primary px-6 py-3 text-button-text transition'
        >
          {t('Program')}
        </Link>
      </div>
    </section>
  )
}
