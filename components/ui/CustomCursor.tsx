'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false)
  const [mounted, setMounted] = useState(false)
  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)
  
  const springConfig = { damping: 25, stiffness: 700 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    setMounted(true)
    
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16)
      cursorY.set(e.clientY - 16)
      if (!isVisible) setIsVisible(true)
    }
    
    window.addEventListener('mousemove', moveCursor)
    return () => window.removeEventListener('mousemove', moveCursor)
  }, [cursorX, cursorY, isVisible])

  if (!mounted || !isVisible) return null

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[100] mix-blend-difference"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
      }}
    >
      <div className="w-full h-full rounded-full border-2 border-white" />
    </motion.div>
  )
}