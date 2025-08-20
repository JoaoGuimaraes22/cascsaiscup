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
    <Link
      href={link}
      className='group block rounded-xl bg-white/90 p-2 shadow-sm ring-1 ring-black/5 transition
                 hover:-translate-y-1 hover:shadow-md'
    >
      <div className='overflow-hidden rounded-lg'>
        <Image
          src={image}
          alt={title}
          width={600}
          height={400}
          className='h-40 w-full object-cover transition duration-300 group-hover:scale-[1.02] sm:h-44'
          loading='eager'
          quality={75}
        />
      </div>

      <div className='px-2 py-4'>
        <h3 className='text-base font-extrabold uppercase leading-snug text-primary sm:text-lg'>
          {title}
        </h3>
        <p className='mt-1 text-xs text-slate-500'>{date}</p>
        <p className='mt-2 line-clamp-2 text-sm text-slate-600'>{excerpt}</p>
      </div>
    </Link>
  )
}
