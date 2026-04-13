'use client'

import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'

// Custom hook for intersection observer
function useIntersectionObserver(options = { threshold: 0.2, triggerOnce: true }) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true)
        if (options.triggerOnce && ref.current) {
          observer.unobserve(ref.current)
        }
      } else if (!options.triggerOnce) {
        setIsVisible(false)
      }
    }, { threshold: options.threshold })

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [options.threshold, options.triggerOnce])

  return { ref, isVisible }
}

// Tilt Card Component
function TiltCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateXValue = ((y - centerY) / centerY) * -5
    const rotateYValue = ((x - centerX) / centerX) * 5
    setRotateX(rotateXValue)
    setRotateY(rotateYValue)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX, rotateY }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`relative ${className}`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </motion.div>
  )
}

const brands = [
  'GUCCI', 'PRADA', 'LOUIS VUITTON', 'DIOR', 'CHANEL', 'HERMÈS',
  'CARTIER', 'ROLEX', 'TIFFANY & CO.', 'APPLE', 'ZARA', 'H&M', 
  'BURBERRY', 'FENDI', 'ARMANI', 'VERSACE'
]

// Additional brand categories for better context
const brandCategories = [
  { name: 'Luxury Fashion', count: 45, icon: '👗' },
  { name: 'Watches & Jewelry', count: 32, icon: '⌚' },
  { name: 'Electronics', count: 28, icon: '📱' },
  { name: 'Beauty & Cosmetics', count: 56, icon: '💄' },
]

export default function Retail() {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2, triggerOnce: true })
  const [videoError, setVideoError] = useState(false)

  return (
    <section id="retail" className="min-h-screen py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 lg:px-12 bg-gradient-to-b from-zinc-950 to-black snap-section">
      <div className="max-w-7xl mx-auto">
        
        {/* Video/Image Section */}
        <div ref={ref as any}>
          <div className={`relative rounded-xl sm:rounded-2xl overflow-hidden mb-12 sm:mb-16 aspect-video transition-all duration-700 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}>
            {/* Video with fallback */}
            {!videoError ? (
              <video
                autoPlay
                muted
                loop
                playsInline
                onError={() => setVideoError(true)}
                className="w-full h-full object-cover"
                poster="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80"
              >
                <source src="/videos/retail.mp4" type="video/mp4" />
              </video>
            ) : (
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80"
                alt="Dubai Mall Retail"
                className="w-full h-full object-cover"
              />
            )}
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />
            
            {/* Overlay Text */}
            <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
              <p className="text-white/80 text-xs sm:text-sm">1,200+ Stores • 12M+ sq ft of Retail Space</p>
            </div>
          </div>

          {/* Content */}
          <div className={`text-center mb-10 sm:mb-12 transition-all duration-700 delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <span className="text-xs sm:text-sm uppercase tracking-[0.2em] text-gray-400">
              Retail Ecosystem
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mt-3 sm:mt-4">
              <span className="block">Your Brand.</span>
              <span className="block mt-1 sm:mt-2 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                At Global Scale.
              </span>
            </h2>
            <p className="text-gray-400 mt-4 sm:mt-6 max-w-2xl mx-auto text-sm sm:text-base md:text-lg px-4">
              Join the world's most prestigious retail ecosystem. Over 1,200 stores spanning
              luxury flagships to emerging concepts. Your brand, on the global stage.
            </p>
          </div>

          {/* Brand Categories - Responsive Grid */}
          <div className={`grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-10 sm:mb-12 transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            {brandCategories.map((category, index) => (
              <div
                key={category.name}
                className="glass-card rounded-xl p-3 sm:p-4 text-center hover:scale-105 transition-all duration-300"
                style={{ transitionDelay: `${200 + index * 50}ms` }}
              >
                <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">{category.icon}</div>
                <div className="text-xs sm:text-sm font-semibold text-white">{category.name}</div>
                <div className="text-[10px] sm:text-xs text-gray-400 mt-1">{category.count}+ Brands</div>
              </div>
            ))}
          </div>

          {/* Brand Logo Grid - Responsive */}
          <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 mb-10 sm:mb-12 transition-all duration-700 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            {brands.map((brand, i) => (
              <TiltCard key={brand} className="w-full">
                <div
                  className="glass-card rounded-xl p-3 sm:p-4 text-center transition-all duration-300 hover:bg-white/10 cursor-pointer group"
                  style={{ transitionDelay: `${300 + i * 30}ms` }}
                >
                  <span className="text-gray-400 group-hover:text-white transition-colors duration-300 text-xs sm:text-sm md:text-base font-medium">
                    {brand}
                  </span>
                </div>
              </TiltCard>
            ))}
          </div>

          {/* Additional Info Bar */}
          <div className={`glass rounded-xl p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 transition-all duration-700 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <div className="text-center sm:text-left">
              <div className="text-lg sm:text-xl font-bold text-yellow-400">98%</div>
              <div className="text-xs sm:text-sm text-gray-400">Tenant Retention Rate</div>
            </div>
            <div className="w-px h-8 bg-white/10 hidden sm:block" />
            <div className="text-center sm:text-left">
              <div className="text-lg sm:text-xl font-bold text-yellow-400">$2,500+</div>
              <div className="text-xs sm:text-sm text-gray-400">Average Transaction Value</div>
            </div>
            <div className="w-px h-8 bg-white/10 hidden sm:block" />
            <div className="text-center sm:text-left">
              <div className="text-lg sm:text-xl font-bold text-yellow-400">35+</div>
              <div className="text-xs sm:text-sm text-gray-400">New Brands in 2024</div>
            </div>
          </div>

          {/* CTA Button */}
          <div className={`text-center mt-10 sm:mt-12 transition-all duration-700 delay-600 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <button className="group relative overflow-hidden rounded-full px-6 sm:px-8 py-3 sm:py-3.5 bg-white text-black font-semibold text-sm sm:text-base transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-white/20">
              <span className="relative z-10 flex items-center gap-2">
                Explore Leasing Opportunities →
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-300 -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
            </button>
            <p className="text-gray-500 text-xs sm:text-sm mt-4">
              Flexible terms • Pop-up options available • Global brands welcome
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}