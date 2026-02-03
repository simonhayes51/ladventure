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
    <section id="how-it-works" className="py-20 md:py-32 bg-muted border-b-4 border-foreground relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#4C1D95 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="mb-16 md:text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-primary mb-4 retro-text-shadow">
            How it works
          </h2>
          <p className="text-lg text-muted-foreground font-medium">
            From idea to itinerary in four simple steps.
          </p>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Connecting line for desktop */}
            <div className="hidden lg:block absolute top-12 left-0 w-full h-1 bg-foreground -z-10 transform translate-y-1/2 border-t-2 border-b-2 border-dashed border-gray-400" />

          {steps.map((step, index) => (
            <div key={index} className="relative bg-white p-8 border-4 border-foreground retro-shadow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all duration-200 flex flex-col h-full">
              <div className="absolute -top-6 -left-2 bg-secondary border-2 border-foreground px-3 py-1 text-2xl font-black text-secondary-foreground retro-shadow-sm rotate-[-5deg]">
                {step.number}
              </div>
              <h3 className="text-xl font-bold uppercase text-primary mb-3 mt-4">{step.title}</h3>
              <p className="text-foreground font-medium flex-grow">{step.description}</p>
              
              {index < steps.length - 1 && (
                 <div className="lg:hidden flex justify-center mt-6 text-foreground">
                     <ArrowRight className="transform rotate-90 w-8 h-8" />
                 </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
