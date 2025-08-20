import React, { useEffect, useRef } from 'react';
import { Link } from '@tanstack/react-router';
import { gsap } from 'gsap'

const Navbar = () => {
  const navRef = useRef(null)
  const brandRef = useRef(null)

  useEffect(() => {
    if (!navRef.current) return
    gsap.fromTo(
      navRef.current,
      { y: -40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
    )
    if (brandRef.current) {
      gsap.fromTo(
        brandRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, delay: 0.2, duration: 0.8, ease: 'power3.out' }
      )
    }
  }, [])

  return (
    <nav ref={navRef} className="bg-white/80 dark:bg-gray-900/70 backdrop-blur border border-b-black sticky top-0 z-50">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left side - App Name */}
          <div className="flex items-center">
            <Link ref={brandRef} to="/" className="text-xl font-bold text-gray-800 dark:text-gray-100">
              <span className="text-violet-600">A-NI</span> The URL Shortner
            </Link>
          </div>
          
          {/* Right side - empty (only app name shown) */}
          <div className="flex items-center" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;