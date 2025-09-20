"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { CosmicButton } from "@/components/cosmic-button"
import { AncientEgyptWorld } from "@/components/world-environments/ancient-egypt-world"
import { MarsWorld } from "@/components/world-environments/mars-world"

interface ThreeDWorldViewerProps {
  worldId: string
  currentZone: string
  onZoneChange: (zone: string) => void
  onNPCInteract: (npc: any) => void
  onModuleStart: (module: any) => void
}

export function ThreeDWorldViewer({
  worldId,
  currentZone,
  onZoneChange,
  onNPCInteract,
  onModuleStart,
}: ThreeDWorldViewerProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [cinematicMode, setCinematicMode] = useState(false)
  const [preloadComplete, setPreloadComplete] = useState(false)
  const [loadingError, setLoadingError] = useState<string | null>(null)

  useEffect(() => {
    const preloadAssets = async () => {
      try {
        setIsLoading(true)
        setLoadingError(null)

        // Simulate asset preloading with realistic timing
        await new Promise((resolve) => setTimeout(resolve, 1500))

        // Preload world-specific assets
        if (worldId === "ancient-egypt") {
          // Preload Egypt textures and models
          console.log("[v0] Preloading Ancient Egypt assets...")
        } else if (worldId === "mars-exploration") {
          // Preload Mars textures and models
          console.log("[v0] Preloading Mars exploration assets...")
        }

        setPreloadComplete(true)
        setIsLoading(false)
      } catch (error) {
        setLoadingError("Failed to load world assets")
        setIsLoading(false)
      }
    }

    preloadAssets()
  }, [currentZone, worldId])

  const startCinematicFlythrough = () => {
    setCinematicMode(true)

    // Trigger cinematic sequence in child components
    const event = new CustomEvent("startCinematic", {
      detail: { worldId, currentZone },
    })
    window.dispatchEvent(event)
  }

  const renderWorldEnvironment = () => {
    if (loadingError) {
      return (
        <div className="h-96 bg-gradient-to-br from-red-900/20 to-red-800/20 rounded-lg flex items-center justify-center border border-red-500/20">
          <div className="text-center text-red-400">
            <div className="text-4xl mb-4">⚠️</div>
            <h3 className="text-xl font-bold mb-2">Loading Error</h3>
            <p className="text-red-300 mb-4">{loadingError}</p>
            <CosmicButton variant="accent" onClick={() => window.location.reload()}>
              Retry Loading
            </CosmicButton>
          </div>
        </div>
      )
    }

    if (worldId === "ancient-egypt") {
      return (
        <AncientEgyptWorld
          onNPCInteract={onNPCInteract}
          onModuleStart={onModuleStart}
          currentZone={currentZone}
          cinematicMode={cinematicMode}
          preloadComplete={preloadComplete}
        />
      )
    } else if (worldId === "mars-exploration") {
      return (
        <MarsWorld
          onNPCInteract={onNPCInteract}
          onModuleStart={onModuleStart}
          currentZone={currentZone}
          cinematicMode={cinematicMode}
          preloadComplete={preloadComplete}
        />
      )
    } else {
      // Enhanced science lab world
      return (
        <div className="h-96 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 rounded-lg flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-blue-400 rounded-full animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${2 + Math.random() * 2}s`,
                }}
              />
            ))}
          </div>
          <div className="text-center text-white relative z-10">
            <div className="text-6xl mb-4 animate-bounce">⚗️</div>
            <h3 className="text-2xl font-bold mb-2">Quantum Physics Laboratory</h3>
            <p className="text-purple-200 mb-4">Advanced experiments in quantum mechanics await!</p>
            <CosmicButton
              variant="primary"
              onClick={() =>
                onModuleStart({
                  id: "quantum-lab",
                  title: "Quantum Experiments",
                  type: "Physics Challenge",
                  xpReward: 300,
                })
              }
            >
              Enter Laboratory
            </CosmicButton>
          </div>
        </div>
      )
    }
  }

  return (
    <Card className="relative bg-card/20 backdrop-blur-md border-white/20 overflow-hidden">
      {isLoading ? (
        <div className="h-96 flex items-center justify-center">
          <div className="text-center">
            <div className="relative mb-6">
              <div className="animate-spin text-6xl mb-4">🌍</div>
              <div className="absolute inset-0 animate-ping">
                <div className="w-16 h-16 mx-auto border-2 border-primary rounded-full opacity-20"></div>
              </div>
            </div>
            <div className="text-primary font-medium text-lg mb-2">Loading 3D World...</div>
            <div className="text-sm text-muted-foreground mb-4">
              Rendering {worldId.replace("-", " ")} environment...
            </div>
            <div className="mt-4 space-y-2 text-xs text-muted-foreground max-w-xs">
              <div className="flex items-center justify-between">
                <span>✓ Loading textures and models</span>
                <div className="w-16 h-1 bg-muted rounded-full overflow-hidden">
                  <div className="w-full h-full bg-primary animate-pulse"></div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span>✓ Initializing physics engine</span>
                <div className="w-16 h-1 bg-muted rounded-full overflow-hidden">
                  <div className="w-3/4 h-full bg-primary animate-pulse"></div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span>✓ Spawning NPCs and objects</span>
                <div className="w-16 h-1 bg-muted rounded-full overflow-hidden">
                  <div className="w-1/2 h-full bg-primary animate-pulse"></div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span>⏳ Finalizing world state</span>
                <div className="w-16 h-1 bg-muted rounded-full overflow-hidden">
                  <div className="w-1/4 h-full bg-accent animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {renderWorldEnvironment()}

          {cinematicMode && (
            <div className="absolute inset-0 bg-black/90 flex items-center justify-center transition-all duration-1000">
              <div className="text-center text-white">
                <div className="text-8xl mb-6 animate-pulse">🎬</div>
                <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Cinematic Mode
                </h3>
                <p className="text-gray-300 mb-6 text-lg">Immersive flythrough experience</p>
                <div className="flex gap-4 justify-center">
                  <CosmicButton variant="primary" onClick={() => setCinematicMode(false)}>
                    Exit Cinematic
                  </CosmicButton>
                  <CosmicButton
                    variant="accent"
                    onClick={() => {
                      // Trigger screenshot
                      console.log("[v0] Taking cinematic screenshot...")
                    }}
                  >
                    📸 Capture
                  </CosmicButton>
                </div>
              </div>
            </div>
          )}

          <div className="absolute bottom-4 right-4">
            <div className="flex gap-2">
              <CosmicButton
                variant="accent"
                size="sm"
                onClick={startCinematicFlythrough}
                className="backdrop-blur-md bg-black/20 border-white/20 hover:bg-accent/20"
              >
                🎬 Cinematic
              </CosmicButton>
              <CosmicButton
                variant="secondary"
                size="sm"
                className="backdrop-blur-md bg-black/20 border-white/20 hover:bg-secondary/20"
                onClick={() => {
                  // Trigger confetti effect
                  const event = new CustomEvent("triggerConfetti")
                  window.dispatchEvent(event)
                }}
              >
                📸 Screenshot
              </CosmicButton>
            </div>
          </div>
        </>
      )}
    </Card>
  )
}
