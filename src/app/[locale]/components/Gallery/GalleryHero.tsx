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
} from '@/hooks/useOptimizedGallery'
import OptimizedCloudinaryImage from './OptimizedCloudinaryImage'

// Assets constant for better maintainability
const ASSETS = {
  background: '/img/gallery/hero-bg.png',
  tagline: '/img/global/tagline-w.png'
} as const

const IMAGES_PER_YEAR = 4

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

// Loading skeleton component
function ImageSkeleton() {
  return (
    <div className='grid grid-cols-2 gap-2 sm:gap-3'>
      {Array.from({ length: IMAGES_PER_YEAR }).map((_, index) => (
        <div
          key={index}
          className='aspect-[4/3] animate-pulse rounded-lg bg-slate-200'
          style={{
            animationDelay: `${index * 100}ms`
          }}
        />
      ))}
    </div>
  )
}

// Enhanced image grid component with hover effects
interface ImageGridProps {
  images: ProcessedImage[]
  year: number
  altTextPrefix: string
  isVisible: boolean
  onImageClick?: (image: ProcessedImage) => void
}

function ImageGrid({
  images,
  year,
  altTextPrefix,
  isVisible,
  onImageClick
}: ImageGridProps) {
  return (
    <div className='grid grid-cols-2 gap-2 sm:gap-3'>
      {images.slice(0, IMAGES_PER_YEAR).map((img, index) => (
        <div
          key={img.public_id}
          className={clsx(
            'group relative aspect-[4/3] overflow-hidden rounded-lg ring-1 ring-black/5 transition-all duration-500 ease-out',
            'hover:-translate-y-1 hover:shadow-lg hover:ring-2 hover:ring-sky-300/50',
            onImageClick && 'cursor-pointer',
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          )}
          style={{
            transitionDelay: `${600 + index * 100}ms`
          }}
          onClick={() => onImageClick?.(img)}
        >
          <OptimizedCloudinaryImage
            publicId={img.public_id}
            alt={`${altTextPrefix} ${year} - ${img.public_id.split('/').pop()}`}
            width={400}
            height={300}
            quality={70}
            className='h-full w-full object-cover transition-all duration-500 group-hover:scale-110'
            loading='lazy'
            sizes='(max-width: 768px) 50vw, 25vw'
            crop='fill'
            gravity='auto'
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
      <div className='flex items-center gap-2 text-sm text-slate-500'>
        <div className='h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-slate-500' />
        <span>Loading gallery...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className='flex items-center gap-2 text-sm text-red-500'>
        <FiWifiOff className='h-4 w-4' />
        <span>Connection error</span>
      </div>
    )
  }

  if (fromCache) {
    return (
      <div className='flex items-center gap-2 text-sm text-sky-500'>
        <FiClock className='h-4 w-4' />
        <span>{isStale ? 'Cached (stale)' : 'Cached'}</span>
      </div>
    )
  }

  if (lastFetch) {
    return (
      <div className='flex items-center gap-2 text-sm text-green-500'>
        <FiWifi className='h-4 w-4' />
        <span>Live data</span>
      </div>
    )
  }

  return null
}

// Enhanced year card component
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
    if (loading) {
      return <ImageSkeleton />
    }

    if (error) {
      return (
        <div className='grid aspect-[4/3] place-items-center text-slate-400'>
          <div className='space-y-3 text-center'>
            <div className='mx-auto grid h-12 w-12 place-items-center rounded-full bg-red-50'>
              <FiWifiOff className='h-5 w-5 text-red-400' />
            </div>
            <p className='text-sm text-slate-600'>Failed to load images</p>
            {onRetry && (
              <button
                onClick={onRetry}
                className='group inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 transition-all hover:bg-red-100'
              >
                <FiRefreshCw className='h-3 w-3 transition-transform group-hover:rotate-180' />
                {t('try_again') || 'Try again'}
              </button>
            )}
          </div>
        </div>
      )
    }

    if (!images.length) {
      return (
        <div className='grid aspect-[4/3] place-items-center text-slate-400'>
          <div className='space-y-2 text-center'>
            <div className='mx-auto grid h-12 w-12 place-items-center rounded-full bg-slate-100'>
              <FiImage className='h-5 w-5 text-slate-400' />
            </div>
            <p className='text-sm text-slate-500'>No images found</p>
          </div>
        </div>
      )
    }

    return (
      <ImageGrid
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
        'group space-y-4 transition-all duration-700 ease-out',
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      )}
      style={{
        transitionDelay: `${400 + cardIndex * 200}ms`
      }}
    >
      {/* Year header with link */}
      <div className='flex items-center justify-between'>
        <h3 className='text-2xl font-extrabold text-white drop-shadow-lg'>
          {year}
        </h3>
        <Link
          href={{ pathname: '/gallery/[year]', params: { year: String(year) } }}
          className='group/link inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-all hover:scale-105 hover:bg-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50'
        >
          {t('view_all') || 'View all'}
          <FiArrowRight className='h-4 w-4 transition-transform group-hover/link:translate-x-1' />
        </Link>
      </div>

      {/* Image content */}
      {renderContent()}

      {/* Image count */}
      {images.length > 0 && (
        <p className='text-center text-sm text-white/80'>
          {images.length} {images.length === 1 ? 'image' : 'images'} available
        </p>
      )}
    </div>
  )
}

// Main component
export default function OptimizedGalleryHero() {
  const t = useTranslations('GalleryPage.Hero')
  const locale = useLocale()
  const { isVisible, sectionRef } = useStaggeredAnimation(0.2)

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
    // For now, just log - you can implement lightbox or navigation here
    console.log('Image clicked:', image)
    // Could open lightbox modal or navigate to full gallery
  }, [])

  return (
    <section
      ref={sectionRef}
      className='relative isolate overflow-hidden py-16 sm:py-24'
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
        {/* Overlay for better text readability */}
        <div className='absolute inset-0 bg-black/40' />
      </div>

      <div className='mx-auto max-w-screen-xl px-4'>
        {/* Hero content */}
        <div
          className={clsx(
            'mb-12 text-center transition-all duration-1000 ease-out sm:mb-16',
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          )}
        >
          {/* Tagline image */}
          <div className='mb-8 flex justify-center'>
            <Image
              src={ASSETS.tagline}
              alt='Cascais Cup'
              width={300}
              height={80}
              priority
              className='h-auto max-w-[280px] drop-shadow-2xl sm:max-w-[320px]'
            />
          </div>

          <h1
            id='gallery-heading'
            className='mb-4 text-4xl font-extrabold uppercase tracking-wide text-white drop-shadow-lg sm:text-5xl lg:text-6xl'
          >
            {t('title') || 'Gallery'}
          </h1>

          <p className='mx-auto max-w-2xl text-lg text-white/90 drop-shadow sm:text-xl'>
            {t('subtitle') ||
              'Relive the best moments from Cascais Cup through the years'}
          </p>

          {/* Status and controls */}
          <div className='mt-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-center'>
            <StatusIndicator
              loading={loading}
              error={error}
              fromCache={fromCache}
              isStale={isStale}
              lastFetch={lastFetch}
            />

            {/* Total images count */}
            {!loading && !error && (
              <div className='text-sm text-white/80'>
                {getTotalImagesCount()} total images
              </div>
            )}

            {/* Refresh button */}
            {(error || isStale) && (
              <button
                onClick={refresh}
                className='inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50'
              >
                <FiRefreshCw
                  className={clsx('h-4 w-4', loading && 'animate-spin')}
                />
                {loading ? 'Refreshing...' : 'Refresh'}
              </button>
            )}
          </div>
        </div>

        {/* Gallery by year */}
        {!isEmpty && (
          <div className='grid gap-12 lg:gap-16'>
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
        )}

        {/* Empty state */}
        {isEmpty && !loading && (
          <div
            className={clsx(
              'mx-auto max-w-md text-center transition-all duration-1000 ease-out',
              isVisible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-8 opacity-0'
            )}
          >
            <div className='mx-auto mb-6 grid h-20 w-20 place-items-center rounded-full bg-white/20 backdrop-blur-sm'>
              <FiImage className='h-8 w-8 text-white' />
            </div>
            <h3 className='mb-3 text-xl font-bold text-white'>
              {t('empty_title') || 'No images available'}
            </h3>
            <p className='text-white/80'>
              {t('empty_description') ||
                'Gallery images will appear here soon. Check back later!'}
            </p>
            <button
              onClick={refresh}
              className='mt-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-6 py-3 font-medium text-white backdrop-blur-sm transition-all hover:bg-white/30'
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
