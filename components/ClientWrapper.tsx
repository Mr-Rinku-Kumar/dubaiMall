'use client'

import { useEffect, useState } from 'react'
import CustomCursor from './ui/CustomCursor'
import Newsletter from './ui/Newsletter'
import PerformanceMonitor from './ui/PerformanceMonitor'

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return <>{children}</>

  return (
    <>
      {children}
      <CustomCursor />
      <Newsletter />
      {process.env.NODE_ENV === 'development' && <PerformanceMonitor />}
    </>
  )
}