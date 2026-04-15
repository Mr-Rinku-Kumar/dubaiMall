'use client'

import { useEffect, useState, useRef } from 'react'
import {
  HiOutlineSparkles,
  HiOutlineStar,
  HiOutlineGlobeAlt,
  HiOutlineMoon,
  HiOutlineArrowRight,
  HiOutlineChevronRight,
  HiOutlineLocationMarker
} from 'react-icons/hi'
import {
  GiNoodles,
  GiSushis,
  GiChopsticks,
  GiHamburger,
  GiOlive,
  GiCroissant,
  GiPizzaSlice,
  GiTacos
} from 'react-icons/gi'
import { FaUtensils, FaWineGlassAlt, FaCoffee } from 'react-icons/fa'

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

// Dining data with local images
const diningImages = [
  {
    src: '/images/finedining.jpg',
    name: 'Fine Dining',
    cuisine: 'International',
    rating: 4.9,
    price: '$$$$',
    icon: FaUtensils,
    location: 'Fashion Avenue Level 2'
  },
  {
    src: '/images/socialhouse.jpg',
    name: 'Social House',
    cuisine: 'Asian Fusion',
    rating: 4.7,
    price: '$$$',
    icon: GiNoodles,
    location: 'Waterfront Promenade'
  },
  {
    src: '/images/tribes.jpg',
    name: 'Tribes',
    cuisine: 'African',
    rating: 4.8,
    price: '$$$',
    icon: FaCoffee,
    location: 'Grand Atrium'
  },
  {
    src: '/images/cheesfactory.jpg',
    name: 'The Cheesecake Factory',
    cuisine: 'American',
    rating: 4.6,
    price: '$$',
    icon: GiHamburger,
    location: 'Level 1'
  },
]

// Cuisine types with correct React Icons
const cuisineTypes = [
  { name: 'Italian', count: 25, icon: GiPizzaSlice, color: 'text-red-400' },
  { name: 'Japanese', count: 18, icon: GiSushis, color: 'text-pink-400' },
  { name: 'Chinese', count: 22, icon: GiNoodles, color: 'text-red-500' },
  { name: 'Indian', count: 15, icon: GiTacos, color: 'text-orange-400' },
  { name: 'French', count: 12, icon: GiCroissant, color: 'text-blue-400' },
  { name: 'Mediterranean', count: 20, icon: GiOlive, color: 'text-green-400' },
  { name: 'American', count: 30, icon: GiHamburger, color: 'text-yellow-400' },
  { name: 'Middle Eastern', count: 28, icon: GiOlive, color: 'text-emerald-400' },
]

const diningStats = [
  { value: '200+', label: 'Restaurants', icon: FaUtensils, color: 'text-yellow-400' },
  { value: '50+', label: 'Cuisines', icon: HiOutlineGlobeAlt, color: 'text-blue-400' },
  { value: '15+', label: 'Michelin Stars', icon: HiOutlineStar, color: 'text-amber-400' },
  { value: '24/7', label: 'Dining Options', icon: HiOutlineMoon, color: 'text-purple-400' },
]

// Featured restaurants
const featuredRestaurants = [
  { name: 'At.mosphere', floor: '122nd Floor', cuisine: 'French', view: 'Burj Khalifa', icon: FaWineGlassAlt },
  { name: 'Thiptara', cuisine: 'Thai', view: 'Fountain View', icon: GiChopsticks },
  { name: 'Social House', cuisine: 'International', view: 'Waterfront', icon: FaUtensils },
]

export default function Dining() {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2, triggerOnce: true })
  const [videoError, setVideoError] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [shouldPlayVideo, setShouldPlayVideo] = useState(false)
  const [loadedImages, setLoadedImages] = useState<{ [key: string]: boolean }>({})
  const [hasAnimated, setHasAnimated] = useState(false)
  const [imageErrors, setImageErrors] = useState<{ [key: string]: boolean }>({})

  // Lazy load video - only when section is visible
  useEffect(() => {
    if (isVisible && !shouldPlayVideo) {
      setShouldPlayVideo(true)
    }
  }, [isVisible, shouldPlayVideo])

  // Trigger animations only once
  useEffect(() => {
    if (isVisible && !hasAnimated) {
      setHasAnimated(true)
    }
  }, [isVisible, hasAnimated])

  const shouldAnimate = hasAnimated || isVisible

  const handleImageLoad = (name: string) => {
    setLoadedImages(prev => ({ ...prev, [name]: true }))
  }

  const handleImageError = (name: string) => {
    setImageErrors(prev => ({ ...prev, [name]: true }))
  }

  return (
    <section id="dining" className="min-h-screen py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 lg:px-12 bg-gradient-to-b from-zinc-950 to-black snap-section">
      <div className="max-w-7xl mx-auto">

        <div ref={ref as any}>
          {/* Header */}
          <div className={`text-center mb-10 sm:mb-12 md:mb-16 transition-all duration-700 ${shouldAnimate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
            <span className="inline-block text-xs sm:text-sm uppercase tracking-[0.2em] text-gray-400 bg-white/5 px-4 py-1.5 rounded-full mb-4">
              Culinary Excellence
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mt-3 sm:mt-4">
              <span className="block">Dining as</span>
              <span className="block mt-1 sm:mt-2 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Destination
              </span>
            </h2>
            <p className="text-gray-400 mt-4 sm:mt-6 max-w-2xl mx-auto text-sm sm:text-base px-4">
              Over 200 dining concepts from global icons to local culinary experiences.
              Where people gather, stay, and spend.
            </p>
          </div>

          {/* Stats Row */}
          <div className={`grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-10 sm:mb-12 transition-all duration-700 delay-100 ${shouldAnimate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
            {diningStats.map((stat, idx) => {
              const Icon = stat.icon
              return (
                <div
                  key={stat.label}
                  className="glass-card rounded-xl p-3 sm:p-4 text-center hover:scale-105 transition-all duration-300"
                  style={{ transitionDelay: `${idx * 50}ms` }}
                >
                  <Icon className={`w-6 h-6 sm:w-7 sm:h-7 mx-auto mb-2 ${stat.color}`} />
                  <div className="text-lg sm:text-xl md:text-2xl font-bold text-yellow-400">
                    {stat.value}
                  </div>
                  <div className="text-[10px] sm:text-xs text-gray-400 mt-1">{stat.label}</div>
                </div>
              )
            })}
          </div>

          {/* Main Content - Left/Right Layout */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 xl:gap-16">

            {/* LEFT SIDE - Sticky Content */}
            <div className="lg:w-2/5 lg:sticky lg:top-24 h-fit">
              <div className={`space-y-4 sm:space-y-6 transition-all duration-700 delay-200 ${shouldAnimate ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                }`}>
                <div>
                  <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                    From Michelin-starred fine dining to authentic street food.
                    Every meal is an experience at Dubai Mall.
                  </p>
                </div>

                {/* Cuisine Types Grid */}
                <div>
                  <p className="text-xs uppercase tracking-wider text-gray-500 mb-3 flex items-center gap-2">
                    <HiOutlineSparkles className="w-3 h-3 text-yellow-400" />
                    Cuisine Varieties
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {cuisineTypes.map((cuisine, idx) => {
                      const Icon = cuisine.icon
                      return (
                        <div
                          key={cuisine.name}
                          className="flex items-center gap-2 glass-card rounded-lg p-2 hover:bg-white/5 transition-all duration-300"
                          style={{ transitionDelay: `${idx * 30}ms` }}
                        >
                          <Icon className={`text-lg ${cuisine.color}`} />
                          <div>
                            <div className="text-xs sm:text-sm font-medium text-white">
                              {cuisine.name}
                            </div>
                            <div className="text-[10px] text-gray-500">
                              {cuisine.count}+ venues
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Featured Restaurants */}
                <div>
                  <p className="text-xs uppercase tracking-wider text-gray-500 mb-3 flex items-center gap-2">
                    <HiOutlineStar className="w-3 h-3 text-yellow-400" />
                    Featured Restaurants
                  </p>
                  <div className="space-y-2">
                    {featuredRestaurants.map((restaurant, idx) => {
                      const Icon = restaurant.icon
                      return (
                        <div key={restaurant.name} className="glass-card rounded-lg p-3 flex items-center gap-3">
                          <Icon className="w-5 h-5 text-yellow-400" />
                          <div>
                            <div className="text-sm font-semibold text-white">{restaurant.name}</div>
                            <div className="text-[10px] text-gray-500">{restaurant.cuisine} • {restaurant.view || restaurant.floor}</div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Signature Experience */}
                <div className="glass rounded-xl p-4 sm:p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <HiOutlineSparkles className="text-yellow-400 w-4 h-4" />
                    <span className="text-xs uppercase tracking-wider text-gray-400">
                      Signature Experience
                    </span>
                  </div>
                  <p className="text-sm text-gray-300">
                    Dine with a view of the Dubai Fountain. Our waterfront restaurants
                    offer the most spectacular dining experience in the city.
                  </p>
                </div>

                {/* CTA Button */}
                <button className="group relative overflow-hidden rounded-full px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-semibold text-sm sm:text-base transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/20 w-full">
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Explore Dining Options
                    <HiOutlineArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                  </span>
                </button>
              </div>
            </div>

            {/* RIGHT SIDE - Visual Grid */}
            <div className="lg:w-3/5">
              {/* Video Section */}
              <div className={`rounded-xl sm:rounded-2xl overflow-hidden mb-4 sm:mb-6 aspect-video transition-all duration-700 delay-300 ${shouldAnimate ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}>
                {shouldPlayVideo && !videoError ? (
                  <>
                    {!videoLoaded && (
                      <div className="absolute inset-0 shimmer bg-gray-800 z-10" />
                    )}
                    <video
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      onLoadedData={() => setVideoLoaded(true)}
                      onError={() => setVideoError(true)}
                      className={`w-full h-full object-cover hover:scale-105 transition-transform duration-700 ${videoLoaded ? 'opacity-100' : 'opacity-0'
                        }`}
                      poster="/images/dining-poster.jpg"
                    >
                      <source src="/videos/dining1.mp4" type="video/mp4" />
                    </video>
                  </>
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center">
                    <span className="text-6xl">🍽️</span>
                  </div>
                )}
              </div>

              {/* Image Grid with Enhanced Overlay */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {diningImages.map((item, i) => {
                  const Icon = item.icon
                  return (
                    <div
                      key={item.name}
                      className={`group relative rounded-xl overflow-hidden aspect-square cursor-pointer transition-all duration-500 ${shouldAnimate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                        }`}
                      style={{ transitionDelay: `${i * 100}ms` }}
                    >
                      {/* Loading skeleton */}
                      {!loadedImages[item.name] && !imageErrors[item.name] && (
                        <div className="absolute inset-0 shimmer bg-gray-800" />
                      )}

                      {/* Image with fallback */}
                      {!imageErrors[item.name] ? (
                        <img
                          src={item.src}
                          alt={item.name}
                          className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ${loadedImages[item.name] ? 'opacity-100' : 'opacity-0'
                            }`}
                          onLoad={() => handleImageLoad(item.name)}
                          onError={() => handleImageError(item.name)}
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center">
                          <Icon className="w-12 h-12 text-gray-500" />
                        </div>
                      )}

                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="flex items-center gap-1.5">
                                <Icon className="w-3 h-3 text-yellow-400" />
                                <span className="text-white text-sm sm:text-base font-semibold block">
                                  {item.name}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 mt-1">
                                <HiOutlineLocationMarker className="w-3 h-3 text-gray-400" />
                                <span className="text-gray-300 text-xs">
                                  {item.location}
                                </span>
                              </div>
                              <span className="text-gray-300 text-xs">
                                {item.cuisine} • {item.price}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <HiOutlineStar className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                              <span className="text-white text-sm">{item.rating}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* View All Link */}
              <div className="text-center mt-6 sm:mt-8">
                <button className="text-gray-400 hover:text-white text-sm sm:text-base transition-colors duration-300 inline-flex items-center gap-1 group">
                  View all 200+ restaurants
                  <HiOutlineChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}