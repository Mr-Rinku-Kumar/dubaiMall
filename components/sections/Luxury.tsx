'use client'

import { useEffect, useState, useRef } from 'react'
import { 
  HiOutlineSparkles,
  HiOutlineStar,
  HiOutlineBell,
  HiOutlineArrowRight,
  HiOutlineShieldCheck,
  HiOutlineUserGroup,
  HiOutlineTruck,
  HiOutlineGlobeAlt,
  HiOutlineCheckCircle,
  HiOutlineLocationMarker
} from 'react-icons/hi'
import { HiOutlinePaintBrush } from 'react-icons/hi2'
import { GiWatch } from 'react-icons/gi'
import { FaUserTie, FaGem, FaCrown } from 'react-icons/fa'
import { IoDiamondOutline } from 'react-icons/io5'

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

// Luxury brands list with React Icons
const luxuryBrands = [
  { name: 'Chanel', category: 'Fashion', icon: <FaCrown className="w-3 h-3" />, color: 'text-white' },
  { name: 'Louis Vuitton', category: 'Fashion', icon: 'LV', color: 'text-yellow-400' },
  { name: 'Gucci', category: 'Fashion', icon: 'G', color: 'text-red-400' },
  { name: 'Hermès', category: 'Fashion', icon: 'H', color: 'text-orange-400' },
  { name: 'Dior', category: 'Fashion', icon: 'D', color: 'text-blue-400' },
  { name: 'Cartier', category: 'Jewelry', icon: <FaGem className="w-3 h-3" />, color: 'text-emerald-400' },
  { name: 'Rolex', category: 'Watches', icon: <GiWatch className="w-3 h-3" />, color: 'text-cyan-400' },
  { name: 'Prada', category: 'Fashion', icon: 'P', color: 'text-purple-400' },
  { name: 'Fendi', category: 'Fashion', icon: 'F', color: 'text-pink-400' },
  { name: 'Burberry', category: 'Fashion', icon: 'B', color: 'text-amber-400' },
]

const luxuryFeatures = [
  {
    icon: HiOutlineSparkles,
    title: '80+ Luxury Flagships',
    description: "World's most prestigious brands",
    color: 'from-yellow-600/20 to-amber-600/20',
    iconColor: 'text-yellow-400',
    stat: '80+'
  },
  {
    icon: IoDiamondOutline,
    title: 'Private Client Suites',
    description: 'Exclusive shopping experience',
    color: 'from-purple-600/20 to-pink-600/20',
    iconColor: 'text-purple-400',
    stat: '6 Suites'
  },
  {
    icon: HiOutlineBell,
    title: 'VIP Concierge Services',
    description: 'Personal shopping assistants',
    color: 'from-blue-600/20 to-cyan-600/20',
    iconColor: 'text-blue-400',
    stat: '24/7'
  },
  {
    icon: HiOutlinePaintBrush,
    title: 'Art Installations',
    description: 'Curated luxury experiences',
    color: 'from-emerald-600/20 to-teal-600/20',
    iconColor: 'text-emerald-400',
    stat: 'Year-round'
  }
]

const exclusiveServices = [
  { name: 'Personal Shopper', icon: HiOutlineUserGroup, color: 'text-yellow-400', desc: 'Dedicated assistance' },
  { name: 'Private Viewing', icon: HiOutlineStar, color: 'text-purple-400', desc: 'Exclusive previews' },
  { name: 'Chauffeur Service', icon: HiOutlineTruck, color: 'text-blue-400', desc: 'Luxury transport' },
  { name: 'International Shipping', icon: HiOutlineGlobeAlt, color: 'text-emerald-400', desc: 'Worldwide delivery' },
  { name: 'VIP Lounge Access', icon: FaUserTie, color: 'text-pink-400', desc: 'Premium comfort' },
  { name: 'Tax Free Shopping', icon: HiOutlineShieldCheck, color: 'text-green-400', desc: 'Instant refund' },
]

const galleryImages = [
  { src: '/images/luxury1.jpg', alt: 'Fashion Avenue Luxury Walkway' },
  { src: '/images/luxury2.jpg', alt: 'Luxury Brand Storefront' },
  { src: '/images/luxury3.jpg', alt: 'Premium Shopping Experience' },
  { src: '/images/luxury4.jpg', alt: 'Elegant Fashion Display' },
]

export default function Luxury() {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.3, triggerOnce: true })
  const [imageErrors, setImageErrors] = useState<{ [key: number]: boolean }>({})
  const [selectedImage, setSelectedImage] = useState(0)
  const [loadedImages, setLoadedImages] = useState<{ [key: number]: boolean }>({})
  const [hasAnimated, setHasAnimated] = useState(false)

  // Trigger animations only once
  useEffect(() => {
    if (isVisible && !hasAnimated) {
      setHasAnimated(true)
    }
  }, [isVisible, hasAnimated])

  const shouldAnimate = hasAnimated || isVisible

  const handleImageLoad = (index: number) => {
    setLoadedImages(prev => ({ ...prev, [index]: true }))
  }

  const handleImageError = (index: number) => {
    setImageErrors(prev => ({ ...prev, [index]: true }))
  }

  const currentImage = galleryImages[selectedImage]

  return (
    <section id="luxury" className="min-h-screen py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 md:px-8 lg:px-12 bg-gradient-to-b from-black via-zinc-950 to-black snap-section">
      <div className="max-w-7xl mx-auto">
        
        <div ref={ref as any}>
          {/* Header */}
          <div className={`text-center mb-10 sm:mb-12 md:mb-16 transition-all duration-700 ${
            shouldAnimate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
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
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-sm sm:text-base">
              Experience the world's most prestigious collection of luxury brands
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-start">
            
            {/* Left Side - Image Gallery */}
            <div className="space-y-4 sm:space-y-6">
              {/* Main Image */}
              <div className={`relative rounded-2xl overflow-hidden aspect-[4/5] transition-all duration-700 delay-100 ${
                shouldAnimate ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}>
                {/* Loading Skeleton */}
                {!loadedImages[selectedImage] && !imageErrors[selectedImage] && (
                  <div className="absolute inset-0 shimmer bg-gray-800 z-10" />
                )}
                
                {!imageErrors[selectedImage] ? (
                  <img
                    src={currentImage.src}
                    alt={currentImage.alt}
                    className={`w-full h-full object-cover hover:scale-105 transition-transform duration-700 ${
                      loadedImages[selectedImage] ? 'opacity-100' : 'opacity-0'
                    }`}
                    onLoad={() => handleImageLoad(selectedImage)}
                    onError={() => handleImageError(selectedImage)}
                    loading="eager"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-yellow-900/30 to-black flex items-center justify-center">
                    <FaCrown className="w-16 h-16 text-yellow-500/50" />
                  </div>
                )}
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur rounded-full px-3 py-1 z-20">
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
                      src={img.src}
                      alt={img.alt}
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
              shouldAnimate ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}>
              {/* Description */}
              <div>
                <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                  Home to the world's leading luxury houses. An elevated retail environment
                  designed for the most discerning clientele. Where craftsmanship meets
                  architectural excellence.
                </p>
              </div>

              {/* Features Grid */}
              <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                {luxuryFeatures.map((feature, idx) => {
                  const Icon = feature.icon
                  return (
                    <div
                      key={feature.title}
                      className={`glass-card rounded-xl p-4 hover:scale-102 transition-all duration-300 group cursor-default bg-gradient-to-br ${feature.color}`}
                      style={{ transitionDelay: `${idx * 50}ms` }}
                    >
                      <div className="flex items-start gap-3">
                        <div className="relative">
                          <Icon className={`w-6 h-6 sm:w-7 sm:h-7 ${feature.iconColor} group-hover:scale-110 transition-transform`} />
                          <span className="absolute -top-2 -right-2 text-[10px] font-bold text-yellow-400 bg-black/50 rounded-full px-1">
                            {feature.stat}
                          </span>
                        </div>
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
                  <span className="text-[10px] text-gray-600">| 10+ Luxury Brands</span>
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
                      <div key={service.name} className="group">
                        <span className="text-xs sm:text-sm text-gray-300 flex items-center gap-1.5">
                          <Icon className={`w-3 h-3 ${service.color} group-hover:scale-110 transition-transform`} />
                          <span className="group-hover:text-white transition-colors">{service.name}</span>
                        </span>
                        <p className="text-[8px] sm:text-[10px] text-gray-500 ml-5">{service.desc}</p>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Quick Stats Bar */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                <div className="glass-card rounded-xl p-2 sm:p-3 text-center">
                  <div className="text-yellow-400 text-lg sm:text-xl font-bold">2.5M+</div>
                  <div className="text-gray-500 text-[8px] sm:text-[10px]">Monthly Visitors</div>
                </div>
                <div className="glass-card rounded-xl p-2 sm:p-3 text-center">
                  <div className="text-yellow-400 text-lg sm:text-xl font-bold">$5K+</div>
                  <div className="text-gray-500 text-[8px] sm:text-[10px]">Avg. Transaction</div>
                </div>
                <div className="glass-card rounded-xl p-2 sm:p-3 text-center">
                  <div className="text-yellow-400 text-lg sm:text-xl font-bold">40+</div>
                  <div className="text-gray-500 text-[8px] sm:text-[10px]">Countries</div>
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