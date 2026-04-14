'use client'

import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { 
  HiOutlineLocationMarker, 
  HiOutlineUsers, 
  HiOutlineGlobeAlt,
  HiOutlineCurrencyDollar,
  HiOutlineTruck,
  HiOutlineTrendingUp
} from 'react-icons/hi'
import { HiOutlineTrophy ,HiOutlineMapPin,  HiOutlineBuildingOffice,
} from 'react-icons/hi2'
import { FaPlane } from 'react-icons/fa'

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

// Animated Counter Component with React Icons
function AnimatedCounter({ target, suffix = '', prefix = '', icon: Icon, iconColor = 'text-yellow-400' }: 
  { target: number; suffix?: string; prefix?: string; icon?: any; iconColor?: string }) {
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
      {Icon && <Icon className={`w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-3 ${iconColor}`} />}
      <div className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
        {prefix}{count.toLocaleString()}{suffix}
      </div>
    </div>
  )
}

const stats = [
  { 
    label: 'Annual Visitors', 
    value: 105, 
    suffix: 'M+', 
    prefix: '', 
    note: 'per year',
    icon: HiOutlineUsers,
    iconColor: 'text-blue-400'
  },
  { 
    label: 'Retail Space', 
    value: 13, 
    suffix: 'M', 
    prefix: '', 
    note: 'sq ft',
    icon: HiOutlineBuildingOffice,
    iconColor: 'text-green-400'
  },
  { 
    label: 'Nationalities', 
    value: 200, 
    suffix: '+', 
    prefix: '', 
    note: 'catchment',
    icon: HiOutlineGlobeAlt,
    iconColor: 'text-purple-400'
  },
  { 
    label: 'Annual Spend', 
    value: 10, 
    suffix: 'B+', 
    prefix: '$', 
    note: 'consumer spend',
    icon: HiOutlineCurrencyDollar,
    iconColor: 'text-emerald-400'
  },
]

const locationFeatures = [
  { 
    icon: HiOutlineMapPin, 
    title: 'Prime Location', 
    description: 'Sheikh Zayed Road, Dubai, UAE', 
    detail: 'Heart of New Dubai',
    color: 'text-red-400'
  },
  { 
    icon: FaPlane, 
    title: '15 mins from DXB', 
    description: 'Direct metro connection', 
    detail: '2nd busiest airport',
    color: 'text-cyan-400'
  },
  { 
    icon: HiOutlineGlobeAlt, 
    title: 'Global Hub', 
    description: 'Connecting East & West', 
    detail: '200+ nationalities',
    color: 'text-emerald-400'
  },
]

// Additional insights
const insights = [
  { value: '98%', label: 'Tenant Satisfaction', trend: '+5% vs 2023', icon: HiOutlineTrendingUp, color: 'text-green-400' },
  { value: '24/7', label: 'Operating Hours', trend: '365 days/year', icon: HiOutlineTrophy, color: 'text-yellow-400' },
  { value: '50K+', label: 'Daily Footfall', trend: 'Peak season 100K+', icon: HiOutlineUsers, color: 'text-blue-400' },
]

export default function Why() {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2, triggerOnce: true })

  return (
    <section id="why" className="min-h-screen py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 md:px-8 lg:px-12 bg-gradient-to-b from-black to-zinc-950 snap-section">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div ref={ref as any}>
          <div className={`text-center mb-12 sm:mb-16 md:mb-20 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <span className="inline-block text-xs sm:text-sm uppercase tracking-[0.2em] text-gray-400 bg-white/5 px-4 py-1.5 rounded-full mb-4">
              Why Choose Dubai Mall
            </span>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mt-4 sm:mt-6">
              <span className="block">Global Reach.</span>
              <span className="block mt-2 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
                Unmatched Scale.
              </span>
            </h2>
            
            <p className="text-gray-400 mt-4 sm:mt-6 max-w-2xl mx-auto text-sm sm:text-base md:text-lg px-4">
              Located at the heart of Dubai, connecting to the world's busiest international hub.
              Access to one of the highest-spending audiences in retail history.
            </p>
          </div>

          {/* Stats Grid - Responsive with Icons */}
          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 mb-12 sm:mb-16 md:mb-20">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="glass-card rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 text-center hover:scale-105 hover:shadow-xl transition-all duration-300"
              >
                <AnimatedCounter 
                  target={stat.value} 
                  suffix={stat.suffix} 
                  prefix={stat.prefix}
                  icon={stat.icon}
                  iconColor={stat.iconColor}
                />
                <div className="text-gray-400 text-xs sm:text-sm mt-2 sm:mt-3 font-medium">
                  {stat.label}
                </div>
                {stat.note && (
                  <div className="text-gray-600 text-[10px] sm:text-xs mt-1">
                    {stat.note}
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Location Features - Responsive Grid with Icons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 mb-12 sm:mb-16 md:mb-20">
            {locationFeatures.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                  className="glass rounded-xl sm:rounded-2xl p-5 sm:p-6 text-center sm:text-left hover:scale-102 hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4">
                    <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-yellow-500/20 to-orange-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`w-6 h-6 sm:w-7 sm:h-7 ${feature.color}`} />
                    </div>
                    <div className="text-center sm:text-left">
                      <h3 className="text-base sm:text-lg md:text-xl font-semibold text-white">
                        {feature.title}
                      </h3>
                      <p className="text-gray-400 text-sm sm:text-base mt-1">
                        {feature.description}
                      </p>
                      <p className="text-gray-500 text-xs sm:text-sm mt-2">
                        {feature.detail}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Additional Insights Bar */}
          <div className="grid grid-cols-1 xs:grid-cols-3 gap-3 sm:gap-4">
            {insights.map((insight, index) => {
              const Icon = insight.icon
              return (
                <motion.div
                  key={insight.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                  className="glass-card rounded-xl p-3 sm:p-4 text-center hover:scale-102 transition-all duration-300"
                >
                  <Icon className={`w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-2 ${insight.color}`} />
                  <div className="text-lg sm:text-xl md:text-2xl font-bold text-yellow-400">
                    {insight.value}
                  </div>
                  <div className="text-gray-400 text-xs sm:text-sm mt-1">
                    {insight.label}
                  </div>
                  <div className="text-gray-600 text-[10px] sm:text-xs mt-1">
                    {insight.trend}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}