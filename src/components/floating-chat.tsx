"use client"

import { useState } from "react"
import { MessageCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { trackEvent } from "@/lib/analytics"

export function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleChat = () => {
    const next = !isOpen
    setIsOpen(next)
    trackEvent({ action: "chat_toggle", category: "live_chat", label: next ? "open" : "close" })
  }

  return (
    <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end gap-3">
      {isOpen && (
        <div className="w-72 bg-white border-2 border-foreground retro-shadow p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-bold uppercase text-primary">Live chat (beta)</p>
            <button
              type="button"
              onClick={toggleChat}
              className="p-1 border-2 border-foreground bg-secondary text-secondary-foreground"
              aria-label="Close chat panel"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <p className="text-sm text-foreground font-medium mb-4">
            Tell us your dates, group size, and budget. We’ll reply fast with a tailored plan.
          </p>
          <Button
            className="w-full bg-primary text-primary-foreground"
            onClick={() =>
              trackEvent({ action: "chat_cta_click", category: "live_chat", label: "start_chat" })
            }
          >
            Start chat
          </Button>
        </div>
      )}
      <button
        type="button"
        onClick={toggleChat}
        className="flex items-center gap-2 bg-secondary text-secondary-foreground border-2 border-foreground retro-shadow px-4 py-3 font-bold uppercase"
        aria-label="Open live chat"
      >
        <MessageCircle className="h-5 w-5" />
        Chat
      </button>
    </div>
  )
}
