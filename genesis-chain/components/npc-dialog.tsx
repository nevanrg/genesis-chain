"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { CosmicButton } from "@/components/cosmic-button"

interface NPCDialogProps {
  npc: {
    id: string
    name: string
    dialogue: string
    avatar: string
  }
  onClose: () => void
  onModuleStart: (module: any) => void
}

export function NPCDialog({ npc, onClose, onModuleStart }: NPCDialogProps) {
  const [currentDialogue, setCurrentDialogue] = useState(0)

  const dialogues = [
    npc.dialogue,
    "I have prepared some challenges for you. Would you like to test your knowledge?",
    "Remember, every great scholar started as a curious student. Let's begin your journey!",
  ]

  const handleStartModule = () => {
    onModuleStart({
      id: `${npc.id}-module`,
      title: `${npc.name}'s Challenge`,
      type: "Interactive Learning",
      xpReward: 200,
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full bg-card/90 backdrop-blur-md border-white/20 p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="text-4xl">{npc.avatar}</div>
          <div>
            <h3 className="text-xl font-bold text-primary">{npc.name}</h3>
            <p className="text-sm text-muted-foreground">Ancient Guide</p>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-foreground leading-relaxed">{dialogues[currentDialogue]}</p>
        </div>

        <div className="flex gap-2">
          {currentDialogue < dialogues.length - 1 ? (
            <CosmicButton variant="primary" onClick={() => setCurrentDialogue((prev) => prev + 1)} className="flex-1">
              Continue
            </CosmicButton>
          ) : (
            <CosmicButton variant="primary" onClick={handleStartModule} className="flex-1">
              Start Challenge
            </CosmicButton>
          )}
          <CosmicButton variant="secondary" onClick={onClose}>
            Later
          </CosmicButton>
        </div>
      </Card>
    </div>
  )
}
