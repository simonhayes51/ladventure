"use client"

import { useState } from "react"
import { MessageCircle, X } from "lucide-react"
import { trackEvent } from "@/lib/analytics"

export function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [isOpening, setIsOpening] = useState(false)

  const openTawk = () => {
    trackEvent({ action: "chat_toggle", category: "live_chat", label: "open" })
    setIsOpening(true)

    let attempts = 0
    const tryOpen = () => {
      attempts += 1
      const api = (window as Window & { Tawk_API?: { toggle?: () => void; maximize?: () => void } })
        .Tawk_API
      if (api?.maximize) {
        api.maximize()
        setIsOpening(false)
        return
      }
      if (api?.toggle) {
        api.toggle()
        setIsOpening(false)
        return
      }
      if (attempts < 10) {
        window.setTimeout(tryOpen, 300)
        return
      }
      window.open("https://tawk.to/chat/698207943c76db1c37e38eab/1jghur77p", "_blank")
      setIsOpening(false)
    }

    tryOpen()
  }

  const togglePanel = () => {
    setIsOpen((prev) => !prev)
  }

  return (
    <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end gap-3">
      {isOpen && (
        <div
          id="floating-chat-panel"
          className="w-72 bg-white border-2 border-foreground retro-shadow p-4"
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-bold uppercase text-primary">Live chat (beta)</p>
            <button
              type="button"
              onClick={togglePanel}
              className="p-1 border-2 border-foreground bg-secondary text-secondary-foreground"
              aria-label="Close chat panel"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <p className="text-sm text-foreground font-medium mb-4">
            Tell us your dates, group size, and budget. We’ll reply fast with a tailored plan.
          </p>
          <button
            type="button"
            className="w-full bg-primary text-primary-foreground border-2 border-foreground retro-shadow px-4 py-2 font-bold uppercase"
            onClick={openTawk}
          >
            {isOpening ? "Opening..." : "Start chat"}
          </button>
        </div>
      )}
      {!isOpen && (
        <button
          type="button"
          onClick={togglePanel}
          className="flex items-center gap-2 bg-secondary text-secondary-foreground border-2 border-foreground retro-shadow px-4 py-3 font-bold uppercase"
          aria-label="Open live chat"
          aria-expanded={isOpen}
          aria-controls="floating-chat-panel"
        >
          <MessageCircle className="h-5 w-5" />
          Chat
        </button>
      )}
      <button
        type="button"
        onClick={togglePanel}
        className="flex items-center gap-2 bg-secondary text-secondary-foreground border-2 border-foreground retro-shadow px-4 py-3 font-bold uppercase"
        aria-label="Open live chat"
        aria-expanded={isOpen}
        aria-controls="floating-chat-panel"
      >
        <MessageCircle className="h-5 w-5" />
        Chat
      </button>
    </div>
  )
}
