'use client'

import Link from 'next/link'
import { 
  HiOutlineLocationMarker, 
  HiOutlinePhone, 
  HiOutlineMail,
  HiOutlineClock,
  HiOutlineGlobeAlt,
  HiOutlineChevronRight,
  HiOutlineHeart
} from 'react-icons/hi'
import { 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedinIn, 
  FaYoutube,
  FaApple,
  FaGooglePlay
} from 'react-icons/fa'
import { IoLogoWhatsapp } from 'react-icons/io'

const footerLinks = {
  explore: [
    { name: 'Overview', href: '#why' },
    { name: 'Retail', href: '#retail' },
    { name: 'Luxury', href: '#luxury' },
    { name: 'Dining', href: '#dining' },
    { name: 'Entertainment', href: '#entertainment' },
    { name: 'Events', href: '#events' },
  ],
  opportunities: [
    { name: 'Leasing', href: '/leasing' },
    { name: 'Sponsorship', href: '/sponsorship' },
    { name: 'Pop-Up Stores', href: '/leasing#popup' },
    { name: 'Brand Activations', href: '/events' },
    { name: 'Venue Booking', href: '/events' },
  ],
  support: [
    { name: 'FAQ', href: '/faq' },
    { name: 'Contact Us', href: '#cta' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms & Conditions', href: '/terms' },
    { name: 'Sitemap', href: '/sitemap' },
  ],
}

const socialLinks = [
  { icon: FaFacebookF, href: 'https://facebook.com', label: 'Facebook', color: 'hover:bg-blue-600' },
  { icon: FaTwitter, href: 'https://twitter.com', label: 'Twitter', color: 'hover:bg-sky-500' },
  { icon: FaInstagram, href: 'https://instagram.com', label: 'Instagram', color: 'hover:bg-pink-600' },
  { icon: FaLinkedinIn, href: 'https://linkedin.com', label: 'LinkedIn', color: 'hover:bg-blue-700' },
  { icon: FaYoutube, href: 'https://youtube.com', label: 'YouTube', color: 'hover:bg-red-600' },
  { icon: IoLogoWhatsapp, href: 'https://wa.me/97141234567', label: 'WhatsApp', color: 'hover:bg-green-500' },
]

const contactInfo = [
  { icon: HiOutlineLocationMarker, text: 'Sheikh Zayed Road, Dubai, UAE', href: 'https://maps.google.com' },
  { icon: HiOutlinePhone, text: '+971 4 123 4567', href: 'tel:+97141234567' },
  { icon: HiOutlineMail, text: 'info@dubaimall.ae', href: 'mailto:info@dubaimall.ae' },
  { icon: HiOutlineClock, text: '10:00 AM - 12:00 AM Daily', href: null },
]

const appLinks = [
  { icon: FaApple, name: 'App Store', href: '#' },
  { icon: FaGooglePlay, name: 'Google Play', href: '#' },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-b from-black to-zinc-950 border-t border-white/10 pt-16 pb-8 px-4 sm:px-6 md:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                DUBAI MALL
              </span>
              <span className="text-xs text-gray-500">®</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              The world's most visited retail and entertainment destination. 
              Experience luxury, dining, and entertainment like never before.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3 pt-2">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300 ${social.color}`}
                    aria-label={social.label}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Explore Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Explore</h3>
            <ul className="space-y-2">
              {footerLinks.explore.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-yellow-400 transition-colors duration-200 flex items-center gap-1 group text-sm"
                  >
                    <HiOutlineChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Opportunities Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Opportunities</h3>
            <ul className="space-y-2">
              {footerLinks.opportunities.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-yellow-400 transition-colors duration-200 flex items-center gap-1 group text-sm"
                  >
                    <HiOutlineChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Get in Touch</h3>
            <ul className="space-y-3">
              {contactInfo.map((info, idx) => {
                const Icon = info.icon
                return (
                  <li key={idx}>
                    {info.href ? (
                      <a
                        href={info.href}
                        target={info.href.startsWith('http') ? '_blank' : undefined}
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-gray-400 hover:text-yellow-400 transition-colors duration-200 text-sm group"
                      >
                        <Icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        <span>{info.text}</span>
                      </a>
                    ) : (
                      <div className="flex items-center gap-3 text-gray-400 text-sm">
                        <Icon className="w-4 h-4" />
                        <span>{info.text}</span>
                      </div>
                    )}
                  </li>
                )
              })}
            </ul>

            {/* App Links */}
            <div className="mt-6 pt-4 border-t border-white/10">
              <p className="text-gray-500 text-xs mb-3">Download App</p>
              <div className="flex gap-3">
                {appLinks.map((app) => {
                  const Icon = app.icon
                  return (
                    <a
                      key={app.name}
                      href={app.href}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300 group"
                    >
                      <Icon className="w-4 h-4 text-gray-400 group-hover:text-yellow-400" />
                      <span className="text-xs text-gray-400 group-hover:text-white">{app.name}</span>
                    </a>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="py-8 border-t border-b border-white/10 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-white font-semibold text-lg mb-1">
                Subscribe to Our Newsletter
              </h3>
              <p className="text-gray-400 text-sm">
                Get the latest updates on events, offers, and more.
              </p>
            </div>
            <form className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <div className="relative flex-1 min-w-[250px]">
                <HiOutlineMail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-sm focus:outline-none focus:border-yellow-400 transition-all text-white placeholder:text-gray-500"
                />
              </div>
              <button className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-semibold text-sm hover:scale-105 transition-all duration-300 whitespace-nowrap">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-center">
          <p className="text-gray-500 text-xs">
            © {currentYear} Dubai Mall. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-gray-500 hover:text-yellow-400 text-xs transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-500 hover:text-yellow-400 text-xs transition-colors">
              Terms of Use
            </Link>
            <Link href="/cookies" className="text-gray-500 hover:text-yellow-400 text-xs transition-colors">
              Cookie Policy
            </Link>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-gray-600 text-[10px]">Made with</span>
            <HiOutlineHeart className="w-3 h-3 text-red-500 animate-pulse" />
            <span className="text-gray-600 text-[10px]">in Dubai</span>
          </div>
        </div>
      </div>
    </footer>
  )
}