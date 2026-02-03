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
    <section className="py-20 bg-slate-50 border-t border-slate-100">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-2xl font-bold text-center text-primary mb-12">
          Trusted by weekend adventurers
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white p-6 rounded-lg shadow-sm border border-slate-100">
              <div className="flex gap-1 text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4 italic">"{t.quote}"</p>
              <div>
                <span className="block font-semibold text-primary">{t.author}</span>
                <span className="text-xs text-gray-400">{t.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
