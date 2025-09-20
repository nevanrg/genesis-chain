"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { CosmicButton } from "@/components/cosmic-button"

interface AncientEgyptWorldProps {
  onNPCInteract: (npc: any) => void
  onModuleStart: (module: any) => void
  currentZone: string
  cinematicMode?: boolean
  preloadComplete?: boolean
}

export function AncientEgyptWorld({
  onNPCInteract,
  onModuleStart,
  currentZone,
  cinematicMode = false,
  preloadComplete = false,
}: AncientEgyptWorldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [hoveredObject, setHoveredObject] = useState<string | null>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [cameraPosition, setCameraPosition] = useState({ x: 0, y: 0, zoom: 1 })
  const [cinematicSequence, setCinematicSequence] = useState(0)
  const animationFrameRef = useRef<number>()

  const worldObjects = {
    pyramid: [
      { id: "cleopatra", type: "npc", x: 30, y: 60, name: "Queen Cleopatra", icon: "👑" },
      { id: "pyramid-math", type: "module", x: 70, y: 40, name: "Pyramid Geometry", icon: "📐" },
      { id: "sphinx", type: "landmark", x: 50, y: 80, name: "Great Sphinx", icon: "🗿" },
      { id: "hieroglyphs", type: "info", x: 20, y: 30, name: "Ancient Writings", icon: "📜" },
    ],
    nile: [
      { id: "river-scientist", type: "npc", x: 40, y: 50, name: "River Scientist", icon: "🧪" },
      { id: "ecosystem", type: "module", x: 60, y: 30, name: "Nile Ecosystem", icon: "🌿" },
      { id: "boat", type: "transport", x: 80, y: 70, name: "Nile Boat", icon: "⛵" },
      { id: "crocodile", type: "wildlife", x: 25, y: 75, name: "Nile Crocodile", icon: "🐊" },
    ],
    scrolls: [
      { id: "scribe", type: "npc", x: 50, y: 40, name: "Master Scribe", icon: "✍️" },
      { id: "math-scrolls", type: "module", x: 30, y: 60, name: "Mathematical Scrolls", icon: "📊" },
      { id: "library", type: "landmark", x: 70, y: 50, name: "Ancient Library", icon: "📚" },
    ],
  }

  const currentObjects = worldObjects[currentZone as keyof typeof worldObjects] || []

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1

      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr

      ctx.scale(dpr, dpr)
      canvas.style.width = rect.width + "px"
      canvas.style.height = rect.height + "px"
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const handleCinematicStart = () => {
      setCinematicSequence(0)
      startCinematicFlythrough()
    }

    window.addEventListener("startCinematic", handleCinematicStart)

    const animate = (timestamp: number) => {
      if (!preloadComplete) {
        animationFrameRef.current = requestAnimationFrame(animate)
        return
      }

      ctx.clearRect(0, 0, canvas.width / (window.devicePixelRatio || 1), canvas.height / (window.devicePixelRatio || 1))

      ctx.save()
      if (cinematicMode) {
        const centerX = canvas.width / (window.devicePixelRatio || 1) / 2
        const centerY = canvas.height / (window.devicePixelRatio || 1) / 2
        ctx.translate(centerX + cameraPosition.x, centerY + cameraPosition.y)
        ctx.scale(cameraPosition.zoom, cameraPosition.zoom)
        ctx.translate(-centerX, -centerY)
      }

      // Draw environment based on current zone
      if (currentZone === "pyramid") {
        drawPyramidEnvironment(ctx, canvas, timestamp)
      } else if (currentZone === "nile") {
        drawNileEnvironment(ctx, canvas, timestamp)
      } else if (currentZone === "scrolls") {
        drawScrollsEnvironment(ctx, canvas, timestamp)
      }

      currentObjects.forEach((obj) => {
        drawInteractiveObject(ctx, canvas, obj, hoveredObject === obj.id, timestamp)
      })

      ctx.restore()

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("startCinematic", handleCinematicStart)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [currentZone, hoveredObject, cinematicMode, cameraPosition, preloadComplete])

  const startCinematicFlythrough = () => {
    const sequences = [
      { x: -50, y: -30, zoom: 1.5, duration: 2000 },
      { x: 30, y: -20, zoom: 1.2, duration: 2000 },
      { x: 0, y: 40, zoom: 0.8, duration: 2000 },
      { x: 0, y: 0, zoom: 1, duration: 1000 },
    ]

    let currentSeq = 0
    const animateCamera = () => {
      if (currentSeq >= sequences.length) return

      const seq = sequences[currentSeq]
      const startPos = { ...cameraPosition }
      const startTime = Date.now()

      const updateCamera = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / seq.duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3) // Ease out cubic

        setCameraPosition({
          x: startPos.x + (seq.x - startPos.x) * eased,
          y: startPos.y + (seq.y - startPos.y) * eased,
          zoom: startPos.zoom + (seq.zoom - startPos.zoom) * eased,
        })

        if (progress < 1) {
          requestAnimationFrame(updateCamera)
        } else {
          currentSeq++
          if (currentSeq < sequences.length) {
            setTimeout(animateCamera, 500)
          }
        }
      }
      updateCamera()
    }
    animateCamera()
  }

  const drawPyramidEnvironment = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, timestamp: number) => {
    const canvasWidth = canvas.width / (window.devicePixelRatio || 1)
    const canvasHeight = canvas.height / (window.devicePixelRatio || 1)

    const gradient = ctx.createLinearGradient(0, 0, canvasWidth, canvasHeight)
    gradient.addColorStop(0, "#f59e0b")
    gradient.addColorStop(0.7, "#d97706")
    gradient.addColorStop(1, "#92400e")
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)

    const sunGlow = ctx.createRadialGradient(
      canvasWidth * 0.8,
      canvasHeight * 0.2,
      0,
      canvasWidth * 0.8,
      canvasHeight * 0.2,
      60,
    )
    sunGlow.addColorStop(0, "#fbbf24")
    sunGlow.addColorStop(0.5, "rgba(251, 191, 36, 0.5)")
    sunGlow.addColorStop(1, "rgba(251, 191, 36, 0)")
    ctx.fillStyle = sunGlow
    ctx.fillRect(canvasWidth * 0.7, canvasHeight * 0.1, 120, 120)

    ctx.fillStyle = "#fbbf24"
    ctx.beginPath()
    ctx.arc(canvasWidth * 0.8, canvasHeight * 0.2, 40, 0, Math.PI * 2)
    ctx.fill()

    ctx.shadowColor = "rgba(0, 0, 0, 0.3)"
    ctx.shadowBlur = 10
    ctx.shadowOffsetX = 5
    ctx.shadowOffsetY = 5

    // Main pyramid face
    ctx.fillStyle = "#78716c"
    ctx.beginPath()
    ctx.moveTo(canvasWidth * 0.5, canvasHeight * 0.2)
    ctx.lineTo(canvasWidth * 0.2, canvasHeight * 0.7)
    ctx.lineTo(canvasWidth * 0.8, canvasHeight * 0.7)
    ctx.closePath()
    ctx.fill()

    // Pyramid shadow side
    ctx.fillStyle = "#57534e"
    ctx.beginPath()
    ctx.moveTo(canvasWidth * 0.5, canvasHeight * 0.2)
    ctx.lineTo(canvasWidth * 0.8, canvasHeight * 0.7)
    ctx.lineTo(canvasWidth * 0.65, canvasHeight * 0.7)
    ctx.closePath()
    ctx.fill()

    ctx.shadowColor = "transparent"
    ctx.shadowBlur = 0

    for (let i = 0; i < 15; i++) {
      const x = Math.sin(timestamp * 0.001 + i) * canvasWidth * 0.3 + canvasWidth * 0.5
      const y = Math.cos(timestamp * 0.0015 + i) * canvasHeight * 0.2 + canvasHeight * 0.8
      ctx.fillStyle = `rgba(251, 191, 36, ${0.3 + Math.sin(timestamp * 0.002 + i) * 0.2})`
      ctx.beginPath()
      ctx.arc(x, y, 1 + Math.sin(timestamp * 0.003 + i), 0, Math.PI * 2)
      ctx.fill()
    }

    const duneGradient = ctx.createLinearGradient(0, canvasHeight * 0.85, 0, canvasHeight)
    duneGradient.addColorStop(0, "#fbbf24")
    duneGradient.addColorStop(1, "#d97706")
    ctx.fillStyle = duneGradient

    for (let i = 0; i < 3; i++) {
      ctx.beginPath()
      ctx.ellipse(canvasWidth * (0.2 + i * 0.3), canvasHeight * 0.9, 80, 20, 0, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  const drawNileEnvironment = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, timestamp: number) => {
    const canvasWidth = canvas.width / (window.devicePixelRatio || 1)
    const canvasHeight = canvas.height / (window.devicePixelRatio || 1)

    // Sky background
    const skyGradient = ctx.createLinearGradient(0, 0, 0, canvasHeight)
    skyGradient.addColorStop(0, "#3b82f6")
    skyGradient.addColorStop(0.6, "#60a5fa")
    skyGradient.addColorStop(1, "#93c5fd")
    ctx.fillStyle = skyGradient
    ctx.fillRect(0, 0, canvasWidth, canvasHeight * 0.6)

    // River
    const riverGradient = ctx.createLinearGradient(0, canvasHeight * 0.6, 0, canvasHeight)
    riverGradient.addColorStop(0, "#1e40af")
    riverGradient.addColorStop(1, "#1e3a8a")
    ctx.fillStyle = riverGradient
    ctx.fillRect(0, canvasHeight * 0.6, canvasWidth, canvasHeight * 0.4)

    // River waves
    ctx.strokeStyle = "#3b82f6"
    ctx.lineWidth = 2
    for (let i = 0; i < 5; i++) {
      ctx.beginPath()
      ctx.moveTo(0, canvasHeight * 0.65 + i * 15)
      for (let x = 0; x < canvasWidth; x += 20) {
        ctx.lineTo(x, canvasHeight * 0.65 + i * 15 + Math.sin((x + Date.now() * 0.001) * 0.02) * 3)
      }
      ctx.stroke()
    }

    // Palm trees
    ctx.fillStyle = "#16a34a"
    for (let i = 0; i < 3; i++) {
      const x = canvasWidth * (0.1 + i * 0.4)
      const y = canvasHeight * 0.6
      // Tree trunk
      ctx.fillRect(x - 5, y - 60, 10, 60)
      // Palm fronds
      for (let j = 0; j < 6; j++) {
        ctx.beginPath()
        ctx.ellipse(x, y - 60, 30, 8, (j * Math.PI) / 3, 0, Math.PI * 2)
        ctx.fill()
      }
    }
  }

  const drawScrollsEnvironment = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, timestamp: number) => {
    const canvasWidth = canvas.width / (window.devicePixelRatio || 1)
    const canvasHeight = canvas.height / (window.devicePixelRatio || 1)

    // Library interior
    const gradient = ctx.createLinearGradient(0, 0, canvasWidth, canvasHeight)
    gradient.addColorStop(0, "#451a03")
    gradient.addColorStop(0.5, "#7c2d12")
    gradient.addColorStop(1, "#451a03")
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)

    // Columns
    ctx.fillStyle = "#d6d3d1"
    for (let i = 0; i < 4; i++) {
      const x = canvasWidth * (0.2 + i * 0.2)
      ctx.fillRect(x - 15, 0, 30, canvasHeight)
      // Column capitals
      ctx.fillRect(x - 25, 0, 50, 30)
    }

    // Scroll shelves
    ctx.fillStyle = "#92400e"
    for (let i = 0; i < 3; i++) {
      const y = canvasHeight * (0.3 + i * 0.2)
      ctx.fillRect(0, y, canvasWidth, 20)
      // Scrolls on shelves
      ctx.fillStyle = "#fbbf24"
      for (let j = 0; j < 8; j++) {
        ctx.fillRect(j * 40 + 10, y - 15, 8, 35)
      }
      ctx.fillStyle = "#92400e"
    }

    // Torch light effects
    ctx.fillStyle = "rgba(251, 191, 36, 0.3)"
    ctx.beginPath()
    ctx.arc(canvasWidth * 0.1, canvasHeight * 0.2, 60, 0, Math.PI * 2)
    ctx.fill()
    ctx.beginPath()
    ctx.arc(canvasWidth * 0.9, canvasHeight * 0.2, 60, 0, Math.PI * 2)
    ctx.fill()
  }

  const drawInteractiveObject = (
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    obj: any,
    isHovered: boolean,
    timestamp: number,
  ) => {
    const canvasWidth = canvas.width / (window.devicePixelRatio || 1)
    const canvasHeight = canvas.height / (window.devicePixelRatio || 1)
    const x = (obj.x / 100) * canvasWidth
    const y = (obj.y / 100) * canvasHeight

    if (isHovered) {
      const glowRadius = 25 + Math.sin(timestamp * 0.005) * 5
      const glow = ctx.createRadialGradient(x, y, 0, x, y, glowRadius)
      glow.addColorStop(0, `${getObjectColor(obj.type)}80`)
      glow.addColorStop(1, `${getObjectColor(obj.type)}00`)
      ctx.fillStyle = glow
      ctx.beginPath()
      ctx.arc(x, y, glowRadius, 0, Math.PI * 2)
      ctx.fill()
    }

    ctx.shadowColor = "rgba(0, 0, 0, 0.3)"
    ctx.shadowBlur = 5
    ctx.shadowOffsetX = 2
    ctx.shadowOffsetY = 2

    // Draw object based on type with enhanced visuals
    ctx.fillStyle = getObjectColor(obj.type)
    if (obj.type === "npc") {
      const radius = isHovered ? 20 : 15
      ctx.beginPath()
      ctx.arc(x, y, radius, 0, Math.PI * 2)
      ctx.fill()

      ctx.strokeStyle = getObjectColor(obj.type)
      ctx.lineWidth = 3
      ctx.beginPath()
      const ringRadius = 25 + Math.sin(timestamp * 0.005) * 5
      ctx.arc(x, y, ringRadius, 0, Math.PI * 2)
      ctx.stroke()
    } else if (obj.type === "module") {
      const size = isHovered ? 25 : 20
      ctx.fillRect(x - size / 2, y - size / 2, size, size)

      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(timestamp * 0.002)
      ctx.strokeStyle = getObjectColor(obj.type)
      ctx.lineWidth = 2
      ctx.strokeRect(-size / 2 - 5, -size / 2 - 5, size + 10, size + 10)
      ctx.restore()
    } else {
      ctx.beginPath()
      ctx.arc(x, y, isHovered ? 12 : 8, 0, Math.PI * 2)
      ctx.fill()
    }

    ctx.shadowColor = "transparent"
    ctx.shadowBlur = 0

    if (isHovered) {
      const labelWidth = ctx.measureText(obj.name).width + 20
      const labelHeight = 25

      // Glassmorphism background
      ctx.fillStyle = "rgba(0, 0, 0, 0.7)"
      ctx.filter = "blur(10px)"
      ctx.fillRect(x - labelWidth / 2, y - 40, labelWidth, labelHeight)
      ctx.filter = "none"

      ctx.fillStyle = "rgba(255, 255, 255, 0.1)"
      ctx.fillRect(x - labelWidth / 2, y - 40, labelWidth, labelHeight)

      ctx.strokeStyle = "rgba(255, 255, 255, 0.2)"
      ctx.lineWidth = 1
      ctx.strokeRect(x - labelWidth / 2, y - 40, labelWidth, labelHeight)

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
      case "landmark":
        return "#6366f1"
      case "transport":
        return "#10b981"
      case "wildlife":
        return "#f59e0b"
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

    setMousePos({ x: event.clientX - rect.left, y: event.clientY - rect.top })

    // Check if mouse is over any interactive object
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
            dialogue: getNPCDialogue(obj.id),
            avatar: obj.icon,
          })
        } else if (obj.type === "module") {
          onModuleStart({
            id: obj.id,
            title: obj.name,
            type: "Interactive Challenge",
            xpReward: 150,
          })
        }
      }
    })
  }

  const getNPCDialogue = (npcId: string) => {
    const dialogues: { [key: string]: string } = {
      cleopatra:
        "Welcome to my kingdom! I am Cleopatra, the last pharaoh of Egypt. Let me teach you about our great civilization.",
      "river-scientist":
        "Greetings! I study the mighty Nile River. Would you like to learn about its ecosystem and importance to Egypt?",
      scribe:
        "I am the keeper of knowledge. These scrolls contain the mathematical wisdom of our ancestors. Shall we explore them together?",
    }
    return dialogues[npcId] || "Hello, young scholar! Ready to learn?"
  }

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        className="w-full h-96 cursor-crosshair rounded-lg"
        onMouseMove={handleCanvasMouseMove}
        onClick={handleCanvasClick}
      />

      <div className="absolute top-4 left-4">
        <Card className="p-3 bg-black/30 backdrop-blur-md border-white/20 shadow-lg">
          <div className="text-sm font-medium text-white">
            {currentZone === "pyramid" && "🔺 Pyramid Complex"}
            {currentZone === "nile" && "🌊 Nile Laboratory"}
            {currentZone === "scrolls" && "📜 Mathematical Scrolls"}
          </div>
          <div className="text-xs text-white/70 mt-1">{currentObjects.length} interactive objects</div>
          {cinematicMode && <div className="text-xs text-accent mt-1 animate-pulse">🎬 Cinematic Mode Active</div>}
        </Card>
      </div>

      {/* Interactive Objects Legend */}
      <div className="absolute bottom-4 left-4 right-4">
        <Card className="p-3 bg-black/50 backdrop-blur-sm border-white/20">
          <div className="flex flex-wrap gap-3 text-xs">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-accent rounded-full"></div>
              <span className="text-white">NPCs</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-primary"></div>
              <span className="text-white">Modules</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-secondary rounded-full"></div>
              <span className="text-white">Landmarks</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-white">Transport</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Cinematic Effects */}
      <div className="absolute top-4 right-4">
        <CosmicButton variant="accent" size="sm">
          🎬 Cinematic View
        </CosmicButton>
      </div>
    </div>
  )
}
