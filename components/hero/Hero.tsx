'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  useEffect(() => {
    // Small delay for smoother entrance
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const scrollToNext = () => {
    const whySection = document.getElementById('why')
    if (whySection) {
      whySection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Stats data for easy maintenance
  const stats = [
    { icon: '📍', label: 'Dubai, UAE' },
    { icon: '👥', label: '100M+ Annual Visitors' },
    { icon: '🏆', label: 'Global Icon' },
    { icon: '⭐', label: '50,000+ Reviews' },
  ]

  return (
    <section className="relative h-screen w-full overflow-hidden snap-section">
      {/* Background Image with Lazy Loading */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
        {/* Loading skeleton */}
        {!imageLoaded && (
          <div className="absolute inset-0 shimmer bg-gray-900/50" />
        )}
        
        <img
          src="./images/dubai3.jpg"
          alt="Dubai Mall Aerial View"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            imageLoaded ? 'opacity-40' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
          loading="eager"
          fetchPriority="high"
        />
      </div>

      {/* Gradient Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

      {/* Content Container */}
      <div className="relative h-full flex flex-col items-center justify-center text-center px-4 sm:px-6 md:px-8 z-10">
        {/* Main Content */}
        <div className={`transition-all duration-700 delay-200 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          {/* Welcome Badge */}
          <span className="inline-block text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] text-gray-300 uppercase mb-4 sm:mb-6">
            Welcome to
          </span>
          
          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight">
            <span className="block">The World's Most</span>
            <span className="block mt-2 sm:mt-3 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
              Visited Destination
            </span>
          </h1>
        </div>

        {/* Stats & CTA Section */}
        <div className={`mt-6 sm:mt-8 md:mt-10 space-y-6 sm:space-y-8 transition-all duration-700 delay-500 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}>
          {/* Stats Row - Responsive Grid */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-6 px-4">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={`glass px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm md:text-base transition-all duration-300 hover:scale-105 hover:bg-white/10 cursor-default`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <span className="mr-1 sm:mr-2">{stat.icon}</span>
                <span className="text-gray-200">{stat.label}</span>
              </div>
            ))}
          </div>
          
          {/* CTA Button */}
          <button
            onClick={scrollToNext}
            className="group relative overflow-hidden rounded-full px-6 sm:px-8 md:px-10 py-3 sm:py-3.5 md:py-4 bg-white text-black font-semibold text-sm sm:text-base transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-white/20"
          >
            <span className="relative z-10 flex items-center gap-2">
              Explore the Experience
              <svg 
                className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-200" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-300 -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
          </button>
        </div>

        {/* Scroll Hint - Hidden on very small screens */}
        <div className={`absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 transition-all duration-1000 delay-1000 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="flex flex-col items-center gap-1 sm:gap-2 animate-bounce">
            <span className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-wider hidden sm:block">
              Scroll
            </span>
            <div className="w-5 sm:w-6 h-8 sm:h-10 border-2 border-white/30 rounded-full flex justify-center">
              <div className="w-1 sm:w-1.5 h-2 sm:h-3 bg-white rounded-full mt-2 animate-[scrollDown_1.5s_ease-in-out_infinite]" />
            </div>
          </div>
        </div>
      </div>

      {/* Custom Scroll Animation Keyframes - Add to globals.css if needed */}
      <style jsx>{`
        @keyframes scrollDown {
          0%, 100% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(8px); opacity: 0.5; }
        }
        .animate-[scrollDown_1.5s_ease-in-out_infinite] {
          animation: scrollDown 1.5s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}