"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"

interface RoyaltyFlowAnimationProps {
  isActive: boolean
  teacherName: string
  studentName: string
  amount: string
}

export function RoyaltyFlowAnimation({ isActive, teacherName, studentName, amount }: RoyaltyFlowAnimationProps) {
  const [animationStep, setAnimationStep] = useState(0)

  useEffect(() => {
    if (!isActive) return

    const steps = [
      "Student completes module",
      "Smart contract triggered",
      "NFT minted to student",
      "Royalty sent to teacher",
      "Transaction confirmed",
    ]

    let currentStep = 0
    const interval = setInterval(() => {
      setAnimationStep(currentStep)
      currentStep++
      if (currentStep >= steps.length) {
        clearInterval(interval)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [isActive])

  if (!isActive) return null

  const steps = [
    { icon: "🎓", text: "Student completes module", color: "text-secondary" },
    { icon: "⚡", text: "Smart contract triggered", color: "text-primary" },
    { icon: "💎", text: "NFT minted to student", color: "text-accent" },
    { icon: "💰", text: "Royalty sent to teacher", color: "text-primary" },
    { icon: "✅", text: "Transaction confirmed", color: "text-green-400" },
  ]

  return (
    <Card className="p-6 bg-card/20 backdrop-blur-md border-white/20">
      <h3 className="text-xl font-bold text-primary mb-4">Blockchain Transaction Flow</h3>

      <div className="space-y-4">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`flex items-center gap-3 transition-all duration-500 ${
              index <= animationStep ? "opacity-100 scale-100" : "opacity-30 scale-95"
            }`}
          >
            <div className={`text-2xl ${index === animationStep ? "animate-bounce" : ""}`}>{step.icon}</div>
            <div className="flex-1">
              <div className={`font-medium ${step.color}`}>{step.text}</div>
              {index === 0 && <div className="text-sm text-muted-foreground">by {studentName}</div>}
              {index === 3 && (
                <div className="text-sm text-muted-foreground">
                  to {teacherName} ({amount})
                </div>
              )}
            </div>
            {index <= animationStep && <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />}
          </div>
        ))}
      </div>

      {animationStep >= steps.length - 1 && (
        <div className="mt-4 p-3 bg-primary/20 border border-primary/30 rounded-lg">
          <div className="flex items-center gap-2">
            <div className="text-primary">🎉</div>
            <span className="text-primary font-medium">Transaction Complete!</span>
          </div>
          <div className="text-sm text-muted-foreground mt-1">
            Hash: 0x{Math.random().toString(16).substr(2, 8)}...{Math.random().toString(16).substr(2, 4)}
          </div>
        </div>
      )}
    </Card>
  )
}
