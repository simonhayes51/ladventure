"use client"

import { HeartHandshake } from "lucide-react"

export function FounderNote() {
  return (
    <section className="py-20 bg-background border-t-4 border-foreground">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 items-center bg-white border-2 border-foreground retro-shadow p-8">
          <div className="flex flex-col items-center text-center">
            <div className="w-24 h-24 flex items-center justify-center border-2 border-foreground bg-secondary text-secondary-foreground retro-shadow-sm">
              <HeartHandshake className="h-10 w-10" />
            </div>
            <p className="mt-4 text-sm font-bold uppercase text-muted-foreground">Founder-led</p>
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3 retro-text-shadow">
              Built by someone who’s planned the hard trips.
            </h2>
            <p className="text-foreground font-medium mb-4">
              Ladventure started after too many group chats went silent. We built a cleaner, modern planning
              experience so UK groups can move fast, stay on budget, and feel excited about the trip.
            </p>
            <p className="text-sm font-bold uppercase text-muted-foreground">
              Founder story + real photos coming next.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
