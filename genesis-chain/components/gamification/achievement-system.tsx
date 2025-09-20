"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CosmicButton } from "@/components/cosmic-button"

interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  rarity: "Common" | "Rare" | "Epic" | "Legendary"
  progress: number
  maxProgress: number
  unlocked: boolean
  xpReward: number
  nftReward?: boolean
}

interface AchievementSystemProps {
  studentProgress: any
  onAchievementUnlock?: (achievement: Achievement) => void
}

export function AchievementSystem({ studentProgress, onAchievementUnlock }: AchievementSystemProps) {
  const [showUnlockAnimation, setShowUnlockAnimation] = useState<Achievement | null>(null)
  const [filter, setFilter] = useState<"all" | "unlocked" | "locked">("all")
  const [shownAchievements, setShownAchievements] = useState<Set<string>>(new Set())

  const achievements: Achievement[] = [
    {
      id: "first-steps",
      title: "First Steps",
      description: "Complete your first learning module",
      icon: "👶",
      rarity: "Common",
      progress: Math.min(studentProgress.completedModules, 1),
      maxProgress: 1,
      unlocked: studentProgress.completedModules >= 1,
      xpReward: 100,
    },
    {
      id: "pyramid-master",
      title: "Pyramid Master",
      description: "Complete all Ancient Egypt modules",
      icon: "🏛️",
      rarity: "Epic",
      progress: Math.min(studentProgress.egyptModules || 0, 5),
      maxProgress: 5,
      unlocked: (studentProgress.egyptModules || 0) >= 5,
      xpReward: 500,
      nftReward: true,
    },
    {
      id: "mars-explorer",
      title: "Mars Explorer",
      description: "Successfully complete a Mars mission",
      icon: "🚀",
      rarity: "Rare",
      progress: Math.min(studentProgress.marsModules || 0, 3),
      maxProgress: 3,
      unlocked: (studentProgress.marsModules || 0) >= 3,
      xpReward: 300,
    },
    {
      id: "streak-warrior",
      title: "Streak Warrior",
      description: "Maintain a 7-day learning streak",
      icon: "🔥",
      rarity: "Rare",
      progress: Math.min(studentProgress.currentStreak, 7),
      maxProgress: 7,
      unlocked: studentProgress.currentStreak >= 7,
      xpReward: 350,
    },
    {
      id: "knowledge-seeker",
      title: "Knowledge Seeker",
      description: "Reach Level 10",
      icon: "📚",
      rarity: "Common",
      progress: Math.min(studentProgress.level, 10),
      maxProgress: 10,
      unlocked: studentProgress.level >= 10,
      xpReward: 200,
    },
    {
      id: "polymath",
      title: "Polymath",
      description: "Master skills in 3 different categories",
      icon: "🧠",
      rarity: "Legendary",
      progress: Math.min(studentProgress.masteredCategories || 0, 3),
      maxProgress: 3,
      unlocked: (studentProgress.masteredCategories || 0) >= 3,
      xpReward: 1000,
      nftReward: true,
    },
    {
      id: "speed-learner",
      title: "Speed Learner",
      description: "Complete 5 modules in one day",
      icon: "⚡",
      rarity: "Epic",
      progress: Math.min(studentProgress.dailyModules || 0, 5),
      maxProgress: 5,
      unlocked: (studentProgress.dailyModules || 0) >= 5,
      xpReward: 400,
    },
    {
      id: "perfectionist",
      title: "Perfectionist",
      description: "Score 100% on 10 modules",
      icon: "💯",
      rarity: "Epic",
      progress: Math.min(studentProgress.perfectScores || 0, 10),
      maxProgress: 10,
      unlocked: (studentProgress.perfectScores || 0) >= 10,
      xpReward: 600,
    },
  ]

  useEffect(() => {
    achievements.forEach((achievement) => {
      if (achievement.unlocked && !shownAchievements.has(achievement.id)) {
        setTimeout(() => {
          setShowUnlockAnimation(achievement)
          onAchievementUnlock?.(achievement)
          setShownAchievements((prev) => new Set([...prev, achievement.id]))
          setTimeout(() => setShowUnlockAnimation(null), 4000)
        }, 1000)
      }
    })
  }, [studentProgress, shownAchievements])

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "Common":
        return "bg-gray-500"
      case "Rare":
        return "bg-blue-500"
      case "Epic":
        return "bg-purple-500"
      case "Legendary":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  const filteredAchievements = achievements.filter((achievement) => {
    if (filter === "unlocked") return achievement.unlocked
    if (filter === "locked") return !achievement.unlocked
    return true
  })

  return (
    <div className="space-y-6">
      {showUnlockAnimation && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <Card className="p-8 bg-card/90 backdrop-blur-md border-white/20 text-center max-w-md">
            <div className="text-6xl mb-4 animate-bounce">{showUnlockAnimation.icon}</div>
            <h2 className="text-2xl font-bold text-primary mb-2">Achievement Unlocked!</h2>
            <h3 className="text-xl font-semibold mb-2">{showUnlockAnimation.title}</h3>
            <p className="text-muted-foreground mb-4">{showUnlockAnimation.description}</p>
            <div className="flex items-center justify-center gap-4">
              <Badge className={getRarityColor(showUnlockAnimation.rarity)}>{showUnlockAnimation.rarity}</Badge>
              <div className="text-primary font-bold">+{showUnlockAnimation.xpReward} XP</div>
              {showUnlockAnimation.nftReward && (
                <Badge variant="outline" className="text-accent border-accent">
                  NFT Reward
                </Badge>
              )}
            </div>
          </Card>
        </div>
      )}

      <Card className="p-4 bg-card/20 backdrop-blur-md border-white/20">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-primary">Achievements</h3>
          <div className="flex gap-2">
            {(["all", "unlocked", "locked"] as const).map((filterType) => (
              <CosmicButton
                key={filterType}
                variant={filter === filterType ? "primary" : "secondary"}
                size="sm"
                onClick={() => setFilter(filterType)}
              >
                {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
              </CosmicButton>
            ))}
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredAchievements.map((achievement) => (
          <Card
            key={achievement.id}
            className={`p-4 backdrop-blur-md border-white/20 transition-all duration-300 ${
              achievement.unlocked
                ? "bg-card/30 hover:bg-card/40 border-primary/30"
                : "bg-card/10 hover:bg-card/20 opacity-75"
            }`}
          >
            <div className="flex items-start gap-4">
              <div className={`text-3xl ${achievement.unlocked ? "animate-pulse" : "grayscale opacity-50"}`}>
                {achievement.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className={`font-bold ${achievement.unlocked ? "text-primary" : "text-muted-foreground"}`}>
                    {achievement.title}
                  </h4>
                  <Badge className={`text-xs ${getRarityColor(achievement.rarity)}`}>{achievement.rarity}</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{achievement.description}</p>

                {!achievement.unlocked && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span>Progress</span>
                      <span>
                        {achievement.progress}/{achievement.maxProgress}
                      </span>
                    </div>
                    <Progress value={(achievement.progress / achievement.maxProgress) * 100} className="h-2" />
                  </div>
                )}

                <div className="flex items-center justify-between mt-3">
                  <div className="text-sm">
                    <span className="text-primary font-medium">+{achievement.xpReward} XP</span>
                    {achievement.nftReward && (
                      <Badge variant="outline" className="ml-2 text-xs text-accent border-accent">
                        NFT
                      </Badge>
                    )}
                  </div>
                  {achievement.unlocked && (
                    <Badge variant="default" className="text-xs bg-green-500">
                      Unlocked
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-4 bg-card/20 backdrop-blur-md border-white/20">
        <h4 className="font-bold text-secondary mb-3">Achievement Progress</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-primary">{achievements.filter((a) => a.unlocked).length}</div>
            <div className="text-sm text-muted-foreground">Unlocked</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-secondary">{achievements.length}</div>
            <div className="text-sm text-muted-foreground">Total</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-accent">
              {achievements.filter((a) => a.unlocked && a.rarity === "Legendary").length}
            </div>
            <div className="text-sm text-muted-foreground">Legendary</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary">
              {achievements.filter((a) => a.unlocked && a.nftReward).length}
            </div>
            <div className="text-sm text-muted-foreground">NFT Rewards</div>
          </div>
        </div>
      </Card>
    </div>
  )
}
