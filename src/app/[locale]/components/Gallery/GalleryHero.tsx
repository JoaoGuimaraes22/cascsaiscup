'use client'

import { useEffect, useState, useCallback, useMemo, useRef } from 'react'
import Image from 'next/image'
import { CldImage } from 'next-cloudinary'
import { useTranslations, useLocale } from 'next-intl'
import { Link } from '@/src/navigation'
import { FiRefreshCw, FiImage, FiArrowRight } from 'react-icons/fi'
import clsx from 'clsx'

type CloudinaryImage = {
  public_id: string
  url: string
  created_at: string
  width: number
  height: number
  format: string
}

type YearConfig = {
  year: number
  folder: string
}

type FetchState = 'idle' | 'loading' | 'success' | 'error'

// Configuration moved outside component for better performance
const YEARS: YearConfig[] = [
  { year: 2023, folder: 'gallery/2023' },
  { year: 2024, folder: 'gallery/2024' },
  { year: 2025, folder: 'gallery/2025' }
] as const

const IMAGES_PER_YEAR = 4
const API_TIMEOUT = 10000 // 10 seconds

// Assets constant for better maintainability
const ASSETS = {
  background: '/img/gallery/hero-bg.png',
  tagline: '/img/global/tagline-w.png'
} as const

// Custom hook for intersection observer with staggered animations
function useStaggeredAnimation(threshold = 0.2) {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold, rootMargin: '50px' }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [threshold])

  return { isVisible, sectionRef }
}

// Custom hook for fetching gallery images
function useGalleryImages() {
  const [imagesByYear, setImagesByYear] = useState<
    Record<number, CloudinaryImage[]>
  >({})
  const [fetchState, setFetchState] = useState<FetchState>('idle')
  const [error, setError] = useState<string | null>(null)

  const fetchImagesForYear = useCallback(
    async (yearConfig: YearConfig): Promise<[number, CloudinaryImage[]]> => {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT)

      try {
        const res = await fetch(
          `/api/cloudinary?folder=${encodeURIComponent(yearConfig.folder)}&max=${IMAGES_PER_YEAR}`,
          { signal: controller.signal }
        )

        clearTimeout(timeoutId)

        if (!res.ok) {
          throw new Error(
            `Failed to fetch images for ${yearConfig.year}: ${res.status} ${res.statusText}`
          )
        }

        const data = await res.json()
        return [yearConfig.year, (data.images || []) as CloudinaryImage[]]
      } catch (error) {
        clearTimeout(timeoutId)
        if (error instanceof Error && error.name === 'AbortError') {
          throw new Error(`Request timeout for ${yearConfig.year}`)
        }
        throw error
      }
    },
    []
  )

  const fetchAllImages = useCallback(async () => {
    if (fetchState === 'loading') return

    setFetchState('loading')
    setError(null)

    try {
      const results = await Promise.allSettled(YEARS.map(fetchImagesForYear))

      const imageMap: Record<number, CloudinaryImage[]> = {}
      const errors: string[] = []

      results.forEach((result, index) => {
        if (result.status === 'fulfilled') {
          const [year, images] = result.value
          imageMap[year] = images
        } else {
          errors.push(`Year ${YEARS[index].year}: ${result.reason.message}`)
        }
      })

      setImagesByYear(imageMap)

      if (errors.length > 0) {
        setError(errors.join('; '))
        setFetchState('error')
      } else {
        setFetchState('success')
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error occurred'
      setError(errorMessage)
      setFetchState('error')
    }
  }, [fetchImagesForYear, fetchState])

  useEffect(() => {
    fetchAllImages()
  }, []) // fetchAllImages is stable due to useCallback

  return {
    imagesByYear,
    loading: fetchState === 'loading',
    error,
    refetch: fetchAllImages
  }
}

// Enhanced image grid component with hover effects
interface ImageGridProps {
  images: CloudinaryImage[]
  year: number
  altTextPrefix: string
  isVisible: boolean
}

function ImageGrid({ images, year, altTextPrefix, isVisible }: ImageGridProps) {
  return (
    <div className='grid grid-cols-2 gap-2 sm:gap-3'>
      {images.slice(0, IMAGES_PER_YEAR).map((img, index) => (
        <div
          key={img.public_id}
          className={clsx(
            'group relative aspect-[4/3] overflow-hidden rounded-lg ring-1 ring-black/5 transition-all duration-500 ease-out hover:ring-2 hover:ring-sky-300/50',
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          )}
          style={{
            transitionDelay: `${600 + index * 100}ms`
          }}
        >
          <CldImage
            src={img.public_id}
            width={600}
            height={450}
            crop='fill'
            gravity='auto'
            quality='auto'
            format='auto'
            alt={`${altTextPrefix} ${year} - ${img.public_id.split('/').pop()}`}
            className='h-full w-full object-cover transition-all duration-500 group-hover:scale-110'
            loading='lazy'
          />

          {/* Hover overlay with subtle gradient */}
          <div className='absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100' />

          {/* Image indicator icon */}
          <div className='absolute bottom-2 right-2 rounded-full bg-white/90 p-1.5 opacity-0 shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:opacity-100'>
            <FiImage className='h-3 w-3 text-sky-600' />
          </div>
        </div>
      ))}
    </div>
  )
}

// Loading skeleton component
function ImageSkeleton() {
  return (
    <div className='grid grid-cols-2 gap-2 sm:gap-3'>
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className='aspect-[4/3] animate-pulse rounded-lg bg-slate-200'
        />
      ))}
    </div>
  )
}

// Enhanced year card component with animations
interface YearCardProps {
  year: number
  images: CloudinaryImage[]
  loading: boolean
  error: string | null
  locale: string
  t: (key: string) => string
  isVisible: boolean
  cardIndex: number
}

function YearCard({
  year,
  images,
  loading,
  error,
  locale,
  t,
  isVisible,
  cardIndex
}: YearCardProps) {
  const renderContent = () => {
    if (error) {
      return (
        <div className='grid aspect-[4/3] place-items-center text-slate-400'>
          <div className='space-y-3 text-center'>
            <div className='mx-auto grid h-12 w-12 place-items-center rounded-full bg-red-50'>
              <FiRefreshCw className='h-5 w-5 text-red-400' />
            </div>
            <p className='text-sm text-slate-600'>{t('error_message')}</p>
            <button
              onClick={() => window.location.reload()}
              className='group inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 transition-all duration-200 hover:scale-105 hover:bg-red-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-300'
              aria-label={`${t('retry')} ${year}`}
            >
              <FiRefreshCw className='h-3 w-3 transition-transform duration-200 group-hover:rotate-180' />
              {t('retry') || 'Retry'}
            </button>
          </div>
        </div>
      )
    }

    if (loading) {
      return <ImageSkeleton />
    }

    if (images.length === 0) {
      return (
        <div className='grid aspect-[4/3] place-items-center text-slate-400'>
          <div className='space-y-2 text-center'>
            <div className='mx-auto grid h-12 w-12 place-items-center rounded-full bg-slate-50'>
              <FiImage className='h-5 w-5 text-slate-400' />
            </div>
            <p className='text-sm'>{t('empty_message')}</p>
          </div>
        </div>
      )
    }

    return (
      <ImageGrid
        images={images}
        year={year}
        altTextPrefix={t('image_alt')}
        isVisible={isVisible}
      />
    )
  }

  return (
    <article
      className={clsx(
        'group flex flex-col transition-all duration-700 ease-out',
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      )}
      style={{
        transitionDelay: `${300 + cardIndex * 200}ms`
      }}
    >
      <header className='mb-3'>
        <h2 className='text-xl font-extrabold uppercase tracking-wide text-sky-600 transition-colors duration-300 group-hover:text-sky-700 sm:text-2xl'>
          {year}
        </h2>
      </header>

      <div className='hover:bg-white/98 flex-1 rounded-xl bg-white/95 p-4 shadow-lg ring-1 ring-black/5 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-xl sm:p-5'>
        {renderContent()}

        {/* Enhanced action button */}
        <footer className='mt-4 text-right'>
          <Link
            lang={locale}
            href={{
              pathname: '/gallery/[year]',
              params: { year: String(year) }
            }}
            className='group/button relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-sky-600 to-sky-700 px-5 py-2.5 text-sm font-bold text-white shadow-lg ring-1 ring-black/10 transition-all duration-300 hover:scale-105 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-2 sm:px-6 sm:py-3'
            aria-label={`${t('see_more')} ${year}`}
          >
            <span className='relative z-10 flex items-center gap-2'>
              {t('see_more')}
              <FiArrowRight className='h-4 w-4 transition-transform duration-300 group-hover/button:translate-x-1' />
            </span>
            {/* Shimmer effect */}
            <div className='absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover/button:translate-x-full' />
          </Link>
        </footer>
      </div>
    </article>
  )
}

// Enhanced retry button component
interface RetryButtonProps {
  onRetry: () => void
  t: (key: string) => string
  isVisible: boolean
}

function RetryButton({ onRetry, t, isVisible }: RetryButtonProps) {
  return (
    <div
      className={clsx(
        'text-center transition-all delay-1000 duration-700 ease-out',
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      )}
    >
      <button
        onClick={onRetry}
        className='group inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-2 text-sm font-medium text-red-600 shadow-md ring-1 ring-red-200 transition-all duration-300 hover:scale-105 hover:bg-red-100 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-red-300'
        aria-label={t('retry_all') || 'Retry loading all images'}
      >
        <FiRefreshCw className='h-4 w-4 transition-transform duration-300 group-hover:rotate-180' />
        {t('retry_all') || 'Retry loading images'}
      </button>
    </div>
  )
}

export default function GalleryHeroNew() {
  const t = useTranslations('GalleryPage.Hero')
  const locale = useLocale()
  const { imagesByYear, loading, error, refetch } = useGalleryImages()
  const { isVisible, sectionRef } = useStaggeredAnimation(0.15)

  // Memoize static assets to prevent re-renders
  const assets = useMemo(() => ASSETS, [])

  return (
    <section
      ref={sectionRef}
      className='relative w-full overflow-hidden'
      style={{ minHeight: '89vh' }}
      aria-labelledby='gallery-hero-title'
    >
      {/* Background Image with enhanced styling */}
      <div className='absolute inset-0 -z-10'>
        <Image
          src={assets.background}
          alt=''
          fill
          className='duration-[10s] object-cover transition-transform ease-out hover:scale-105'
          sizes='100vw'
          priority
          draggable={false}
          quality={90}
        />
        {/* Subtle overlay for better text readability */}
        <div className='absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/5' />
      </div>

      {/* Enhanced Header with staggered animation */}
      <header className='mx-auto max-w-screen-xl px-4 pt-6 sm:pt-8'>
        <div className='flex justify-end'>
          <div
            className={clsx(
              'text-right transition-all duration-1000 ease-out',
              isVisible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-6 opacity-0'
            )}
          >
            <h1
              id='gallery-hero-title'
              className='text-2xl font-extrabold uppercase tracking-wide text-sky-500 drop-shadow-sm transition-colors duration-300 hover:text-sky-600 sm:text-3xl'
            >
              {t('title')}
            </h1>
            <p
              className={clsx(
                'duration-800 mt-2 text-sm text-slate-700 transition-all delay-200 ease-out sm:text-base',
                isVisible
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-4 opacity-0'
              )}
            >
              {t('subtitle')}
            </p>
          </div>
        </div>
      </header>

      {/* Main Content with enhanced grid */}
      <main className='mx-auto flex h-full max-w-screen-xl flex-col justify-end px-4 pb-6 pt-4 sm:pb-8'>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8'>
          {YEARS.map(({ year }, index) => (
            <YearCard
              key={year}
              year={year}
              images={imagesByYear[year] || []}
              loading={loading}
              error={error}
              locale={locale}
              t={t}
              isVisible={isVisible}
              cardIndex={index}
            />
          ))}
        </div>

        {/* Enhanced global error message with retry */}
        {error && (
          <div className='mt-6'>
            <RetryButton onRetry={refetch} t={t} isVisible={isVisible} />
          </div>
        )}
      </main>

      {/* Tagline - Hidden on mobile with enhanced animation */}
      <div
        className={clsx(
          'delay-1200 pointer-events-none absolute bottom-3 right-4 hidden transition-all duration-1000 ease-out sm:bottom-4 sm:right-6 sm:block',
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
        )}
      >
        <Image
          src={assets.tagline}
          alt={t('taglineAlt')}
          width={420}
          height={140}
          className='h-auto w-[320px] drop-shadow-lg transition-transform duration-500 hover:scale-105 lg:w-[380px]'
          sizes='(max-width: 1024px) 320px, 380px'
          decoding='async'
          draggable={false}
          priority={false}
        />
      </div>
    </section>
  )
}
