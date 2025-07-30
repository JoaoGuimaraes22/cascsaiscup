// components/HallOfFameTeams.tsx
'use client'

import Image from 'next/image'

interface TeamData {
  country: string
  flag: string
  teams: string[]
}

const hallOfFameData: TeamData[] = [
  {
    country: 'Portugal',
    flag: '/img/flags/pt.png',
    teams: [
      'Lisboa Lions',
      'Porto Smash',
      'Cascais Waves',
      'Braga Blaze',
      'Faro Force',
      'Coimbra Spikers',
      'Setúbal Stars',
      'Aveiro Aces',
      'Guimarães Grinders',
      'Leiria Lights'
    ]
  },
  {
    country: 'Spain',
    flag: '/img/flags/es.png',
    teams: [
      'Barcelona Blaze',
      'Madrid Storm',
      'Sevilla Strikers',
      'Valencia Vipers',
      'Malaga Mambas',
      'Bilbao Blasters'
    ]
  },
  {
    country: 'France',
    flag: '/img/flags/fr.png',
    teams: ['Paris Pulse', 'Nice Netters']
  },
  {
    country: 'Monaco',
    flag: '/img/flags/mc.png',
    teams: ['Monaco Mirage']
  }
]

export default function HallOfFameTeams() {
  return (
    <section className='mx-auto max-w-7xl px-4 py-6' id='teams'>
      <h2 className='mb-10 text-center text-3xl font-bold text-primary dark:text-white'>
        Hall of Fame — Participating Teams
      </h2>

      <div className='columns-1 gap-6 sm:columns-2 lg:columns-3'>
        {hallOfFameData.map(({ country, flag, teams }) => (
          <div
            key={country}
            className='mb-6 break-inside-avoid rounded-lg border bg-white p-4 shadow dark:border-neutral-700 dark:bg-neutral-900'
          >
            <div className='mb-2 flex items-center gap-3'>
              <Image
                src={flag}
                alt={country}
                width={24}
                height={24}
                className='rounded-sm'
              />
              <h3 className='text-lg font-semibold text-primary dark:text-white'>
                {country}
              </h3>
            </div>
            <ul className='text-muted-foreground text-sm'>
              {teams.map(team => (
                <li key={team} className='my-1'>
                  {team}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
