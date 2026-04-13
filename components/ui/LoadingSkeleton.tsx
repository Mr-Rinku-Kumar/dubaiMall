'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function LoadingSkeleton() {
  const [show, setShow] = useState(true)

  useEffect(() => {
    // Ensure it only runs on client
    return () => setShow(false)
  }, [])

  if (!show) return null

  return (
    <div className="fixed inset-0 bg-black z-[200] flex items-center justify-center">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 360],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear",
        }}
        className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full"
      />
    </div>
  )
}