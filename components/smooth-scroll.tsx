"use client"

import { useEffect, useRef, useCallback } from "react"
import Lenis from "@studio-freight/lenis"
import { usePreloaderContext } from "./preloader-wrapper"

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const contentRef = useRef<HTMLDivElement>(null)
  const lenisRef = useRef<Lenis | null>(null)
  const rafRef = useRef<number>(0)
  const { preloaderComplete } = usePreloaderContext()

  const raf = useCallback((time: number) => {
    lenisRef.current?.raf(time)
    rafRef.current = requestAnimationFrame(raf)
  }, [])

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.8,
      touchMultiplier: 1.5,
      infinite: false,
    })

    lenisRef.current = lenis
    ;(window as any).__lenis = lenis

    rafRef.current = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafRef.current)
      lenis.destroy()
      delete (window as any).__lenis
      lenisRef.current = null
    }
  }, [raf])

  useEffect(() => {
    if (!lenisRef.current) return
    if (preloaderComplete) {
      lenisRef.current.start()
      lenisRef.current.resize()
    } else {
      lenisRef.current.stop()
    }
  }, [preloaderComplete])

  return (
    <div id="smooth-content" ref={contentRef}>
      {children}
    </div>
  )
}
