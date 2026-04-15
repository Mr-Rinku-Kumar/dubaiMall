'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { 
  HiOutlineSparkles,
  HiOutlineStar,
  HiOutlineUsers,
  HiOutlineTicket,
  HiOutlinePlay
} from 'react-icons/hi'
import { MdGirl } from "react-icons/md";
import { 
  GiFishbone, 
  GiIceSkate, 
  GiVrHeadset, 
  GiFilmStrip
} from 'react-icons/gi'
import { FaWater } from 'react-icons/fa'

interface Attraction {
  name: string
  desc: string
  longDesc: string
  video: string
  image: string
  stats: { [key: string]: string | number }
  icon: any
  iconColor: string
  color: string
}

const attractions: Attraction[] = [
  {
    name: 'Dubai Aquarium',
    desc: '10M+ liters • 140+ species',
    longDesc: 'Walk through a 48-meter tunnel surrounded by sharks, rays, and thousands of aquatic animals.',
    video: '/videos/aquarium.mp4',
    image: 'https://images.unsplash.com/photo-1582653291997-079a1b04e6d1?w=800&q=80',
    stats: { visitors: '10M+', species: 140 },
    icon: GiFishbone,
    iconColor: 'text-blue-400',
    color: 'from-blue-900/80 to-cyan-800/80'
  },
  {
    name: 'Dubai Ice Rink',
    desc: 'Olympic-sized • Year-round',
    longDesc: 'Glide on real ice in the middle of the desert. Skate rentals and lessons available.',
    video: '/videos/icerink.mp4',
    image: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?w=800&q=80',
    stats: { capacity: '200', size: 'Olympic' },
    icon: GiIceSkate,
    iconColor: 'text-cyan-400',
    color: 'from-cyan-900/80 to-blue-800/80'
  },
  {
    name: 'VR Park',
    desc: 'Immersive • Next-gen tech',
    longDesc: 'Over 30 cutting-edge virtual reality experiences for all ages.',
    video: '/videos/vrpark.mp4',
    image: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=800&q=80',
    stats: { experiences: 30, tech: 'VR/AR' },
    icon: GiVrHeadset,
    iconColor: 'text-purple-400',
    color: 'from-purple-900/80 to-pink-800/80'
  },
  {
    name: 'Dubai Fountain',
    desc: "World's largest choreographed",
    longDesc: 'Daily shows with water shooting up to 500 feet, synchronized to music.',
    video: '/videos/fountain.mp4',
    image: 'https://images.unsplash.com/photo-1536859357188-b3559ae7b35b?w=800&q=80',
    stats: { height: '500ft', shows: 'Daily' },
    icon: FaWater,
    iconColor: 'text-emerald-400',
    color: 'from-emerald-900/80 to-teal-800/80'
  },
  {
    name: 'KidZania',
    desc: 'Edutainment • Role-playing',
    longDesc: 'A mini-city where kids can try out different professions.',
    video: '/videos/kidzania.mp4',
    image: 'https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea?w=800&q=80',
    stats: { roles: 60, age: '4-16' },
    icon: MdGirl,
    iconColor: 'text-orange-400',
    color: 'from-orange-900/80 to-red-800/80'
  },
  {
    name: 'Cinema City',
    desc: '24 screens • IMAX • VIP',
    longDesc: 'State-of-the-art multiplex with luxury seating and gourmet concessions.',
    video: '/videos/cinema.mp4',
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&q=80',
    stats: { screens: 24, seats: '4,500+' },
    icon: GiFilmStrip,
    iconColor: 'text-red-400',
    color: 'from-red-900/80 to-rose-800/80'
  },
]

// Quick stats for the section
const quickStats = [
  { value: '6+', label: 'Attractions', icon: HiOutlineSparkles, color: 'text-yellow-400' },
  { value: '10M+', label: 'Annual Visitors', icon: HiOutlineUsers, color: 'text-blue-400' },
  { value: '24/7', label: 'Entertainment', icon: HiOutlineTicket, color: 'text-purple-400' },
]

export default function Entertainment() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [activeCard, setActiveCard] = useState<number | null>(null)
  const [videoErrors, setVideoErrors] = useState<{ [key: string]: boolean }>({})
  const [videoLoaded, setVideoLoaded] = useState<{ [key: string]: boolean }>({})
  const [visibleVideos, setVisibleVideos] = useState<{ [key: string]: boolean }>({})
  const [hasAnimated, setHasAnimated] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  // Track which videos are visible in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const videoId = entry.target.getAttribute('data-video-id')
          if (videoId && entry.isIntersecting) {
            setVisibleVideos(prev => ({ ...prev, [videoId]: true }))
          }
        })
      },
      { threshold: 0.1, rootMargin: '100px' } // Load slightly before visible
    )

    // Observe all video containers
    const videoElements = document.querySelectorAll('[data-video-container]')
    videoElements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  // Trigger animations only once
  useEffect(() => {
    if (!hasAnimated && sectionRef.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setHasAnimated(true)
            observer.disconnect()
          }
        },
        { threshold: 0.1 }
      )
      observer.observe(sectionRef.current)
      return () => observer.disconnect()
    }
  }, [hasAnimated])

  const handleVideoError = (name: string) => {
    setVideoErrors(prev => ({ ...prev, [name]: true }))
  }

  const handleVideoLoad = (name: string) => {
    setVideoLoaded(prev => ({ ...prev, [name]: true }))
  }

  const shouldAnimate = hasAnimated

  return (
    <section
      id="entertainment"
      ref={sectionRef}
      className="min-h-screen py-16 sm:py-20 md:py-24 bg-gradient-to-b from-black to-zinc-950 snap-section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        
        {/* Header - CSS transitions */}
        <div className={`text-center mb-10 sm:mb-12 md:mb-16 transition-all duration-700 ${
          shouldAnimate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <span className="inline-block text-xs sm:text-sm uppercase tracking-[0.2em] text-gray-400 bg-white/5 px-4 py-1.5 rounded-full mb-4">
            Beyond Shopping
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mt-2 sm:mt-3">
            Attractions & <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Entertainment</span>
          </h2>
          <p className="text-gray-400 mt-3 sm:mt-4 max-w-xl mx-auto text-sm sm:text-base">
            We don't just drive traffic. We create destinations.
          </p>
        </div>

        {/* Quick Stats Row - CSS transitions */}
        <div className={`grid grid-cols-3 gap-3 sm:gap-4 mb-8 sm:mb-10 max-w-2xl mx-auto transition-all duration-700 delay-100 ${
          shouldAnimate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          {quickStats.map((stat, idx) => {
            const Icon = stat.icon
            return (
              <div key={stat.label} className="glass-card rounded-xl p-2 sm:p-3 text-center">
                <Icon className={`w-4 h-4 sm:w-5 sm:h-5 mx-auto mb-1 ${stat.color}`} />
                <div className="text-xs sm:text-sm font-bold text-yellow-400">{stat.value}</div>
                <div className="text-[8px] sm:text-[10px] text-gray-500">{stat.label}</div>
              </div>
            )
          })}
        </div>

        {/* Horizontal Scroll Container */}
        <div
          ref={scrollContainerRef}
          className="overflow-x-auto overflow-y-hidden pb-6 hide-scrollbar"
          style={{ 
            scrollbarWidth: 'thin', 
            WebkitOverflowScrolling: 'touch',
            scrollSnapType: 'x mandatory'
          }}
        >
          <div className="flex gap-4 sm:gap-6 md:gap-8" style={{ width: 'max-content' }}>
            {attractions.map((attraction, i) => {
              const Icon = attraction.icon
              const hasVideoError = videoErrors[attraction.name]
              const isVideoLoaded = videoLoaded[attraction.name]
              const isVideoVisible = visibleVideos[attraction.name]
              const shouldLoadVideo = isVideoVisible || activeCard === i
              
              return (
                <div
                  key={attraction.name}
                  data-video-container
                  data-video-id={attraction.name}
                  onMouseEnter={() => setActiveCard(i)}
                  onMouseLeave={() => setActiveCard(null)}
                  className={`relative w-[85vw] sm:w-[70vw] md:w-[55vw] lg:w-[40vw] xl:w-[35vw] 
                    h-[55vh] sm:h-[60vh] md:h-[65vh] rounded-2xl overflow-hidden flex-shrink-0 
                    transition-all duration-500 hover:scale-[1.02] cursor-pointer group`}
                  style={{ scrollSnapAlign: 'start' }}
                >
                  {/* Loading Skeleton */}
                  {shouldLoadVideo && !isVideoLoaded && !hasVideoError && (
                    <div className="absolute inset-0 shimmer bg-gray-900/50 z-10" />
                  )}

                  {/* Video Background - Only loads when visible */}
                  {shouldLoadVideo && !hasVideoError ? (
                    <video
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      onLoadedData={() => handleVideoLoad(attraction.name)}
                      onError={() => handleVideoError(attraction.name)}
                      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                        isVideoLoaded ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      <source src={attraction.video} type="video/mp4" />
                    </video>
                  ) : null}

                  {/* Fallback Image */}
                  {(!shouldLoadVideo || hasVideoError || !isVideoLoaded) && (
                    <img
                      src={attraction.image}
                      alt={attraction.name}
                      className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
                      loading="lazy"
                    />
                  )}

                  {/* Gradient Overlays */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${attraction.color} opacity-60 group-hover:opacity-40 transition-opacity duration-500`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                  {/* Play Icon Badge */}
                  <div className="absolute top-4 right-4 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/50 backdrop-blur flex items-center justify-center group-hover:scale-110 transition-transform duration-300 z-20">
                    {shouldLoadVideo && !hasVideoError ? (
                      <HiOutlinePlay className="text-white text-xl sm:text-2xl" />
                    ) : (
                      <Icon className={`text-xl sm:text-2xl ${attraction.iconColor}`} />
                    )}
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 z-20">
                    <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white">
                      {attraction.name}
                    </h3>
                    <p className="text-gray-300 text-sm sm:text-base mt-1">
                      {attraction.desc}
                    </p>
                    
                    {/* Expanded Info on Hover */}
                    <div className={`overflow-hidden transition-all duration-300 ${
                      activeCard === i ? 'max-h-32 opacity-100 mt-3' : 'max-h-0 opacity-0'
                    }`}>
                      <p className="text-gray-200 text-xs sm:text-sm">
                        {attraction.longDesc}
                      </p>
                      <div className="flex gap-3 sm:gap-4 mt-2">
                        {Object.entries(attraction.stats).map(([key, value]) => (
                          <div key={key} className="text-center">
                            <div className="text-yellow-400 text-sm sm:text-base font-bold">
                              {String(value)}
                            </div>
                            <div className="text-gray-400 text-[10px] sm:text-xs uppercase">
                              {key}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Number Indicator */}
                  <div className="absolute top-4 left-4 text-white/30 text-xs sm:text-sm font-mono z-20">
                    {(i + 1).toString().padStart(2, '0')}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className={`flex justify-center mt-6 sm:mt-8 transition-all duration-700 delay-300 ${
          shouldAnimate ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="flex flex-col items-center gap-1">
            <span className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider flex items-center gap-2">
              <span>←</span> Scroll horizontally to explore <span>→</span>
            </span>
            <div className="flex gap-1 mt-2">
              {attractions.map((_, i) => (
                <div
                  key={i}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    activeCard === i ? 'bg-yellow-400 w-3' : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: thin;
        }
        .hide-scrollbar::-webkit-scrollbar {
          height: 4px;
        }
        .hide-scrollbar::-webkit-scrollbar-track {
          background: #1a1a1a;
          border-radius: 10px;
        }
        .hide-scrollbar::-webkit-scrollbar-thumb {
          background: #444;
          border-radius: 10px;
        }
        .hide-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #666;
        }
      `}</style>
    </section>
  )
}