// Hall of Fame page

import { useTranslations } from 'next-intl'
import HallOfFameHero from '../components/HallOfFame/HallOfFameHero'

export default function HallOfFamePage() {
  const t = useTranslations('HallOfFamePage')
  return (
    <div className='flex flex-col gap-24 px-6 py-10 sm:px-10 md:px-20'>
      <HallOfFameHero />
    </div>
  )
}
