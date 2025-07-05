"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, Sparkles } from "lucide-react"

interface Message {
  id: string
  type: "user" | "copilot" | "system"
  content: string
  timestamp: Date
  isTyping?: boolean
}

export default function TerminalV2Page() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "system",
      content: "Welcome to prompt.fun terminal. Your AI Copilot is ready to assist.",
      timestamp: new Date(),
    },
    {
      id: "2",
      type: "copilot",
      content:
        "Hello! I can help you launch tokens, trade, check leaderboards, and explore DeFi. What would you like to do?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    // Auto-focus input on mount
    inputRef.current?.focus()
  }, [])

  const handleSendMessage = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate AI response with typing effect
    setTimeout(() => {
      const copilotResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "copilot",
        content: generateCopilotResponse(input),
        timestamp: new Date(),
        isTyping: true,
      }
      setMessages((prev) => [...prev, copilotResponse])
      setIsTyping(false)

      // Remove typing indicator after response is complete
      setTimeout(() => {
        setMessages((prev) => prev.map((msg) => (msg.id === copilotResponse.id ? { ...msg, isTyping: false } : msg)))
      }, 2000)
    }, 1500)
  }

  const generateCopilotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase()

    if (input.includes("launch") || input.includes("create")) {
      return "Token launch initiated. Creating your meme token on Aptos blockchain. This will cost 0.1 APT for deployment."
    } else if (input.includes("buy")) {
      return "Processing your buy order. Checking liquidity and executing trade."
    } else if (input.includes("sell")) {
      return "Sell order received. Finding best price for your tokens."
    } else if (input.includes("portfolio") || input.includes("balance")) {
      return "Your portfolio: 150 APT, 5 different tokens, Total value: $1,250"
    } else if (input.includes("leaderboard")) {
      return "Current leaderboard: You are rank #17 with 2,450 XP. Top trader has 15,680 XP."
    } else if (input.includes("trend")) {
      return "Trending tokens: $MOULI (+25%), $CYBER (+18%), $NEON (+12%). Volume is up 150% today."
    } else {
      return "I can help you launch tokens, trade, check portfolios, or view leaderboards. Try commands like 'Launch $TOKEN' or 'Buy $DOGE for 10 APT'."
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] relative overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="subtle-glow w-96 h-96 top-20 -right-48" />
      <div className="subtle-glow w-64 h-64 bottom-20 -left-32" />

      {/* Main Terminal Area */}
      <div className="flex flex-col h-screen">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto px-8 py-8">
          <div className="max-w-4xl mx-auto space-y-8">
            <AnimatePresence>
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className={`${index > 0 ? "border-t border-white/5 pt-8" : ""}`}
                >
                  <div className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-3xl ${message.type === "user" ? "ml-auto" : ""}`}>
                      {message.type === "copilot" && (
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-6 h-6 rounded-full bg-gradient-to-r from-slate-600 to-slate-500 flex items-center justify-center">
                            <Sparkles className="w-3 h-3 text-white" />
                          </div>
                          <span className="text-sm text-slate-400 font-light">AI Copilot</span>
                        </div>
                      )}

                      {message.type === "user" && (
                        <div className="flex items-center gap-3 mb-4 justify-end">
                          <span className="text-sm text-slate-400 font-light">You</span>
                          <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                            <div className="w-3 h-3 rounded-full bg-white/60" />
                          </div>
                        </div>
                      )}

                      <div className={`${message.type === "user" ? "text-right" : "text-left"}`}>
                        <p className="text-white/90 font-light leading-relaxed text-lg">
                          {message.content}
                          {message.isTyping && (
                            <span className="inline-block w-2 h-5 bg-slate-400 ml-1 animate-pulse" />
                          )}
                        </p>
                        <p className="text-xs text-white/30 mt-3 font-light">
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {isTyping && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="border-t border-white/5 pt-8">
                <div className="flex justify-start">
                  <div className="max-w-3xl">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-slate-600 to-slate-500 flex items-center justify-center">
                        <Sparkles className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-sm text-slate-400 font-light">AI Copilot</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
                      <div
                        className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      />
                      <div
                        className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="px-8 py-8 border-t border-white/5">
          <div className="max-w-4xl mx-auto">
            <div className="flex gap-4">
              <Input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your prompt here..."
                className="elegant-input flex-1 text-lg py-6"
              />
              <Button
                onClick={handleSendMessage}
                className="elegant-button-primary px-8 py-6"
                disabled={!input.trim() || isTyping}
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
