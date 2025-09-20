"use client"

import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface WorldAnalyticsProps {
  worldData: {
    name: string
    students: number
    completionRate: number
    avgRating: number
    royaltiesEarned: string
    remixes: number
  }[]
}

export function WorldAnalytics({ worldData }: WorldAnalyticsProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-primary">World Performance</h3>
      {worldData.map((world, index) => (
        <Card key={index} className="p-4 bg-card/20 backdrop-blur-md border-white/20">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold">{world.name}</h4>
            <div className="text-sm text-accent">{world.royaltiesEarned}</div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <div className="text-muted-foreground">Students</div>
              <div className="font-medium">{world.students}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Completion</div>
              <div className="font-medium">{world.completionRate}%</div>
            </div>
            <div>
              <div className="text-muted-foreground">Rating</div>
              <div className="font-medium">⭐ {world.avgRating}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Remixes</div>
              <div className="font-medium">{world.remixes}</div>
            </div>
          </div>
          <Progress value={world.completionRate} className="mt-2 h-2" />
        </Card>
      ))}
    </div>
  )
}
