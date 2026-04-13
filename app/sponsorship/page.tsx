'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const sponsorshipTiers = [
  {
    name: 'Platinum Partner',
    price: '$500,000+',
    icon: '👑',
    color: 'from-yellow-600 to-yellow-400',
    benefits: [
      'Exclusive naming rights',
      '200+ event activations annually',
      'Global media campaign',
      'CEO speaking opportunity',
      'VIP lounge access',
      'Yearly performance review'
    ]
  },
  {
    name: 'Gold Partner',
    price: '$250,000+',
    icon: '⭐',
    color: 'from-amber-600 to-amber-400',
    benefits: [
      'Premium signage placement',
      '100+ event activations',
      'Regional media coverage',
      'Executive networking',
      'Priority venue booking'
    ]
  },
  {
    name: 'Silver Partner',
    price: '$100,000+',
    icon: '💎',
    color: 'from-gray-500 to-gray-300',
    benefits: [
      'Strategic signage',
      '50+ event activations',
      'Digital campaign inclusion',
      'Quarterly business review'
    ]
  }
]

const audienceData = [
  { segment: 'Luxury Shoppers', percentage: 35, spend: '$2,500+' },
  { segment: 'Tourists', percentage: 45, spend: '$1,800+' },
  { segment: 'Local Families', percentage: 20, spend: '$800+' },
  { segment: 'Business Travelers', percentage: 15, spend: '$3,000+' },
]

const pastSponsors = [
  'Emirates Airlines', 'Apple', 'Chanel', 'Mercedes-Benz',
  'Coca-Cola', 'Nike', 'Samsung', 'Rolex'
]

export default function SponsorshipPage() {

  return (
    <div className="bg-black min-h-screen pt-32 pb-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <Link href="/#cta">
          <motion.button
            whileHover={{ x: -5 }}
            className="mb-8 text-gray-400 hover:text-white transition flex items-center gap-2"
          >
            ← Back to Main Deck
          </motion.button>
        </Link>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="text-sm uppercase tracking-[0.2em] text-gray-400">Sponsorship Opportunities</span>
          <h1 className="text-5xl md:text-7xl font-bold mt-4">
            Partner With the<br />
            <span className="gradient-gold">World's Most Visited Mall</span>
          </h1>
          <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
            Reach 100M+ annual visitors across the globe's premier retail destination
          </p>
        </motion.div>

        {/* Audience Demographics */}
        <motion.div
          initial={{ opacity: 0 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold mb-8 text-center">Audience Demographics</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {audienceData.map((data, i) => (
              <motion.div
                key={data.segment}
                initial={{ opacity: 0, y: 20 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card rounded-2xl p-6 text-center"
              >
                <div className="text-4xl font-bold gradient-gold">{data.percentage}%</div>
                <div className="text-lg font-semibold mt-2">{data.segment}</div>
                <div className="text-gray-400 text-sm mt-1">Avg. Spend: {data.spend}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Sponsorship Tiers */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {sponsorshipTiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="glass-card rounded-2xl overflow-hidden hover-glow"
            >
              <div className={`bg-gradient-to-r ${tier.color} p-6 text-center`}>
                <div className="text-5xl mb-2">{tier.icon}</div>
                <h3 className="text-2xl font-bold text-black">{tier.name}</h3>
                <div className="text-xl font-bold text-black mt-2">{tier.price}</div>
                <div className="text-sm text-black/70">Annual Investment</div>
              </div>
              
              <div className="p-6">
                <ul className="space-y-3">
                  {tier.benefits.map((benefit, j) => (
                    <motion.li
                      key={j}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + i * 0.1 + j * 0.05 }}
                      className="flex items-center gap-2 text-sm text-gray-300"
                    >
                      <span className="text-green-500">✓</span>
                      {benefit}
                    </motion.li>
                  ))}
                </ul>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full mt-6 py-3 rounded-full bg-white text-black font-semibold hover:shadow-lg transition"
                >
                  Inquire Now →
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Past Sponsors */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold mb-8">Trusted By Global Brands</h2>
          <div className="flex flex-wrap justify-center gap-8">
            {pastSponsors.map((sponsor, i) => (
              <motion.div
                key={sponsor}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + i * 0.05 }}
                className="text-gray-400 text-lg font-medium hover:text-white transition cursor-pointer"
              >
                {sponsor}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-20 text-center"
        >
          <div className="glass rounded-2xl p-10">
            <h3 className="text-3xl font-bold mb-4">Ready to Partner?</h3>
            <p className="text-gray-400 mb-6">Let's create something extraordinary together</p>
            <button className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:scale-105 transition">
              Contact Partnership Team →
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}