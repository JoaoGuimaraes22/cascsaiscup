// components/LandingComments.tsx
import { useTranslations } from 'next-intl'

export default function LandingComments() {
  const t = useTranslations('LandingComments')

  return (
    <section className='bg-background-secondary py-20 max-lg:py-10'>
      <div className='mx-auto grid max-w-screen-lg grid-cols-3 gap-7 px-8 py-5 max-lg:max-w-fit max-lg:grid-cols-1 max-lg:gap-10'>
        <div className='text-center'>
          <h2 className='mb-3  text-xl font-semibold'>
            {t('We_love_cascais_cup_1')}
          </h2>
          <p className='text-text-secondary max-lg:max-w-[500px]'>
            {t('We_love_author_1')}
          </p>
        </div>
        <div className='text-center'>
          <h2 className='mb-3  text-xl font-semibold'>
            {t('We_love_cascais_cup_2')}
          </h2>
          <p className='text-text-secondary max-lg:max-w-[500px]'>
            {t('We_love_author_2')}
          </p>
        </div>
        <div className='text-center'>
          <h2 className='mb-3  text-xl font-semibold'>
            {t('We_love_cascais_cup_3')}
          </h2>
          <p className='text-text-secondary max-lg:max-w-[500px]'>
            {t('We_love_author_3')}
          </p>
        </div>
      </div>
    </section>
  )
}
