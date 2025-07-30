// Hall of Fame page

import { useTranslations } from 'next-intl'
import HallOfFameHero from '../components/HallOfFame/HallOfFameHero'
import HallOfFameTeams from '../components/HallOfFame/HallOfFameTeams'
import HallOfFameWinners from '../components/HallOfFame/HallOfFameWinners'

export default function HallOfFamePage() {
  const t = useTranslations('HallOfFamePage')
  return (
    <div className='flex flex-col px-6 py-10 sm:px-10 md:px-20'>
      <HallOfFameHero />
      <HallOfFameTeams />
      <HallOfFameWinners />
    </div>
  )
}
