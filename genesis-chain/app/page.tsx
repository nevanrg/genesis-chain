"use client"

import { useState, useEffect } from "react"
import { CosmicButton } from "@/components/cosmic-button"
import { Card } from "@/components/ui/card"
import { DemoGuide } from "@/components/demo-flow/demo-guide"
import { StorytellingOverlay } from "@/components/demo-flow/storytelling-overlay"
import { EnhancedAnimations, ParticleEffect, ConfettiEffect } from "@/components/enhanced-animations"

export default function HomePage() {
  const [showDemo, setShowDemo] = useState(false)
  const [showStory, setShowStory] = useState(false)
  const [currentStory, setCurrentStory] = useState<"teacher-flow" | "student-flow" | "blockchain-flow">("teacher-flow")
  const [showParticles, setShowParticles] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  // Auto-start demo for judges
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowDemo(true)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  const handleStorytellingDemo = (story: "teacher-flow" | "student-flow" | "blockchain-flow") => {
    setCurrentStory(story)
    setShowStory(true)
  }

  const handleDemoComplete = () => {
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 4000)
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <ParticleEffect isActive={showParticles} />
      <ConfettiEffect isActive={showConfetti} />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        {/* Hero Section */}
        <EnhancedAnimations animationType="fadeIn" delay={500}>
          <div className="text-center mb-12 max-w-4xl">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-pulse">
              Genesis Chain
            </h1>
            <p className="text-2xl md:text-3xl mb-4 text-muted-foreground">Living Worlds for Education</p>
            <p className="text-xl md:text-2xl mb-8 text-foreground/80 animate-pulse">
              {"Step inside knowledge. Own your learning."}
            </p>
          </div>
        </EnhancedAnimations>

        {/* Action Buttons */}
        <EnhancedAnimations animationType="slideUp" delay={1500}>
          <div className="flex flex-col md:flex-row gap-6 z-20 relative mb-8">
            <CosmicButton variant="primary" size="lg" onClick={() => (window.location.href = "/student")}>
              🌍 Explore a World
            </CosmicButton>
            <CosmicButton variant="secondary" size="lg" onClick={() => (window.location.href = "/teacher")}>
              ⚡ Create a World
            </CosmicButton>
            <CosmicButton variant="accent" size="lg" onClick={() => (window.location.href = "/wallet")}>
              💎 My Wallet
            </CosmicButton>
          </div>
        </EnhancedAnimations>

        {/* Demo Controls for Judges */}
        <EnhancedAnimations animationType="fadeIn" delay={2000}>
          <Card className="p-4 bg-card/20 backdrop-blur-md border-white/20 mb-8">
            <h3 className="text-lg font-bold text-accent mb-3 text-center">🎭 Demo for Judges</h3>
            <div className="flex flex-wrap gap-2 justify-center">
              <CosmicButton variant="primary" size="sm" onClick={() => setShowDemo(true)}>
                📋 Interactive Guide
              </CosmicButton>
              <CosmicButton variant="secondary" size="sm" onClick={() => handleStorytellingDemo("teacher-flow")}>
                👩‍🏫 Teacher Story
              </CosmicButton>
              <CosmicButton variant="accent" size="sm" onClick={() => handleStorytellingDemo("student-flow")}>
                🧑‍🎓 Student Story
              </CosmicButton>
              <CosmicButton variant="primary" size="sm" onClick={() => handleStorytellingDemo("blockchain-flow")}>
                ⛓️ Blockchain Flow
              </CosmicButton>
            </div>
          </Card>
        </EnhancedAnimations>

        {/* Feature Cards */}
        <EnhancedAnimations animationType="slideUp" delay={2500}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 max-w-6xl">
            <Card className="p-6 bg-card/20 backdrop-blur-md border-white/20 hover:bg-card/30 transition-all duration-300 animate-pulse-glow">
              <div className="text-center">
                <div className="text-4xl mb-4">🎓</div>
                <h3 className="text-xl font-bold mb-2 text-primary">AI-Powered Learning</h3>
                <p className="text-muted-foreground">
                  Immersive 3D worlds with intelligent NPCs that guide your educational journey
                </p>
              </div>
            </Card>

            <Card className="p-6 bg-card/20 backdrop-blur-md border-white/20 hover:bg-card/30 transition-all duration-300 animate-pulse-glow">
              <div className="text-center">
                <div className="text-4xl mb-4">⛓️</div>
                <h3 className="text-xl font-bold mb-2 text-secondary">Blockchain Ownership</h3>
                <p className="text-muted-foreground">
                  Own your achievements as NFTs and earn rewards for creating educational content
                </p>
              </div>
            </Card>

            <Card className="p-6 bg-card/20 backdrop-blur-md border-white/20 hover:bg-card/30 transition-all duration-300 animate-pulse-glow">
              <div className="text-center">
                <div className="text-4xl mb-4">🌌</div>
                <h3 className="text-xl font-bold mb-2 text-accent">Living Worlds</h3>
                <p className="text-muted-foreground">
                  Explore Ancient Egypt, Mars, and science labs in fully interactive 3D environments
                </p>
              </div>
            </Card>
          </div>
        </EnhancedAnimations>
      </div>

      {/* Demo Overlays */}
      <DemoGuide isActive={showDemo} onClose={() => setShowDemo(false)} onStepComplete={handleDemoComplete} />

      <StorytellingOverlay isActive={showStory} scenario={currentStory} onComplete={() => setShowStory(false)} />

      {/* Cosmic Background Elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-secondary/20 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-48 h-48 bg-accent/20 rounded-full blur-2xl animate-pulse" />
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-primary/20 rounded-full blur-lg animate-pulse" />
    </div>
  )
}
