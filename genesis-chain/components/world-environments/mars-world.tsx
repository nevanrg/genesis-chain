"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { CosmicButton } from "@/components/cosmic-button"

interface MarsWorldProps {
  onNPCInteract: (npc: any) => void
  onModuleStart: (module: any) => void
  currentZone: string
}

export function MarsWorld({ onNPCInteract, onModuleStart, currentZone }: MarsWorldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [hoveredObject, setHoveredObject] = useState<string | null>(null)
  const [weatherEffect, setWeatherEffect] = useState("clear")

  const worldObjects = {
    surface: [
      { id: "mission-commander", type: "npc", x: 40, y: 50, name: "Mission Commander", icon: "👨‍🚀" },
      { id: "gravity-experiment", type: "module", x: 70, y: 30, name: "Gravity Experiment", icon: "⚖️" },
      { id: "rover", type: "transport", x: 20, y: 70, name: "Mars Rover", icon: "🚗" },
      { id: "rock-sample", type: "collectible", x: 80, y: 60, name: "Rock Sample", icon: "🪨" },
    ],
    laboratory: [
      { id: "scientist", type: "npc", x: 50, y: 40, name: "Mars Scientist", icon: "🧑‍🔬" },
      { id: "atmosphere-study", type: "module", x: 30, y: 60, name: "Atmosphere Analysis", icon: "🌬️" },
      { id: "microscope", type: "equipment", x: 70, y: 50, name: "Electron Microscope", icon: "🔬" },
      { id: "data-terminal", type: "info", x: 60, y: 20, name: "Research Data", icon: "💻" },
    ],
    habitat: [
      { id: "engineer", type: "npc", x: 45, y: 55, name: "Habitat Engineer", icon: "👷‍♀️" },
      { id: "life-support", type: "module", x: 25, y: 40, name: "Life Support Systems", icon: "🫁" },
      { id: "greenhouse", type: "landmark", x: 75, y: 35, name: "Mars Greenhouse", icon: "🌱" },
      { id: "communication", type: "equipment", x: 50, y: 75, name: "Earth Comm", icon: "📡" },
    ],
  }

  const currentObjects = worldObjects[currentZone as keyof typeof worldObjects] || []

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Weather effects timer
    const weatherTimer = setInterval(() => {
      const effects = ["clear", "dust-storm", "aurora"]
      setWeatherEffect(effects[Math.floor(Math.random() * effects.length)])
    }, 10000)

    let animationFrame: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw Mars environment
      if (currentZone === "surface") {
        drawMarsSurface(ctx, canvas)
      } else if (currentZone === "laboratory") {
        drawMarsLaboratory(ctx, canvas)
      } else if (currentZone === "habitat") {
        drawMarsHabitat(ctx, canvas)
      }

      // Draw weather effects
      drawWeatherEffects(ctx, canvas)

      // Draw interactive objects
      currentObjects.forEach((obj) => {
        drawInteractiveObject(ctx, canvas, obj, hoveredObject === obj.id)
      })

      animationFrame = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      clearInterval(weatherTimer)
      cancelAnimationFrame(animationFrame)
    }
  }, [currentZone, hoveredObject, weatherEffect])

  const drawMarsSurface = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    // Mars sky
    const skyGradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
    skyGradient.addColorStop(0, "#8b4513")
    skyGradient.addColorStop(0.7, "#cd853f")
    skyGradient.addColorStop(1, "#daa520")
    ctx.fillStyle = skyGradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Mars surface
    ctx.fillStyle = "#cd853f"
    ctx.fillRect(0, canvas.height * 0.7, canvas.width, canvas.height * 0.3)

    // Craters
    ctx.fillStyle = "#8b4513"
    for (let i = 0; i < 4; i++) {
      const x = canvas.width * (0.2 + i * 0.2)
      const y = canvas.height * 0.8
      ctx.beginPath()
      ctx.ellipse(x, y, 30 + i * 10, 8, 0, 0, Math.PI * 2)
      ctx.fill()
    }

    // Distant mountains
    ctx.fillStyle = "#a0522d"
    for (let i = 0; i < 5; i++) {
      ctx.beginPath()
      ctx.moveTo(i * 100, canvas.height * 0.7)
      ctx.lineTo(i * 100 + 50, canvas.height * 0.5)
      ctx.lineTo(i * 100 + 100, canvas.height * 0.7)
      ctx.closePath()
      ctx.fill()
    }

    // Two moons (Phobos and Deimos)
    ctx.fillStyle = "#f5f5dc"
    ctx.beginPath()
    ctx.arc(canvas.width * 0.8, canvas.height * 0.2, 15, 0, Math.PI * 2)
    ctx.fill()
    ctx.beginPath()
    ctx.arc(canvas.width * 0.9, canvas.height * 0.15, 8, 0, Math.PI * 2)
    ctx.fill()
  }

  const drawMarsLaboratory = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    // Laboratory interior
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
    gradient.addColorStop(0, "#1e293b")
    gradient.addColorStop(0.5, "#334155")
    gradient.addColorStop(1, "#1e293b")
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Laboratory equipment
    ctx.fillStyle = "#64748b"
    // Work benches
    ctx.fillRect(0, canvas.height * 0.7, canvas.width, canvas.height * 0.3)
    ctx.fillRect(canvas.width * 0.1, canvas.height * 0.3, canvas.width * 0.8, 20)

    // Computer screens
    ctx.fillStyle = "#22d3ee"
    for (let i = 0; i < 3; i++) {
      const x = canvas.width * (0.2 + i * 0.3)
      ctx.fillRect(x, canvas.height * 0.4, 60, 40)
      // Screen glow
      ctx.fillStyle = "rgba(34, 211, 238, 0.3)"
      ctx.fillRect(x - 10, canvas.height * 0.4 - 10, 80, 60)
      ctx.fillStyle = "#22d3ee"
    }

    // Ceiling lights
    ctx.fillStyle = "#fbbf24"
    for (let i = 0; i < 4; i++) {
      ctx.beginPath()
      ctx.arc(canvas.width * (0.2 + i * 0.2), 20, 10, 0, Math.PI * 2)
      ctx.fill()
      // Light beams
      ctx.fillStyle = "rgba(251, 191, 36, 0.2)"
      ctx.beginPath()
      ctx.moveTo(canvas.width * (0.2 + i * 0.2) - 30, 30)
      ctx.lineTo(canvas.width * (0.2 + i * 0.2) + 30, 30)
      ctx.lineTo(canvas.width * (0.2 + i * 0.2) + 60, canvas.height)
      ctx.lineTo(canvas.width * (0.2 + i * 0.2) - 60, canvas.height)
      ctx.closePath()
      ctx.fill()
      ctx.fillStyle = "#fbbf24"
    }
  }

  const drawMarsHabitat = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    // Habitat dome interior
    const gradient = ctx.createRadialGradient(
      canvas.width / 2,
      canvas.height / 2,
      0,
      canvas.width / 2,
      canvas.height / 2,
      canvas.width / 2,
    )
    gradient.addColorStop(0, "#374151")
    gradient.addColorStop(1, "#1f2937")
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Dome structure
    ctx.strokeStyle = "#6b7280"
    ctx.lineWidth = 3
    for (let i = 0; i < 8; i++) {
      ctx.beginPath()
      ctx.arc(canvas.width / 2, canvas.height / 2, 50 + i * 30, 0, Math.PI * 2)
      ctx.stroke()
    }

    // Living quarters
    ctx.fillStyle = "#4b5563"
    ctx.fillRect(canvas.width * 0.1, canvas.height * 0.6, canvas.width * 0.3, canvas.height * 0.3)
    ctx.fillRect(canvas.width * 0.6, canvas.height * 0.6, canvas.width * 0.3, canvas.height * 0.3)

    // Central garden area
    ctx.fillStyle = "#16a34a"
    ctx.beginPath()
    ctx.arc(canvas.width / 2, canvas.height * 0.7, 40, 0, Math.PI * 2)
    ctx.fill()

    // Artificial lighting
    ctx.fillStyle = "#a855f7"
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI * 2) / 6
      const x = canvas.width / 2 + Math.cos(angle) * 100
      const y = canvas.height / 2 + Math.sin(angle) * 100
      ctx.beginPath()
      ctx.arc(x, y, 8, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  const drawWeatherEffects = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    if (weatherEffect === "dust-storm") {
      ctx.fillStyle = "rgba(205, 133, 63, 0.3)"
      for (let i = 0; i < 50; i++) {
        const x = (Math.sin(Date.now() * 0.001 + i) * canvas.width) / 2 + canvas.width / 2
        const y = (Math.cos(Date.now() * 0.002 + i) * canvas.height) / 2 + canvas.height / 2
        ctx.beginPath()
        ctx.arc(x, y, 2, 0, Math.PI * 2)
        ctx.fill()
      }
    } else if (weatherEffect === "aurora") {
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0)
      gradient.addColorStop(0, "rgba(34, 197, 94, 0.3)")
      gradient.addColorStop(0.5, "rgba(168, 85, 247, 0.3)")
      gradient.addColorStop(1, "rgba(236, 72, 153, 0.3)")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height * 0.4)
    }
  }

  const drawInteractiveObject = (
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    obj: any,
    isHovered: boolean,
  ) => {
    const x = (obj.x / 100) * canvas.width
    const y = (obj.y / 100) * canvas.height

    // Glow effect for hovered objects
    if (isHovered) {
      ctx.shadowColor = getObjectColor(obj.type)
      ctx.shadowBlur = 20
    }

    ctx.fillStyle = getObjectColor(obj.type)
    if (obj.type === "npc") {
      ctx.beginPath()
      ctx.arc(x, y, isHovered ? 20 : 15, 0, Math.PI * 2)
      ctx.fill()
    } else if (obj.type === "module") {
      const size = isHovered ? 25 : 20
      ctx.fillRect(x - size / 2, y - size / 2, size, size)
    } else {
      ctx.beginPath()
      ctx.arc(x, y, isHovered ? 12 : 8, 0, Math.PI * 2)
      ctx.fill()
    }

    ctx.shadowBlur = 0

    if (isHovered) {
      ctx.fillStyle = "rgba(0, 0, 0, 0.8)"
      ctx.fillRect(x - 50, y - 40, 100, 25)
      ctx.fillStyle = "#ffffff"
      ctx.font = "12px sans-serif"
      ctx.textAlign = "center"
      ctx.fillText(obj.name, x, y - 22)
    }
  }

  const getObjectColor = (type: string) => {
    switch (type) {
      case "npc":
        return "#ec4899"
      case "module":
        return "#a16207"
      case "equipment":
        return "#22d3ee"
      case "transport":
        return "#10b981"
      case "collectible":
        return "#f59e0b"
      case "landmark":
        return "#6366f1"
      case "info":
        return "#8b5cf6"
      default:
        return "#6b7280"
    }
  }

  const handleCanvasMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / canvas.width) * 100
    const y = ((event.clientY - rect.top) / canvas.height) * 100

    let hoveredObj = null
    currentObjects.forEach((obj) => {
      const distance = Math.sqrt(Math.pow(x - obj.x, 2) + Math.pow(y - obj.y, 2))
      if (distance < 8) {
        hoveredObj = obj.id
      }
    })
    setHoveredObject(hoveredObj)
  }

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / canvas.width) * 100
    const y = ((event.clientY - rect.top) / canvas.height) * 100

    currentObjects.forEach((obj) => {
      const distance = Math.sqrt(Math.pow(x - obj.x, 2) + Math.pow(y - obj.y, 2))
      if (distance < 8) {
        if (obj.type === "npc") {
          onNPCInteract({
            id: obj.id,
            name: obj.name,
            dialogue: getMarsNPCDialogue(obj.id),
            avatar: obj.icon,
          })
        } else if (obj.type === "module") {
          onModuleStart({
            id: obj.id,
            title: obj.name,
            type: "Mars Science Challenge",
            xpReward: 200,
          })
        }
      }
    })
  }

  const getMarsNPCDialogue = (npcId: string) => {
    const dialogues: { [key: string]: string } = {
      "mission-commander":
        "Welcome to Mars, explorer! I'm the mission commander. Ready to conduct some groundbreaking experiments?",
      scientist: "Fascinating! The Martian atmosphere holds so many secrets. Let's analyze some samples together!",
      engineer:
        "Our habitat systems are crucial for survival here. Want to learn how we maintain life support on Mars?",
    }
    return dialogues[npcId] || "Greetings from Mars! Ready for some interplanetary science?"
  }

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        className="w-full h-96 cursor-crosshair rounded-lg"
        onMouseMove={handleCanvasMouseMove}
        onClick={handleCanvasClick}
      />

      {/* Zone Info Overlay */}
      <div className="absolute top-4 left-4">
        <Card className="p-3 bg-black/50 backdrop-blur-sm border-white/20">
          <div className="text-sm font-medium text-white">
            {currentZone === "surface" && "🚀 Mars Surface"}
            {currentZone === "laboratory" && "🧪 Research Lab"}
            {currentZone === "habitat" && "🏠 Mars Habitat"}
          </div>
          <div className="text-xs text-white/70 mt-1">Weather: {weatherEffect.replace("-", " ")}</div>
        </Card>
      </div>

      {/* Environmental Controls */}
      <div className="absolute top-4 right-4">
        <CosmicButton variant="accent" size="sm">
          🌡️ Environmental Data
        </CosmicButton>
      </div>
    </div>
  )
}
