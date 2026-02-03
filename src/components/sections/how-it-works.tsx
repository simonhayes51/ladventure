import { ArrowRight } from "lucide-react"

const steps = [
  {
    number: "01",
    title: "Share Your Vision",
    description: "Fill out a quick form telling us about your group, dates, budget, and what kind of vibe you're after.",
  },
  {
    number: "02",
    title: "We Draft the Plan",
    description: "Our experts curate a custom itinerary with accommodation options, activities, and dining spots.",
  },
  {
    number: "03",
    title: "Refine & Perfect",
    description: "We work with you to tweak the details until it's exactly what you want. No compromises.",
  },
  {
    number: "04",
    title: "Book & Go",
    description: "Receive a complete booking guide and digital itinerary. Just click to book and you're ready.",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 md:py-32 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-16 md:text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-primary mb-4">
            How it works
          </h2>
          <p className="text-lg text-gray-600">
            From idea to itinerary in four simple steps.
          </p>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Connecting line for desktop */}
            <div className="hidden lg:block absolute top-12 left-0 w-full h-0.5 bg-slate-200 -z-10 transform translate-y-1/2" />

          {steps.map((step, index) => (
            <div key={index} className="relative bg-white p-8 rounded-xl shadow-sm border border-slate-100 flex flex-col h-full">
              <div className="text-5xl font-bold text-slate-200 mb-6">{step.number}</div>
              <h3 className="text-xl font-semibold text-primary mb-3">{step.title}</h3>
              <p className="text-gray-600 flex-grow">{step.description}</p>
              
              {index < steps.length - 1 && (
                 <div className="lg:hidden flex justify-center mt-6 text-slate-300">
                     <ArrowRight className="transform rotate-90" />
                 </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
