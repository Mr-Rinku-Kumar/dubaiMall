'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  HiOutlineMenu, 
  HiOutlineX, 
  HiOutlineHome,
  HiOutlineShoppingBag,
  HiOutlineSparkles,
  HiOutlineOfficeBuilding,
  HiOutlineTicket,
  HiOutlineCalendar,
  HiOutlineUserGroup,
  HiOutlineArrowRight
} from 'react-icons/hi'

const navItems = [
  { label: 'Overview', href: '#why', type: 'hash', icon: HiOutlineHome },
  { label: 'Retail', href: '#retail', type: 'hash', icon: HiOutlineShoppingBag },
  { label: 'Luxury', href: '#luxury', type: 'hash', icon: HiOutlineSparkles },
  { label: 'Dining', href: '#dining', type: 'hash', icon: HiOutlineOfficeBuilding },
  { label: 'Entertainment', href: '#entertainment', type: 'hash', icon: HiOutlineTicket },
  { label: 'Events', href: '#events', type: 'hash', icon: HiOutlineCalendar },
  { label: 'Leasing', href: '/leasing', type: 'path', icon: HiOutlineUserGroup },
  { label: 'Partner', href: '/sponsorship', type: 'path', icon: HiOutlineArrowRight },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  // Fix 6: Body overflow fix
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  useEffect(() => {
    setMounted(true)
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      
      // Fix 5: Better scroll detection with offset
      if (pathname === '/') {
        const sections = navItems.filter(item => item.type === 'hash').map(item => item.href.slice(1))
        const offset = 120 // Better offset for mobile
        
        for (const section of sections.reverse()) {
          const element = document.getElementById(section)
          if (element && window.scrollY + offset >= element.offsetTop) {
            setActive(section)
            break
          }
        }
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [pathname])

  const handleClick = (item: typeof navItems[0]) => {
    if (item.type === 'path') {
      return
    } else {
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
        {/* Fix 7: Better container padding for ultra small devices */}
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          {/* Fix 2: Flexible navbar height */}
          <div className="flex items-center justify-between min-h-[56px] sm:min-h-[64px] lg:min-h-[80px]">
            
            {/* Logo */}
            <Link href="/">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="cursor-pointer z-20"
              >
                {/* Fix 3: Better text scaling */}
                <span className="text-base sm:text-xl lg:text-2xl font-bold tracking-tight bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
                  DUBAI MALL
                </span>
                <span className="hidden sm:inline-block text-[10px] text-gray-500 ml-1 align-middle">
                  ®
                </span>
              </motion.div>
            </Link>

            {/* Desktop Navigation - Fix 4: Better spacing for laptops */}
            <div className="hidden lg:flex items-center gap-3 lg:gap-4 xl:gap-6">
              {navItems.map((item) => {
                const Icon = item.icon
                return item.type === 'path' ? (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`relative flex items-center gap-1.5 text-sm lg:text-base font-medium transition-all duration-200 ${
                      isActivePath(item.href) 
                        ? 'text-white' 
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                    <span>{item.label}</span>
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
                    className={`relative flex items-center gap-1.5 text-sm lg:text-base font-medium transition-all duration-200 ${
                      active === item.href.slice(1) 
                        ? 'text-white' 
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                    <span>{item.label}</span>
                    {active === item.href.slice(1) && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-600"
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      />
                    )}
                  </button>
                )
              })}
            </div>

            {/* Desktop CTA */}
            <Link href="/sponsorship">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden lg:flex items-center gap-2 text-sm lg:text-base px-4 lg:px-5 py-2 rounded-full bg-white text-black font-medium hover:bg-gray-100 transition-all duration-200 hover:shadow-lg hover:shadow-white/20"
              >
                <span>Partner With Us</span>
                <HiOutlineArrowRight className="w-3.5 h-3.5 lg:w-4 lg:h-4 transition-transform group-hover:translate-x-1" />
              </motion.button>
            </Link>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden relative z-20 w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? (
                <HiOutlineX className="w-5 h-5 text-white" />
              ) : (
                <HiOutlineMenu className="w-5 h-5 text-white" />
              )}
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay - Fix 1: Better width for small screens */}
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
            
            {/* Fix 1: Responsive mobile menu width - full screen on very small devices */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[85%] max-w-[360px] bg-black/95 backdrop-blur-xl z-40 lg:hidden shadow-2xl"
            >
              <div className="flex flex-col h-full">
                {/* Mobile Menu Header */}
                <div className="pt-20 pb-4 px-5 sm:px-6 border-b border-white/10">
                  <span className="text-xs sm:text-sm text-gray-400">Navigation Menu</span>
                </div>

                {/* Mobile Menu Items */}
                <div className="flex-1 overflow-y-auto py-4 px-4 sm:px-5">
                  {navItems.map((item) => {
                    const Icon = item.icon
                    return item.type === 'path' ? (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm sm:text-base font-medium transition-all duration-200 ${
                          isActivePath(item.href)
                            ? 'bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 text-white border border-yellow-500/30'
                            : 'text-gray-400 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        <Icon className={`w-5 h-5 ${isActivePath(item.href) ? 'text-yellow-400' : 'text-gray-500'}`} />
                        <span>{item.label}</span>
                      </Link>
                    ) : (
                      <button
                        key={item.label}
                        onClick={() => {
                          handleClick(item)
                          setMobileMenuOpen(false)
                        }}
                        className={`flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl text-sm sm:text-base font-medium transition-all duration-200 ${
                          active === item.href.slice(1)
                            ? 'bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 text-white border border-yellow-500/30'
                            : 'text-gray-400 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        <Icon className={`w-5 h-5 ${active === item.href.slice(1) ? 'text-yellow-400' : 'text-gray-500'}`} />
                        <span>{item.label}</span>
                      </button>
                    )
                  })}
                </div>
                
                {/* Mobile Menu Footer */}
                <div className="p-5 sm:p-6 border-t border-white/10 space-y-4">
                  <Link href="/sponsorship" onClick={() => setMobileMenuOpen(false)}>
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-3 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-semibold text-center hover:shadow-lg hover:shadow-yellow-500/20 transition-all text-sm sm:text-base"
                    >
                      Partner With Us →
                    </motion.button>
                  </Link>
                  
                  <div className="text-center">
                    <p className="text-[10px] sm:text-xs text-gray-500">
                      The World's Most Visited Destination
                    </p>
                    <p className="text-[8px] sm:text-[10px] text-gray-600 mt-1">
                      © 2024 Dubai Mall. All rights reserved.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}