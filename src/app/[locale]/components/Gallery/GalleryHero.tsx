'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { CldImage } from 'next-cloudinary'
import { useTranslations, useLocale } from 'next-intl'
import { Link } from '@/src/navigation'

type CloudinaryImage = {
  public_id: string
  url: string
  created_at: string
  width: number
  height: number
  format: string
}

type YearConfig = { year: number; folder: string }

export default function GalleryHeroNew() {
  const t = useTranslations('GalleryPage.Hero')
  const locale = useLocale()

  const BG = '/img/gallery/hero-bg.png'
  const TAGLINE = '/img/global/tagline-w.png'

  const YEARS: YearConfig[] = [
    { year: 2023, folder: 'gallery/2023' },
    { year: 2024, folder: 'gallery/2024' },
    { year: 2025, folder: 'gallery/2025' }
  ]

  const [imagesByYear, setImagesByYear] = useState<
    Record<number, CloudinaryImage[]>
  >({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    ;(async () => {
      try {
        const results = await Promise.all(
          YEARS.map(async ({ year, folder }) => {
            const res = await fetch(
              `/api/cloudinary?folder=${encodeURIComponent(folder)}&max=4`
            )
            if (!res.ok)
              throw new Error(`cloudinary fetch failed for ${folder}`)
            const data = await res.json()
            return [year, (data.images || []) as CloudinaryImage[]] as const
          })
        )
        const map: Record<number, CloudinaryImage[]> = {}
        results.forEach(([year, imgs]) => (map[year] = imgs))
        setImagesByYear(map)
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  return (
    <section
      className='relative w-full overflow-hidden'
      style={{ minHeight: '89vh' }}
    >
      {/* Background already includes wave + player */}
      <Image
        src={BG}
        alt=''
        fill
        className='absolute inset-0 -z-10 object-cover'
        sizes='100vw'
        priority
        draggable={false}
      />

      {/* Header copy (top-right) */}
      <div className='mx-auto max-w-screen-xl px-4 pt-6 sm:pt-8'>
        <div className='flex justify-end'>
          <div className='text-right'>
            <h1 className='text-2xl font-extrabold uppercase tracking-wide text-sky-600 sm:text-3xl'>
              {t('title')}
            </h1>
            <p className='mt-1 text-sm text-slate-700 sm:text-base'>
              {t('subtitle')}
            </p>
          </div>
        </div>
      </div>

      {/* Year cards */}
      <div className='mx-auto flex h-full max-w-screen-xl flex-col justify-end px-4 pb-6 pt-4 sm:pb-8'>
        <div className='grid grid-cols-1 gap-5 md:grid-cols-3'>
          {YEARS.map(({ year }) => {
            const imgs = imagesByYear[year] || []
            return (
              <article key={year} className='flex flex-col'>
                <div className='mb-2 text-left text-lg font-extrabold uppercase tracking-wide text-sky-600'>
                  {year}
                </div>

                <div className='rounded-xl bg-white/95 p-3 shadow-sm ring-1 ring-black/5 backdrop-blur-sm'>
                  {error ? (
                    <div className='grid aspect-[4/3] place-items-center text-slate-400'>
                      {t('error_message')}
                    </div>
                  ) : imgs.length === 0 ? (
                    <div className='grid aspect-[4/3] place-items-center text-slate-400'>
                      {loading ? t('loading') : t('empty_message')}
                    </div>
                  ) : (
                    <div className='grid grid-cols-2 gap-2 sm:gap-3'>
                      {imgs.slice(0, 4).map(img => (
                        <div
                          key={img.public_id}
                          className='relative aspect-[4/3] overflow-hidden rounded-md ring-1 ring-black/5'
                        >
                          <CldImage
                            src={img.public_id}
                            width={600}
                            height={450}
                            crop='fill'
                            gravity='auto'
                            quality='auto'
                            format='auto'
                            alt={`${t('image_alt')} ${img.public_id}`}
                            className='h-full w-full object-cover'
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* See more (INSIDE the box) */}
                  <div className='mt-3 text-right'>
                    <Link
                      lang={locale}
                      href={{
                        pathname: '/gallery/[year]',
                        params: { year: String(year) }
                      }}
                      className='inline-flex items-center rounded-full bg-sky-600 px-4 py-1.5 text-sm font-bold text-white shadow ring-1 ring-black/10 hover:bg-sky-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300'
                      aria-label={`${t('see_more')} ${year}`}
                    >
                      {t('see_more')}
                    </Link>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>

      {/* Bottom-right tagline */}
      <div className='pointer-events-none absolute bottom-3 right-4 sm:bottom-4 sm:right-6'>
        <Image
          src={TAGLINE}
          alt={t('taglineAlt')}
          width={420}
          height={140}
          className='h-auto w-[220px] sm:w-[320px] lg:w-[380px]'
          sizes='(max-width: 640px) 220px, (max-width: 1024px) 320px, 380px'
          decoding='async'
          draggable={false}
        />
      </div>
    </section>
  )
}
