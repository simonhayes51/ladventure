import { Map, CalendarCheck, Wallet, Compass } from "lucide-react"

const features = [
  {
    icon: <Map className="h-10 w-10 text-secondary" />,
    title: "Custom Itineraries",
    description: "Tailored specifically to your group's vibe, interests, and pace. No cookie-cutter packages.",
  },
  {
    icon: <CalendarCheck className="h-10 w-10 text-secondary" />,
    title: "Logistics Sorted",
    description: "We handle the boring stuff—accommodation, transport, and reservations—so you don't have to.",
  },
  {
    icon: <Compass className="h-10 w-10 text-secondary" />,
    title: "Hidden Gems",
    description: "Discover local spots and unique experiences, not just the standard tourist traps.",
  },
  {
    icon: <Wallet className="h-10 w-10 text-secondary" />,
    title: "Transparent Budgeting",
    description: "Clear costs upfront. We work within your budget to maximize value for everyone.",
  },
]

export function WhatWeDo() {
  return (
    <section id="what-we-do" className="py-20 md:py-32 bg-background border-b-4 border-foreground">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-primary mb-4 retro-text-shadow">
            We plan, you adventure.
          </h2>
          <p className="text-lg text-muted-foreground font-medium">
            Organising a group trip is stressful. We take the hassle out of the process, delivering a professional, personalised plan for your weekend away.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="p-6 bg-white border-2 border-foreground retro-shadow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all duration-200"
            >
              <div className="mb-4 inline-block p-3 bg-primary border-2 border-foreground text-white retro-shadow-sm">
                <div className="text-secondary">{feature.icon}</div>
              </div>
              <h3 className="text-xl font-bold uppercase text-primary mb-2">{feature.title}</h3>
              <p className="text-foreground font-medium leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
