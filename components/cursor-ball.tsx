"use client"

import { useState, useEffect, useRef } from "react"

export function CursorBall() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [ballPos, setBallPos] = useState({ x: 0, y: 0 })
  const [isOverFooter, setIsOverFooter] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const prevPosRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })

      // Check if cursor is over footer
      const footer = document.querySelector("footer")
      if (footer) {
        const rect = footer.getBoundingClientRect()
        const isOverFooterArea =
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom
        setIsOverFooter(isOverFooterArea)
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

      // Draw cursor ball (main)
      ctx.fillStyle = isOverFooter ? "white" : "#000000"
      ctx.beginPath()
      ctx.arc(ballPos.x, ballPos.y, 15, 0, Math.PI * 2)
      ctx.fill()

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [mousePos, isOverFooter, ballPos])

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
