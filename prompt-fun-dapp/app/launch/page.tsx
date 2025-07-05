"use client"

import type React from "react"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Rocket, MessageSquare, ExternalLink } from "lucide-react"
import { TailwindConnectButton } from "@/components/ui/tailwind-connect-button"

export default function Launch() {
  const [formData, setFormData] = useState({
    name: "",
    symbol: "",
    description: "",
    initialSupply: "",
    bondingCurve: "linear",
  })
  const [isLaunching, setIsLaunching] = useState(false)
  const [txHash, setTxHash] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLaunching(true)

    // Simulate token launch
    setTimeout(() => {
      setTxHash("0x1234567890abcdef1234567890abcdef12345678")
      setIsLaunching(false)
    }, 3000)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="flex min-h-screen">
      <Navigation />
      <main className="flex-1 md:ml-64 p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold neon-text">Launch Token</h1>
              <p className="text-gray-400">Create your meme token on Aptos blockchain</p>
            </div>
            <Button variant="outline" className="glow-border bg-transparent">
              <MessageSquare className="w-4 h-4 mr-2" />
              Ask Copilot for Help
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Launch Form */}
            <Card className="glow-border bg-card/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Rocket className="w-5 h-5 text-primary" />
                  Token Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Token Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g., Moon Token"
                      className="glow-border bg-background/50"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="symbol">Symbol</Label>
                    <Input
                      id="symbol"
                      name="symbol"
                      value={formData.symbol}
                      onChange={handleInputChange}
                      placeholder="e.g., MOON"
                      className="glow-border bg-background/50"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Describe your token..."
                      className="glow-border bg-background/50"
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="initialSupply">Initial Supply</Label>
                    <Input
                      id="initialSupply"
                      name="initialSupply"
                      type="number"
                      value={formData.initialSupply}
                      onChange={handleInputChange}
                      placeholder="1000000"
                      className="glow-border bg-background/50"
                      required
                    />
                  </div>

                  <TailwindConnectButton
                    onClick={handleSubmit}
                    className="w-full justify-center transition-opacity"
                    disabled={isLaunching}
                  >
                    {isLaunching ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Launching on Aptos...
                      </>
                    ) : (
                      <>
                        <Rocket className="w-4 h-4 mr-2" />
                        Launch Token
                      </>
                    )}
                  </TailwindConnectButton>

                  {txHash && (
                    <div className="p-4 bg-green-500/20 border border-green-500/30 rounded-lg">
                      <p className="text-green-400 font-medium mb-2">Token Launched Successfully! 🚀</p>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-300">Transaction:</span>
                        <code className="text-xs bg-background/50 px-2 py-1 rounded">{txHash}</code>
                        <Button size="sm" variant="ghost">
                          <ExternalLink className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  )}
                </form>
              </CardContent>
            </Card>

            {/* Preview & Info */}
            <div className="space-y-6">
              <Card className="glow-border bg-card/50">
                <CardHeader>
                  <CardTitle>Token Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center">
                        <span className="text-lg font-bold">{formData.symbol ? formData.symbol[0] : "?"}</span>
                      </div>
                      <div>
                        <h3 className="font-semibold">{formData.name || "Token Name"}</h3>
                        <p className="text-sm text-gray-400">${formData.symbol || "SYMBOL"}</p>
                      </div>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Supply:</span>
                        <span>{formData.initialSupply || "0"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Blockchain:</span>
                        <span>Aptos</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Type:</span>
                        <span>Meme Token</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glow-border bg-card/50">
                <CardHeader>
                  <CardTitle>Launch Info</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>Deploy via TokenFactory.move contract</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>Automatic bonding curve setup</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>Instant trading availability</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <span>Gas fee: ~0.001 APT</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
