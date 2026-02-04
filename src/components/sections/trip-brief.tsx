"use client"

import { useState } from "react"
import { BookingModal } from "@/components/booking-modal"
import { Button } from "@/components/ui/button"
import { trackEvent } from "@/lib/analytics"

const DEFAULTS = {
  destination: "Prague",
  groupSize: "7",
  month: "April",
  budget: "£350pp",
}

export function TripBrief() {
  const [isOpen, setIsOpen] = useState(false)
  const [destination, setDestination] = useState(DEFAULTS.destination)
  const [groupSize, setGroupSize] = useState(DEFAULTS.groupSize)
  const [month, setMonth] = useState(DEFAULTS.month)
  const [budget, setBudget] = useState(DEFAULTS.budget)

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    trackEvent({ action: "form_submit", category: "trip_brief", label: "brief_submit" })
    setIsOpen(true)
  }

  return (
    <section className="py-20 md:py-28 bg-primary/5 border-b-4 border-foreground relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top,#5B21B6_2px,transparent_2px)] bg-[length:36px_36px]" />
      <div className="container mx-auto px-4 md:px-6 relative z-10 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10 items-center">
        <div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-primary mb-4 retro-text-shadow">
            Build your plan in 2 minutes.
          </h2>
          <p className="text-lg text-foreground font-medium mb-6">
            Tell us the basics and we’ll craft a trip that fits your group, budget, and energy level.
          </p>
          <div className="bg-white border-2 border-foreground retro-shadow-sm p-5">
            <p className="text-lg font-bold text-primary">
              Planning a {destination} weekend for {groupSize} mates in {month} on {budget}?
            </p>
            <p className="text-foreground font-medium mt-2">
              We’ll build that exact plan — flights, stay, activities, and a pacing that suits your crew.
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white border-2 border-foreground retro-shadow p-6 space-y-4"
        >
          <div>
            <label className="text-sm font-bold uppercase">Destination</label>
            <input
              className="mt-2 w-full border-2 border-foreground p-3 bg-background"
              value={destination}
              onChange={(event) => setDestination(event.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-bold uppercase">Group size</label>
              <input
                className="mt-2 w-full border-2 border-foreground p-3 bg-background"
                value={groupSize}
                onChange={(event) => setGroupSize(event.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-bold uppercase">Month</label>
              <input
                className="mt-2 w-full border-2 border-foreground p-3 bg-background"
                value={month}
                onChange={(event) => setMonth(event.target.value)}
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-bold uppercase">Budget per person</label>
            <input
              className="mt-2 w-full border-2 border-foreground p-3 bg-background"
              value={budget}
              onChange={(event) => setBudget(event.target.value)}
            />
          </div>
          <Button type="submit" className="w-full">
            Get my personalised plan
          </Button>
        </form>
      </div>

      <BookingModal isOpen={isOpen} onClose={() => setIsOpen(false)} prefilledDestination={destination} />
    </section>
  )
}
