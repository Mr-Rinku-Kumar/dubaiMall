'use client'

import { useRef, useState } from 'react'

const attractions = [
  {
    name: 'Dubai Aquarium',
    desc: '10M+ liters • 140+ species',
    longDesc: 'Walk through a 48-meter tunnel surrounded by sharks, rays, and thousands of aquatic animals.',
    image: 'https://images.unsplash.com/photo-1582653291997-079a1b04e6d1?w=800&q=80',
    stats: { visitors: '10M+', species: 140 },
    icon: '🐠',
    color: 'from-blue-900/80 to-cyan-800/80'
  },
  {
    name: 'Dubai Ice Rink',
    desc: 'Olympic-sized • Year-round',
    longDesc: 'Glide on real ice in the middle of the desert. Skate rentals and lessons available.',
    image: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?w=800&q=80',
    stats: { capacity: '200', size: 'Olympic' },
    icon: '⛸️',
    color: 'from-cyan-900/80 to-blue-800/80'
  },
  {
    name: 'VR Park',
    desc: 'Immersive • Next-gen tech',
    longDesc: 'Over 30 cutting-edge virtual reality experiences for all ages.',
    image: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=800&q=80',
    stats: { experiences: 30, tech: 'VR/AR' },
    icon: '🕶️',
    color: 'from-purple-900/80 to-pink-800/80'
  },
  {
    name: 'Dubai Fountain',
    desc: "World's largest choreographed",
    longDesc: 'Daily shows with water shooting up to 500 feet, synchronized to music.',
    image: 'https://images.unsplash.com/photo-1536859357188-b3559ae7b35b?w=800&q=80',
    stats: { height: '500ft', shows: 'Daily' },
    icon: '⛲',
    color: 'from-emerald-900/80 to-teal-800/80'
  },
  {
    name: 'KidZania',
    desc: 'Edutainment • Role-playing',
    longDesc: 'A mini-city where kids can try out different professions.',
    image: 'https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea?w=800&q=80',
    stats: { roles: 60, age: '4-16' },
    icon: '👧',
    color: 'from-orange-900/80 to-red-800/80'
  },
  {
    name: 'Cinema City',
    desc: '24 screens • IMAX • VIP',
    longDesc: 'State-of-the-art multiplex with luxury seating and gourmet concessions.',
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&q=80',
    stats: { screens: 24, seats: '4,500+' },
    icon: '🎬',
    color: 'from-red-900/80 to-rose-800/80'
  },
]

export default function Entertainment() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [activeCard, setActiveCard] = useState<number | null>(null)

  return (
    <section
      id="entertainment"
      className="min-h-screen py-16 sm:py-20 md:py-24 bg-black snap-section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        
        {/* Header */}
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <span className="text-xs sm:text-sm uppercase tracking-[0.2em] text-gray-400">
            Beyond Shopping
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mt-2 sm:mt-3">
            Attractions & <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Entertainment</span>
          </h2>
          <p className="text-gray-400 mt-3 sm:mt-4 max-w-xl mx-auto text-sm sm:text-base">
            We don't just drive traffic. We create destinations.
          </p>
        </div>

        {/* Horizontal Scroll Container */}
        <div
          ref={scrollContainerRef}
          className="overflow-x-auto overflow-y-hidden pb-6"
          style={{ 
            scrollbarWidth: 'thin', 
            WebkitOverflowScrolling: 'touch',
            scrollSnapType: 'x mandatory'
          }}
        >
          <div className="flex gap-4 sm:gap-6 md:gap-8" style={{ width: 'max-content' }}>
            {attractions.map((attraction, i) => (
              <div
                key={attraction.name}
                onMouseEnter={() => setActiveCard(i)}
                onMouseLeave={() => setActiveCard(null)}
                className={`relative w-[85vw] sm:w-[70vw] md:w-[55vw] lg:w-[40vw] xl:w-[35vw] 
                  h-[55vh] sm:h-[60vh] md:h-[65vh] rounded-2xl overflow-hidden flex-shrink-0 
                  transition-all duration-500 hover:scale-[1.02] cursor-pointer group`}
                style={{ scrollSnapAlign: 'start' }}
              >
                <img
                  src={attraction.image}
                  alt={attraction.name}
                  className="absolute w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />

                <div className={`absolute inset-0 bg-gradient-to-t ${attraction.color} opacity-60 group-hover:opacity-40 transition-opacity duration-500`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                <div className="absolute top-4 right-4 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/50 backdrop-blur flex items-center justify-center text-xl sm:text-2xl">
                  {attraction.icon}
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8">
                  <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white">
                    {attraction.name}
                  </h3>
                  <p className="text-gray-300 text-sm sm:text-base mt-1">
                    {attraction.desc}
                  </p>
                  
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
                            {value}
                          </div>
                          <div className="text-gray-400 text-[10px] sm:text-xs uppercase">
                            {key}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="absolute top-4 left-4 text-white/30 text-xs sm:text-sm font-mono">
                  {(i + 1).toString().padStart(2, '0')}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <div className="flex flex-col items-center gap-1">
            <span className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider">
              ← Scroll horizontally to explore →
            </span>
            <div className="flex gap-1 mt-2">
              {attractions.map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 rounded-full bg-gray-600" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}