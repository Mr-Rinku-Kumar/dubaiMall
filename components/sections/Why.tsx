'use client'

import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'

// Custom hook for intersection observer (no external dependency)
// Native intersection observer hook
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

// Animated Counter Component
function AnimatedCounter({ target, suffix = '', prefix = '' }: { target: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0)
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.5, triggerOnce: true })

  useEffect(() => {
    if (isVisible) {
      let start = 0
      const duration = 1500
      const increment = target / (duration / 16)
      
      const timer = setInterval(() => {
        start += increment
        if (start >= target) {
          setCount(target)
          clearInterval(timer)
        } else {
          setCount(Math.floor(start))
        }
      }, 16)
      
      return () => clearInterval(timer)
    }
  }, [isVisible, target])

  return (
    <div ref={ref as any} className="text-center">
      <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
        {prefix}{count.toLocaleString()}{suffix}
      </div>
    </div>
  )
}

const stats = [
  { label: 'Annual Visitors', value: 105, suffix: 'M+', prefix: '', note: 'per year' },
  { label: 'Retail Space', value: 13, suffix: 'M', prefix: '', note: 'sq ft' },
  { label: 'Nationalities', value: 200, suffix: '+', prefix: '', note: 'catchment' },
  { label: 'Annual Spend', value: 10, suffix: 'B+', prefix: '$', note: 'consumer spend' },
]

const locationFeatures = [
  { icon: '📍', title: 'Prime Location', description: 'Sheikh Zayed Road, Dubai, UAE', detail: 'Heart of New Dubai' },
  { icon: '✈️', title: '15 mins from DXB', description: 'Direct metro connection', detail: '2nd busiest airport' },
  { icon: '🌍', title: 'Global Hub', description: 'Connecting East & West', detail: '200+ nationalities' },
]

export default function Why() {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2, triggerOnce: true })

  return (
    <section id="why" className="min-h-screen py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-8 lg:px-12 bg-black snap-section">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div ref={ref as any}>
          <div className={`text-center mb-12 sm:mb-16 md:mb-20 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <span className="text-xs sm:text-sm uppercase tracking-[0.15em] sm:tracking-[0.2em] text-gray-400">
              Why Dubai Mall
            </span>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mt-4 sm:mt-6">
              <span className="block">Global Reach.</span>
              <span className="block mt-2 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                Unmatched Scale.
              </span>
            </h2>
            
            <p className="text-gray-400 mt-4 sm:mt-6 max-w-2xl mx-auto text-sm sm:text-base md:text-lg px-4">
              Located at the heart of Dubai, connecting to the world's busiest international hub.
              Access to one of the highest-spending audiences in retail history.
            </p>
          </div>

          {/* Stats Grid - Responsive */}
          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16 md:mb-20">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={`glass-card rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center transition-all duration-500 hover:scale-105 hover:shadow-xl ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <AnimatedCounter target={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
                <div className="text-gray-400 text-xs sm:text-sm mt-2 sm:mt-3 font-medium">
                  {stat.label}
                </div>
                {stat.note && (
                  <div className="text-gray-600 text-[10px] sm:text-xs mt-1">
                    {stat.note}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Location Features - Responsive Grid */}
          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 transition-all duration-700 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            {locationFeatures.map((feature, index) => (
              <div
                key={feature.title}
                className="glass rounded-xl sm:rounded-2xl p-5 sm:p-6 text-center sm:text-left transition-all duration-300 hover:scale-102 hover:shadow-lg"
                style={{ transitionDelay: `${300 + index * 100}ms` }}
              >
                <div className="text-2xl sm:text-3xl mb-2 sm:mb-3">{feature.icon}</div>
                <h3 className="text-base sm:text-lg md:text-xl font-semibold mt-1 sm:mt-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm sm:text-base mt-1">
                  {feature.description}
                </p>
                <p className="text-gray-500 text-xs sm:text-sm mt-2">
                  {feature.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}