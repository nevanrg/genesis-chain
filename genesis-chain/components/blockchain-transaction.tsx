"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface BlockchainTransactionProps {
  transaction: {
    id: string
    type: "mint" | "royalty" | "transfer"
    nft?: string
    amount?: string
    from?: string
    hash: string
    timestamp: string
    status: "pending" | "confirmed" | "failed"
    gasUsed: string
  }
}

export function BlockchainTransaction({ transaction }: BlockchainTransactionProps) {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "mint":
        return "⚡"
      case "royalty":
        return "💰"
      case "transfer":
        return "🔄"
      default:
        return "📄"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-500/20 text-green-400"
      case "pending":
        return "bg-yellow-500/20 text-yellow-400"
      case "failed":
        return "bg-red-500/20 text-red-400"
      default:
        return "bg-gray-500/20 text-gray-400"
    }
  }

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <Card className="p-4 bg-card/20 backdrop-blur-md border-white/20 hover:bg-card/30 transition-colors">
      <div className="flex items-center gap-3">
        <div className="text-2xl">{getTypeIcon(transaction.type)}</div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium capitalize">{transaction.type}</span>
            <Badge className={`text-xs ${getStatusColor(transaction.status)}`}>{transaction.status}</Badge>
          </div>

          <div className="text-sm text-muted-foreground">
            {transaction.type === "mint" && transaction.nft && <div>Minted: {transaction.nft}</div>}
            {transaction.type === "royalty" && transaction.amount && <div>Received: {transaction.amount}</div>}
            {transaction.from && <div>From: {transaction.from}</div>}
            <div className="font-mono text-xs">{transaction.hash}</div>
          </div>
        </div>

        <div className="text-right text-sm">
          <div className="text-muted-foreground">{formatTimestamp(transaction.timestamp)}</div>
          <div className="text-xs text-muted-foreground">Gas: {transaction.gasUsed}</div>
        </div>
      </div>

      {/* Transaction Animation for Pending */}
      {transaction.status === "pending" && (
        <div className="mt-2 h-1 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-primary animate-pulse rounded-full" style={{ width: "60%" }} />
        </div>
      )}
    </Card>
  )
}
