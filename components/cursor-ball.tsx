"use client"

import { useEffect, useRef } from "react"

export function CursorBall() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const ballRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef(0)
  const footerRectRef = useRef<DOMRect | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    let mounted = true
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    const handleResize = () => {
      if (!mounted) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const footer = document.querySelector("footer")
    if (footer) {
      footerRectRef.current = footer.getBoundingClientRect()
    }

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const animate = () => {
      if (!mounted) return

      const mouse = mouseRef.current
      const ball = ballRef.current
      const footer = footerRectRef.current

      ballRef.current = {
        x: ball.x + (mouse.x - ball.x) * 0.12,
        y: ball.y + (mouse.y - ball.y) * 0.12,
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const r = 15
      const bx = ballRef.current.x
      const by = ballRef.current.y

      ctx.fillStyle = "#000000"
      ctx.beginPath()
      ctx.arc(bx, by, r, 0, Math.PI * 2)
      ctx.fill()

      if (footer && bx >= footer.left && bx <= footer.right && by >= footer.top && by <= footer.bottom) {
        ctx.save()
        ctx.beginPath()
        ctx.rect(footer.left, footer.top, footer.width, footer.height)
        ctx.clip()
        ctx.fillStyle = "#ffffff"
        ctx.beginPath()
        ctx.arc(bx, by, r, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    window.addEventListener("resize", handleResize, { passive: true })
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      mounted = false
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 99999,
      }}
    />
  )
}
