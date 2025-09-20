"use client"

import { useState } from "react"
import { Floating3DModels } from "@/components/floating-3d-models"
import { CosmicButton } from "@/components/cosmic-button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export default function TeacherPortal() {
  const [worldDescription, setWorldDescription] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedWorld, setGeneratedWorld] = useState<any>(null)
  const [uploadedMedia, setUploadedMedia] = useState<string[]>([])
  const [publishProgress, setPublishProgress] = useState(0)

  const handleGenerateWorld = async () => {
    if (!worldDescription.trim()) return

    setIsGenerating(true)

    // Simulate AI world generation
    setTimeout(() => {
      setGeneratedWorld({
        title: "Ancient Egypt: Cleopatra's Reign",
        zones: [
          { name: "Pyramid Complex", type: "History", npcs: 3, modules: 5 },
          { name: "Nile Laboratory", type: "Science", npcs: 2, modules: 4 },
          { name: "Mathematical Scrolls", type: "Math", npcs: 1, modules: 3 },
        ],
        npcs: [
          { name: "Cleopatra", role: "Historical Guide", dialogue: "Welcome to my kingdom..." },
          { name: "Architect Hemiunu", role: "Pyramid Expert", dialogue: "Let me show you how we built..." },
          { name: "Scribe Amenhotep", role: "Math Tutor", dialogue: "Numbers are the language of gods..." },
        ],
        estimatedLearningTime: "45 minutes",
        difficulty: "Intermediate",
      })
      setIsGenerating(false)
    }, 3000)
  }

  const handlePublishWorld = () => {
    setPublishProgress(0)
    const interval = setInterval(() => {
      setPublishProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  const mockStats = {
    totalWorlds: 12,
    activeStudents: 847,
    totalRoyalties: "2.4 ETH",
    topWorld: "Ancient Rome VR",
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <Floating3DModels />

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Teacher Portal
            </h1>
            <p className="text-muted-foreground mt-2">Create immersive learning worlds with AI</p>
          </div>
          <CosmicButton variant="accent" onClick={() => (window.location.href = "/")}>
            Back to Home
          </CosmicButton>
        </div>

        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-4 bg-card/20 backdrop-blur-md border-white/20">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{mockStats.totalWorlds}</div>
              <div className="text-sm text-muted-foreground">Worlds Created</div>
            </div>
          </Card>
          <Card className="p-4 bg-card/20 backdrop-blur-md border-white/20">
            <div className="text-center">
              <div className="text-2xl font-bold text-secondary">{mockStats.activeStudents}</div>
              <div className="text-sm text-muted-foreground">Active Students</div>
            </div>
          </Card>
          <Card className="p-4 bg-card/20 backdrop-blur-md border-white/20">
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">{mockStats.totalRoyalties}</div>
              <div className="text-sm text-muted-foreground">Total Royalties</div>
            </div>
          </Card>
          <Card className="p-4 bg-card/20 backdrop-blur-md border-white/20">
            <div className="text-center">
              <div className="text-lg font-bold text-primary">{mockStats.topWorld}</div>
              <div className="text-sm text-muted-foreground">Top Performing</div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* World Builder */}
          <Card className="p-6 bg-card/20 backdrop-blur-md border-white/20">
            <h2 className="text-2xl font-bold mb-4 text-primary">AI World Builder</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Describe your world in plain language</label>
                <Textarea
                  placeholder="e.g., Ancient Egypt with Cleopatra, pyramids, and the Nile River. Students should learn about history, mathematics, and science..."
                  value={worldDescription}
                  onChange={(e) => setWorldDescription(e.target.value)}
                  className="min-h-[120px] bg-input/50 border-white/20"
                />
              </div>

              <div className="flex gap-2">
                <CosmicButton
                  variant="primary"
                  onClick={handleGenerateWorld}
                  className={isGenerating ? "animate-pulse" : ""}
                >
                  {isGenerating ? "Generating..." : "Generate World"}
                </CosmicButton>
                {generatedWorld && (
                  <CosmicButton variant="secondary" onClick={handlePublishWorld}>
                    Publish as NFT
                  </CosmicButton>
                )}
              </div>

              {publishProgress > 0 && publishProgress < 100 && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Minting NFT...</span>
                    <span>{publishProgress}%</span>
                  </div>
                  <Progress value={publishProgress} className="h-2" />
                </div>
              )}

              {publishProgress === 100 && (
                <div className="p-4 bg-accent/20 border border-accent/30 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="text-accent">✨</div>
                    <span className="text-accent font-medium">World published successfully!</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">NFT minted: 0x1234...5678 | Royalty rate: 5%</p>
                </div>
              )}
            </div>
          </Card>

          {/* Generated World Preview */}
          <Card className="p-6 bg-card/20 backdrop-blur-md border-white/20">
            <h2 className="text-2xl font-bold mb-4 text-secondary">World Preview</h2>

            {!generatedWorld && !isGenerating && (
              <div className="text-center py-12 text-muted-foreground">
                <div className="text-4xl mb-4">🌍</div>
                <p>Describe your world to see AI-generated preview</p>
              </div>
            )}

            {isGenerating && (
              <div className="text-center py-12">
                <div className="animate-spin text-4xl mb-4">⚡</div>
                <p className="text-primary">AI is creating your world...</p>
                <div className="mt-4 space-y-2">
                  <div className="animate-pulse">Analyzing description...</div>
                  <div className="animate-pulse">Generating 3D environments...</div>
                  <div className="animate-pulse">Creating NPCs and dialogues...</div>
                </div>
              </div>
            )}

            {generatedWorld && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-primary">{generatedWorld.title}</h3>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="secondary">{generatedWorld.difficulty}</Badge>
                    <Badge variant="outline">{generatedWorld.estimatedLearningTime}</Badge>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Learning Zones</h4>
                  <div className="space-y-2">
                    {generatedWorld.zones.map((zone: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                        <div>
                          <div className="font-medium">{zone.name}</div>
                          <div className="text-sm text-muted-foreground">{zone.type}</div>
                        </div>
                        <div className="text-sm">
                          {zone.npcs} NPCs • {zone.modules} Modules
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">AI-Generated NPCs</h4>
                  <div className="space-y-2">
                    {generatedWorld.npcs.map((npc: any, index: number) => (
                      <div key={index} className="p-3 bg-muted/20 rounded-lg">
                        <div className="font-medium">{npc.name}</div>
                        <div className="text-sm text-muted-foreground">{npc.role}</div>
                        <div className="text-sm italic mt-1">"{npc.dialogue}"</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Cinematic Preview */}
                <div className="relative h-48 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl mb-2 animate-float">🏛️</div>
                      <div className="text-lg font-medium">Cinematic World Preview</div>
                      <div className="text-sm text-muted-foreground">Click to experience flythrough</div>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <CosmicButton variant="accent" size="sm">
                      ▶️ Preview
                    </CosmicButton>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* Media Upload Section */}
        <Card className="p-6 bg-card/20 backdrop-blur-md border-white/20 mt-8">
          <h2 className="text-2xl font-bold mb-4 text-accent">Enrich Your World</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-6 border-2 border-dashed border-white/20 rounded-lg hover:border-primary/50 transition-colors cursor-pointer">
              <div className="text-3xl mb-2">📸</div>
              <div className="font-medium">Upload Images</div>
              <div className="text-sm text-muted-foreground">Historical photos, diagrams</div>
            </div>
            <div className="text-center p-6 border-2 border-dashed border-white/20 rounded-lg hover:border-secondary/50 transition-colors cursor-pointer">
              <div className="text-3xl mb-2">🎥</div>
              <div className="font-medium">Upload Videos</div>
              <div className="text-sm text-muted-foreground">Tutorials, documentaries</div>
            </div>
            <div className="text-center p-6 border-2 border-dashed border-white/20 rounded-lg hover:border-accent/50 transition-colors cursor-pointer">
              <div className="text-3xl mb-2">🎨</div>
              <div className="font-medium">3D Models</div>
              <div className="text-sm text-muted-foreground">Custom objects, artifacts</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
