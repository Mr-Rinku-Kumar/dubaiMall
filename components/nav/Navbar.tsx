'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { label: 'Overview', href: '#why', type: 'hash' },
  { label: 'Retail', href: '#retail', type: 'hash' },
  { label: 'Luxury', href: '#luxury', type: 'hash' },
  { label: 'Dining', href: '#dining', type: 'hash' },
  { label: 'Entertainment', href: '#entertainment', type: 'hash' },
  { label: 'Events', href: '#events', type: 'hash' },
  { label: 'Leasing', href: '/leasing', type: 'path' },
  { label: 'Partner', href: '/sponsorship', type: 'path' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      
      // Only update active for hash links on home page
      if (pathname === '/') {
        const sections = navItems.filter(item => item.type === 'hash').map(item => item.href.slice(1))
        for (const section of sections.reverse()) {
          const element = document.getElementById(section)
          if (element && window.scrollY >= element.offsetTop - 100) {
            setActive(section)
            break
          }
        }
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.body.style.overflow = 'unset'
    }
  }, [mobileMenuOpen, pathname])

  const handleClick = (item: typeof navItems[0]) => {
    if (item.type === 'path') {
      // For path links, use Next.js Link (handled by the Link component)
      return
    } else {
      // For hash links
      const element = document.querySelector(item.href)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
        setMobileMenuOpen(false)
      }
    }
  }

  const isActivePath = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname === href
  }

  if (!mounted) return null

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || mobileMenuOpen 
            ? 'bg-black/95 backdrop-blur-md border-b border-white/10' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 md:h-16 lg:h-20">
            
            {/* Logo */}
            <Link href="/">
              <div className="cursor-pointer z-20">
                <span className="text-base sm:text-lg md:text-xl font-bold tracking-tight bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                  DUBAI MALL
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6 xl:gap-8">
              {navItems.map((item) => (
                item.type === 'path' ? (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`relative text-sm xl:text-base font-medium transition-colors duration-200 ${
                      isActivePath(item.href) 
                        ? 'text-white' 
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {item.label}
                    {isActivePath(item.href) && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-600"
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      />
                    )}
                  </Link>
                ) : (
                  <button
                    key={item.label}
                    onClick={() => handleClick(item)}
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
                )
              ))}
            </div>

            {/* Desktop CTA */}
            <Link href="/sponsorship">
              <button className="hidden lg:block text-sm xl:text-base px-5 py-2 rounded-full bg-white text-black font-medium hover:bg-gray-100 transition-all duration-200 hover:shadow-lg hover:shadow-white/20">
                Partner With Us →
              </button>
            </Link>

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
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[280px] sm:w-[320px] bg-black/95 backdrop-blur-xl z-40 lg:hidden shadow-2xl"
            >
              <div className="flex flex-col pt-20 pb-8 px-6 h-full">
                <div className="flex-1 space-y-1">
                  {navItems.map((item, index) => (
                    item.type === 'path' ? (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`block px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${
                          isActivePath(item.href)
                            ? 'bg-white/10 text-white'
                            : 'text-gray-400 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <button
                        key={item.label}
                        onClick={() => {
                          handleClick(item)
                          setMobileMenuOpen(false)
                        }}
                        className={`w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${
                          active === item.href.slice(1)
                            ? 'bg-white/10 text-white'
                            : 'text-gray-400 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        {item.label}
                      </button>
                    )
                  ))}
                </div>
                
                <Link href="/sponsorship" onClick={() => setMobileMenuOpen(false)}>
                  <button className="mt-6 w-full py-3 rounded-full bg-white text-black font-semibold text-center hover:bg-gray-100 transition-all">
                    Partner With Us →
                  </button>
                </Link>
                
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