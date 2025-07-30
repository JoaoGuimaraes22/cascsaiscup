// services/page.tsx
import { useTranslations } from 'next-intl'
import ServicesHero from '../components/Services/ServicesHero'

export default function ServicesPage() {
  const t = useTranslations('ServicesPage')

  return (
    <div>
      <ServicesHero />
    </div>
  )
}
