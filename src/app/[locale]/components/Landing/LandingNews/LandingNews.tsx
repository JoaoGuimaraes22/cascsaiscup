'use client'

import { Link } from '@/src/navigation'
import NewsCard from './NewsCard'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

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
  },
  {
    title: 'MVP Awards',
    date: 'February 10, 2025',
    excerpt: 'MVP awards given to the athletes who stood out during the event.',
    image: '/img/news/news4.jpg',
    link: '/news/mvp-awards'
  }
]

export default function NewsSection() {
  const t = useTranslations('LandingPage.LandingNews')

  return (
    <section className='relative isolate overflow-hidden pb-12 sm:pb-16'>
      {/* Background image */}
      <Image
        src='/img/landing/home-page-2.png' // place HOME PAGE 2.png in /public/img/global/
        alt='Background'
        fill
        priority
        className='absolute inset-0 -z-10 object-cover' // adjust opacity for readability
      />

      {/* Wave image on top */}
      <div className='relative w-full'>
        <Image
          src='/img/global/ondas-4.png' // wave PNG
          alt='Wave divider'
          width={1920}
          height={135}
          className='h-auto w-full object-cover'
          priority
        />
      </div>

      {/* Content */}
      <div className='mx-auto max-w-screen-xl px-4 pt-8 sm:pt-12'>
        {/* Heading row */}
        <div className='mb-6 flex items-end justify-between sm:mb-8'>
          <h2 className='text-2xl font-extrabold uppercase tracking-wide text-sky-500 sm:text-3xl'>
            {t('Latest_news') || 'ÚLTIMAS NOTÍCIAS'}
          </h2>

          <Link
            href='/news'
            className='hidden text-sm font-semibold text-primary hover:underline sm:inline'
          >
            {t('More_news') || 'Mais notícias'}
          </Link>
        </div>

        {/* Cards */}
        <div className='grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-4'>
          {newsItems.map((item, i) => (
            <NewsCard key={i} {...item} />
          ))}
        </div>

        {/* Mobile "more" link */}
        <div className='mt-8 text-center sm:hidden'>
          <Link
            href='/news'
            className='text-sm font-semibold text-primary hover:underline'
          >
            {t('More_news') || 'Mais notícias'}
          </Link>
        </div>
      </div>
    </section>
  )
}
