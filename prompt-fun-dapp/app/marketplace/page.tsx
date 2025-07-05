"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, TrendingUp, Users, MessageSquare, ExternalLink } from "lucide-react"
import { TailwindConnectButton } from "@/components/ui/tailwind-connect-button"

const mockTokens = [
  {
    symbol: "DOGE",
    name: "Dogecoin Fun",
    price: "$0.0023",
    change: "+12.5%",
    holders: "1.2K",
    volume: "$45.2K",
    marketCap: "$2.3M",
    description: "Much wow, very meme",
  },
  {
    symbol: "PEPE",
    name: "Pepe Token",
    price: "$0.0018",
    change: "+8.3%",
    holders: "890",
    volume: "$32.1K",
    marketCap: "$1.8M",
    description: "Rare pepe collection",
  },
  {
    symbol: "SHIB",
    name: "Shiba Fun",
    price: "$0.0031",
    change: "-2.1%",
    holders: "2.1K",
    volume: "$67.8K",
    marketCap: "$4.2M",
    description: "Shiba inu community token",
  },
  {
    symbol: "MOON",
    name: "Moon Token",
    price: "$0.0045",
    change: "+25.7%",
    holders: "567",
    volume: "$23.4K",
    marketCap: "$890K",
    description: "To the moon! 🚀",
  },
]

export default function Marketplace() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedToken, setSelectedToken] = useState<(typeof mockTokens)[0] | null>(null)

  const filteredTokens = mockTokens.filter(
    (token) =>
      token.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      token.symbol.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="flex min-h-screen">
      <Navigation />
      <main className="flex-1 md:ml-64 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold neon-text">Marketplace</h1>
              <p className="text-gray-400">Discover and trade Aptos meme tokens</p>
            </div>
            <TailwindConnectButton className="animate-pulse-glow">
              <MessageSquare className="w-4 h-4 mr-2" />
              Ask Copilot
            </TailwindConnectButton>
          </div>

          {/* Search */}
          <Card className="glow-border bg-card/50">
            <CardContent className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search tokens..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 glow-border bg-background/50"
                />
              </div>
            </CardContent>
          </Card>

          {/* Token Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTokens.map((token, index) => (
              <Card
                key={index}
                className="glow-border bg-card/50 hover:bg-card/70 transition-all duration-300 cursor-pointer"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center">
                        <span className="font-bold">{token.symbol[0]}</span>
                      </div>
                      <div>
                        <CardTitle className="text-lg">${token.symbol}</CardTitle>
                        <p className="text-sm text-gray-400">{token.name}</p>
                      </div>
                    </div>
                    <Badge variant={token.change.startsWith("+") ? "default" : "destructive"}>{token.change}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-300">{token.description}</p>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-400">Price</p>
                      <p className="font-semibold">{token.price}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Market Cap</p>
                      <p className="font-semibold">{token.marketCap}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Volume 24h</p>
                      <p className="font-semibold">{token.volume}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Holders</p>
                      <p className="font-semibold flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {token.holders}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <TailwindConnectButton size="sm" className="flex-1" onClick={() => setSelectedToken(token)}>
                      Buy ${token.symbol}
                    </TailwindConnectButton>
                    <Button size="sm" variant="outline" className="glow-border bg-transparent">
                      <TrendingUp className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="glow-border bg-transparent">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Token Detail Drawer */}
          {selectedToken && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
              <Card className="w-full max-w-md glow-border bg-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center">
                        <span className="text-lg font-bold">{selectedToken.symbol[0]}</span>
                      </div>
                      <div>
                        <CardTitle>${selectedToken.symbol}</CardTitle>
                        <p className="text-sm text-gray-400">{selectedToken.name}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => setSelectedToken(null)}>
                      ✕
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <p className="text-sm">Ask Copilot:</p>
                    <div className="space-y-2">
                      <TailwindConnectButton variant="outline" size="sm" className="w-full justify-start">
                        Buy ${selectedToken.symbol}
                      </TailwindConnectButton>
                      <TailwindConnectButton variant="outline" size="sm" className="w-full justify-start">
                        Learn about ${selectedToken.symbol}
                      </TailwindConnectButton>
                      <TailwindConnectButton variant="outline" size="sm" className="w-full justify-start">
                        Show ${selectedToken.symbol} chart
                      </TailwindConnectButton>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
