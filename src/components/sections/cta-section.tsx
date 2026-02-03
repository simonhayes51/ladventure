"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { BookingModal } from "@/components/booking-modal"

export function CtaSection() {
  const [isBookingOpen, setIsBookingOpen] = useState(false)

  return (
    <section className="py-24 bg-accent text-white text-center border-t-4 border-foreground relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 10px, transparent 10px, transparent 20px)' }}></div>

      <div className="container mx-auto px-4 md:px-6 max-w-4xl relative z-10">
        <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-6 uppercase text-white retro-text-shadow">
          Ready to plan your next escape?
        </h2>
        <p className="text-xl text-white mb-10 max-w-2xl mx-auto font-medium bg-black/20 p-4 border-2 border-white inline-block">
          Don't let the group chat die. Let us handle the details so you can focus on the fun.
        </p>
        <div className="block">
          <Button 
            onClick={() => setIsBookingOpen(true)}
            size="lg"
            className="h-16 px-12 text-lg bg-secondary text-secondary-foreground hover:bg-secondary border-2 border-foreground retro-shadow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
          >
            Start Your Adventure
          </Button>
        </div>
        <p className="mt-6 text-sm text-white font-bold uppercase">
          Takes 2 minutes • No commitment required
        </p>
      </div>

      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </section>
  )
}
