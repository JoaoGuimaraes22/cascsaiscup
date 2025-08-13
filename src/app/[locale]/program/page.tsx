// Program Page

import { useTranslations } from 'next-intl'
import ProgramHero from '../components/Program/ProgramHero'

export default function ProgramPage() {
  const t = useTranslations('ProgramPage')

  return (
    <div className='bg-background text-primary'>
      <ProgramHero />
    </div>
  )
}
