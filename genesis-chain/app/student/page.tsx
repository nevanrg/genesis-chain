"use client"

import { useState } from "react"
import { Floating3DModels } from "@/components/floating-3d-models"
import { CosmicButton } from "@/components/cosmic-button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ThreeDWorldViewer } from "@/components/3d-world-viewer"
import { NPCDialog } from "@/components/npc-dialog"
import { LearningModule } from "@/components/learning-module"
import { ProgressTracker } from "@/components/gamification/progress-tracker"
import { Leaderboard } from "@/components/gamification/leaderboard"
import { AchievementSystem } from "@/components/gamification/achievement-system"

export default function StudentPortal() {
  const [selectedWorld, setSelectedWorld] = useState<string | null>(null)
  const [currentZone, setCurrentZone] = useState("pyramid")
  const [activeNPC, setActiveNPC] = useState<any>(null)
  const [activeModule, setActiveModule] = useState<any>(null)
  const [currentView, setCurrentView] = useState<"worlds" | "progress" | "leaderboard" | "achievements">("worlds")
  const [studentProgress, setStudentProgress] = useState({
    level: 12,
    xp: 2450,
    totalXP: 12450,
    completedModules: 8,
    totalModules: 25,
    currentStreak: 7,
    badges: 15,
    egyptModules: 3,
    marsModules: 2,
    masteredCategories: 1,
    dailyModules: 2,
    perfectScores: 4,
  })

  const availableWorlds = [
    {
      id: "ancient-egypt",
      title: "Ancient Egypt: Cleopatra's Reign",
      difficulty: "Intermediate",
      duration: "45 min",
      subjects: ["History", "Math", "Science"],
      progress: 65,
      thumbnail: "🏛️",
      description: "Explore the mysteries of ancient Egypt with Cleopatra as your guide",
    },
    {
      id: "mars-exploration",
      title: "Mars: Red Planet Discovery",
      difficulty: "Advanced",
      duration: "60 min",
      subjects: ["Science", "Physics", "Math"],
      progress: 30,
      thumbnail: "🚀",
      description: "Journey to Mars and conduct scientific experiments on the red planet",
    },
    {
      id: "science-lab",
      title: "Quantum Physics Laboratory",
      difficulty: "Expert",
      duration: "90 min",
      subjects: ["Physics", "Chemistry", "Math"],
      progress: 0,
      thumbnail: "⚗️",
      description: "Dive into the quantum realm and discover the secrets of particle physics",
    },
  ]

  const zones = {
    pyramid: { name: "Pyramid Complex", icon: "🔺", unlocked: true },
    nile: { name: "Nile Laboratory", icon: "🌊", unlocked: true },
    scrolls: { name: "Mathematical Scrolls", icon: "📜", unlocked: false },
  }

  const npcs = [
    {
      id: "cleopatra",
      name: "Queen Cleopatra",
      role: "Historical Guide",
      avatar: "👑",
      dialogue:
        "Welcome, young scholar! I am Cleopatra, the last pharaoh of Egypt. Let me show you the wonders of my kingdom and teach you about our great civilization.",
      zone: "pyramid",
    },
    {
      id: "architect",
      name: "Architect Hemiunu",
      role: "Pyramid Expert",
      avatar: "👷",
      dialogue:
        "Greetings! I designed the Great Pyramid. Would you like to learn about the mathematical principles we used in its construction?",
      zone: "pyramid",
    },
  ]

  const learningModules = [
    {
      id: "pyramid-math",
      title: "Pyramid Geometry",
      type: "Math Puzzle",
      description: "Calculate the volume and surface area of the Great Pyramid",
      difficulty: "Medium",
      xpReward: 150,
      zone: "pyramid",
    },
    {
      id: "nile-science",
      title: "River Ecosystem",
      type: "Science Experiment",
      description: "Study the Nile's impact on Egyptian agriculture",
      difficulty: "Easy",
      xpReward: 100,
      zone: "nile",
    },
  ]

  const handleLevelUp = (newLevel: number) => {
    // Trigger confetti animation or other celebration effects
    console.log(`Congratulations! Reached level ${newLevel}!`)
  }

  const handleAchievementUnlock = (achievement: any) => {
    setStudentProgress((prev) => ({
      ...prev,
      xp: prev.xp + achievement.xpReward,
    }))
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <Floating3DModels />

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header with Student Stats */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Student Portal
            </h1>
            <div className="flex items-center gap-4 mt-2">
              <Badge variant="secondary">Level {studentProgress.level}</Badge>
              <Badge variant="outline">{studentProgress.xp} XP</Badge>
              <Badge variant="outline">{studentProgress.currentStreak} day streak</Badge>
            </div>
          </div>
          <div className="flex gap-2">
            <CosmicButton variant="accent" onClick={() => (window.location.href = "/wallet")}>
              💎 My NFTs
            </CosmicButton>
            <CosmicButton variant="secondary" onClick={() => (window.location.href = "/")}>
              Home
            </CosmicButton>
          </div>
        </div>

        <div className="flex gap-2 mb-8">
          <CosmicButton
            variant={currentView === "worlds" ? "primary" : "secondary"}
            onClick={() => setCurrentView("worlds")}
          >
            🌍 Worlds
          </CosmicButton>
          <CosmicButton
            variant={currentView === "progress" ? "primary" : "secondary"}
            onClick={() => setCurrentView("progress")}
          >
            📊 Progress
          </CosmicButton>
          <CosmicButton
            variant={currentView === "leaderboard" ? "primary" : "secondary"}
            onClick={() => setCurrentView("leaderboard")}
          >
            🏆 Leaderboard
          </CosmicButton>
          <CosmicButton
            variant={currentView === "achievements" ? "primary" : "secondary"}
            onClick={() => setCurrentView("achievements")}
          >
            🎖️ Achievements
          </CosmicButton>
        </div>

        {currentView === "progress" && <ProgressTracker studentData={studentProgress} onLevelUp={handleLevelUp} />}

        {currentView === "leaderboard" && <Leaderboard currentUser="You" timeframe="weekly" />}

        {currentView === "achievements" && (
          <AchievementSystem studentProgress={studentProgress} onAchievementUnlock={handleAchievementUnlock} />
        )}

        {currentView === "worlds" && !selectedWorld && (
          <>
            {/* World Selection */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {availableWorlds.map((world) => (
                <Card
                  key={world.id}
                  className="p-6 bg-card/20 backdrop-blur-md border-white/20 hover:bg-card/30 transition-all duration-300 cursor-pointer hover:scale-105"
                  onClick={() => setSelectedWorld(world.id)}
                >
                  <div className="text-center mb-4">
                    <div className="text-6xl mb-2">{world.thumbnail}</div>
                    <h3 className="text-xl font-bold text-primary">{world.title}</h3>
                  </div>

                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">{world.description}</p>

                    <div className="flex flex-wrap gap-1">
                      {world.subjects.map((subject) => (
                        <Badge key={subject} variant="outline" className="text-xs">
                          {subject}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{world.difficulty}</span>
                      <span className="text-muted-foreground">{world.duration}</span>
                    </div>

                    {world.progress > 0 && (
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>Progress</span>
                          <span>{world.progress}%</span>
                        </div>
                        <Progress value={world.progress} className="h-2" />
                      </div>
                    )}
                  </div>

                  <CosmicButton variant={world.progress > 0 ? "secondary" : "primary"} className="w-full mt-4">
                    {world.progress > 0 ? "Continue Learning" : "Start Adventure"}
                  </CosmicButton>
                </Card>
              ))}
            </div>

            {/* Achievement Showcase */}
            <Card className="p-6 bg-card/20 backdrop-blur-md border-white/20">
              <h2 className="text-2xl font-bold mb-4 text-accent">Recent Achievements</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-primary/20 rounded-lg">
                  <div className="text-3xl mb-2">🏆</div>
                  <div className="font-medium">Pyramid Master</div>
                  <div className="text-xs text-muted-foreground">Completed all geometry puzzles</div>
                </div>
                <div className="text-center p-4 bg-secondary/20 rounded-lg">
                  <div className="text-3xl mb-2">🧪</div>
                  <div className="font-medium">Science Explorer</div>
                  <div className="text-xs text-muted-foreground">Conducted 10 experiments</div>
                </div>
                <div className="text-center p-4 bg-accent/20 rounded-lg">
                  <div className="text-3xl mb-2">📚</div>
                  <div className="font-medium">Knowledge Seeker</div>
                  <div className="text-xs text-muted-foreground">7-day learning streak</div>
                </div>
                <div className="text-center p-4 bg-primary/20 rounded-lg">
                  <div className="text-3xl mb-2">⭐</div>
                  <div className="font-medium">Rising Star</div>
                  <div className="text-xs text-muted-foreground">Reached Level 12</div>
                </div>
              </div>
            </Card>
          </>
        )}

        {currentView === "worlds" && selectedWorld && (
          /* 3D World Interface */
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Main 3D Viewer */}
            <div className="lg:col-span-3">
              <ThreeDWorldViewer
                worldId={selectedWorld}
                currentZone={currentZone}
                onZoneChange={setCurrentZone}
                onNPCInteract={setActiveNPC}
                onModuleStart={setActiveModule}
              />
            </div>

            {/* Side Panel */}
            <div className="space-y-4">
              {/* Zone Navigation */}
              <Card className="p-4 bg-card/20 backdrop-blur-md border-white/20">
                <h3 className="font-bold mb-3 text-primary">Teleport Zones</h3>
                <div className="space-y-2">
                  {Object.entries(zones).map(([key, zone]) => (
                    <CosmicButton
                      key={key}
                      variant={currentZone === key ? "primary" : "secondary"}
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => zone.unlocked && setCurrentZone(key)}
                    >
                      <span className="mr-2">{zone.icon}</span>
                      {zone.name}
                      {!zone.unlocked && <span className="ml-auto">🔒</span>}
                    </CosmicButton>
                  ))}
                </div>
              </Card>

              {/* Mini Map */}
              <Card className="p-4 bg-card/20 backdrop-blur-md border-white/20">
                <h3 className="font-bold mb-3 text-secondary">Mini Map</h3>
                <div className="relative h-32 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg">
                  <div className="absolute inset-2 border border-white/20 rounded">
                    <div className="absolute top-2 left-2 w-2 h-2 bg-accent rounded-full animate-pulse" />
                    <div className="absolute bottom-2 right-2 w-2 h-2 bg-primary rounded-full" />
                    <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-secondary rounded-full transform -translate-x-1/2 -translate-y-1/2" />
                  </div>
                </div>
              </Card>

              {/* Quick Actions */}
              <Card className="p-4 bg-card/20 backdrop-blur-md border-white/20">
                <h3 className="font-bold mb-3 text-accent">Quick Actions</h3>
                <div className="space-y-2">
                  <CosmicButton
                    variant="accent"
                    size="sm"
                    className="w-full"
                    onClick={() => setCurrentView("progress")}
                  >
                    📋 View Progress
                  </CosmicButton>
                  <CosmicButton variant="secondary" size="sm" className="w-full">
                    💡 Get Hint
                  </CosmicButton>
                  <CosmicButton variant="primary" size="sm" className="w-full" onClick={() => setSelectedWorld(null)}>
                    🚪 Exit World
                  </CosmicButton>
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* NPC Dialog Modal */}
        {activeNPC && <NPCDialog npc={activeNPC} onClose={() => setActiveNPC(null)} onModuleStart={setActiveModule} />}

        {/* Learning Module Modal */}
        {activeModule && (
          <LearningModule
            module={activeModule}
            onClose={() => setActiveModule(null)}
            onComplete={(xp) => {
              setStudentProgress((prev) => ({ ...prev, xp: prev.xp + xp, completedModules: prev.completedModules + 1 }))
              setActiveModule(null)
            }}
          />
        )}
      </div>
    </div>
  )
}
