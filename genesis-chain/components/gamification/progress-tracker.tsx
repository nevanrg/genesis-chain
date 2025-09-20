"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

interface ProgressTrackerProps {
  studentData: {
    level: number
    xp: number
    totalXP: number
    completedModules: number
    totalModules: number
    currentStreak: number
    badges: any[]
  }
  onLevelUp?: (newLevel: number) => void
}

export function ProgressTracker({ studentData, onLevelUp }: ProgressTrackerProps) {
  const [showLevelUpAnimation, setShowLevelUpAnimation] = useState(false)
  const [previousLevel, setPreviousLevel] = useState(studentData.level)

  const xpToNextLevel = (studentData.level + 1) * 1000
  const currentLevelXP = studentData.xp % 1000
  const progressToNextLevel = (currentLevelXP / 1000) * 100

  useEffect(() => {
    if (studentData.level > previousLevel) {
      setShowLevelUpAnimation(true)
      onLevelUp?.(studentData.level)
      setTimeout(() => setShowLevelUpAnimation(false), 3000)
    }
    setPreviousLevel(studentData.level)
  }, [studentData.level, previousLevel, onLevelUp])

  const getSkillTree = () => {
    return [
      {
        category: "Mathematics",
        level: Math.floor(studentData.level * 0.8),
        maxLevel: 20,
        skills: ["Geometry", "Algebra", "Calculus", "Statistics"],
        color: "bg-primary",
      },
      {
        category: "Science",
        level: Math.floor(studentData.level * 0.9),
        maxLevel: 20,
        skills: ["Physics", "Chemistry", "Biology", "Astronomy"],
        color: "bg-secondary",
      },
      {
        category: "History",
        level: Math.floor(studentData.level * 0.7),
        maxLevel: 20,
        skills: ["Ancient Civilizations", "World Wars", "Cultural Studies"],
        color: "bg-accent",
      },
    ]
  }

  return (
    <div className="space-y-6">
      {/* Level Up Animation */}
      {showLevelUpAnimation && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <Card className="p-8 bg-card/90 backdrop-blur-md border-white/20 text-center">
            <div className="text-6xl mb-4 animate-bounce">🎉</div>
            <h2 className="text-3xl font-bold text-primary mb-2">Level Up!</h2>
            <p className="text-xl text-muted-foreground mb-4">You reached Level {studentData.level}!</p>
            <div className="text-sm text-muted-foreground">New skills and challenges unlocked!</div>
          </Card>
        </div>
      )}

      {/* Main Progress Card */}
      <Card className="p-6 bg-card/20 backdrop-blur-md border-white/20">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-2xl font-bold text-primary">Level {studentData.level}</h3>
            <p className="text-muted-foreground">Learning Explorer</p>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-secondary">{studentData.xp.toLocaleString()} XP</div>
            <div className="text-sm text-muted-foreground">
              {(xpToNextLevel - currentLevelXP).toLocaleString()} to next level
            </div>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span>Progress to Level {studentData.level + 1}</span>
            <span>{Math.round(progressToNextLevel)}%</span>
          </div>
          <Progress value={progressToNextLevel} className="h-3" />
        </div>

        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-primary">{studentData.completedModules}</div>
            <div className="text-sm text-muted-foreground">Modules Completed</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-secondary">{studentData.currentStreak}</div>
            <div className="text-sm text-muted-foreground">Day Streak</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-accent">{studentData.badges.length}</div>
            <div className="text-sm text-muted-foreground">Badges Earned</div>
          </div>
        </div>
      </Card>

      {/* Skill Trees */}
      <Card className="p-6 bg-card/20 backdrop-blur-md border-white/20">
        <h3 className="text-xl font-bold text-primary mb-4">Skill Trees</h3>
        <div className="space-y-4">
          {getSkillTree().map((category) => (
            <div key={category.category}>
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold">{category.category}</h4>
                <Badge variant="outline">
                  Level {category.level}/{category.maxLevel}
                </Badge>
              </div>
              <Progress value={(category.level / category.maxLevel) * 100} className="h-2 mb-2" />
              <div className="flex flex-wrap gap-1">
                {category.skills.map((skill, index) => (
                  <Badge key={skill} variant={index < category.level / 5 ? "default" : "outline"} className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Achievement Milestones */}
      <Card className="p-6 bg-card/20 backdrop-blur-md border-white/20">
        <h3 className="text-xl font-bold text-secondary mb-4">Achievement Milestones</h3>
        <div className="space-y-3">
          {[
            {
              milestone: "Complete 10 modules",
              progress: studentData.completedModules,
              target: 10,
              reward: "Explorer Badge",
            },
            { milestone: "Reach Level 15", progress: studentData.level, target: 15, reward: "Scholar Title" },
            { milestone: "7-day streak", progress: studentData.currentStreak, target: 7, reward: "Dedication NFT" },
            { milestone: "Master 3 skill trees", progress: 1, target: 3, reward: "Polymath Badge" },
          ].map((achievement, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
              <div>
                <div className="font-medium">{achievement.milestone}</div>
                <div className="text-sm text-muted-foreground">Reward: {achievement.reward}</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium">
                  {Math.min(achievement.progress, achievement.target)}/{achievement.target}
                </div>
                <Progress
                  value={(Math.min(achievement.progress, achievement.target) / achievement.target) * 100}
                  className="h-2 w-20"
                />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
