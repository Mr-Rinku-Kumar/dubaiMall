'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  HiOutlineMail, 
  HiOutlineX, 
  HiOutlineBell,
  HiOutlineCheckCircle,
  HiOutlineSparkles
} from 'react-icons/hi'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem('newsletter-subscribed')
    if (saved) setSubscribed(true)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email && isValidEmail(email)) {
      localStorage.setItem('newsletter-subscribed', 'true')
      localStorage.setItem('newsletter-email', email)
      setSubscribed(true)
      setEmail('')
    }
  }

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const handleDismiss = () => {
    setSubscribed(true)
    setIsVisible(false)
  }

  if (!mounted || subscribed || !isVisible) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 50, y: 50 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        exit={{ opacity: 0, x: 50, y: 50 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 z-50 max-w-[calc(100vw-2rem)] sm:max-w-sm md:max-w-md"
      >
        <div className="glass rounded-2xl p-5 sm:p-6 shadow-2xl shadow-black/50">
          
          {/* Close Button */}
          <button 
            onClick={handleDismiss}
            className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors p-1.5 rounded-full hover:bg-white/10"
            aria-label="Close newsletter"
          >
            <HiOutlineX className="w-4 h-4" />
          </button>
          
          {/* Header with Icon */}
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-500/20 to-orange-500/20 flex items-center justify-center">
              <HiOutlineBell className="w-5 h-5 text-yellow-400" />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg text-white">Stay Updated</h3>
              <p className="text-xs text-gray-400">Don't miss out on opportunities</p>
            </div>
          </div>
          
          {/* Description */}
          <p className="text-sm text-gray-400 mb-4 leading-relaxed">
            Get exclusive leasing opportunities, event updates, and brand partnership news directly to your inbox.
          </p>
          
          {/* Benefits */}
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs text-gray-500">
              <HiOutlineCheckCircle className="w-3 h-3 text-green-500" />
              Weekly updates
            </span>
            <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs text-gray-500">
              <HiOutlineCheckCircle className="w-3 h-3 text-green-500" />
              No spam
            </span>
            <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs text-gray-500">
              <HiOutlineCheckCircle className="w-3 h-3 text-green-500" />
              Unsubscribe anytime
            </span>
          </div>
          
          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
            <div className="flex-1 relative">
              <HiOutlineMail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white/10 border border-white/20 text-sm focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-all text-white placeholder:text-gray-500"
                required
              />
            </div>
            <button 
              type="submit"
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 text-black text-sm font-semibold hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <HiOutlineSparkles className="w-4 h-4" />
              Subscribe
            </button>
          </form>
          
          {/* Footer Note */}
          <p className="text-[10px] text-gray-600 text-center mt-3">
            By subscribing, you agree to our Privacy Policy
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}