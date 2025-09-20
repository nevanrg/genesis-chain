"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { CosmicButton } from "@/components/cosmic-button"

interface StorytellingOverlayProps {
  isActive: boolean
  scenario: "teacher-flow" | "student-flow" | "blockchain-flow"
  onComplete: () => void
}

export function StorytellingOverlay({ isActive, scenario, onComplete }: StorytellingOverlayProps) {
  const [currentScene, setCurrentScene] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const scenarios = {
    "teacher-flow": {
      title: "Teacher Journey: Creating Living Worlds",
      scenes: [
        {
          title: "Meet Dr. Sarah Chen",
          content: "A history teacher who wants to make Ancient Egypt come alive for her students",
          visual: "👩‍🏫",
          narration: "Dr. Chen opens Genesis Chain and describes her vision...",
        },
        {
          title: "AI World Generation",
          content: "She describes: 'Ancient Egypt with Cleopatra, pyramids, and interactive Nile experiments'",
          visual: "🤖",
          narration: "The AI instantly generates a complete 3D world with NPCs and learning modules...",
        },
        {
          title: "World Preview",
          content: "A cinematic preview shows Cleopatra welcoming students to explore the pyramids",
          visual: "🎬",
          narration: "Dr. Chen previews her world and adds custom media content...",
        },
        {
          title: "NFT Publishing",
          content: "She publishes the world as an NFT, setting up automatic royalty collection",
          visual: "💎",
          narration: "The smart contract mints her world, ready to earn royalties from student usage...",
        },
      ],
    },
    "student-flow": {
      title: "Student Journey: Immersive Learning Adventure",
      scenes: [
        {
          title: "Meet Alex, Age 14",
          content: "A curious student who struggles with traditional textbook learning",
          visual: "🧑‍🎓",
          narration: "Alex enters the Ancient Egypt world and is immediately transported...",
        },
        {
          title: "Meeting Cleopatra",
          content: "Alex interacts with Queen Cleopatra, who explains Egyptian civilization",
          visual: "👑",
          narration: "The AI-powered NPC responds naturally to Alex's questions...",
        },
        {
          title: "Pyramid Challenge",
          content: "Alex solves geometry puzzles to understand pyramid construction",
          visual: "🔺",
          narration: "Interactive modules make complex math concepts engaging and fun...",
        },
        {
          title: "NFT Achievement",
          content: "Alex earns a 'Pyramid Master' NFT badge for completing all challenges",
          visual: "🏆",
          narration: "The blockchain automatically mints Alex's achievement as a permanent record...",
        },
      ],
    },
    "blockchain-flow": {
      title: "Blockchain Magic: Automatic Value Distribution",
      scenes: [
        {
          title: "Student Completes Module",
          content: "Alex finishes the pyramid geometry challenge with a perfect score",
          visual: "✅",
          narration: "The smart contract detects the completion and triggers multiple actions...",
        },
        {
          title: "NFT Minting",
          content: "A unique achievement NFT is automatically minted to Alex's wallet",
          visual: "⚡",
          narration: "The NFT contains metadata about skills learned and completion date...",
        },
        {
          title: "Royalty Distribution",
          content: "Dr. Chen automatically receives cryptocurrency for her world's usage",
          visual: "💰",
          narration: "5% of the transaction value flows to the teacher's wallet...",
        },
        {
          title: "Network Effect",
          content: "Other teachers can remix Dr. Chen's world, creating a royalty chain",
          visual: "🔄",
          narration: "The ecosystem grows as educators build upon each other's work...",
        },
      ],
    },
  }

  const currentScenario = scenarios[scenario]
  const currentSceneData = currentScenario.scenes[currentScene]

  const handleNextScene = () => {
    if (currentScene < currentScenario.scenes.length - 1) {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentScene(currentScene + 1)
        setIsAnimating(false)
      }, 300)
    } else {
      onComplete()
    }
  }

  const handlePreviousScene = () => {
    if (currentScene > 0) {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentScene(currentScene - 1)
        setIsAnimating(false)
      }, 300)
    }
  }

  if (!isActive) return null

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="max-w-4xl w-full bg-card/95 backdrop-blur-md border-white/20 p-8">
        {/* Scenario Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">{currentScenario.title}</h1>
          <div className="flex items-center justify-center gap-2">
            {currentScenario.scenes.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentScene ? "bg-primary" : index < currentScene ? "bg-secondary" : "bg-muted"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Scene Content */}
        <div className={`transition-all duration-300 ${isAnimating ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}>
          <div className="text-center mb-8">
            <div className="text-8xl mb-4 animate-float">{currentSceneData.visual}</div>
            <h2 className="text-2xl font-bold text-secondary mb-4">{currentSceneData.title}</h2>
            <p className="text-lg text-muted-foreground mb-6">{currentSceneData.content}</p>

            <div className="p-4 bg-primary/20 border border-primary/30 rounded-lg">
              <p className="text-primary font-medium italic">"{currentSceneData.narration}"</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8">
          <CosmicButton variant="secondary" onClick={handlePreviousScene} disabled={currentScene === 0}>
            Previous Scene
          </CosmicButton>

          <div className="text-sm text-muted-foreground">
            Scene {currentScene + 1} of {currentScenario.scenes.length}
          </div>

          <CosmicButton variant="primary" onClick={handleNextScene}>
            {currentScene === currentScenario.scenes.length - 1 ? "Complete Story" : "Next Scene"}
          </CosmicButton>
        </div>

        {/* Skip Option */}
        <div className="text-center mt-4">
          <CosmicButton variant="accent" size="sm" onClick={onComplete}>
            Skip Storytelling
          </CosmicButton>
        </div>
      </Card>
    </div>
  )
}
