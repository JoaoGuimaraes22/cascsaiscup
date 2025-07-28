'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

export default function Gallery() {
  const t = useTranslations('Gallery')
  const [images, setImages] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch('/api/cloudinary')
        const data = await res.json()
        setImages(data.resources.map((img: any) => img.secure_url))
      } catch (err) {
        console.error('Error fetching Cloudinary images:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchImages()
  }, [])

  return (
    <section className='bg-background py-16 text-primary'>
      <div className='mx-auto max-w-screen-xl px-6'>
        <h2 className='mb-8 text-center text-4xl font-bold'>
          {t('Gallery_Title')}
        </h2>

        {loading ? (
          <p className='text-center text-text-secondary'>{t('Loading')}</p>
        ) : (
          <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
            {images.map((url, i) => (
              <div
                key={i}
                className='overflow-hidden rounded shadow transition hover:shadow-lg'
              >
                <Image
                  src={url}
                  alt={`Photo ${i + 1}`}
                  width={800}
                  height={600}
                  className='h-auto w-full object-cover'
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
