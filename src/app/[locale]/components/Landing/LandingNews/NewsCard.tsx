// components/LandingNews/NewsCard.tsx

'use client'

import Image from 'next/image'
import Link from 'next/link'

export interface NewsCardProps {
  title: string
  date: string
  excerpt: string
  image: string
  link: string
}

export default function NewsCard({
  title,
  date,
  excerpt,
  image,
  link
}: NewsCardProps) {
  return (
    <div className='overflow-hidden rounded-lg bg-background shadow-md transition hover:shadow-lg'>
      <Image
        src={image}
        alt={title}
        width={600}
        height={400}
        className='h-48 w-full object-cover'
      />
      <div className='p-5'>
        <h3 className='text-lg font-bold text-primary'>{title}</h3>
        <p className='mt-1 text-xs text-text-secondary'>{date}</p>
        <p className='mt-2 text-sm text-text-secondary'>{excerpt}</p>
        <Link
          href={link}
          className='mt-3 inline-block text-sm text-primary hover:underline'
        >
          Read More →
        </Link>
      </div>
    </div>
  )
}
