'use client'

import { useEffect, useState, useCallback, useRef, useMemo } from 'react'
import { useTranslations } from 'next-intl'
import {
  FiGrid,
  FiList,
  FiDownload,
  FiShare2,
  FiX,
  FiChevronLeft,
  FiChevronRight,
  FiLoader
} from 'react-icons/fi'
import clsx from 'clsx'

// Import our optimized components
import {
  useOptimizedGallery,
  ProcessedImage
} from '@/hooks/useOptimizedGallery'
import OptimizedCloudinaryImage from './OptimizedCloudinaryImage'

interface OptimizedGalleryProps {
  folder?: string
  year?: number
  maxResults?: number
  title?: string
  description?: string
}

type ViewMode = 'grid' | 'masonry'
type GridSize = 'small' | 'medium' | 'large'

// Virtual scrolling configuration
const ITEMS_PER_PAGE = 20

// Lightbox component
interface LightboxProps {
  image: ProcessedImage | null
  images: ProcessedImage[]
  isOpen: boolean
  onClose: () => void
  onNext: () => void
  onPrevious: () => void
}

function Lightbox({
  image,
  images,
  isOpen,
  onClose,
  onNext,
  onPrevious
}: LightboxProps) {
  const [imageLoaded, setImageLoaded] = useState(false)

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose()
          break
        case 'ArrowLeft':
          onPrevious()
          break
        case 'ArrowRight':
          onNext()
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose, onNext, onPrevious])

  // Reset image loaded state when image changes
  useEffect(() => {
    setImageLoaded(false)
  }, [image?.public_id])

  if (!isOpen || !image) return null

  const currentIndex = images.findIndex(
    img => img.public_id === image.public_id
  )
  const hasNext = currentIndex < images.length - 1
  const hasPrevious = currentIndex > 0

  return (
    <div className='fixed inset-0 z-50 bg-black/95 backdrop-blur-sm'>
      {/* Close button */}
      <button
        onClick={onClose}
        className='absolute right-4 top-4 z-10 rounded-full p-2 text-white transition-colors hover:bg-white/20'
        aria-label='Close lightbox'
      >
        <FiX className='h-6 w-6' />
      </button>

      {/* Navigation */}
      {hasPrevious && (
        <button
          onClick={onPrevious}
          className='absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full p-3 text-white transition-colors hover:bg-white/20'
          aria-label='Previous image'
        >
          <FiChevronLeft className='h-6 w-6' />
        </button>
      )}

      {hasNext && (
        <button
          onClick={onNext}
          className='absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full p-3 text-white transition-colors hover:bg-white/20'
          aria-label='Next image'
        >
          <FiChevronRight className='h-6 w-6' />
        </button>
      )}

      {/* Image container */}
      <div className='flex h-full items-center justify-center p-4'>
        <div className='relative max-h-full max-w-full'>
          {!imageLoaded && (
            <div className='absolute inset-0 flex items-center justify-center'>
              <FiLoader className='h-8 w-8 animate-spin text-white' />
            </div>
          )}

          <OptimizedCloudinaryImage
            publicId={image.public_id}
            alt={`Gallery image ${currentIndex + 1}`}
            width={1200}
            height={900}
            quality={85}
            className={clsx(
              'max-h-full max-w-full object-contain transition-opacity duration-300',
              imageLoaded ? 'opacity-100' : 'opacity-0'
            )}
            onLoad={() => setImageLoaded(true)}
            priority
            sizes='100vw'
          />
        </div>
      </div>

      {/* Image info */}
      <div className='absolute bottom-4 left-4 right-4 text-center text-white'>
        <p className='text-sm opacity-80'>
          {currentIndex + 1} of {images.length}
        </p>
        <p className='mt-1 text-xs opacity-60'>
          {image.format?.toUpperCase()} • {image.width} × {image.height}
        </p>
      </div>
    </div>
  )
}

// Grid item component with lazy loading
interface GridItemProps {
  image: ProcessedImage
  size: GridSize
  onClick: (image: ProcessedImage) => void
  index: number
}

function GridItem({ image, size, onClick, index }: GridItemProps) {
  const [inView, setInView] = useState(false)
  const itemRef = useRef<HTMLDivElement>(null)

  // Intersection observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.unobserve(entry.target)
        }
      },
      { rootMargin: '100px' }
    )

    if (itemRef.current) {
      observer.observe(itemRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const sizeClasses = {
    small: 'aspect-square',
    medium: 'aspect-[4/3]',
    large: 'aspect-[3/2]'
  }

  const dimensions = {
    small: { width: 300, height: 300 },
    medium: { width: 400, height: 300 },
    large: { width: 500, height: 333 }
  }

  return (
    <div
      ref={itemRef}
      className={clsx(
        'group relative cursor-pointer overflow-hidden rounded-lg',
        'ring-1 ring-black/5 transition-all duration-300',
        'hover:-translate-y-1 hover:shadow-lg hover:ring-2 hover:ring-sky-300/50',
        sizeClasses[size]
      )}
      onClick={() => onClick(image)}
      style={{
        animationDelay: `${(index % 20) * 50}ms`
      }}
    >
      {inView ? (
        <OptimizedCloudinaryImage
          publicId={image.public_id}
          alt={`Gallery image ${index + 1}`}
          width={dimensions[size].width}
          height={dimensions[size].height}
          quality={70}
          className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-110'
          loading='lazy'
          sizes={`(max-width: 768px) 50vw, (max-width: 1024px) 33vw, ${100 / (size === 'small' ? 5 : size === 'medium' ? 4 : 3)}vw`}
        />
      ) : (
        <div className='h-full w-full animate-pulse bg-slate-200' />
      )}

      {/* Hover overlay */}
      <div className='absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100' />

      {/* Image info on hover */}
      <div className='absolute bottom-2 left-2 right-2 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
        <p className='truncate text-xs'>
          {image.format?.toUpperCase()} • {image.width} × {image.height}
        </p>
      </div>
    </div>
  )
}

export default function OptimizedGallery({
  folder,
  year,
  maxResults = 50,
  title,
  description
}: OptimizedGalleryProps) {
  const t = useTranslations('GalleryPage')

  // Gallery state
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [gridSize, setGridSize] = useState<GridSize>('medium')
  const [selectedImage, setSelectedImage] = useState<ProcessedImage | null>(
    null
  )
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  // Use our optimized gallery hook
  const {
    data,
    imagesByYear,
    loading,
    error,
    fromCache,
    refresh,
    getImagesForYear
  } = useOptimizedGallery(maxResults)

  // Get images based on folder or year
  const images = useMemo(() => {
    if (year && imagesByYear[year]) {
      return imagesByYear[year]
    }

    // If specific folder requested, would need separate API call
    if (folder) {
      // For now, return empty array - would implement separate hook for folder-specific queries
      return []
    }

    // Return all images from all years
    return Object.values(imagesByYear).flat()
  }, [imagesByYear, year, folder])

  // Paginated images
  const paginatedImages = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    return images.slice(startIndex, startIndex + ITEMS_PER_PAGE)
  }, [images, currentPage])

  const totalPages = Math.ceil(images.length / ITEMS_PER_PAGE)

  // Lightbox handlers
  const openLightbox = useCallback((image: ProcessedImage) => {
    setSelectedImage(image)
    setLightboxOpen(true)
  }, [])

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false)
    setSelectedImage(null)
  }, [])

  const nextImage = useCallback(() => {
    if (!selectedImage) return
    const currentIndex = images.findIndex(
      img => img.public_id === selectedImage.public_id
    )
    const nextIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0
    setSelectedImage(images[nextIndex])
  }, [selectedImage, images])

  const previousImage = useCallback(() => {
    if (!selectedImage) return
    const currentIndex = images.findIndex(
      img => img.public_id === selectedImage.public_id
    )
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1
    setSelectedImage(images[prevIndex])
  }, [selectedImage, images])

  // Grid size classes
  const gridClasses = {
    small: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5',
    medium: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    large: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
  }

  if (loading && images.length === 0) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <div className='text-center'>
          <FiLoader className='mx-auto mb-4 h-8 w-8 animate-spin text-sky-500' />
          <p className='text-slate-600'>Loading gallery...</p>
        </div>
      </div>
    )
  }

  if (error && images.length === 0) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <div className='max-w-md text-center'>
          <div className='mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100'>
            <FiX className='h-8 w-8 text-red-500' />
          </div>
          <h3 className='mb-2 text-xl font-bold text-slate-900'>
            Failed to load gallery
          </h3>
          <p className='mb-4 text-slate-600'>{error}</p>
          <button
            onClick={refresh}
            className='rounded-lg bg-sky-500 px-6 py-2 text-white transition-colors hover:bg-sky-600'
          >
            Try again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-white'>
      {/* Header */}
      <div className='border-b border-slate-200 bg-slate-50'>
        <div className='mx-auto max-w-screen-xl px-4 py-8'>
          <div className='flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between'>
            <div>
              <h1 className='text-3xl font-bold text-slate-900'>
                {title || (year ? `Gallery ${year}` : 'Photo Gallery')}
              </h1>
              {description && (
                <p className='mt-2 text-slate-600'>{description}</p>
              )}
              <p className='mt-1 text-sm text-slate-500'>
                {images.length} {images.length === 1 ? 'image' : 'images'}
                {fromCache && (
                  <span className='ml-2 text-sky-600'>• Cached</span>
                )}
              </p>
            </div>

            {/* Controls */}
            <div className='flex items-center gap-4'>
              {/* Grid size controls */}
              <div className='flex items-center gap-1 rounded-lg border border-slate-200 bg-white p-1'>
                {(['small', 'medium', 'large'] as GridSize[]).map(size => (
                  <button
                    key={size}
                    onClick={() => setGridSize(size)}
                    className={clsx(
                      'rounded-md px-3 py-2 text-sm font-medium transition-colors',
                      gridSize === size
                        ? 'bg-sky-500 text-white'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    )}
                  >
                    {size.charAt(0).toUpperCase() + size.slice(1)}
                  </button>
                ))}
              </div>

              {/* View mode toggle */}
              <div className='flex items-center gap-1 rounded-lg border border-slate-200 bg-white p-1'>
                <button
                  onClick={() => setViewMode('grid')}
                  className={clsx(
                    'rounded-md p-2 transition-colors',
                    viewMode === 'grid'
                      ? 'bg-sky-500 text-white'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  )}
                  aria-label='Grid view'
                >
                  <FiGrid className='h-4 w-4' />
                </button>
                <button
                  onClick={() => setViewMode('masonry')}
                  className={clsx(
                    'rounded-md p-2 transition-colors',
                    viewMode === 'masonry'
                      ? 'bg-sky-500 text-white'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  )}
                  aria-label='Masonry view'
                >
                  <FiList className='h-4 w-4' />
                </button>
              </div>

              {/* Refresh button */}
              <button
                onClick={refresh}
                className='rounded-lg border border-slate-200 bg-white p-2 text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900'
                disabled={loading}
                aria-label='Refresh gallery'
              >
                <FiLoader
                  className={clsx('h-4 w-4', loading && 'animate-spin')}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery grid */}
      <div className='mx-auto max-w-screen-xl px-4 py-8'>
        {images.length > 0 ? (
          <>
            <div className={clsx('grid gap-4', gridClasses[gridSize])}>
              {paginatedImages.map((image, index) => (
                <GridItem
                  key={image.public_id}
                  image={image}
                  size={gridSize}
                  onClick={openLightbox}
                  index={index}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className='mt-12 flex items-center justify-center gap-4'>
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className='px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-50'
                >
                  <FiChevronLeft className='mr-1 inline h-4 w-4' />
                  Previous
                </button>

                <div className='flex items-center gap-2'>
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const page =
                      currentPage <= 3
                        ? i + 1
                        : currentPage >= totalPages - 2
                          ? totalPages - 4 + i
                          : currentPage - 2 + i

                    if (page < 1 || page > totalPages) return null

                    return (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={clsx(
                          'h-8 w-8 rounded-md text-sm font-medium transition-colors',
                          currentPage === page
                            ? 'bg-sky-500 text-white'
                            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                        )}
                      >
                        {page}
                      </button>
                    )
                  })}
                </div>

                <button
                  onClick={() =>
                    setCurrentPage(prev => Math.min(totalPages, prev + 1))
                  }
                  disabled={currentPage === totalPages}
                  className='px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-50'
                >
                  Next
                  <FiChevronRight className='ml-1 inline h-4 w-4' />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className='py-24 text-center'>
            <div className='mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100'>
              <FiGrid className='h-8 w-8 text-slate-400' />
            </div>
            <h3 className='mb-2 text-xl font-semibold text-slate-900'>
              No images found
            </h3>
            <p className='text-slate-600'>
              {year
                ? `No images available for ${year}`
                : 'This gallery is empty'}
            </p>
          </div>
        )}
      </div>

      {/* Lightbox */}
      <Lightbox
        image={selectedImage}
        images={images}
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        onNext={nextImage}
        onPrevious={previousImage}
      />
    </div>
  )
}
