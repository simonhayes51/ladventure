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
    <section className="py-20 bg-[#dfe8ff] border-t-4 border-foreground relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(54,99,255,0.4),transparent_40%),linear-gradient(315deg,rgba(123,92,255,0.4),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_rgba(255,255,255,0.65),_transparent_60%)] opacity-80" />
      <div className="absolute -right-16 -top-14 w-60 h-60 bg-accent/45 rounded-full blur-3xl" />
      <div className="absolute -left-14 bottom-4 w-52 h-52 bg-secondary/45 rounded-full blur-3xl" />
      <div className="absolute right-10 top-10 h-3 w-24 bg-secondary border-2 border-foreground retro-shadow-sm" />
      <div className="absolute left-8 top-24 h-3 w-16 bg-accent border-2 border-foreground retro-shadow-sm" />
      <div className="absolute right-1/3 bottom-8 h-3 w-20 bg-primary border-2 border-foreground retro-shadow-sm" />
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
