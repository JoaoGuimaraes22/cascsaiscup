// About Page

import { useTranslations } from 'next-intl'
import AboutHero from '../components/About/AboutHero'
import AboutPortugal from '../components/About/AboutPortugal'

export default function About() {
  const t = useTranslations('AboutPage')
  return (
    <main className='bg-background'>
      <AboutHero />
      <AboutPortugal />
    </main>
  )
}
