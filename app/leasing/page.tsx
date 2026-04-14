'use client'

import Link from 'next/link'
import { useState } from 'react'
import { motion } from 'framer-motion'

// Remove metadata from here - it can only be exported from server components
// We'll add it to a separate file

const leasingCategories = [
    {
        id: 'luxury',
        name: 'Luxury Flagship',
        icon: '👑',
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
        icon: '🏬',
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
        icon: '🍽️',
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
        icon: '🎪',
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

    return (
        <div className="bg-black min-h-screen pt-32 pb-20 px-4 sm:px-6 md:px-8 lg:px-12">
            <div className="max-w-7xl mx-auto">

                {/* Back Button */}
                <Link href="/#retail">
                    <button className="mb-8 text-gray-400 hover:text-white transition flex items-center gap-2 group">
                        ← Back to Main Deck
                    </button>
                </Link>

                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold">
                        Leasing <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Opportunities</span>
                    </h1>
                    <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
                        Choose the perfect space for your brand at the world's most visited destination
                    </p>
                </div>

                {/* Category Selector */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {leasingCategories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setSelectedCategory(cat.id)}
                            className={`px-5 py-2 rounded-full transition-all duration-300 flex items-center gap-2 ${selectedCategory === cat.id
                                ? `bg-gradient-to-r ${cat.color} text-white shadow-lg`
                                : 'bg-white/10 text-gray-400 hover:bg-white/20'
                                }`}
                        >
                            <span>{cat.icon}</span>
                            <span>{cat.name}</span>
                        </button>
                    ))}
                </div>

                {/* Content Grid */}
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">

                    {/* Left - Details */}
                    <div className="space-y-6">
                        <div className={`bg-gradient-to-br ${selected.color} rounded-2xl p-6 text-white`}>
                            <div className="text-5xl mb-3">{selected.icon}</div>
                            <h2 className="text-2xl font-bold">{selected.name}</h2>
                            <p className="text-white/80 mt-1">{selected.description}</p>
                        </div>

                        <div className="glass-card rounded-2xl p-6 space-y-4">
                            <h3 className="text-lg font-semibold">Key Details</h3>
                            <div className="grid sm:grid-cols-3 gap-4">
                                <div>
                                    <div className="text-gray-400 text-sm">Min. Space</div>
                                    <div className="text-white font-semibold">{selected.minSize}</div>
                                </div>
                                <div>
                                    <div className="text-gray-400 text-sm">Daily Footfall</div>
                                    <div className="text-white font-semibold">{selected.footfall}</div>
                                </div>
                                <div>
                                    <div className="text-gray-400 text-sm">Investment Range</div>
                                    <div className="text-white font-semibold">{selected.investment}</div>
                                </div>
                            </div>
                        </div>

                        <div className="glass-card rounded-2xl p-6">
                            <h3 className="text-lg font-semibold mb-3">Benefits</h3>
                            <ul className="space-y-2">
                                {selected.benefits.map((benefit, i) => (
                                    <li key={i} className="flex items-center gap-2 text-gray-300">
                                        <span className="text-yellow-400">✓</span> {benefit}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Right - Inquiry Form */}
                    <div className="glass-card rounded-2xl p-6">
                        <h3 className="text-xl font-bold mb-4">Inquire About {selected.name}</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Full Name *</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 focus:border-yellow-400 focus:outline-none transition"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Email *</label>
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 focus:border-yellow-400 focus:outline-none transition"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Brand/Company *</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.brand}
                                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 focus:border-yellow-400 focus:outline-none transition"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Message</label>
                                <textarea
                                    rows={3}
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 focus:border-yellow-400 focus:outline-none transition"
                                    placeholder="Tell us about your requirements..."
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full py-3 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-semibold hover:scale-105 transition-all duration-300"
                            >
                                Submit Inquiry →
                            </button>
                        </form>
                        {submitted && (
                            <div className="mt-4 p-3 bg-green-500/20 border border-green-500 rounded-lg text-center text-green-400 text-sm">
                                ✓ Inquiry sent! Our team will contact you within 24 hours.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}