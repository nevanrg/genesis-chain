"use client"

import { useEffect, useRef, useState } from "react"

export function Floating3DModels() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()

      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      canvas.style.width = rect.width + "px"
      canvas.style.height = rect.height + "px"

      ctx.scale(dpr, dpr)
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      opacity: number
      type: "star" | "nebula" | "comet"
      color: string
      trail?: Array<{ x: number; y: number; opacity: number }>
    }> = []

    const colors = ["#a16207", "#6366f1", "#ec4899", "#10b981", "#f59e0b"]

    // Create enhanced particles
    for (let i = 0; i < 150; i++) {
      const type = Math.random() < 0.7 ? "star" : Math.random() < 0.9 ? "nebula" : "comet"
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * (type === "comet" ? 2 : 0.5),
        vy: (Math.random() - 0.5) * (type === "comet" ? 2 : 0.5),
        size: type === "nebula" ? Math.random() * 4 + 2 : Math.random() * 2 + 1,
        opacity: Math.random() * 0.8 + 0.2,
        type,
        color: colors[Math.floor(Math.random() * colors.length)],
        trail: type === "comet" ? [] : undefined,
      })
    }

    const shapes: Array<{
      x: number
      y: number
      rotation: number
      rotationSpeed: number
      size: number
      type: "cube" | "pyramid" | "sphere"
      opacity: number
    }> = []

    for (let i = 0; i < 8; i++) {
      shapes.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        rotation: 0,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        size: Math.random() * 30 + 20,
        type: ["cube", "pyramid", "sphere"][Math.floor(Math.random() * 3)] as "cube" | "pyramid" | "sphere",
        opacity: 0.1 + Math.random() * 0.2,
      })
    }

    let animationId: number
    const animate = () => {
      const rect = canvas.getBoundingClientRect()
      ctx.clearRect(0, 0, rect.width, rect.height)

      particles.forEach((particle) => {
        particle.x += particle.vx
        particle.y += particle.vy

        // Wrap around edges
        if (particle.x < 0) particle.x = rect.width
        if (particle.x > rect.width) particle.x = 0
        if (particle.y < 0) particle.y = rect.height
        if (particle.y > rect.height) particle.y = 0

        // Update comet trails
        if (particle.type === "comet" && particle.trail) {
          particle.trail.push({ x: particle.x, y: particle.y, opacity: particle.opacity })
          if (particle.trail.length > 10) particle.trail.shift()
        }

        // Draw particle based on type
        ctx.save()

        if (particle.type === "star") {
          // Enhanced star with glow
          ctx.shadowBlur = 10
          ctx.shadowColor = particle.color
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
          ctx.fillStyle =
            particle.color +
            Math.floor(particle.opacity * 255)
              .toString(16)
              .padStart(2, "0")
          ctx.fill()
        } else if (particle.type === "nebula") {
          // Nebula with gradient
          const gradient = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, particle.size)
          gradient.addColorStop(
            0,
            particle.color +
              Math.floor(particle.opacity * 255)
                .toString(16)
                .padStart(2, "0"),
          )
          gradient.addColorStop(1, particle.color + "00")
          ctx.fillStyle = gradient
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
          ctx.fill()
        } else if (particle.type === "comet" && particle.trail) {
          // Draw comet trail
          particle.trail.forEach((point, index) => {
            const trailOpacity = (index / particle.trail!.length) * particle.opacity
            ctx.beginPath()
            ctx.arc(point.x, point.y, particle.size * (index / particle.trail!.length), 0, Math.PI * 2)
            ctx.fillStyle =
              particle.color +
              Math.floor(trailOpacity * 255)
                .toString(16)
                .padStart(2, "0")
            ctx.fill()
          })
        }

        ctx.restore()
      })

      shapes.forEach((shape) => {
        shape.rotation += shape.rotationSpeed

        ctx.save()
        ctx.translate(shape.x, shape.y)
        ctx.rotate(shape.rotation)
        ctx.strokeStyle = `rgba(99, 102, 241, ${shape.opacity})`
        ctx.lineWidth = 1

        if (shape.type === "cube") {
          // Draw wireframe cube
          const s = shape.size / 2
          ctx.beginPath()
          ctx.rect(-s, -s, shape.size, shape.size)
          ctx.stroke()

          // Add 3D effect lines
          ctx.beginPath()
          ctx.moveTo(-s, -s)
          ctx.lineTo(-s + 10, -s - 10)
          ctx.moveTo(s, -s)
          ctx.lineTo(s + 10, -s - 10)
          ctx.moveTo(s, s)
          ctx.lineTo(s + 10, s - 10)
          ctx.moveTo(-s, s)
          ctx.lineTo(-s + 10, s - 10)
          ctx.stroke()
        } else if (shape.type === "pyramid") {
          // Draw wireframe pyramid
          const s = shape.size / 2
          ctx.beginPath()
          ctx.moveTo(0, -s)
          ctx.lineTo(-s, s)
          ctx.lineTo(s, s)
          ctx.closePath()
          ctx.stroke()
        }

        ctx.restore()
      })

      animationId = requestAnimationFrame(animate)
    }

    setTimeout(() => {
      setIsLoaded(true)
      animate()
    }, 100)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      if (animationId) cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <>
      <canvas
        ref={canvasRef}
        className={`fixed inset-0 pointer-events-none z-0 transition-opacity duration-1000 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background: "radial-gradient(ellipse at center, #1a1a2e 0%, #0a0a0a 100%)",
          width: "100vw",
          height: "100vh",
        }}
      />
      <audio autoPlay loop muted className="hidden">
        <source src="/ambient-space.mp3" type="audio/mpeg" />
      </audio>
    </>
  )
}
