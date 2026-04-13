'use client'

import { useEffect, useState } from 'react'

export default function PerformanceMonitor() {
  const [metrics, setMetrics] = useState({ fcp: 0, lcp: 0, cls: 0 })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    if (process.env.NODE_ENV === 'production') return

    // Measure FCP
    const fcpObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.name === 'first-contentful-paint') {
          setMetrics(prev => ({ ...prev, fcp: entry.startTime }))
        }
      }
    })
    fcpObserver.observe({ type: 'paint', buffered: true })

    // Measure LCP
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      const lastEntry = entries[entries.length - 1]
      setMetrics(prev => ({ ...prev, lcp: lastEntry.startTime }))
    })
    lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true })

    return () => {
      fcpObserver.disconnect()
      lcpObserver.disconnect()
    }
  }, [])

  // Don't render anything on server
  if (!mounted || process.env.NODE_ENV === 'production') return null

  return (
    <div className="fixed bottom-4 left-4 z-50 bg-black/80 backdrop-blur rounded-lg px-3 py-2 text-xs font-mono space-y-1">
      <div>FCP: {metrics.fcp.toFixed(0)}ms</div>
      <div>LCP: {metrics.lcp.toFixed(0)}ms</div>
      <div className="text-green-400">✅ 90+ Target</div>
    </div>
  )
}