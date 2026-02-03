import { Star } from "lucide-react"

const testimonials = [
  {
    quote: "Honestly, I usually hate organising group trips. This made it so easy. The itinerary was perfect.",
    author: "Sarah J.",
    role: "London",
  },
  {
    quote: "We discovered amazing pubs we never would have found on our own. Worth every penny.",
    author: "Mike T.",
    role: "Manchester",
  },
  {
    quote: "Professional, quick, and spot on with the recommendations. Highly recommend for stags/hens.",
    author: "Emma W.",
    role: "Bristol",
  },
]

export function Testimonials() {
  return (
    <section className="py-20 bg-background border-t-4 border-foreground relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute -left-10 top-20 w-40 h-40 bg-secondary/20 rounded-full blur-xl"></div>
      <div className="absolute -right-10 bottom-20 w-40 h-40 bg-accent/20 rounded-full blur-xl"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <h2 className="text-3xl md:text-5xl font-bold text-center text-primary mb-12 uppercase retro-text-shadow">
          Trusted by weekend adventurers
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white p-6 border-2 border-foreground retro-shadow hover:rotate-1 transition-transform duration-200">
              <div className="flex gap-1 text-secondary mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current stroke-foreground stroke-2" />
                ))}
              </div>
              <p className="text-foreground text-lg mb-6 font-medium leading-relaxed">"{t.quote}"</p>
              <div className="border-t-2 border-dashed border-gray-200 pt-4">
                <span className="block font-bold text-primary uppercase tracking-wide">{t.author}</span>
                <span className="text-sm text-gray-500 font-bold">{t.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
