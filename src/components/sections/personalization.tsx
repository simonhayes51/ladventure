"use client"

import { motion } from "framer-motion"

const examples = [
  {
    title: "Planning a Prague weekend for 7 mates in April on £350pp?",
    detail: "We’ll build that exact plan — flights, stay, nights out, and recovery brunches.",
  },
  {
    title: "Peak District pub hike for 12 in September?",
    detail: "We’ll map the route, lock the tables, and keep your budget on track.",
  },
  {
    title: "Lisbon long weekend for a mixed group?",
    detail: "We’ll balance culture, beach time, and nightlife for everyone.",
  },
]

export function Personalization() {
  return (
    <section className="py-16 md:py-24 bg-secondary/10 border-b-4 border-foreground relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_top,#EC4899_2px,transparent_2px)] bg-[length:32px_32px]" />
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-primary mb-4 retro-text-shadow">
            Your trip, written like a custom brief.
          </h2>
          <p className="text-lg text-foreground font-medium">
            We plan around your dates, budget, and vibe — not a generic package. Share the brief, we build the plan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {examples.map((example, index) => (
            <motion.div
              key={example.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-white border-2 border-foreground p-6 retro-shadow-sm transform rotate-[-1deg] hover:rotate-0 transition-transform"
            >
              <p className="text-lg font-bold text-primary mb-3">{example.title}</p>
              <p className="text-foreground font-medium">{example.detail}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
