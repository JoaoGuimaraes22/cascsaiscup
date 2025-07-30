'use client'

import { useTranslations } from 'next-intl'

interface WinnerEntry {
  category: 'Sub-21' | 'Sub-17' | 'Sub-15'
  year: number
  top4: string[]
}

// You can expand this dictionary as needed
const getCountryFlag = (team: string) => {
  const lower = team.toLowerCase()
  if (
    lower.includes('lisboa') ||
    lower.includes('porto') ||
    lower.includes('cascais') ||
    lower.includes('coimbra') ||
    lower.includes('braga') ||
    lower.includes('faro') ||
    lower.includes('guimarães') ||
    lower.includes('setúbal') ||
    lower.includes('aveiro') ||
    lower.includes('leiria')
  )
    return '🇵🇹'
  if (
    lower.includes('madrid') ||
    lower.includes('barcelona') ||
    lower.includes('valencia') ||
    lower.includes('sevilla') ||
    lower.includes('malaga') ||
    lower.includes('bilbao')
  )
    return '🇪🇸'
  if (lower.includes('paris') || lower.includes('nice')) return '🇫🇷'
  if (lower.includes('monaco')) return '🇲🇨'
  return '🏳️'
}

const medalEmoji = ['🥇', '🥈', '🥉', '🎖️']

const winners: WinnerEntry[] = [
  {
    year: 2025,
    category: 'Sub-21',
    top4: ['Lisboa Lions', 'Madrid Storm', 'Cascais Waves', 'Porto Smash']
  },
  {
    year: 2025,
    category: 'Sub-17',
    top4: [
      'Barcelona Blaze',
      'Paris Pulse',
      'Setúbal Stars',
      'Sevilla Strikers'
    ]
  },
  {
    year: 2025,
    category: 'Sub-15',
    top4: ['Valencia Vipers', 'Nice Netters', 'Faro Force', 'Braga Blaze']
  },
  {
    year: 2024,
    category: 'Sub-21',
    top4: ['Porto Smash', 'Paris Pulse', 'Bilbao Blasters', 'Coimbra Spikers']
  },
  {
    year: 2024,
    category: 'Sub-17',
    top4: ['Madrid Storm', 'Lisboa Lions', 'Aveiro Aces', 'Barcelona Blaze']
  },
  {
    year: 2024,
    category: 'Sub-15',
    top4: [
      'Cascais Waves',
      'Guimarães Grinders',
      'Leiria Lights',
      'Nice Netters'
    ]
  }
]

export default function HallOfFameWinners() {
  const t = useTranslations('HallOfFamePage.HallOfFameWinners')

  const years = Array.from(new Set(winners.map(w => w.year))).sort(
    (a, b) => b - a
  )

  return (
    <section className='mx-auto max-w-7xl px-4 py-8' id='winners'>
      <h2 className='mb-10 text-center text-3xl font-bold text-primary dark:text-white'>
        {t('Title')}
      </h2>

      <div className='space-y-12'>
        {years.map(year => (
          <div key={year}>
            <h3 className='mb-4 text-2xl font-semibold text-primary dark:text-white'>
              {year}
            </h3>
            <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
              {winners
                .filter(w => w.year === year)
                .map(({ category, top4 }) => (
                  <div
                    key={category}
                    className='rounded-lg border bg-white p-4 shadow dark:border-neutral-700 dark:bg-neutral-900'
                  >
                    <h4 className='text-accent mb-2 text-lg font-bold dark:text-white'>
                      {t(`Categories.${category}`)}
                    </h4>
                    <ol className='text-muted-foreground list-none space-y-1 text-sm'>
                      {top4.map((team, idx) => (
                        <li key={team}>
                          {medalEmoji[idx]} {getCountryFlag(team)} {team}
                        </li>
                      ))}
                    </ol>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
