// photos/page.tsx

// Cloud name: dek4semrg
// 	API Details - Key Name: Root ; Date Created: Jul 28, 2025; KEY: 686825371332954 SKEY: D7YTcStTqcj3oAoi6zTyRDRipQ0

import { useTranslations } from 'next-intl'
import Gallery from '../components/Photos/Gallery'

export default function PhotosPage() {
  const t = useTranslations('Gallery')

  return (
    <section>
      <Gallery maxResults={50} />
    </section>
  )
}
