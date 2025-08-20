import React, { useEffect, useRef } from 'react'
import UrlForm from '../components/UrlForm'
import UserUrl from '../components/UserUrl'
import { gsap } from 'gsap'

const DashboardPage = () => {
  const containerRef = useRef(null)
  const cardRef = useRef(null)

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(containerRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5 })
    }
    if (cardRef.current) {
      gsap.fromTo(cardRef.current, { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' })
    }
  }, [])
  return (
    <div ref={containerRef} className="min-h-[calc(100vh-64px)] bg-gradient-to-b from-white to-violet-50 dark:from-gray-950 dark:to-gray-900 flex flex-col items-center justify-center p-4">
      <div ref={cardRef} className="bg-white/90 dark:bg-gray-900/80 backdrop-blur p-8 rounded-2xl shadow-xl w-full max-w-5xl border border-violet-100 dark:border-gray-800">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">Your Dashboard</h1>
        <UrlForm/>
        <UserUrl/>
      </div>
    </div>
  )
}

export default DashboardPage