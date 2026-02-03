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
    <section id="what-we-do" className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-primary mb-4">
            We plan, you adventure.
          </h2>
          <p className="text-lg text-gray-600">
            Organising a group trip is stressful. We take the hassle out of the process, delivering a professional, personalised plan for your weekend away.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="p-6 bg-slate-50 rounded-xl border border-slate-100 hover:shadow-md transition-shadow"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-primary mb-2">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
