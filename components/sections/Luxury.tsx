'use client'

import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { 
  HiOutlineSparkles,
  HiOutlineStar,
  HiOutlineBell,
  HiOutlineArrowRight,
  HiOutlineShieldCheck,
  HiOutlineUserGroup,
  HiOutlineTruck,
  HiOutlineGlobeAlt,
  HiOutlineChip,
  HiOutlineHeart,
  HiOutlineCheckCircle
} from 'react-icons/hi'

import {HiOutlinePaintBrush} from 'react-icons/hi2'
import { GiWatch } from 'react-icons/gi'
import { FaUserTie, FaGem } from 'react-icons/fa'
import { IoDiamondOutline } from 'react-icons/io5'  // This works!

// Custom hook for intersection observer
function useIntersectionObserver(options = { threshold: 0.3, triggerOnce: true }) {
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

// Luxury brands list
const luxuryBrands = [
  { name: 'Chanel', category: 'Fashion', icon: 'C', color: 'text-white' },
  { name: 'Louis Vuitton', category: 'Fashion', icon: 'LV', color: 'text-yellow-400' },
  { name: 'Gucci', category: 'Fashion', icon: 'G', color: 'text-red-400' },
  { name: 'Hermès', category: 'Fashion', icon: 'H', color: 'text-orange-400' },
  { name: 'Dior', category: 'Fashion', icon: 'D', color: 'text-blue-400' },
  { name: 'Cartier', category: 'Jewelry', icon: <HiOutlineSparkles className="w-3 h-3" />, color: 'text-emerald-400' },
  { name: 'Rolex', category: 'Watches', icon: <GiWatch className="w-3 h-3" />, color: 'text-cyan-400' },
  { name: 'Prada', category: 'Fashion', icon: 'P', color: 'text-purple-400' },
]

const luxuryFeatures = [
  {
    icon: HiOutlineSparkles,
    title: '80+ Luxury Flagships',
    description: "World's most prestigious brands",
    color: 'from-yellow-600/20 to-amber-600/20',
    iconColor: 'text-yellow-400'
  },
  {
    icon: IoDiamondOutline,  // From react-icons/io5 - this works!
    title: 'Private Client Suites',
    description: 'Exclusive shopping experience',
    color: 'from-purple-600/20 to-pink-600/20',
    iconColor: 'text-purple-400'
  },
  {
    icon: HiOutlineBell,
    title: 'VIP Concierge Services',
    description: 'Personal shopping assistants',
    color: 'from-blue-600/20 to-cyan-600/20',
    iconColor: 'text-blue-400'
  },
  {
    icon: HiOutlinePaintBrush,
    title: 'Art Installations',
    description: 'Curated luxury experiences',
    color: 'from-emerald-600/20 to-teal-600/20',
    iconColor: 'text-emerald-400'
  }
]

const exclusiveServices = [
  { name: 'Personal Shopper', icon: HiOutlineUserGroup, color: 'text-yellow-400' },
  { name: 'Private Viewing', icon: HiOutlineStar, color: 'text-purple-400' },
  { name: 'Chauffeur Service', icon: HiOutlineTruck, color: 'text-blue-400' },
  { name: 'International Shipping', icon: HiOutlineGlobeAlt, color: 'text-emerald-400' },
  { name: 'VIP Lounge Access', icon: FaUserTie, color: 'text-pink-400' },
  { name: 'Tax Free Shopping', icon: HiOutlineShieldCheck, color: 'text-green-400' }
]

export default function Luxury() {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.3, triggerOnce: true })
  const [imageError, setImageError] = useState(false)
  const [selectedImage, setSelectedImage] = useState(0)

  const galleryImages = [
    'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=800&q=80',
    'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&q=80',
    'https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?w=800&q=80',
    'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=800&q=80'
  ]

  return (
    <section id="luxury" className="min-h-screen py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 md:px-8 lg:px-12 bg-gradient-to-b from-black via-zinc-950 to-black snap-section">
      <div className="max-w-7xl mx-auto">
        
        <div ref={ref as any}>
          {/* Header */}
          <div className={`text-center mb-10 sm:mb-12 md:mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <span className="inline-block text-xs sm:text-sm uppercase tracking-[0.2em] text-gray-400 bg-white/5 px-4 py-1.5 rounded-full mb-4">
              The Pinnacle of Luxury
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mt-3 sm:mt-4">
              <span className="block">Fashion Avenue</span>
              <span className="block mt-1 sm:mt-2 text-sm sm:text-base text-gray-400 font-normal tracking-wide">
                Where Elegance Meets Excellence
              </span>
            </h2>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-start">
            
            {/* Left Side - Image Gallery */}
            <div className="space-y-4 sm:space-y-6">
              {/* Main Image */}
              <div className={`relative rounded-2xl overflow-hidden aspect-[4/5] transition-all duration-700 delay-100 ${
                isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}>
                {!imageError ? (
                  <img
                    src={galleryImages[selectedImage]}
                    alt="Fashion Avenue Dubai Mall"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    onError={() => setImageError(true)}
                    loading="eager"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-yellow-900/30 to-black flex items-center justify-center">
                    <HiOutlineSparkles className="w-16 h-16 text-yellow-500/50" />
                  </div>
                )}
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur rounded-full px-3 py-1">
                  <span className="text-xs text-yellow-400 flex items-center gap-1">
                    <HiOutlineStar className="w-3 h-3" /> Premium Wing
                  </span>
                </div>
              </div>

              {/* Thumbnail Gallery */}
              <div className="grid grid-cols-4 gap-2 sm:gap-3">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative rounded-lg overflow-hidden aspect-square transition-all duration-300 ${
                      selectedImage === idx ? 'ring-2 ring-yellow-400 scale-95' : 'hover:scale-102'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Luxury gallery ${idx + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
                      selectedImage === idx ? 'opacity-0' : 'hover:opacity-0'
                    }`} />
                  </button>
                ))}
              </div>
            </div>

            {/* Right Side - Content */}
            <div className={`space-y-6 sm:space-y-8 transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}>
              {/* Description */}
              <div>
                <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                  Home to the world's leading luxury houses. An elevated retail environment
                  designed for the most discerning clientele. Where craftsmanship meets
                  architectural excellence.
                </p>
              </div>

              {/* Features Grid with React Icons */}
              <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                {luxuryFeatures.map((feature, idx) => {
                  const Icon = feature.icon
                  return (
                    <div
                      key={feature.title}
                      className={`glass-card rounded-xl p-4 hover:scale-102 transition-all duration-300 group cursor-default bg-gradient-to-br ${feature.color}`}
                      style={{ transitionDelay: `${200 + idx * 50}ms` }}
                    >
                      <div className="flex items-start gap-3">
                        <Icon className={`w-6 h-6 sm:w-7 sm:h-7 ${feature.iconColor} group-hover:scale-110 transition-transform`} />
                        <div>
                          <h3 className="text-sm sm:text-base font-semibold text-white">
                            {feature.title}
                          </h3>
                          <p className="text-xs text-gray-400 mt-0.5">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Luxury Brands Row */}
              <div className="pt-4">
                <p className="text-xs uppercase tracking-wider text-gray-500 mb-4 flex items-center gap-2">
                  <HiOutlineSparkles className="w-3 h-3 text-yellow-400" />
                  Featured Maisons
                </p>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {luxuryBrands.map((brand, idx) => (
                    <span
                      key={brand.name}
                      className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/5 text-gray-300 text-xs sm:text-sm hover:bg-white/10 hover:text-white transition-all duration-300 cursor-default flex items-center gap-1"
                      style={{ transitionDelay: `${idx * 20}ms` }}
                    >
                      {typeof brand.icon === 'string' ? brand.icon : brand.icon}
                      <span className="ml-1">{brand.name}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* VIP Services */}
              <div className="glass rounded-xl p-4 sm:p-5">
                <div className="flex items-center gap-2 mb-3">
                  <IoDiamondOutline className="text-yellow-400 w-4 h-4" />
                  <span className="text-xs uppercase tracking-wider text-gray-400">
                    Exclusive Services
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                  {exclusiveServices.map((service, idx) => {
                    const Icon = service.icon
                    return (
                      <span key={service.name} className="text-xs sm:text-sm text-gray-300 flex items-center gap-1.5">
                        <Icon className={`w-3 h-3 ${service.color}`} />
                        {service.name}
                      </span>
                    )
                  })}
                </div>
              </div>

              {/* CTA Button */}
              <div className="pt-4">
                <button className="group relative overflow-hidden rounded-full px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-semibold text-sm sm:text-base transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/20 w-full sm:w-auto">
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    View Luxury Opportunities
                    <HiOutlineArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                  </span>
                </button>
                <p className="text-gray-500 text-xs sm:text-sm mt-3 text-center sm:text-left flex items-center justify-center sm:justify-start gap-2">
                  <HiOutlineShieldCheck className="w-3 h-3 text-green-500" />
                  By invitation only • Limited availability
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}