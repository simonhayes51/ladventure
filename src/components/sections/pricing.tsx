"use client"

import { useState } from "react"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BookingModal } from "@/components/booking-modal"

const features = [
  "Custom detailed itinerary",
  "3 curated accommodation options",
  "Transport logistics & advice",
  "Activity & dining reservations",
  "Digital guidebook for the group",
  "1 round of revisions",
]

export function Pricing() {
  const [isBookingOpen, setIsBookingOpen] = useState(false)

  return (
    <section id="pricing" className="py-20 md:py-32 bg-primary text-white relative overflow-hidden">
      {/* Retro shapes */}
      <div className="absolute top-10 right-10 w-32 h-32 border-4 border-white/20 rounded-full"></div>
      <div className="absolute bottom-10 left-10 w-20 h-20 bg-accent/20 rotate-45"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 retro-text-shadow">
              Simple, transparent pricing.
            </h2>
            <p className="text-lg text-white/80 mb-8 leading-relaxed font-medium">
              No hidden fees or commission markups. You pay us for the plan, and you book everything directly at cost price. We save you time and ensure quality.
            </p>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 border-2 border-white flex items-center justify-center text-secondary font-bold bg-black text-xl">1</div>
                <p className="text-white font-bold uppercase">Save 10+ hours of research time</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 border-2 border-white flex items-center justify-center text-secondary font-bold bg-black text-xl">2</div>
                <p className="text-white font-bold uppercase">Get access to local knowledge</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 border-2 border-white flex items-center justify-center text-secondary font-bold bg-black text-xl">3</div>
                <p className="text-white font-bold uppercase">Travel with confidence</p>
              </div>
            </div>
          </div>

          <div className="bg-white text-foreground border-4 border-black p-8 retro-shadow-secondary relative transform rotate-1 hover:rotate-0 transition-transform duration-300">
            <div className="absolute top-0 right-0 bg-secondary border-b-4 border-l-4 border-black text-secondary-foreground text-sm font-bold px-4 py-2">
              LAUNCH OFFER
            </div>
            
            <h3 className="text-3xl font-bold mb-2 uppercase">Full Trip Plan</h3>
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-5xl font-black text-primary">£50</span>
              <span className="text-gray-400 font-bold line-through text-2xl">£99</span>
              <span className="text-gray-500 font-medium">/ trip</span>
            </div>
            
            <p className="text-gray-600 mb-8 font-medium">
              Everything you need for a perfect weekend away, delivered in a polished digital format.
            </p>

            <ul className="space-y-4 mb-8">
              {features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <div className="bg-green-100 border border-green-800 p-0.5 shrink-0">
                    <Check className="h-4 w-4 text-green-800" />
                  </div>
                  <span className="text-sm font-bold uppercase">{feature}</span>
                </li>
              ))}
            </ul>

            <Button 
              onClick={() => setIsBookingOpen(true)}
              size="lg"
              className="w-full text-lg h-14 bg-secondary text-secondary-foreground hover:bg-secondary border-2 border-foreground retro-shadow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
            >
              Get Started
            </Button>
            <p className="text-xs text-center text-gray-400 mt-4 font-bold uppercase">
              Secure payment via Stripe. 100% satisfaction guarantee.
            </p>
          </div>
        </div>
      </div>
      
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </section>
  )
}
