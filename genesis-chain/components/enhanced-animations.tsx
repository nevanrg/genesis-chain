"use client"

import type React from "react"

import { useEffect, useState } from "react"

interface EnhancedAnimationsProps {
  children: React.ReactNode
  animationType?: "fadeIn" | "slideUp" | "scaleIn" | "rotateIn" | "bounceIn"
  delay?: number
  duration?: number
}

export function EnhancedAnimations({
  children,
  animationType = "fadeIn",
  delay = 0,
  duration = 500,
}: EnhancedAnimationsProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay])

  const getAnimationClass = () => {
    const baseClass = "transition-all ease-out"
    const durationClass = `duration-${duration}`

    if (!isVisible) {
      switch (animationType) {
        case "fadeIn":
          return `${baseClass} ${durationClass} opacity-0`
        case "slideUp":
          return `${baseClass} ${durationClass} opacity-0 translate-y-8`
        case "scaleIn":
          return `${baseClass} ${durationClass} opacity-0 scale-95`
        case "rotateIn":
          return `${baseClass} ${durationClass} opacity-0 rotate-12`
        case "bounceIn":
          return `${baseClass} ${durationClass} opacity-0 scale-50`
        default:
          return `${baseClass} ${durationClass} opacity-0`
      }
    }

    return `${baseClass} ${durationClass} opacity-100 translate-y-0 scale-100 rotate-0`
  }

  return <div className={getAnimationClass()}>{children}</div>
}

// Particle Effect Component
export function ParticleEffect({ isActive }: { isActive: boolean }) {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([])

  useEffect(() => {
    if (isActive) {
      const newParticles = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 2,
      }))
      setParticles(newParticles)

      const timer = setTimeout(() => {
        setParticles([])
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [isActive])

  if (!isActive || particles.length === 0) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-40">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-2 h-2 bg-primary rounded-full animate-ping"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}
    </div>
  )
}

// Confetti Effect Component
export function ConfettiEffect({ isActive }: { isActive: boolean }) {
  const [confetti, setConfetti] = useState<Array<{ id: number; x: number; color: string; delay: number }>>([])

  useEffect(() => {
    if (isActive) {
      const colors = ["#a16207", "#6366f1", "#ec4899", "#10b981", "#f59e0b"]
      const newConfetti = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 1,
      }))
      setConfetti(newConfetti)

      const timer = setTimeout(() => {
        setConfetti([])
      }, 4000)

      return () => clearTimeout(timer)
    }
  }, [isActive])

  if (!isActive || confetti.length === 0) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className="absolute w-3 h-3 animate-bounce"
          style={{
            left: `${piece.x}%`,
            top: "-10px",
            backgroundColor: piece.color,
            animationDelay: `${piece.delay}s`,
            animationDuration: "3s",
            transform: "rotate(45deg)",
          }}
        />
      ))}
    </div>
  )
}
