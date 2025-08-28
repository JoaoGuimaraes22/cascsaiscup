// src/app/[locale]/gallery/[year]/page.tsx
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

// Generate static params for available years (for static generation)
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
    keywords: `Cascais Cup ${year}, volleyball tournament, beach volleyball, Portugal, photo gallery`,
    openGraph: {
      title: `Cascais Cup ${year} Gallery`,
      description: `Photo gallery from Cascais Cup ${year} volleyball tournament`,
      type: 'website',
      images: [
        {
          url: '/img/gallery/hero-bg.png',
          width: 1200,
          height: 600,
          alt: `Cascais Cup ${year} Gallery`
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: `Cascais Cup ${year} Gallery`,
      description: `Photo gallery from Cascais Cup ${year} volleyball tournament`
    },
    alternates: {
      canonical: `/${params.locale}/gallery/${year}`
    }
  }
}

// JSON-LD structured data for better SEO
function generateStructuredData(year: number, locale: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    name: `Cascais Cup ${year} Photo Gallery`,
    description: `Official photo gallery of Cascais Cup ${year} volleyball tournament`,
    url: `https://yourdomain.com/${locale}/gallery/${year}`,
    dateCreated: `${year}-01-01`,
    about: {
      '@type': 'SportsEvent',
      name: `Cascais Cup ${year}`,
      sport: 'Volleyball',
      startDate: `${year}-01-01`,
      location: {
        '@type': 'Place',
        name: 'Cascais, Portugal',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Cascais',
          addressCountry: 'PT'
        }
      }
    },
    publisher: {
      '@type': 'Organization',
      name: 'Cascais Cup',
      url: 'https://yourdomain.com'
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
  const structuredData = generateStructuredData(year, params.locale)

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />

      {/* Main gallery component */}
      <main>
        <OptimizedGallery
          year={year}
          maxResults={100}
          title={`${t('title')} ${year}`}
          description={`${t('yearDescription', { year })} ${year} - ${t('yearSubtitle', { year })} volleyball tournament in Cascais, Portugal.`}
        />
      </main>
    </>
  )
}
