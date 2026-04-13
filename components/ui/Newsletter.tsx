'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem('newsletter-subscribed')
    if (saved) setSubscribed(true)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      localStorage.setItem('newsletter-subscribed', 'true')
      localStorage.setItem('newsletter-email', email)
      setSubscribed(true)
      setEmail('')
    }
  }

  if (!mounted || subscribed) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="fixed bottom-6 right-6 z-50 glass rounded-2xl p-6 max-w-sm"
      >
        <button 
          onClick={() => setSubscribed(true)}
          className="absolute top-3 right-3 text-gray-400 hover:text-white transition"
        >
          ✕
        </button>
        
        <h3 className="font-bold text-lg mb-2">Stay Updated</h3>
        <p className="text-sm text-gray-400 mb-4">
          Get exclusive leasing opportunities and event updates
        </p>
        
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            className="flex-1 px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-sm focus:outline-none focus:border-white transition"
            required
          />
          <button 
            type="submit"
            className="px-4 py-2 rounded-lg bg-white text-black text-sm font-medium hover:scale-105 transition"
          >
            Subscribe
          </button>
        </form>
      </motion.div>
    </AnimatePresence>
  )
}