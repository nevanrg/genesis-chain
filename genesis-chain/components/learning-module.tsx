"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { CosmicButton } from "@/components/cosmic-button"
import { Progress } from "@/components/ui/progress"

interface LearningModuleProps {
  module: {
    id: string
    title: string
    type: string
    xpReward: number
  }
  onClose: () => void
  onComplete: (xp: number) => void
}

export function LearningModule({ module, onClose, onComplete }: LearningModuleProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [showResults, setShowResults] = useState(false)

  const questions = [
    {
      question: "What is the volume formula for a pyramid?",
      options: ["V = (1/3) × base area × height", "V = base area × height", "V = π × r² × h"],
      correct: 0,
    },
    {
      question: "How many sides does the Great Pyramid have?",
      options: ["3", "4", "5"],
      correct: 1,
    },
    {
      question: "What material was primarily used in pyramid construction?",
      options: ["Wood", "Limestone", "Clay"],
      correct: 1,
    },
  ]

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers]
    newAnswers[currentStep] = answerIndex.toString()
    setAnswers(newAnswers)

    if (currentStep < questions.length - 1) {
      setCurrentStep((prev) => prev + 1)
    } else {
      setShowResults(true)
    }
  }

  const calculateScore = () => {
    let correct = 0
    answers.forEach((answer, index) => {
      if (Number.parseInt(answer) === questions[index].correct) {
        correct++
      }
    })
    return correct
  }

  const handleComplete = () => {
    const score = calculateScore()
    const earnedXP = Math.floor((score / questions.length) * module.xpReward)
    onComplete(earnedXP)
  }

  const progress = ((currentStep + (showResults ? 1 : 0)) / (questions.length + 1)) * 100

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full bg-card/90 backdrop-blur-md border-white/20 p-6">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-primary">{module.title}</h2>
            <div className="text-sm text-muted-foreground">{module.xpReward} XP Available</div>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {!showResults ? (
          <div className="space-y-6">
            <div>
              <div className="text-sm text-muted-foreground mb-2">
                Question {currentStep + 1} of {questions.length}
              </div>
              <h3 className="text-xl font-semibold mb-4">{questions[currentStep].question}</h3>
            </div>

            <div className="space-y-3">
              {questions[currentStep].options.map((option, index) => (
                <CosmicButton
                  key={index}
                  variant="secondary"
                  className="w-full text-left justify-start p-4 h-auto"
                  onClick={() => handleAnswer(index)}
                >
                  <span className="mr-3 text-accent font-bold">{String.fromCharCode(65 + index)}.</span>
                  {option}
                </CosmicButton>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center space-y-6">
            <div className="text-6xl mb-4">
              {calculateScore() === questions.length ? "🏆" : calculateScore() >= questions.length / 2 ? "⭐" : "📚"}
            </div>

            <div>
              <h3 className="text-2xl font-bold text-primary mb-2">Challenge Complete!</h3>
              <p className="text-lg">
                You scored {calculateScore()} out of {questions.length}
              </p>
              <p className="text-muted-foreground">
                Earned: {Math.floor((calculateScore() / questions.length) * module.xpReward)} XP
              </p>
            </div>

            <div className="flex gap-4">
              <CosmicButton variant="primary" onClick={handleComplete} className="flex-1">
                Claim Rewards
              </CosmicButton>
              <CosmicButton variant="secondary" onClick={onClose}>
                Try Again
              </CosmicButton>
            </div>
          </div>
        )}

        <div className="flex justify-between mt-6">
          <CosmicButton variant="secondary" onClick={onClose}>
            Exit Module
          </CosmicButton>
          {!showResults && currentStep > 0 && (
            <CosmicButton variant="accent" onClick={() => setCurrentStep((prev) => prev - 1)}>
              Previous
            </CosmicButton>
          )}
        </div>
      </Card>
    </div>
  )
}
