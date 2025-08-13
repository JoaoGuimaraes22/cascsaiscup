// components/Gallery/Gallery.tsx
'use client'

import { useEffect, useState } from 'react'
import { CldImage } from 'next-cloudinary'
import { useTranslations } from 'next-intl'

interface CloudinaryImage {
  public_id: string
  url: string
  created_at: string
  width: number
  height: number
  format: string
}

interface GalleryProps {
  folder?: string
  maxResults?: number
}

export default function Gallery({
  folder = '',
  maxResults = 20
}: GalleryProps) {
  const t = useTranslations('GalleryPage.Hero')

  const [images, setImages] = useState<CloudinaryImage[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedImage, setSelectedImage] = useState<CloudinaryImage | null>(
    null
  )

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(
          `/api/cloudinary?folder=${encodeURIComponent(folder)}&max=${maxResults}`
        )
        if (!response.ok) throw new Error('Failed to fetch images')
        const data = await response.json()
        setImages(data.images || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchImages()
  }, [folder, maxResults])

  const handleImageClick = (image: CloudinaryImage) => {
    setSelectedImage(image)
  }

  const handleCloseModal = () => {
    setSelectedImage(null)
  }

  const handleDownload = async (image: CloudinaryImage) => {
    try {
      const response = await fetch(image.url)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `${image.public_id.split('/').pop()}.${image.format}`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Download failed:', error)
    }
  }

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Escape') handleCloseModal()
  }

  useEffect(() => {
    if (selectedImage) {
      document.addEventListener('keydown', handleKeyPress)
      document.body.style.overflow = 'hidden'
    } else {
      document.removeEventListener('keydown', handleKeyPress)
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.removeEventListener('keydown', handleKeyPress)
      document.body.style.overflow = 'unset'
    }
  }, [selectedImage])

  if (loading) {
    return (
      <section className='flex items-center justify-center bg-background py-24'>
        <div className='flex flex-col items-center gap-4'>
          <div className='h-12 w-12 animate-spin rounded-full border-b-2 border-primary' />
          <p className='text-text-secondary'>{t('loading')}</p>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className='flex items-center justify-center bg-background py-24'>
        <div className='text-center'>
          <h2 className='mb-4 text-2xl font-bold text-primary'>
            {t('error_title')}
          </h2>
          <p className='text-text-secondary'>
            {t('error_message')}: {error}
          </p>
        </div>
      </section>
    )
  }

  if (images.length === 0) {
    return (
      <section className='flex items-center justify-center bg-background py-24'>
        <div className='text-center'>
          <h2 className='mb-4 text-2xl font-bold text-primary'>
            {t('empty_title')}
          </h2>
          <p className='text-text-secondary'>{t('empty_message')}</p>
        </div>
      </section>
    )
  }

  return (
    <section className='bg-background py-16 sm:py-24'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='mb-12 text-center'>
          <h1 className='mb-4 text-4xl font-extrabold leading-tight text-primary sm:text-5xl lg:text-6xl'>
            <span className='bg-span-bg bg-clip-text text-transparent'>
              {t('title')}
            </span>
          </h1>
          <p className='mx-auto max-w-2xl text-lg text-text-secondary sm:text-xl'>
            {t('subtitle')}
          </p>
        </div>

        {/* Gallery Grid */}
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 lg:grid-cols-4 xl:gap-8'>
          {images.map((image: CloudinaryImage) => (
            <div
              key={image.public_id}
              className='bg-card group cursor-pointer overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-xl'
              onClick={() => handleImageClick(image)}
            >
              <div className='aspect-square overflow-hidden'>
                <CldImage
                  src={image.public_id}
                  width={400}
                  height={400}
                  alt={`${t('image_alt')} ${image.public_id}`}
                  crop='fill'
                  gravity='auto'
                  quality='auto'
                  format='auto'
                  className='h-full w-full object-cover transition-transform duration-300 group-hover:scale-110'
                />
              </div>
              <div className='p-3'>
                <p className='text-sm text-text-secondary'>
                  {new Date(image.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button (optional) */}
        {images.length >= maxResults && (
          <div className='mt-12 text-center'>
            <button className='hover:bg-primary/80 rounded bg-primary px-8 py-3 text-button-text transition'>
              {t('load_more')}
            </button>
          </div>
        )}

        {/* Lightbox Modal */}
        {selectedImage && (
          <div
            className='fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4'
            onClick={handleCloseModal}
          >
            <div className='relative max-h-full max-w-full'>
              {/* Close Button */}
              <button
                onClick={handleCloseModal}
                className='absolute -top-12 right-0 z-10 rounded-full bg-white/20 p-2 text-white backdrop-blur-sm transition hover:bg-white/30'
                aria-label={t('close')}
              >
                <svg
                  className='h-6 w-6'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              </button>

              {/* Download Button */}
              <button
                onClick={() => handleDownload(selectedImage)}
                className='absolute -top-12 right-12 z-10 rounded-full bg-white/20 p-2 text-white backdrop-blur-sm transition hover:bg-white/30'
                aria-label={t('download')}
              >
                <svg
                  className='h-6 w-6'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                  />
                </svg>
              </button>

              {/* Full Size Image */}
              <div
                className='relative max-h-[90vh] max-w-[90vw]'
                onClick={e => e.stopPropagation()}
              >
                <CldImage
                  src={selectedImage.public_id}
                  width={selectedImage.width}
                  height={selectedImage.height}
                  alt={`${t('image_alt')} ${selectedImage.public_id}`}
                  quality='auto'
                  format='auto'
                  className='max-h-[90vh] max-w-[90vw] object-contain'
                />

                {/* Image Info */}
                <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white'>
                  <p className='text-sm opacity-90'>
                    {new Date(selectedImage.created_at).toLocaleDateString()} •{' '}
                    {selectedImage.width}x{selectedImage.height} •{' '}
                    {selectedImage.format.toUpperCase()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
