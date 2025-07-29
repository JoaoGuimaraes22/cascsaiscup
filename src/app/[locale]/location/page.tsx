// location/page.tsx
import { useTranslations } from 'next-intl'
import LocationHero from '../components/Location/LocationHero'
import LocationDetails from '../components/Location/LocationDetails'
import LocationLisbon from '../components/Location/LocationLisbon'
import LocationsToDoCascais from '../components/Location/LocationToDoCascais'
import LocationToDoLisboa from '../components/Location/LocationToDoLisboa'

export default function LocationPage() {
  const t = useTranslations('')

  return (
    <section>
      <LocationHero />
      <LocationDetails />
      <LocationLisbon />
      <LocationsToDoCascais />
      <LocationToDoLisboa />
    </section>
  )
}
