"use client"

import { useState } from "react"
import { Floating3DModels } from "@/components/floating-3d-models"
import { CosmicButton } from "@/components/cosmic-button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { NFTCard } from "@/components/nft-card"
import { BlockchainTransaction } from "@/components/blockchain-transaction"

export default function WalletPage() {
  const [walletConnected, setWalletConnected] = useState(false)
  const [mintingProgress, setMintingProgress] = useState(0)
  const [showMinting, setShowMinting] = useState(false)
  const [transactions, setTransactions] = useState<any[]>([])
  const [selectedNFT, setSelectedNFT] = useState<any>(null)

  const mockWalletData = {
    address: "0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4",
    balance: "2.847 ETH",
    nftCount: 15,
    totalEarned: "1.2 ETH",
  }

  const mockNFTs = [
    {
      id: "1",
      name: "Pyramid Master Badge",
      description: "Completed all Ancient Egypt geometry challenges",
      image: "🏆",
      rarity: "Legendary",
      dateEarned: "2024-01-15",
      xpValue: 500,
      skills: ["Mathematics", "History", "Problem Solving"],
      world: "Ancient Egypt",
    },
    {
      id: "2",
      name: "Mars Explorer Certificate",
      description: "Successfully conducted 5 scientific experiments on Mars",
      image: "🚀",
      rarity: "Epic",
      dateEarned: "2024-01-10",
      xpValue: 350,
      skills: ["Science", "Physics", "Research"],
      world: "Mars Exploration",
    },
    {
      id: "3",
      name: "Cleopatra's Wisdom",
      description: "Learned ancient Egyptian history and culture",
      image: "👑",
      rarity: "Rare",
      dateEarned: "2024-01-08",
      xpValue: 200,
      skills: ["History", "Culture", "Leadership"],
      world: "Ancient Egypt",
    },
    {
      id: "4",
      name: "Quantum Physics Pioneer",
      description: "Mastered quantum mechanics fundamentals",
      image: "⚛️",
      rarity: "Epic",
      dateEarned: "2024-01-05",
      xpValue: 400,
      skills: ["Physics", "Mathematics", "Critical Thinking"],
      world: "Science Laboratory",
    },
  ]

  const mockTransactions = [
    {
      id: "tx1",
      type: "mint",
      nft: "Pyramid Master Badge",
      hash: "0x1234...5678",
      timestamp: "2024-01-15T10:30:00Z",
      status: "confirmed",
      gasUsed: "0.002 ETH",
    },
    {
      id: "tx2",
      type: "royalty",
      amount: "0.05 ETH",
      from: "Student Wallet",
      hash: "0x5678...9012",
      timestamp: "2024-01-14T15:45:00Z",
      status: "confirmed",
      gasUsed: "0.001 ETH",
    },
    {
      id: "tx3",
      type: "mint",
      nft: "Mars Explorer Certificate",
      hash: "0x9012...3456",
      timestamp: "2024-01-10T09:15:00Z",
      status: "confirmed",
      gasUsed: "0.003 ETH",
    },
  ]

  const handleConnectWallet = () => {
    setWalletConnected(true)
    setTransactions(mockTransactions)
  }

  const handleMintNFT = () => {
    setShowMinting(true)
    setMintingProgress(0)

    const interval = setInterval(() => {
      setMintingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setShowMinting(false)
          // Add new transaction
          const newTx = {
            id: `tx${Date.now()}`,
            type: "mint",
            nft: "New Achievement Badge",
            hash: `0x${Math.random().toString(16).substr(2, 8)}...${Math.random().toString(16).substr(2, 4)}`,
            timestamp: new Date().toISOString(),
            status: "confirmed",
            gasUsed: "0.002 ETH",
          }
          setTransactions((prev) => [newTx, ...prev])
          return 100
        }
        return prev + 10
      })
    }, 300)
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <Floating3DModels />

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              My Wallet
            </h1>
            <p className="text-muted-foreground mt-2">Manage your NFT achievements and blockchain assets</p>
          </div>
          <div className="flex gap-2">
            <CosmicButton variant="accent" onClick={() => (window.location.href = "/")}>
              Home
            </CosmicButton>
            {!walletConnected && (
              <CosmicButton variant="primary" onClick={handleConnectWallet}>
                Connect Wallet
              </CosmicButton>
            )}
          </div>
        </div>

        {!walletConnected ? (
          /* Wallet Connection Screen */
          <div className="text-center py-16">
            <Card className="max-w-md mx-auto p-8 bg-card/20 backdrop-blur-md border-white/20">
              <div className="text-6xl mb-6">💎</div>
              <h2 className="text-2xl font-bold mb-4 text-primary">Connect Your Wallet</h2>
              <p className="text-muted-foreground mb-6">
                Connect your wallet to view your NFT achievements and manage blockchain assets
              </p>
              <div className="space-y-3">
                <CosmicButton variant="primary" className="w-full" onClick={handleConnectWallet}>
                  🦊 MetaMask
                </CosmicButton>
                <CosmicButton variant="secondary" className="w-full" onClick={handleConnectWallet}>
                  🔗 WalletConnect
                </CosmicButton>
                <CosmicButton variant="accent" className="w-full" onClick={handleConnectWallet}>
                  🌈 Rainbow
                </CosmicButton>
              </div>
            </Card>
          </div>
        ) : (
          <>
            {/* Wallet Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <Card className="p-4 bg-card/20 backdrop-blur-md border-white/20">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{mockWalletData.balance}</div>
                  <div className="text-sm text-muted-foreground">Wallet Balance</div>
                </div>
              </Card>
              <Card className="p-4 bg-card/20 backdrop-blur-md border-white/20">
                <div className="text-center">
                  <div className="text-2xl font-bold text-secondary">{mockWalletData.nftCount}</div>
                  <div className="text-sm text-muted-foreground">NFTs Owned</div>
                </div>
              </Card>
              <Card className="p-4 bg-card/20 backdrop-blur-md border-white/20">
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">{mockWalletData.totalEarned}</div>
                  <div className="text-sm text-muted-foreground">Total Earned</div>
                </div>
              </Card>
              <Card className="p-4 bg-card/20 backdrop-blur-md border-white/20">
                <div className="text-center">
                  <div className="text-lg font-bold text-primary truncate">{mockWalletData.address}</div>
                  <div className="text-sm text-muted-foreground">Wallet Address</div>
                </div>
              </Card>
            </div>

            {/* Minting Progress */}
            {showMinting && (
              <Card className="p-6 bg-card/20 backdrop-blur-md border-white/20 mb-8">
                <div className="text-center">
                  <div className="text-4xl mb-4 animate-spin">⚡</div>
                  <h3 className="text-xl font-bold text-primary mb-2">Minting NFT...</h3>
                  <p className="text-muted-foreground mb-4">Creating your achievement on the blockchain</p>
                  <Progress value={mintingProgress} className="h-3 mb-2" />
                  <div className="text-sm text-muted-foreground">{mintingProgress}% Complete</div>
                </div>
              </Card>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* NFT Collection */}
              <div className="lg:col-span-2">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-primary">My NFT Collection</h2>
                  <CosmicButton variant="accent" onClick={handleMintNFT}>
                    ⚡ Mint New NFT
                  </CosmicButton>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {mockNFTs.map((nft) => (
                    <NFTCard
                      key={nft.id}
                      nft={nft}
                      onClick={() => setSelectedNFT(nft)}
                      onTrade={() => console.log("Trade NFT:", nft.id)}
                    />
                  ))}
                </div>
              </div>

              {/* Transaction History */}
              <div>
                <h2 className="text-2xl font-bold text-secondary mb-6">Recent Transactions</h2>
                <div className="space-y-4">
                  {transactions.map((tx) => (
                    <BlockchainTransaction key={tx.id} transaction={tx} />
                  ))}
                </div>

                {/* Smart Contract Info */}
                <Card className="p-4 bg-card/20 backdrop-blur-md border-white/20 mt-6">
                  <h3 className="font-bold text-accent mb-3">Smart Contract</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Contract:</span>
                      <span className="font-mono">0xABC...123</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Network:</span>
                      <span>Ethereum</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Royalty Rate:</span>
                      <span>5%</span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* NFT Detail Modal */}
            {selectedNFT && (
              <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <Card className="max-w-lg w-full bg-card/90 backdrop-blur-md border-white/20 p-6">
                  <div className="text-center mb-6">
                    <div className="text-6xl mb-4">{selectedNFT.image}</div>
                    <h3 className="text-2xl font-bold text-primary">{selectedNFT.name}</h3>
                    <Badge
                      variant={
                        selectedNFT.rarity === "Legendary"
                          ? "default"
                          : selectedNFT.rarity === "Epic"
                            ? "secondary"
                            : "outline"
                      }
                      className="mt-2"
                    >
                      {selectedNFT.rarity}
                    </Badge>
                  </div>

                  <div className="space-y-4">
                    <p className="text-muted-foreground">{selectedNFT.description}</p>

                    <div>
                      <h4 className="font-semibold mb-2">Skills Learned</h4>
                      <div className="flex flex-wrap gap-1">
                        {selectedNFT.skills.map((skill: string) => (
                          <Badge key={skill} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">XP Value:</span>
                        <div className="font-medium">{selectedNFT.xpValue}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Date Earned:</span>
                        <div className="font-medium">{selectedNFT.dateEarned}</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-6">
                    <CosmicButton variant="primary" className="flex-1">
                      View on Explorer
                    </CosmicButton>
                    <CosmicButton variant="secondary" onClick={() => setSelectedNFT(null)}>
                      Close
                    </CosmicButton>
                  </div>
                </Card>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
