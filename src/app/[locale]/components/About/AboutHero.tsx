'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'

export default function AboutHero() {
  const t = useTranslations('AboutPage.Hero')

  // ===== Assets =====
  const BG = '/img/about/about-bg.png'
  const HERO = '/img/about/about-hero.png'
  const WAVE = '/img/global/ondas-3.png'
  const CLUB_LOGO = '/img/sponsors/volley4all.png'
  const SP_CASCAIS_ESTORIL = '/img/sponsors/cascais-estoril.png'
  const SP_CAMARA = '/img/sponsors/cascais-camara.png'
  const SP_CAM_FORD = '/img/sponsors/cam-ford.png'

  const sponsors = [
    {
      src: SP_CASCAIS_ESTORIL,
      alt: t('sponsors.cascaisEstorilAlt'),
      w: 140,
      h: 56
    },
    { src: SP_CAMARA, alt: t('sponsors.camaraAlt'), w: 160, h: 56 },
    { src: SP_CAM_FORD, alt: t('sponsors.camFordAlt'), w: 150, h: 56 }
  ]
  const club = { src: CLUB_LOGO, alt: t('club.logoAlt'), w: 260, h: 70 }

  return (
    <section
      className='
        relative min-h-[calc(100vh-80px)] w-full overflow-x-hidden md:h-[calc(100vh-80px)]
        md:overflow-hidden lg:pb-[135px]
      '
    >
      {/* Background */}
      <div className='absolute inset-0 z-0'>
        <Image
          src={BG}
          alt=''
          role='presentation'
          fill
          className='object-cover'
          sizes='100vw'
          priority
        />
      </div>

      {/* Right image panel (desktop+) */}
      <div className='absolute inset-y-0 right-0 z-0 hidden w-[34vw] md:block'>
        <Image
          src={HERO}
          alt=''
          role='presentation'
          fill
          className='object-cover object-top'
          sizes='(max-width: 768px) 0px, 34vw'
        />
      </div>

      {/* Content container */}
      <div className='relative z-10 mx-auto h-full max-w-screen-xl px-4 pb-8 pt-20 md:pb-20 md:pr-[34vw]'>
        <div className='space-y-6'>
          <h2 className='text-3xl font-extrabold uppercase text-sky-500 md:text-4xl'>
            {t('title')}
          </h2>

          <p className='text-sm leading-relaxed text-slate-700 sm:text-base'>
            {t('p1')}
          </p>
          <p className='text-sm leading-relaxed text-slate-700 sm:text-base'>
            {t('p2')}
          </p>
          <p className='text-sm leading-relaxed text-slate-700 sm:text-base'>
            {t('p3')}
          </p>
          <p className='text-sm leading-relaxed text-slate-700 sm:text-base'>
            {t('p4')}
          </p>

          {/* ---- MOBILE: 2x2 grid + CTA with matched width ---- */}
          <div className='md:hidden'>
            {/* Wrapper controls width for BOTH grid and button */}
            <div className='mx-auto w-full max-w-[360px]'>
              <div className='grid grid-cols-2 gap-4'>
                {[...sponsors, club].map((item, i) => (
                  <div key={i} className='flex items-center justify-center p-2'>
                    <Image
                      src={item.src}
                      alt={item.alt}
                      width={item.w}
                      height={item.h}
                      className='h-14 w-auto object-contain'
                      loading='lazy'
                      decoding='async'
                      sizes='(max-width: 640px) 45vw, 160px'
                    />
                  </div>
                ))}
              </div>

              {/* CTA matches the grid width (same wrapper) */}
              <a
                href='https://volley4all.com'
                target='_blank'
                rel='noopener noreferrer'
                className='mt-4 block w-full rounded-md bg-sky-600 px-6 py-2 text-center font-bold text-white shadow-md ring-1 ring-black/10 hover:bg-sky-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300'
              >
                {t('cta')}
              </a>
            </div>
          </div>

          {/* ---- DESKTOP/TABLET: original row layout + CTA ---- */}
          <div className='hidden md:block'>
            <div className='flex flex-wrap items-center gap-6'>
              {sponsors.map((s, i) => (
                <div key={i} className='flex items-center justify-center p-3'>
                  <Image
                    src={s.src}
                    alt={s.alt}
                    width={s.w}
                    height={s.h}
                    className='h-16 w-auto object-contain'
                    loading='lazy'
                    decoding='async'
                    sizes='(max-width: 1024px) 160px, 200px'
                  />
                </div>
              ))}
              <div className='flex items-center justify-center p-3'>
                <Image
                  src={club.src}
                  alt={club.alt}
                  width={club.w}
                  height={club.h}
                  className='h-16 w-auto object-contain'
                  loading='lazy'
                  decoding='async'
                  sizes='260px'
                />
              </div>
            </div>

            <a
              href='https://volley4all.com'
              target='_blank'
              rel='noopener noreferrer'
              className='mt-2 inline-block rounded-md bg-sky-600 px-6 py-2 font-bold text-white shadow-md ring-1 ring-black/10 hover:bg-sky-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300'
            >
              {t('cta')}
            </a>
          </div>
        </div>

        {/* Mobile banner */}
        <div className='relative mt-3 block h-56 w-full overflow-hidden rounded-md md:hidden'>
          <Image
            src={HERO}
            alt=''
            role='presentation'
            fill
            className='object-cover object-top'
            sizes='100vw'
            priority
          />
        </div>
      </div>

      {/* Bottom wave (desktop only) */}
      <div className='pointer-events-none absolute bottom-0 left-1/2 z-20 hidden w-screen -translate-x-1/2 lg:block'>
        <Image
          src={WAVE}
          alt=''
          role='presentation'
          width={2048}
          height={135}
          className='-mb-px block h-[135px] w-full object-cover'
          sizes='100vw'
          priority
        />
      </div>
    </section>
  )
}
