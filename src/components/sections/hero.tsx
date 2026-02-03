"use client"

import { useState } from "react"
import Link from "next/link"
import { Button, buttonVariants } from "@/components/ui/button"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { BookingModal } from "@/components/booking-modal"

export function Hero() {
  const [isBookingOpen, setIsBookingOpen] = useState(false)

  return (
    <section className="relative w-full py-20 md:py-32 lg:py-40 overflow-hidden bg-background flex items-center justify-center min-h-[90vh] border-b-4 border-foreground">
       {/* Background Image with Overlay */}
       <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: "url(https://static.toiimg.com/photo/msid-102419977,width-96,height-65.cms?ixlib=rb-4.0.3&auto=format&fit=crop&w=2021&q=80')" }}
        />
        <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
        <div className="absolute inset-0 bg-[linear-gradient(45deg,#000000_1px,transparent_1px)] bg-[length:20px_20px] opacity-10"></div>
      </div>

      {/* Decorative Shapes */}
      <div className="absolute top-20 left-10 w-16 h-16 bg-secondary border-2 border-foreground hidden md:block rotate-12 retro-shadow"></div>
      <div className="absolute bottom-20 right-10 w-24 h-24 bg-accent border-2 border-foreground rounded-full hidden md:block -rotate-6 opacity-80 retro-shadow-sm"></div>
      <div className="absolute top-40 right-20 w-0 h-0 border-l-[30px] border-l-transparent border-t-[50px] border-t-primary border-r-[30px] border-r-transparent rotate-45 hidden md:block"></div>

      <div className="container relative z-10 px-4 md:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6 max-w-4xl mx-auto"
        >
          <div className="inline-block bg-accent border-2 border-foreground px-4 py-1 transform -rotate-2 mb-4 retro-shadow-sm">
             <span className="text-white font-bold uppercase tracking-widest">Est. 2024</span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-primary uppercase leading-[0.9] drop-shadow-sm">
            Weekend Trips <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-accent" style={{ textShadow: '4px 4px 0px #000' }}>Planned Properly</span>
          </h1>
          <p className="text-xl md:text-2xl text-foreground max-w-2xl mx-auto leading-relaxed font-medium bg-white/80 backdrop-blur-sm p-4 border-2 border-foreground retro-shadow-sm transform rotate-1">
            Custom itineraries for UK groups. <span className="text-accent font-bold">No stress.</span> <span className="text-secondary-foreground font-bold">No endless chats.</span> Just turn up and enjoy.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
            <Button 
              size="lg" 
              className="w-full sm:w-auto text-lg px-10 h-16 border-2 border-foreground retro-shadow hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none bg-secondary text-secondary-foreground hover:bg-secondary"
              onClick={() => setIsBookingOpen(true)}
            >
              Start Planning Now
            </Button>
            <Link href="#examples" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-full sm:w-auto text-lg px-10 h-16 bg-white hover:bg-gray-50")}>
              View Example Trips
            </Link>
          </div>
        </motion.div>
      </div>

      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </section>
  )
}
