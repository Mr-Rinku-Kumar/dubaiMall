'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const navItems = [
  { label: 'Overview', href: '#why' },
  { label: 'Retail', href: '#retail' },
  { label: 'Luxury', href: '#luxury' },
  { label: 'Dining', href: '#dining' },
  { label: 'Entertainment', href: '#entertainment' },
  { label: 'Events', href: '#events' },
  { label: 'Partner', href: '#cta' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      
      const sections = navItems.map(item => item.href.slice(1))
      for (const section of sections.reverse()) {
        const element = document.getElementById(section)
        if (element && window.scrollY >= element.offsetTop - 100) {
          setActive(section)
          break
        }
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    
    // Prevent body scroll when mobile menu is open
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.body.style.overflow = 'unset'
    }
  }, [mobileMenuOpen])

  const handleClick = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setMobileMenuOpen(false)
    }
  }

  const handlePartnerClick = () => {
    const element = document.querySelector('#cta')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setMobileMenuOpen(false)
    }
  }

  if (!mounted) return null

  return (
    <>
      {/* Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || mobileMenuOpen 
            ? 'bg-black/95 backdrop-blur-md border-b border-white/10' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 md:h-16 lg:h-20">
            
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="cursor-pointer z-20"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <span className="text-base sm:text-lg md:text-xl font-bold tracking-tight bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                DUBAI MALL
              </span>
            </motion.div>

            {/* Desktop Navigation - Hidden on mobile */}
            <div className="hidden lg:flex items-center gap-6 xl:gap-8">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleClick(item.href)}
                  className={`relative text-sm xl:text-base font-medium transition-colors duration-200 ${
                    active === item.href.slice(1) 
                      ? 'text-white' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {item.label}
                  {active === item.href.slice(1) && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-600"
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Desktop CTA */}
            <button
              onClick={handlePartnerClick}
              className="hidden lg:block text-sm xl:text-base px-5 py-2 rounded-full bg-white text-black font-medium hover:bg-gray-100 transition-all duration-200 hover:shadow-lg hover:shadow-white/20"
            >
              Partner With Us →
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden relative z-20 w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              <div className="w-5 h-5 relative">
                <span className={`absolute inset-x-0 h-0.5 bg-white rounded-full transition-all duration-300 ${
                  mobileMenuOpen ? 'top-1/2 rotate-45' : 'top-0'
                }`} />
                <span className={`absolute inset-x-0 top-1/2 h-0.5 bg-white rounded-full transition-all duration-300 ${
                  mobileMenuOpen ? 'opacity-0' : 'opacity-100'
                }`} />
                <span className={`absolute inset-x-0 h-0.5 bg-white rounded-full transition-all duration-300 ${
                  mobileMenuOpen ? 'top-1/2 -rotate-45' : 'bottom-0'
                }`} />
              </div>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            
            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[280px] sm:w-[320px] bg-black/95 backdrop-blur-xl z-40 lg:hidden shadow-2xl"
            >
              <div className="flex flex-col pt-20 pb-8 px-6 h-full">
                {/* Mobile Navigation Items */}
                <div className="flex-1 space-y-1">
                  {navItems.map((item, index) => (
                    <motion.button
                      key={item.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => handleClick(item.href)}
                      className={`w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${
                        active === item.href.slice(1)
                          ? 'bg-white/10 text-white'
                          : 'text-gray-400 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      {item.label}
                    </motion.button>
                  ))}
                </div>
                
                {/* Mobile CTA */}
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  onClick={handlePartnerClick}
                  className="mt-6 w-full py-3 rounded-full bg-white text-black font-semibold text-center hover:bg-gray-100 transition-all"
                >
                  Partner With Us →
                </motion.button>
                
                {/* Mobile Footer */}
                <div className="mt-8 pt-6 border-t border-white/10 text-center">
                  <p className="text-xs text-gray-500">
                    The World's Most Visited Destination
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}