"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CosmicButton } from "@/components/cosmic-button"

interface NFTCardProps {
  nft: {
    id: string
    name: string
    description: string
    image: string
    rarity: string
    dateEarned: string
    xpValue: number
    world: string
  }
  onClick: () => void
  onTrade: () => void
}

export function NFTCard({ nft, onClick, onTrade }: NFTCardProps) {
  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "Legendary":
        return "bg-gradient-to-br from-yellow-400 to-orange-500"
      case "Epic":
        return "bg-gradient-to-br from-purple-400 to-pink-500"
      case "Rare":
        return "bg-gradient-to-br from-blue-400 to-cyan-500"
      default:
        return "bg-gradient-to-br from-gray-400 to-gray-600"
    }
  }

  return (
    <Card className="group relative overflow-hidden bg-card/20 backdrop-blur-md border-white/20 hover:bg-card/30 transition-all duration-300 cursor-pointer hover:scale-105">
      {/* Rarity Glow Effect */}
      <div
        className={`absolute inset-0 ${getRarityColor(nft.rarity)} opacity-10 group-hover:opacity-20 transition-opacity`}
      />

      <div className="relative p-4" onClick={onClick}>
        <div className="text-center mb-4">
          <div className="text-4xl mb-2 animate-float">{nft.image}</div>
          <h3 className="font-bold text-primary truncate">{nft.name}</h3>
          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{nft.description}</p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Badge
              variant={nft.rarity === "Legendary" ? "default" : nft.rarity === "Epic" ? "secondary" : "outline"}
              className="text-xs"
            >
              {nft.rarity}
            </Badge>
            <div className="text-xs text-muted-foreground">{nft.xpValue} XP</div>
          </div>

          <div className="text-xs text-muted-foreground">
            <div>World: {nft.world}</div>
            <div>Earned: {nft.dateEarned}</div>
          </div>
        </div>
      </div>

      {/* Hover Actions */}
      <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="flex gap-2">
          <CosmicButton
            variant="accent"
            size="sm"
            className="flex-1"
            onClick={(e) => {
              e.stopPropagation()
              onClick()
            }}
          >
            View
          </CosmicButton>
          <CosmicButton
            variant="secondary"
            size="sm"
            onClick={(e) => {
              e.stopPropagation()
              onTrade()
            }}
          >
            Trade
          </CosmicButton>
        </div>
      </div>

      {/* Animated Border */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/30 rounded-lg transition-colors" />
    </Card>
  )
}
