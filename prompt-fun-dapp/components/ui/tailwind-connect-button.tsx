"use client"

import type React from "react"

interface TailwindConnectButtonProps {
  children: React.ReactNode
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  className?: string
  showArrow?: boolean
}

export function TailwindConnectButton({
  children,
  onClick,
  className = "",
  showArrow = false, // Default to false now
}: TailwindConnectButtonProps) {
  return (
    <button
      className={`relative rounded-full bg-zinc-950 px-8 py-4 text-white font-light text-lg flex items-center justify-center shadow-[0_0_10px_0_rgba(0,212,255,0.25)] border border-cyan-500/10 transition-all duration-150 hover:shadow-[0_0_16px_2px_rgba(0,212,255,0.3)] focus:outline-none ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
