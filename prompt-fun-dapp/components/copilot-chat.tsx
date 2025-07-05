"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send, Sparkles, TrendingUp, Wallet, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async (message?: string) => {
    const messageText = message || input
    if (!messageText.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: messageText,
      isUser: true,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: `I understand you want to "${messageText}". Let me help you with that on the Aptos blockchain!`,
        isUser: false,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botResponse])
      setIsLoading(false)
    }, 1000)
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
