'use client'

import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'

// Simple Toast Component (inline to avoid dependency)
function SimpleToast({ message, type, onClose }: { message: string; type: 'success' | 'error' | 'info'; onClose: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000)
    return () => clearTimeout(timer)
  }, [onClose])

  const colors = {
    success: 'bg-gradient-to-r from-green-500 to-emerald-500',
    error: 'bg-gradient-to-r from-red-500 to-rose-500',
    info: 'bg-gradient-to-r from-blue-500 to-cyan-500',
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      className={`fixed bottom-6 right-6 z-50 ${colors[type]} text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 max-w-sm`}
    >
      <span className="text-lg">
        {type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}
      </span>
      <span className="text-sm font-medium">{message}</span>
    </motion.div>
  )
}

// Custom hook for intersection observer
function useIntersectionObserverCustom(options = { threshold: 0.3, triggerOnce: true }) {
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

const trustSignals = [
  { icon: '✓', text: '24hr Response Time', color: 'from-green-500/20 to-emerald-500/20' },
  { icon: '✓', text: 'Dedicated Account Manager', color: 'from-blue-500/20 to-cyan-500/20' },
  { icon: '✓', text: 'Custom Packages Available', color: 'from-purple-500/20 to-pink-500/20' },
  { icon: '✓', text: 'Global Brand Support', color: 'from-orange-500/20 to-red-500/20' },
]

const partners = [
  'Chanel', 'Apple', 'Nike', 'Dior', 'Rolex', 'Mercedes'
]

export default function CTA() {
  const { ref, isVisible } = useIntersectionObserverCustom({ threshold: 0.3, triggerOnce: true })
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [toastType, setToastType] = useState<'success' | 'error' | 'info'>('success')
  const [showForm, setShowForm] = useState(false)
  const [formType, setFormType] = useState('')
  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInquiry = (type: string) => {
    setFormType(type)
    setShowForm(true)
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setToastMessage(`${formType} inquiry sent! Our team will contact you within 24 hours.`)
    setToastType('success')
    setShowToast(true)
    setShowForm(false)
    setFormData({ name: '', email: '', company: '', message: '' })
    setIsSubmitting(false)
    
    setTimeout(() => setShowToast(false), 3000)
  }

  const handleCloseForm = () => {
    setShowForm(false)
    setFormType('')
  }

  return (
    <>
      <section id="cta" className="relative min-h-screen flex items-center justify-center text-center px-4 sm:px-6 py-16 sm:py-20 bg-black overflow-hidden snap-section">
        
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1512453979798-5ea266f8880c')] bg-cover bg-center opacity-10" />
        </div>
        
        {/* Animated Gradient Orbs */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl animate-pulse delay-1000" />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/50" />

        <div ref={ref as any} className="relative z-10 max-w-5xl mx-auto w-full">
          
          {/* Main Content */}
          <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            
            {/* Badge */}
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block text-xs sm:text-sm uppercase tracking-[0.2em] text-gray-400 bg-white/5 px-4 py-1.5 rounded-full mb-6">
                Start Your Journey
              </span>
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mt-4">
                <span className="block">Be Part of the World's</span>
                <span className="block mt-2 bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500 bg-clip-text text-transparent">
                  Most Powerful Platform
                </span>
              </h2>
            </motion.div>
            
            <p className="text-gray-400 text-base sm:text-lg mt-6 max-w-2xl mx-auto px-4">
              Join the brands, partners, and creators who have chosen Dubai Mall as their global stage.
            </p>

            {/* Partner Logos Row */}
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-8 opacity-60">
              {partners.map((partner, idx) => (
                <span key={partner} className="text-gray-500 text-xs sm:text-sm font-medium tracking-wide">
                  {partner}
                </span>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10 px-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleInquiry('Leasing')}
                className="group relative overflow-hidden rounded-full px-6 sm:px-8 py-3 sm:py-4 bg-white text-black font-semibold text-sm sm:text-base transition-all duration-300 hover:shadow-2xl hover:shadow-white/20"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Lease Space
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </motion.button>
              
              <Link href="/sponsorship">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border border-white/30 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-sm sm:text-base hover:bg-white/10 hover:border-white/50 transition-all duration-300 w-full sm:w-auto"
                >
                  Become a Partner
                </motion.button>
              </Link>
              
              <Link href="/events">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border border-white/30 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-sm sm:text-base hover:bg-white/10 hover:border-white/50 transition-all duration-300 w-full sm:w-auto"
                >
                  Book an Event
                </motion.button>
              </Link>
            </div>

            {/* Trust Signals Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-10 max-w-3xl mx-auto px-4">
              {trustSignals.map((signal, idx) => (
                <motion.div
                  key={signal.text}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + idx * 0.1 }}
                  className={`glass-card rounded-xl p-2 sm:p-3 text-center hover:scale-105 transition-all duration-300`}
                >
                  <div className="text-green-400 text-lg sm:text-xl">{signal.icon}</div>
                  <div className="text-[10px] sm:text-xs text-gray-300 mt-1">{signal.text}</div>
                </motion.div>
              ))}
            </div>

            {/* Contact Info */}
            <div className="mt-8 text-center">
              <p className="text-gray-600 text-[10px] sm:text-xs">
                For urgent inquiries: <span className="text-gray-400">partnerships@dubaimall.ae</span> | +971 4 123 4567
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Modal Form */}
      <AnimatePresence>
        {showForm && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
              onClick={handleCloseForm}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-0 m-auto z-50 w-[90%] max-w-md h-fit"
            >
              <div className="glass rounded-2xl p-6 sm:p-8">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl sm:text-2xl font-bold">
                    {formType} Inquiry
                  </h3>
                  <button
                    onClick={handleCloseForm}
                    className="text-gray-400 hover:text-white transition text-2xl"
                  >
                    ✕
                  </button>
                </div>
                
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 focus:border-yellow-400 focus:outline-none transition text-white"
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 focus:border-yellow-400 focus:outline-none transition text-white"
                      placeholder="john@company.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Company *</label>
                    <input
                      type="text"
                      required
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 focus:border-yellow-400 focus:outline-none transition text-white"
                      placeholder="Your Company"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Message</label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 focus:border-yellow-400 focus:outline-none transition text-white resize-none"
                      placeholder="Tell us about your requirements..."
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-semibold hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Sending...' : 'Submit Inquiry →'}
                  </button>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <SimpleToast
            message={toastMessage}
            type={toastType}
            onClose={() => setShowToast(false)}
          />
        )}
      </AnimatePresence>
    </>
  )
}