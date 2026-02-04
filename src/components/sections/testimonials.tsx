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
    <section className="py-20 bg-[#ffe3b3] border-t-4 border-foreground relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,153,0,0.45),transparent_35%),linear-gradient(320deg,rgba(255,38,92,0.38),transparent_45%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.7),_transparent_55%)] opacity-70" />
      <div className="absolute -left-20 top-8 w-64 h-64 bg-secondary/60 rounded-full blur-3xl" />
      <div className="absolute -right-10 bottom-12 w-64 h-64 bg-accent/55 rounded-full blur-3xl" />
      <div className="absolute right-16 top-8 h-3 w-24 bg-primary border-2 border-foreground retro-shadow-sm" />
      <div className="absolute left-10 bottom-10 h-3 w-28 bg-accent border-2 border-foreground retro-shadow-sm" />
      <div className="absolute left-1/2 top-4 h-3 w-16 -translate-x-1/2 bg-secondary border-2 border-foreground retro-shadow-sm" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <h2 className="text-3xl md:text-5xl font-bold text-center text-primary mb-12 uppercase retro-text-shadow">
          Trusted by weekend adventurers
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-white p-6 border-2 border-foreground retro-shadow hover:-rotate-1 transition-transform duration-200"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex gap-1 text-secondary">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current stroke-foreground stroke-2" />
                  ))}
                </div>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-foreground bg-[#ffd400] border border-foreground px-2 py-1">
                  Verified
                </span>
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
