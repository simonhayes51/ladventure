import Link from "next/link"
import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function CtaSection() {
  return (
    <section className="py-24 bg-primary text-white text-center">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
          Ready to plan your next escape?
        </h2>
        <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
          Don't let the group chat die. Let us handle the details so you can focus on the fun.
        </p>
        <Link 
          href="#pricing"
          className={cn(buttonVariants({ size: "lg" }), "h-16 px-10 text-lg bg-secondary hover:bg-secondary/90 text-white rounded-full")}
        >
          Start Your Adventure
        </Link>
        <p className="mt-6 text-sm text-slate-400">
          Takes 2 minutes • No commitment required
        </p>
      </div>
    </section>
  )
}
