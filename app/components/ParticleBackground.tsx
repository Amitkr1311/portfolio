'use client'

import { useEffect, useRef, useState } from 'react'

interface Dot {
  x: number
  y: number
  baseOpacity: number
  currentOpacity: number
  pulseOffset: number
  glowing: boolean
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const dotsRef = useRef<Dot[]>([])
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const animationFrameRef = useRef<number>()
  const timeRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Initialize dots in a grid pattern
    const gridSize = 40 // Distance between dots
    const initDots = () => {
      dotsRef.current = []
      const cols = Math.ceil(canvas.width / gridSize) + 1
      const rows = Math.ceil(canvas.height / gridSize) + 1

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          dotsRef.current.push({
            x: i * gridSize,
            y: j * gridSize,
            baseOpacity: Math.random() * 0.3 + 0.1,
            currentOpacity: 0.1,
            pulseOffset: Math.random() * Math.PI * 2,
            glowing: false,
          })
        }
      }
    }

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initDots()
    }
    setCanvasSize()
    window.addEventListener('resize', setCanvasSize)

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', handleMouseMove)

    // Animation loop
    const animate = () => {
      timeRef.current += 0.01
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw grid lines
      ctx.strokeStyle = 'rgba(52, 211, 153, 0.03)' // Teal with low opacity
      ctx.lineWidth = 1

      // Vertical lines
      for (let x = 0; x < canvas.width; x += gridSize) {
        const wave = Math.sin(x * 0.01 + timeRef.current) * 2
        ctx.beginPath()
        ctx.moveTo(x + wave, 0)
        ctx.lineTo(x + wave, canvas.height)
        
        // Add gradient effect near mouse
        const distToMouse = Math.abs(mouseRef.current.x - x)
        if (distToMouse < 200) {
          const opacity = (1 - distToMouse / 200) * 0.15
          ctx.strokeStyle = `rgba(52, 211, 153, ${opacity})`
        } else {
          ctx.strokeStyle = 'rgba(52, 211, 153, 0.03)'
        }
        ctx.stroke()
      }

      // Horizontal lines
      for (let y = 0; y < canvas.height; y += gridSize) {
        const wave = Math.sin(y * 0.01 + timeRef.current) * 2
        ctx.beginPath()
        ctx.moveTo(0, y + wave)
        ctx.lineTo(canvas.width, y + wave)
        
        // Add gradient effect near mouse
        const distToMouse = Math.abs(mouseRef.current.y - y)
        if (distToMouse < 200) {
          const opacity = (1 - distToMouse / 200) * 0.15
          ctx.strokeStyle = `rgba(139, 92, 246, ${opacity})` // Purple
        } else {
          ctx.strokeStyle = 'rgba(52, 211, 153, 0.03)'
        }
        ctx.stroke()
      }

      // Draw and animate dots
      dotsRef.current.forEach((dot) => {
        // Calculate distance to mouse
        const dx = mouseRef.current.x - dot.x
        const dy = mouseRef.current.y - dot.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const maxGlowDistance = 150

        // Pulsing animation
        const pulse = Math.sin(timeRef.current * 2 + dot.pulseOffset) * 0.15 + 0.85

        // Mouse hover effect
        if (distance < maxGlowDistance) {
          dot.glowing = true
          const intensity = (1 - distance / maxGlowDistance)
          dot.currentOpacity = dot.baseOpacity + intensity * 0.6
          
          // Draw glow effect
          ctx.shadowBlur = 20 * intensity
          ctx.shadowColor = distance < maxGlowDistance / 2 
            ? 'rgba(139, 92, 246, 0.8)' // Purple for close dots
            : 'rgba(52, 211, 153, 0.8)'  // Teal for medium distance
        } else {
          dot.glowing = false
          dot.currentOpacity = dot.baseOpacity * pulse
          ctx.shadowBlur = 0
        }

        // Draw the dot
        ctx.beginPath()
        ctx.arc(dot.x, dot.y, dot.glowing ? 3 : 2, 0, Math.PI * 2)
        
        // Color based on position and state
        if (dot.glowing) {
          const gradient = ctx.createRadialGradient(dot.x, dot.y, 0, dot.x, dot.y, 10)
          gradient.addColorStop(0, `rgba(139, 92, 246, ${dot.currentOpacity})`)
          gradient.addColorStop(0.5, `rgba(52, 211, 153, ${dot.currentOpacity * 0.6})`)
          gradient.addColorStop(1, `rgba(52, 211, 153, 0)`)
          ctx.fillStyle = gradient
        } else {
          ctx.fillStyle = `rgba(52, 211, 153, ${dot.currentOpacity})`
        }
        
        ctx.fill()
        ctx.shadowBlur = 0
      })

      // Draw connecting lines between nearby glowing dots
      dotsRef.current.forEach((dot, index) => {
        if (!dot.glowing) return

        dotsRef.current.slice(index + 1).forEach((otherDot) => {
          if (!otherDot.glowing) return

          const dx = dot.x - otherDot.x
          const dy = dot.y - otherDot.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < gridSize * 3) {
            ctx.beginPath()
            const opacity = (1 - distance / (gridSize * 3)) * 0.3
            ctx.strokeStyle = `rgba(139, 92, 246, ${opacity})`
            ctx.lineWidth = 2
            ctx.moveTo(dot.x, dot.y)
            ctx.lineTo(otherDot.x, otherDot.y)
            ctx.stroke()
          }
        })
      })

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', setCanvasSize)
      window.removeEventListener('mousemove', handleMouseMove)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.8 }}
    />
  )
}
