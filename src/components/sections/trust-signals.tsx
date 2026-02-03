"use client"

import { MapPin, ShieldCheck, Users } from "lucide-react"

const signals = [
  {
    title: "Based in Newcastle, UK",
    detail: "Local planners with UK-first knowledge and quick response times.",
    icon: <MapPin className="h-6 w-6" />,
  },
  {
    title: "Transparent planning",
    detail: "You see every option. No hidden commissions or locked-in suppliers.",
    icon: <ShieldCheck className="h-6 w-6" />,
  },
  {
    title: "Built for group dynamics",
    detail: "We balance budgets, preferences, and energy levels so everyone wins.",
    icon: <Users className="h-6 w-6" />,
  },
]

export function TrustSignals() {
  return (
    <section className="py-20 bg-muted/40 border-t-4 border-foreground relative overflow-hidden">
      <div className="absolute -right-10 -top-10 w-40 h-40 bg-accent/20 rounded-full blur-xl" />
      <div className="absolute -left-10 bottom-10 w-32 h-32 bg-secondary/20 rounded-full blur-xl" />
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-3xl mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-primary mb-4 retro-text-shadow">
            Trust signals
          </h2>
          <p className="text-lg text-foreground font-medium">
            We look modern because we are modern — clear pricing, local insight, and a plan that respects your time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {signals.map((signal) => (
            <div
              key={signal.title}
              className="bg-white border-2 border-foreground p-6 retro-shadow-sm hover:rotate-1 transition-transform"
            >
              <div className="flex items-center gap-3 mb-4 text-primary">
                <div className="w-10 h-10 flex items-center justify-center bg-accent text-white border-2 border-foreground retro-shadow-sm">
                  {signal.icon}
                </div>
                <h3 className="text-xl font-bold uppercase">{signal.title}</h3>
              </div>
              <p className="text-foreground font-medium">{signal.detail}</p>
              <p className="text-sm text-muted-foreground font-bold uppercase mt-4">
                Real photos & founder story landing soon
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
