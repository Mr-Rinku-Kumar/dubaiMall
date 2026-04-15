'use client'

import Link from 'next/link'
import { useEffect, useState, useRef } from 'react'
import { 
  HiOutlineCalendar, 
  HiOutlineUsers, 
  HiOutlineOfficeBuilding, 
  HiOutlineStar,
  HiOutlineSparkles,
  HiOutlineArrowRight,
  HiOutlineLocationMarker,
  HiOutlineCheckCircle
} from 'react-icons/hi'
import { CgGirl } from "react-icons/cg";
import { HiOutlineRocketLaunch } from "react-icons/hi2";
import { FaTheaterMasks, FaBuilding, FaMicrophoneAlt } from 'react-icons/fa'
import { GiClothes, GiSpeaker } from 'react-icons/gi'

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

// Original icons - KEEP AS IS
const eventTypes = [
  { name: 'Concerts', icon: CgGirl, desc: 'Global artists. Iconic venues.', color: 'from-purple-500/20 to-pink-500/20', iconColor: 'text-purple-400' },
  { name: 'Brand Activations', icon: HiOutlineSparkles, desc: 'Immersive. Viral. Unforgettable.', color: 'from-blue-500/20 to-cyan-500/20', iconColor: 'text-blue-400' },
  { name: 'Exhibitions', icon: CgGirl, desc: 'Cultural. Curated. Global.', color: 'from-green-500/20 to-emerald-500/20', iconColor: 'text-green-400' },
  { name: 'Product Launches', icon: HiOutlineRocketLaunch, desc: 'Maximum impact. Maximum reach.', color: 'from-orange-500/20 to-red-500/20', iconColor: 'text-orange-400' },
  { name: 'Corporate Events', icon: HiOutlineOfficeBuilding, desc: 'Conferences. Galas. Networking.', color: 'from-indigo-500/20 to-purple-500/20', iconColor: 'text-indigo-400' },
  { name: 'Fashion Shows', icon: GiClothes, desc: 'Runway. Luxury. Press coverage.', color: 'from-pink-500/20 to-rose-500/20', iconColor: 'text-pink-400' },
]

const venueHighlights = [
  { name: 'Fashion Catwalk', capacity: '500+', features: 'LED walls, Professional lighting', image: '/images/fashioncatwalk.webp', icon: GiSpeaker },
  { name: 'Central Atrium', capacity: '1,000+', features: 'High footfall, Multi-level', image: '/images/central.jpg', icon: HiOutlineLocationMarker },
  { name: 'Waterfront Stage', capacity: '2,000+', features: 'Fountain views, Outdoor', image: '/images/waterfront.jpg', icon: HiOutlineSparkles },
]

const eventStats = [
  { value: '200+', label: 'Events Yearly', icon: HiOutlineCalendar, color: 'text-yellow-400' },
  { value: '50K+', label: 'Avg Attendance', icon: HiOutlineUsers, color: 'text-blue-400' },
  { value: '100+', label: 'Global Brands', icon: HiOutlineOfficeBuilding, color: 'text-green-400' },
  { value: '98%', label: 'Satisfaction', icon: HiOutlineStar, color: 'text-purple-400' },
]

const venueModules = [
  { name: 'Performing Arts Center', capacity: '2,500 seats', icon: FaTheaterMasks, features: 'Acoustic design, Backstage facilities', color: 'text-purple-400' },
  { name: 'Exposition Center', capacity: '10,000+ sqm', icon: FaBuilding, features: 'Modular halls, Loading docks', color: 'text-blue-400' },
  { name: 'Convention Hall', capacity: '3,000 seats', icon: FaMicrophoneAlt, features: 'AV equipment, Translation booths', color: 'text-green-400' },
]

const pastBrands = ['Chanel', 'Apple', 'Nike', 'Dior', 'Samsung', 'Rolex', 'Mercedes', 'TikTok']

export default function Events() {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2, triggerOnce: true })
  const [videoError, setVideoError] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [shouldPlayVideo, setShouldPlayVideo] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)

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

  return (
    <section id="events" className="min-h-screen py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 lg:px-12 bg-gradient-to-b from-zinc-950 to-black snap-section">
      <div className="max-w-7xl mx-auto">

        <div ref={ref as any}>
          {/* Header - CSS transitions only (removed framer-motion) */}
          <div className={`text-center mb-10 sm:mb-12 md:mb-16 transition-all duration-700 ${
            shouldAnimate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <span className="inline-block text-xs sm:text-sm uppercase tracking-[0.2em] text-gray-400 bg-white/5 px-4 py-1.5 rounded-full mb-4">
              Event Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mt-3 sm:mt-4">
              <span className="block">A Global Stage</span>
              <span className="block mt-1 sm:mt-2 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                for Brands
              </span>
            </h2>
            <p className="text-gray-400 mt-4 sm:mt-6 max-w-2xl mx-auto text-sm sm:text-base px-4">
              Fashion shows. Product launches. Live experiences. Position your brand
              in front of millions at the world's most visited destination.
            </p>
          </div>

          {/* Event Stats Row - CSS transitions */}
          <div className={`grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-10 sm:mb-12 transition-all duration-700 delay-100 ${
            shouldAnimate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            {eventStats.map((stat, idx) => {
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

          {/* Video Section - Lazy loaded */}
          <div className={`relative rounded-xl sm:rounded-2xl overflow-hidden mb-10 sm:mb-12 aspect-video transition-all duration-700 delay-200 ${
            shouldAnimate ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
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
                  className={`w-full h-full object-cover transition-opacity duration-700 ${
                    videoLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  poster="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1200&q=80"
                >
                  <source src="/videos/event2.mp4" type="video/mp4" />
                </video>
              </>
            ) : (
              <img
                src="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1200&q=80"
                alt="Events at Dubai Mall"
                className="w-full h-full object-cover"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6">
              <div className="flex items-center gap-2 bg-black/50 backdrop-blur rounded-full px-3 py-1">
                <HiOutlineStar className="text-yellow-400 w-3 h-3" />
                <span className="text-white text-xs sm:text-sm">Trusted by 100+ global brands</span>
              </div>
            </div>
          </div>

          {/* Event Types Grid - CSS transitions */}
          <div className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-10 sm:mb-12 transition-all duration-700 delay-300 ${
            shouldAnimate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            {eventTypes.map((type, i) => {
              const Icon = type.icon
              return (
                <div
                  key={type.name}
                  className={`bg-gradient-to-br ${type.color} rounded-xl p-3 sm:p-4 text-center hover:scale-105 transition-all duration-300 cursor-pointer group`}
                  style={{ transitionDelay: `${i * 50}ms` }}
                >
                  <Icon className={`text-2xl sm:text-3xl mb-2 mx-auto group-hover:scale-110 transition-transform ${type.iconColor}`} />
                  <h3 className="text-xs sm:text-sm font-semibold text-white">
                    {type.name}
                  </h3>
                  <p className="text-[10px] text-gray-400 mt-1 hidden sm:block">
                    {type.desc.split('.')[0]}
                  </p>
                </div>
              )
            })}
          </div>

          {/* Venue Highlights - CSS transitions */}
          <div className={`mb-10 sm:mb-12 transition-all duration-700 delay-400 ${
            shouldAnimate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h3 className="text-base sm:text-lg font-semibold flex items-center gap-2">
                <HiOutlineLocationMarker className="text-yellow-400 w-4 h-4" />
                Featured Venues
              </h3>
              <Link href="/events">
                <button className="text-xs sm:text-sm text-gray-400 hover:text-white transition flex items-center gap-1">
                  View all <HiOutlineArrowRight className="w-3 h-3" />
                </button>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              {venueHighlights.map((venue, idx) => {
                const Icon = venue.icon
                return (
                  <div
                    key={venue.name}
                    className="glass-card rounded-xl overflow-hidden hover:scale-102 transition-all duration-300"
                    style={{ transitionDelay: `${idx * 100}ms` }}
                  >
                    <div className="aspect-video overflow-hidden relative">
                      <img
                        src={venue.image}
                        alt={venue.name}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute top-2 right-2 bg-black/50 backdrop-blur rounded-full p-1.5">
                        <Icon className="w-3 h-3 text-yellow-400" />
                      </div>
                    </div>
                    <div className="p-3 sm:p-4">
                      <h4 className="text-sm sm:text-base font-semibold text-white">{venue.name}</h4>
                      <p className="text-xs text-gray-400 mt-1">Capacity: {venue.capacity}</p>
                      <p className="text-[10px] text-gray-500 mt-1">{venue.features}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Past Events Highlights */}
          <div className={`mb-10 sm:mb-12 transition-all duration-700 delay-500 ${
            shouldAnimate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <div className="text-center mb-4 sm:mb-6">
              <h3 className="text-base sm:text-lg font-semibold flex items-center justify-center gap-2">
                <HiOutlineStar className="text-yellow-400 w-4 h-4" />
                Past Successes
              </h3>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">Join brands that made history</p>
            </div>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
              {pastBrands.map((brand, idx) => (
                <span
                  key={brand}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/5 text-gray-300 text-xs sm:text-sm hover:bg-white/10 hover:text-white transition-all duration-300 cursor-default"
                  style={{ transitionDelay: `${idx * 30}ms` }}
                >
                  {brand}
                </span>
              ))}
            </div>
          </div>

          {/* Venue Modules */}
          <div className={`mt-12 transition-all duration-700 delay-600 ${
            shouldAnimate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <h3 className="text-xl font-semibold text-center mb-6 flex items-center justify-center gap-2">
              <HiOutlineOfficeBuilding className="text-yellow-400 w-5 h-5" />
              Our Venues
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {venueModules.map((venue, i) => {
                const Icon = venue.icon
                return (
                  <div key={venue.name} className="glass-card rounded-xl p-4 text-center hover:scale-105 transition">
                    <Icon className={`text-3xl mb-2 mx-auto ${venue.color}`} />
                    <h4 className="font-semibold text-sm sm:text-base">{venue.name}</h4>
                    <p className="text-xs text-gray-400 mt-1">Capacity: {venue.capacity}</p>
                    <p className="text-[10px] text-gray-500 mt-1">{venue.features}</p>
                  </div>
                )
              })}
            </div>
          </div>

          {/* CTA Section */}
          <div className={`text-center mt-12 sm:mt-16 transition-all duration-700 delay-700 ${
            shouldAnimate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <Link href="/events">
              <button className="group relative overflow-hidden rounded-full px-8 sm:px-10 py-3 sm:py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-semibold text-sm sm:text-base transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/20">
                <span className="relative z-10 flex items-center gap-2">
                  Host Your Event
                  <HiOutlineArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
              </button>
            </Link>
            <div className="mt-4 sm:mt-6">
              <p className="text-gray-500 text-xs sm:text-sm">
                Explore venue specs, past events, and booking
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-3 text-[10px] sm:text-xs text-gray-600">
                <span className="flex items-center gap-1"><HiOutlineCheckCircle className="w-3 h-3 text-green-500" /> Dedicated event team</span>
                <span className="flex items-center gap-1"><HiOutlineCheckCircle className="w-3 h-3 text-green-500" /> Production support</span>
                <span className="flex items-center gap-1"><HiOutlineCheckCircle className="w-3 h-3 text-green-500" /> Marketing amplification</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}