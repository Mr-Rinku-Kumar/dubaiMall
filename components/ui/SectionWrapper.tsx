'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

interface SectionWrapperProps {
  children: ReactNode
  className?: string
  id?: string
}

export default function SectionWrapper({ children, className = '', id }: SectionWrapperProps) {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })

  return (
    <section id={id} ref={ref} className={`py-24 px-6 md:px-12 ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto"
      >
        {children}
      </motion.div>
    </section>
  )
}