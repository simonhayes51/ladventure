"use client"

import { BadgeCheck, Ban, CreditCard, Sparkles, Wallet } from "lucide-react"

const reasons = [
  {
    title: "No packages",
    detail: "We design each trip from scratch based on your brief.",
    icon: <Sparkles className="h-6 w-6" />,
  },
  {
    title: "No upselling",
    detail: "You book directly with venues and suppliers at cost.",
    icon: <Ban className="h-6 w-6" />,
  },
  {
    title: "No commission bias",
    detail: "Recommendations are chosen for fit, not referral fees.",
    icon: <BadgeCheck className="h-6 w-6" />,
  },
  {
    title: "100% tailored",
    detail: "Routes, stays, and activities built for your group.",
    icon: <Wallet className="h-6 w-6" />,
  },
  {
    title: "Flat price",
    detail: "One simple fee. Your budget stays with the group.",
    icon: <CreditCard className="h-6 w-6" />,
  },
]

export function WhyUs() {
  return (
    <section className="py-20 md:py-28 bg-accent/10 border-b-4 border-foreground relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(135deg,#000_1px,transparent_1px)] bg-[length:24px_24px]" />
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-3xl mb-12">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-primary mb-4 retro-text-shadow">
            Why Ladventure
          </h2>
          <p className="text-lg text-foreground font-medium">
            Built for modern UK group travel — clean, fast, and honest. We focus on clarity and confidence, not hype.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason) => (
            <div
              key={reason.title}
              className="bg-white border-2 border-foreground p-6 retro-shadow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all duration-200"
            >
              <div className="flex items-center gap-3 mb-4 text-primary">
                <div className="w-10 h-10 flex items-center justify-center bg-secondary border-2 border-foreground retro-shadow-sm text-secondary-foreground">
                  {reason.icon}
                </div>
                <h3 className="text-xl font-bold uppercase">{reason.title}</h3>
              </div>
              <p className="text-foreground font-medium">{reason.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
