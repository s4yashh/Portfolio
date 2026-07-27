"use client"

import { useEffect, useRef } from "react"
import Lenis from "@studio-freight/lenis"

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const contentRef = useRef<HTMLDivElement>(null)

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

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    ;(window as any).__lenis = lenis

    return () => {
      lenis.destroy()
      delete (window as any).__lenis
    }
  }, [])

  return (
    <div id="smooth-content" ref={contentRef}>
      {children}
    </div>
  )
}
