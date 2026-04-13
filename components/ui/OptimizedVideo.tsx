'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

interface OptimizedVideoProps {
  src: string
  poster?: string
  className?: string
  autoPlay?: boolean
  loop?: boolean
  muted?: boolean
}

export default function OptimizedVideo({
  src,
  poster,
  className = '',
  autoPlay = true,
  loop = true,
  muted = true,
}: OptimizedVideoProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true)
            observer.disconnect()
          }
        })
      },
      { threshold: 0.1 }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (isInView && videoRef.current && autoPlay) {
      videoRef.current.play().catch(() => {})
    }
  }, [isInView, autoPlay])

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 shimmer bg-gray-900" />
      )}
      
      <video
        ref={videoRef}
        poster={poster}
        preload="none"
        autoPlay={autoPlay && isInView}
        loop={loop}
        muted={muted}
        playsInline
        onLoadedData={() => setIsLoaded(true)}
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <source src={src} type="video/mp4" />
      </video>
    </div>
  )
}