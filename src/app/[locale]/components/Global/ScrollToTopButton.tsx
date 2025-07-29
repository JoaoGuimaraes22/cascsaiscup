'use client'

import { useEffect, useState } from 'react'
import { FaChevronUp } from 'react-icons/fa'

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 200)
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      onClick={scrollToTop}
      aria-label='Scroll to top'
      className={`hover:bg-accent dark:hover:bg-accent fixed bottom-6 right-6 z-50 rounded-full bg-primary p-3 text-white shadow-md transition-opacity dark:bg-secondary ${
        visible ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      <FaChevronUp className='h-5 w-5' />
    </button>
  )
}
