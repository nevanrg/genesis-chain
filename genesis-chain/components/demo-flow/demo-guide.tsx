"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { CosmicButton } from "@/components/cosmic-button"
import { Badge } from "@/components/ui/badge"

interface DemoStep {
  id: string
  title: string
  description: string
  component: string
  action: string
  highlight?: string
  tooltip?: string
}

interface DemoGuideProps {
  isActive: boolean
  onClose: () => void
  onStepComplete: (stepId: string) => void
}

export function DemoGuide({ isActive, onClose, onStepComplete }: DemoGuideProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<string[]>([])

  const demoSteps: DemoStep[] = [
    {
      id: "landing",
      title: "Welcome to Genesis Chain",
      description: "Experience the future of education with blockchain-powered learning worlds",
      component: "landing-page",
      action: "Explore the cosmic interface and floating 3D models",
      tooltip: "Click on floating objects to interact with them",
    },
    {
      id: "teacher-portal",
      title: "AI World Builder",
      description: "Teachers can create immersive learning worlds using natural language",
      component: "teacher-portal",
      action: "Try describing a world: 'Ancient Egypt with Cleopatra, pyramids, and the Nile'",
      highlight: "world-description-input",
    },
    {
      id: "world-generation",
      title: "AI World Generation",
      description: "Watch as AI generates a complete 3D world with NPCs and learning modules",
      component: "teacher-portal",
      action: "Click 'Generate World' to see AI create your educational environment",
      highlight: "generate-button",
    },
    {
      id: "nft-publishing",
      title: "Blockchain Publishing",
      description: "Publish your world as an NFT to earn royalties from student usage",
      component: "teacher-portal",
      action: "Click 'Publish as NFT' to mint your world on the blockchain",
      highlight: "publish-button",
    },
    {
      id: "student-experience",
      title: "Immersive Learning",
      description: "Students enter fully interactive 3D worlds with AI-powered NPCs",
      component: "student-portal",
      action: "Select a world and interact with NPCs and learning modules",
      highlight: "world-selection",
    },
    {
      id: "npc-interaction",
      title: "AI-Powered NPCs",
      description: "Engage with historical figures and expert guides in natural conversations",
      component: "3d-world",
      action: "Click on Queen Cleopatra to start a dialogue",
      highlight: "npc-cleopatra",
    },
    {
      id: "learning-modules",
      title: "Interactive Challenges",
      description: "Complete gamified learning modules with real-time feedback",
      component: "learning-module",
      action: "Solve pyramid geometry puzzles to earn XP and achievements",
      highlight: "module-pyramid-math",
    },
    {
      id: "nft-rewards",
      title: "NFT Achievement System",
      description: "Earn unique NFT badges for completing challenges and milestones",
      component: "wallet",
      action: "View your NFT collection and blockchain achievements",
      highlight: "nft-collection",
    },
    {
      id: "royalty-flow",
      title: "Automatic Royalties",
      description: "Teachers earn cryptocurrency when students use their worlds",
      component: "blockchain-animation",
      action: "Watch the smart contract automatically distribute royalties",
      highlight: "royalty-animation",
    },
    {
      id: "gamification",
      title: "Progress Tracking",
      description: "Advanced gamification with skill trees, leaderboards, and achievements",
      component: "student-portal",
      action: "Explore your progress, compete on leaderboards, and unlock achievements",
      highlight: "progress-tracker",
    },
  ]

  const currentDemoStep = demoSteps[currentStep]

  const handleNextStep = () => {
    if (currentStep < demoSteps.length - 1) {
      setCompletedSteps([...completedSteps, currentDemoStep.id])
      onStepComplete(currentDemoStep.id)
      setCurrentStep(currentStep + 1)
    } else {
      onClose()
    }
  }

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSkipDemo = () => {
    onClose()
  }

  if (!isActive) return null

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full bg-card/95 backdrop-blur-md border-white/20 p-6">
        {/* Demo Progress */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Badge variant="secondary">Demo Guide</Badge>
            <Badge variant="outline">
              Step {currentStep + 1} of {demoSteps.length}
            </Badge>
          </div>
          <CosmicButton variant="secondary" size="sm" onClick={handleSkipDemo}>
            Skip Demo
          </CosmicButton>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-muted/20 rounded-full h-2 mb-6">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-500"
            style={{ width: `${((currentStep + 1) / demoSteps.length) * 100}%` }}
          />
        </div>

        {/* Current Step Content */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-primary mb-2">{currentDemoStep.title}</h2>
          <p className="text-muted-foreground mb-4">{currentDemoStep.description}</p>

          <div className="p-4 bg-secondary/20 border border-secondary/30 rounded-lg">
            <h3 className="font-semibold text-secondary mb-2">Try This:</h3>
            <p className="text-sm">{currentDemoStep.action}</p>
            {currentDemoStep.tooltip && (
              <p className="text-xs text-muted-foreground mt-2 italic">💡 Tip: {currentDemoStep.tooltip}</p>
            )}
          </div>
        </div>

        {/* Demo Navigation */}
        <div className="flex items-center justify-between">
          <CosmicButton variant="secondary" onClick={handlePreviousStep} disabled={currentStep === 0}>
            Previous
          </CosmicButton>

          <div className="flex gap-1">
            {demoSteps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentStep ? "bg-primary" : index < currentStep ? "bg-secondary" : "bg-muted"
                }`}
              />
            ))}
          </div>

          <CosmicButton variant="primary" onClick={handleNextStep}>
            {currentStep === demoSteps.length - 1 ? "Finish Demo" : "Next"}
          </CosmicButton>
        </div>

        {/* Demo Highlights */}
        {currentDemoStep.highlight && (
          <div className="mt-4 p-3 bg-accent/20 border border-accent/30 rounded-lg">
            <div className="flex items-center gap-2">
              <div className="text-accent">✨</div>
              <span className="text-accent font-medium">Look for the highlighted element</span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              The {currentDemoStep.highlight.replace("-", " ")} will be highlighted on the page
            </p>
          </div>
        )}
      </Card>
    </div>
  )
}
