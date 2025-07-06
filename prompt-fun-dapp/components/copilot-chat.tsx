"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send, Sparkles, TrendingUp, Wallet, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useWallet } from "../contexts/WalletContext"

interface Message {
  id: string
  content: string
  isUser: boolean
  timestamp: Date
}

interface Suggestion {
  text: string
  icon: React.ReactNode
}

const suggestions: Suggestion[] = [
  { text: "Launch $DOGE", icon: <Sparkles className="w-4 h-4" /> },
  { text: "What's Aptos?", icon: <HelpCircle className="w-4 h-4" /> },
  { text: "Buy trending token", icon: <TrendingUp className="w-4 h-4" /> },
  { text: "Portfolio balance", icon: <Wallet className="w-4 h-4" /> },
]

const APTOS_API = "https://api.testnet.aptoslabs.com/v1";
const APT_COIN_RESOURCE = "0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>";

export function CopilotChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hi! I'm your Copilot for Aptos meme tokens. Ask away.",
      isUser: false,
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { account } = useWallet()
  const [aptBalance, setAptBalance] = useState<string | null>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    const fetchBalance = async () => {
      if (!account) {
        setAptBalance(null)
        return
      }
      try {
        const res = await fetch(`${APTOS_API}/accounts/${account.address}/resource/${encodeURIComponent(APT_COIN_RESOURCE)}`)
        if (res.ok) {
          const data = await res.json()
          setAptBalance((Number(data.data.coin.value) / 1e8).toLocaleString(undefined, { maximumFractionDigits: 6 }) + ' APT')
        } else {
          setAptBalance("-")
        }
      } catch {
        setAptBalance("-")
      }
    }
    fetchBalance()
  }, [account])

  const handleSend = async (message?: string) => {
    const messageText = message || input
    if (!messageText.trim()) return

    // Normalize message for balance queries
    const normalized = messageText.toLowerCase().replace(/[^a-z0-9 ]/gi, '').replace(/\s+/g, ' ');
    if (account && normalized.includes('balance')) {
      const userMessage: Message = {
        id: Date.now().toString(),
        content: messageText,
        isUser: true,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, userMessage])
      setInput("")
      setIsLoading(true)
      // Fetch latest balance from Aptos API
      let liveBalance = null;
      try {
        const res = await fetch(`${APTOS_API}/accounts/${account.address}/resource/${encodeURIComponent(APT_COIN_RESOURCE)}`)
        if (res.ok) {
          const data = await res.json()
          liveBalance = (Number(data.data.coin.value) / 1e8).toLocaleString(undefined, { maximumFractionDigits: 6 }) + ' APT';
        } else if (res.status === 404) {
          liveBalance = '0 APT'; // No CoinStore means zero balance
        } else {
          liveBalance = "-";
        }
      } catch {
        liveBalance = "-";
      }
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: `Your Aptos testnet balance: ${liveBalance}`,
        isUser: false,
        timestamp: new Date(),
      }
      setTimeout(() => {
        setMessages((prev) => [...prev, botResponse])
        setIsLoading(false)
      }, 600)
      return
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      content: messageText,
      isUser: true,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Prepare chat history for backend
    const history = [...messages, userMessage].filter((m) => m.isUser || !m.isUser).map((m) => ({
      role: m.isUser ? "user" : "assistant",
      content: m.content,
    }))

    // If the user asks about their Aptos account, fetch from Aptos REST API
    let aptosInfo = ""
    if (account && /address|balance|account|wallet|portfolio|holdings|my aptos/i.test(messageText)) {
      try {
        const res = await fetch(`https://fullnode.testnet.aptoslabs.com/v1/accounts/${account.address}`)
        if (res.ok) {
          const data = await res.json()
          aptosInfo = `\nAptos Account Info:\nAddress: ${data.address}\nSequence: ${data.sequence_number}`
        }
      } catch (e) {
        aptosInfo = "\n(Could not fetch Aptos account info)"
      }
    }

    // Call Langchain backend
    try {
      const res = await fetch("http://127.0.0.1:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          history,
          message: messageText + aptosInfo,
        }),
      })
      if (res.ok) {
        const data = await res.json()
        const botResponse: Message = {
          id: (Date.now() + 1).toString(),
          content: data.response,
          isUser: false,
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, botResponse])
      } else {
        const errorText = await res.text();
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            content: "Error: " + errorText,
            isUser: false,
            timestamp: new Date(),
          },
        ])
      }
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          content: "Error: Could not reach backend.",
          isUser: false,
          timestamp: new Date(),
        },
      ])
    }
    setIsLoading(false)
  }

  const handleSuggestionClick = (suggestion: string) => {
    handleSend(suggestion)
  }

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-semibold neon-text">Prompt.fun Copilot</h1>
            <p className="text-sm text-gray-400">Your Aptos AI Assistant</p>
          </div>
        </div>
        {account && (
          <div className="flex flex-col items-end">
            <span className="text-xs text-gray-400">Testnet Balance</span>
            <span className="font-mono text-base text-primary">{aptBalance ?? "..."}</span>
          </div>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] p-4 rounded-2xl ${
                message.isUser ? "bg-primary text-white ml-12" : "chat-bubble mr-12"
              }`}
            >
              <p className="text-sm">{message.content}</p>
              <p className="text-xs opacity-70 mt-2">{message.timestamp.toLocaleTimeString()}</p>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="chat-bubble p-4 rounded-2xl mr-12">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-primary rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-primary rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggestions */}
      {messages.length === 1 && (
        <div className="p-4 border-t border-border">
          <p className="text-sm text-gray-400 mb-3">Try asking:</p>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => handleSuggestionClick(suggestion.text)}
                className="glow-border hover:bg-primary/20 transition-all duration-300"
              >
                {suggestion.icon}
                {suggestion.text}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t border-border">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything like 'Launch $MOON token'"
            className="flex-1 glow-border bg-card/50 border-0 focus:ring-2 focus:ring-primary"
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
          />
          <Button
            onClick={() => handleSend()}
            disabled={!input.trim() || isLoading}
            className="gradient-bg hover:opacity-90 transition-opacity"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}