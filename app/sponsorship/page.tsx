'use client'

import Link from 'next/link'
import { useEffect, useState, useRef } from 'react'
import { HiOutlineArrowLeft, HiOutlineCheckCircle, HiOutlineSparkles } from 'react-icons/hi'
import { FaCrown, FaStar, FaGem } from 'react-icons/fa'
import Footer from '@/components/sections/Footer'

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

const sponsorshipTiers = [
  {
    name: 'Platinum Partner',
    price: '$500,000+',
    icon: FaCrown,
    iconColor: 'text-yellow-400',
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
    icon: FaStar,
    iconColor: 'text-amber-400',
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
    icon: FaGem,
    iconColor: 'text-gray-400',
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
  const [hasAnimated, setHasAnimated] = useState(false)
  const headerRef = useRef<HTMLDivElement>(null)
  const audienceRef = useRef<HTMLDivElement>(null)
  const tiersRef = useRef<HTMLDivElement>(null)
  const sponsorsRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  // Trigger animations when sections become visible
  useEffect(() => {
    const observers: IntersectionObserver[] = []

    const createObserver = (ref: React.RefObject<HTMLElement>, setter: (val: boolean) => void) => {
      if (!ref.current) return
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setter(true)
            observer.disconnect()
          }
        },
        { threshold: 0.2, triggerOnce: true }
      )
      observer.observe(ref.current)
      observers.push(observer)
    }

    createObserver(headerRef, () => setHasAnimated(true))

    return () => observers.forEach(observer => observer.disconnect())
  }, [])

  return (
    <>
      <div className="bg-black min-h-screen pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">

          {/* Back Button - No framer-motion */}
          <Link href="/#cta">
            <button className="mb-6 sm:mb-8 text-gray-400 hover:text-white transition flex items-center gap-2 group text-sm sm:text-base">
              <HiOutlineArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition" />
              Back to Main Deck
            </button>
          </Link>

          {/* Header - CSS transitions */}
          <div ref={headerRef} className={`text-center mb-12 sm:mb-16 transition-all duration-700 ${hasAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
            <span className="text-xs sm:text-sm uppercase tracking-[0.2em] text-gray-400 bg-white/5 px-4 py-1.5 rounded-full inline-block mb-4">
              Sponsorship Opportunities
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mt-4">
              Partner With the<br />
              <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                World's Most Visited Mall
              </span>
            </h1>
            <p className="text-gray-400 mt-6 max-w-2xl mx-auto text-sm sm:text-base px-4">
              Reach 100M+ annual visitors across the globe's premier retail destination
            </p>
          </div>

          {/* Audience Demographics - CSS transitions */}
          <div ref={audienceRef}>
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center">Audience Demographics</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16 md:mb-20">
              {audienceData.map((data, i) => (
                <div
                  key={data.segment}
                  className={`glass-card rounded-2xl p-4 sm:p-6 text-center hover:scale-105 transition-all duration-300 ${hasAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                    {data.percentage}%
                  </div>
                  <div className="text-base sm:text-lg font-semibold mt-2">{data.segment}</div>
                  <div className="text-gray-400 text-xs sm:text-sm mt-1">Avg. Spend: {data.spend}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Sponsorship Tiers - CSS transitions */}
          <div ref={tiersRef}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8 mb-12 sm:mb-16 md:mb-20">
              {sponsorshipTiers.map((tier, i) => {
                const Icon = tier.icon
                return (
                  <div
                    key={tier.name}
                    className={`glass-card rounded-2xl overflow-hidden hover:scale-102 transition-all duration-300 ${hasAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                      }`}
                    style={{ transitionDelay: `${200 + i * 100}ms` }}
                  >
                    <div className={`bg-gradient-to-r ${tier.color} p-5 sm:p-6 text-center`}>
                      <Icon className={`text-4xl sm:text-5xl mx-auto mb-2 ${tier.iconColor}`} />
                      <h3 className="text-xl sm:text-2xl font-bold text-black">{tier.name}</h3>
                      <div className="text-lg sm:text-xl font-bold text-black mt-2">{tier.price}</div>
                      <div className="text-xs sm:text-sm text-black/70">Annual Investment</div>
                    </div>

                    <div className="p-5 sm:p-6">
                      <ul className="space-y-2 sm:space-y-3">
                        {tier.benefits.map((benefit, j) => (
                          <li
                            key={j}
                            className="flex items-center gap-2 text-xs sm:text-sm text-gray-300"
                            style={{ transitionDelay: `${300 + i * 100 + j * 50}ms` }}
                          >
                            <HiOutlineCheckCircle className="text-green-500 w-4 h-4 flex-shrink-0" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>

                      <button className="w-full mt-5 sm:mt-6 py-2.5 sm:py-3 rounded-full bg-white text-black font-semibold text-sm sm:text-base hover:scale-105 hover:shadow-lg transition-all duration-300">
                        Inquire Now →
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Past Sponsors - CSS transitions */}
          <div ref={sponsorsRef}>
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center">Trusted By Global Brands</h2>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8">
              {pastSponsors.map((sponsor, i) => (
                <div
                  key={sponsor}
                  className={`text-gray-400 text-sm sm:text-base md:text-lg font-medium hover:text-white transition cursor-pointer ${hasAnimated ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                    }`}
                  style={{ transitionDelay: `${400 + i * 50}ms` }}
                >
                  {sponsor}
                </div>
              ))}
            </div>
          </div>

          {/* Final CTA - CSS transitions */}
          <div ref={ctaRef}>
            <div className={`mt-12 sm:mt-16 md:mt-20 text-center transition-all duration-700 delay-500 ${hasAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}>
              <div className="glass rounded-2xl p-6 sm:p-8 md:p-10">
                <h3 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Ready to Partner?</h3>
                <p className="text-gray-400 text-sm sm:text-base mb-5 sm:mb-6">Let's create something extraordinary together</p>
                <button className="bg-white text-black px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold text-sm sm:text-base hover:scale-105 transition-all duration-300">
                  Contact Partnership Team →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}