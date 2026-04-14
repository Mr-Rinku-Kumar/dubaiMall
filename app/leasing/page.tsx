'use client'

import Link from 'next/link'
import { useState } from 'react'
import { motion } from 'framer-motion'
import {
    HiOutlineArrowLeft,
    HiOutlineSparkles,
    HiOutlineOfficeBuilding,
    HiOutlineShoppingBag,
    HiOutlineUsers,
    HiOutlineCheckCircle,
    HiOutlineMail,
    HiOutlinePhone,
} from 'react-icons/hi'
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";

import { GiConverseShoe, GiShoppingBag, GiFoodTruck, GiShop } from 'react-icons/gi'
import { FaCrown, FaStore, FaUtensils, FaCalendarAlt } from 'react-icons/fa'

const leasingCategories = [
    {
        id: 'luxury',
        name: 'Luxury Flagship',
        icon: FaCrown,
        iconColor: 'text-yellow-400',
        color: 'from-yellow-600 to-amber-600',
        description: 'Premium positioning in Fashion Avenue',
        minSize: '2,000 - 10,000 sq ft',
        footfall: '50,000+ daily',
        investment: '$500k - $2M',
        benefits: [
            'Prime corner locations',
            'VIP clientele access',
            'Dedicated concierge',
            'Global brand exposure'
        ]
    },
    {
        id: 'retail',
        name: 'Retail Store',
        icon: FaStore,
        iconColor: 'text-blue-400',
        color: 'from-blue-600 to-cyan-600',
        description: 'High-traffic retail spaces',
        minSize: '500 - 5,000 sq ft',
        footfall: '30,000+ daily',
        investment: '$100k - $500k',
        benefits: [
            'Strategic floor positioning',
            'Co-marketing opportunities',
            'Flexible lease terms',
            'Operating hours flexibility'
        ]
    },
    {
        id: 'fAndB',
        name: 'Food & Beverage',
        icon: FaUtensils,
        iconColor: 'text-orange-400',
        color: 'from-orange-600 to-red-600',
        description: 'Dining concepts with fountain views',
        minSize: '1,000 - 8,000 sq ft',
        footfall: '40,000+ daily',
        investment: '$200k - $800k',
        benefits: [
            'Waterfront/indoor options',
            'Late-night operating permits',
            'Shared marketing campaigns',
            'Cuisine exclusivity'
        ]
    },
    {
        id: 'popup',
        name: 'Pop-Up Store',
        icon: GiShop,
        iconColor: 'text-purple-400',
        color: 'from-purple-600 to-pink-600',
        description: 'Temporary activations (1-6 months)',
        minSize: '200 - 1,500 sq ft',
        footfall: '25,000+ daily',
        investment: '$20k - $100k',
        benefits: [
            'Low commitment entry',
            'Test new markets',
            'Seasonal opportunities',
            'Quick setup support'
        ]
    }
]

const quickStats = [
    { value: '98%', label: 'Occupancy Rate', icon: HiOutlineOfficeBuilding, color: 'text-green-400' },
    { value: '35+', label: 'New Brands 2024', icon: HiOutlineSparkles, color: 'text-yellow-400' },
    { value: '24/7', label: 'Access', icon: HiOutlineShoppingBag, color: 'text-blue-400' },
]

export default function LeasingPage() {
    const [selectedCategory, setSelectedCategory] = useState('luxury')
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        brand: '',
        category: 'luxury',
        message: ''
    })
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setSubmitted(true)
        setTimeout(() => setSubmitted(false), 3000)
    }

    const selected = leasingCategories.find(c => c.id === selectedCategory)!
    const SelectedIcon = selected.icon

    return (
        <div className="bg-black min-h-screen pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 md:px-8 lg:px-12">
            <div className="max-w-7xl mx-auto">

                {/* Back Button */}
                <Link href="/#retail">
                    <motion.button
                        whileHover={{ x: -5 }}
                        className="mb-6 sm:mb-8 text-gray-400 hover:text-white transition flex items-center gap-2 group text-sm sm:text-base"
                    >
                        <HiOutlineArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition" />
                        Back to Main Deck
                    </motion.button>
                </Link>

                {/* Header */}
                <div className="text-center mb-10 sm:mb-12">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">
                        Leasing <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Opportunities</span>
                    </h1>
                    <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-sm sm:text-base px-4">
                        Choose the perfect space for your brand at the world's most visited destination
                    </p>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-10 sm:mb-12 max-w-2xl mx-auto">
                    {quickStats.map((stat, idx) => {
                        const Icon = stat.icon
                        return (
                            <div key={stat.label} className="glass-card rounded-xl p-2 sm:p-3 text-center">
                                <Icon className={`w-4 h-4 sm:w-5 sm:h-5 mx-auto mb-1 ${stat.color}`} />
                                <div className="text-xs sm:text-sm font-bold text-yellow-400">{stat.value}</div>
                                <div className="text-[8px] sm:text-[10px] text-gray-500">{stat.label}</div>
                            </div>
                        )
                    })}
                </div>

                {/* Category Selector with Icons */}
                <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10 sm:mb-12">
                    {leasingCategories.map((cat) => {
                        const CatIcon = cat.icon
                        return (
                            <button
                                key={cat.id}
                                onClick={() => setSelectedCategory(cat.id)}
                                className={`px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 rounded-full transition-all duration-300 flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm md:text-base ${selectedCategory === cat.id
                                        ? `bg-gradient-to-r ${cat.color} text-white shadow-lg`
                                        : 'bg-white/10 text-gray-400 hover:bg-white/20'
                                    }`}
                            >
                                <CatIcon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${selectedCategory === cat.id ? 'text-white' : cat.iconColor}`} />
                                <span>{cat.name}</span>
                            </button>
                        )
                    })}
                </div>

                {/* Content Grid */}
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16">

                    {/* Left - Details */}
                    <div className="space-y-6">
                        <div className={`bg-gradient-to-br ${selected.color} rounded-2xl p-6 sm:p-8 text-white`}>
                            <SelectedIcon className={`text-5xl sm:text-6xl mb-3 ${selected.iconColor}`} />
                            <h2 className="text-2xl sm:text-3xl font-bold">{selected.name}</h2>
                            <p className="text-white/80 mt-1 text-sm sm:text-base">{selected.description}</p>
                        </div>

                        <div className="glass-card rounded-2xl p-5 sm:p-6 space-y-4">
                            <h3 className="text-base sm:text-lg font-semibold flex items-center gap-2">
                                <HiOutlineBuildingOffice2 className="text-yellow-400 w-4 h-4" />
                                Key Details
                            </h3>
                            <div className="grid sm:grid-cols-3 gap-4">
                                <div>
                                    <div className="text-gray-400 text-xs sm:text-sm">Min. Space</div>
                                    <div className="text-white font-semibold text-sm sm:text-base">{selected.minSize}</div>
                                </div>
                                <div>
                                    <div className="text-gray-400 text-xs sm:text-sm">Daily Footfall</div>
                                    <div className="text-white font-semibold text-sm sm:text-base">{selected.footfall}</div>
                                </div>
                                <div>
                                    <div className="text-gray-400 text-xs sm:text-sm">Investment Range</div>
                                    <div className="text-white font-semibold text-sm sm:text-base">{selected.investment}</div>
                                </div>
                            </div>
                        </div>

                        <div className="glass-card rounded-2xl p-5 sm:p-6">
                            <h3 className="text-base sm:text-lg font-semibold mb-3 flex items-center gap-2">
                                <HiOutlineSparkles className="text-yellow-400 w-4 h-4" />
                                Benefits
                            </h3>
                            <ul className="space-y-2">
                                {selected.benefits.map((benefit, i) => (
                                    <li key={i} className="flex items-center gap-2 text-gray-300 text-sm sm:text-base">
                                        <HiOutlineCheckCircle className="text-yellow-400 w-4 h-4 flex-shrink-0" />
                                        <span>{benefit}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Right - Inquiry Form */}
                    <div className="glass-card rounded-2xl p-5 sm:p-6 md:p-8">
                        <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center gap-2">
                            <HiOutlineMail className="text-yellow-400 w-5 h-5" />
                            Inquire About {selected.name}
                        </h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Full Name *</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 focus:border-yellow-400 focus:outline-none transition text-white text-sm sm:text-base"
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
                                    className="w-full px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 focus:border-yellow-400 focus:outline-none transition text-white text-sm sm:text-base"
                                    placeholder="john@company.com"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Brand/Company *</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.brand}
                                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                                    className="w-full px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 focus:border-yellow-400 focus:outline-none transition text-white text-sm sm:text-base"
                                    placeholder="Your Brand"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Message</label>
                                <textarea
                                    rows={3}
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    className="w-full px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 focus:border-yellow-400 focus:outline-none transition text-white text-sm sm:text-base resize-none"
                                    placeholder="Tell us about your requirements..."
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full py-3 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-semibold text-sm sm:text-base hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                            >
                                Submit Inquiry
                                <HiOutlineArrowLeft className="w-4 h-4 rotate-180" />
                            </button>
                        </form>
                        {submitted && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-4 p-3 bg-green-500/20 border border-green-500 rounded-lg text-center text-green-400 text-sm flex items-center justify-center gap-2"
                            >
                                <HiOutlineCheckCircle className="w-4 h-4" />
                                Inquiry sent! Our team will contact you within 24 hours.
                            </motion.div>
                        )}

                        {/* Contact Info */}
                        <div className="mt-6 pt-4 border-t border-white/10 text-center">
                            <p className="text-gray-500 text-[10px] sm:text-xs flex items-center justify-center gap-2">
                                <HiOutlinePhone className="w-3 h-3" />
                                Need help? Call +971 4 123 4567
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}