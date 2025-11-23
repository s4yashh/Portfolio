"use client"

import { useState, useEffect, useRef } from "react"

export function CursorBall() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [ballPos, setBallPos] = useState({ x: 0, y: 0 })
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const prevPosRef = useRef({ x: 0, y: 0 })
  const footerRectRef = useRef<DOMRect | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })

      // Get footer rect for use in animation
      const footer = document.querySelector("footer")
      if (footer) {
        footerRectRef.current = footer.getBoundingClientRect()
      }
    }

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  // Animation loop for ball and skid marks
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return

    const animate = () => {
      setBallPos((prev) => {
        const newX = prev.x + (mousePos.x - prev.x) * 0.12
        const newY = prev.y + (mousePos.y - prev.y) * 0.12

        // Update previous position
        prevPosRef.current = { x: newX, y: newY }
        return { x: newX, y: newY }
      })

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Get footer bounds
      const footer = footerRectRef.current
      const ballRadius = 15

      // Always draw the full ball first in black
      ctx.fillStyle = "#000000"
      ctx.beginPath()
      ctx.arc(ballPos.x, ballPos.y, ballRadius, 0, Math.PI * 2)
      ctx.fill()

      // If ball overlaps with footer, draw white part on top
      if (footer && ballPos.x >= footer.left && ballPos.x <= footer.right) {
        ctx.save()
        
        // Create clipping region for only the footer area
        ctx.beginPath()
        ctx.rect(footer.left, footer.top, footer.right - footer.left, footer.bottom - footer.top)
        ctx.clip()
        
        // Draw white circle (only the part inside footer will be visible)
        ctx.fillStyle = "white"
        ctx.beginPath()
        ctx.arc(ballPos.x, ballPos.y, ballRadius, 0, Math.PI * 2)
        ctx.fill()
        
        ctx.restore()
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [mousePos, ballPos])

  return (
    <>
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
    </>
  )
}
