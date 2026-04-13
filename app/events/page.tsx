'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function EventsModule() {
  return (
    <div className="bg-black min-h-screen pt-32 pb-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <Link href="/#events">
          <button className="mb-8 text-gray-400 hover:text-white transition flex items-center gap-2">
            ← Back to Main Deck
          </button>
        </Link>

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold">Event Capabilities</h1>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            From intimate brand activations to global-scale productions
          </p>
        </div>

        {/* Venue Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {venues.map((venue, i) => (
            <motion.div
              key={venue.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-zinc-900 rounded-2xl overflow-hidden"
            >
              <div className="aspect-video bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center">
                <span className="text-6xl">{venue.icon}</span>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold">{venue.name}</h3>
                <p className="text-gray-400 mt-2">{venue.desc}</p>
                <div className="mt-4 space-y-1 text-sm">
                  <div>📏 Capacity: {venue.capacity}</div>
                  <div>📍 Location: {venue.location}</div>
                </div>
                <button className="mt-4 border border-white/30 px-4 py-2 rounded-full text-sm hover:bg-white hover:text-black transition">
                  Inquire About This Venue →
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Past Events */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-8">Past Activations</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {pastEvents.map((event, i) => (
              <div key={event} className="bg-zinc-900 rounded-lg p-4 text-sm text-center">
                {event}
              </div>
            ))}
          </div>
        </div>

        {/* Final Booking CTA */}
        <div className="text-center mt-16 pt-8 border-t border-white/10">
          <h3 className="text-2xl font-bold">Ready to Book?</h3>
          <p className="text-gray-400 mt-2">Our events team is ready to bring your vision to life.</p>
          <button className="mt-6 bg-white text-black px-8 py-3 rounded-full font-semibold hover:scale-105 transition">
            Contact Events Team →
          </button>
        </div>
      </div>
    </div>
  )
}

const venues = [
  { name: 'The Fashion Catwalk', icon: '👗', desc: 'Purpose-built runway for fashion shows and luxury launches', capacity: '500+ guests', location: 'Fashion Avenue Level 2' },
  { name: 'Central Atrium', icon: '🏛️', desc: 'High-traffic activation zone with massive visibility', capacity: '1,000+ guests', location: 'Grand Atrium' },
  { name: 'The Waterfront Stage', icon: '🌊', desc: 'Outdoor venue overlooking Dubai Fountain', capacity: '2,000+ guests', location: 'Waterfront Promenade' },
  { name: 'VIP Private Salon', icon: '✨', desc: 'Intimate setting for exclusive brand dinners', capacity: '50 guests', location: 'Fashion Avenue Level 3' },
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