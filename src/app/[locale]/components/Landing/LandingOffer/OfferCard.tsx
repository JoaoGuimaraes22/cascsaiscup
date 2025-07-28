// components/Landing/LandingOffer/OfferCard.tsx

'use client'

import Image from 'next/image'
import { Link } from '@/src/navigation'
import { locales } from '@/src/i18n'
import { ValidPathname } from '@/src/navigation'

interface OfferCardProps {
  title: string
  description: string
  buttonLabel: string
  link: ValidPathname
  image: string
}

export default function OfferCard({
  title,
  description,
  buttonLabel,
  link,
  image
}: OfferCardProps) {
  return (
    <div className='flex flex-col overflow-hidden rounded-lg bg-white shadow-md transition hover:shadow-xl'>
      <Image
        src={image}
        alt={title}
        width={800}
        height={400}
        className='h-48 w-full object-cover'
      />
      <div className='flex flex-1 flex-col justify-between p-6'>
        <h3 className='mb-2 text-lg font-bold text-primary'>{title}</h3>
        <p className='flex-1 text-sm text-gray-700'>{description}</p>
        <Link
          href={link}
          className='mt-6 inline-block rounded border border-primary px-4 py-2 text-center text-sm text-primary transition hover:bg-primary hover:text-white'
        >
          {buttonLabel}
        </Link>
      </div>
    </div>
  )
}
