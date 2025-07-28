// Program Page

import { useTranslations } from 'next-intl'
import ProgramHero from '../components/Program/ProgramHero'
import ProgramIntro from '../components/Program/ProgramIntro'
import ProgramDetails from '../components/Program/ProgramDetails'

export default function ProgramPage() {
  const t = useTranslations('ProgramPage')

  return (
    <div className='bg-background text-primary'>
      <ProgramHero />
      <ProgramIntro />
      <ProgramDetails />
    </div>
  )
}
