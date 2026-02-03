"use client"

import { useState } from "react"
import { MessageCircle } from "lucide-react"
import { trackEvent } from "@/lib/analytics"

export function FloatingChat() {
  const [isOpening, setIsOpening] = useState(false)

  const toggleChat = () => {
    trackEvent({ action: "chat_toggle", category: "live_chat", label: "open" })
    setIsOpening(true)
    const api = (window as Window & { Tawk_API?: { toggle?: () => void; maximize?: () => void } })
      .Tawk_API
    if (api?.toggle) {
      api.toggle()
    } else if (api?.maximize) {
      api.maximize()
    }
    setTimeout(() => setIsOpening(false), 800)
  }

  return (
    <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end gap-3">
      <button
        type="button"
        onClick={toggleChat}
        className="flex items-center gap-2 bg-secondary text-secondary-foreground border-2 border-foreground retro-shadow px-4 py-3 font-bold uppercase"
        aria-label="Open live chat"
      >
        <MessageCircle className="h-5 w-5" />
        {isOpening ? "Opening..." : "Chat"}
      </button>
    </div>
  )
}
