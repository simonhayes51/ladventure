import { Check } from "lucide-react"
import Link from "next/link"
import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const features = [
  "Custom detailed itinerary",
  "3 curated accommodation options",
  "Transport logistics & advice",
  "Activity & dining reservations",
  "Digital guidebook for the group",
  "1 round of revisions",
]

export function Pricing() {
  return (
    <section id="pricing" className="py-20 md:py-32 bg-slate-900 text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              Simple, transparent pricing.
            </h2>
            <p className="text-lg text-slate-300 mb-8 leading-relaxed">
              No hidden fees or commission markups. You pay us for the plan, and you book everything directly at cost price. We save you time and ensure quality.
            </p>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center text-secondary font-bold">1</div>
                <p className="text-slate-200">Save 10+ hours of research time</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center text-secondary font-bold">2</div>
                <p className="text-slate-200">Get access to local knowledge</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center text-secondary font-bold">3</div>
                <p className="text-slate-200">Travel with confidence</p>
              </div>
            </div>
          </div>

          <div className="bg-white text-slate-900 rounded-2xl p-8 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-secondary text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
              LAUNCH OFFER
            </div>
            
            <h3 className="text-2xl font-bold mb-2">Full Trip Plan</h3>
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-4xl font-extrabold">£50</span>
              <span className="text-gray-500 font-medium line-through">£99</span>
              <span className="text-gray-500 font-medium">/ trip</span>
            </div>
            
            <p className="text-gray-600 mb-8">
              Everything you need for a perfect weekend away, delivered in a polished digital format.
            </p>

            <ul className="space-y-4 mb-8">
              {features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm font-medium">{feature}</span>
                </li>
              ))}
            </ul>

            <Link 
              href="https://form.typeform.com/to/placeholder" // Placeholder
              className={cn(buttonVariants({ size: "lg" }), "w-full text-lg h-14 bg-secondary hover:bg-secondary/90 text-white")}
            >
              Get Started
            </Link>
            <p className="text-xs text-center text-gray-400 mt-4">
              Secure payment via Stripe. 100% satisfaction guarantee.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
