"use client"

import { useEffect, useRef } from "react"
import Lenis from "@studio-freight/lenis"
import { usePreloaderContext } from "./preloader-wrapper"

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const contentRef = useRef<HTMLDivElement>(null)
  const lenisRef = useRef<Lenis | null>(null)
  const { preloaderComplete } = usePreloaderContext()

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

    if (!preloaderComplete) {
      lenis.stop()
    }

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
      delete (window as any).__lenis
      lenisRef.current = null
    }
  }, [])

  useEffect(() => {
    if (preloaderComplete && lenisRef.current) {
      lenisRef.current.start()
    }
  }, [preloaderComplete])

  return (
    <div id="smooth-content" ref={contentRef}>
      {children}
    </div>
  )
}
