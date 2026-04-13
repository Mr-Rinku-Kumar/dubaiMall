'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface VideoBackgroundProps {
  videoSrc?: string
  imageSrc?: string
  children: React.ReactNode
  className?: string
}

export default function VideoBackground({ 
  videoSrc, 
  imageSrc, 
  children, 
  className = '' 
}: VideoBackgroundProps) {
  const [videoError, setVideoError] = useState(false)

  // Fallback images from Unsplash (free, always work)
  const fallbackImages = {
    hero: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c',
    retail: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8',
    dining: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0',
    events: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3',
  }

  const getBackgroundImage = () => {
    if (videoSrc && !videoError) return undefined
    if (imageSrc) return `url(${imageSrc})`
    return `url(${fallbackImages.hero})`
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Video Background */}
      {videoSrc && !videoError && (
        <video
          autoPlay
          muted
          loop
          playsInline
          onError={() => setVideoError(true)}
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      )}
      
      {/* Fallback Image Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: getBackgroundImage() }}
      />
      
      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/80" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}