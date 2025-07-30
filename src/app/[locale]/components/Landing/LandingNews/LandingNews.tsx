// components/LandingNews/LandingNews.tsx

'use client'

import { Link } from '@/src/navigation'
import NewsCard from './NewsCard'
import { useTranslations } from 'next-intl'

const newsItems = [
  {
    title: 'Ranking Cascais Volley Cup 2025',
    date: 'April 23, 2025',
    excerpt:
      'Ranking and Pictures of Cascais Volley Cup 2025, the volleyball tournament of Cascais',
    image: '/img/news/news1.jpg',
    link: '/news/cornacchia-2025'
  },
  {
    title: 'Under 21 – Rankings & Pictures',
    date: 'March 6, 2025',
    excerpt:
      'Check out pictures, video and rankings of the Under 21 tournament.',
    image: '/img/news/news2.jpg',
    link: '/news/nations-cup-9'
  },
  {
    title: 'New Arrivals: Pelamora SC',
    date: 'February 20, 2025',
    excerpt: 'Official Statement: Pelamora is coming with Under-15, 17 and 21',
    image: '/img/news/news3.png',
    link: '/news/streaming-scam-warning'
  }
]

export default function NewsSection() {
  const t = useTranslations('LandingPage.LandingNews')

  return (
    <section className='bg-background py-16'>
      <div className='mx-auto max-w-screen-xl px-4'>
        <h2 className='mb-2 text-center text-4xl font-bold text-primary'>
          {t('Latest_news')}
        </h2>
        <p className='mb-10 text-center text-sm text-text-secondary'>
          <Link
            href='/news'
            className='font-medium text-primary hover:underline'
          >
            {t('More_news')}
          </Link>
        </p>

        <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
          {newsItems.map((item, i) => (
            <NewsCard key={i} {...item} />
          ))}
        </div>
      </div>
    </section>
  )
}
