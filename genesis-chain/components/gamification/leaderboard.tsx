"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { CosmicButton } from "@/components/cosmic-button"

interface LeaderboardProps {
  currentUser: string
  timeframe: "daily" | "weekly" | "monthly" | "all-time"
}

export function Leaderboard({ currentUser, timeframe }: LeaderboardProps) {
  const [selectedTimeframe, setSelectedTimeframe] = useState(timeframe)

  const mockLeaderboardData = {
    daily: [
      { rank: 1, name: "Alex Chen", xp: 1250, level: 15, badge: "🏆", streak: 12 },
      { rank: 2, name: "Sarah Johnson", xp: 1180, level: 14, badge: "🥈", streak: 8 },
      { rank: 3, name: "Mike Rodriguez", xp: 1050, level: 13, badge: "🥉", streak: 5 },
      { rank: 4, name: "Emma Wilson", xp: 980, level: 12, badge: "", streak: 3 },
      { rank: 5, name: "David Kim", xp: 920, level: 12, badge: "", streak: 7 },
      { rank: 6, name: currentUser, xp: 850, level: 11, badge: "", streak: 4 },
    ],
    weekly: [
      { rank: 1, name: "Sarah Johnson", xp: 8500, level: 18, badge: "🏆", streak: 15 },
      { rank: 2, name: "Alex Chen", xp: 8200, level: 17, badge: "🥈", streak: 12 },
      { rank: 3, name: "Emma Wilson", xp: 7800, level: 16, badge: "🥉", streak: 9 },
      { rank: 4, name: "Mike Rodriguez", xp: 7500, level: 15, badge: "", streak: 6 },
      { rank: 5, name: currentUser, xp: 7200, level: 14, badge: "", streak: 8 },
      { rank: 6, name: "David Kim", xp: 6900, level: 14, badge: "", streak: 11 },
    ],
    monthly: [
      { rank: 1, name: "Emma Wilson", xp: 35000, level: 25, badge: "🏆", streak: 28 },
      { rank: 2, name: "Alex Chen", xp: 32000, level: 24, badge: "🥈", streak: 25 },
      { rank: 3, name: "Sarah Johnson", xp: 30000, level: 23, badge: "🥉", streak: 22 },
      { rank: 4, name: currentUser, xp: 28000, level: 22, badge: "", streak: 20 },
      { rank: 5, name: "Mike Rodriguez", xp: 26000, level: 21, badge: "", streak: 18 },
      { rank: 6, name: "David Kim", xp: 24000, level: 20, badge: "", streak: 15 },
    ],
    "all-time": [
      { rank: 1, name: "Alex Chen", xp: 125000, level: 45, badge: "👑", streak: 180 },
      { rank: 2, name: "Emma Wilson", xp: 118000, level: 42, badge: "🏆", streak: 165 },
      { rank: 3, name: "Sarah Johnson", xp: 110000, level: 40, badge: "🥈", streak: 150 },
      { rank: 4, name: "Mike Rodriguez", xp: 95000, level: 35, badge: "🥉", streak: 120 },
      { rank: 5, name: currentUser, xp: 85000, level: 32, badge: "", streak: 100 },
      { rank: 6, name: "David Kim", xp: 78000, level: 30, badge: "", streak: 90 },
    ],
  }

  const currentData = mockLeaderboardData[selectedTimeframe]
  const userRank = currentData.find((entry) => entry.name === currentUser)

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "text-yellow-400"
      case 2:
        return "text-gray-400"
      case 3:
        return "text-amber-600"
      default:
        return "text-muted-foreground"
    }
  }

  return (
    <Card className="p-6 bg-card/20 backdrop-blur-md border-white/20">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-primary">Leaderboard</h3>
        <div className="flex gap-1">
          {(["daily", "weekly", "monthly", "all-time"] as const).map((period) => (
            <CosmicButton
              key={period}
              variant={selectedTimeframe === period ? "primary" : "secondary"}
              size="sm"
              onClick={() => setSelectedTimeframe(period)}
            >
              {period.charAt(0).toUpperCase() + period.slice(1).replace("-", " ")}
            </CosmicButton>
          ))}
        </div>
      </div>

      {/* User's Current Position */}
      {userRank && (
        <Card className="p-4 bg-primary/20 border-primary/30 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`text-2xl font-bold ${getRankColor(userRank.rank)}`}>#{userRank.rank}</div>
              <div>
                <div className="font-bold text-primary">You</div>
                <div className="text-sm text-muted-foreground">Level {userRank.level}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-bold text-primary">{userRank.xp.toLocaleString()} XP</div>
              <div className="text-sm text-muted-foreground">{userRank.streak} day streak</div>
            </div>
          </div>
        </Card>
      )}

      {/* Top Rankings */}
      <div className="space-y-2">
        {currentData.slice(0, 10).map((entry) => (
          <div
            key={entry.rank}
            className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
              entry.name === currentUser ? "bg-primary/20 border border-primary/30" : "bg-muted/20 hover:bg-muted/30"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`text-xl font-bold ${getRankColor(entry.rank)} min-w-[2rem]`}>
                {entry.badge || `#${entry.rank}`}
              </div>
              <div>
                <div className={`font-medium ${entry.name === currentUser ? "text-primary" : ""}`}>
                  {entry.name === currentUser ? "You" : entry.name}
                </div>
                <div className="text-sm text-muted-foreground">Level {entry.level}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-bold">{entry.xp.toLocaleString()} XP</div>
              <div className="text-sm text-muted-foreground flex items-center gap-1">🔥 {entry.streak}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Leaderboard Stats */}
      <div className="mt-6 pt-4 border-t border-white/20">
        <div className="grid grid-cols-3 gap-4 text-center text-sm">
          <div>
            <div className="font-bold text-primary">
              {currentData.reduce((sum, entry) => sum + entry.xp, 0).toLocaleString()}
            </div>
            <div className="text-muted-foreground">Total XP</div>
          </div>
          <div>
            <div className="font-bold text-secondary">
              {Math.round(currentData.reduce((sum, entry) => sum + entry.level, 0) / currentData.length)}
            </div>
            <div className="text-muted-foreground">Avg Level</div>
          </div>
          <div>
            <div className="font-bold text-accent">{Math.max(...currentData.map((entry) => entry.streak))}</div>
            <div className="text-muted-foreground">Best Streak</div>
          </div>
        </div>
      </div>
    </Card>
  )
}
