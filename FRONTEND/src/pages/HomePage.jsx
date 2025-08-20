
import React, { useEffect, useRef } from 'react'
import UrlForm from '../components/UrlForm'
import { gsap } from 'gsap'

const HomePage = () => {
  const containerRef = useRef(null)
  const cardRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return
    gsap.fromTo(containerRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6 })
    if (cardRef.current) {
      gsap.fromTo(cardRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.1 })
    }
  }, [])
  return (
    <div ref={containerRef} className="min-h-[calc(100vh-64px)] bg-gradient-to-b from-white to-violet-50 dark:from-gray-950 dark:to-gray-900 flex flex-col items-center justify-center p-4">
      <div ref={cardRef} className="bg-white/90 dark:bg-gray-900/80 backdrop-blur p-8 rounded-2xl shadow-xl w-full max-w-xl border border-violet-100 dark:border-gray-800">
        <h1 className="text-3xl font-extrabold text-center mb-2 text-gray-900 dark:text-white">
          Shorten links beautifully
        </h1>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-6">Paste a long URL and get a neat, shareable short link.</p>
        <UrlForm/>
      </div>
    </div>
  )
}

export default HomePage