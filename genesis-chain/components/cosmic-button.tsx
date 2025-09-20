"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface CosmicButtonProps {
  children: React.ReactNode
  variant?: "primary" | "secondary" | "accent"
  size?: "sm" | "md" | "lg"
  className?: string
  onClick?: () => void
  disabled?: boolean
}

export function CosmicButton({
  children,
  variant = "primary",
  size = "md",
  className,
  onClick,
  disabled = false,
}: CosmicButtonProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isPressed, setIsPressed] = useState(false)

  const variants = {
    primary:
      "bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-primary-foreground shadow-lg shadow-primary/25",
    secondary:
      "bg-gradient-to-r from-secondary to-secondary/80 hover:from-secondary/90 hover:to-secondary text-secondary-foreground shadow-lg shadow-secondary/25",
    accent:
      "bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent text-accent-foreground shadow-lg shadow-accent/25",
  }

  const sizes = {
    sm: "px-4 py-2 text-sm h-9",
    md: "px-6 py-3 text-base h-11",
    lg: "px-8 py-4 text-lg h-14",
  }

  const getGlowEffect = () => {
    if (disabled) return ""

    const glowColors = {
      primary: "shadow-primary/50",
      secondary: "shadow-secondary/50",
      accent: "shadow-accent/50",
    }

    if (isPressed) return `shadow-2xl ${glowColors[variant]} scale-95`
    if (isHovered) return `shadow-xl ${glowColors[variant]} scale-105`
    return `shadow-lg ${glowColors[variant]}`
  }

  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        setIsPressed(false)
      }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      className={cn(
        "relative overflow-hidden transition-all duration-300 transform",
        "border border-white/20 backdrop-blur-sm",
        "before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent",
        "before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-1000",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none",
        variants[variant],
        sizes[size],
        getGlowEffect(),
        className,
      )}
    >
      <span className="relative z-10 font-medium tracking-wide">{children}</span>

      <div
        className={cn(
          "absolute inset-0 rounded-md opacity-0 transition-opacity duration-300",
          "bg-gradient-to-r from-transparent via-white/20 to-transparent",
          isHovered && !disabled && "opacity-100",
        )}
      />

      {isPressed && !disabled && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-ping"
              style={{
                left: `${20 + i * 10}%`,
                top: `${30 + (i % 2) * 40}%`,
                animationDelay: `${i * 100}ms`,
                animationDuration: "600ms",
              }}
            />
          ))}
        </div>
      )}
    </Button>
  )
}
