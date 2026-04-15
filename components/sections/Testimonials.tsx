'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '../ui/Button'

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'CMO, Chanel Middle East',
    content: 'Dubai Mall has transformed how we reach luxury consumers. The foot traffic and brand visibility are unmatched anywhere in the world.',
    image: '/images/woman1.jpg',
    rating: 5
  },
  {
    name: 'Michael Chen',
    role: 'VP of Partnerships, Apple',
    content: 'Our product launch at Dubai Mall reached over 50,000 people in 48 hours. The infrastructure and support team are world-class.',
    image: '/images/woman2.jpg',
    rating: 5
  },
  {
    name: 'Elena Rodriguez',
    role: 'Event Director, Live Nation',
    content: 'The venue capabilities and production value available at Dubai Mall rival any major arena. Our concert series sold out in hours.',
    image: '/images/woman3.jpg',
    rating: 5
  }
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="py-24 px-6 md:px-12 bg-gradient-to-b from-black to-zinc-950">
      <div className="max-w-4xl mx-auto text-center">
        <span className="text-sm uppercase tracking-[0.2em] text-gray-400">Success Stories</span>
        <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-12">
          What Our Partners Say
        </h2>

        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="glass-card rounded-2xl p-8 md:p-12"
          >
            <div className="flex justify-center mb-6">
              {[...Array(testimonials[current].rating)].map((_, i) => (
                <span key={i} className="text-yellow-500 text-2xl">★</span>
              ))}
            </div>

            <p className="text-xl md:text-2xl text-gray-200 leading-relaxed">
              "{testimonials[current].content}"
            </p>

            <div className="flex items-center justify-center gap-4 mt-8">
              <img
                src={testimonials[current].image}
                alt={testimonials[current].name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="text-left">
                <div className="font-semibold">{testimonials[current].name}</div>
                <div className="text-sm text-gray-400">{testimonials[current].role}</div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <Button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${i === current ? 'w-8 bg-white' : 'bg-gray-600'
                }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}