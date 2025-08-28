// /gallery/[year]/page.tsx
import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import OptimizedGallery from '../../components/Gallery/Gallery'

// Define available years (could also come from API/database)
const AVAILABLE_YEARS = [2023, 2024, 2025]

interface YearGalleryPageProps {
  params: {
    locale: string
    year: string
  }
}

// Generate static params for available years (optional, for static generation)
export async function generateStaticParams() {
  return AVAILABLE_YEARS.map(year => ({
    year: year.toString()
  }))
}

// Generate metadata for each year page
export async function generateMetadata({ params }: YearGalleryPageProps) {
  const year = parseInt(params.year)

  // Validate year
  if (!AVAILABLE_YEARS.includes(year)) {
    return {
      title: 'Gallery Not Found',
      description: 'The requested gallery year is not available.'
    }
  }

  const t = await getTranslations('GalleryPage')

  return {
    title: `${t('title')} ${year} | Cascais Cup`,
    description: `${t('description')} ${year}. View photos and highlights from the Cascais Cup ${year} volleyball tournament.`,
    openGraph: {
      title: `Cascais Cup ${year} Gallery`,
      description: `Photo gallery from Cascais Cup ${year} volleyball tournament`,
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title: `Cascais Cup ${year} Gallery`,
      description: `Photo gallery from Cascais Cup ${year} volleyball tournament`
    }
  }
}

export default async function YearGalleryPage({
  params
}: YearGalleryPageProps) {
  const year = parseInt(params.year)

  // Validate year - return 404 if invalid
  if (!AVAILABLE_YEARS.includes(year)) {
    notFound()
  }

  const t = await getTranslations('GalleryPage')

  return (
    <OptimizedGallery
      year={year}
      maxResults={100}
      title={`${t('title')} ${year}`}
      description={`${t('yearDescription', { year })} ${year}`}
    />
  )
}
