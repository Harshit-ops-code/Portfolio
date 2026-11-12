'use client'

import { Suspense, lazy, useEffect, useRef } from 'react'
import type { Application } from '@splinetool/runtime'

const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const appRef = useRef<Application | null>(null)
  const inViewRef = useRef(true)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const syncPlayback = () => {
      const app = appRef.current
      if (!app) return
      if (inViewRef.current && !document.hidden) {
        app.play()
      } else {
        app.stop()
      }
    }

    const io = new IntersectionObserver(
      (entries) => {
        inViewRef.current = Boolean(entries[0]?.isIntersecting)
        syncPlayback()
      },
      { rootMargin: '140px' }
    )
    io.observe(el)

    document.addEventListener('visibilitychange', syncPlayback)

    return () => {
      io.disconnect()
      document.removeEventListener('visibilitychange', syncPlayback)
      appRef.current = null
    }
  }, [])

  const handleLoad = (app: Application) => {
    appRef.current = app
    if (!inViewRef.current || document.hidden) {
      app.stop()
    }
  }

  return (
    <div ref={containerRef} className={className}>
      <Suspense
        fallback={
          <div className="w-full h-full flex items-center justify-center">
            <span className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
          </div>
        }
      >
        <Spline
          scene={scene}
          className="w-full h-full"
          renderOnDemand
          onLoad={handleLoad}
        />
      </Suspense>
    </div>
  )
}
