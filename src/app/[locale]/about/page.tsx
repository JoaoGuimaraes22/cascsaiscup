// About Page

import { useTranslations } from 'next-intl'
import AboutHero from '../components/About/AboutHero'
import AboutTradition from '../components/About/AboutTradition'
import AboutTestimonials from '../components/About/AboutTestimonials'

export default function About() {
  const t = useTranslations('AboutPage')
  return (
    <main className='bg-background px-4 text-primary md:px-8 lg:px-16'>
      <AboutHero />
      <AboutTradition />
      <AboutTestimonials />
    </main>
  )
}
