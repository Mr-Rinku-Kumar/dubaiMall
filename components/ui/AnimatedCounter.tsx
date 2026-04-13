'use client'

import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'

interface AnimatedCounterProps {
  target: number
  suffix?: string
  prefix?: string
  duration?: number
}

export default function AnimatedCounter({ target, suffix = '', prefix = '', duration = 2000 }: AnimatedCounterProps) {
  const [count, setCount] = useState(0)
  const { ref, inView } = useInView({ threshold: 0.5, triggerOnce: true })

  useEffect(() => {
    if (inView) {
      let start = 0
      const increment = target / (duration / 16)
      
      const timer = setInterval(() => {
        start += increment
        if (start >= target) {
          setCount(target)
          clearInterval(timer)
        } else {
          setCount(Math.floor(start))
        }
      }, 16)
      
      return () => clearInterval(timer)
    }
  }, [inView, target, duration])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, type: "spring" }}
      className="text-center"
    >
      <div className="text-5xl md:text-6xl font-bold gradient-gold">
        {prefix}{count.toLocaleString()}{suffix}
      </div>
    </motion.div>
  )
}