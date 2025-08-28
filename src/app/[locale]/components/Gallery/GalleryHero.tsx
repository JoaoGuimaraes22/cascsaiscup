'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import Image from 'next/image'
import { useTranslations, useLocale } from 'next-intl'
import { Link } from '@/src/navigation'
import {
  FiRefreshCw,
  FiImage,
  FiArrowRight,
  FiWifi,
  FiWifiOff,
  FiClock
} from 'react-icons/fi'
import clsx from 'clsx'

// Import our optimized components
import {
  useOptimizedGallery,
  ProcessedImage
} from '@/src/hooks/useOptimizedGallery'
import OptimizedCloudinaryImage from './OptimizedCloudinaryImage'

// Assets constant for better maintainability
const ASSETS = {
  background: '/img/gallery/hero-bg.png',
  tagline: '/img/global/tagline-w.png'
} as const

const IMAGES_PER_YEAR = 6 // Increased for better grid fill

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

// Loading skeleton component for year cards
function YearCardSkeleton() {
  return (
    <div className='h-full rounded-2xl bg-white/10 p-6 backdrop-blur-sm'>
      <div className='flex h-full flex-col'>
        {/* Header skeleton */}
        <div className='mb-6 flex items-center justify-between'>
          <div className='h-8 w-16 animate-pulse rounded bg-white/20' />
          <div className='h-8 w-20 animate-pulse rounded-full bg-white/20' />
        </div>

        {/* Images grid skeleton */}
        <div className='mb-4 grid flex-1 grid-cols-3 gap-3'>
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className='aspect-square animate-pulse rounded-lg bg-white/20'
              style={{
                animationDelay: `${index * 100}ms`
              }}
            />
          ))}
        </div>

        {/* Footer skeleton */}
        <div className='mx-auto h-4 w-32 animate-pulse rounded bg-white/20' />
      </div>
    </div>
  )
}

// Compact image grid for each year
interface CompactImageGridProps {
  images: ProcessedImage[]
  year: number
  altTextPrefix: string
  isVisible: boolean
  onImageClick?: (image: ProcessedImage) => void
}

function CompactImageGrid({
  images,
  year,
  altTextPrefix,
  isVisible,
  onImageClick
}: CompactImageGridProps) {
  return (
    <div className='grid flex-1 grid-cols-3 gap-2 sm:gap-3'>
      {images.slice(0, IMAGES_PER_YEAR).map((img, index) => (
        <div
          key={img.public_id}
          className={clsx(
            'group relative aspect-square overflow-hidden rounded-lg ring-1 ring-white/20 transition-all duration-500 ease-out',
            'hover:-translate-y-1 hover:shadow-lg hover:shadow-black/25 hover:ring-2 hover:ring-white/50',
            onImageClick && 'cursor-pointer',
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          )}
          style={{
            transitionDelay: `${400 + index * 50}ms`
          }}
          onClick={() => onImageClick?.(img)}
        >
          <OptimizedCloudinaryImage
            publicId={img.public_id}
            alt={`${altTextPrefix} ${year} - ${img.public_id.split('/').pop()}`}
            width={200}
            height={200}
            quality={60}
            className='h-full w-full object-cover transition-all duration-500 group-hover:scale-110'
            loading='lazy'
            sizes='(max-width: 768px) 33vw, (max-width: 1024px) 16vw, 12vw'
            crop='fill'
            gravity='auto'
          />

          {/* Hover overlay */}
          <div className='absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100' />

          {/* Image indicator icon */}
          <div className='absolute bottom-1 right-1 rounded-full bg-white/90 p-1 opacity-0 shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:opacity-100'>
            <FiImage className='h-2.5 w-2.5 text-sky-600' />
          </div>
        </div>
      ))}
    </div>
  )
}

// Status indicator component
interface StatusIndicatorProps {
  loading: boolean
  error: string | null
  fromCache: boolean
  isStale: boolean
  lastFetch: number | null
}

function StatusIndicator({
  loading,
  error,
  fromCache,
  isStale,
  lastFetch
}: StatusIndicatorProps) {
  if (loading) {
    return (
      <div className='flex items-center gap-2 text-sm text-white/80'>
        <div className='h-3 w-3 animate-spin rounded-full border border-white/30 border-t-white' />
        <span>Loading...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className='flex items-center gap-2 text-sm text-red-300'>
        <FiWifiOff className='h-3 w-3' />
        <span>Connection error</span>
      </div>
    )
  }

  if (fromCache) {
    return (
      <div className='flex items-center gap-2 text-sm text-blue-300'>
        <FiClock className='h-3 w-3' />
        <span>{isStale ? 'Cached (stale)' : 'Cached'}</span>
      </div>
    )
  }

  if (lastFetch) {
    return (
      <div className='flex items-center gap-2 text-sm text-green-300'>
        <FiWifi className='h-3 w-3' />
        <span>Live</span>
      </div>
    )
  }

  return null
}

// Enhanced year card component for single viewport
interface YearCardProps {
  year: number
  images: ProcessedImage[]
  loading: boolean
  error: string | null
  locale: string
  t: (key: string) => string
  isVisible: boolean
  cardIndex: number
  onImageClick?: (image: ProcessedImage) => void
  onRetry?: () => void
}

function YearCard({
  year,
  images,
  loading,
  error,
  locale,
  t,
  isVisible,
  cardIndex,
  onImageClick,
  onRetry
}: YearCardProps) {
  const renderContent = () => {
    if (error) {
      return (
        <div className='flex flex-1 items-center justify-center'>
          <div className='space-y-3 text-center'>
            <div className='mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-500/20'>
              <FiWifiOff className='h-5 w-5 text-red-300' />
            </div>
            <p className='text-sm text-white/80'>Failed to load</p>
            {onRetry && (
              <button
                onClick={onRetry}
                className='inline-flex items-center gap-2 rounded-full bg-red-500/20 px-3 py-1.5 text-xs font-medium text-red-300 transition-colors hover:bg-red-500/30'
              >
                <FiRefreshCw className='h-3 w-3' />
                Retry
              </button>
            )}
          </div>
        </div>
      )
    }

    if (!images.length) {
      return (
        <div className='flex flex-1 items-center justify-center'>
          <div className='space-y-2 text-center'>
            <div className='mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white/10'>
              <FiImage className='h-5 w-5 text-white/60' />
            </div>
            <p className='text-sm text-white/60'>No images</p>
          </div>
        </div>
      )
    }

    return (
      <CompactImageGrid
        images={images}
        year={year}
        altTextPrefix={t('gallery_image') || 'Gallery image'}
        isVisible={isVisible}
        onImageClick={onImageClick}
      />
    )
  }

  return (
    <div
      className={clsx(
        'h-full transition-all duration-700 ease-out',
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      )}
      style={{
        transitionDelay: `${200 + cardIndex * 150}ms`
      }}
    >
      <div className='flex h-full flex-col rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm transition-all duration-300 hover:bg-white/15 sm:p-6'>
        {/* Year header with link */}
        <div className='mb-4 flex items-center justify-between sm:mb-6'>
          <h3 className='text-2xl font-extrabold text-white drop-shadow-lg sm:text-3xl'>
            {year}
          </h3>
          <Link
            href={{
              pathname: '/gallery/[year]',
              params: { year: String(year) }
            }}
            className='group inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-2 text-xs font-medium text-white backdrop-blur-sm transition-all hover:scale-105 hover:bg-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 sm:px-4 sm:text-sm'
          >
            {t('view_all') || 'View all'}
            <FiArrowRight className='h-3 w-3 transition-transform group-hover:translate-x-1 sm:h-4 sm:w-4' />
          </Link>
        </div>

        {/* Image content */}
        {loading ? (
          <div className='mb-4 grid flex-1 grid-cols-3 gap-2 sm:gap-3'>
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className='aspect-square animate-pulse rounded-lg bg-white/20'
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              />
            ))}
          </div>
        ) : (
          renderContent()
        )}

        {/* Image count only */}
        <div className='flex items-center justify-center border-t border-white/10 pt-3 sm:pt-4'>
          {images.length > 0 && (
            <p className='text-xs text-white/80 sm:text-sm'>
              {images.length}{' '}
              {images.length === 1
                ? t('image') || 'image'
                : t('images') || 'images'}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

// Main component
export default function OptimizedGalleryHero() {
  const t = useTranslations('GalleryPage.Hero')
  const locale = useLocale()
  const { isVisible, sectionRef } = useStaggeredAnimation(0.1)

  // Use our optimized gallery hook
  const {
    imagesByYear,
    availableYears,
    loading,
    error,
    fromCache,
    isStale,
    lastFetch,
    refresh,
    getImagesForYear,
    getTotalImagesCount,
    isEmpty
  } = useOptimizedGallery(IMAGES_PER_YEAR)

  // Handle image click (could open lightbox, navigate, etc.)
  const handleImageClick = useCallback((image: ProcessedImage) => {
    console.log('Image clicked:', image)
    // Could open lightbox modal or navigate to full gallery
  }, [])

  return (
    <section
      ref={sectionRef}
      className='relative flex min-h-screen items-center justify-center overflow-hidden'
      aria-labelledby='gallery-heading'
    >
      {/* Background image */}
      <div className='absolute inset-0 -z-10'>
        <Image
          src={ASSETS.background}
          alt=''
          role='presentation'
          fill
          priority
          className='object-cover'
          quality={60}
          sizes='100vw'
        />
        {/* Overlay for better contrast */}
        <div className='absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/60' />
      </div>

      <div className='mx-auto w-full max-w-screen-2xl px-4 py-8 sm:px-6 lg:px-8'>
        {/* Header content */}
        <div
          className={clsx(
            'mb-8 text-center transition-all duration-1000 ease-out sm:mb-12',
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          )}
        >
          {/* Tagline image */}
          <div className='mb-6 flex justify-center sm:mb-8'>
            <Image
              src={ASSETS.tagline}
              alt='Cascais Cup'
              width={280}
              height={70}
              priority
              className='h-auto max-w-[240px] drop-shadow-2xl sm:max-w-[280px]'
            />
          </div>

          <h1
            id='gallery-heading'
            className='mb-4 text-3xl font-extrabold uppercase tracking-wide text-white drop-shadow-lg sm:text-4xl lg:text-5xl'
          >
            {t('title') || 'Gallery'}
          </h1>

          <p className='mx-auto mb-6 max-w-2xl text-base text-white/90 drop-shadow sm:text-lg'>
            {t('subtitle') ||
              'Relive the best moments from Cascais Cup through the years'}
          </p>

          {/* Hidden refresh button for errors only */}
          {error && (
            <div className='flex justify-center'>
              <button
                onClick={refresh}
                className='inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50'
              >
                <FiRefreshCw
                  className={clsx('h-4 w-4', loading && 'animate-spin')}
                />
                {loading
                  ? t('refreshing') || 'Refreshing...'
                  : t('refresh') || 'Refresh'}
              </button>
            </div>
          )}
        </div>

        {/* Three-column gallery grid */}
        {!isEmpty ? (
          <div className='grid max-h-[60vh] grid-cols-1 gap-4 sm:gap-6 lg:max-h-[65vh] lg:grid-cols-3 lg:gap-8'>
            {availableYears
              .sort((a, b) => b - a) // Latest year first
              .map((year, index) => (
                <YearCard
                  key={year}
                  year={year}
                  images={getImagesForYear(year)}
                  loading={loading}
                  error={error}
                  locale={locale}
                  t={t}
                  isVisible={isVisible}
                  cardIndex={index}
                  onImageClick={handleImageClick}
                  onRetry={refresh}
                />
              ))}
          </div>
        ) : loading ? (
          // Loading state with skeletons
          <div className='grid max-h-[60vh] grid-cols-1 gap-4 sm:gap-6 lg:max-h-[65vh] lg:grid-cols-3 lg:gap-8'>
            {[2025, 2024, 2023].map((year, index) => (
              <YearCardSkeleton key={year} />
            ))}
          </div>
        ) : (
          // Empty state
          <div
            className={clsx(
              'mx-auto max-w-md text-center transition-all duration-1000 ease-out',
              isVisible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-8 opacity-0'
            )}
          >
            <div className='mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm'>
              <FiImage className='h-8 w-8 text-white/60' />
            </div>
            <h3 className='mb-3 text-xl font-bold text-white'>
              {t('empty_title') || 'No images available'}
            </h3>
            <p className='mb-6 text-white/80'>
              {t('empty_description') ||
                'Gallery images will appear here soon. Check back later!'}
            </p>
            <button
              onClick={refresh}
              className='inline-flex items-center gap-2 rounded-full bg-white/20 px-6 py-3 font-medium text-white backdrop-blur-sm transition-all hover:bg-white/30'
            >
              <FiRefreshCw className='h-4 w-4' />
              {t('check_again') || 'Check again'}
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
