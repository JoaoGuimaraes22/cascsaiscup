'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'

export default function CompetitionInfo() {
  const t = useTranslations('CompetitionPage.Info')

  // Assets
  const BG = '/img/competition/hero-bg.png'
  const WAVE_TOP = '/img/global/ondas-5.png'
  const WAVE_BOTTOM = '/img/global/ondas-3.png'
  const PLAYER = '/img/program/players.png'
  const SPONSOR = '/img/sponsors/cascais-camara-w.png'

  return (
    <section className='relative w-full overflow-hidden'>
      {/* Background */}
      <Image
        src={BG}
        alt=''
        fill
        className='absolute inset-0 -z-10 object-cover'
        decoding='async'
        loading='lazy'
        draggable={false}
      />

      {/* Top wave */}
      <div className='relative'>
        <Image
          src={WAVE_TOP}
          alt=''
          width={2048}
          height={160}
          className='block h-[120px] w-full sm:h-[140px] lg:h-auto lg:object-contain'
          decoding='async'
          loading='lazy'
          draggable={false}
        />
      </div>

      {/* Content (no bottom padding so it touches the wave) */}
      <div className='mx-auto max-w-screen-xl px-4 pb-0 pt-8 sm:pt-10 lg:pt-12'>
        <div className='grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12'>
          {/* LEFT — text */}
          <div className='space-y-5 lg:col-span-7'>
            <h2 className='text-2xl font-extrabold uppercase tracking-wide text-sky-500 sm:text-3xl'>
              {t('title')}
            </h2>

            <p className='text-slate-800/90'>{t('intro')}</p>

            <ul className='list-disc space-y-3 pl-5 text-slate-800/90'>
              <li>
                {t.rich('rules.item1', {
                  b: c => <strong className='font-extrabold'>{c}</strong>
                })}
              </li>
              <li>
                {t.rich('rules.item2', {
                  b: c => <strong className='font-extrabold'>{c}</strong>
                })}
              </li>
              <li>
                {t.rich('rules.item3', {
                  b: c => <strong className='font-extrabold'>{c}</strong>
                })}
              </li>
              <li>
                {t.rich('rules.item4', {
                  b: c => <strong className='font-extrabold'>{c}</strong>
                })}
              </li>
            </ul>

            <p className='text-slate-800/90'>
              {t.rich('notes.p1', {
                b: c => <strong className='font-extrabold'>{c}</strong>
              })}
            </p>
            <p className='text-slate-800/90'>{t('notes.p2')}</p>
            <p className='text-slate-800/90'>
              {t.rich('notes.p3', {
                b: c => <strong className='font-extrabold'>{c}</strong>
              })}
            </p>
            <p className='text-slate-800/90'>{t('notes.p4')}</p>
          </div>

          {/* RIGHT — player image (overlaps the wave) */}
          <div className='lg:col-span-5'>
            <div
              className='
                relative z-10 mx-auto mb-[-28px] h-[360px]
                w-full max-w-[520px] sm:mb-[-36px]
                sm:h-[420px] lg:mb-[-48px] lg:h-[520px]
              '
            >
              <Image
                src={PLAYER}
                alt={t('playerAlt')}
                fill
                className='object-contain object-center'
                sizes='(max-width: 1024px) 520px, 520px'
                decoding='async'
                loading='lazy'
                draggable={false}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave + sponsor overlay */}
      <div className='relative -mt-6 sm:-mt-8 lg:-mt-10'>
        {/* Wave image */}
        <Image
          src={WAVE_BOTTOM}
          alt=''
          width={2048}
          height={160}
          className='block h-[110px] w-full object-cover sm:h-[130px] lg:h-auto lg:object-contain'
          decoding='async'
          loading='lazy'
          draggable={false}
        />

        {/* Sponsor inside the wave: centered on mobile, left on desktop; behind the player */}
        <div className='absolute inset-0'>
          <div className='mx-auto flex h-full max-w-screen-xl items-center px-4'>
            <div className='flex w-full items-center justify-center lg:justify-start'>
              <Image
                src={SPONSOR}
                alt={t('sponsorAlt') || 'Câmara Municipal de Cascais'}
                width={240}
                height={80}
                className='h-auto w-[170px] opacity-95 sm:w-[200px] lg:w-[240px]'
                sizes='(max-width: 640px) 170px, (max-width: 1024px) 200px, 240px'
                decoding='async'
                loading='lazy'
                draggable={false}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
