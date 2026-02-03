"use client"

import Link from "next/link"
import { Button, buttonVariants } from "@/components/ui/button"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export function Hero() {
  return (
    <section className="relative w-full py-20 md:py-32 lg:py-40 overflow-hidden bg-slate-50 flex items-center justify-center min-h-[80vh]">
       {/* Background Image with Overlay */}
       <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 grayscale"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&auto=format&fit=crop&w=2021&q=80')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/50 to-white/90" />
      </div>

      <div className="container relative z-10 px-4 md:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6 max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-primary">
            Weekend trips, <span className="text-secondary">planned properly.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Custom itineraries for UK groups. No stress, no endless group chats—just turn up and enjoy.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="#pricing" className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-auto text-base px-8 h-12")}>
              Start Planning
            </Link>
            <Link href="#how-it-works" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-full sm:w-auto text-base px-8 h-12")}>
              See How It Works
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
