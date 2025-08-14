// Registration Page

import { useTranslations } from 'next-intl'
import RegistrationHero from '../components/Registration/RegistrationHero'

export default function About() {
  const t = useTranslations('RegistrationPage')
  return (
    <div>
      <RegistrationHero />
    </div>
  )
}
