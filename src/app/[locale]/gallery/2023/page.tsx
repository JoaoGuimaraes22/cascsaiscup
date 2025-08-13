// app/[locale]/gallery/[year]/page.tsx
import Gallery from '../../components/Gallery/Gallery' // your old component (rename if needed)

export default function YearGalleryPage({
  params
}: {
  params: { locale: string; year: string }
}) {
  const folder = `gallery/${params.year}`
  return <Gallery folder={folder} maxResults={100} />
}
