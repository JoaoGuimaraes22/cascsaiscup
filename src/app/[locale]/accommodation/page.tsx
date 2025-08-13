// About Page

import { useTranslations } from 'next-intl'
import AccomodationHero from '../components/Accomodation/AccomodationHero'
import AccomodationFood from '../components/Accomodation/AccomodationFood'

export default function Accommodation() {
  const t = useTranslations('AccommodationPage')
  return (
    <main>
      <AccomodationHero />
      <AccomodationFood />
    </main>
  )
}
