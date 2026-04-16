'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { HiOutlineArrowLeft, HiOutlineLocationMarker, HiOutlineUsers } from 'react-icons/hi'
import Footer from '@/components/sections/Footer'

export default function EventsModule() {
  return (
    <>
      <div className="bg-black min-h-screen pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">

          {/* Back Button */}
          <Link href="/#events">
            <button className="mb-6 sm:mb-8 text-gray-400 hover:text-white transition flex items-center gap-2 group text-sm sm:text-base">
              <HiOutlineArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition" />
              Back to Main Deck
            </button>
          </Link>

          {/* Header */}
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">
              Event <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Capabilities</span>
            </h1>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-sm sm:text-base px-4">
              From intimate brand activations to global-scale productions
            </p>
          </div>

          {/* Venue Grid */}
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16 md:mb-20">
            {venues.map((venue, i) => (
              <motion.div
                key={venue.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="glass-card rounded-2xl overflow-hidden hover:scale-102 transition-all duration-300"
              >
                {/* Image instead of icon */}
                <div className="aspect-video overflow-hidden bg-gradient-to-br from-zinc-800 to-zinc-900">
                  <img
                    src={venue.image}
                    alt={venue.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-5 sm:p-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-white">{venue.name}</h3>
                  <p className="text-gray-400 text-sm sm:text-base mt-2">{venue.desc}</p>
                  <div className="mt-4 space-y-1.5 text-xs sm:text-sm">
                    <div className="flex items-center gap-2 text-gray-400">
                      <HiOutlineUsers className="w-4 h-4 text-yellow-400" />
                      Capacity: {venue.capacity}
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <HiOutlineLocationMarker className="w-4 h-4 text-yellow-400" />
                      Location: {venue.location}
                    </div>
                  </div>
                  <button className="mt-5 sm:mt-6 border border-white/30 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm hover:bg-white hover:text-black transition-all duration-300">
                    Inquire About This Venue →
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Past Events */}
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 flex items-center justify-center gap-2">
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 w-8 h-0.5 rounded-full"></span>
              Past Activations
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 w-8 h-0.5 rounded-full"></span>
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
              {pastEvents.map((event, i) => (
                <div
                  key={event}
                  className="glass-card rounded-xl p-3 sm:p-4 text-center hover:scale-105 transition-all duration-300 cursor-default"
                >
                  <span className="text-yellow-400 text-lg sm:text-xl block mb-1">✨</span>
                  <span className="text-gray-300 text-xs sm:text-sm font-medium">{event}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Final Booking CTA */}
          <div className="text-center mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-white/10">
            <h3 className="text-xl sm:text-2xl font-bold">Ready to Book?</h3>
            <p className="text-gray-400 text-sm sm:text-base mt-2">Our events team is ready to bring your vision to life.</p>
            <button className="mt-5 sm:mt-6 bg-gradient-to-r from-yellow-500 to-orange-500 text-black px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold text-sm sm:text-base hover:scale-105 transition-all duration-300">
              Contact Events Team →
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

const venues = [
  {
    name: 'The Fashion Catwalk',
    image: '/images/fashioncatwalk.webp',
    desc: 'Purpose-built runway for fashion shows and luxury launches',
    capacity: '500+ guests',
    location: 'Fashion Avenue Level 2'
  },
  {
    name: 'Central Atrium',
    image: '/images/central.jpg',
    desc: 'High-traffic activation zone with massive visibility',
    capacity: '1,000+ guests',
    location: 'Grand Atrium'
  },
  {
    name: 'The Waterfront Stage',
    image: '/images/waterfront.jpg',
    desc: 'Outdoor venue overlooking Dubai Fountain',
    capacity: '2,000+ guests',
    location: 'Waterfront Promenade'
  },
  {
    name: 'VIP Private Salon',
    image: '/images/vipsalon.jpg',
    desc: 'Intimate setting for exclusive brand dinners',
    capacity: '50 guests',
    location: 'Fashion Avenue Level 3'
  },
]

const pastEvents = [
  'Chanel Fashion Show 2024',
  'Apple Product Launch',
  'Dubai Food Festival',
  'Nike Air Max Activation',
  'Luxury Watch Week',
  'TikTok Creator Summit',
  'Mercedes-Benz Reveal',
  'Coca-Cola Pop-Up'
]