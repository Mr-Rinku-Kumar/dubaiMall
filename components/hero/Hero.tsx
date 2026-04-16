'use client'

import { useEffect, useState, useRef } from 'react'
import { 
  HiOutlineLocationMarker, 
  HiOutlineUsers, 
  HiOutlineStar, 
  HiOutlineArrowRight,
} from 'react-icons/hi'
import { HiOutlineTrophy } from 'react-icons/hi2'

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const scrollToNext = () => {
    const whySection = document.getElementById('why')
    if (whySection) {
      whySection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const stats = [
    { icon: HiOutlineLocationMarker, label: 'Dubai, UAE', color: 'text-red-400', delay: 0 },
    { icon: HiOutlineUsers, label: '100M+ Visitors', color: 'text-blue-400', delay: 100 },
    { icon: HiOutlineTrophy, label: 'Global Icon', color: 'text-yellow-400', delay: 200 },
    { icon: HiOutlineStar, label: '50K+ Reviews', color: 'text-green-400', delay: 300 },
  ]

  return (
    <section className="relative min-h-screen w-full overflow-hidden snap-section">
      
      {/* Video Background Only - No image fallback to save bandwidth */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"  // Changed from auto to metadata - faster load
          className="absolute inset-0 w-full h-full object-cover"
          poster="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920&q=80"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/60 sm:bg-black/50" />
      </div>

      {/* Gradient Overlay - Better text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30" />

      {/* Content Container - Fully Responsive */}
      <div className="relative h-full min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6 md:px-8 lg:px-12 z-10">
        
        {/* Main Content */}
        <div className={`max-w-7xl mx-auto transition-all duration-700 delay-200 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          {/* Welcome Badge - Removed framer-motion */}
          <span className="inline-block text-[10px] sm:text-xs md:text-sm tracking-[0.2em] sm:tracking-[0.3em] text-gray-300 uppercase mb-3 sm:mb-4 md:mb-6 px-3 py-1 rounded-full bg-white/10 backdrop-blur">
            Welcome to
          </span>
          
          {/* Main Heading - Removed framer-motion */}
          <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-7xl font-bold tracking-tight">
            <span className="block">The World's Most</span>
            <span className="block mt-2 sm:mt-3 md:mt-4 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
              Visited Destination
            </span>
          </h1>
        </div>

        {/* Stats & CTA Section */}
        <div className={`mt-8 sm:mt-10 md:mt-12 lg:mt-16 space-y-6 sm:space-y-8 md:space-y-10 transition-all duration-700 delay-500 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}>
          
          {/* Stats Row - Responsive flex wrap */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 md:gap-4 lg:gap-6 px-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div
                  key={stat.label}
                  className="glass px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 rounded-full text-xs sm:text-sm md:text-base transition-all duration-300 hover:scale-105 hover:bg-white/15 cursor-default flex items-center gap-1.5 sm:gap-2"
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <Icon className={`${stat.color} text-xs sm:text-sm md:text-base`} />
                  <span className="text-gray-200 text-[11px] xs:text-xs sm:text-sm md:text-base whitespace-nowrap">
                    {stat.label}
                  </span>
                </div>
              )
            })}
          </div>
          
          {/* CTA Button - Removed framer-motion */}
          <button
            onClick={scrollToNext}
            className="group relative overflow-hidden rounded-full px-6 sm:px-8 md:px-10 lg:px-12 py-3 sm:py-3.5 md:py-4 lg:py-5 bg-white text-black font-semibold text-sm sm:text-base md:text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-white/20 flex items-center gap-2 mx-auto"
          >
            <span className="relative z-10 flex items-center gap-2">
              Explore the Experience
              <HiOutlineArrowRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform duration-200" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-300 -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
          </button>
        </div>

        {/* Scroll Hint - Responsive */}
        <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 lg:bottom-10 left-1/2 -translate-x-1/2">
          <div className="flex flex-col items-center gap-1 sm:gap-2 animate-bounce">
            <span className="text-[8px] xs:text-[10px] sm:text-xs text-gray-400 uppercase tracking-wider hidden xs:block">
              Scroll to explore
            </span>
            <div className="w-4 xs:w-5 sm:w-6 h-6 xs:h-8 sm:h-10 border-2 border-white/30 rounded-full flex justify-center">
              <div className="w-1 sm:w-1.5 h-1.5 xs:h-2 sm:h-3 bg-white rounded-full mt-1 xs:mt-2 sm:mt-2 animate-[scrollDown_1.5s_ease-in-out_infinite]" />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scrollDown {
          0%, 100% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(6px); opacity: 0.5; }
        }
        .animate-[scrollDown_1.5s_ease-in-out_infinite] {
          animation: scrollDown 1.5s ease-in-out infinite;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        /* Extra small devices */
        @media (min-width: 320px) {
          .xs\\:block { display: block; }
        }
      `}</style>
    </section>
  )
}